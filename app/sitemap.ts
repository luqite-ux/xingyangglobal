import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'
import { products } from '@/lib/products'
import { applications } from '@/lib/applications'

const staticPaths = ['/', '/products', '/applications', '/manufacturing', '/about', '/news', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticPaths,
    ...products.map((product) => `/products/${product.slug}`),
    ...applications.map((application) => `/applications/${application.slug}`),
  ].map((path) => ({ url: `${site.url}${path === '/' ? '' : path}` }))
}
