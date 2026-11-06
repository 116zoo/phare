import { redirect } from 'next/navigation'

import type { Locale } from '@/i18n/config'

type Args = {
  params: Promise<{ locale: Locale }>
}

export default async function CreateurDeRadioRoute({ params }: Args) {
  const { locale } = await params
  redirect(locale === 'fr' ? '/un-homme-de-radio' : `/${locale}/un-homme-de-radio`)
}
