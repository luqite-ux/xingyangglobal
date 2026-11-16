import type { Metadata } from 'next'
import { Mail, MapPin, Phone } from 'lucide-react'
import { buildMetadata } from '@/lib/metadata'
import { site, rfqIntents, type RfqIntent } from '@/lib/site'
import { categories } from '@/lib/products'
import { localize } from '@/lib/i18n'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { RfqForm } from '@/components/rfq/rfq-form'

export const metadata: Metadata = buildMetadata({
  title: 'Contact and Request a Quote',
  description:
    'Send your material, target output and voltage to Xingyang in Gaocun, Henan. Email info@xingyangglobal.com or use the inquiry form. Minimum order one machine.',
  path: '/contact',
})

type Props = { searchParams: Promise<{ intent?: string }> }

export default async function ContactPage({ searchParams }: Props) {
  const { intent } = await searchParams
  const isSelection = intent === ('model-selection' satisfies RfqIntent)
  const options = categories.map((category) => localize(category.name))

  return (
    <>
      <PageHero
        eyebrow={isSelection ? rfqIntents['model-selection'] : 'Contact'}
        title={isSelection ? 'Tell us your material, we will help choose a model' : 'Request a quote or ask a technical question'}
        intro="Describe the material, the output you need and your local voltage. We reply with a suggested model for you to review."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />

      <Section id="inquiry" labelledBy="inquiry-title" className="!border-t-0">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal as="aside" className="lg:col-span-4" delay={0}>
            <h2 id="inquiry-title" className="text-2xl font-semibold">
              Direct contact
            </h2>
            <ul className="mt-6 grid border-t border-ink/20">
              <li className="flex gap-4 border-b border-ink/10 py-4">
                <Mail className="mt-1 size-5 shrink-0 text-mineral" aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all font-display font-semibold text-ink underline decoration-ember decoration-2 underline-offset-4 hover:text-ember-text">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 border-b border-ink/10 py-4">
                <Phone className="mt-1 size-5 shrink-0 text-mineral" aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={site.phoneHref} className="inline-flex min-h-11 items-center font-display font-semibold tabular-nums text-ink underline decoration-ember decoration-2 underline-offset-4 hover:text-ember-text">
                    {site.phone}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 border-b border-ink/10 py-4">
                <MapPin className="mt-1 size-5 shrink-0 text-mineral" aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-display font-semibold text-ink">{site.address}</p>
                </div>
              </li>
            </ul>
            <div className="mt-8">
              <h3 className="font-display text-base font-semibold">Useful to include</h3>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                {['Material and its condition', 'Target fineness or batch size', 'Output per hour', 'Voltage and phase', 'Photos or drawings, if any'].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-ember" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={1}>
            <RfqForm
              productOptions={options}
              defaultMessage={isSelection ? 'I need help choosing a model. My material is: ' : undefined}
            />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
