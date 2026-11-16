import Image from 'next/image'

const factoryImages = [
  {
    src: '/images/factory/workshop-stainless-machines.jpg',
    alt: 'Stainless steel pulverizers and processing machines arranged inside the Xingyang workshop',
    label: 'Stainless equipment workshop',
  },
  {
    src: '/images/factory/workshop-blue-machines.jpg',
    alt: 'Rows of blue pulverizer housings and stainless machines inside the Xingyang workshop',
    label: 'Pulverizer inventory',
  },
  {
    src: '/images/factory/factory-yard.jpg',
    alt: 'Open yard between the blue factory buildings in Gaocun, Xingyang',
    label: 'Factory yard',
  },
]

export function FactoryGallery() {
  return (
    <figure>
      <div className="grid gap-3 sm:grid-cols-2">
        {factoryImages.map((image, index) => (
          <div key={image.src} className={index === 0 ? 'sm:col-span-2' : ''}>
            <div className={`relative overflow-hidden bg-paper-deep ${index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={index === 0 ? '(min-width: 1024px) 42vw, 100vw' : '(min-width: 1024px) 21vw, 50vw'}
                className="object-cover transition-transform duration-700 hover:scale-[1.025]"
              />
            </div>
            <figcaption className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {image.label}
            </figcaption>
          </div>
        ))}
      </div>
    </figure>
  )
}
