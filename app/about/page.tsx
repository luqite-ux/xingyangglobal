import type { Metadata } from 'next'
import Image from 'next/image'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'
import { categories } from '@/lib/products'
import { localize } from '@/lib/i18n'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { ButtonLink } from '@/components/site/button-link'
import { CategoryIcon } from '@/components/site/category-icon'

export const metadata: Metadata = buildMetadata({
  title: 'About Xingyang | Flour and Processing Machinery Manufacturer',
  description:
    'Xingyang City Flour Machinery Manufacturing Factory has made grinding, crushing, mixing and filling machinery in Gaocun, Xingyang, Henan since 2002.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A machinery manufacturer in Gaocun, Xingyang"
        intro={`Founded in ${site.founded}, producing grinding, crushing, mixing and filling equipment for agriculture, forestry and food processing.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      >
        <ButtonLink href="/contact">Contact us</ButtonLink>
      </PageHero>

      <Section id="identity" className="!border-t-0">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="identity-title" className="text-3xl font-semibold">
              Company profile
            </h2>
            <p className="mt-4 text-muted-foreground">
              Xingyang City Flour Machinery Manufacturing Factory has produced grinding, crushing, mixing and filling equipment in Gaocun, Xingyang since 2002.
            </p>
            <figure className="mt-8 overflow-hidden border border-ink/10 bg-paper-deep">
              <Image src="/images/factory/workshop-stainless-machines.jpg" alt="Xingyang Mill stainless equipment workshop" width={1200} height={800} className="aspect-[4/3] w-full object-cover" />
              <figcaption className="px-4 py-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">Stainless equipment workshop</figcaption>
            </figure>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={1}>
            <dl className="grid border-t border-ink/20">
              {[
                ['Company name', site.displayName],
                ['Address', site.address],
                ['Founded', String(site.founded)],
                ['Minimum order', site.moq],
                ['Email', site.email],
                ['Phone', site.phone],
              ].map(([label, value]) => (
                <div key={label} className="grid gap-1 border-b border-ink/10 py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="font-display font-semibold text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section id="what-we-make" tone="deep">
        <Reveal>
          <h2 id="what-we-make-title" className="text-3xl font-semibold">
            What we make
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {categories.map((category, index) => (
            <Reveal as="li" key={category.slug} delay={index % 2} className="flex gap-5 border border-ink/15 bg-paper p-5 transition-colors hover:border-ember/60">
              <CategoryIcon slug={category.slug} className="mt-1 size-8 shrink-0 text-ember-text" />
              <div><h3 className="font-display text-lg font-semibold">{localize(category.name)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{localize(category.tagline)}</p></div>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  )
}
