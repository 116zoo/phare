import type { Metadata } from 'next'

import { HomePage } from '@/components/HomePage'
import type { Locale } from '@/i18n/config'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

/**
 * The home route re-exports the `[slug]` page, but Next.js only honours the
 * segment config declared **in this file** — without `force-static` here, the
 * layout's `draftMode()` would keep the home server-rendered on demand.
 */
export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{ locale: Locale }>
}

export default async function HomeRoute({ params }: Args) {
  const { locale } = await params

  return <HomePage locale={locale} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const title = 'Lubliner ART — Jean-Paul Lubliner'
  const description =
    locale === 'en'
      ? 'Lubliner ART, Jean-Paul Lubliner’s Paris studio for architecture, images, radio, publishing and artistic projects.'
      : 'Lubliner ART, le studio parisien de Jean-Paul Lubliner : architecture, images, radio, publications et projets artistiques.'
  const canonical = locale === 'fr' ? '/' : `/${locale}`

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: mergeOpenGraph({ title, description, url: canonical }, 'Lubliner ART'),
  }
}
