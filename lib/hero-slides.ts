export type HeroSlide = {
  id: string
  src: string
  alt: string
  posClass: string
  side: 'left' | 'right'
  kicker: string
  headline: string
  body: string
  primary: { label: string; href: string }
  secondary: { label: string; href: string }
  tabLabel: string
}

/** Customer-supplied campaign artwork. Keep factual factory claims in the manufacturing sections. */
export const heroSlides: HeroSlide[] = [
  {
    id: 'process-needs',
    src: '/images/banners/banner-1.jpg',
    alt: 'Industrial processing machinery in a modern production setting',
    posClass: 'hero-pos-1',
    side: 'left',
    kicker: 'Grinding, crushing and mixing',
    headline: 'Processing Machinery Selected Around Your Material and Output',
    body: 'Compare pulverizers, wood crushers and mixers, then confirm the model, power supply and build for your application.',
    primary: { label: 'Browse products', href: '/products' },
    secondary: { label: 'See how selection works', href: '/#selection-guide' },
    tabLabel: 'Process needs',
  },
  {
    id: 'equipment-plan',
    src: '/images/banners/banner-2.jpg',
    alt: 'Automated processing equipment and material handling machinery',
    posClass: 'hero-pos-2',
    side: 'right',
    kicker: 'Requirements to plan',
    headline: 'From Material Requirements to a Practical Equipment Plan',
    body: 'Share the material, target output and available voltage. We will help narrow the catalogue to suitable model options.',
    primary: { label: 'Explore the catalogue', href: '/products' },
    secondary: { label: 'Read the workflow', href: '/#workflow' },
    tabLabel: 'Equipment plan',
  },
  {
    id: 'one-catalogue',
    src: '/images/banners/banner-3.jpg',
    alt: 'Pulverizer, wood crusher and stainless processing machines',
    posClass: 'hero-pos-3',
    side: 'left',
    kicker: 'One catalogue',
    headline: 'Five Equipment Families for Grinding, Crushing, Mixing and Filling',
    body: 'Review real product photos, model parameters and application guidance, then ask for help matching a machine to the job.',
    primary: { label: 'Get model selection help', href: '/contact?intent=model-selection' },
    secondary: { label: 'View product families', href: '/#product-families' },
    tabLabel: 'One catalogue',
  },
]
