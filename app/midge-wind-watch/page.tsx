import Link from "next/link";

import {
  buildFallbackCalculatorState,
  buildLiveCalculatorState,
} from "../../lib/calculator/engine";
import {
  getCalculatorLocation,
  getCalculatorLocationOptions,
  getCalculatorTimePreset,
} from "../../lib/calculator/location-resolver";
import { fetchOpenMeteoSnapshot } from "../../lib/providers/open-meteo";

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

  const affiliateRecommendations = getAffiliateRecommendations(result.affiliateTier);

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-50">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <Link
          className="text-sm text-emerald-300 underline-offset-4 hover:underline"
          href="/"
        >
          ← Back to BiteForecast
        </Link>

        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Midge Wind-Watch
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Live Scottish midge risk check
          </h1>
          <p className="max-w-3xl text-lg text-stone-300">
            Use the live calculator for current or day-of decisions. If the weather feed is unavailable, BiteForecast falls back to an honest seasonal estimate rather than pretending the data exists.
          </p>
        </section>

        <section className="rounded-3xl border border-stone-800 bg-stone-900 p-6 shadow-2xl shadow-black/20">
          <form className="grid gap-4 md:grid-cols-[1.3fr_0.9fr_auto] md:items-end">
            <label className="flex flex-col gap-2 text-sm text-stone-300">
              Location
              <select
                className="rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-stone-50"
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
                className="rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-stone-50"
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
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  {result.mode === "live" ? "Live result" : "Fallback result"}
                </p>
                <h2 className="mt-2 text-3xl font-semibold">{result.band}</h2>
              </div>
              <div className="rounded-full border border-emerald-300/30 px-4 py-2 text-sm text-emerald-100/90">
                {location.name}
              </div>
            </div>

            <p className="mt-4 max-w-2xl text-lg text-stone-100">{result.advice}</p>

            {result.notice ? (
              <p className="mt-4 rounded-2xl border border-amber-300/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
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

          <aside className="rounded-3xl border border-stone-800 bg-stone-900 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">
              Protection tier
            </p>
            <h2 className="mt-2 text-2xl font-semibold">{affiliateRecommendations.title}</h2>
            <p className="mt-3 text-stone-300">{affiliateRecommendations.description}</p>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-stone-300">
              {affiliateRecommendations.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-stone-500">
              Product prompts stay secondary to utility. When in doubt, choose a breezier spot before buying more kit.
            </p>
          </aside>
        </section>
      </div>
    </main>
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

function getAffiliateRecommendations(tier: "light" | "moderate" | "full") {
  if (tier === "light") {
    return {
      title: "Light protection",
      description:
        "If you are mostly exposed to moving air, keep the kit light and focus on shorter sheltered stops.",
      items: [
        "A light repellent option for evening pauses",
        "A buff or lightweight layer for exposed skin",
      ],
    };
  }

  if (tier === "full") {
    return {
      title: "Full defence",
      description:
        "Conditions are strong enough to justify full kit, especially if you expect still or sheltered stops.",
      items: [
        "Repellent for repeated evening use",
        "Head net for calm, humid periods",
        "Lightweight long-sleeve layer or buff",
      ],
    };
  }

  return {
    title: "Moderate protection",
    description:
      "This is the default planning tier: enough kit to stay useful without overreacting to uncertain conditions.",
    items: [
      "Repellent for sheltered stops",
      "Head net kept in reserve for still periods",
      "Lightweight long-sleeve layer or buff",
    ],
  };
}
