'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import { Locale, locales, defaultLocale } from '@/i18n/config'
import { useTranslations } from 'next-intl'
import { localizedHref } from '@/i18n/path'

const languageOptions: Array<{ flag: string; label: string; locale: Locale }> = [
  { flag: '🇫🇷', label: 'Français', locale: 'fr' },
  { flag: '🇬🇧', label: 'English', locale: 'en' },
]

export function LanguageSwitcher() {
  const pathname = usePathname()
  const t = useTranslations('languageSwitcher')

  // French is the default locale and therefore has no public URL prefix.
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  const pathHasLocale = Boolean(
    firstSegment && locales.includes(firstSegment as (typeof locales)[number]),
  )

  const currentLocale: Locale = pathHasLocale ? (firstSegment as Locale) : defaultLocale

  // The route path with any locale prefix stripped, e.g. `/fr/posts` -> ['posts'].
  const pathSegments = pathHasLocale ? segments.slice(1) : segments

  const switchLocale = (locale: Locale) => {
    const rest = pathSegments.length ? `/${pathSegments.join('/')}` : ''

    // A full document navigation, not a client-side route change: switching
    // locale also switches the rendered tree (the `[locale]` segment), and the
    // RSC request of a soft navigation can be turned down by Vercel's
    // security checkpoint, which then lands the visitor on a challenge page.
    // A hard navigation also guarantees no stale payload from the previous
    // locale is reused.
    window.location.assign(localizedHref(locale, rest) || '/')
  }

  return (
    <div aria-label={t('ariaLabel')} className="flex items-center gap-1" role="group">
      {languageOptions.map(({ flag, label, locale }) => (
        <button
          aria-label={label}
          aria-pressed={currentLocale === locale}
          className={`rounded-sm px-1.5 py-1 text-base leading-none transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#952635] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${currentLocale === locale ? 'opacity-100' : 'opacity-45'}`}
          key={locale}
          onClick={() => switchLocale(locale)}
          title={label}
          type="button"
        >
          <span aria-hidden="true">{flag}</span>
        </button>
      ))}
    </div>
  )
}
