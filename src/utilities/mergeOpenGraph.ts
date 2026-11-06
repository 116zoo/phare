import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

/**
 * Fallback site description. Also used as the `meta[name=description]` value by
 * `generateMeta`, so every page ships a description even before an editor has
 * filled one in — Lighthouse and most crawlers treat a missing one as a defect.
 */
export const defaultDescription =
  'Lubliner ART, le studio de Jean-Paul Lubliner à Paris : architecture, images, radio, publications et projets artistiques.'

/** Fallback site name, used for Open Graph and JSON-LD publisher. */
export const defaultSiteName = 'Lubliner ART'

export const mergeOpenGraph = (
  og?: Metadata['openGraph'],
  siteName: string = defaultSiteName,
): Metadata['openGraph'] => {
  const defaultImages = [
    {
      url: `${getServerSideURL()}/media/equipe-lubliner-art-architecture-1024x764-e7f63a4a-1200x630.webp`,
    },
  ]

  return {
    type: 'website',
    description: defaultDescription,
    siteName,
    title: siteName,
    ...og,
    images: og?.images ? og.images : defaultImages,
  }
}
