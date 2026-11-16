import Image from 'next/image'
import type { ProductImage } from '@/lib/products'

export function ProductDocuments({ documents }: { documents: ProductImage[] }) {
  if (!documents.length) return null

  return (
    <div className="mt-16 border-t border-ink/20 pt-12">
      <div className="mx-auto max-w-[62rem]">
        <h3 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.04] text-ink">Product details</h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Review model data, processing results, applications and operating information in sequence.
        </p>
      </div>
      <ol className="mx-auto mt-10 max-w-[62rem] overflow-hidden border-x border-t border-ink/15 bg-white">
        {documents.map((document, index) => (
          <li key={document.src} className="border-b border-ink/15">
            <div className="flex items-center gap-4 border-b border-ink/10 bg-paper px-5 py-4 sm:px-8">
              <span className="font-display text-sm font-semibold text-ember-text">{String(index + 1).padStart(2, '0')}</span>
              <h4 className="font-display text-lg font-semibold text-ink">{document.caption}</h4>
            </div>
            <Image
              src={document.src}
              alt={document.alt}
              width={document.width ?? 2000}
              height={document.height ?? 2000}
              quality={90}
              sizes="(min-width: 1024px) 62rem, 100vw"
              className="h-auto w-full bg-white object-contain"
            />
          </li>
        ))}
      </ol>
    </div>
  )
}
