import { cn } from '@/utilities/ui'

/**
 * Design tokens of the "Platform" style: neutral monochrome palette, generous white
 * space, tight geometric headings, pill buttons and softly bordered cards.
 */
export const saas = {
  section: 'saas-section bg-white text-neutral-950',
  container: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
  eyebrow: 'text-xs font-medium uppercase tracking-[0.18em] text-neutral-500',
  h2: 'text-balance text-3xl font-semibold tracking-tight text-neutral-950 md:text-5xl md:leading-[1.05]',
  lead: 'text-pretty text-lg leading-relaxed text-neutral-600',
  card: 'rounded-2xl border border-neutral-200 bg-white',
  arrowLink:
    'group inline-flex items-center gap-1 text-sm font-medium text-neutral-950 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950',
}

export const saasButton = (
  variant: 'default' | 'outline' | null | undefined = 'default',
  className?: string,
) =>
  cn(
    'inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950',
    variant === 'outline'
      ? 'border border-neutral-300 bg-white text-neutral-950 hover:bg-neutral-100'
      : 'bg-neutral-950 text-white hover:bg-neutral-800',
    className,
  )
