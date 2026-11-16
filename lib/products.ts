import { l, localize, type Localized, type Locale } from '@/lib/i18n'

export type CategorySlug =
  | 'multi-function-pulverizers'
  | 'stainless-steel-pulverizers'
  | 'wood-crushers'
  | 'stainless-steel-mixers'
  | 'fiber-filling-machines'

export type ApplicationSlug = 'agriculture' | 'forestry' | 'food-processing'

export type ProductImage = {
  src: string
  alt: string
  /** "sheet" images carry printed catalogue data; "photo" images show the machine itself. */
  kind: 'sheet' | 'photo'
  caption: string
}

export type SpecGroup =
  | { kind: 'pairs'; title: string; rows: { label: string; value: string }[]; note?: string }
  | {
      kind: 'matrix'
      title: string
      columns: string[]
      rows: { label: string; values: string[] }[]
      shared?: { label: string; value: string }[]
      note?: string
    }

export type Category = {
  slug: CategorySlug
  name: Localized
  tagline: Localized
  description: Localized
  highlights: Localized<string[]>
  cover: ProductImage
  applications: ApplicationSlug[]
}

export type Product = {
  slug: string
  categorySlug: CategorySlug
  name: Localized
  summary: Localized
  overview: Localized<string[]>
  images: ProductImage[]
  specs: SpecGroup[]
  specsPending: boolean
  selectionNotes: Localized<string[]>
}

const sheet = (src: string, alt: string, caption: string): ProductImage => ({ src, alt, kind: 'sheet', caption })
const photo = (src: string, alt: string, caption: string): ProductImage => ({ src, alt, kind: 'photo', caption })

export const categories: Category[] = [
  {
    slug: 'multi-function-pulverizers',
    name: l('Multi-function Pulverizers'),
    tagline: l('Broad grinding family'),
    description: l(
      'A broad grinding family covering a range of model sizes from 360 Type to 1000 Type, with catalogue parameters for motor speed, rated power and machine weight.',
    ),
    highlights: l(['360 to 1000 Type range', 'Single-head mold arrangement', 'Rated power listed per model']),
    cover: photo('/images/products/category-pulverizer.jpg', 'Green multi-function pulverizer with cyclone separator', 'Multi-function pulverizer'),
    applications: ['agriculture', 'forestry'],
  },
  {
    slug: 'stainless-steel-pulverizers',
    name: l('Stainless Steel Pulverizers'),
    tagline: l('Stainless contact and build variants'),
    description: l(
      'Pulverizers for buyers who need stainless contact or build variants. Model range and parameters follow the supplied catalogue sheet; confirm the exact build with us.',
    ),
    highlights: l(['360 to 1000 Type range', 'Stainless variants per catalogue', 'Build confirmed per inquiry']),
    cover: photo('/images/products/category-stainless-pulverizer.jpg', 'Stainless steel pulverizer with cyclone separator and wheeled base', 'Stainless steel pulverizer'),
    applications: ['food-processing', 'agriculture'],
  },
  {
    slug: 'wood-crushers',
    name: l('Wood Crushers'),
    tagline: l('Wood and straw processing'),
    description: l(
      'Crushers for wood and straw processing. The 420 Type sheet lists motor power, inlet sizes, blade count and hourly output, with replaceable screening mesh for output fineness.',
    ),
    highlights: l(['420 to 1000 Type range', 'Wood and straw inlets', 'Replaceable screening mesh']),
    cover: photo('/images/products/category-wood-crusher.jpg', 'Green wood crusher with electric motor and feed inlet', 'Wood crusher'),
    applications: ['forestry', 'agriculture'],
  },
  {
    slug: 'stainless-steel-mixers',
    name: l('Stainless Steel Mixers'),
    tagline: l('Batch mixing, 15 to 200 kg'),
    description: l(
      'Circulating-operation mixers in five hopper sizes, from 15 kg to 200 kg, with voltage, motor power, hopper dimensions and weight listed per model.',
    ),
    highlights: l(['15 / 30 / 50 / 100 / 200 kg models', '220 V and 380 V options', 'Batch mixing context']),
    cover: photo('/images/products/category-mixer.jpg', 'Stainless steel mixer with screw conveyor and loading hopper', 'Stainless steel mixer'),
    applications: ['food-processing', 'agriculture'],
  },
  {
    slug: 'fiber-filling-machines',
    name: l('Fiber Filling Machines'),
    tagline: l('Image-supported identity'),
    description: l(
      'Fiber filling machine shown in the supplied product photo. Structured specifications are not published yet; send your fill material and output needs and we will confirm the match.',
    ),
    highlights: l(['Motor-driven blower body', 'Control box with start/stop', 'Specifications on request']),
    cover: {
      src: '/images/products/category-fiber-filling.jpg',
      alt: 'Fiber filling machine with blue motor, white blower housing, control box and outlet pipe',
      kind: 'photo',
      caption: 'Product photo',
    },
    applications: [],
  },
]

export const products: Product[] = [
  {
    slug: 'multi-function-pulverizer-360-1000',
    categorySlug: 'multi-function-pulverizers',
    name: l('Multi-function Pulverizer, 360 – 1000 Type'),
    summary: l('Grinding family with eight catalogue sizes from 360 Type to 1000 Type.'),
    overview: l([
      'The multi-function pulverizer family covers eight catalogue sizes. The supplied sheet lists overall size, motor speed, mold quantity, rated power and machine weight for each size.',
      'Choose a size by the material you grind, the output you expect and the power supply available at your site.',
    ]),
    images: [categories[0].cover, sheet('/images/products/product-1.jpg', 'Product parameters table for the Multi-function Pulverizer range, models 360 Type to 1000 Type', 'Model parameter sheet')],
    specs: [
      {
        kind: 'matrix',
        title: 'Model parameters',
        columns: ['360 Type', '400 Type', '420 Type', '500 Type', '600 Type', '750 Type', '850 Type', '1000 Type'],
        rows: [
          { label: 'Overall size (L × W × H, mm)', values: ['610 × 635 × 780', '750 × 780 × 860', '800 × 820 × 860', '860 × 850 × 1100', '850 × 970 × 1100', '950 × 970 × 1100', '900 × 1000 × 1320', '950 × 1250 × 1360'] },
          { label: 'Main motor speed (r/min)', values: ['4000', '4000', '4000', '4000', '3440', '3440', '3200', '3200'] },
          { label: 'Working diameter (mm)', values: ['360', '400', '420', '500', '600', '750', '850', '1000'] },
          { label: 'Mold quantity', values: ['16 pcs', '16 pcs', '24 pcs', '24 pcs', '32 pcs', '32 pcs', '40 pcs', '64 pcs'] },
          { label: 'Mold rotation motor', values: ['40–50', '40–50', '40–50', '40–55', '40–60', '40–60', '40–60', '40–60'] },
          { label: 'Rated power (kW, 4-pole)', values: ['5–7.5', '7.5–11', '7.5–11', '11–15', '18.5–22', '22–30', '30–37', '45–55'] },
          { label: 'Machine weight (kg)', values: ['70–100', '75–120', '80–130', '100–150', '235', '380', '480', '600'] },
          { label: 'Recommended bearing', values: ['306', '307', '307', '308', '310', '310', '312', '312'] },
        ],
        shared: [{ label: 'Mold arrangement', value: 'Single head' }],
      },
      {
        kind: 'matrix',
        title: 'Production efficiency by material (kg/h)',
        columns: ['360 Type', '400 Type', '420 Type', '500 Type', '600 Type', '750 Type', '850 Type', '1000 Type'],
        rows: [
          { label: 'Freshwater fish', values: ['2000–3000', '1000–1700', '1000–1700', '1000–1700', '3000', '5000', '6000', '7000'] },
          { label: 'Rice', values: ['400–600', '500–750', '800–1000', '1000–1500', '1500–2000', '2000–3000', '3000–4000', '4000–5000'] },
          { label: 'Soybeans', values: ['200–300', '250–400', '250–500', '500–800', '1000–1200', '1500–2000', '2000–2500', '2500–3520'] },
          { label: 'Red beans', values: ['200–300', '250–400', '300–500', '400–700', '1000–1200', '1000–1200', '2000–2500', '2500–3000'] },
          { label: 'Corn', values: ['150–200', '200–300', '200–400', '350–600', '1000–1200', '1000–1500', '2000–2500', '2500–3500'] },
          { label: 'Mung beans', values: ['150–300', '200–300', '200–400', '350–600', '800–1000', '1000–1200', '1000–1500', '1200–2000'] },
        ],
        note: 'Catalogue output figures vary by material and screen. Confirm the required particle size and operating conditions before selection.',
      },
    ],
    specsPending: false,
    selectionNotes: l([
      'Describe the material, its condition and the particle size you want.',
      'State the expected output per hour and the machines you already run.',
      'Tell us your voltage and phase so power can be matched.',
    ]),
  },
  {
    slug: 'stainless-steel-pulverizer-360-1000',
    categorySlug: 'stainless-steel-pulverizers',
    name: l('Stainless Steel Pulverizer, 360 – 1000 Type'),
    summary: l('Stainless contact and build variants across the same eight catalogue sizes.'),
    overview: l([
      'The stainless steel pulverizer sheet lists the same eight model sizes with main and working motor power, mold quantity, rated power and weight.',
      'Which parts are stainless depends on the build you request, so please state your contact-material requirement in the inquiry.',
    ]),
    images: [categories[1].cover, sheet('/images/products/product-2.jpg', 'Product parameters table for the Stainless Steel Pulverizer range, models 360 Type to 1000 Type', 'Model parameter sheet')],
    specs: [
      {
        kind: 'matrix',
        title: 'Model parameters',
        columns: ['360 Type', '400 Type', '420 Type', '500 Type', '600 Type', '750 Type', '850 Type', '1000 Type'],
        rows: [
          { label: 'Overall size (L × W × H, mm)', values: ['610 × 635 × 780', '750 × 780 × 860', '800 × 820 × 860', '860 × 850 × 1100', '850 × 970 × 1100', '950 × 970 × 1100', '900 × 1000 × 1320', '950 × 1250 × 1360'] },
          { label: 'Main motor speed (r/min)', values: ['4000', '4000', '4000', '4000', '3440', '3440', '3200', '3200'] },
          { label: 'Working diameter (mm)', values: ['360', '400', '420', '500', '600', '750', '850', '1000'] },
          { label: 'Mold quantity', values: ['16 pcs', '16 pcs', '24 pcs', '24 pcs', '32 pcs', '32 pcs', '40 pcs', '64 pcs'] },
          { label: 'Mold rotation motor', values: ['40–50', '40–50', '40–50', '40–55', '40–60', '40–60', '40–60', '40–60'] },
          { label: 'Rated power (kW, 4-pole)', values: ['5–7.5', '7.5–11', '7.5–11', '11–15', '18.5–22', '22–30', '30–37', '45–55'] },
          { label: 'Machine weight (kg)', values: ['70–100', '75–120', '80–130', '100–150', '235', '380', '480', '600'] },
          { label: 'Recommended bearing', values: ['306', '307', '307', '308', '310', '310', '312', '312'] },
        ],
        shared: [{ label: 'Mold arrangement', value: 'Single head' }],
      },
      {
        kind: 'matrix',
        title: 'Production efficiency by material (kg/h)',
        columns: ['360 Type', '400 Type', '420 Type', '500 Type', '600 Type', '750 Type', '850 Type', '1000 Type'],
        rows: [
          { label: 'Freshwater fish', values: ['2000–3000', '1000–1700', '1000–1700', '1000–1700', '3000', '5000', '6000', '7000'] },
          { label: 'Rice', values: ['400–600', '500–750', '800–1000', '1000–1500', '1500–2000', '2000–3000', '3000–4000', '4000–5000'] },
          { label: 'Soybeans', values: ['200–300', '250–400', '250–500', '500–800', '1000–1200', '1500–2000', '2000–2500', '2500–3520'] },
          { label: 'Red beans', values: ['200–300', '250–400', '300–500', '400–700', '1000–1200', '1000–1200', '2000–2500', '2500–3000'] },
          { label: 'Corn', values: ['150–200', '200–300', '200–400', '350–600', '1000–1200', '1000–1500', '2000–2500', '2500–3500'] },
          { label: 'Mung beans', values: ['150–300', '200–300', '200–400', '350–600', '800–1000', '1000–1200', '1000–1500', '1200–2000'] },
        ],
        note: 'Catalogue output figures vary by material and screen. Confirm the required particle size and operating conditions before selection.',
      },
    ],
    specsPending: false,
    selectionNotes: l([
      'Say which surfaces must be stainless: contact parts, housing or both.',
      'Describe the material and whether it is food-related.',
      'Provide expected output and your power supply.',
    ]),
  },
  {
    slug: 'wood-crusher-420',
    categorySlug: 'wood-crushers',
    name: l('Wood Crusher, 420 Type'),
    summary: l('Wood and straw crusher with 4 blades and replaceable screening mesh.'),
    overview: l([
      'The 420 Type wood crusher is listed with separate wood and straw inlets, four blades and a three-phase 380 V rated voltage. A diesel model is noted on the sheet.',
      'The screening mesh can be replaced with different sizes according to customer requirements to adjust the fineness of the output. The sheet also compares 420 to 1000 Type.',
    ]),
    images: [categories[2].cover, sheet('/images/products/product-3.jpg', '420 Type wood crusher specification sheet with model comparison from 420 Type to 1000 Type', 'Model parameter sheet')],
    specs: [
      {
        kind: 'pairs',
        title: '420 Type specifications',
        rows: [
          { label: 'Motor power', value: '7.5–15 kW (diesel model: 15–20 HP)' },
          { label: 'Rated voltage', value: 'Three-phase 380 V' },
          { label: 'Main shaft speed', value: 'Approx. 2600 r/min' },
          { label: 'Installation size', value: '120 × 133 × 92 cm' },
          { label: 'Machine weight', value: 'Approx. 152 kg' },
          { label: 'Machine width', value: '24 cm' },
          { label: 'Wood inlet size', value: '21.5 × 24 cm' },
          { label: 'Straw inlet size', value: '46 × 16.5 cm' },
          { label: 'Number of blades', value: '4 pcs' },
          { label: 'Hourly output', value: '0.6–0.9 T/h' },
        ],
      },
      {
        kind: 'matrix',
        title: 'Model comparison',
        columns: ['420 Type', '500 Type', '600 Type', '700 Type', '800 Type', '1000 Type'],
        rows: [
          { label: 'Cutter disc diameter (mm)', values: ['400', '500', '600', '700', '800', '1000'] },
          { label: 'Number of blades (pcs)', values: ['4', '4', '4', '4', '4', '4'] },
          { label: 'Blade length (mm)', values: ['90', '100', '150', '200', '230', '260'] },
          {
            label: 'Inlet size (mm)',
            values: ['160 × 200', '180 × 200', '200 × 200', '200 × 250', '250 × 300', '300 × 400'],
          },
          { label: 'Main shaft speed (r/min)', values: ['2600', '2600', '2600', '2300', '2000', '2000'] },
          { label: 'Recommended power (kW)', values: ['7.5–11', '15', '18.5–22', '22–30', '37–45', '75'] },
          {
            label: 'Output (kg/h)',
            values: ['600–900', '800–1000', '1200–1500', '1800–2000', '2500', '3000–4000'],
          },
        ],
        note: 'Output particle size: the screening mesh can be replaced with different sizes according to customer requirements to adjust the fineness of the output.',
      },
    ],
    specsPending: false,
    selectionNotes: l([
      'Tell us whether you process wood, straw or both, as inlet sizes differ.',
      'Confirm three-phase 380 V or a diesel drive.',
      'State the output fineness so the right screening mesh can be discussed.',
    ]),
  },
  {
    slug: 'stainless-steel-mixer-15-200',
    categorySlug: 'stainless-steel-mixers',
    name: l('Stainless Steel Mixer, 15 – 200 Type'),
    summary: l('Circulating-operation mixer in five hopper sizes from 15 kg to 200 kg.'),
    overview: l([
      'Five mixer sizes are listed, from the 15 Type to the 200 Type. The two smaller sizes run on 220 V and the larger ones on 380 V, per the supplied sheet.',
      'The catalogue notes that data are measured manually and may deviate slightly; please refer to the actual product received.',
    ]),
    images: [categories[3].cover, sheet('/images/products/product-4.jpg', 'Product parameters table for Stainless Steel Mixers, 15 Type to 200 Type', 'Model parameter sheet')],
    specs: [
      {
        kind: 'matrix',
        title: 'Model parameters',
        columns: ['15 Type', '30 Type', '50 Type', '100 Type', '200 Type'],
        rows: [
          { label: 'Operating voltage', values: ['220 V', '220 V', '220 V', '380 V', '380 V'] },
          { label: 'Motor power', values: ['2.2 kW', '2.2 kW', '2.2 kW', '3 kW', '3 kW'] },
          { label: 'Hopper capacity', values: ['15 kg', '30 kg', '50 kg', '100 kg', '200 kg'] },
          { label: 'Hopper diameter', values: ['40 cm', '40 cm', '46 cm', '59 cm', '78 cm'] },
          { label: 'Hopper length', values: ['54 cm', '70 cm', '78 cm', '98 cm', '118 cm'] },
          { label: 'Overall weight', values: ['90 kg', '95 kg', '100 kg', '150 kg', '200 kg'] },
        ],
        shared: [
          { label: 'Operating mode', value: 'Circulating operation' },
          { label: 'Mixing time', value: '5–10 min/batch' },
          {
            label: 'Material description',
            value:
              'Standard version: mixing barrel is 201 stainless steel; lid and frame are iron. Upgraded version: barrel and lid are 201 stainless steel; frame is iron. For custom 304 stainless steel, contact us.',
          },
        ],
        note: 'All data are measured manually and may have slight deviations. Please refer to the actual product received.',
      },
    ],
    specsPending: false,
    selectionNotes: l([
      'Pick the hopper size from your batch weight: 15, 30, 50, 100 or 200 kg.',
      'Confirm 220 V or 380 V supply before choosing a size.',
      'State whether a 201 or custom 304 stainless build is needed.',
    ]),
  },
  {
    slug: 'fiber-filling-machine',
    categorySlug: 'fiber-filling-machines',
    name: l('Fiber Filling Machine'),
    summary: l('Motor-driven fiber filling machine, specifications confirmed per inquiry.'),
    overview: l([
      'The supplied photo shows a motor-driven machine with a white blower housing, a control box with start and stop buttons, a flexible inlet hose and an outlet pipe.',
      'No structured specifications are published for this family yet. Send your fill material and output needs and we will confirm suitability.',
    ]),
    images: [categories[4].cover],
    specs: [],
    specsPending: true,
    selectionNotes: l([
      'Describe the fiber or fill material you want to process.',
      'State the expected output and your voltage and phase.',
      'Attach photos or drawings of your filling target if you have them.',
    ]),
  },
]

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug)
export const getProduct = (slug: string) => products.find((product) => product.slug === slug)
export const getProductsByCategory = (slug: CategorySlug) =>
  products.filter((product) => product.categorySlug === slug)
export const categoryHref = (slug: CategorySlug) => `/products?category=${slug}`
export const productHref = (slug: string) => `/products/${slug}`

export function productName(product: Product, locale?: Locale) {
  return localize(product.name, locale)
}
export function categoryName(category: Category, locale?: Locale) {
  return localize(category.name, locale)
}
