import 'dotenv/config'

import { access, readFile } from 'node:fs/promises'
import path from 'node:path'

import { getPayload } from 'payload'

import config from '../payload.config'

type SourceMedia = {
  filename: string
  sourceUrl: string
}

type SourcePage = {
  slug: string
  url: string
  title: string
  description: string
  featuredImage: SourceMedia | null
  media: SourceMedia[]
  markdown: string
}

type PagesManifest = {
  pages: SourcePage[]
}

type MediaManifest = {
  media: SourceMedia[]
}

const rootDir = process.cwd()
const contentDir = path.join(rootDir, 'content', 'lubliner')
const mediaDir = path.join(rootDir, 'public', 'media', 'lubliner')
const apply = process.argv.includes('--apply')

const locales = ['en', 'fr'] as const

const textNode = (text: string) => ({
  type: 'text' as const,
  detail: 0,
  format: 0,
  mode: 'normal' as const,
  style: '',
  text,
  version: 1,
})

const paragraph = (text: string) => ({
  type: 'paragraph' as const,
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})

const heading = (text: string, tag: 'h1' | 'h2' | 'h3' = 'h2') => ({
  type: 'heading' as const,
  children: [textNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  tag,
  version: 1,
})

const lexical = (children: Array<ReturnType<typeof paragraph> | ReturnType<typeof heading>>) => ({
  root: {
    type: 'root' as const,
    children,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

const pageTitle = (title: string) => title.replace(/\s*\|\s*Lubliner Art\s*$/i, '').trim()

const compact = (value: string) => value.replace(/\s+/g, ' ').trim()

const truncate = (value: string, maxLength: number) => {
  if (value.length <= maxLength) return value
  return `${value.slice(0, maxLength - 1).trimEnd()}…`
}

const isChrome = (line: string) =>
  [
    'Aller au contenu',
    'Logo lubliner.art',
    'Bienvenue chez Lubliner ART',
    'Bienvenue chez',
    'Sommaire',
    'Partager cette page sur les reseaux',
    'Découvrir aussi',
    'Copyright',
  ].some((fragment) => line.includes(fragment))

const isNavigation = (line: string) =>
  /^•\s*(En cours|L’équipe|Réalisations|Services|Parlons projet|Partenaires|Médias)$/.test(line)

const cleanSourceText = (page: SourcePage) => {
  const title = pageTitle(page.title)
  const lines = page.markdown
    .split('\n')
    .map(compact)
    .filter(Boolean)
    .filter((line) => !isChrome(line) && !isNavigation(line))

  const titleIndex = lines.findIndex((line) => line === title)
  const body = (titleIndex >= 0 ? lines.slice(titleIndex + 1) : lines)
    .filter((line) => !line.startsWith('Vous êtes ici :'))
    .filter((line) => !/^•\s*[\d\s]+$/.test(line))
    .filter((line) => line !== title)
    .slice(0, 80)

  return body.length > 0 ? body : [page.description || title]
}

const toRichText = (page: SourcePage, includeTitle = false) => {
  const title = pageTitle(page.title)
  const body = cleanSourceText(page)
  const children: Array<ReturnType<typeof paragraph> | ReturnType<typeof heading>> = []

  if (includeTitle) children.push(heading(title, 'h1'))

  for (const line of body) {
    const isHeading = line.length < 110 && !/[.!?]$/.test(line) && !line.startsWith('•')
    children.push(
      isHeading
        ? heading(line, children.length === 0 ? 'h2' : 'h3')
        : paragraph(line.replace(/^•\s*/, '')),
    )
  }

  return lexical(children)
}

const altFromFilename = (filename: string) =>
  filename
    .replace(/-[a-f0-9]{8}(?=\.[^.]+$)/i, '')
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

const unique = <T>(items: T[], key: (item: T) => string) => [
  ...new Map(items.map((item) => [key(item), item])).values(),
]

const findBySlug = async (payload: Awaited<ReturnType<typeof getPayload>>, slug: string) => {
  const result = await payload.find({
    collection: 'pages',
    locale: 'en',
    fallbackLocale: false,
    limit: 1,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs[0]
}

const findMediaByFilename = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  filename: string,
) => {
  const result = await payload.find({
    collection: 'media',
    limit: 1,
    pagination: false,
    where: { filename: { equals: filename } },
  })
  return result.docs[0]
}

const run = async () => {
  const [pagesManifest, mediaManifest] = await Promise.all([
    readFile(path.join(contentDir, 'pages.json'), 'utf8').then(
      (data) => JSON.parse(data) as PagesManifest,
    ),
    readFile(path.join(contentDir, 'media.json'), 'utf8').then(
      (data) => JSON.parse(data) as MediaManifest,
    ),
  ])
  const sourceMedia = unique(mediaManifest.media, (media) => media.filename)
  const missingFiles: string[] = []

  for (const media of sourceMedia) {
    try {
      await access(path.join(mediaDir, media.filename))
    } catch {
      missingFiles.push(media.filename)
    }
  }

  console.info(
    `Lubliner import ${apply ? 'apply' : 'dry run'}: ${pagesManifest.pages.length} pages, ${sourceMedia.length} referenced media.`,
  )
  if (missingFiles.length > 0) {
    throw new Error(
      `${missingFiles.length} referenced media files are missing, first: ${missingFiles.slice(0, 5).join(', ')}`,
    )
  }
  if (!apply) return

  const payload = await getPayload({ config })
  const mediaIds = new Map<string, number>()

  for (const media of sourceMedia) {
    const existing = await findMediaByFilename(payload, media.filename)
    const alt = altFromFilename(media.filename)
    const document =
      existing ??
      (await payload.create({
        collection: 'media',
        overrideAccess: true,
        filePath: path.join(mediaDir, media.filename),
        data: { role: 'informative', alt },
        context: { disableRevalidate: true },
      }))

    mediaIds.set(media.filename, document.id)

    await payload.update({
      collection: 'media',
      id: document.id,
      locale: 'fr',
      overrideAccess: true,
      data: { alt },
      context: { disableRevalidate: true },
    })
  }

  for (const source of pagesManifest.pages) {
    const featuredMediaId = source.featuredImage
      ? mediaIds.get(source.featuredImage.filename)
      : undefined
    if (!featuredMediaId) throw new Error(`Missing featured media for ${source.slug}`)

    const gallery = unique(source.media.slice(1), (media) => media.filename)
      .map((media) => mediaIds.get(media.filename))
      .filter((id): id is number => typeof id === 'number')

    const content = {
      title: pageTitle(source.title),
      _status: 'published' as const,
      hero: {
        type: source.slug === 'home' ? ('highImpact' as const) : ('mediumImpact' as const),
        media: featuredMediaId,
        richText: toRichText(source, true),
      },
      layout: [
        {
          blockType: 'content' as const,
          columns: [{ size: 'full' as const, richText: toRichText(source) }],
        },
        ...gallery.map((asset) => ({
          blockType: 'mediaBlock' as const,
          image: { asset, role: 'informative' as const, alt: source.title },
        })),
      ],
      meta: {
        title: pageTitle(source.title),
        description: source.description || undefined,
        image: featuredMediaId,
      },
      aeo: {
        aeoSummary: truncate(source.description || pageTitle(source.title), 250),
      },
    }

    const existing = await findBySlug(payload, source.slug)
    const document = existing
      ? await payload.update({
          collection: 'pages',
          id: existing.id,
          locale: 'en',
          overrideAccess: true,
          draft: false,
          data: content,
          context: { disableRevalidate: true },
        })
      : await payload.create({
          collection: 'pages',
          locale: 'en',
          overrideAccess: true,
          draft: false,
          data: { ...content, slug: source.slug },
          context: { disableRevalidate: true },
        })

    await payload.update({
      collection: 'pages',
      id: document.id,
      locale: 'fr',
      overrideAccess: true,
      draft: false,
      data: content,
      context: { disableRevalidate: true },
    })
  }

  const logoMedia = sourceMedia.find((media) => /logo/i.test(media.filename))
  const logo = logoMedia ? mediaIds.get(logoMedia.filename) : undefined
  const home = pagesManifest.pages.find((page) => page.slug === 'home')
  const ogImage = home?.featuredImage ? mediaIds.get(home.featuredImage.filename) : undefined
  const navItems = [
    ['Réalisations', '/realisations-darchitecture'],
    ['Prestations', '/prestations-architecture'],
    ["L'équipe", '/lequipe'],
    ['Parlons projet', '/formulaire-de-demande-devis-darchitecture'],
    ['Partenaires', '/partenaires-lubliner-art'],
    ['Médias', '/le-cabinet-darchitecture-lubliner-art-dans-les-medias'],
    ['Contact', '/contact'],
  ].map(([label, url]) => ({ link: { type: 'custom' as const, label, url } }))

  for (const locale of locales) {
    await Promise.all([
      payload.updateGlobal({
        slug: 'site-settings',
        locale,
        overrideAccess: true,
        data: {
          brandName: 'Lubliner ART',
          logo,
          theme: {
            primaryColor: 'oklch(26% 0.02 55deg)',
            primaryForeground: 'oklch(98.5% 0 0deg)',
            radius: 'sm',
            fontFamily: 'serif',
            defaultTheme: 'light',
          },
          seo: {
            titleTemplate: '%s | {site}',
            defaultDescription: home?.description,
            ogImage,
          },
        },
        context: { disableRevalidate: true },
      }),
      payload.updateGlobal({
        slug: 'header',
        locale,
        overrideAccess: true,
        data: { navItems },
        context: { disableRevalidate: true },
      }),
      payload.updateGlobal({
        slug: 'footer',
        locale,
        overrideAccess: true,
        data: { navItems },
        context: { disableRevalidate: true },
      }),
    ])
  }

  console.info(
    `Imported ${pagesManifest.pages.length} Lubliner pages and ${sourceMedia.length} media documents.`,
  )
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
