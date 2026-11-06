import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { localizedHref } from '@/i18n/path'

type Props = {
  brandName: string
  data: Footer
  locale: Locale
  labels: { footerNavigation: string; socialLinks: string }
}

const linkClass =
  'text-sm text-neutral-500 transition-colors hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950'

/**
 * "Platform" footer: brand + tagline + badges on the left, up to six link columns
 * (each with an optional sub-group), social links and a bottom copyright bar.
 */
export const SaasFooter: React.FC<Props> = ({ brandName, data, labels, locale }) => {
  const columns = data.columns || []

  return (
    <footer className="border-t border-neutral-200 bg-white text-neutral-950">
      <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_3fr] lg:px-8 lg:py-20">
        <div className="flex flex-col items-start gap-5">
          <Link className="text-lg font-semibold tracking-tight" href={localizedHref(locale)}>
            {brandName}
          </Link>
          {data.tagline && <p className="max-w-xs text-sm text-neutral-500">{data.tagline}</p>}
          {data.badges && data.badges.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {data.badges.map(({ id, label }) => (
                <li
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-medium text-neutral-600"
                  key={id ?? label}
                >
                  {label}
                </li>
              ))}
            </ul>
          )}
          {data.socials && data.socials.length > 0 && (
            <nav aria-label={labels.socialLinks}>
              <ul className="flex flex-wrap gap-4">
                {data.socials.map(({ id, label, url }) => (
                  <li key={id ?? url}>
                    <a className={linkClass} href={url} rel="noopener noreferrer" target="_blank">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {columns.length > 0 && (
          <nav
            aria-label={labels.footerNavigation}
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 xl:grid-cols-5"
          >
            {columns.map((column, i) => (
              <div className="flex flex-col gap-4" key={column.id ?? i}>
                <h2 className="text-sm font-semibold text-neutral-950">{column.title}</h2>
                <ul className="flex flex-col gap-2.5">
                  {(column.links || []).map(({ id, link }, j) => (
                    <li key={id ?? j}>
                      <CMSLink {...link} className={linkClass} locale={locale} />
                    </li>
                  ))}
                </ul>
                {column.subTitle && (
                  <h3 className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-neutral-400">
                    {column.subTitle}
                  </h3>
                )}
                {column.subLinks && column.subLinks.length > 0 && (
                  <ul className="flex flex-col gap-2.5">
                    {column.subLinks.map(({ id, link }, j) => (
                      <li key={id ?? j}>
                        <CMSLink {...link} className={linkClass} locale={locale} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        )}
      </div>
      <div className="border-t border-neutral-200">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-neutral-500 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} {data.copyright || brandName}
          </p>
        </div>
      </div>
    </footer>
  )
}
