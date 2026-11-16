import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { categories, getCategory, categoryHref, productHref, type Product } from '@/lib/products'
import { getProducts } from '@/lib/products-db'
import { localize } from '@/lib/i18n'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { ButtonLink } from '@/components/site/button-link'
import { ProductCard } from '@/components/products/product-card'
import { CategoryCard } from '@/components/products/category-card'
import { cn } from '@/lib/utils'

type Props = { searchParams: Promise<{ category?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category } = await searchParams
  const active = category ? getCategory(category) : undefined
  return buildMetadata({
    title: active ? `${localize(active.name)} | Products` : 'Products | Grinding, Crushing, Mixing and Filling Machines',
    description: active
      ? localize(active.description)
      : 'Browse five product families: multi-function pulverizers, stainless steel pulverizers, wood crushers, stainless steel mixers and fiber filling machines.',
    path: active ? categoryHref(active.slug) : '/products',
  })
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams
  const active = category ? getCategory(category) : undefined
  const allProducts = await getProducts()
  const list: Product[] = active ? allProducts.filter((product) => product.categorySlug === active.slug) : allProducts

  return (
    <>
      <PageHero
        eyebrow="Product catalogue"
        title={active ? localize(active.name) : 'Five machine families, one catalogue'}
        intro={
          active
            ? localize(active.description)
            : 'Browse grinding, crushing, mixing and filling equipment by family. Compare model parameters, applications and selection points before sending an inquiry.'
        }
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Products', href: active ? '/products' : undefined }, ...(active ? [{ label: localize(active.name) }] : [])]}
      >
        <ButtonLink href="/contact?intent=model-selection">Ask for model selection</ButtonLink>
      </PageHero>

      <Section id="catalogue" labelledBy="catalogue-heading" className="!border-t-0 !pt-10">
        <h2 id="catalogue-heading" className="sr-only">
          Filter and browse products
        </h2>
        <nav aria-label="Product categories" className="mb-10">
          <ul className="flex flex-wrap gap-2">
            {[{ slug: undefined, label: 'All products' }, ...categories.map((c) => ({ slug: c.slug, label: localize(c.name) }))].map((item) => {
              const current = (item.slug ?? undefined) === active?.slug
              return (
                <li key={item.label}>
                  <Link
                    href={item.slug ? categoryHref(item.slug) : '/products'}
                    aria-current={current ? 'page' : undefined}
                    className={cn(
                      'inline-flex min-h-11 items-center border px-4 font-display text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember active:translate-y-px',
                      current ? 'border-ink bg-ink text-paper' : 'border-ink/25 text-ink hover:border-ink hover:bg-paper-deep',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {active || list.length ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(active ? list : []).map((product, i) => (
              <Reveal as="li" key={product.slug} delay={i}>
                <ProductCard product={product} />
              </Reveal>
            ))}
            {!active
              ? categories.map((c, i) => {
                  const product = allProducts.find((item) => item.categorySlug === c.slug)
                  return (
                    <Reveal as="li" key={c.slug} delay={i % 3}>
                      <CategoryCard
                        category={c}
                        index={i}
                        href={product ? productHref(product.slug) : categoryHref(c.slug)}
                        directToProduct={Boolean(product)}
                      />
                    </Reveal>
                  )
                })
              : null}
          </ul>
        ) : null}

      </Section>
    </>
  )
}
