import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Schibsted_Grotesk } from 'next/font/google'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { site } from '@/lib/site'
import { JsonLd } from '@/components/seo/json-ld'
import './globals.css'

const display = Schibsted_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const body = Instrument_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Xingyang Flour Machinery | Pulverizers, Crushers and Mixers from Henan',
    template: '%s | Xingyang Flour Machinery',
  },
  description:
    'Xingyang City Flour Machinery Manufacturing Factory builds multi-function and stainless steel pulverizers, wood crushers, stainless steel mixers and fiber filling machines. Founded 2002, Gaocun, Xingyang, Henan, China.',
  applicationName: 'Xingyang Flour Machinery',
  icons: { icon: [{ url: '/images/brand/xingyang-mill-logo.png', type: 'image/png' }] },
}

export const viewport: Viewport = {
  themeColor: '#f6f2ea',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <JsonLd data={[
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': `${site.url}/#organization`,
            name: site.displayName,
            url: site.url,
            logo: `${site.url}/images/brand/xingyang-mill-logo.png`,
            email: site.email,
            telephone: site.phone,
            address: { '@type': 'PostalAddress', addressLocality: 'Xingyang', addressRegion: 'Henan', addressCountry: 'CN' },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${site.url}/#website`,
            url: site.url,
            name: site.displayName,
            publisher: { '@id': `${site.url}/#organization` },
            inLanguage: 'en',
          },
        ]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          async
          src={`https://admin.globle-trade.com/api/public/analytics.js?tenantId=${encodeURIComponent(process.env.NEXT_PUBLIC_TENANT_ID || "f0bb6506-7a2f-4c3a-9dbb-27d89636b28c")}`}
        />
      </body>
    </html>
  )
}
