import { samplePath } from '@/lib/process-path'
import { cn } from '@/lib/utils'

const points = samplePath(80)
const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${(p.u * 1000).toFixed(1)} ${(p.y * 200).toFixed(1)}`).join(' ')

export function ProcessPathStatic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 200"
      preserveAspectRatio="none"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} fill="none" stroke="#24566d" strokeOpacity="0.55" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <path
        d={d}
        fill="none"
        stroke="#d9661f"
        strokeOpacity="0.8"
        strokeWidth="2"
        strokeDasharray="1 14"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
