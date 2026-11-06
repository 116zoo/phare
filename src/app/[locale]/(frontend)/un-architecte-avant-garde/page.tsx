import type { Metadata } from 'next'

import { ArchitectePage } from '@/components/ArchitectePage'
import type { Locale } from '@/i18n/config'

type Args = {
  params: Promise<{ locale: Locale }>
}

export default async function UnArchitecteAvantGardeRoute({ params }: Args) {
  const { locale } = await params

  return <ArchitectePage locale={locale} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params

  return {
    title: locale === 'en' ? 'An avant-garde architect | Lubliner ART' : 'Un architecte avant-garde | Lubliner ART',
    description:
      locale === 'en'
        ? 'Jean-Paul Lubliner, avant-garde architect and creator of living spaces. Discover his projects.'
        : 'Jean-Paul Lubliner, architecte avant-garde et créateur d’espaces vivants. Découvrez ses projets.',
    alternates: {
      canonical: locale === 'fr' ? '/un-architecte-avant-garde' : `/${locale}/un-architecte-avant-garde`,
    },
  }
}
