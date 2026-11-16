import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { applicationHref, applications } from '@/lib/applications'
import { getCategory } from '@/lib/products'
import { localize } from '@/lib/i18n'
import { Section, SectionHeading } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { ApplicationIcon } from '@/components/site/application-icon'

export function ApplicationsSection() {
  return (
    <Section id="applications">
      <SectionHeading
        id="applications"
        index="03"
        eyebrow="Applications"
        title="Three processing domains, described the same way"
        intro="Each domain lists the material you bring, what the machine is asked to do, and the families that usually apply."
      />
      <div className="mt-14 grid gap-px border border-ink/15 bg-ink/15 lg:grid-cols-3">
        {applications.map((application, index) => (
          <Reveal key={application.slug} delay={index} className="bg-paper">
            <Link
              href={applicationHref(application.slug)}
              className="group flex h-full flex-col p-7 transition-colors hover:bg-mineral-soft/60"
            >
              <ApplicationIcon slug={application.slug} className="size-9 text-mineral" />
              <h3 className="mt-6 text-2xl font-semibold text-ink">{localize(application.name)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{localize(application.summary)}</p>
              <dl className="mt-6 grid gap-4 border-t border-ink/10 pt-5 text-sm">
                <div>
                  <dt className="eyebrow !text-[0.68rem]">Material</dt>
                  <dd className="mt-1 text-ink/90">{localize(application.materials)}</dd>
                </div>
                <div>
                  <dt className="eyebrow !text-[0.68rem]">Focus</dt>
                  <dd className="mt-1 text-ink/90">{localize(application.focus)}</dd>
                </div>
                <div>
                  <dt className="eyebrow !text-[0.68rem]">Families</dt>
                  <dd className="mt-1 text-ink/90">
                    {application.families.map((slug) => localize(getCategory(slug)!.name)).join(', ')}
                  </dd>
                </div>
              </dl>
              <span className="mt-6 inline-flex min-h-11 items-center gap-1.5 pt-2 font-display text-sm font-semibold text-ink group-hover:text-ember-text lg:mt-auto">
                View {localize(application.name)}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
