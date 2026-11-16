import type { Metadata } from 'next'
import { defaultLocale, localizedPath, locales, type Locale } from '@/lib/i18n'
import { site } from '@/lib/site'

type BuildMetadataInput = {
  title: string
  description: string
  path: string
  locale?: Locale
  noindex?: boolean
  image?: string
}

export function buildMetadata({
  title,
  description,
  path,
  locale = defaultLocale,
  noindex = false,
  image = '/images/banners/banner-3.jpg',
}: BuildMetadataInput): Metadata {
  const languages = Object.fromEntries(locales.map((code) => [code, `${site.url}${localizedPath(path, code)}`]))

  return {
    title,
    description,
    alternates: {
      canonical: `${site.url}${localizedPath(path, locale)}`,
      languages: { ...languages, 'x-default': `${site.url}${path}` },
    },
    openGraph: {
      title,
      description,
      url: `${site.url}${localizedPath(path, locale)}`,
      siteName: site.displayName,
      type: 'website',
      locale: 'en',
      images: [{ url: image }],
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: noindex ? { index: false, follow: false } : undefined,
  }
}
