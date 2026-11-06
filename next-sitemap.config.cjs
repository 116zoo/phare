const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

// The locale-scoped sitemaps are route handlers under `src/app/[locale]/(sitemaps)`,
// French is the default locale at the root; English is served under `/en`.
const LOCALES = ['fr', 'en']

const additionalSitemaps = LOCALES.flatMap((locale) => {
  const prefix = locale === 'fr' ? '' : `/${locale}`

  return [
    `${SITE_URL}${prefix}/pages-sitemap.xml`,
    `${SITE_URL}${prefix}/posts-sitemap.xml`,
  ]
})

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  // `src/app/robots.txt/route.ts` is the source of truth for robots.txt.
  generateRobotsTxt: false,
  exclude: [
    '/posts-sitemap.xml',
    '/pages-sitemap.xml',
    '/admin',
    '/admin/*',
    '/api',
    '/api/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin', '/admin/*'],
      },
    ],
    additionalSitemaps,
  },
}
