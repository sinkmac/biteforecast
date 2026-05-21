import type { Metadata } from "next";
import Link from "next/link";

import { BiteForecastHomeTool } from "../components/biteforecast-home-tool";
import { FaqSchema } from "../components/faq-block";
import { getMidgeLevelClasses } from "../lib/forecast/midge-index";
import { getHomepageForecastSummaries } from "../lib/forecast/service";
import {
  HOMEPAGE_DESCRIPTION,
  HOMEPAGE_FAQS,
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../lib/seo/site-metadata";
import {
  getLocationPageBySlug,
  getLocationPageSlugs,
} from "../lib/seo/location-pages";

const locationCards = getLocationPageSlugs()
  .map((slug) => getLocationPageBySlug(slug))
  .filter((page) => page !== undefined);

export const metadata: Metadata = {
  title: "Will there be midges where I'm going?",
  description: HOMEPAGE_DESCRIPTION,
  alternates: buildMetadataAlternates("/"),
  openGraph: buildOpenGraph({
    title: "Will there be midges where I'm going?",
    description: HOMEPAGE_DESCRIPTION,
    url: SITE_URL,
  }),
};

export const revalidate = 10800;

export default async function Home() {
  const forecastSummaries = await getHomepageForecastSummaries();

  return (
    <>
      <FaqSchema faqs={HOMEPAGE_FAQS} />
      <main className="bg-stone-950 text-stone-50">
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-stone-900/90 p-5 shadow-2xl shadow-black/20 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Live Midge Forecast</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Live Midge Forecast</h1>
            <p className="mt-3 max-w-3xl text-stone-300">
              Updated every 3 hours. Click any location to see current conditions.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {forecastSummaries.map((summary) => (
                <Link
                  className={`rounded-2xl border p-4 transition hover:scale-[1.01] ${getMidgeLevelClasses(summary.index)}`}
                  href={`/forecast/${summary.location.slug}`}
                  key={summary.location.slug}
                >
                  <p className="text-sm font-bold">{summary.location.name}</p>
                  <p className="mt-3 text-5xl font-black leading-none">{summary.index}</p>
                  <p className="mt-2 text-sm font-black uppercase tracking-[0.14em]">{summary.label}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <BiteForecastHomeTool locations={locationCards} />
      </main>
    </>
  );
}
