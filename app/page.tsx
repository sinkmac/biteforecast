import type { Metadata } from "next";
import Link from "next/link";

import { BiteForecastHomeTool } from "../components/biteforecast-home-tool";
import { FaqSchema } from "../components/faq-block";
import { getMidgeLevelClasses } from "../lib/forecast/midge-index";
import { FORECAST_LOCATIONS } from "../lib/forecast/locations";
import { getHomepageForecastSummaries } from "../lib/forecast/service";
import {
  HOMEPAGE_DESCRIPTION,
  HOMEPAGE_FAQS,
  OPERATIONAL_FACTS,
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../lib/seo/site-metadata";

const homepageApplicationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "BiteForecast",
      url: SITE_URL,
      description: HOMEPAGE_DESCRIPTION,
    },
    {
      "@type": "WebApplication",
      name: "BiteForecast live midge forecast",
      url: SITE_URL,
      description: HOMEPAGE_DESCRIPTION,
      applicationCategory: "WeatherApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    },
    {
      "@type": "Organization",
      name: "AI Scotland Productions",
      url: "https://aiscotlandproductions.com",
    },
  ],
};

const DEFAULT_SEASONAL_FALLBACK = {
  1: "Low",
  2: "Low",
  3: "Low",
  4: "Guarded",
  5: "Moderate",
  6: "High",
  7: "High",
  8: "High",
  9: "Moderate",
  10: "Guarded",
  11: "Low",
  12: "Low",
} as const;

const locationCards = FORECAST_LOCATIONS.map((location) => ({
  ...location,
  region: location.midgeSeason,
  broaderArea: location.description,
  coordinates: { latitude: location.lat, longitude: location.lng },
  seasonalFallbackByMonth: DEFAULT_SEASONAL_FALLBACK,
  planningRiskBand: "Moderate" as const,
  planningTakeaway: location.description,
}));

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageApplicationSchema) }} />
      <FaqSchema faqs={HOMEPAGE_FAQS} />
      <main className="bg-stone-950 text-stone-50">
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="rounded-[2rem] border border-emerald-400/20 bg-stone-900/90 p-5 shadow-2xl shadow-black/20 sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Live Midge Forecast</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Live Midge Forecast</h1>
            <p className="mt-3 max-w-3xl text-stone-300">
              {`Updated ${OPERATIONAL_FACTS.updateCadenceLabel}. Click any location to see current conditions.`}
              {' '}<a href="https://cool.biteforecast.scot" className="text-emerald-300 underline hover:text-emerald-200">Readings from the instrument room →</a>
            </p>
            <blockquote className="mt-4 border-l-2 border-emerald-400/50 pl-4 text-lg italic text-stone-400">
              {`"The best defence against insects short of a rolled up newspaper."`}
            </blockquote>
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
