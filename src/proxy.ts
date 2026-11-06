import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

const LOCALE_HEADER = 'X-NEXT-INTL-LOCALE'

/** Keep French canonical at the domain root and expose English under `/en`. */
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/next') ||
    pathname.startsWith('/graphql') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const [segment] = pathname.replace(/^\//, '').split('/')
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  )
  const locale = hasLocale ? segment : defaultLocale
  const headers = new Headers(request.headers)
  headers.set(LOCALE_HEADER, locale)

  if (hasLocale) {
    if (locale === defaultLocale) {
      const target = new URL(request.url)
      target.pathname = pathname.replace(/^\/fr(?=\/|$)/, '') || '/'
      return NextResponse.redirect(target, 308)
    }

    return NextResponse.next({ request: { headers } })
  }

  const target = new URL(request.url)
  target.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
  return NextResponse.rewrite(target, { request: { headers } })
}

export const config = {
  matcher: ['/((?!admin|api|_next|next|graphql|.*\\..*).*)'],
}
