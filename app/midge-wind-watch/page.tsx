import Link from "next/link";

import { ForecastCalendar } from "../../components/forecast-calendar";
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
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-50">
      <article className="mx-auto flex max-w-6xl flex-col gap-10">
        <header className="space-y-4">
          <Link className="text-sm text-emerald-300 underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Midge Wind-Watch
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Live Scottish midge risk check
          </h1>
          <p className="max-w-3xl text-lg text-stone-300">
            Check live midge conditions for your location right now. BiteForecast weighs wind speed, humidity, temperature, and time of day, then falls back to an honest seasonal estimate if live weather data is unavailable.
          </p>
        </header>

        <section className="rounded-3xl border border-stone-800 bg-stone-900 p-6 shadow-2xl shadow-black/20">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <form className="grid gap-4 md:grid-cols-[1.3fr_0.9fr_auto] md:items-end">
              <label className="flex flex-col gap-2 text-sm text-stone-300">
                Location
                <select
                  className="rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-stone-50 shadow-inner shadow-black/20"
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

              <label className="flex flex-col gap-2 text-sm text-stone-300">
                Time window
                <select
                  className="rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-stone-50 shadow-inner shadow-black/20"
                  defaultValue={timePreset}
                  name="time"
                >
                  <option value="now">Now</option>
                  <option value="sunrise">Around sunrise</option>
                  <option value="sunset">Around sunset</option>
                </select>
              </label>

              <button
                className="rounded-full bg-emerald-300 px-5 py-3 font-medium text-stone-950 transition hover:bg-emerald-200"
                type="submit"
              >
                Check conditions
              </button>
            </form>

            <div className="rounded-2xl border border-stone-800 bg-stone-950/70 p-5 text-sm text-stone-300">
              <p className="font-medium text-stone-100">How to use this page</p>
              <p className="mt-2">
                Use the location guides for planning ahead. Use this route for day-of decisions, especially if you are choosing between exposed and sheltered stops.
              </p>
            </div>
          </div>
        </section>

        <section className={`grid gap-6 ${affiliateRecommendations ? "lg:grid-cols-[1.15fr_0.85fr]" : "lg:grid-cols-1"}`}>
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
                    {result.mode === "live" ? "Live result" : "Fallback result"}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold">{result.band}</h2>
                </div>
                <div className="inline-flex rounded-full border border-emerald-300/30 px-4 py-2 text-sm text-emerald-100/90">
                  {location.name}
                </div>
                <p className="max-w-2xl text-lg text-stone-100">{result.advice}</p>
              </div>
              <ScoreRing band={result.band} />
            </div>

            {result.notice ? (
              <p className="mt-5 rounded-2xl border border-amber-300/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                {result.notice}
              </p>
            ) : null}

            {result.peakTimeMessage ? (
              <p className="mt-4 rounded-2xl border border-rose-300/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {result.peakTimeMessage}
              </p>
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
            <aside className="rounded-3xl border border-stone-800 bg-stone-900 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">
                Protection tier
              </p>
              <h2 className="mt-2 text-2xl font-semibold">{affiliateRecommendations.title}</h2>
              <p className="mt-3 text-stone-300">{affiliateRecommendations.description}</p>
              <div className="mt-5 space-y-4">
                {affiliateRecommendations.items.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-stone-800 bg-stone-950/80 p-4">
                    <p className="font-medium text-stone-100">{item.label}</p>
                    <p className="mt-2 text-sm text-stone-400">{item.note}</p>
                    <a
                      className="mt-4 inline-flex rounded-full bg-emerald-300 px-4 py-2 text-sm font-medium text-stone-950 transition hover:bg-emerald-200"
                      href={item.href}
                      rel="nofollow sponsored noreferrer"
                      target="_blank"
                    >
                      Buy on Amazon
                    </a>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-stone-500">
                Product prompts stay secondary to utility. When in doubt, choose a breezier stop before buying more kit.
              </p>
            </aside>
          ) : null}
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-2xl font-semibold">How the live check works</h2>
            <div className="mt-4 space-y-3 text-stone-300">
              <p>
                Wind is the strongest suppressor. Humid, mild, sheltered periods push nuisance up. Exposure and moving air pull it down.
              </p>
              <p>
                Around sunset matters more than sunrise for the user-facing warning. If live weather is unavailable, this route falls back to a seasonal location estimate rather than pretending the feed exists.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-2xl font-semibold">Planning reminder</h2>
            <div className="mt-4 space-y-3 text-stone-300">
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
          intro="This 7-day view runs the same scoring engine across forecast conditions for the next week so you can compare likely nuisance windows day by day."
          title={`7-day midge risk forecast for ${location.name}`}
        />
      </article>
    </main>
  );
}

function ScoreRing({ band }: { band: string }) {
  const tone = getBandToneClasses(band);

  return (
    <div className={`flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 ${tone.border} ${tone.bg}`}>
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-950/90 text-center shadow-inner shadow-black/30">
        <span className={`px-2 text-sm font-semibold uppercase tracking-[0.14em] ${tone.text}`}>
          {band}
        </span>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-stone-800 bg-stone-950/80 p-4">
      <p className="text-sm text-stone-400">{label}</p>
      <p className="mt-2 text-xl font-semibold text-stone-50">{value}</p>
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
        "Strong nuisance is likely in sheltered spots. If you still need to stop there, use the strongest repellent and bring a head net.",
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
        "Sheltered stops are likely to be uncomfortable without proper kit. Prioritise a strong repellent and keep heavier coverage ready.",
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
      "This is the practical default when nuisance is possible but not extreme: keep a lighter spray option and a stronger backup close by.",
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

function getBandToneClasses(band: string) {
  switch (band) {
    case "Very High":
      return {
        border: "border-rose-400/60",
        bg: "bg-rose-500/10",
        text: "text-rose-200",
      };
    case "High":
      return {
        border: "border-amber-300/60",
        bg: "bg-amber-500/10",
        text: "text-amber-200",
      };
    case "Moderate":
    case "Guarded":
      return {
        border: "border-emerald-300/50",
        bg: "bg-emerald-500/10",
        text: "text-emerald-200",
      };
    default:
      return {
        border: "border-sky-300/45",
        bg: "bg-sky-500/10",
        text: "text-sky-200",
      };
  }
}
