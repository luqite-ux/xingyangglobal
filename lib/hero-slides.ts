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

/** Campaign artwork supplied by the customer; it is not evidence of the customer's own factory or line. */
export const heroSlides: HeroSlide[] = [
  {
    id: 'process-needs',
    src: '/images/banners/banner-1.jpg',
    alt: 'Campaign artwork of an industrial building with stainless tower and grinding machines on a lit floor',
    posClass: 'hero-pos-1',
    side: 'left',
    kicker: 'Grinding and mixing',
    headline: 'Grinding and Mixing Equipment Built Around Real Process Needs',
    body: 'Start from your material and output. We match pulverizers and mixers to the job, then confirm the build before production.',
    primary: { label: 'Browse products', href: '/products' },
    secondary: { label: 'See how selection works', href: '/#selection-guide' },
    tabLabel: 'Process needs',
  },
  {
    id: 'equipment-plan',
    src: '/images/banners/banner-2.jpg',
    alt: 'Campaign artwork of a production hall with conveyors, a robotic arm and a hammer-type crusher',
    posClass: 'hero-pos-2',
    side: 'right',
    kicker: 'Requirements to plan',
    headline: 'Turn Material Requirements Into a Clear Equipment Plan',
    body: 'Tell us what you process, how much and on what power supply. Our team returns a model suggestion you can review.',
    primary: { label: 'Explore the catalogue', href: '/products' },
    secondary: { label: 'Read the workflow', href: '/#workflow' },
    tabLabel: 'Equipment plan',
  },
  {
    id: 'one-catalogue',
    src: '/images/banners/banner-3.jpg',
    alt: 'Campaign artwork showing a blue pulverizer, a green wood crusher and a stainless pulverizer in a factory hall',
    posClass: 'hero-pos-3',
    side: 'left',
    kicker: 'One catalogue',
    headline: 'One Catalogue for Grinding, Crushing, Mixing and Filling Tasks',
    body: 'Five equipment families, one place to compare them. Ask for help choosing a model for your task.',
    primary: { label: 'Get model selection help', href: '/contact?intent=model-selection' },
    secondary: { label: 'View product families', href: '/#product-families' },
    tabLabel: 'One catalogue',
  },
]
