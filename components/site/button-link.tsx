import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ember' | 'light'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-mineral border-ink hover:border-mineral',
  secondary: 'bg-transparent text-ink border-ink/40 hover:bg-ink hover:text-paper hover:border-ink',
  ember: 'bg-ember text-ink border-ember hover:bg-paper hover:border-paper',
  light: 'bg-paper text-ink border-paper hover:bg-transparent hover:text-paper',
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean }

export function ButtonLink({ variant = 'primary', arrow = true, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        'group inline-flex min-h-11 items-center justify-center gap-2 border px-5 py-2.5 font-display text-sm font-semibold tracking-tight transition-[background-color,color,border-color,transform] duration-200 active:translate-y-px',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {arrow ? (
        <ArrowUpRight
          className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </Link>
  )
}

export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        'group inline-flex min-h-11 items-center gap-1.5 font-display text-sm font-semibold text-ink underline decoration-ember decoration-2 underline-offset-[6px] transition-colors hover:text-ember-text',
        className,
      )}
      {...props}
    >
      {children}
      <ArrowUpRight
        className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  )
}
