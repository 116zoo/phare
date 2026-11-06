'use client'

import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React from 'react'

import { Breadcrumb } from '@/components/a11y'
import { defaultLocale, Locale, locales } from '@/i18n/config'
import { localizedHref } from '@/i18n/path'

const routeLabels: Record<string, string> = {
  architecte: 'Architecte',
  'createur-d-image': 'Créateur d’image',
  'createur-d-images': 'Créateur d’images',
  'createur-de-publications': 'Créateur de publications',
  'createur-de-radio': 'Un homme de radio',
  contact: 'Contact',
  'les-projets-artistiques': 'Les projets artistiques',
  'tour-eiffel-2000': 'Tour Eiffel 2000',
  'un-architecte-avant-garde': 'Un architecte avant-garde',
  'un-homme-de-radio': 'Un homme de radio',
  accessibilite: 'Accessibilité',
}

const routeLabelsEn: Record<string, string> = {
  architecte: 'Architect',
  'createur-d-image': 'Image creator',
  'createur-d-images': 'Image creator',
  'createur-de-publications': 'Publisher',
  'createur-de-radio': 'A man of radio',
  contact: 'Contact',
  'les-projets-artistiques': 'Art projects',
  'tour-eiffel-2000': 'Eiffel Tower 2000',
  'un-architecte-avant-garde': 'An avant-garde architect',
  'un-homme-de-radio': 'A man of radio',
  accessibilite: 'Accessibility',
  magazine: 'Magazine',
}

const labelFromSegment = (segment: string) =>
  decodeURIComponent(segment)
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

export const SiteBreadcrumb: React.FC = () => {
  const pathname = usePathname()
  const tNav = useTranslations('nav')

  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  const hasLocalePrefix = Boolean(
    firstSegment && locales.includes(firstSegment as (typeof locales)[number]),
  )
  const locale: Locale = hasLocalePrefix ? (firstSegment as Locale) : defaultLocale
  const pathSegments = hasLocalePrefix ? segments.slice(1) : segments

  if (pathSegments.length === 0) return null

  const currentSegment = pathSegments[pathSegments.length - 1]
  const isPost = pathSegments[0] === 'posts'
  const labels = locale === 'en' ? routeLabelsEn : routeLabels
  const currentLabel = isPost && pathSegments.length > 1
    ? labelFromSegment(currentSegment)
    : labels[currentSegment] || labelFromSegment(currentSegment)

  const items = [
    { label: tNav('home'), href: localizedHref(locale) },
    ...(isPost
      ? [{ label: tNav('posts'), href: localizedHref(locale, 'posts') }]
      : []),
    { label: currentLabel },
  ]

  return (
    <div className="border-b border-black/10 bg-white dark:border-white/10 dark:bg-background">
      <div className="container py-3">
        <Breadcrumb className="text-xs" items={items} />
      </div>
    </div>
  )
}
