import type { Metadata } from 'next'

import type { Locale } from '@/i18n/config'
import { PresentationPage } from '@/components/PresentationPage'

type Args = {
  params: Promise<{ locale: Locale }>
}

export const dynamic = 'force-static'
export const revalidate = 600

export default async function PresentationRoute({ params }: Args) {
  const { locale } = await params

  return <PresentationPage locale={locale} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const isEnglish = locale === 'en'

  return {
    title: isEnglish ? 'Presentation | Lubliner ART' : 'Présentation | Lubliner ART',
    description: isEnglish
      ? 'Discover the four creative paths of Jean-Paul Lubliner: architecture, images, radio and publishing.'
      : 'Découvrez les quatre chemins créatifs de Jean-Paul Lubliner : architecture, images, radio et publications.',
    alternates: {
      canonical: locale === 'fr' ? '/presentation' : `/${locale}/presentation`,
    },
  }
}
