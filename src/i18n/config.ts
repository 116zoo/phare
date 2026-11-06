export const locales = ['fr', 'en'] as const
export const defaultLocale = 'fr'
export type Locale = (typeof locales)[number] | 'all'

export const localeNames: Record<Exclude<Locale, 'all'>, string> = {
  fr: 'Français',
  en: 'English',
}
/**
 * Cookie holding the locale explicitly picked in the language switcher. It
 * takes precedence over `Accept-Language` for the unprefixed (default locale)
 * URLs, otherwise choosing "English" from a browser set to French would land
 * back on the French version.
 */
export const LOCALE_COOKIE = 'NEXT_LOCALE'
