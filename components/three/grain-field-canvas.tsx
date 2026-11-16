'use client'

import { useEffect, useRef } from 'react'

type Props = { onReady: () => void; onFail: () => void }

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uScale;
  uniform float uAspect;
  attribute float aSeed;
  attribute float aLane;
  attribute float aJitter;
  varying float vMix;
  varying float vAlpha;
  varying float vTone;

  void main() {
    float speed = 0.03 + aJitter * 0.025;
    float t = fract(aSeed + uTime * speed);
    float converge = smoothstep(0.0, 0.62, t);
    float spread = smoothstep(0.62, 1.0, t);
    float amp = mix(0.9, 0.12, converge);
    amp = mix(amp, 0.12 + 0.58 * spread, step(0.62, t));
    float y = aLane * amp + sin(t * 7.0 + aLane * 6.28 + uTime * 0.35) * 0.04;
    float x = mix(-uAspect - 0.05, uAspect + 0.05, t);
    vec2 pos = vec2(x, y);

    vec2 d = pos - uPointer;
    float push = exp(-dot(d, d) * 14.0);
    pos += normalize(d + 0.0001) * push * 0.14;

    float post = smoothstep(0.58, 0.7, t);
    float size = mix(5.2, 1.7, post) + aJitter * 1.6;
    vMix = post;
    vTone = aJitter;
    vAlpha = smoothstep(0.0, 0.08, t) * (1.0 - smoothstep(0.92, 1.0, t)) * mix(0.25, 0.85, smoothstep(0.1, 0.55, t));

    gl_Position = vec4(pos.x / uAspect, pos.y, 0.0, 1.0);
    gl_PointSize = size * uScale;
  }
`

const FRAGMENT = /* glsl */ `
  precision mediump float;
  varying float vMix;
  varying float vAlpha;
  varying float vTone;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.2, d) * vAlpha;
    vec3 coarse = vec3(0.851, 0.4, 0.122);
    vec3 fineA = vec3(0.141, 0.337, 0.427);
    vec3 fineB = vec3(0.549, 0.604, 0.627);
    vec3 col = mix(coarse, mix(fineA, fineB, step(0.5, vTone)), vMix);
    gl_FragColor = vec4(col * a, a);
  }
`

export default function GrainFieldCanvas({ onReady, onFail }: Props) {
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

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' })
        renderer.setClearColor(0x000000, 0)
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
        renderer.setPixelRatio(pixelRatio)
        host.appendChild(renderer.domElement)
        renderer.domElement.style.width = '100%'
        renderer.domElement.style.height = '100%'
        renderer.domElement.style.display = 'block'

        const count = 1400
        const seeds = new Float32Array(count)
        const lanes = new Float32Array(count)
        const jitter = new Float32Array(count)
        for (let i = 0; i < count; i++) {
          seeds[i] = Math.random()
          lanes[i] = Math.random() * 2 - 1
          jitter[i] = Math.random()
        }
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3))
        geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))
        geometry.setAttribute('aLane', new THREE.BufferAttribute(lanes, 1))
        geometry.setAttribute('aJitter', new THREE.BufferAttribute(jitter, 1))

        const material = new THREE.ShaderMaterial({
          vertexShader: VERTEX,
          fragmentShader: FRAGMENT,
          transparent: true,
          depthWrite: false,
          blending: THREE.CustomBlending,
          blendSrc: THREE.OneFactor,
          blendDst: THREE.OneMinusSrcAlphaFactor,
          uniforms: {
            uTime: { value: 0 },
            uPointer: { value: new THREE.Vector2(9, 9) },
            uScale: { value: 1 },
            uAspect: { value: 2.5 },
          },
        })

        const points = new THREE.Points(geometry, material)
        points.frustumCulled = false
        const scene = new THREE.Scene()
        scene.add(points)
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

        const resize = () => {
          const { clientWidth: w, clientHeight: h } = host
          if (!w || !h) return
          renderer.setSize(w, h, false)
          material.uniforms.uAspect.value = w / h
          material.uniforms.uScale.value = pixelRatio * Math.max(0.7, Math.min(1.3, h / 420))
        }
        resize()
        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(host)

        const onPointerMove = (event: PointerEvent) => {
          const rect = host.getBoundingClientRect()
          if (!rect.width || !rect.height) return
          const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
          const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
          const aspect = rect.width / rect.height
          material.uniforms.uPointer.value.set(nx * aspect, ny)
        }
        window.addEventListener('pointermove', onPointerMove, { passive: true })

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
        const tick = () => {
          frame = requestAnimationFrame(tick)
          if (!visible || document.hidden) {
            clock.getDelta()
            return
          }
          material.uniforms.uTime.value += clock.getDelta()
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
          geometry.dispose()
          material.dispose()
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
