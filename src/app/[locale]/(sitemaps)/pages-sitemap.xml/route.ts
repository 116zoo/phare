import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { Locale, locales } from '@/i18n/config'
import { localizedHref } from '@/i18n/path'

// ISR: the sitemap is regenerated when a page is published
// (revalidatePage hook) or after 10 minutes at most.
export const revalidate = 600

// Internal function with proper typing
async function fetchPagesSitemap(locale: Exclude<Locale, 'all'>): Promise<any> {
  // Narrow the locale type to prevent widening
  const localeConst = locale satisfies Locale

  const payload = await getPayload({ config })
  const SITE_URL = (
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'
  ).replace(/\/+$/, '')


  const results = await payload.find({
    collection: 'pages',
    locale: localeConst as 'en' | 'fr' | 'all',
    fallbackLocale: 'fr',
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1000,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const dateFallback = new Date().toISOString()

  const defaultSitemap = [
    {
      loc: `${SITE_URL}${localizedHref(localeConst, 'partenaires')}`,
      lastmod: dateFallback,
    },
    // Internal search results are not editorial landing pages and stay out of
    // the public sitemap.
    {
      loc: `${SITE_URL}${localizedHref(localeConst, 'posts')}`,
      lastmod: dateFallback,
    },
  ]

  const sitemap = results.docs
    ? results.docs
        .filter((page) => Boolean(page?.slug))
        .map((page) => {
          return {
            loc:
              page?.slug === 'home'
                ? `${SITE_URL}${localizedHref(localeConst)}`
                : `${SITE_URL}${localizedHref(localeConst, page?.slug || '')}`,
            lastmod: page.updatedAt || dateFallback,
          }
        })
    : []

  return [...defaultSitemap, ...sitemap]
}

// Cached per locale: the tag has to match the one the Payload hooks
// revalidate (`pages-sitemap_<locale>`), otherwise the sitemap is never
// invalidated and stays frozen at its first render.
export const getPagesSitemap = (locale: Exclude<Locale, 'all'>) =>
  unstable_cache(fetchPagesSitemap, ['pages-sitemap', locale], {
    tags: [`pages-sitemap_${locale}`],
  })(locale)

interface RouteProps {
  params: Promise<{ locale: string }>
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { locale } = await params
  // Validate locale
  if (!locales.includes(locale as (typeof locales)[number])) {
    return new Response('Invalid locale', { status: 404 })
  }
  const sitemap = await getPagesSitemap(locale as Exclude<Locale, 'all'>)

  return getServerSideSitemap(sitemap)
}
