import Link from 'next/link'
import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

type Crumb = { label: string; href?: string }

type PageHeroProps = {
  eyebrow: string
  title: string
  intro?: string
  crumbs?: Crumb[]
  children?: ReactNode
}

export function PageHero({ eyebrow, title, intro, crumbs, children }: PageHeroProps) {
  return (
    <header className="relative overflow-hidden border-b-4 border-ember bg-[#454b53] pb-14 pt-20 text-white md:pb-20 md:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 md:block">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_45%,rgba(255,255,255,0.08)_45%,rgba(255,255,255,0.08)_46%,transparent_46%)]" />
        <div className="absolute right-[12%] top-[18%] size-56 rounded-full bg-white/5 blur-3xl" />
      </div>
      <div className="container-wide relative">
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/80">
              {crumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  {index > 0 ? <ChevronRight className="size-3.5" aria-hidden="true" /> : null}
                  {crumb.href ? (
                    <Link href={crumb.href} className="inline-flex min-h-11 items-center underline-offset-4 hover:text-white hover:underline">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <p className="eyebrow flex items-center gap-3 !text-white/85">
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl text-[clamp(2.2rem,5vw,4.25rem)] font-semibold leading-[1.02]">{title}</h1>
        {intro ? <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{intro}</p> : null}
        {children ? <div className="mt-8 flex flex-wrap gap-3 [&_a]:!border-white [&_a]:!bg-white [&_a]:!text-[#343b43] [&_a:hover]:!bg-[#f2e8db]">{children}</div> : null}
      </div>
    </header>
  )
}
