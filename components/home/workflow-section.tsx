import { CalendarClock, ClipboardCheck, MessageSquareText, ScanSearch, type LucideIcon } from 'lucide-react'
import { workflowSteps, type WorkflowKey } from '@/lib/workflow'
import { Section, SectionHeading } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { ProcessPath } from '@/components/three/process-path'

const icons: Record<WorkflowKey, LucideIcon> = {
  inquiry: MessageSquareText,
  confirmation: ClipboardCheck,
  scheduling: CalendarClock,
  inspection: ScanSearch,
}

export function WorkflowSteps({ className }: { className?: string }) {
  return (
    <ol className={className ?? 'relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6'}>
      {workflowSteps.map((step, index) => {
        const Icon = icons[step.key]
        return (
          <Reveal as="li" key={step.key} delay={index} className="relative border-t border-ink/30 pt-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-sm font-semibold tabular-nums text-ember-text">0{index + 1}</span>
              <Icon className="size-7 text-mineral" strokeWidth={1.4} aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-xl font-semibold text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
          </Reveal>
        )
      })}
    </ol>
  )
}

export function WorkflowSection() {
  return (
    <Section id="workflow">
      <SectionHeading
        id="workflow"
        index="05"
        eyebrow="Order workflow"
        title="From inquiry to pre-shipment inspection"
        intro="A neutral outline of the four stages an order moves through. It describes the order of work, not a schedule."
      />
      <div className="relative">
        <ProcessPath className="inset-x-0 top-0 hidden h-24 lg:block" />
        <WorkflowSteps />
      </div>
    </Section>
  )
}
