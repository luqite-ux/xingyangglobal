import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { site } from '@/lib/site'
import { PageHero } from '@/components/site/page-hero'
import { Section, SectionHeading } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { ButtonLink } from '@/components/site/button-link'
import { FactoryGallery } from '@/components/site/factory-gallery'
import { manufacturingFacts } from '@/components/home/manufacturing-proof'
import { WorkflowSteps } from '@/components/home/workflow-section'

export const metadata: Metadata = buildMetadata({
  title: 'Manufacturing | Site, Capacity and Order Workflow',
  description:
    'Xingyang manufacturing site: founded in 2002, with a 3,000 m² site, two workshops, three warehouses, automated and customized production lines, and listed monthly capacity of 300 units.',
  path: '/manufacturing',
})

export default function ManufacturingPage() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title="The facility facts behind the catalogue"
        intro={`Based in ${site.address}, with two workshops, three warehouses and dedicated lines for standard and customized equipment.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Manufacturing' }]}
      >
        <ButtonLink href="/contact">Discuss your order</ButtonLink>
      </PageHero>

      <Section id="facts" className="!border-t-0">
        <SectionHeading id="facts" eyebrow="Factory overview" title="Production space, equipment and facility facts" intro="A view of the factory, product inventory and the site figures relevant to order planning." />
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
      </Section>

      <Section id="lines" tone="deep">
        <SectionHeading
          id="lines"
          eyebrow="Production lines"
          title="Two line types for two kinds of orders"
          intro="One automated line and one customized line. Which one suits an order is confirmed during technical review."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {[
            { title: 'Automated line', text: 'Suited to catalogue models where the specification is already defined.' },
            { title: 'Customized line', text: 'Used where an order needs adjustments agreed during technical confirmation.' },
          ].map((line, index) => (
            <Reveal as="li" key={line.title} delay={index} className="border-t border-ink/30 pt-5">
              <h3 className="text-xl font-semibold">{line.title}</h3>
              <p className="mt-2 text-muted-foreground">{line.text}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section id="workflow">
        <SectionHeading
          id="workflow"
          eyebrow="Order workflow"
          title="Four stages from inquiry to inspection"
          intro="A neutral outline of the order of work. It is not a schedule or a commitment on timing."
        />
        <WorkflowSteps />
      </Section>
    </>
  )
}
