import type { Metadata } from "next";
import Link from "next/link";

import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";

export const metadata: Metadata = {
  title: "How We Calculate the Midge Forecast",
  description:
    "The BiteForecast midge risk score uses five weather variables, including wind, temperature, humidity, cloud cover, and season, weighted by their influence on Highland midge activity.",
  alternates: buildMetadataAlternates("/how-we-calculate"),
  openGraph: buildOpenGraph({
    title: "How We Calculate the Midge Forecast",
    description:
      "The BiteForecast midge risk score uses five weather variables, including wind, temperature, humidity, cloud cover, and season, weighted by their influence on Highland midge activity.",
    url: `${SITE_URL}/how-we-calculate`,
  }),
};

const inputs = [
  {
    title: "Wind speed",
    body: "Moving air is the strongest suppressor in the model. When the air is breezy, midges usually struggle more than they do in calm sheltered spots.",
  },
  {
    title: "Temperature",
    body: "Temperature affects how active conditions are likely to feel, but it is not treated on its own. Warm air without shelter and humidity does not automatically mean a bad midge experience.",
  },
  {
    title: "Humidity",
    body: "Mild, humid conditions usually make nuisance more likely, especially around lochs, burns, boggy ground, woodland edges, and other sheltered damp areas.",
  },
  {
    title: "Cloud cover",
    body: "Cloudier, softer-light conditions can help nuisance build when other signals already favour activity. It is a supporting input rather than the main driver, but it helps separate sharper midday suppression from calmer, greyer windows.",
  },
  {
    title: "Time of day and season",
    body: "Evening and dusk matter because nuisance often becomes more noticeable as the air settles. Season matters too, because the same weather pattern does not feel identical in early spring, peak summer, or the tail end of the season.",
  },
];

const scale = [
  {
    score: "1",
    label: "Low",
    meaning: "Usually manageable unless you stop in a very sheltered damp pocket.",
  },
  {
    score: "2",
    label: "Guarded",
    meaning: "Could get annoying if the air drops still, especially later in the day.",
  },
  {
    score: "3",
    label: "Moderate",
    meaning: "Expect nuisance in sheltered stops and calmer evening windows.",
  },
  {
    score: "4",
    label: "High",
    meaning: "Sheltered stops are likely to be uncomfortable without protection.",
  },
  {
    score: "5",
    label: "Very High",
    meaning: "Strong nuisance likely, change timing, location, or kit if you can.",
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
            BiteForecast uses a small set of weather and seasonal signals to create a practical nuisance estimate for Scottish midges. The goal is to help with real trip planning, not to pretend every loch edge or campsite can be modelled perfectly.
          </p>
        </header>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">The short version</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              The calculator gives the most weight to the conditions that tend to matter most in practice: wind, temperature, humidity, cloud cover, and time of day or season.
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
          <h2 className="text-2xl font-semibold">The five-point scale</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-700 text-stone-400">
                  <th className="pb-3 pr-4">Score</th>
                  <th className="pb-3 pr-4">Band</th>
                  <th className="pb-3">What it usually means</th>
                </tr>
              </thead>
              <tbody>
                {scale.map((row) => (
                  <tr key={row.score} className="border-b border-stone-800 align-top">
                    <td className="py-4 pr-4 font-semibold text-stone-100">{row.score}</td>
                    <td className="py-4 pr-4 text-stone-200">{row.label}</td>
                    <td className="py-4 text-stone-300">{row.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
