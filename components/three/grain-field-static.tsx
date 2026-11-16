import { cn } from '@/lib/utils'

function seeded(seed: number) {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }
}

const W = 1200
const H = 420

function buildGrains() {
  const rand = seeded(17)
  const grains: { x: number; y: number; r: number; tone: 'ember' | 'mineral' | 'steel'; o: number }[] = []
  for (let i = 0; i < 420; i++) {
    const t = rand()
    const lane = rand() * 2 - 1
    const converge = Math.min(1, t / 0.62)
    const spread = Math.max(0, (t - 0.62) / 0.38)
    const amp = t < 0.62 ? 0.9 - 0.78 * converge : 0.12 + 0.58 * spread
    const y = H / 2 + lane * amp * (H * 0.46) + Math.sin(t * 7 + lane * 6) * 8
    const post = t > 0.62
    grains.push({
      x: t * W,
      y,
      r: post ? 0.9 + rand() * 1.1 : 1.8 + rand() * 2.2,
      tone: post ? (rand() > 0.55 ? 'steel' : 'mineral') : 'ember',
      o: (0.25 + rand() * 0.45) * (0.4 + t * 0.7),
    })
  }
  return grains
}

const grains = buildGrains()
const toneColor = { ember: '#d9661f', mineral: '#24566d', steel: '#8c9aa0' } as const

export function GrainFieldStatic({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMaxYMid slice"
      className={cn('h-full w-full', className)}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" stroke="#12303f" strokeOpacity="0.1" strokeWidth="1">
        {[-0.7, -0.35, 0, 0.35, 0.7].map((lane) => {
          const startY = H / 2 + lane * H * 0.42
          const endY = H / 2 + lane * H * 0.3
          return (
            <path
              key={lane}
              d={`M0 ${startY} C ${W * 0.3} ${startY}, ${W * 0.45} ${H / 2 + lane * 20}, ${W * 0.62} ${H / 2 + lane * 12} S ${W * 0.85} ${endY}, ${W} ${endY}`}
            />
          )
        })}
      </g>
      <line x1={W * 0.62} x2={W * 0.62} y1="30" y2={H - 30} stroke="#12303f" strokeOpacity="0.14" strokeDasharray="2 6" />
      {grains.map((grain, index) => (
        <circle
          key={index}
          cx={grain.x.toFixed(1)}
          cy={grain.y.toFixed(1)}
          r={grain.r.toFixed(2)}
          fill={toneColor[grain.tone]}
          fillOpacity={grain.o.toFixed(2)}
        />
      ))}
    </svg>
  )
}
