import type { Metadata } from "next";
import Link from "next/link";

import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";
import { getLocationPageSlugs, getLocationPageBySlug } from "../../lib/seo/location-pages";

export const metadata: Metadata = {
  title: "The Worst Midge Hotspots in Scotland",
  description:
    "From Glencoe to Torridon, a guide to Scotland's highest midge pressure locations, why they feel worse, and how to plan around them.",
  alternates: buildMetadataAlternates("/midge-hotspots"),
  openGraph: buildOpenGraph({
    title: "The Worst Midge Hotspots in Scotland",
    description:
      "From Glencoe to Torridon, a guide to Scotland's highest midge pressure locations, why they feel worse, and how to plan around them.",
    url: `${SITE_URL}/midge-hotspots`,
  }),
};

const locationLookup = Object.fromEntries(
  getLocationPageSlugs()
    .map((slug) => getLocationPageBySlug(slug))
    .filter((page) => page !== undefined)
    .map((page) => [page.slug, page]),
);

const namedHotspots = [
  {
    slug: "glencoe-midges",
    name: "Glencoe",
    note: "A classic sheltered-glen example. Dramatic scenery, wet ground, and evening stillness can combine to create a much harsher experience than the broader regional forecast suggests.",
  },
  {
    slug: "fort-william-midges",
    name: "Fort William",
    note: "The wider area mixes exposed and sheltered terrain, but calm damp pockets around water, woodland edges, and low-lying campsites can feel much worse than passing roadside conditions.",
  },
  {
    slug: "loch-lomond-midges",
    name: "Loch Lomond",
    note: "Loch edges, tree cover, and still summer evenings make this one of the better-known places for nuisance spikes, especially when visitors assume the whole shoreline will behave the same way.",
  },
  {
    slug: "skye-midges",
    name: "Isle of Skye",
    note: "Skye can feel very different from one stop to the next. Exposed, breezier spots can stay manageable, while sheltered damp corners can turn unpleasant quickly.",
  },
  {
    slug: "torridon-midges",
    name: "Torridon",
    note: "Torridon often illustrates the exposed-versus-sheltered split perfectly. Open ground can feel fine, while a tucked-away campsite or lochside pause at dusk can be a different story entirely.",
  },
];

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
            The worst midge hotspots in Scotland
          </h1>
          <p className="max-w-3xl text-lg text-stone-300">
            Midges are rarely about a whole region being uniformly bad. The worst experiences usually come from sheltered, damp, still micro-locations inside otherwise manageable areas, especially in famous Highland destinations where people naturally stop, camp, or linger at the wrong time of day.
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
            <h2 className="text-2xl font-semibold">Five hotspot locations to watch</h2>
            <p className="mt-2 text-stone-300">
              These are the places visitors ask about most often. Each one can feel manageable in the right conditions, but each can also turn difficult quickly when the air settles and the ground stays damp.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {namedHotspots.map((item) => {
              const linkedPage = locationLookup[item.slug];

              return (
                <div
                  key={item.slug}
                  className="rounded-2xl border border-stone-800 bg-stone-900 p-6"
                >
                  <h3 className="text-2xl font-semibold">{item.name}</h3>
                  <p className="mt-3 text-stone-300">{item.note}</p>
                  {linkedPage ? (
                    <Link
                      className="mt-5 inline-flex text-emerald-300 underline-offset-4 hover:underline"
                      href={`/scotland/${linkedPage.slug}`}
                    >
                      Read the {linkedPage.name} guide
                    </Link>
                  ) : null}
                </div>
              );
            })}
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
