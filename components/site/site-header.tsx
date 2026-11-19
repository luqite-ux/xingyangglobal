'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { categories, categoryHref } from '@/lib/products'
import { localize } from '@/lib/i18n'
import { navItems } from '@/lib/site'
import { cn } from '@/lib/utils'
import { Wordmark } from '@/components/site/wordmark'
import { CategoryIcon } from '@/components/site/category-icon'

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMobileOpen(false)
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        setMobileOpen(false)
      }
    }
    const onPointer = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [])

  const linkClass = (href: string) =>
    cn(
      'relative inline-flex min-h-11 items-center px-3 font-display text-sm font-medium text-ink/80 transition-colors hover:text-ink',
      'after:absolute after:inset-x-3 after:bottom-2 after:h-0.5 after:origin-left after:scale-x-0 after:bg-ember after:transition-transform after:duration-300 hover:after:scale-x-100',
      isActive(pathname, href) && 'text-ink after:scale-x-100',
    )

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-paper/90 backdrop-blur-md transition-shadow duration-300',
        scrolled ? 'border-ink/15 shadow-[0_8px_24px_-18px_rgba(18,48,63,0.5)]' : 'border-ink/10',
      )}
    >
      <div className="container-wide flex h-20 items-center justify-between gap-4">
        <Wordmark onNavigate={() => setMobileOpen(false)} />

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          {navItems.map((item) =>
            item.href === '/products' ? (
              <div
                key={item.href}
                ref={menuRef}
                className="relative flex items-center"
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
              >
                <Link href={item.href} aria-current={isActive(pathname, item.href) ? 'page' : undefined} className={cn(linkClass(item.href), 'pr-1')}>
                  {item.label}
                </Link>
                <button
                  type="button"
                  aria-label="Show product families"
                  aria-expanded={menuOpen}
                  aria-controls="product-menu"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="inline-flex size-11 items-center justify-center text-ink/70 transition-colors hover:text-ink"
                >
                  <ChevronDown className={cn('size-4 transition-transform duration-200', menuOpen && 'rotate-180')} aria-hidden="true" />
                </button>
                <div
                  id="product-menu"
                  hidden={!menuOpen}
                  className="absolute left-0 top-full w-[26rem] border border-ink/15 bg-paper p-2 shadow-[0_24px_48px_-24px_rgba(18,48,63,0.5)]"
                >
                  <ul>
                    {categories.map((category) => (
                      <li key={category.slug}>
                        <Link
                          href={categoryHref(category.slug)}
                          className="group flex min-h-11 items-center gap-3 px-3 py-2.5 transition-colors hover:bg-mineral-soft"
                        >
                          <CategoryIcon slug={category.slug} className="size-5 text-mineral" />
                          <span className="flex flex-col">
                            <span className="font-display text-sm font-semibold text-ink">{localize(category.name)}</span>
                            <span className="text-xs text-muted-foreground">{localize(category.tagline)}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/products"
                    className="mt-1 flex min-h-11 items-center border-t border-ink/10 px-3 font-display text-sm font-semibold text-ember-text hover:text-ink"
                  >
                    View all products
                  </Link>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} aria-current={isActive(pathname, item.href) ? 'page' : undefined} className={linkClass(item.href)}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden min-h-11 items-center bg-ink px-5 font-display text-sm font-semibold text-paper transition-[background-color,transform] hover:bg-mineral active:translate-y-px sm:inline-flex"
          >
            Request a Quote
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center border border-ink/30 text-ink transition-colors hover:bg-ink hover:text-paper lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile primary"
        hidden={!mobileOpen}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ink/10 bg-paper lg:hidden"
      >
        <ul className="container-wide py-3">
          {navItems.map((item) => (
            <li key={item.href} className="border-b border-ink/10 last:border-b-0">
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                className={cn(
                  'flex min-h-12 items-center justify-between font-display text-lg font-medium text-ink',
                  isActive(pathname, item.href) && 'text-ember-text',
                )}
              >
                {item.label}
              </Link>
              {item.href === '/products' ? (
                <ul className="mb-3 grid gap-0.5 border-l-2 border-ember/60 pl-4">
                  {categories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={categoryHref(category.slug)}
                        className="flex min-h-11 items-center gap-3 text-sm text-ink/80 transition-colors hover:text-ink"
                      >
                        <CategoryIcon slug={category.slug} className="size-4 text-mineral" />
                        {localize(category.name)}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
          <li className="pt-4">
            <Link
              href="/contact"
              className="flex min-h-12 items-center justify-center bg-ink font-display font-semibold text-paper active:translate-y-px"
            >
              Request a Quote
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
