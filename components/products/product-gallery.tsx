'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ProductImage } from '@/lib/products'
import { cn } from '@/lib/utils'

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0)
  const current = images[active] ?? images[0]

  return (
    <div className="grid gap-4">
      <div className="relative aspect-square w-full bg-paper-deep/60">
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority
          quality={90}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="product-image object-contain p-4"
        />
      </div>
      <p className="eyebrow !text-[0.68rem]">{current.caption}</p>
      {images.length > 1 ? (
        <ul className="flex gap-3" aria-label="Product images">
          {images.map((image, index) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show image ${index + 1}: ${image.caption}`}
                aria-pressed={index === active}
                className={cn(
                  'relative size-20 border bg-paper-deep/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember',
                  index === active ? 'border-ink' : 'border-ink/20 hover:border-ink/60',
                )}
              >
                <Image src={image.src} alt="" fill sizes="80px" className="product-image object-contain p-1" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
