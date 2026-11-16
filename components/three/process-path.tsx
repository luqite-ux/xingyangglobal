'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ProcessPathStatic } from '@/components/three/process-path-static'
import { useSceneEligibility } from '@/components/three/use-scene-eligibility'

const ProcessPathCanvas = dynamic(() => import('@/components/three/process-path-canvas'), { ssr: false })

export function ProcessPath({ className }: { className?: string }) {
  const eligible = useSceneEligibility(1024)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={cn('pointer-events-none absolute', className)} aria-hidden="true">
      <ProcessPathStatic className={cn('transition-opacity duration-500', ready && !failed && 'opacity-0')} />
      {eligible && !failed ? (
        <ProcessPathCanvas
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
