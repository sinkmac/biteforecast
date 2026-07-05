import type { Metadata } from "next";
import Link from "next/link";

import { getGuideArticleTeaser, guideArticles } from "../../src/lib/data/guide-articles";
import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";

const GUIDE_DESCRIPTION =
  "Practical guides to Scottish midge season — when they're worst, where they're worst, and how to survive both. Intercepted from BiteForecast intelligence.";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: { absolute: "THE BAMPOT Field Guide | BiteForecast" },
  description: GUIDE_DESCRIPTION,
  alternates: buildMetadataAlternates("/guide"),
  openGraph: buildOpenGraph({
    title: "THE BAMPOT Field Guide | BiteForecast",
    description: GUIDE_DESCRIPTION,
    url: `${SITE_URL}/guide`,
    type: "website",
  }),
};

export default function GuideIndexPage() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-50">
      <section className="mx-auto flex max-w-5xl flex-col gap-10">
        <header className="max-w-3xl space-y-5">
          <Link className="text-sm text-emerald-300 underline-offset-4 hover:underline" href="/">
            ← Back to today&apos;s forecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            THE BAMPOT Field Guide
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Practical midge intelligence for Scotland
          </h1>
          <p className="text-lg leading-8 text-stone-300">{GUIDE_DESCRIPTION}</p>
          <Link
            className="inline-flex rounded-full border border-emerald-300/60 bg-emerald-400 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-emerald-300"
            href="/"
          >
            Check today&apos;s Midge Activity Index
          </Link>
        </header>

        <div className="grid gap-5 md:grid-cols-2">
          {guideArticles.map((article) => (
            <article
              className="flex flex-col gap-4 rounded-3xl border border-stone-800 bg-stone-900/70 p-6 shadow-xl shadow-black/10"
              key={article.slug}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Field note · Published {new Date(`${article.publishedDate}T00:00:00Z`).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </p>
              <h2 className="text-2xl font-semibold leading-tight text-stone-50">
                <Link className="underline-offset-4 hover:text-emerald-200 hover:underline" href={`/guide/${article.slug}`}>
                  {article.ogTitle}
                </Link>
              </h2>
              <p className="leading-7 text-stone-300">{getGuideArticleTeaser(article)}</p>
              <Link className="mt-auto text-sm font-semibold text-emerald-300 underline-offset-4 hover:underline" href={`/guide/${article.slug}`}>
                Read the guide →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
