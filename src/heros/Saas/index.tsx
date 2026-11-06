import React from 'react'

import type { Page } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { saasButton } from '@/blocks/Saas/ui'
import { cn } from '@/utilities/ui'

/**
 * "Platform" hero: badge, very large centred headline, subtitle, one or two pill
 * buttons and a small reassurance note, over an optional toned-down background.
 */
export const SaasHero: React.FC<Page['hero'] & { locale?: Locale }> = ({
  badge,
  backgroundMedia,
  links,
  locale,
  note,
  richText,
}) => {
  const hasBackground = Boolean(backgroundMedia && typeof backgroundMedia === 'object')

  return (
    <section className="relative isolate overflow-hidden bg-white text-neutral-950">
      {hasBackground && (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Media
            fill
            htmlElement={null}
            imgClassName="object-cover opacity-25"
            priority
            resource={backgroundMedia}
            videoClassName="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white" />
        </div>
      )}
      {!hasBackground && (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,theme(colors.neutral.100),transparent_60%)]"
        />
      )}

      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-20 pt-24 text-center sm:px-6 md:pb-28 md:pt-32">
        {badge?.label &&
          (badge.url ? (
            <a
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-neutral-700 backdrop-blur transition-colors hover:border-neutral-300 hover:text-neutral-950"
              href={badge.url}
            >
              <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
              {badge.label}
            </a>
          ) : (
            <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-4 py-1.5 text-sm font-medium text-neutral-700">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
              {badge.label}
            </p>
          ))}

        {richText && (
          <RichText
            className={cn(
              'saas-hero-text max-w-none text-neutral-600',
              '[&_h1]:text-balance [&_h1]:text-5xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-neutral-950 md:[&_h1]:text-7xl md:[&_h1]:leading-[1.02]',
              '[&_p]:mx-auto [&_p]:mt-6 [&_p]:max-w-2xl [&_p]:text-pretty [&_p]:text-lg md:[&_p]:text-xl',
            )}
            data={richText}
            enableGutter={false}
            enableProse={false}
          />
        )}

        {links && links.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {links.map(({ id, link }, i) => (
              <CMSLink
                key={id ?? i}
                {...link}
                appearance="inline"
                className={saasButton(i === 0 ? 'default' : 'outline', 'h-12 px-7 text-base')}
                locale={locale}
              />
            ))}
          </div>
        )}

        {note && <p className="mt-4 text-sm text-neutral-500">{note}</p>}
      </div>
    </section>
  )
}
