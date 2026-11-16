/** Shared by the SVG fallback and the Three.js scene so both draw the same line. */
export const nodeU = [0.125, 0.375, 0.625, 0.875] as const

/** Vertical position as a fraction of the band height, 0 = top. */
export function pathY(u: number): number {
  return 0.5 - 0.26 * Math.sin((u - 0.125) * Math.PI * 2 * 1.0)
}

export function samplePath(count = 80): { u: number; y: number }[] {
  return Array.from({ length: count + 1 }, (_, i) => {
    const u = i / count
    return { u, y: pathY(u) }
  })
}
