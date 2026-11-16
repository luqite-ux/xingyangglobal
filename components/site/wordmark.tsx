import Link from 'next/link'
import { cn } from '@/lib/utils'
import { site } from '@/lib/site'

export function Wordmark({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={`${site.displayName} — home`}
      className={cn('group inline-flex min-h-11 items-center gap-2.5 font-display', className)}
    >
      <span className="text-[1.05rem] font-extrabold tracking-[0.2em] text-ink transition-colors group-hover:text-mineral">
        {site.wordmark.primary}
      </span>
      <span aria-hidden="true" className="text-lg font-light text-ember">
        /
      </span>
      <span className="text-[0.68rem] font-semibold tracking-[0.22em] text-mineral">{site.wordmark.secondary}</span>
    </Link>
  )
}
