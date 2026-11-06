import { getServerSideSitemap } from 'next-sitemap'

import { getPagesSitemap } from '@/app/[locale]/(sitemaps)/pages-sitemap.xml/route'

export const revalidate = 600

/** Canonical sitemap alias for the default French locale. */
export async function GET() {
  return getServerSideSitemap(await getPagesSitemap('fr'))
}
