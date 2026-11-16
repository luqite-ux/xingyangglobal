import { Factory, MapPin, PackageCheck, Layers } from 'lucide-react'
import { site } from '@/lib/site'
import { categories } from '@/lib/products'
import { HeroCarousel } from '@/components/home/hero-carousel'
import { GrainField } from '@/components/three/grain-field'
import { Reveal } from '@/components/site/reveal'

const facts = [
  { icon: Factory, label: 'Manufacturer since', value: String(site.founded) },
  { icon: MapPin, label: 'Based in', value: 'Gaocun, Xingyang, Henan' },
  { icon: Layers, label: 'Equipment families', value: `${categories.length} product families` },
  { icon: PackageCheck, label: 'Minimum order', value: site.moq },
]

export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative bg-paper">
      <h1 id="hero-title" className="sr-only">
        Xingyang Flour Machinery: pulverizers, crushers, mixers and filling machines from Henan, China
      </h1>
      <HeroCarousel />
      <div className="relative overflow-hidden border-b border-ink/10 bg-paper">
        <GrainField className="inset-y-0 right-0 w-full opacity-90 md:w-3/5" />
        <div className="container-wide relative">
          <Reveal as="dl" className="grid grid-cols-2 gap-x-6 gap-y-6 py-10 md:grid-cols-4">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="mt-0.5 size-5 shrink-0 text-ember-text" strokeWidth={1.6} aria-hidden="true" />
                <div>
                  <dt className="eyebrow !text-[0.68rem]">{label}</dt>
                  <dd className="mt-1 font-display text-base font-semibold text-ink">{value}</dd>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
