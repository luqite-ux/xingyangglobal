import { site } from '@/lib/site'
import { Section, SectionHeading } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { ButtonLink } from '@/components/site/button-link'

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading
        id="about"
        index="07"
        eyebrow="About the manufacturer"
        title="A flour and processing machinery maker since 2002"
      />
      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <Reveal className="md:col-span-6">
          <p className="text-lg leading-relaxed text-ink/90">
            Xingyang builds pulverizers, wood crushers, mixers and fiber filling machines for agriculture, forestry and
            food processing buyers. The factory is located in Gaocun, Xingyang, in Henan province.
          </p>
          <div className="mt-8">
            <ButtonLink href="/about">Read about the factory</ButtonLink>
          </div>
        </Reveal>
        <Reveal as="dl" delay={1} className="grid gap-5 border-l-2 border-ember pl-6 md:col-span-5 md:col-start-8">
          <div>
            <dt className="eyebrow !text-[0.68rem]">Legal name</dt>
            <dd lang="zh-Hans" className="mt-1 font-display text-2xl font-semibold text-ink">{site.legalNameZh}</dd>
          </div>
          <div>
            <dt className="eyebrow !text-[0.68rem]">English display name</dt>
            <dd className="mt-1 text-ink">{site.displayName}</dd>
            <dd className="mt-1 text-xs text-muted-foreground">A direct translation for display, not a registered English name.</dd>
          </div>
          <div>
            <dt className="eyebrow !text-[0.68rem]">Address</dt>
            <dd className="mt-1 text-ink">{site.address}</dd>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
