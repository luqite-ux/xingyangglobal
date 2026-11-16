import { CookingPot, Trees, Wheat, type LucideIcon } from 'lucide-react'
import type { ApplicationSlug } from '@/lib/products'

const icons: Record<ApplicationSlug, LucideIcon> = {
  agriculture: Wheat,
  forestry: Trees,
  'food-processing': CookingPot,
}

export function ApplicationIcon({ slug, className }: { slug: ApplicationSlug; className?: string }) {
  const Icon = icons[slug]
  return <Icon className={className} strokeWidth={1.4} aria-hidden="true" />
}
