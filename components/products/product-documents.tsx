import Image from 'next/image'
import type { ProductImage } from '@/lib/products'

const woodCrusherInstructions = [
  {
    title: 'Primary uses',
    body: 'This integrated wood cutting and pulverizing machine processes wood with an approximate diameter of 1–20 cm, including branches, logs, bamboo, straw, corn stalks and other fibrous materials. It can also prepare wood-based raw materials for mushroom cultivation, particleboard and fiberboard production.',
  },
  {
    title: 'Operating principle',
    body: 'Blade cutting and high-speed airflow work together to produce a fine and consistent output. As the rotor turns, the material is cut, accelerated in the airflow and repeatedly impacted before passing through the selected screen.',
  },
]

const installationSteps = [
  'Connect the machine to a suitable power supply and control switch, then confirm that the motor rotates in the correct direction.',
  'Install the machine on a level concrete base and secure it with anchor bolts.',
  'Align the machine pulley and motor pulley in one straight line before tensioning the V-belt.',
  'Check all fasteners and confirm that the feed inlet closes securely before operation.',
  'Do not feed wood containing metal, stones or other hard foreign objects that could damage the blades or internal components.',
  'Inspect the hammer-blade fasteners regularly. Tighten loose fasteners and replace severely worn hammer blades or bolts.',
  'After inspection, perform a no-load test run. Begin production only when the machine operates normally.',
  'If the required particle size is not achieved, replace the screen with one that has the appropriate aperture size.',
  'When installing a blade, extend the blade edge 2–4 mm beyond the cutter-disc surface, then tighten the bolts. Replace damaged pressure bolts promptly to prevent the blade nut from loosening.',
  'When adjusting blade extension, keep all blade lengths consistent.',
]

const maintenanceSteps = [
  'Use clean lubricant and maintain effective bearing seals. Proper lubrication directly affects service life and operating efficiency.',
  'Inspect fasteners regularly and tighten any that have loosened.',
  'Monitor wear parts and replace components that are excessively worn.',
  'Lubricate designated friction points at regular intervals.',
  'If bearing temperature rises abnormally, stop the machine immediately and identify the cause before restarting.',
  'If rotating gears produce impact noise, stop the machine immediately for inspection.',
  'When the machine is not in use, store it indoors and remove residual sawdust to keep internal components clean and ready for the next operation.',
]

function WoodCrusherInstructions() {
  return (
    <section className="bg-paper px-5 py-10 sm:px-10 sm:py-14" aria-labelledby="wood-crusher-instructions">
      <div className="mx-auto max-w-3xl">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-ember-text">Operating reference</p>
        <h4 id="wood-crusher-instructions" className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          Product instructions
        </h4>
        <div className="mt-8 grid gap-7 sm:grid-cols-2">
          {woodCrusherInstructions.map((item) => (
            <div key={item.title}>
              <h5 className="font-display text-lg font-semibold text-ink">{item.title}</h5>
              <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 border-t border-ink/15 pt-8">
          <h5 className="font-display text-xl font-semibold text-ink">Installation and trial operation</h5>
          <ol className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
            {installationSteps.map((step, index) => (
              <li key={step} className="grid grid-cols-[2rem_1fr] gap-2">
                <span className="font-display font-semibold text-ember-text">{String(index + 1).padStart(2, '0')}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-10 border-t border-ink/15 pt-8">
          <h5 className="font-display text-xl font-semibold text-ink">Maintenance</h5>
          <ol className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground sm:text-base">
            {maintenanceSteps.map((step, index) => (
              <li key={step} className="grid grid-cols-[2rem_1fr] gap-2">
                <span className="font-display font-semibold text-ember-text">{String(index + 1).padStart(2, '0')}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-10 border-t border-ink/15 pt-8">
          <h5 className="font-display text-xl font-semibold text-ink">Technical support</h5>
          <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
            Contact our service team for troubleshooting assistance and parts availability. The applicable support scope is confirmed for each order.
          </p>
        </div>
      </div>
    </section>
  )
}

export function ProductDocuments({ documents, productSlug }: { documents: ProductImage[]; productSlug: string }) {
  if (!documents.length) return null

  const isWoodCrusher = productSlug === 'wood-crusher-420'
  const visibleDocuments = isWoodCrusher
    ? documents.filter((document) => !document.caption.startsWith('Product instructions'))
    : documents

  return (
    <div className="mt-16 border-t border-ink/20 pt-12">
      <div className="mx-auto max-w-[62rem]">
        <h3 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.04] text-ink">Product details</h3>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Review model data, processing results, applications and operating information in sequence.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-[62rem] overflow-hidden bg-white">
        {visibleDocuments.map((document) => (
          <div key={document.src}>
            <Image
              src={document.src}
              alt={document.alt}
              width={document.width ?? 2000}
              height={document.height ?? 2000}
              quality={90}
              sizes="(min-width: 1024px) 62rem, 100vw"
              className="h-auto w-full bg-white object-contain"
            />
          </div>
        ))}
        {isWoodCrusher ? <WoodCrusherInstructions /> : null}
      </div>
    </div>
  )
}
