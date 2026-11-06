import type { Metadata } from 'next'

import { MagazinePage } from '@/components/MagazinePage'
import { generateEditorialMeta } from '@/utilities/generateEditorialMeta'
import type { Locale } from '@/i18n/config'

type Args = {
  params: Promise<{ locale: Locale }>
}

export default async function MagazineRoute({ params }: Args) {
  const { locale } = await params

  return <MagazinePage locale={locale} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params

  return generateEditorialMeta({
    locale,
    title: 'Magazine | Jean-Paul Lubliner',
    description:
      locale === 'en'
        ? 'Jean-Paul Lubliner’s magazine: architecture, art, culture and contemporary transformations.'
        : 'Le magazine de Jean-Paul Lubliner : architecture, art, culture et transformations contemporaines.',
    path: 'magazine',
  })
}
