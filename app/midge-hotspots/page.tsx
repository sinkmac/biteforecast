import type { Metadata } from "next";
import Link from "next/link";

import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";
import { getLocationPageSlugs, getLocationPageBySlug } from "../../lib/seo/location-pages";

export const metadata: Metadata = {
  title: "Scottish midge hotspots",
  description:
    "Common Scottish midge hotspots, why they feel worse, and where BiteForecast already has matching location guides.",
  alternates: buildMetadataAlternates("/midge-hotspots"),
  openGraph: buildOpenGraph({
    title: "Scottish midge hotspots",
    description:
      "Common Scottish midge hotspots, why they feel worse, and where BiteForecast already has matching location guides.",
    url: `${SITE_URL}/midge-hotspots`,
  }),
};

const linkedHotspots = getLocationPageSlugs()
  .map((slug) => getLocationPageBySlug(slug))
  .filter((page) => page !== undefined);

const extraHotspots = [
  {
    name: "Wester Ross lochside stops",
    note: "Beautiful, often damp, and frequently sheltered enough for nuisance to spike during still evenings.",
  },
  {
    name: "Argyll woodland edges",
    note: "Calm damp tree cover can feel much worse than nearby open roads or exposed viewpoints.",
  },
  {
    name: "Campsites near burns and standing water",
    note: "Even when the broader region looks manageable, sheltered pitches near water can feel very different after rain or at dusk.",
  },
];

export default function MidgeHotspotsPage() {
  return (
    <main className="bg-stone-950 px-6 py-16 text-stone-50">
      <article className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="space-y-4">
          <Link className="text-sm text-emerald-300 underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Hotspots
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Scottish midge hotspots to treat carefully
          </h1>
          <p className="max-w-3xl text-lg text-stone-300">
            Midges are rarely about a whole region being uniformly bad. The worst experiences usually come from sheltered, damp, still micro-locations inside otherwise manageable areas.
          </p>
        </header>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">What usually makes a hotspot</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-300">
            <li>Little wind at ground level</li>
            <li>Damp grass, peat, loch edges, burns, or boggy ground</li>
            <li>Shelter from trees, glens, banks, tents, vans, or buildings</li>
            <li>Mild humid air, especially later in the day</li>
          </ul>
        </section>

        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold">Hotspots with BiteForecast guides</h2>
            <p className="mt-2 text-stone-300">
              These places already have matching planning pages you can use for broader seasonal context, terrain notes, and a route into the live calculator.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {linkedHotspots.map((page) => (
              <Link
                key={page.slug}
                className="rounded-2xl border border-stone-800 bg-stone-900 p-6 transition hover:border-emerald-400/40 hover:bg-stone-800"
                href={`/scotland/${page.slug}`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  {page.region}
                </p>
                <h3 className="mt-3 text-2xl font-semibold">{page.name}</h3>
                <p className="mt-3 text-stone-300">{page.planningTakeaway}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Other patterns worth watching</h2>
          <div className="mt-4 space-y-4 text-stone-300">
            {extraHotspots.map((item) => (
              <div key={item.name} className="rounded-xl bg-stone-950/70 p-4">
                <p className="font-medium text-stone-100">{item.name}</p>
                <p className="mt-2">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6">
          <h2 className="text-2xl font-semibold">Quick rule of thumb</h2>
          <p className="mt-4 text-stone-100/90">
            If a spot is sheltered, damp, and calm, assume it can feel worse than the regional headline. When you have a choice, stop on more exposed ground first and keep the <Link className="text-emerald-200 underline-offset-4 hover:underline" href="/midge-wind-watch">live calculator</Link> for the final decision.
          </p>
        </section>
      </article>
    </main>
  );
}
