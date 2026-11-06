import { getServerSideSitemap } from 'next-sitemap'

import { getPostsSitemap } from '@/app/[locale]/(sitemaps)/posts-sitemap.xml/route'

export const revalidate = 600

/** Canonical sitemap alias for the default French locale. */
export async function GET() {
  return getServerSideSitemap(await getPostsSitemap('fr'))
}
