'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { heroSlides } from '@/lib/hero-slides'
import { cn } from '@/lib/utils'
import { ButtonLink } from '@/components/site/button-link'

const SWIPE_DISTANCE = 48

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [userPlaying, setUserPlaying] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const swipeStart = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const go = useCallback((next: number) => setIndex((next + heroSlides.length) % heroSlides.length), [])
  const running = userPlaying && !reducedMotion && !hovered && !focused

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured equipment messages"
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(index + 1)
        if (event.key === 'ArrowLeft') go(index - 1)
      }}
    >
      <div
        className="grid touch-pan-y"
        aria-live={running ? 'off' : 'polite'}
        onPointerDown={(event) => {
          if (event.pointerType === 'mouse') return
          swipeStart.current = { x: event.clientX, y: event.clientY }
        }}
        onPointerUp={(event) => {
          const start = swipeStart.current
          swipeStart.current = null
          if (!start) return
          const dx = event.clientX - start.x
          const dy = event.clientY - start.y
          if (Math.abs(dx) > SWIPE_DISTANCE && Math.abs(dx) > Math.abs(dy) * 1.4) go(index + (dx < 0 ? 1 : -1))
        }}
      >
        {heroSlides.map((slide, i) => {
          const active = i === index
          return (
            <article
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${heroSlides.length}`}
              aria-hidden={!active}
              inert={!active}
              className={cn(
                'relative col-start-1 row-start-1 flex flex-col transition-[opacity,visibility] duration-700 lg:block',
                active ? 'visible opacity-100' : 'invisible opacity-0',
              )}
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink sm:aspect-[16/8] lg:aspect-auto lg:h-[min(46rem,calc(100svh-8rem))] lg:min-h-[34rem]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  quality={82}
                  className={cn(
                    'object-cover transition-transform duration-[1800ms] ease-out',
                    slide.posClass,
                    active ? 'scale-100' : 'scale-[1.04]',
                  )}
                />
                <div
                  aria-hidden="true"
                  className={cn(
                    'pointer-events-none absolute inset-y-0 hidden w-[52%] lg:block',
                    slide.side === 'left'
                      ? 'left-0 bg-gradient-to-r from-ink/70 via-ink/35 to-transparent'
                      : 'right-0 bg-gradient-to-l from-ink/70 via-ink/35 to-transparent',
                  )}
                />
              </div>

              <div
                className={cn(
                  'container-wide bg-paper pb-8 pt-8 lg:absolute lg:inset-0 lg:flex lg:items-center lg:bg-transparent lg:py-0',
                  slide.side === 'right' && 'lg:justify-end',
                )}
              >
                <div className="max-w-xl lg:max-w-[34rem] lg:text-paper">
                  <p className="eyebrow flex items-center gap-3 lg:!text-paper/85">
                    <span aria-hidden="true" className="h-px w-8 bg-ember" />
                    {slide.kicker}
                  </p>
                  <h2 className="mt-4 text-[clamp(1.85rem,4.2vw,3.5rem)] font-semibold leading-[1.04] text-ink lg:text-paper">
                    {slide.headline}
                  </h2>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground lg:text-paper/90">
                    {slide.body}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <ButtonLink href={slide.primary.href} variant="ember" className="lg:border-ember">
                      {slide.primary.label}
                    </ButtonLink>
                    <ButtonLink
                      href={slide.secondary.href}
                      variant="secondary"
                      arrow={false}
                      className="lg:border-paper/60 lg:text-paper lg:hover:bg-paper lg:hover:text-ink"
                    >
                      {slide.secondary.label}
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <div className="container-wide bg-paper">
        <div className="flex flex-col gap-4 border-b border-ink/10 py-4 sm:flex-row sm:items-center sm:justify-between">
          <ol className="grid flex-1 grid-cols-3 gap-2 sm:gap-4">
            {heroSlides.map((slide, i) => {
              const active = i === index
              return (
                <li key={slide.id}>
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={active ? 'true' : undefined}
                    aria-label={`Show slide ${i + 1}: ${slide.tabLabel}`}
                    className="group flex min-h-11 w-full flex-col justify-end gap-2 text-left"
                  >
                    <span
                      className={cn(
                        'font-display text-xs font-semibold tracking-wide transition-colors sm:text-sm',
                        active ? 'text-ink' : 'text-ink/65 group-hover:text-ink',
                      )}
                    >
                      <span className="mr-2 tabular-nums text-ember-text">0{i + 1}</span>
                      <span className="hidden sm:inline">{slide.tabLabel}</span>
                    </span>
                    <span className="relative block h-0.5 w-full overflow-hidden bg-ink/15">
                      {active ? (
                        <span
                          key={`${index}-${running ? 'run' : 'stop'}`}
                          data-running={running}
                          onAnimationEnd={() => go(index + 1)}
                          className="hero-progress-bar absolute inset-0 bg-ember"
                        />
                      ) : null}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setUserPlaying((value) => !value)}
              aria-pressed={!userPlaying}
              aria-label={userPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="inline-flex size-11 items-center justify-center border border-ink/30 text-ink transition-colors hover:bg-ink hover:text-paper active:translate-y-px"
            >
              {userPlaying ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
            </button>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous slide"
              className="inline-flex size-11 items-center justify-center border border-ink/30 text-ink transition-colors hover:bg-ink hover:text-paper active:translate-y-px"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next slide"
              className="inline-flex size-11 items-center justify-center border border-ink/30 text-ink transition-colors hover:bg-ink hover:text-paper active:translate-y-px"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
