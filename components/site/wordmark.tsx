import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { site } from '@/lib/site'

export function Wordmark({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label={`${site.displayName} — home`}
      className={cn('group inline-flex min-h-11 items-center font-display', className)}
    >
      <Image src="/images/brand/xingyang-mill-logo.png" alt="Xingyang Mill" width={555} height={532} className="h-16 w-auto object-contain mix-blend-multiply md:h-[4.5rem]" priority />
    </Link>
  )
}
