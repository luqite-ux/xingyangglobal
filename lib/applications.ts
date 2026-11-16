import { l, type Localized } from '@/lib/i18n'
import type { ApplicationSlug, CategorySlug } from '@/lib/products'

export type Application = {
  slug: ApplicationSlug
  name: Localized
  summary: Localized
  materials: Localized
  focus: Localized
  confirm: Localized<string[]>
  families: CategorySlug[]
}

export const applications: Application[] = [
  {
    slug: 'agriculture',
    name: l('Agriculture'),
    summary: l('Grinding, crushing and mixing for farm and crop-derived materials.'),
    materials: l('Straw, crop residue and grain-type materials you describe in your inquiry.'),
    focus: l('Size reduction to a target fineness, and batch blending of dry materials.'),
    confirm: l(['Material type and condition', 'Target particle size', 'Output per hour', 'Voltage and phase']),
    families: ['multi-function-pulverizers', 'wood-crushers', 'stainless-steel-mixers'],
  },
  {
    slug: 'forestry',
    name: l('Forestry'),
    summary: l('Crushing wood pieces and straw-type fibers into a smaller, handleable size.'),
    materials: l('Wood pieces, branches and offcuts, with dimensions you provide.'),
    focus: l('Feeding size, blade configuration and screening mesh for output fineness.'),
    confirm: l(['Wood or straw inlet size', 'Largest piece to feed', 'Output fineness', 'Electric or diesel drive']),
    families: ['wood-crushers', 'multi-function-pulverizers'],
  },
  {
    slug: 'food-processing',
    name: l('Food Processing'),
    summary: l('Stainless contact options for grinding and batch mixing of dry ingredients.'),
    materials: l('Dry food ingredients and powders, described with their contact requirements.'),
    focus: l('Contact-material choice, batch size and consistent mixing per batch.'),
    confirm: l(['Contact-material requirement', 'Batch weight', 'Target fineness', 'Local voltage']),
    families: ['stainless-steel-pulverizers', 'stainless-steel-mixers'],
  },
]

export const getApplication = (slug: string) => applications.find((application) => application.slug === slug)
export const applicationHref = (slug: ApplicationSlug) => `/applications/${slug}`
