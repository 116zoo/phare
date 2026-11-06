import { Locale } from './config'

/**
 * Build a href following the `as-needed` URL strategy: the default locale
 * (`fr`) is served unprefixed, every other
 * locale gets a `/<locale>` prefix.
 *
 * Passing the prefix through a ternary like `/${locale === 'en' ? '' : locale}/search`
 * yields a double slash for the default locale (`//search`), which browsers treat
 * as a protocol-relative URL and navigate away from the site entirely. Compose the
 * segments instead so the result is always a well-formed path.
 *
 *   localizedHref('fr', 'search')            -> '/search'
 *   localizedHref('en', 'search')            -> '/en/search'
 *   localizedHref('fr')                      -> '/'
 *   localizedHref('en')                      -> '/en'
 */
export const localizedHref = (locale: Locale, path?: string): string => {
  const prefix = locale === 'fr' ? '' : `/${locale}`
  const suffix = path ? (path.startsWith('/') ? path : `/${path}`) : ''

  return `${prefix}${suffix}` || '/'
}
