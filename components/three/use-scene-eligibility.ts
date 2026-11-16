'use client'

import { useEffect, useState } from 'react'

type NetworkNavigator = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }

/** True only on wide, motion-allowed, non-constrained devices; everything else keeps the static artwork. */
export function useSceneEligibility(minWidth = 768) {
  const [eligible, setEligible] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wide = window.matchMedia(`(min-width: ${minWidth}px)`)
    const nav = navigator as NetworkNavigator
    const constrained =
      (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2 || nav.connection?.saveData === true

    const update = () => setEligible(!reduce.matches && wide.matches && !constrained)
    update()
    reduce.addEventListener('change', update)
    wide.addEventListener('change', update)
    return () => {
      reduce.removeEventListener('change', update)
      wide.removeEventListener('change', update)
    }
  }, [minWidth])

  return eligible
}
