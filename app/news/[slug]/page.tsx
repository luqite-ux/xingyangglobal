import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { getPublishedArticles, getArticleBySlug } from '@/lib/articles-db'
import { localize } from '@/lib/i18n'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/section'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const articles = await getPublishedArticles()
  return articles.map((article) => ({ slug: article.slug }))
}
export const dynamicParams = true
export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}
  return buildMetadata({ title: localize(article.title), description: localize(article.excerpt), path: `/news/${article.slug}` })
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <>
      <PageHero
        eyebrow={article.publishedAt}
        title={localize(article.title)}
        intro={localize(article.excerpt)}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: localize(article.title) }]}
      />
      <Section id="article" labelledBy="article-body" className="!border-t-0">
        <h2 id="article-body" className="sr-only">
          Article
        </h2>
        <div className="mx-auto grid max-w-2xl gap-5 text-lg leading-relaxed">
          {localize(article.body).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Section>
    </>
  )
}
