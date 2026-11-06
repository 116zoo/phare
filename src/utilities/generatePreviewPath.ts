import { PreviewSearchParams } from '@/app/next/preview/route'
import { PayloadRequest, CollectionSlug } from 'payload'
import { Locale } from '@/i18n/config'
import { localizedHref } from '@/i18n/path'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, req }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  // Get locale from request, default to French at the domain root.
  const locale = (req.locale as Locale) || 'fr'

  // Encode to support slugs with special characters
  const encodedSlug = encodeURIComponent(slug)

  const encodedParams = new URLSearchParams({
    path: localizedHref(locale, `${collectionPrefixMap[collection]}/${encodedSlug}`),
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
