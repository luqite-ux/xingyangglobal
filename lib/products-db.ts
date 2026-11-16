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

type DocumentDefinition = { caption: string; width?: number; height?: number }

const documentDefinitions: Record<string, DocumentDefinition[]> = {
  'multi-function-pulverizer-360-1000': [
    { caption: 'Model parameters' },
    { caption: 'Production efficiency' },
    { caption: 'Grinding effect display' },
    { caption: 'Operating instructions' },
    { caption: 'Important notice' },
    { caption: 'Suitable materials' },
  ],
  'stainless-steel-pulverizer-360-1000': [
    { caption: 'Product details 1' },
    { caption: 'Product details 2' },
    { caption: 'Product details 3' },
    { caption: 'Product details 4' },
  ],
  'wood-crusher-420': [
    { caption: 'Model parameters' },
    { caption: 'Product instructions 1' },
    { caption: 'Product instructions 2' },
    { caption: 'Crushing effect' },
    { caption: 'Application range 1', width: 790, height: 808 },
    { caption: 'Application range 2', width: 790, height: 699 },
  ],
  'stainless-steel-mixer-15-200': [
    { caption: 'Model parameters' },
    { caption: 'Product uses' },
    { caption: 'Customized model' },
    { caption: 'Functional features' },
    { caption: 'Application range' },
  ],
  'fiber-filling-machine': [],
}

function overlay(row: ProductRow): Product | null {
  const fallback = fallbackProducts.find((product) => product.slug === row.slug)
  if (!fallback) return null
  const databaseUrls = row.extra_data?.images?.filter(Boolean) ?? (row.image_url ? [row.image_url] : [])
  const definitions = documentDefinitions[row.slug] ?? []
  const documentUrls = databaseUrls.slice(0, definitions.length)
  const photoUrls = databaseUrls.slice(definitions.length)
  // Use the complete customer photo sequence when it exists. The local cover is only
  // a fallback; prepending it would duplicate the first customer product photograph.
  const urls = (photoUrls.length ? photoUrls : fallback.images.map((image) => image.src)).filter(
    (src, index, all): src is string => Boolean(src) && all.indexOf(src) === index,
  )
  const images: ProductImage[] = urls.length
    ? urls.map((src, index) => ({ src, alt: `${row.name_i18n?.en || row.name || fallback.name.en} — image ${index + 1}`, kind: 'photo', caption: index === 0 ? 'Product image' : `Gallery image ${index + 1}` }))
    : fallback.images
  const documents: ProductImage[] = documentUrls.length
    ? documentUrls.map((src, index) => ({
        src,
        alt: `${row.name_i18n?.en || row.name || fallback.name.en} — ${definitions[index].caption}`,
        kind: 'sheet',
        caption: definitions[index].caption,
        width: definitions[index].width ?? 2000,
        height: definitions[index].height ?? 2000,
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
