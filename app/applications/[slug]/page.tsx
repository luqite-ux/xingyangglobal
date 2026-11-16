import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { applications, getApplication, applicationHref } from '@/lib/applications'
import { getCategory } from '@/lib/products'
import { localize } from '@/lib/i18n'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { ButtonLink } from '@/components/site/button-link'
import { CategoryCard } from '@/components/products/category-card'
import { ApplicationIcon } from '@/components/site/application-icon'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return applications.map((application) => ({ slug: application.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const application = getApplication(slug)
  if (!application) return {}
  return buildMetadata({
    title: `${localize(application.name)} Applications`,
    description: localize(application.summary),
    path: applicationHref(application.slug),
  })
}

export default async function ApplicationPage({ params }: Props) {
  const { slug } = await params
  const application = getApplication(slug)
  if (!application) notFound()
  const name = localize(application.name)
  const families = application.families.map(getCategory).filter((c) => !!c)

  return (
    <>
      <PageHero
        eyebrow="Application"
        title={name}
        intro={localize(application.summary)}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Applications', href: '/applications' }, { label: name }]}
      >
        <ButtonLink href="/contact?intent=model-selection">Discuss {name.toLowerCase()} needs</ButtonLink>
      </PageHero>

      <Section id="scope" className="!border-t-0">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <ApplicationIcon slug={application.slug} className="size-10 text-mineral" />
            <h2 id="scope-title" className="mt-5 text-3xl font-semibold">
              Scope and focus
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={1}>
            <dl className="grid border-t border-ink/20">
              <div className="grid gap-1 border-b border-ink/10 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="eyebrow !text-[0.68rem]">Materials</dt>
                <dd>{localize(application.materials)}</dd>
              </div>
              <div className="grid gap-1 border-b border-ink/10 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="eyebrow !text-[0.68rem]">Focus</dt>
                <dd>{localize(application.focus)}</dd>
              </div>
              <div className="grid gap-1 border-b border-ink/10 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="eyebrow !text-[0.68rem]">To confirm</dt>
                <dd>
                  <ul className="grid gap-1 sm:grid-cols-2">
                    {localize(application.confirm).map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 bg-ember" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section id="families" tone="deep">
        <Reveal>
          <h2 id="families-title" className="text-3xl font-semibold">
            Families to look at first
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {families.map((category, index) =>
            category ? (
              <Reveal as="li" key={category.slug} delay={index}>
                <CategoryCard category={category} index={index} />
              </Reveal>
            ) : null,
          )}
        </ul>
      </Section>
    </>
  )
}
