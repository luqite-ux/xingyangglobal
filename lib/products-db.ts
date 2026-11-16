import { getSupabaseClient, getTenantId } from '@/lib/supabase'
import { products as fallbackProducts, type Product, type ProductImage, type SpecGroup } from '@/lib/products'

type ProductRow = {
  slug: string
  name_i18n?: Record<string, string> | null
  name?: string | null
  description_i18n?: Record<string, string> | null
  description?: string | null
  overview_i18n?: Record<string, string> | null
  overview?: string | null
  image_url?: string | null
  features_i18n?: Record<string, string[]> | null
  features?: string[] | null
  specs?: { groups?: SpecGroup[] } | null
  extra_data?: { images?: string[]; specs_pending?: boolean } | null
}

const documentLabels: Record<string, string[]> = {
  'multi-function-pulverizer-360-1000': [
    'Model parameters',
    'Production efficiency',
    'Grinding effect display',
    'Operating instructions',
    'Important notice',
    'Suitable materials',
  ],
  'stainless-steel-pulverizer-360-1000': [
    'Technical reference 1',
    'Technical reference 2',
    'Technical reference 3',
    'Technical reference 4',
  ],
  'wood-crusher-420': [
    'Model parameters',
    'Crushing effect',
    'Application range 1',
    'Application range 2',
    'Product instructions 1',
    'Product instructions 2',
  ],
  'stainless-steel-mixer-15-200': [
    'Model parameters',
    'Product uses',
    'Customized model',
    'Functional features',
    'Application range',
  ],
  'fiber-filling-machine': [],
}

function overlay(row: ProductRow): Product | null {
  const fallback = fallbackProducts.find((product) => product.slug === row.slug)
  if (!fallback) return null
  const databaseUrls = row.extra_data?.images?.filter(Boolean) ?? (row.image_url ? [row.image_url] : [])
  const labels = documentLabels[row.slug] ?? []
  const documentUrls = databaseUrls.slice(0, labels.length)
  const photoUrls = databaseUrls.slice(labels.length)
  // Keep a clear machine photograph as the lead image. Catalogue sheets remain in the
  // gallery for reference, but database upload order must not turn one into the cover.
  const urls = [fallback.images[0]?.src, ...photoUrls].filter(
    (src, index, all): src is string => Boolean(src) && all.indexOf(src) === index,
  )
  const images: ProductImage[] = urls.length
    ? urls.map((src, index) => ({ src, alt: `${row.name_i18n?.en || row.name || fallback.name.en} — image ${index + 1}`, kind: 'photo', caption: index === 0 ? 'Product image' : `Gallery image ${index + 1}` }))
    : fallback.images
  const documents: ProductImage[] = documentUrls.length
    ? documentUrls.map((src, index) => ({
        src,
        alt: `${row.name_i18n?.en || row.name || fallback.name.en} — ${labels[index]}`,
        kind: 'sheet',
        caption: labels[index],
      }))
    : fallback.documents
  const overview = (row.overview_i18n?.en || row.overview)
    ?.replace(/The supplied sheet lists/gi, 'The specification table lists')
    .replace(/the supplied sheet/gi, 'the specification table')
    .replace(/the supplied photo/gi, 'the product photo')
  return {
    ...fallback,
    name: { en: row.name_i18n?.en || row.name || fallback.name.en },
    summary: { en: row.description_i18n?.en || row.description || fallback.summary.en },
    overview: { en: overview ? overview.split(/\n\s*\n/).filter(Boolean) : fallback.overview.en },
    images,
    documents,
    selectionNotes: { en: row.features_i18n?.en || row.features || fallback.selectionNotes.en },
    specs: row.specs?.groups?.length ? row.specs.groups : fallback.specs,
    specsPending: row.extra_data?.specs_pending ?? fallback.specsPending,
  }
}

export async function getProducts(): Promise<Product[]> {
  const db = getSupabaseClient(); const tenantId = getTenantId()
  if (!db || !tenantId) return fallbackProducts
  const { data, error } = await db.from('products').select('slug,name,name_i18n,description,description_i18n,overview,overview_i18n,image_url,features,features_i18n,specs,extra_data').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order')
  if (error || !data?.length) return fallbackProducts
  return (data as ProductRow[]).map(overlay).filter((product): product is Product => Boolean(product))
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts()
  return products.find((product) => product.slug === slug) ?? null
}
