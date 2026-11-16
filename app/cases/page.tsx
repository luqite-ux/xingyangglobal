import type { Metadata } from 'next'
import { Briefcase } from 'lucide-react'
import { buildMetadata } from '@/lib/metadata'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/section'
import { ButtonLink } from '@/components/site/button-link'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

export const metadata: Metadata = buildMetadata({
  title: 'Cases',
  description: 'Project cases will be listed here when available.',
  path: '/cases',
  noindex: true,
})

/** Template route: render records from the backend here. Not linked in navigation until real records exist. */
const cases: never[] = []

export default function CasesPage() {
  return (
    <>
      <PageHero eyebrow="Cases" title="Cases" intro="Project records will appear here when available." crumbs={[{ label: 'Home', href: '/' }, { label: 'Cases' }]} />
      <Section id="records" labelledBy="records-title" className="!border-t-0">
        <h2 id="records-title" className="sr-only">
          Case records
        </h2>
        {cases.length === 0 ? (
          <Empty className="border border-dashed border-ink/25 bg-paper-deep/50">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Briefcase aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>No case records yet</EmptyTitle>
              <EmptyDescription>No project cases are currently published.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <ButtonLink href="/products">Browse products</ButtonLink>
            </EmptyContent>
          </Empty>
        ) : null}
      </Section>
    </>
  )
}
