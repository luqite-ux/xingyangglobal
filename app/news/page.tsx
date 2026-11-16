import type { Metadata } from 'next'
import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import { buildMetadata } from '@/lib/metadata'
import { getPublishedArticles } from '@/lib/articles-db'
import { localize } from '@/lib/i18n'
import { PageHero } from '@/components/site/page-hero'
import { Section } from '@/components/site/section'
import { Reveal } from '@/components/site/reveal'
import { ButtonLink } from '@/components/site/button-link'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

export const metadata: Metadata = buildMetadata({
  title: 'News',
  description: 'Company and product news from Xingyang. Published articles will appear here.',
  path: '/news',
})

export const revalidate = 60

export default async function NewsPage() {
  const newsArticles = await getPublishedArticles()
  return (
    <>
      <PageHero
        eyebrow="News"
        title="News"
        intro="Company and product updates will be published here."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'News' }]}
      />
      <Section id="articles" labelledBy="articles-title" className="!border-t-0">
        <h2 id="articles-title" className="sr-only">
          Published articles
        </h2>
        {newsArticles.length ? (
          <ul className="grid border-t border-ink/20">
            {newsArticles.map((article, index) => (
              <Reveal as="li" key={article.slug} delay={index} className="border-b border-ink/10">
                <Link href={`/news/${article.slug}`} className="block py-6 hover:text-ember-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember">
                  <time dateTime={article.publishedAt} className="eyebrow !text-[0.68rem]">
                    {article.publishedAt}
                  </time>
                  <span className="mt-2 block font-display text-2xl font-semibold">{localize(article.title)}</span>
                  <span className="mt-1 block text-muted-foreground">{localize(article.excerpt)}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        ) : (
          <Reveal>
            <Empty className="border border-dashed border-ink/25 bg-paper-deep/50">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Newspaper aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle>No articles published yet</EmptyTitle>
                <EmptyDescription>
                  We have not published any news. In the meantime, browse the catalogue or send us your material and output requirements.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="flex-row justify-center gap-3">
                <ButtonLink href="/products">Browse products</ButtonLink>
                <ButtonLink href="/contact" variant="secondary">
                  Contact us
                </ButtonLink>
              </EmptyContent>
            </Empty>
          </Reveal>
        )}
      </Section>
    </>
  )
}
