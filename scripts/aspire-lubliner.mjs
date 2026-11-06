import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { access, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const SITE = 'https://lubliner.art'
const rootDir = process.cwd()
const outputDir = path.join(rootDir, 'content', 'lubliner')
const mediaDir = path.join(rootDir, 'public', 'media', 'lubliner')
const maxPages = Number(process.env.LUBLINER_MAX_PAGES || Number.POSITIVE_INFINITY)

const decode = (value = '') => value
  .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
  .replace(/&#([0-9]+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#039;|&apos;/gi, "'")
  .replace(/&eacute;/gi, 'é')
  .replace(/&egrave;/gi, 'è')
  .replace(/&agrave;/gi, 'à')
  .replace(/&ocirc;/gi, 'ô')
  .replace(/&rsquo;|&apos;/gi, '’')

const stripTags = (value = '') => decode(value.replace(/<[^>]+>/g, ' '))
  .replace(/\s+/g, ' ')
  .trim()

const absoluteUrl = (value, base = SITE) => {
  try {
    const url = new URL(decode(value), base)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    url.protocol = 'https:'
    url.search = ''
    url.hash = ''
    const normalizedPath = url.pathname.replace(/\/+/g, '/').replace(/^\/+|\/+$/g, '')
    url.pathname = normalizedPath ? `/${normalizedPath}${/\.[a-z0-9]{2,8}$/i.test(normalizedPath) ? '' : '/'}` : '/'
    return url.toString()
  } catch {
    return null
  }
}

const sameSitePage = (url) => {
  const parsed = new URL(url)
  return parsed.hostname === 'lubliner.art' && !parsed.pathname.startsWith('/wp-') &&
    !parsed.pathname.startsWith('/comments/') && !parsed.pathname.startsWith('/feed') &&
    !parsed.pathname.match(/\.(?:pdf|xml|jpg|jpeg|png|gif|webp|svg|css|js|zip)$/i)
}

const parseAttribute = (tag, name) => {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']+)`, 'i'))
  return match ? decode(match[1]) : null
}

const extractUrls = (html, baseUrl) => {
  const urls = new Set()
  for (const match of html.matchAll(/(?:href|data-src|src|content)\s*=\s*["']([^"']+)["']/gi)) {
    const url = absoluteUrl(match[1], baseUrl)
    if (url) urls.add(url)
  }
  for (const match of html.matchAll(/srcset\s*=\s*["']([^"']+)["']/gi)) {
    for (const item of match[1].split(',')) {
      const url = absoluteUrl(item.trim().split(/\s+/)[0], baseUrl)
      if (url) urls.add(url)
    }
  }
  return [...urls]
}

const extractImages = (html, pageUrl) => {
  const urls = new Set()
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0]
    for (const attr of ['src', 'data-src', 'data-lazy-src', 'data-original']) {
      const url = absoluteUrl(parseAttribute(tag, attr), pageUrl)
      if (url) urls.add(url)
    }
    const srcset = parseAttribute(tag, 'srcset') || parseAttribute(tag, 'data-srcset')
    if (srcset) {
      for (const item of srcset.split(',')) {
        const url = absoluteUrl(item.trim().split(/\s+/)[0], pageUrl)
        if (url) urls.add(url)
      }
    }
  }
  for (const match of html.matchAll(/<meta\b[^>]*(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*>/gi)) {
    const url = absoluteUrl(parseAttribute(match[0], 'content'), pageUrl)
    if (url) urls.add(url)
  }
  return [...urls].filter((url) => /\.(?:jpe?g|png|gif|webp|svg)(?:[?#].*)?$/i.test(url))
}

const textDump = (file) => {
  try {
    return execFileSync('w3m', ['-dump', '-cols', '180', file], { encoding: 'utf8', timeout: 10000 })
      .replace(/\u00a0/g, ' ')
      .split('\n')
      .map((line) => line.replace(/[ \t]+$/g, ''))
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  } catch {
    return ''
  }
}

const safeSlug = (url) => {
  const pathname = new URL(url).pathname.replace(/^\/+|\/+$/g, '')
  return pathname ? pathname.split('/').at(-1) : 'home'
}

const mediaName = (url) => {
  const parsed = new URL(url)
  const original = path.basename(parsed.pathname).replace(/[^a-zA-Z0-9._-]/g, '-') || 'media'
  const ext = path.extname(original).toLowerCase() || '.bin'
  const stem = path.basename(original, ext)
  return `${stem}-${createHash('sha1').update(url).digest('hex').slice(0, 8)}${ext}`
}

await mkdir(outputDir, { recursive: true })
await mkdir(mediaDir, { recursive: true })

const queue = [SITE + '/']
const seen = new Set()
const processedFinalUrls = new Set()
const pages = []
const mediaByUrl = new Map()
const downloaded = []

while (queue.length && seen.size < maxPages) {
  const url = queue.shift()
  if (!url || seen.has(url) || !sameSitePage(url)) continue
  seen.add(url)

  let response
  try {
    response = await fetch(url, {
      headers: { 'User-Agent': 'lubliner-art-content-migration/1.0' },
      signal: AbortSignal.timeout(15000),
    })
  } catch (error) {
    console.warn(`WARN fetch ${url}: ${error.message}`)
    continue
  }
  if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) continue

  const html = await response.text()
  const finalUrl = response.url
  if (processedFinalUrls.has(finalUrl)) continue
  processedFinalUrls.add(finalUrl)
  for (const linked of extractUrls(html, finalUrl)) {
    if (sameSitePage(linked) && !seen.has(linked) && !queue.includes(linked)) queue.push(linked)
  }

  const title = stripTags(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]) ||
    stripTags(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]) || safeSlug(finalUrl)
  const description = decode(html.match(/<meta\b[^>]*(?:name|property)=["'](?:description|og:description)["'][^>]*content=["']([^"']*)/i)?.[1] || '')
  const images = extractImages(html, finalUrl)
  const dumpFile = path.join('/tmp', `lubliner-${seen.size}.html`)
  await writeFile(dumpFile, html)
  const markdown = textDump(dumpFile)
  const pageMedia = []

  const processImage = async (imageUrl) => {
    if (!mediaByUrl.has(imageUrl)) {
      const filename = mediaName(imageUrl)
      mediaByUrl.set(imageUrl, filename)
      if (process.env.LUBLINER_DOWNLOAD_MEDIA === '0') {
        try {
          await access(path.join(mediaDir, filename))
          downloaded.push({ sourceUrl: imageUrl, filename, localPath: `media/lubliner/${filename}` })
        } catch {
          // Keep the source reference even when the file is not local yet.
        }
        pageMedia.push({ sourceUrl: imageUrl, filename })
        return
      }
      try {
        await access(path.join(mediaDir, filename))
        downloaded.push({ sourceUrl: imageUrl, filename, localPath: `media/lubliner/${filename}` })
        return
      } catch {
        // Download missing media below.
      }
      try {
        const imageResponse = await fetch(imageUrl, {
          headers: { 'User-Agent': 'lubliner-art-content-migration/1.0' },
          signal: AbortSignal.timeout(15000),
        })
        if (imageResponse.ok) {
          await writeFile(path.join(mediaDir, filename), Buffer.from(await imageResponse.arrayBuffer()))
          downloaded.push({ sourceUrl: imageUrl, filename, localPath: `media/lubliner/${filename}` })
        } else {
          console.warn(`WARN media ${imageResponse.status} ${imageUrl}`)
        }
      } catch (error) {
        console.warn(`WARN media ${imageUrl}: ${error.message}`)
      }
    }
    pageMedia.push({ sourceUrl: imageUrl, filename: mediaByUrl.get(imageUrl) })
  }
  for (let offset = 0; offset < images.length; offset += 8) {
    await Promise.all(images.slice(offset, offset + 8).map(processImage))
  }

  pages.push({
    slug: safeSlug(finalUrl),
    url: finalUrl,
    title,
    description,
    featuredImage: pageMedia[0] || null,
    media: pageMedia,
    markdown,
  })
  console.log(`${pages.length}/${maxPages} ${title}`)
}

const uniquePages = [...new Map(pages.map((page) => [page.url, page])).values()]
uniquePages.sort((a, b) => a.url.localeCompare(b.url))
await writeFile(path.join(outputDir, 'pages.json'), JSON.stringify({
  source: SITE,
  generatedAt: new Date().toISOString(),
  pageCount: uniquePages.length,
  mediaCount: downloaded.length,
  pages: uniquePages,
}, null, 2) + '\n')
await writeFile(path.join(outputDir, 'media.json'), JSON.stringify({
  source: SITE,
  generatedAt: new Date().toISOString(),
  media: downloaded,
}, null, 2) + '\n')

const summary = `# Lubliner ART — aspiration locale

Source : ${SITE}

- Pages récupérées : ${pages.length}
- Médias téléchargés : ${downloaded.length}
- Données : \`pages.json\` et \`media.json\`
- Fichiers médias : \`public/media/lubliner/\`

Les textes sont conservés dans le champ \`markdown\` de chaque page. L’image \`featuredImage\` est la première image détectée, généralement l’image mise en avant Open Graph.
`
await writeFile(path.join(outputDir, 'README.md'), summary)

console.log(`Done: ${uniquePages.length} pages, ${downloaded.length} media files`)
