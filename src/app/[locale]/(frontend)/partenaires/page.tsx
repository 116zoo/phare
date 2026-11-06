import type { Metadata } from 'next'

import type { Locale } from '@/i18n/config'
import { PartnersPage } from '@/components/PartnersPage'
import { generateEditorialMeta } from '@/utilities/generateEditorialMeta'

type Props = {
  params: Promise<{ locale: Locale }>
}

export const dynamic = 'force-static'
export const revalidate = 600

export default async function PartnersRoute({ params }: Props) {
  const { locale } = await params

  return <PartnersPage locale={locale} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEnglish = locale === 'en'

  return generateEditorialMeta({
    locale,
    title: isEnglish ? 'Partners | Lubliner ART' : 'Partenaires | Lubliner ART',
    description: isEnglish
      ? 'Discover the trusted brands, makers and specialists who work with Lubliner ART.'
      : 'Découvrez les marques, fabricants et spécialistes qui collaborent avec Lubliner ART.',
    path: 'partenaires',
  })
}
