import { faqs } from '@/lib/faq'
import { localize } from '@/lib/i18n'
import { Section, SectionHeading } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export function FaqSection() {
  return (
    <Section id="faq" tone="deep">
      <SectionHeading id="faq" index="08" eyebrow="FAQ" title="Practical questions before you inquire" />
      <Reveal className="mt-12 md:ml-[33.333%]">
        <Accordion type="single" collapsible className="border-t border-ink/25">
          {faqs.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-ink/15">
              <AccordionTrigger className="min-h-11 rounded-none py-5 font-display text-base font-semibold text-ink hover:text-ember-text hover:no-underline focus-visible:ring-ember md:text-lg">
                {localize(item.question)}
              </AccordionTrigger>
              <AccordionContent className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                {localize(item.answer)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  )
}
