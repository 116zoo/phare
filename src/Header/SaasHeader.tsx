'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React, { useEffect, useId, useRef, useState } from 'react'

import type { Header, Media as MediaType } from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { saasButton } from '@/blocks/Saas/ui'
import { localizedHref } from '@/i18n/path'
import { cn } from '@/utilities/ui'

type Props = {
  brandName: string
  data: Header
  locale: Locale
  logo: number | MediaType | null
}

const navTrigger =
  'inline-flex h-9 items-center gap-1 rounded-full px-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950'

/**
 * "Platform" header: optional announcement bar, sticky white bar with the brand on the
 * left, a centred menu whose items can open a drop-down panel, and pill buttons on the
 * right. On small screens everything folds into a full-width panel.
 */
export const SaasHeader: React.FC<Props> = ({ brandName, data, locale, logo }) => {
  const t = useTranslations('a11y')
  const pathname = usePathname()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const baseId = useId()

  const navItems = data?.navItems || []
  const ctas = data?.ctas || []
  const announcement = data?.announcement
  const customLogo = logo && typeof logo === 'object' ? logo : null

  // Close the menus after a navigation (state reset during render, not in an effect).
  const [lastPathname, setLastPathname] = useState(pathname)
  if (pathname !== lastPathname) {
    setLastPathname(pathname)
    setOpenIndex(null)
    setMobileOpen(false)
  }

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpenIndex(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenIndex(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div className="sticky top-0 z-40">
      {announcement?.enabled && announcement.text && (
        <div className="bg-neutral-950 px-4 py-2 text-center text-sm text-white">
          <span>{announcement.text}</span>
          {announcement.url && announcement.linkLabel && (
            <a
              className="ml-2 font-medium underline underline-offset-4 hover:text-neutral-300"
              href={announcement.url}
            >
              {announcement.linkLabel} <span aria-hidden="true">→</span>
            </a>
          )}
        </div>
      )}

      <header className="border-b border-neutral-200 bg-white/85 text-neutral-950 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          <Link
            className="flex shrink-0 items-center gap-2 text-lg font-semibold tracking-tight"
            href={localizedHref(locale)}
          >
            {customLogo?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img alt={customLogo.alt || brandName} className="h-8 w-auto" src={customLogo.url} />
            ) : (
              brandName
            )}
          </Link>

          <nav aria-label={t('mainNavigation')} className="hidden lg:block" ref={navRef}>
            <ul className="flex items-center gap-1">
              {navItems.map((item, i) => {
                const children = item.children || []
                const panelId = `${baseId}-panel-${i}`

                if (!children.length) {
                  return (
                    <li key={item.id ?? i}>
                      <CMSLink {...item.link} className={navTrigger} locale={locale} />
                    </li>
                  )
                }

                const open = openIndex === i

                return (
                  <li
                    className="relative"
                    key={item.id ?? i}
                    onMouseEnter={() => setOpenIndex(i)}
                    onMouseLeave={() => setOpenIndex(null)}
                  >
                    <button
                      aria-controls={panelId}
                      aria-expanded={open}
                      className={cn(navTrigger, open && 'bg-neutral-100 text-neutral-950')}
                      onClick={() => setOpenIndex(open ? null : i)}
                      type="button"
                    >
                      {item.link.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={cn('size-4 transition-transform', open && 'rotate-180')}
                      />
                    </button>
                    <div
                      className={cn(
                        'absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-3 transition-all',
                        open ? 'visible opacity-100' : 'invisible -translate-y-1 opacity-0',
                      )}
                      id={panelId}
                    >
                      <ul className="grid grid-cols-2 gap-1 rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-neutral-950/5">
                        {children.map((child, j) => (
                          <li key={child.id ?? j}>
                            <CMSLink
                              {...child.link}
                              className="flex flex-col gap-0.5 rounded-xl p-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-50 focus-visible:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-neutral-950"
                              locale={locale}
                            >
                              {child.description && (
                                <span className="text-[13px] font-normal text-neutral-500">
                                  {child.description}
                                </span>
                              )}
                            </CMSLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <div className="text-neutral-700 [&_button]:text-neutral-700">
              <LanguageSwitcher />
            </div>
            {ctas.map(({ id, link }, i) => (
              <CMSLink
                key={id ?? i}
                {...link}
                appearance="inline"
                className={saasButton(
                  link.appearance === 'outline' ? 'outline' : 'default',
                  'h-9 px-4',
                )}
                locale={locale}
              />
            ))}
          </div>

          <button
            aria-controls={`${baseId}-mobile`}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
            className="inline-flex size-10 items-center justify-center rounded-full border border-neutral-200 lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            type="button"
          >
            {mobileOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>

        <div
          className={cn(
            'max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-neutral-200 bg-white px-4 pb-6 pt-2 lg:hidden',
            !mobileOpen && 'hidden',
          )}
          id={`${baseId}-mobile`}
        >
          <nav aria-label={t('mainNavigation')}>
            <ul className="divide-y divide-neutral-100">
              {navItems.map((item, i) => {
                const children = item.children || []

                return (
                  <li className="py-2" key={item.id ?? i}>
                    {children.length ? (
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between py-2 font-medium">
                          {item.link.label}
                          <ChevronDown
                            aria-hidden="true"
                            className="size-4 transition-transform group-open:rotate-180"
                          />
                        </summary>
                        <ul className="flex flex-col gap-1 pb-2 pl-2">
                          {children.map((child, j) => (
                            <li key={child.id ?? j}>
                              <CMSLink
                                {...child.link}
                                className="block rounded-lg px-2 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
                                locale={locale}
                              />
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <CMSLink {...item.link} className="block py-2 font-medium" locale={locale} />
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            {ctas.map(({ id, link }, i) => (
              <CMSLink
                key={id ?? i}
                {...link}
                appearance="inline"
                className={saasButton(
                  link.appearance === 'outline' ? 'outline' : 'default',
                  'w-full',
                )}
                locale={locale}
              />
            ))}
            <div className="mt-2 flex justify-center">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
