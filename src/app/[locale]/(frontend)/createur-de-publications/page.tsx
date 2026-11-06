import type { Metadata } from 'next'

import type { Locale } from '@/i18n/config'
import { CreateurPublicationsPage } from '@/components/CreateurPublicationsPage'
import { generateEditorialMeta } from '@/utilities/generateEditorialMeta'

type Args = {
  params: Promise<{ locale: Locale }>
}

export default async function CreateurDePublicationsRoute({ params }: Args) {
  const { locale } = await params

  return <CreateurPublicationsPage locale={locale} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params

  return generateEditorialMeta({
    locale,
    title: locale === 'en' ? 'Publisher | Lubliner ART' : 'Créateur de publications | Lubliner ART',
    description:
      locale === 'en'
        ? 'Jean-Paul Lubliner, founder of Nouvelles Vagues and contributor to the creation of Citizen K.'
        : 'Jean-Paul Lubliner, fondateur de Nouvelles Vagues et acteur de la création de Citizen K.',
    path: 'createur-de-publications',
  })
}
