import type { Localized } from '@/lib/i18n'

export type NewsArticle = {
  slug: string
  title: Localized
  excerpt: Localized
  publishedAt: string
  body: Localized<string[]>
}

/** Backend-driven after takeover. Intentionally empty: no demo posts are published. */
export const newsArticles: NewsArticle[] = []

export const getArticle = (slug: string) => newsArticles.find((article) => article.slug === slug)
