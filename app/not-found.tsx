import { PageHero } from '@/components/site/page-hero'
import { ButtonLink } from '@/components/site/button-link'

export default function NotFound() {
  return (
    <PageHero
      eyebrow="Error 404"
      title="This page is not in the catalogue."
      intro="The address may have changed. Return to the product families or send us your material and output requirements."
    >
      <ButtonLink href="/products">Browse products</ButtonLink>
      <ButtonLink href="/contact" variant="secondary">
        Contact us
      </ButtonLink>
    </PageHero>
  )
}
