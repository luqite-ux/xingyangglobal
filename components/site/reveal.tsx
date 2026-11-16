'use client'

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from 'react'

type RevealProps = {
  as?: ElementType
  delay?: number
  className?: string
  children: ReactNode
  id?: string
}

/**
 * Entrance fires when the element actually scrolls into view. Elements already visible on load stay visible,
 * and nothing is ever marked as revealed by a timer.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return

    el.dataset.reveal = 'hidden'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.reveal = 'shown'
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={className} style={{ '--reveal-delay': Math.min(delay, 6) } as CSSProperties} {...rest}>
      {children}
    </Tag>
  )
}
