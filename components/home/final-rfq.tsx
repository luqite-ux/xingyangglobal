import { Mail, Phone } from 'lucide-react'
import { site } from '@/lib/site'
import { Section } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { ButtonLink } from '@/components/site/button-link'

export function FinalRfq() {
  return (
    <Section id="final-rfq" className="overflow-hidden">
      <div className="grid gap-10 md:grid-cols-12 md:items-end">
        <Reveal className="md:col-span-7">
          <p className="eyebrow">
            <span className="text-ember tabular-nums">09</span> &nbsp; Request a quote
          </p>
          <h2 id="final-rfq-title" className="mt-4 text-[clamp(2rem,4.4vw,3.75rem)] font-semibold leading-[1.02]">
            Tell us the material. We will suggest the machine.
          </h2>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Minimum order is one machine. Describe your task and our team replies with a model suggestion to review.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact" variant="ember">Request a quote</ButtonLink>
            <ButtonLink href="/contact?intent=model-selection" variant="secondary" arrow={false}>
              Model selection help
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={1} as="ul" className="grid gap-4 border-l-2 border-ember pl-6 md:col-span-4 md:col-start-9">
          <li>
            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-3 text-ink hover:text-ember-text">
              <Mail className="size-5" aria-hidden="true" />
              {site.email}
            </a>
          </li>
          <li>
            <a href={site.phoneHref} className="inline-flex min-h-11 items-center gap-3 text-ink hover:text-ember-text">
              <Phone className="size-5" aria-hidden="true" />
              {site.phone}
            </a>
          </li>
        </Reveal>
      </div>
    </Section>
  )
}
