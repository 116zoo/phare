'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'
import { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { Menu, SearchIcon, X } from 'lucide-react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { useTranslations } from 'next-intl'
import { localizedHref } from '@/i18n/path'
import { useEffect, useRef, useState } from 'react'

import styles from './HeaderNav.module.css'

export const HeaderNav: React.FC<{ data: HeaderType; locale: Locale }> = ({ data, locale }) => {
  const navItems = data?.navItems || []
  const [presentationItem, ...restItems] = navItems
  const menuItems = restItems.filter(({ link }) => {
    const url = link?.url?.replace(/\/$/, '')

    return url !== '/contact' && url !== '/les-projets-artistiques'
  })
  const t = useTranslations('a11y')
  const tNav = useTranslations('nav')
  const tSearch = useTranslations('search')
  const [presentationOpen, setPresentationOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const presentationRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setPresentationOpen(false)
        setMobileOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPresentationOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <nav
      aria-label={t('mainNavigation')}
      className="relative flex items-center justify-end"
      ref={navRef}
    >
      <div className="hidden items-center gap-5 lg:flex">
        {presentationItem?.link && (
          <div
            className="relative"
            onMouseEnter={() => setPresentationOpen(true)}
            onMouseLeave={() => setPresentationOpen(false)}
            ref={presentationRef}
          >
            <button
              aria-controls="presentation-menu"
              aria-expanded={presentationOpen}
              aria-haspopup="true"
              className={`${styles.navAction} group gap-2`}
              onFocus={() => setPresentationOpen(true)}
              type="button"
            >
              {presentationItem.link.label || 'Présentation'}
              <span
                aria-hidden="true"
                className={`text-[0.6rem] transition-transform ${presentationOpen ? 'rotate-180' : ''}`}
              >
                ↓
              </span>
            </button>

            <div
              className={`absolute right-0 top-full z-50 mt-5 w-80 origin-top-right rounded-2xl border border-white/15 bg-black/95 p-2 text-white shadow-2xl shadow-black/40 backdrop-blur transition-all ${presentationOpen ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'}`}
              id="presentation-menu"
              role="menu"
            >
              <div className="mb-1 border-b border-white/10 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/45">
                Explorer
              </div>
              {menuItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  className={`${styles.submenuLink} group items-center justify-between rounded-xl`}
                  locale={locale}
                  {...link}
                  appearance="inline"
                  onClick={() => setPresentationOpen(false)}
                />
              ))}
            </div>
          </div>
        )}
        <Link
          className={styles.navAction}
          href={localizedHref(locale, 'magazine')}
        >
          Magazine
        </Link>
        <Link
          className={styles.navAction}
          href={localizedHref(locale, 'contact')}
        >
          {tNav('contact')}
        </Link>
        <Link
          aria-label={tSearch('label')}
          className={styles.iconAction}
          href={localizedHref(locale, 'search')}
        >
          <SearchIcon aria-hidden="true" className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2 border-l border-white/20 pl-4">
          <LanguageSwitcher />
          <ThemeSelector />
        </div>
      </div>

      <button
        aria-controls="mobile-navigation"
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:border-[#d8f24e] hover:text-[#d8f24e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8f24e] focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:hidden"
        onClick={() => setMobileOpen((open) => !open)}
        type="button"
      >
        {mobileOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
      </button>

      <div
        className={`absolute right-0 top-[calc(100%+1rem)] z-50 w-[min(22rem,calc(100vw-2rem))] origin-top-right rounded-2xl border border-[#d8f24e]/55 bg-black/95 p-3 text-white shadow-2xl shadow-black/50 backdrop-blur transition-all lg:hidden ${mobileOpen ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'}`}
        id="mobile-navigation"
      >
        <div className="border-b border-white/10 px-3 pb-3 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[#d8f24e]">
          Navigation
        </div>
        <div className="py-2">
          {menuItems.map(({ link }, i) => (
            <CMSLink
              key={i}
              className={`${styles.submenuLink} rounded-xl`}
              locale={locale}
              {...link}
              appearance="inline"
              onClick={() => setMobileOpen(false)}
            />
          ))}
          <Link
            className={`${styles.mobileNavLink} rounded-xl`}
            href={localizedHref(locale, 'magazine')}
            onClick={() => setMobileOpen(false)}
          >
            Magazine
          </Link>
          <Link
            className={`${styles.mobileNavLink} rounded-xl`}
            href={localizedHref(locale, 'contact')}
            onClick={() => setMobileOpen(false)}
          >
            {tNav('contact')}
          </Link>
          <Link
            className={`${styles.mobileNavLink} flex items-center gap-2 rounded-xl`}
            href={localizedHref(locale, 'search')}
            onClick={() => setMobileOpen(false)}
          >
            <SearchIcon aria-hidden="true" className="h-4 w-4" />
            {tSearch('label')}
          </Link>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-3 pt-3">
          <LanguageSwitcher />
          <ThemeSelector />
        </div>
      </div>
    </nav>
  )
}
