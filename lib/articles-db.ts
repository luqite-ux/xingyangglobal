import { getSupabaseClient, getTenantId } from '@/lib/supabase'
import type { NewsArticle } from '@/lib/news'

type ArticleRow = { slug: string; title?: string | null; title_i18n?: Record<string, string> | null; excerpt?: string | null; excerpt_i18n?: Record<string, string> | null; content?: string | null; content_i18n?: Record<string, string> | null; published_at?: string | null; created_at?: string | null }
const toArticle = (row: ArticleRow): NewsArticle => ({ slug: row.slug, title: { en: row.title_i18n?.en || row.title || '' }, excerpt: { en: row.excerpt_i18n?.en || row.excerpt || '' }, publishedAt: row.published_at || row.created_at || '', body: { en: (row.content_i18n?.en || row.content || '').split(/\n\s*\n/).filter(Boolean) } })

export async function getPublishedArticles(): Promise<NewsArticle[]> {
  const db = getSupabaseClient(); const tenantId = getTenantId()
  if (!db || !tenantId) return []
  const { data, error } = await db.from('articles').select('slug,title,title_i18n,excerpt,excerpt_i18n,content,content_i18n,published_at,created_at').eq('tenant_id', tenantId).eq('is_published', true).order('published_at', { ascending: false })
  return error ? [] : (data as ArticleRow[]).map(toArticle)
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const articles = await getPublishedArticles()
  return articles.find((article) => article.slug === slug) ?? null
}
