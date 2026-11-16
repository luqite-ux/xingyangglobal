import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/metadata'
import { getPublishedArticles, getArticleBySlug } from '@/lib/articles-db'
import { localize } from '@/lib/i18n'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/section'
import { JsonLd } from '@/components/seo/json-ld'
import { site } from '@/lib/site'

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
      <JsonLd data={[
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          '@id': `${site.url}/news/${article.slug}#article`,
          headline: localize(article.title),
          description: localize(article.excerpt),
          datePublished: article.publishedAt,
          dateModified: article.publishedAt,
          mainEntityOfPage: `${site.url}/news/${article.slug}`,
          publisher: { '@id': `${site.url}/#organization` },
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
            { '@type': 'ListItem', position: 2, name: 'News', item: `${site.url}/news` },
            { '@type': 'ListItem', position: 3, name: localize(article.title), item: `${site.url}/news/${article.slug}` },
          ],
        },
      ]} />
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
