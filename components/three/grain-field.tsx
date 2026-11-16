'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { GrainFieldStatic } from '@/components/three/grain-field-static'
import { useSceneEligibility } from '@/components/three/use-scene-eligibility'

const GrainFieldCanvas = dynamic(() => import('@/components/three/grain-field-canvas'), { ssr: false })

/** Decorative flour/grain flow. Static SVG is always rendered; WebGL replaces it only when it is safe. */
export function GrainField({ className }: { className?: string }) {
  const eligible = useSceneEligibility(768)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={cn('pointer-events-none absolute overflow-hidden', className)} aria-hidden="true">
      <GrainFieldStatic className={cn('transition-opacity duration-700', ready && !failed && 'opacity-0')} />
      {eligible && !failed ? (
        <GrainFieldCanvas
          onReady={() => setReady(true)}
          onFail={() => {
            setFailed(true)
            setReady(false)
          }}
        />
      ) : null}
    </div>
  )
}
