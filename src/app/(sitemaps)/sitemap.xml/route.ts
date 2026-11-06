const siteUrl = (process.env.NEXT_PUBLIC_SERVER_URL || 'https://example.com').replace(/\/+$/, '')

export const revalidate = 600

/** Standard sitemap index for crawlers that only request /sitemap.xml. */
export function GET(): Response {
  const sitemapUrls = [
    `${siteUrl}/pages-sitemap.xml`,
    `${siteUrl}/posts-sitemap.xml`,
    `${siteUrl}/en/pages-sitemap.xml`,
    `${siteUrl}/en/posts-sitemap.xml`,
  ]

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...sitemapUrls.map((url) => `  <sitemap><loc>${url}</loc></sitemap>`),
    '</sitemapindex>',
  ].join('\n')

  return new Response(xml, {
    headers: {
      'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
