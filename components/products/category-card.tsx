import { ArrowUpRight } from 'lucide-react'
import { categoryHref, type Category } from '@/lib/products'
import { localize } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { CategoryIcon } from '@/components/site/category-icon'
import { ProductVisual } from '@/components/products/product-visual'

type CategoryCardProps = {
  category: Category
  index: number
  className?: string
  sizes?: string
  href?: string
  directToProduct?: boolean
}

export function CategoryCard({
  category,
  index,
  className,
  sizes = '(min-width: 1024px) 33vw, 100vw',
  href = categoryHref(category.slug),
  directToProduct = false,
}: CategoryCardProps) {
  const name = localize(category.name)
  return (
    <a
      href={href}
      className={cn(
        'group relative flex h-full flex-col border border-ink/15 bg-paper transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-ink/50 hover:shadow-[0_22px_40px_-28px_rgba(18,48,63,0.55)] active:translate-y-0',
        className,
      )}
    >
      <div className="flex items-start justify-between px-5 pt-5">
        <span className="font-display text-xs font-semibold tabular-nums tracking-widest text-ember-text">
          {String(index + 1).padStart(2, '0')}
        </span>
        <CategoryIcon slug={category.slug} className="size-6 text-mineral" />
      </div>
      <ProductVisual
        image={category.cover}
        sizes={sizes}
        className="aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
      />
      <div className="mt-auto border-t border-ink/10 px-5 pb-5 pt-4">
        <h3 className="font-display text-xl font-semibold leading-tight text-ink">{name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{localize(category.tagline)}</p>
        <ul className="mt-3 grid gap-1 text-sm text-ink/80">
          {localize(category.highlights)
            .slice(0, 2)
            .map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-ember" />
                {item}
              </li>
            ))}
        </ul>
        <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 font-display text-sm font-semibold text-ink group-hover:text-ember-text">
          {directToProduct ? 'View details' : `Explore ${name}`}
          <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </a>
  )
}
