import type { Metadata } from 'next'

import type { Locale } from '@/i18n/config'
import { CreateurRadioPage } from '@/components/CreateurRadioPage'
import { generateEditorialMeta } from '@/utilities/generateEditorialMeta'

type Args = {
  params: Promise<{ locale: Locale }>
}

export default async function UnHommeDeRadioRoute({ params }: Args) {
  const { locale } = await params

  return <CreateurRadioPage locale={locale} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params

  return generateEditorialMeta({
    locale,
    title: locale === 'en' ? 'A man of radio | Lubliner ART' : 'Un homme de radio | Lubliner ART',
    description:
      locale === 'en'
        ? 'Jean-Paul Lubliner, radio pioneer and co-founder of Radio Arlequin and Radio Nova between 1980 and 1986.'
        : 'Jean-Paul Lubliner, homme de radio et cofondateur de Radio Arlequin et de Radio Nova entre 1980 et 1986.',
    path: 'un-homme-de-radio',
  })
}
