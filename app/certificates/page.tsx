import type { Metadata } from 'next'
import { FileCheck } from 'lucide-react'
import { buildMetadata } from '@/lib/metadata'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/section'
import { ButtonLink } from '@/components/site/button-link'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

export const metadata: Metadata = buildMetadata({
  title: 'Certificates',
  description: 'Certificate documents will be listed here when available.',
  path: '/certificates',
  noindex: true,
})

/** Template route: render records from the backend here. Not linked in navigation until real records exist. */
const certificates: never[] = []

export default function CertificatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Certificates"
        title="Certificates"
        intro="Certificate documents will appear here when available."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Certificates' }]}
      />
      <Section id="records" labelledBy="records-title" className="!border-t-0">
        <h2 id="records-title" className="sr-only">
          Certificate records
        </h2>
        {certificates.length === 0 ? (
          <Empty className="border border-dashed border-ink/25 bg-paper-deep/50">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileCheck aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>No certificate records yet</EmptyTitle>
              <EmptyDescription>No certificate documents are currently published.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <ButtonLink href="/contact">Ask us a question</ButtonLink>
            </EmptyContent>
          </Empty>
        ) : null}
      </Section>
    </>
  )
}
