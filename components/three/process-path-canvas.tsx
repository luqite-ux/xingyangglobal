'use client'

import { useEffect, useRef } from 'react'
import { pathY, samplePath } from '@/lib/process-path'

type Props = { onReady: () => void; onFail: () => void }

export default function ProcessPathCanvas({ onReady, onFail }: Props) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let disposed = false
    let frame = 0
    let cleanup = () => {}

    ;(async () => {
      try {
        const THREE = await import('three')
        if (disposed) return

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
        renderer.setClearColor(0x000000, 0)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
        host.appendChild(renderer.domElement)
        Object.assign(renderer.domElement.style, { width: '100%', height: '100%', display: 'block' })

        const scene = new THREE.Scene()
        const camera = new THREE.OrthographicCamera(0, 1, 1, 0, -1, 1)

        const pathPoints = samplePath(120).map((p) => new THREE.Vector3(p.u, 1 - p.y, 0))
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(pathPoints)
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x24566d, transparent: true, opacity: 0.55 })
        scene.add(new THREE.Line(lineGeometry, lineMaterial))

        const count = 160
        const offsets = new Float32Array(count)
        const lateral = new Float32Array(count)
        const depth = new Float32Array(count)
        for (let i = 0; i < count; i++) {
          offsets[i] = Math.random()
          lateral[i] = (Math.random() - 0.5) * 0.09
          depth[i] = Math.random() * 2 - 1
        }
        const positions = new Float32Array(count * 3)
        const pointGeometry = new THREE.BufferGeometry()
        pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        const pointMaterial = new THREE.PointsMaterial({
          color: 0xd9661f,
          size: 4,
          sizeAttenuation: false,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
        })
        const grains = new THREE.Points(pointGeometry, pointMaterial)
        grains.frustumCulled = false
        scene.add(grains)

        const pointer = { x: 0, y: 0 }
        const onPointerMove = (event: PointerEvent) => {
          const rect = host.getBoundingClientRect()
          pointer.x = ((event.clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1
          pointer.y = ((event.clientY - rect.top) / Math.max(rect.height, 1)) * 2 - 1
        }
        window.addEventListener('pointermove', onPointerMove, { passive: true })

        const resize = () => {
          if (host.clientWidth && host.clientHeight) renderer.setSize(host.clientWidth, host.clientHeight, false)
        }
        resize()
        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(host)

        let visible = true
        const intersection = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting
        })
        intersection.observe(host)

        const onContextLost = (event: Event) => {
          event.preventDefault()
          cancelAnimationFrame(frame)
          onFail()
        }
        renderer.domElement.addEventListener('webglcontextlost', onContextLost)

        const clock = new THREE.Clock()
        let time = 0
        const tick = () => {
          frame = requestAnimationFrame(tick)
          const delta = clock.getDelta()
          if (!visible || document.hidden) return
          time += delta
          for (let i = 0; i < count; i++) {
            const u = (offsets[i] + time * 0.05) % 1
            const wobble = Math.sin(time * 1.2 + i) * 0.006
            positions[i * 3] = u + pointer.x * depth[i] * 0.006
            positions[i * 3 + 1] = 1 - pathY(u) + lateral[i] + wobble + pointer.y * depth[i] * 0.01
            positions[i * 3 + 2] = 0
          }
          pointGeometry.attributes.position.needsUpdate = true
          renderer.render(scene, camera)
        }
        tick()
        onReady()

        cleanup = () => {
          cancelAnimationFrame(frame)
          window.removeEventListener('pointermove', onPointerMove)
          renderer.domElement.removeEventListener('webglcontextlost', onContextLost)
          resizeObserver.disconnect()
          intersection.disconnect()
          lineGeometry.dispose()
          lineMaterial.dispose()
          pointGeometry.dispose()
          pointMaterial.dispose()
          renderer.dispose()
          renderer.domElement.remove()
        }
      } catch {
        onFail()
      }
    })()

    return () => {
      disposed = true
      cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={hostRef} className="absolute inset-0" />
}
