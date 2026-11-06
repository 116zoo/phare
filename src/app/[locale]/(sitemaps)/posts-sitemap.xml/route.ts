import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { Locale, locales } from '@/i18n/config'
import { localizedHref } from '@/i18n/path'

// ISR: the sitemap is regenerated when a post is published
// (revalidatePost hook) or after 10 minutes at most.
export const revalidate = 600

async function fetchPostsSitemap(locale: Exclude<Locale, 'all'>): Promise<any> {
  const localeConst = locale satisfies Locale

  const payload = await getPayload({ config })
  const SITE_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    'https://example.com'


  const results = await payload.find({
    collection: 'posts',
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

  const sitemap = results.docs
    ? results.docs
        .filter((post) => Boolean(post?.slug))
        .map((post) => ({
          loc: `${SITE_URL}${localizedHref(localeConst, `posts/${post?.slug}`)}`,
          lastmod: post.updatedAt || dateFallback,
        }))
    : []

  return sitemap
}

// Cached per locale: the tag has to match the one the Payload hooks
// revalidate (`posts-sitemap_<locale>`), otherwise the sitemap is never
// invalidated and stays frozen at its first render.
const getPostsSitemap = (locale: Exclude<Locale, 'all'>) =>
  unstable_cache(fetchPostsSitemap, ['posts-sitemap', locale], {
    tags: [`posts-sitemap_${locale}`],
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
  const sitemap = await getPostsSitemap(locale as Exclude<Locale, 'all'>)

  return getServerSideSitemap(sitemap)
}
