import type { Metadata } from 'next'

import type { Locale } from '@/i18n/config'
import { localizedHref } from '@/i18n/path'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

export const generateEditorialMeta = ({
  locale,
  title,
  description,
  path,
}: {
  locale: Locale
  title: string
  description: string
  path: string
}): Metadata => {
  const canonical = localizedHref(locale, path)

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: mergeOpenGraph({ title, description, url: canonical }, 'Lubliner ART'),
  }
}
