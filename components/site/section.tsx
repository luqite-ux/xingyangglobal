import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/site/reveal'

type SectionProps = {
  id: string
  labelledBy?: string
  tone?: 'paper' | 'deep' | 'mineral'
  className?: string
  children: ReactNode
}

const tones = {
  paper: 'bg-paper text-ink',
  deep: 'bg-paper-deep text-ink',
  mineral: 'bg-mineral text-paper',
} as const

export function Section({ id, labelledBy, tone = 'paper', className, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy ?? `${id}-title`}
      className={cn('relative scroll-mt-20 border-t border-ink/10 py-20 md:py-28', tones[tone], className)}
    >
      <div className="container-wide">{children}</div>
    </section>
  )
}

type SectionHeadingProps = {
  id: string
  index?: string
  eyebrow: string
  title: string
  intro?: string
  tone?: 'paper' | 'mineral'
  as?: 'h1' | 'h2'
  className?: string
}

export function SectionHeading({ id, index, eyebrow, title, intro, tone = 'paper', as: Tag = 'h2', className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('grid gap-6 md:grid-cols-12 md:gap-10', className)}>
      <div className="md:col-span-4">
        <p className={cn('eyebrow flex items-center gap-3', tone === 'mineral' && '!text-paper/80')}>
          {index ? <span className="text-ember tabular-nums">{index}</span> : null}
          <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
          {eyebrow}
        </p>
      </div>
      <div className="md:col-span-8">
        <Tag id={`${id}-title`} className="text-[clamp(1.9rem,3.6vw,3.25rem)] font-semibold leading-[1.04]">
          {title}
        </Tag>
        {intro ? (
          <p className={cn('mt-5 max-w-2xl text-base leading-relaxed md:text-lg', tone === 'mineral' ? 'text-paper/85' : 'text-muted-foreground')}>
            {intro}
          </p>
        ) : null}
      </div>
    </Reveal>
  )
}
