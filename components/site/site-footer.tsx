import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { categories, categoryHref } from '@/lib/products'
import { localize } from '@/lib/i18n'
import { navItems, site } from '@/lib/site'
import { Wordmark } from '@/components/site/wordmark'

const linkClass =
  'inline-flex min-h-11 items-center text-sm text-ink/80 underline-offset-4 transition-colors hover:text-ink hover:underline'

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/15 bg-paper-deep">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.displayName}. Grinding, crushing, mixing and filling equipment, made in Gaocun, Xingyang since {site.founded}.
          </p>
          <p lang="zh-Hans" className="mt-3 text-sm font-medium text-ink">
            {site.legalNameZh}
          </p>
          <address className="mt-6 grid gap-1 text-sm not-italic text-ink/85">
            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-2.5 hover:text-ember-text">
              <Mail className="size-4 text-mineral" aria-hidden="true" />
              {site.email}
            </a>
            <a href={site.phoneHref} className="inline-flex min-h-11 items-center gap-2.5 hover:text-ember-text">
              <Phone className="size-4 text-mineral" aria-hidden="true" />
              {site.phone}
            </a>
            <span className="inline-flex min-h-11 items-center gap-2.5">
              <MapPin className="size-4 text-mineral" aria-hidden="true" />
              {site.address}
            </span>
          </address>
        </div>

        <nav aria-label="Product families" className="md:col-span-4">
          <p className="eyebrow">Products</p>
          <ul className="mt-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={categoryHref(category.slug)} className={linkClass}>
                  {localize(category.name)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-3">
          <p className="eyebrow">Company</p>
          <ul className="mt-3">
            {navItems
              .filter((item) => item.href !== '/products')
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-ink/10">
        <div className="container-wide flex flex-col gap-2 py-5 text-xs text-muted-foreground md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.displayName.replace(/[.;:!?；。：！？\s]+$/u, '')}. All rights reserved.</p>
          <p>Minimum order: one machine.</p>
        </div>
      </div>
    </footer>
  )
}
