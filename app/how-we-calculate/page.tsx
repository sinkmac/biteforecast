import type { Metadata } from "next";
import Link from "next/link";

import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";

export const metadata: Metadata = {
  title: "How we calculate midge risk",
  description:
    "A plain-English guide to the BiteForecast scoring approach, including weather inputs, terrain limits, and fallback behaviour.",
  alternates: buildMetadataAlternates("/how-we-calculate"),
  openGraph: buildOpenGraph({
    title: "How we calculate midge risk",
    description:
      "A plain-English guide to the BiteForecast scoring approach, including weather inputs, terrain limits, and fallback behaviour.",
    url: `${SITE_URL}/how-we-calculate`,
  }),
};

const inputs = [
  {
    title: "Wind speed",
    body: "Moving air is the strongest suppressor in the model. When the air is breezy, midges usually struggle more than they do in calm sheltered spots.",
  },
  {
    title: "Humidity and dampness",
    body: "Mild, humid conditions usually make nuisance more likely, especially around lochs, burns, boggy ground, woodland edges, and other sheltered damp areas.",
  },
  {
    title: "Temperature",
    body: "Temperature helps shape how active conditions are likely to feel, but it is not treated in isolation. Warmth without shelter and humidity does not automatically mean a bad experience.",
  },
  {
    title: "Time of day",
    body: "Evening and dusk matter because nuisance often becomes more noticeable as the air settles. That is why calmer sunset windows can score worse than a breezier daytime stop.",
  },
];

export default function HowWeCalculatePage() {
  return (
    <main className="bg-stone-950 px-6 py-16 text-stone-50">
      <article className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-4">
          <Link className="text-sm text-emerald-300 underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Method
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            How BiteForecast calculates midge risk
          </h1>
          <p className="max-w-3xl text-lg text-stone-300">
            BiteForecast uses weather-backed signals and place-based judgement to create a practical nuisance estimate, not a scientific certainty score.
          </p>
        </header>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">The short version</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              The calculator gives the most weight to the conditions that tend to matter most in practice: wind, humidity, temperature, and timing.
            </p>
            <p>
              It is designed to answer a user-friendly question: how likely is this stop or trip window to feel manageable, annoying, or unpleasant for a typical visitor?
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {inputs.map((input) => (
            <div key={input.title} className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
              <h2 className="text-2xl font-semibold">{input.title}</h2>
              <p className="mt-4 text-stone-300">{input.body}</p>
            </div>
          ))}
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Planning pages versus live pages</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              Destination guides on BiteForecast are planning pages. They summarise recurring seasonal patterns, terrain effects, and typical better or worse windows for a place.
            </p>
            <p>
              The live calculator is different. It uses current or forecast weather data to produce a more immediate day-of estimate for a specific location and time window.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-300/25 bg-amber-500/10 p-6">
          <h2 className="text-2xl font-semibold">Important limits</h2>
          <div className="mt-4 space-y-3 text-stone-100/90">
            <p>
              No public model can fully capture every sheltered verge, campsite edge, woodland pocket, or lochside hollow. Real conditions can change fast and can differ sharply over short distances.
            </p>
            <p>
              BiteForecast is best used as a practical decision aid, alongside your own judgement about terrain, exposure, recent rainfall, and how long you expect to stop outdoors.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">What happens when live weather data is missing</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              If a live feed is unavailable, BiteForecast falls back to a seasonal estimate for that place and time of year. It does not pretend missing live data is real-time certainty.
            </p>
            <p>
              That fallback is intentionally more conservative and should be treated as planning guidance rather than a precise current reading.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
