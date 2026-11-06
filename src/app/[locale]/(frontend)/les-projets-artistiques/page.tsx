import type { Metadata } from 'next'

import type { Locale } from '@/i18n/config'
import { ArtProjectsPage } from '@/components/ArtProjectsPage'
import { generateEditorialMeta } from '@/utilities/generateEditorialMeta'

type Props = {
  params: Promise<{ locale: Locale }>
}

export default async function ArtistProjectsRoute({ params }: Props) {
  const { locale } = await params

  return <ArtProjectsPage locale={locale} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const isEnglish = locale === 'en'

  return generateEditorialMeta({
    locale,
    title: isEnglish ? 'Art projects | Lubliner ART' : 'Projets artistiques | Lubliner ART',
    description: isEnglish
      ? 'Discover the artistic projects of Jean-Paul Lubliner, where photography, architecture and design meet.'
      : 'Découvrez les projets artistiques de Jean-Paul Lubliner, entre photographie, architecture et design.',
    path: 'les-projets-artistiques',
  })
}
