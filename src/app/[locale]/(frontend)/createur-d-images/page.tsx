import type { Metadata } from 'next'

import type { Locale } from '@/i18n/config'
import { TourEiffel2000Page } from '@/components/TourEiffel2000Page'

type Args = {
  params: Promise<{ locale: Locale }>
}

export default async function CreateurDImagesRoute({ params }: Args) {
  const { locale } = await params

  return <TourEiffel2000Page locale={locale} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'en' ? 'Image creator — Eiffel Tower | Lubliner ART' : 'Créateur d’images — Tour Eiffel | Lubliner ART',
    description:
      locale === 'en'
        ? 'Jean-Paul Lubliner, image creator. Discover Eiffel Tower — An Immobile Journey, a photographic work created between 1999 and 2000.'
        : 'Jean-Paul Lubliner, créateur d’images. Découvrez Tour Eiffel — Un voyage immobile, œuvre photographique réalisée entre 1999 et 2000.',
    alternates: {
      canonical: locale === 'fr' ? '/createur-d-images' : `/${locale}/createur-d-images`,
    },
  }
}
