import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FaqSchema, FaqSection } from "../../../components/faq-block";
import { ForecastCalendar } from "../../../components/forecast-calendar";
import { buildSevenDayForecast } from "../../../lib/calculator/forecast";
import { fetchOpenMeteoSevenDayForecast } from "../../../lib/providers/open-meteo";
import { getBandAdvice } from "../../../lib/scoring/bands";
import {
  LOCATION_META_DESCRIPTIONS,
  SITE_URL,
  buildOpenGraph,
} from "../../../lib/seo/site-metadata";
import {
  getLocationPageBySlug,
  getLocationPageSlugs,
} from "../../../lib/seo/location-pages";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const revalidate = 1800;

export async function generateStaticParams() {
  return getLocationPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocationPageBySlug(slug);

  if (!page) {
    return {
      title: "Location not found",
    };
  }

  const description =
    LOCATION_META_DESCRIPTIONS[slug] ??
    `Planning a trip to ${page.name}? Learn the typical midge patterns, terrain effects, and when to check current conditions before you go.`;

  return {
    title: `Midges in ${page.name}: seasonal patterns, best times, and what to expect`,
    description,
    openGraph: buildOpenGraph({
      title: `Midges in ${page.name}: seasonal patterns, best times, and what to expect`,
      description,
      url: `${SITE_URL}/scotland/${slug}`,
      type: "article",
    }),
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLocationPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const bandAdvice = getBandAdvice(page.planningRiskBand);
  const sevenDaySnapshots = await fetchOpenMeteoSevenDayForecast({
    location: page,
    currentDate: new Date(),
    preset: "sunset",
  });
  const sevenDayForecast = sevenDaySnapshots
    ? buildSevenDayForecast({
        location: page,
        currentDate: new Date(),
        snapshots: sevenDaySnapshots,
      })
    : [];

  return (
    <>
      <FaqSchema faqs={page.faqs} />
      <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-50">
        <article className="mx-auto flex max-w-4xl flex-col gap-10">
        <header className="space-y-4">
          <Link className="text-sm text-emerald-300 underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Scotland / {page.name}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Midges in {page.name}: seasonal patterns, best times, and what to expect
          </h1>
          <p className="max-w-3xl text-lg text-stone-300">{page.intro}</p>
        </header>

        <section className="rounded-2xl border border-amber-300/25 bg-amber-500/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
            Planning baseline
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-2xl font-semibold">{page.planningRiskBand}</p>
            <p className="text-sm text-amber-100/80">Planning page only — not a live conditions report</p>
          </div>
          <p className="mt-3 max-w-2xl text-stone-100">{bandAdvice}</p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-2xl font-semibold">Seasonal pattern summary</h2>
            <div className="mt-4 space-y-3 text-stone-300">
              {page.seasonalSummary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-2xl font-semibold">Terrain and microclimate note</h2>
            <div className="mt-4 space-y-3 text-stone-300">
              {page.terrainNote.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Best and worst times in {page.name}</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-700 text-stone-400">
                  <th className="pb-3 pr-4">Month / period</th>
                  <th className="pb-3 pr-4">Often better</th>
                  <th className="pb-3 pr-4">Often worse</th>
                  <th className="pb-3">Terrain note</th>
                </tr>
              </thead>
              <tbody>
                {page.timePatterns.map((pattern) => (
                  <tr key={pattern.label} className="border-b border-stone-800 align-top">
                    <td className="py-4 pr-4 font-medium text-stone-100">{pattern.label}</td>
                    <td className="py-4 pr-4 text-stone-300">{pattern.typicallyBetter}</td>
                    <td className="py-4 pr-4 text-stone-300">{pattern.typicallyWorse}</td>
                    <td className="py-4 text-stone-300">{pattern.terrainNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-stone-950/70 p-4">
              <p className="font-medium text-stone-100">Best overall windows</p>
              <p className="mt-2 text-stone-300">{page.bestWindowsSummary}</p>
            </div>
            <div className="rounded-xl bg-stone-950/70 p-4">
              <p className="font-medium text-stone-100">Worst overall windows</p>
              <p className="mt-2 text-stone-300">{page.worstWindowsSummary}</p>
            </div>
            <div className="rounded-xl bg-stone-950/70 p-4">
              <p className="font-medium text-stone-100">Calmer experience tip</p>
              <p className="mt-2 text-stone-300">{page.calmerExperienceTip}</p>
            </div>
            <div className="rounded-xl bg-stone-950/70 p-4">
              <p className="font-medium text-stone-100">Camping note</p>
              <p className="mt-2 text-stone-300">{page.campingTip}</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
            Live calculator CTA
          </p>
          <h2 className="mt-3 text-2xl font-semibold">Check live conditions before you go</h2>
          <p className="mt-3 max-w-3xl text-stone-100/90">
            This page covers typical local patterns only. Use the live Midge Wind-Watch calculator for current conditions, short-term planning, and day-of decisions.
          </p>
          <Link
            className="mt-5 inline-flex rounded-full bg-emerald-300 px-5 py-3 font-medium text-stone-950 transition hover:bg-emerald-200"
            href={page.liveCalculatorHref}
          >
            Check live midge conditions for {page.name}
          </Link>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Useful midge kit for {page.name}</h2>
          <p className="mt-3 text-stone-300">
            Keep this modest and practical. For planning-intent pages like this one, treat a moderate-risk baseline as the default: repellent, a head net, and a lightweight layer usually matter more than piling on products.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-300">
            <li>Repellent for sheltered stops and evening pauses</li>
            <li>Head net for still, humid periods in summer</li>
            <li>Lightweight long-sleeve layer or buff for exposed skin</li>
          </ul>
        </section>

        <ForecastCalendar
          days={sevenDayForecast}
          intro={`This 7-day forecast runs the live midge scoring engine against predicted conditions for ${page.name}, so you can compare likely day-by-day nuisance before you travel.`}
          title={`7-day forecast for ${page.name}`}
        />

        <FaqSection faqs={page.faqs} />
      </article>
      </main>
    </>
  );
}
