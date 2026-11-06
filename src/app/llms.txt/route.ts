import { getPayload } from 'payload'
import config from '@payload-config'

import { locales } from '@/i18n/config'
import { localizedHref } from '@/i18n/path'
import { defaultDescription, defaultSiteName } from '@/utilities/mergeOpenGraph'

const englishPageCopy: Record<string, { title: string; summary: string }> = {
  presentation: {
    title: 'Presentation',
    summary: 'Discover the four creative paths of Jean-Paul Lubliner: architecture, images, radio and publishing.',
  },
  'un-architecte-avant-garde': {
    title: 'An avant-garde architect',
    summary: 'Jean-Paul Lubliner creates living spaces where architecture, art and experience meet.',
  },
  'les-projets-artistiques': {
    title: 'Artistic projects',
    summary: 'Discover Lubliner ART projects combining photography, architecture, design and exhibitions.',
  },
  'createur-de-publications': {
    title: 'Publishing creator',
    summary: 'Jean-Paul Lubliner founded Nouvelles Vagues, created Sans Nom and contributed to Citizen K.',
  },
  'createur-d-images': {
    title: 'Image creator',
    summary: 'Discover Tour Eiffel — An Immobile Journey, Jean-Paul Lubliner’s photographic work from 1999–2000.',
  },
  'un-homme-de-radio': {
    title: 'A man of radio',
    summary: 'Jean-Paul Lubliner created Radio Arlequin and helped launch Radio Nova during the early free-radio years.',
  },
}

const getLlmsCopy = (locale: string, doc: any, fallbackSummary: string) => {
  if (locale === 'en') {
    const staticCopy = englishPageCopy[doc?.slug]
    if (staticCopy) return staticCopy
    // Do not publish a CMS document in the English section until its
    // localized title and AEO summary have been translated. This prevents
    // French fallback content from being presented as English to crawlers.
    return null
  }

  return { title: doc.title, summary: fallbackSummary }
}

export async function GET() {
  const payload = await getPayload({ config })

  const siteUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'https://example.com').replace(/\/+$/, '')
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || defaultSiteName

  // Query each locale explicitly rather than relying on a `locale: 'all'`
  // response exposing a per-document locale field, which it does not.
  const perLocale = await Promise.all(
    locales.map(async (locale) => {
      const localeOptions = {
        locale: locale as 'en' | 'fr' | 'all',
        // Never leak French content into the English machine-readable section.
        // If a translation is missing, omit it rather than publishing the wrong language.
        fallbackLocale: false as const,
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 200,
      }

      const [pages, posts] = await Promise.all([
        payload.find({
          ...localeOptions,
          collection: 'pages',
          sort: '-updatedAt',
          where: { _status: { equals: 'published' } },
        }),
        payload.find({
          ...localeOptions,
          collection: 'posts',
          sort: '-updatedAt',
          where: { _status: { equals: 'published' } },
        }),
      ])

      return { locale, pages: pages.docs, posts: posts.docs }
    }),
  )

  const siteDescription =
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    (locales.includes('en')
      ? 'Lubliner ART, Jean-Paul Lubliner’s Paris studio for architecture, images, radio, publishing and artistic projects.'
      : defaultDescription)

  const lines = [
    `# ${siteName}`,
    '',
    `> ${siteDescription}`,
    '',
    '## Main Content / Contenu principal',
    '',
  ]

  for (const { locale, pages, posts } of perLocale) {
    // The summary lives in the `aeo` group (`aeo.aeoSummary`), not at the root
    // of the document.
    const pageLines = pages
      .filter((page: any) => page?.slug !== 'home' && page?.aeo?.aeoSummary)
      .flatMap((page: any) => {
        const copy = getLlmsCopy(locale, page, page.aeo.aeoSummary)
        return copy
          ? [`- [${copy.title}](${siteUrl}${localizedHref(locale, page.slug)}): ${copy.summary}`]
          : []
      })

    const postLines = posts
      .filter((post: any) => post?.aeo?.aeoSummary)
      .flatMap((post: any) => {
        const copy = getLlmsCopy(locale, post, post.aeo.aeoSummary)
        return copy
          ? [`- [${copy.title}](${siteUrl}${localizedHref(locale, `posts/${post.slug}`)}): ${copy.summary}`]
          : []
      })

    const sectionLines = [...pageLines, ...postLines]
    if (!sectionLines.length) continue

    lines.push(`### ${locale.toUpperCase()}`, '', ...sectionLines, '')
  }

  lines.push(
    '',
    '## Contact / Coordonnées',
    '- Address / Adresse: 8 passage des Abbesses, 75018 Paris, France.',
    `- Contact page / Page contact: ${siteUrl}${localizedHref('fr', 'contact')}`,
    '',
    '## Editorial Principles / Principes éditoriaux',
    `- [Accessibility statement / Déclaration d’accessibilité](${siteUrl}${localizedHref('fr', 'accessibilite')})`,
  )

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
