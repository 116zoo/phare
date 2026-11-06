import clsx from 'clsx'
import React from 'react'
import type { Locale } from '@/i18n/config'

interface Props {
  className?: string
  descriptionClassName?: string
  locale?: Locale
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    descriptionClassName,
    locale = 'fr',
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <span className="flex flex-col items-center text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt="Lubliner Art"
        width={231}
        height={308}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className={clsx('h-[120px] w-auto max-w-none object-contain', className)}
        src="/media/lubliner/lubliner-art-logo.png"
      />
      <span className={clsx('mt-2 max-w-[15rem] text-[0.62rem] leading-[1.35] opacity-75', descriptionClassName)}>
        {locale === 'en'
          ? 'Jean-Paul Lubliner is an art designer. His refuge is located at 8 passage des Abbesses, 75018, PARIS FRANCE'
          : 'Jean-Paul Lubliner est un art concepteur. Son refuge est situé au 8 passage des abbesses, 75018, PARIS FRANCE'}
      </span>
    </span>
  )
}
