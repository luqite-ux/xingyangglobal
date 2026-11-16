import { CalendarDays, Factory, Gauge, Route, Ruler, Warehouse, type LucideIcon } from 'lucide-react'
import { site } from '@/lib/site'
import { Section, SectionHeading } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { FactoryGallery } from '@/components/site/factory-gallery'
import { TextLink } from '@/components/site/button-link'

export const manufacturingFacts: { icon: LucideIcon; value: string; label: string; note: string }[] = [
  { icon: CalendarDays, value: String(site.founded), label: 'Founded', note: 'Manufacturing since 2002' },
  { icon: Ruler, value: site.facts.siteArea, label: 'Site area', note: 'Gaocun, Xingyang' },
  { icon: Factory, value: String(site.facts.workshops), label: 'Workshops', note: 'Two production workshops' },
  { icon: Warehouse, value: String(site.facts.warehouses), label: 'Warehouses', note: 'Three storage warehouses' },
  { icon: Route, value: '2 line types', label: 'Production lines', note: 'One automated, one customized' },
  { icon: Gauge, value: site.facts.monthlyCapacity, label: 'Monthly capacity', note: 'Production capacity per month' },
]

export function ManufacturingProof() {
  return (
    <Section id="manufacturing-proof" tone="deep">
      <SectionHeading
        id="manufacturing-proof"
        index="04"
        eyebrow="Manufacturing"
        title="Inside the Gaocun manufacturing site"
        intro="See the production space and equipment inventory, alongside the site figures buyers need for supplier evaluation."
      />
      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <FactoryGallery />
        </Reveal>
        <dl className="grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:col-span-7">
          {manufacturingFacts.map(({ icon: Icon, value, label, note }, index) => (
            <Reveal key={label} delay={index % 2} className="bg-paper-deep">
              <div className="flex h-full gap-4 p-6">
                <Icon className="mt-1 size-6 shrink-0 text-mineral" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <dt className="eyebrow !text-[0.68rem]">{label}</dt>
                  <dd className="mt-1 font-display text-3xl font-semibold tabular-nums text-ink">{value}</dd>
                  <dd className="mt-1 text-sm text-muted-foreground">{note}</dd>
                </div>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
      <Reveal className="mt-10">
        <TextLink href="/manufacturing">See the manufacturing page</TextLink>
      </Reveal>
    </Section>
  )
}
