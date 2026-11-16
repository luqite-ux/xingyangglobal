import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getCategory, productHref, type Product } from '@/lib/products'
import { localize } from '@/lib/i18n'
import { ProductVisual } from '@/components/products/product-visual'

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.categorySlug)
  return (
    <Link
      href={productHref(product.slug)}
      className="group flex h-full flex-col border border-ink/15 bg-paper transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-ink/50 hover:shadow-[0_22px_40px_-28px_rgba(18,48,63,0.55)] active:translate-y-0"
    >
      <ProductVisual
        image={product.images[0]}
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-[4/3] transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="mt-auto border-t border-ink/10 p-5">
        {category ? <p className="eyebrow !text-[0.68rem]">{localize(category.name)}</p> : null}
        <h3 className="mt-2 font-display text-xl font-semibold leading-tight text-ink">{localize(product.name)}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{localize(product.summary)}</p>
        <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-display text-sm font-semibold text-ink group-hover:text-ember-text">
          View details
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}
