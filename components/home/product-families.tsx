import { categories } from '@/lib/products'
import { Section, SectionHeading } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { CategoryCard } from '@/components/products/category-card'
import { TextLink } from '@/components/site/button-link'

export function ProductFamilies() {
  return (
    <Section id="product-families">
      <SectionHeading
        id="product-families"
        index="01"
        eyebrow="Product families"
        title="Five equipment families, each with its own catalogue page"
        intro="Every card opens a filtered catalogue for that family. Images show the supplied catalogue sheets and product photos in full."
      />
      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
        {categories.map((category, index) => (
          <Reveal as="li" key={category.slug} delay={index % 3} className={index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <CategoryCard category={category} index={index} sizes={index < 3 ? '(min-width: 1024px) 28vw, (min-width: 768px) 45vw, 100vw' : '(min-width: 1024px) 42vw, (min-width: 768px) 45vw, 100vw'} />
          </Reveal>
        ))}
      </ul>
      <Reveal className="mt-8 flex justify-end">
        <TextLink href="/products">Open the full catalogue</TextLink>
      </Reveal>
    </Section>
  )
}
