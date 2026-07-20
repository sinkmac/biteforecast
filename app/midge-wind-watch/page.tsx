import type { Metadata } from "next";
import Link from "next/link";

import { FaqSchema, FaqSection } from "../../components/faq-block";
import { ForecastCalendar } from "../../components/forecast-calendar";
import {
  CALCULATOR_DESCRIPTION,
  CALCULATOR_FAQS,
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
  getBandColorClasses,
} from "../../lib/seo/site-metadata";
import type { AffiliateTier } from "../../lib/calculator/engine";
import { buildSevenDayForecast } from "../../lib/calculator/forecast";
import {
  buildFallbackCalculatorState,
  buildLiveCalculatorState,
} from "../../lib/calculator/engine";
import {
  getCalculatorLocation,
  getCalculatorLocationOptions,
  getCalculatorTimePreset,
} from "../../lib/calculator/location-resolver";
import {
  fetchOpenMeteoSevenDayForecast,
  fetchOpenMeteoSnapshot,
} from "../../lib/providers/open-meteo";

type PageProps = {
  searchParams?: Promise<{
    location?: string;
    time?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Live midge forecast calculator",
  description: CALCULATOR_DESCRIPTION,
  alternates: buildMetadataAlternates("/midge-wind-watch"),
  openGraph: buildOpenGraph({
    title: "Live midge forecast calculator",
    description: CALCULATOR_DESCRIPTION,
    url: `${SITE_URL}/midge-wind-watch`,
  }),
};

export const dynamic = "force-dynamic";

export default async function MidgeWindWatchPage({ searchParams }: PageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const location = getCalculatorLocation(resolvedSearchParams.location);
  const timePreset = getCalculatorTimePreset(resolvedSearchParams.time);
  const currentDate = new Date();
  const locationOptions = getCalculatorLocationOptions();

  if (!location) {
    return null;
  }

  const snapshot = await fetchOpenMeteoSnapshot({
    location,
    currentDate,
    preset: timePreset,
  });

  const result = snapshot
    ? buildLiveCalculatorState({ location, currentDate, snapshot })
    : buildFallbackCalculatorState({ location, currentDate });
  const sevenDaySnapshots = await fetchOpenMeteoSevenDayForecast({
    location,
    currentDate,
    preset: timePreset,
  });
  const sevenDayForecast = sevenDaySnapshots
    ? buildSevenDayForecast({
        location,
        currentDate,
        snapshots: sevenDaySnapshots,
      })
    : [];

  const affiliateRecommendations = getAffiliateRecommendations(result.affiliateTier);

  return (
    <>
      <FaqSchema faqs={CALCULATOR_FAQS} />
      <main className="min-h-screen px-6 py-16">
        <article className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="space-y-4">
          <Link className="text-sm text-almanac-green underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-almanac-green">
            Midge Wind-Watch
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Live Scottish midge risk check
          </h1>
          <p className="max-w-3xl text-lg text-almanac-secondary">
            Check live midge conditions for your location right now. BiteForecast weighs wind speed, humidity, temperature, and time of day, then falls back to an honest seasonal estimate if live weather data is unavailable.
          </p>
        </header>

        <section className="border border-almanac-border bg-almanac-card p-6 ">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <form className="grid gap-4 md:grid-cols-[1.3fr_0.9fr_auto] md:items-end">
              <label className="flex flex-col gap-2 text-sm text-almanac-secondary">
                Location
                <select
                  className="border border-almanac-border bg-almanac-card px-4 py-3 text-base text-almanac-ink"
                  defaultValue={location.slug}
                  name="location"
                >
                  {locationOptions.map((option) => (
                    <option key={option.slug} value={option.slug}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm text-almanac-secondary">
                Time window
                <select
                  className="border border-almanac-border bg-almanac-card px-4 py-3 text-base text-almanac-ink"
                  defaultValue={timePreset}
                  name="time"
                >
                  <option value="now">Now</option>
                  <option value="sunrise">Around sunrise</option>
                  <option value="sunset">Around sunset</option>
                </select>
              </label>

              <button
                className="rounded-full bg-almanac-green px-5 py-3 font-medium text-almanac-card transition hover:bg-almanac-green"
                type="submit"
              >
                Check conditions
              </button>
            </form>

            <div className="border border-almanac-border bg-almanac-card p-5 text-sm text-almanac-secondary">
              <p className="font-medium text-almanac-ink">How to use this page</p>
              <p className="mt-2">
                Use the location guides for planning ahead. Use this route for day-of decisions, especially if you are choosing between exposed and sheltered stops.
              </p>
            </div>
          </div>
        </section>

        <section className={`grid gap-6 ${affiliateRecommendations ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-1"}`}>
          <div className="rounded-3xl border border-almanac-border bg-almanac-card p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-almanac-green">
                    {result.mode === "live" ? "Live result" : "Fallback result"}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">{result.band}</h2>
                </div>
                <div className="inline-flex rounded-full border border-almanac-green px-4 py-2 text-sm text-almanac-green">
                  {location.name}
                </div>
                <p className="max-w-2xl text-lg text-almanac-ink">{result.advice}</p>
              </div>
              <ScoreRing band={result.band} />
            </div>

            {result.notice ? (
              <p className="mt-5 rounded-2xl border border-amber-300/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                {result.notice}
              </p>
            ) : null}

            {result.peakTimeMessage ? (
              <div className="mt-4 rounded-2xl border border-rose-300/25 bg-rose-500/10 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-almanac-red">
                  Overnight Watch
                </p>
                <p className="mt-1 text-sm text-almanac-secondary">
                  {result.peakTimeMessage}
                </p>
              </div>
            ) : null}

            {result.liveSnapshot ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <MetricCard
                  label="Wind"
                  value={`${result.liveSnapshot.windMph.toFixed(1)} mph`}
                />
                <MetricCard
                  label="Humidity"
                  value={`${Math.round(result.liveSnapshot.humidity)}%`}
                />
                <MetricCard
                  label="Temperature"
                  value={`${result.liveSnapshot.temperatureC.toFixed(1)}°C`}
                />
              </div>
            ) : null}
          </div>

          {affiliateRecommendations ? (
            <aside className="border border-almanac-border bg-almanac-card p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-almanac-muted">
                Loadout
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{affiliateRecommendations.title}</h2>
              <p className="mt-3 text-almanac-secondary">{affiliateRecommendations.description}</p>
              <div className="mt-5 space-y-4">
                {affiliateRecommendations.items.map((item) => (
                  <div key={item.label} className="border border-almanac-border bg-almanac-card p-4">
                    <p className="font-medium text-almanac-ink">{item.label}</p>
                    <p className="mt-2 text-sm text-almanac-muted">{item.note}</p>
                    <a
                      className="mt-4 inline-flex rounded-full bg-almanac-green px-4 py-2 text-sm font-medium text-almanac-card transition hover:bg-almanac-green"
                      href={item.href}
                      rel="nofollow sponsored noreferrer"
                      target="_blank"
                    >
                      Buy on Amazon
                    </a>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-almanac-ink">
                Product prompts stay secondary to utility. When in doubt, choose a breezier stop before buying more kit.
              </p>
            </aside>
          ) : null}
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="border border-almanac-border bg-almanac-card p-6">
            <h2 className="text-2xl font-semibold">How the live check works</h2>
            <div className="mt-4 space-y-3 text-almanac-secondary">
              <p>
                Wind is the strongest suppressor. Humid, mild, sheltered periods push nuisance up. Exposure and moving air pull it down.
              </p>
              <p>
                Around sunset matters more than sunrise for the user-facing warning. If live weather is unavailable, this route falls back to a seasonal location estimate rather than pretending the feed exists.
              </p>
            </div>
          </div>
          <div className="border border-almanac-border bg-almanac-card p-6">
            <h2 className="text-2xl font-semibold">Planning reminder</h2>
            <div className="mt-4 space-y-3 text-almanac-secondary">
              <p>
                Even a low live result can feel worse in sheltered lay-bys, campsite edges, and lochside pauses than it does on exposed ground.
              </p>
              <p>
                Use the location guides for the broader terrain pattern, then use this route again right before you travel or stop.
              </p>
            </div>
          </div>
        </section>

        <ForecastCalendar
          days={sevenDayForecast}
          intro="This 5-day view runs the same scoring engine across forecast conditions for the next week so you can compare likely nuisance windows day by day."
          title={`5-day midge risk forecast for ${location.name}`}
        />

        <FaqSection faqs={CALCULATOR_FAQS} title="Calculator FAQ" />
      </article>
      </main>
    </>
  );
}

function ScoreRing({ band }: { band: string }) {
  const tone = getBandColorClasses(band);

  return (
    <div className={`flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 ${tone.border} ${tone.bg}`}>
      <div className="flex h-20 w-20 items-center justify-center border border-almanac-border bg-almanac-card text-center">
        <span className={`px-2 text-sm font-semibold uppercase tracking-[0.14em] ${tone.text}`}>
          {band}
        </span>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-almanac-border bg-almanac-card p-4">
      <p className="text-sm text-almanac-muted">{label}</p>
      <p className="mt-2 text-xl font-semibold text-almanac-ink">{value}</p>
    </div>
  );
}

type AffiliateRecommendation = {
  title: string;
  description: string;
  items: Array<{
    label: string;
    note: string;
    href: string;
  }>;
};

function getAffiliateRecommendations(
  tier: AffiliateTier,
): AffiliateRecommendation | null {
  if (tier === "none") {
    return null;
  }

  if (tier === "veryHigh") {
    return {
      title: "Very high protection",
      description:
        "Strong nuisance is likely in sheltered spots. If you\u2019re camping, fishing, or spending extended time in one place, bring the strongest repellent and a head net \u2014 still air at dusk will test any defence.",
      items: [
        {
          label: "Lifesystems Expedition 100",
          note: "Stronger repellent option for heavier conditions.",
          href: "https://amzn.to/3QhUkUT",
        },
        {
          label: "Head net",
          note: "Useful when still air and shelter make exposed skin hard to manage.",
          href: "https://amzn.to/42i5LOY",
        },
      ],
    };
  }

  if (tier === "high") {
    return {
      title: "High protection",
      description:
        "Sheltered stops are likely to be uncomfortable without proper kit. If you\u2019re camping or fishing through dusk, prioritise a strong repellent and keep heavier coverage ready for when the air drops still.",
      items: [
        {
          label: "Smidge 75ml",
          note: "Portable repellent option for day-of travel and repeat use.",
          href: "https://amzn.to/4mBlUbS",
        },
        {
          label: "Lifesystems Expedition 100",
          note: "Step up to this when conditions look stronger or more persistent.",
          href: "https://amzn.to/3QhUkUT",
        },
      ],
    };
  }

  return {
    title: "Moderate protection",
    description:
      "This is the practical default when nuisance is possible but not extreme. Keep a lighter spray option and a stronger backup close by \u2014 especially if you\u2019re camping or planning a long, still stop by the water.",
    items: [
      {
        label: "Avon SSS Citronella spray",
        note: "Lighter option for planning-level nuisance and shorter sheltered stops.",
        href: "https://amzn.to/4tX26lN",
      },
      {
        label: "Smidge 75ml",
        note: "Useful step-up option if the air drops still or the evening gets worse than expected.",
        href: "https://amzn.to/4mBlUbS",
      },
    ],
  };
}

