import { Droplets, FileText, Gauge, PlugZap, Shapes, type LucideIcon } from 'lucide-react'
import { Section, SectionHeading } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { ButtonLink } from '@/components/site/button-link'

const provide: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Shapes, title: 'Material description', text: 'Type, size and condition of what you feed in.' },
  { icon: Gauge, title: 'Output requirement', text: 'Output per hour or per batch, and target fineness.' },
  { icon: PlugZap, title: 'Power supply', text: 'Voltage and phase, or a diesel drive if needed.' },
  { icon: Droplets, title: 'Contact requirement', text: 'Whether surfaces touching the material must be stainless.' },
  { icon: FileText, title: 'Photos or drawings', text: 'Anything that shows your current setup or target.' },
]

const checks = [
  'We compare your material and output with the catalogue family that handles that task.',
  'We check that voltage, size and contact-material needs line up with a listed model.',
  'Where a catalogue model does not fit, we say so and discuss a customized build.',
]

export function QualityAndFit() {
  return (
    <Section id="quality-and-fit" tone="mineral">
      <SectionHeading
        id="quality-and-fit"
        index="06"
        eyebrow="Quality and fit"
        title="Suitability is checked from what you tell us"
        intro="Fit is a matter of matching material and output to a model. Here is what to bring and what we check."
        tone="mineral"
      />
      <div className="mt-14 grid gap-12 lg:grid-cols-12">
        <ul className="grid gap-px bg-paper/20 sm:grid-cols-2 lg:col-span-7">
          {provide.map(({ icon: Icon, title, text }, index) => (
            <Reveal
              as="li"
              key={title}
              delay={index % 2}
              className={`bg-[#454b53] p-6 ${index === provide.length - 1 ? 'sm:col-span-2' : ''}`}
            >
              <Icon className="size-6 text-flour" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-paper">{title}</h3>
              <p className="mt-1 text-sm text-paper/80">{text}</p>
            </Reveal>
          ))}
        </ul>
        <Reveal className="lg:col-span-5">
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-flour">How fit is checked</h3>
          <ol className="mt-5 grid gap-5">
            {checks.map((check, index) => (
              <li key={check} className="flex gap-4 border-t border-paper/25 pt-4 text-paper/90">
                <span className="font-display text-sm font-semibold tabular-nums text-flour">0{index + 1}</span>
                {check}
              </li>
            ))}
          </ol>
          <ButtonLink href="/contact" variant="light" className="mt-8">
            Send your requirements
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  )
}
