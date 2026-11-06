import React from 'react'

import type {
  CtaBandBlock,
  LogoCloudBlock,
  ProductShowcaseBlock,
  StatsCardsBlock,
  StoryCardsBlock,
  TestimonialsBlock,
  TrustGridBlock,
  UseCaseMarqueeBlock,
} from '@/payload-types'
import type { Locale } from '@/i18n/config'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

import { saas, saasButton } from './ui'

type WithLocale<T> = T & { locale?: Locale }

const Arrow = () => (
  <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
    →
  </span>
)

const SectionHeader: React.FC<{
  eyebrow?: string | null
  heading?: string | null
  body?: string | null
  align?: 'left' | 'center'
  children?: React.ReactNode
}> = ({ eyebrow, heading, body, align = 'left', children }) => {
  if (!eyebrow && !heading && !body && !children) return null

  return (
    <div
      className={cn(
        'mb-12 flex flex-col gap-4 md:mb-16',
        align === 'center'
          ? 'items-center text-center'
          : 'md:flex-row md:items-end md:justify-between',
      )}
    >
      <div className={cn('flex max-w-3xl flex-col gap-4', align === 'center' && 'items-center')}>
        {eyebrow && <p className={saas.eyebrow}>{eyebrow}</p>}
        {heading && <h2 className={saas.h2}>{heading}</h2>}
        {body && <p className={saas.lead}>{body}</p>}
      </div>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ Trust strip */

export const LogoCloudBlockComponent: React.FC<WithLocale<LogoCloudBlock>> = ({
  eyebrow,
  rating,
  logos,
  enableLink,
  link,
  locale,
}) => (
  <section className={cn(saas.section, 'border-y border-neutral-200 py-10')}>
    <div className={cn(saas.container, 'flex flex-col items-center gap-6 lg:flex-row lg:gap-10')}>
      <div className="flex shrink-0 flex-col items-center gap-1 lg:items-start">
        {eyebrow && <p className={saas.eyebrow}>{eyebrow}</p>}
        {rating && (
          <p className="text-sm font-medium text-neutral-950">
            <span aria-hidden="true" className="mr-1 tracking-tight text-neutral-950">
              ★★★★★
            </span>
            {rating}
          </p>
        )}
      </div>
      {logos && logos.length > 0 && (
        <ul className="flex flex-1 flex-wrap items-center justify-center gap-x-10 gap-y-4 lg:justify-between">
          {logos.map(({ id, name, logo }) => (
            <li className="flex h-8 items-center" key={id ?? name}>
              {logo && typeof logo === 'object' ? (
                <Media
                  alt={name}
                  htmlElement={null}
                  imgClassName="h-7 w-auto object-contain opacity-70 grayscale"
                  resource={logo}
                />
              ) : (
                <span className="text-lg font-semibold tracking-tight text-neutral-400">
                  {name}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
      {enableLink && link && (
        <CMSLink {...link} className={cn(saas.arrowLink, 'shrink-0')} locale={locale}>
          <Arrow />
        </CMSLink>
      )}
    </div>
  </section>
)

/* ------------------------------------------------------------------ Key figures */

export const StatsCardsBlockComponent: React.FC<WithLocale<StatsCardsBlock>> = ({
  heading,
  eyebrow,
  items,
}) => (
  <section className={cn(saas.section, 'py-20 md:py-28')}>
    <div className={saas.container}>
      <SectionHeader eyebrow={eyebrow} heading={heading} />
      {items && items.length > 0 && (
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ id, label, value, description, logo }, i) => (
            <li
              className={cn(saas.card, 'flex min-h-44 flex-col justify-between p-6 lg:min-h-56')}
              key={id ?? i}
            >
              <div className="flex items-start justify-between gap-4">
                {logo && typeof logo === 'object' ? (
                  <Media
                    alt={label}
                    htmlElement={null}
                    imgClassName="h-6 w-auto object-contain"
                    resource={logo}
                  />
                ) : (
                  <span className="text-sm font-semibold text-neutral-950">{label}</span>
                )}
                <span aria-hidden="true" className="font-mono text-xs text-neutral-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="mt-10">
                <p className="text-4xl font-semibold tracking-tight text-neutral-950">{value}</p>
                {description && <p className="mt-2 text-sm text-neutral-500">{description}</p>}
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  </section>
)

/* ------------------------------------------------------------------ Scrolling tags */

export const UseCaseMarqueeBlockComponent: React.FC<WithLocale<UseCaseMarqueeBlock>> = ({
  lead,
  items,
  enableLink,
  link,
  locale,
}) => {
  const tags = items || []

  return (
    <section className={cn(saas.section, 'overflow-hidden bg-neutral-50 py-20')}>
      {lead && (
        <p className={cn(saas.container, 'mb-10 text-center text-lg font-medium text-neutral-950')}>
          {lead}
        </p>
      )}
      {/* The list is announced once; the duplicated track only exists for the visual loop. */}
      <div className="saas-marquee relative flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {[0, 1].map((copy) => (
          <ul
            aria-hidden={copy === 1 ? true : undefined}
            className="saas-marquee-track flex shrink-0 gap-3 pr-3"
            key={copy}
          >
            {tags.map(({ id, label }) => (
              <li
                className="whitespace-nowrap rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700"
                key={`${copy}-${id ?? label}`}
              >
                {label}
              </li>
            ))}
          </ul>
        ))}
      </div>
      {enableLink && link && (
        <div className="mt-12 flex justify-center">
          <CMSLink {...link} className={saasButton('default')} locale={locale} />
        </div>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------ Testimonials */

export const TestimonialsBlockComponent: React.FC<WithLocale<TestimonialsBlock>> = ({
  heading,
  items,
  locale,
}) => (
  <section className={cn(saas.section, 'py-20 md:py-28')}>
    <div className={saas.container}>
      <SectionHeader heading={heading} />
      <ul className="grid gap-4 md:grid-cols-3">
        {(items || []).map(({ id, quote, name, role, avatar, enableLink, link }) => (
          <li className={cn(saas.card, 'flex flex-col justify-between gap-8 p-8')} key={id ?? name}>
            <blockquote className="text-pretty text-lg leading-relaxed text-neutral-950">
              <p>“{quote}”</p>
            </blockquote>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {avatar && typeof avatar === 'object' ? (
                  <Media
                    alt=""
                    htmlElement={null}
                    imgClassName="size-10 rounded-full object-cover"
                    resource={avatar}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex size-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-600"
                  >
                    {name.charAt(0)}
                  </span>
                )}
                <div className="text-sm">
                  <p className="font-semibold text-neutral-950">{name}</p>
                  {role && <p className="text-neutral-500">{role}</p>}
                </div>
              </div>
              {enableLink && link && (
                <CMSLink {...link} className={saas.arrowLink} locale={locale}>
                  <Arrow />
                </CMSLink>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

/* ------------------------------------------------------------------ Stories */

export const StoryCardsBlockComponent: React.FC<WithLocale<StoryCardsBlock>> = ({
  heading,
  enableLink,
  link,
  items,
  locale,
}) => (
  <section className={cn(saas.section, 'bg-neutral-50 py-20 md:py-28')}>
    <div className={saas.container}>
      <SectionHeader heading={heading}>
        {enableLink && link && (
          <CMSLink {...link} className={saasButton('outline')} locale={locale} />
        )}
      </SectionHeader>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(items || []).map(({ id, title, image, link: storyLink }) => (
          <li
            className={cn(
              saas.card,
              'group relative flex flex-col overflow-hidden transition-shadow focus-within:shadow-lg hover:shadow-lg',
            )}
            key={id ?? title}
          >
            <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
              {image && typeof image === 'object' && (
                <Media
                  alt=""
                  htmlElement={null}
                  imgClassName="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  resource={image}
                />
              )}
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 p-6">
              <h3 className="text-pretty text-base font-medium leading-snug text-neutral-950">
                {title}
              </h3>
              {storyLink && (
                <CMSLink
                  {...storyLink}
                  className={cn(saas.arrowLink, "after:absolute after:inset-0 after:content-['']")}
                  locale={locale}
                >
                  <Arrow />
                </CMSLink>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
)

/* ------------------------------------------------------------------ Commitments grid */

export const TrustGridBlockComponent: React.FC<WithLocale<TrustGridBlock>> = ({
  heading,
  body,
  enableLink,
  link,
  items,
  locale,
}) => (
  <section className={cn(saas.section, 'py-20 md:py-28')}>
    <div className={cn(saas.container, 'grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16')}>
      <div className="flex flex-col items-start gap-6">
        <h2 className={saas.h2}>{heading}</h2>
        {body && <p className={saas.lead}>{body}</p>}
        {enableLink && link && (
          <CMSLink {...link} className={saas.arrowLink} locale={locale}>
            <Arrow />
          </CMSLink>
        )}
      </div>
      {items && items.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {items.map(({ id, title, description, icon }) => (
            <li className={cn(saas.card, 'flex flex-col gap-4 p-6')} key={id ?? title}>
              {icon && typeof icon === 'object' ? (
                <Media
                  alt=""
                  htmlElement={null}
                  imgClassName="size-12 object-contain"
                  resource={icon}
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex size-12 items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50 text-lg"
                >
                  ✓
                </span>
              )}
              <div>
                <h3 className="font-semibold text-neutral-950">{title}</h3>
                {description && <p className="mt-1 text-sm text-neutral-500">{description}</p>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </section>
)

/* ------------------------------------------------------------------ Product showcase */

export const ProductShowcaseBlockComponent: React.FC<WithLocale<ProductShowcaseBlock>> = ({
  eyebrow,
  heading,
  body,
  media,
  stats,
}) => (
  <section className={cn(saas.section, 'py-20 md:py-28')}>
    <div className={saas.container}>
      <SectionHeader align="center" body={body} eyebrow={eyebrow} heading={heading} />
      <div className="relative rounded-3xl border border-neutral-200 bg-neutral-100 p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] md:p-3">
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          {media && typeof media === 'object' ? (
            <Media htmlElement={null} imgClassName="h-auto w-full" resource={media} />
          ) : (
            <ShowcasePlaceholder />
          )}
        </div>
        {stats && stats.length > 0 && (
          <dl className="mt-2 grid grid-cols-2 gap-2 md:mt-3 md:grid-cols-4 md:gap-3">
            {stats.map(({ id, value, label }) => (
              <div className="rounded-2xl border border-neutral-200 bg-white p-5" key={id ?? label}>
                <dt className="text-sm text-neutral-500">{label}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-neutral-950">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  </section>
)

/** Neutral wireframe shown until a screenshot is uploaded. */
const ShowcasePlaceholder = () => (
  <div aria-hidden="true" className="grid aspect-[16/9] grid-cols-[180px_1fr] text-neutral-300">
    <div className="flex flex-col gap-3 border-r border-neutral-200 bg-neutral-50 p-5">
      <div className="h-3 w-20 rounded-full bg-neutral-300" />
      {[0, 1, 2, 3].map((i) => (
        <div className="h-2.5 w-28 rounded-full bg-neutral-200" key={i} />
      ))}
    </div>
    <div className="flex flex-col gap-4 p-6">
      <div className="flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            className={cn('h-7 w-24 rounded-full', i === 0 ? 'bg-neutral-900' : 'bg-neutral-100')}
            key={i}
          />
        ))}
      </div>
      <div className="flex flex-1 items-end gap-2 rounded-xl border border-neutral-200 p-4">
        {[40, 65, 50, 80, 55, 90, 70, 60, 85, 45, 75, 95].map((h, i) => (
          <div className="flex-1 rounded-t bg-neutral-200" key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  </div>
)

/* ------------------------------------------------------------------ Closing CTA */

export const CtaBandBlockComponent: React.FC<WithLocale<CtaBandBlock>> = ({
  heading,
  body,
  links,
  locale,
}) => (
  <section className={cn(saas.section, 'py-20 md:py-28')}>
    <div className={saas.container}>
      <div className="flex flex-col items-center gap-6 rounded-3xl bg-neutral-950 px-6 py-16 text-center text-white md:px-16 md:py-24">
        <h2 className="max-w-3xl text-balance text-3xl font-semibold tracking-tight md:text-5xl md:leading-[1.05]">
          {heading}
        </h2>
        {body && <p className="max-w-2xl text-pretty text-lg text-neutral-300">{body}</p>}
        {links && links.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {links.map(({ id, link }) => (
              <CMSLink
                key={id}
                {...link}
                appearance="inline"
                className={cn(
                  saasButton(link.appearance === 'outline' ? 'outline' : 'default'),
                  link.appearance === 'outline'
                    ? 'border-white/30 bg-transparent text-white hover:bg-white/10'
                    : 'bg-white text-neutral-950 hover:bg-neutral-200',
                )}
                locale={locale}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </section>
)

export const saasBlockComponents = {
  ctaBand: CtaBandBlockComponent,
  logoCloud: LogoCloudBlockComponent,
  productShowcase: ProductShowcaseBlockComponent,
  statsCards: StatsCardsBlockComponent,
  storyCards: StoryCardsBlockComponent,
  testimonials: TestimonialsBlockComponent,
  trustGrid: TrustGridBlockComponent,
  useCaseMarquee: UseCaseMarqueeBlockComponent,
}
