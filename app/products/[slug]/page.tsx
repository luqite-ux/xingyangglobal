import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { categories, categoryHref, getCategory, products, productHref } from '@/lib/products'
import { getProductBySlug } from '@/lib/products-db'
import { getApplication, applicationHref } from '@/lib/applications'
import { localize } from '@/lib/i18n'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { TextLink } from '@/components/site/button-link'
import { ProductGallery } from '@/components/products/product-gallery'
import { SpecTables } from '@/components/products/spec-tables'
import { RfqForm } from '@/components/rfq/rfq-form'
import { JsonLd } from '@/components/seo/json-ld'
import { site } from '@/lib/site'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}
export const dynamicParams = true
export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return buildMetadata({
    title: localize(product.name),
    description: localize(product.summary),
    path: productHref(product.slug),
    image: product.images[0].src,
  })
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()
  const category = getCategory(product.categorySlug)
  const name = localize(product.name)
  const applicationList = (category?.applications ?? []).map(getApplication).filter(Boolean)

  return (
    <>
      <JsonLd data={[
        {
          '@context': 'https://schema.org',
          '@type': 'Product',
          '@id': `${site.url}${productHref(product.slug)}#product`,
          name,
          description: localize(product.summary),
          image: product.images.map((image) => image.src.startsWith('http') ? image.src : `${site.url}${image.src}`),
          url: `${site.url}${productHref(product.slug)}`,
          manufacturer: { '@id': `${site.url}/#organization` },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
            { '@type': 'ListItem', position: 2, name: 'Products', item: `${site.url}/products` },
            ...(category ? [{ '@type': 'ListItem', position: 3, name: localize(category.name), item: `${site.url}${categoryHref(category.slug)}` }] : []),
            { '@type': 'ListItem', position: category ? 4 : 3, name, item: `${site.url}${productHref(product.slug)}` },
          ],
        },
      ]} />
      <PageHero
        eyebrow={category ? localize(category.name) : 'Product'}
        title={name}
        intro={localize(product.summary)}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          ...(category ? [{ label: localize(category.name), href: categoryHref(category.slug) }] : []),
          { label: name },
        ]}
      />

      <Section id="overview" labelledBy="overview-title" className="!border-t-0">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ProductGallery images={product.images} />
          </Reveal>
          <Reveal delay={1}>
            <h2 id="overview-title" className="text-3xl font-semibold">
              Overview
            </h2>
            <div className="mt-5 grid gap-4 text-base leading-relaxed text-muted-foreground">
              {localize(product.overview).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-8 grid border-t border-ink/20">
              <div className="flex justify-between gap-4 border-b border-ink/10 py-3">
                <dt className="text-sm text-muted-foreground">Minimum order</dt>
                <dd className="font-display font-semibold text-ink">One machine</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-ink/10 py-3">
                <dt className="text-sm text-muted-foreground">Pricing</dt>
                <dd className="font-display font-semibold text-ink">On inquiry</dd>
              </div>
            </dl>
            <div className="mt-8">
              <TextLink href="#rfq">Request a quote for this model</TextLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section id="specifications" tone="deep">
        <Reveal>
          <h2 id="specifications-title" className="text-3xl font-semibold">
            Specifications
          </h2>
          {product.specsPending ? (
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {product.specs.length
                ? 'Verified catalogue parameters are shown below where supplied.'
                : 'Structured specifications are not published for this product yet. Send your requirements and we will confirm suitability.'}
            </p>
          ) : null}
        </Reveal>
        {product.specs.length ? (
          <Reveal className="mt-10" delay={1}>
            <SpecTables groups={product.specs} />
          </Reveal>
        ) : null}
      </Section>

      <Section id="applications-fit">
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 id="applications-fit-title" className="text-3xl font-semibold">
              Applications
            </h2>
            {applicationList.length ? (
              <ul className="mt-6 grid border-t border-ink/20">
                {applicationList.map((application) =>
                  application ? (
                    <li key={application.slug} className="border-b border-ink/10">
                      <Link
                        href={applicationHref(application.slug)}
                        className="group flex min-h-11 items-baseline justify-between gap-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                      >
                        <span>
                          <span className="font-display text-lg font-semibold text-ink group-hover:text-ember-text">{localize(application.name)}</span>
                          <span className="mt-1 block text-sm text-muted-foreground">{localize(application.summary)}</span>
                        </span>
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            ) : (
              <p className="mt-4 text-muted-foreground">Application fit is confirmed per inquiry for this family.</p>
            )}
          </Reveal>
          <Reveal delay={1}>
            <h2 className="text-3xl font-semibold">Selection notes</h2>
            <ol className="mt-6 grid gap-4">
              {localize(product.selectionNotes).map((note, index) => (
                <li key={note} className="flex gap-4 border-b border-ink/10 pb-4">
                  <span className="font-display text-sm font-semibold tabular-nums text-ember-text">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-ink/90">{note}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Section>

      <Section id="rfq" tone="deep">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 id="rfq-title" className="text-3xl font-semibold">
              Request a quote
            </h2>
            <p className="mt-4 text-muted-foreground">
              Your inquiry carries this product&apos;s name so we can reply with a model suggestion based on your material and output.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={1}>
            <RfqForm
              productOptions={categories.map((c) => localize(c.name))}
              defaultProduct={category ? localize(category.name) : undefined}
              productContext={{ name, slug: product.slug }}
              defaultMessage={`I would like a quote for ${name}. `}
            />
          </Reveal>
        </div>
      </Section>
    </>
  )
}
