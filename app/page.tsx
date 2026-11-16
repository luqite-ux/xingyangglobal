import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { HeroSection } from '@/components/home/hero-section'
import { ProductFamilies } from '@/components/home/product-families'
import { SelectionGuide } from '@/components/home/selection-guide'
import { ApplicationsSection } from '@/components/home/applications-section'
import { ManufacturingProof } from '@/components/home/manufacturing-proof'
import { WorkflowSection } from '@/components/home/workflow-section'
import { QualityAndFit } from '@/components/home/quality-and-fit'
import { AboutSection } from '@/components/home/about-section'
import { FaqSection } from '@/components/home/faq-section'
import { FinalRfq } from '@/components/home/final-rfq'

export const metadata: Metadata = buildMetadata({
  title: 'Flour and Processing Machinery Manufacturer | Xingyang',
  description:
    'Xingyang manufactures multi-function and stainless steel pulverizers, wood crushers, stainless steel mixers and fiber filling machines in Henan, China. Minimum order one machine.',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductFamilies />
      <SelectionGuide />
      <ApplicationsSection />
      <ManufacturingProof />
      <WorkflowSection />
      <QualityAndFit />
      <AboutSection />
      <FaqSection />
      <FinalRfq />
    </>
  )
}
