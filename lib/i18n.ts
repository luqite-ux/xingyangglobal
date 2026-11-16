export const locales = ['en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

/** Content shape that already carries every shipped locale; add keys here when a language launches. */
export type Localized<T = string> = { en: T } & Partial<Record<Locale, T>>

export function l<T = string>(en: T): Localized<T> {
  return { en }
}

export function localize<T>(value: Localized<T>, locale: Locale = defaultLocale): T {
  return value[locale] ?? value.en
}

/** The default locale stays unprefixed; later locales will be prefixed (e.g. /es/products). */
export function localizedPath(path: string, locale: Locale = defaultLocale): string {
  return locale === defaultLocale ? path : `/${locale}${path === '/' ? '' : path}`
}
