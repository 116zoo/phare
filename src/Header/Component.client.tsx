'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

import type { Header } from '@/payload-types'
import type { Media } from '@/payload-types'
import { Locale } from '@/i18n/config'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { localizedHref } from '@/i18n/path'

interface HeaderClientProps {
  data: Header
  locale: Locale
  brandName: string
  logo: number | Media | null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ brandName, data, locale, logo }) => {
  /* `headerTheme` is read from the DOM on the client only, so the attribute is deferred
     past hydration via suppressHydrationWarning rather than a second render of local state */
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  const customLogo = logo && typeof logo === 'object' ? logo : null

  return (
    <header
      className="relative z-20 bg-black text-white"
      suppressHydrationWarning
      {...(headerTheme ? { 'data-theme': headerTheme } : {})}
    >
      <div className="container flex min-h-[150px] items-center justify-between gap-6 py-0">
        <Link className="flex h-[150px] shrink-0 items-start py-1" href={localizedHref(locale)}>
          {customLogo?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={customLogo.alt || brandName}
              className="h-[142px] w-auto max-w-none object-contain"
              src={customLogo.url}
            />
          ) : (
            <Logo loading="eager" priority="high" className="h-[142px] max-w-none" locale={locale} />
          )}
        </Link>
        <HeaderNav data={data} locale={locale} />
      </div>
    </header>
  )
}
