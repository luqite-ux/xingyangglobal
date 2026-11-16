import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Schibsted_Grotesk } from 'next/font/google'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { site } from '@/lib/site'
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
  icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }] },
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
