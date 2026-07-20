import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getGuideArticle, guideArticles } from "../../../src/lib/data/guide-articles";
import { markdownToHtml } from "../../../lib/guide/markdown";
import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../../lib/seo/site-metadata";

export const dynamic = "force-static";

type GuideArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guideArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: GuideArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: { absolute: article.title },
    description: article.metaDescription,
    alternates: buildMetadataAlternates(`/guide/${article.slug}`),
    openGraph: {
      ...buildOpenGraph({
        title: article.ogTitle,
        description: article.metaDescription,
        url: `${SITE_URL}/guide/${article.slug}`,
        type: "article",
      }),
      publishedTime: article.publishedDate,
    },
  };
}

export default async function GuideArticlePage({ params }: GuideArticlePageProps) {
  const { slug } = await params;
  const article = getGuideArticle(slug);

  if (!article) {
    notFound();
  }

  const publishedLabel = new Date(`${article.publishedDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <main className="min-h-screen px-6 py-16">
      <article className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="space-y-5">
          <Link className="text-sm text-almanac-green underline-offset-4 hover:underline" href="/guide">
            ← Back to Field Guide
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-almanac-green">
            THE BAMPOT Field Guide
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{article.ogTitle}</h1>
          <p className="text-sm text-almanac-muted">Published {publishedLabel}</p>
        </header>

        <div
          className="guide-article-body space-y-6"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }}
        />

        {article.slug === "midge-forecast-vs-weather-forecast-scotland" ? (
          <section className="rounded-3xl border border-almanac-border bg-almanac-card p-6">
            <h2 className="text-2xl font-semibold">Weather tells you what to wear. BiteForecast tells you when to stop.</h2>
            <p className="mt-3 leading-7 text-stone-200">
              Check today&apos;s Midge Activity Index before choosing your glen, campsite, lunch stop, or evening descent.
            </p>
            <Link
              className="mt-5 inline-flex rounded-full border border-almanac-green bg-almanac-green px-5 py-3 text-sm font-semibold text-almanac-card transition hover:bg-almanac-green"
              href="/"
            >
              Check today&apos;s forecast
            </Link>
          </section>
        ) : null}

        <nav className="flex flex-col gap-3 border-t border-stone-800 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link className="text-almanac-green underline-offset-4 hover:underline" href="/guide">
            ← Back to Field Guide
          </Link>
          <Link
            className="inline-flex rounded-full border border-almanac-green px-5 py-3 text-sm font-semibold text-almanac-green transition hover:bg-almanac-green hover:text-almanac-ink"
            href="/"
          >
            Check today&apos;s forecast
          </Link>
        </nav>
      </article>
    </main>
  );
}
