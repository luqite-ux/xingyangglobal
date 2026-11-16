import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { ProductImage } from '@/lib/products'

export function ProductDocuments({ documents }: { documents: ProductImage[] }) {
  if (!documents.length) return null

  return (
    <div className="mt-14 border-t border-ink/20 pt-10">
      <div className="max-w-2xl">
        <h3 className="text-2xl font-semibold text-ink">Technical reference images</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Parameter sheets, application guidance and operating references are separated from the product photo gallery.
        </p>
      </div>
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {documents.map((document) => (
          <li key={document.src} className="min-w-0">
            <a
              href={document.src}
              target="_blank"
              rel="noreferrer"
              className="group block border border-ink/15 bg-paper transition-colors hover:border-ink/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
              aria-label={`Open ${document.caption} in a new tab`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-paper">
                <Image
                  src={document.src}
                  alt={document.alt}
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.015]"
                />
              </div>
              <span className="flex min-h-12 items-center justify-between gap-3 border-t border-ink/10 px-4 py-3 font-display text-sm font-semibold text-ink">
                {document.caption}
                <ArrowUpRight className="size-4 shrink-0 text-mineral" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
