import type { Metadata } from "next";
import Link from "next/link";

import {
  OPERATIONAL_FACTS,
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";

const description =
  "How BiteForecast calculates Scottish midge risk from weather, season, and time of day — and what the model does not know.";

export const metadata: Metadata = {
  title: "How the BiteForecast index works",
  description,
  alternates: buildMetadataAlternates("/how-the-index-works"),
  openGraph: buildOpenGraph({
    title: "How the BiteForecast index works",
    description,
    url: `${SITE_URL}/how-the-index-works`,
  }),
};

const sources = [
  {
    label: "APS Biocontrol / Smidge — Scottish Midge Forecast context",
    href: "https://www.smidgeup.com/midge-forecast/",
  },
  {
    label: "APS Biocontrol / Smidge — Midge facts and Highland midge background",
    href: "https://www.smidgeup.com/beasties/midges/midge-facts/",
  },
  {
    label: "Blackwell, A. (Scottish biting midge literature, Culicoides impunctatus)",
    href: "https://scholar.google.com/scholar?q=Culicoides+impunctatus+activity+wind+temperature+humidity",
  },
  {
    label: "Open-Meteo weather API",
    href: "https://open-meteo.com/",
  },
];

export default function HowTheIndexWorksPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <article className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-4">
          <Link className="text-sm text-almanac-green underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-almanac-green">Methodology</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">How the BiteForecast index works</h1>
          <p className="max-w-3xl text-lg leading-8 text-almanac-secondary">
            BiteForecast is a weather-proxy model for Scottish midge nuisance. It is built to answer a practical planning question: when are conditions likely to feel manageable, annoying, or worth avoiding?
          </p>
        </header>

        <section className="border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-black">What the model uses</h2>
          <div className="mt-4 space-y-3 text-almanac-secondary">
            <p>Each forecast combines temperature, wind speed, relative humidity, time of day, UV/sunlight proxy, and season.</p>
            <p>The time-of-day curve is explicit: dusk and dawn get crepuscular boosts; bright midday is suppressed; the overnight dead zone is suppressed so still, humid 1am weather does not automatically beat dusk.</p>
            <p>Wind is treated as a strong suppressor. Sustained stronger wind can collapse the score even when humidity and temperature look favourable.</p>
          </div>
        </section>

        <section className="border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-black">What the model does not use</h2>
          <div className="mt-4 space-y-3 text-almanac-secondary">
            <p>BiteForecast does not use trap counts, live biting reports, on-the-ground observations, or site-specific sensor data.</p>
            <p>That means the index can miss small sheltered pockets: campsite edges, woodland hollows, still burns, and lochside corners can feel worse than a broad weather forecast suggests.</p>
            <p>The established Scottish midge forecast has historically used trap-count context as well as weather. BiteForecast is deliberately simpler and should be read as a weather-based planning estimate.</p>
          </div>
        </section>

        <section className="border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-black">Update cadence and forecast horizon</h2>
          <div className="mt-4 space-y-3 text-almanac-secondary">
            <p>Forecast pages update {OPERATIONAL_FACTS.updateCadenceLabel}. The forecast outlook is {OPERATIONAL_FACTS.forecastHorizonLabel}.</p>
            <p>Weather data comes from Open-Meteo. If live weather data is unavailable, BiteForecast falls back to a seasonal estimate rather than pretending missing data is current.</p>
          </div>
        </section>

        <section className="rounded-3xl border border-amber-300/25 bg-amber-500/10 p-6">
          <h2 className="text-2xl font-black">Current constants awaiting formal sign-off</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-100/90">
            <li>Temperature below 7°C returns zero activity in the model.</li>
            <li>Dusk window: one hour before to ninety minutes after sunset.</li>
            <li>Dawn window: one hour either side of sunrise.</li>
            <li>Overnight dead zone: strongly suppressed outside the dawn/dusk windows.</li>
            <li>Wind: 8–12 mph progressively suppresses; sustained 12+ mph strongly suppresses activity.</li>
          </ul>
          <p className="mt-4 text-sm text-amber-100/80">
            These values are conservative operational constants derived from Scottish midge literature, Smidge/Scottish forecast context, and site plausibility tests. They should be reviewed after live-season observations.
          </p>
        </section>

        <section className="border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-black">Sources and reference points</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-almanac-secondary">
            {sources.map((source) => (
              <li key={source.href}>
                <a className="text-almanac-green underline underline-offset-4" href={source.href} rel="noopener noreferrer" target="_blank">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
