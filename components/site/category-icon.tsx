import { Blend, Cog, Layers, TreePine, Wind, type LucideIcon } from 'lucide-react'
import type { CategorySlug } from '@/lib/products'

const icons: Record<CategorySlug, LucideIcon> = {
  'multi-function-pulverizers': Cog,
  'stainless-steel-pulverizers': Layers,
  'wood-crushers': TreePine,
  'stainless-steel-mixers': Blend,
  'fiber-filling-machines': Wind,
}

export function CategoryIcon({ slug, className }: { slug: CategorySlug; className?: string }) {
  const Icon = icons[slug]
  return <Icon className={className} aria-hidden="true" strokeWidth={1.6} />
}
