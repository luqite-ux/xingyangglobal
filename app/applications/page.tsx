import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/metadata'
import { applications, applicationHref } from '@/lib/applications'
import { categoryHref, getCategory } from '@/lib/products'
import { localize } from '@/lib/i18n'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { ButtonLink, TextLink } from '@/components/site/button-link'
import { ApplicationIcon } from '@/components/site/application-icon'

export const metadata: Metadata = buildMetadata({
  title: 'Applications | Agriculture, Forestry and Food Processing',
  description:
    'See how Xingyang grinding, crushing and mixing equipment maps to agriculture, forestry and food processing, and what to confirm before choosing a model.',
  path: '/applications',
})

export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Applications"
        title="Match the machine to the material"
        intro="Three application areas, each described the same way: materials, processing focus, what to confirm and which families to look at first."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Applications' }]}
      >
        <ButtonLink href="/contact?intent=model-selection">Discuss your material</ButtonLink>
      </PageHero>

      {applications.map((application, index) => (
        <Section key={application.slug} id={application.slug} tone={index % 2 ? 'deep' : 'paper'} className={index === 0 ? '!border-t-0' : undefined}>
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <ApplicationIcon slug={application.slug} className="size-10 text-mineral" />
              <h2 id={`${application.slug}-title`} className="mt-5 text-4xl font-semibold">
                {localize(application.name)}
              </h2>
              <p className="mt-4 text-muted-foreground">{localize(application.summary)}</p>
              <div className="mt-6">
                <TextLink href={applicationHref(application.slug)}>Open {localize(application.name)}</TextLink>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={1}>
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
                <div className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="eyebrow !text-[0.68rem]">Families</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-2">
                      {application.families.map((slug) => {
                        const category = getCategory(slug)
                        return category ? (
                          <li key={slug}>
                            <Link
                              href={categoryHref(slug)}
                              className="inline-flex min-h-11 items-center border border-ink/25 px-3 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember"
                            >
                              {localize(category.name)}
                            </Link>
                          </li>
                        ) : null
                      })}
                    </ul>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </Section>
      ))}
    </>
  )
}
