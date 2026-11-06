import { redirect } from 'next/navigation'

import type { Locale } from '@/i18n/config'

type Args = {
  params: Promise<{ locale: Locale }>
}

export default async function CreateurDImageAlias({ params }: Args) {
  const { locale } = await params
  redirect(locale === 'fr' ? '/createur-d-images' : `/${locale}/createur-d-images`)
}
