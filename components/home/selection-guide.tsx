import { Boxes, Gauge, Layers, PlugZap, Send, type LucideIcon } from 'lucide-react'
import { Section, SectionHeading } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { ButtonLink } from '@/components/site/button-link'

const factors: { icon: LucideIcon; factor: string; ask: string; why: string }[] = [
  {
    icon: Layers,
    factor: 'Material',
    ask: 'What are you processing, and in what condition?',
    why: 'Decides the family: grinding, wood and straw crushing, mixing or fiber filling.',
  },
  {
    icon: Gauge,
    factor: 'Expected output',
    ask: 'How much per hour, and to what fineness?',
    why: 'Narrows the size within a family, for example 360 to 1000 Type pulverizers.',
  },
  {
    icon: Boxes,
    factor: 'Capacity per batch',
    ask: 'What batch weight do you mix or fill?',
    why: 'Maps to hopper size on mixers, listed at 15, 30, 50, 100 and 200 kg.',
  },
  {
    icon: PlugZap,
    factor: 'Power and voltage',
    ask: 'Which voltage and phase are available on site?',
    why: 'Catalogue sheets list 220 V and 380 V models, and a diesel option on one crusher.',
  },
  {
    icon: Send,
    factor: 'Contact material',
    ask: 'Must contact surfaces be stainless?',
    why: 'Separates standard builds from stainless pulverizers and stainless mixers.',
  },
]

export function SelectionGuide() {
  return (
    <Section id="selection-guide" tone="deep">
      <SectionHeading
        id="selection-guide"
        index="02"
        eyebrow="Selection guide"
        title="Choose a model from five questions about your material"
        intro="No performance figures are promised here. Each answer narrows the catalogue so the model we suggest matches your actual job."
      />
      <Reveal className="mt-14 border-t border-ink/30">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Model selection factors, what we ask and why it matters</caption>
          <thead className="sr-only md:not-sr-only">
            <tr className="border-b border-ink/15 text-xs uppercase tracking-[0.16em] text-mineral">
              <th scope="col" className="py-4 pr-6 font-semibold md:w-1/4">Factor</th>
              <th scope="col" className="py-4 pr-6 font-semibold md:w-5/12">What we ask</th>
              <th scope="col" className="py-4 font-semibold">Why it matters</th>
            </tr>
          </thead>
          <tbody>
            {factors.map(({ icon: Icon, factor, ask, why }) => (
              <tr key={factor} className="block border-b border-ink/15 py-5 md:table-row md:py-0">
                <th scope="row" className="block pb-2 pr-6 font-display text-lg font-semibold text-ink md:table-cell md:py-6">
                  <span className="flex items-center gap-3">
                    <Icon className="size-5 shrink-0 text-ember-text" strokeWidth={1.6} aria-hidden="true" />
                    {factor}
                  </span>
                </th>
                <td className="block pb-1 pr-6 text-base text-ink md:table-cell md:py-6">{ask}</td>
                <td className="block text-sm leading-relaxed text-muted-foreground md:table-cell md:py-6">{why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
      <Reveal className="mt-10 flex flex-wrap items-center gap-4">
        <ButtonLink href="/contact?intent=model-selection">Ask for model selection help</ButtonLink>
        <ButtonLink href="/products" variant="secondary" arrow={false}>
          Compare families first
        </ButtonLink>
      </Reveal>
    </Section>
  )
}
