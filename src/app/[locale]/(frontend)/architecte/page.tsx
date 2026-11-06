import { redirect } from 'next/navigation'

import type { Locale } from '@/i18n/config'

type Args = {
  params: Promise<{ locale: Locale }>
}

export default async function ArchitecteRoute({ params }: Args) {
  const { locale } = await params

  redirect(locale === 'fr' ? '/un-architecte-avant-garde' : `/${locale}/un-architecte-avant-garde`)
}
