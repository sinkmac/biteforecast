import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getForecastLocationBySlug,
} from "../../../lib/forecast/locations";
import {
  formatDateTime,
  getMidgeForecast,
  formatTime,
  type MidgeForecast,
} from "../../../lib/forecast/service";
import {
  getMidgeLabel,
  getMidgeLevelClasses,
  getMidgeRecommendation,
} from "../../../lib/forecast/midge-index";
import { ForecastWhatToBring } from "../../../components/affiliate-kit";
import { CopyShareTextButton } from "../../../components/copy-share-text-button";
import {
  HooliganState,
  getHooliganAdversaryLine,
} from "../../../components/hooligan-state";
import { SITE_URL, buildMetadataAlternates, buildOpenGraph } from "../../../lib/seo/site-metadata";

export const revalidate = 10800;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getForecastLocationBySlug(slug);

  if (!location) {
    return { title: "Midge forecast not found" };
  }

  const forecast = await getMidgeForecast(slug);
  const index = forecast?.current.index ?? 0;
  const label = forecast?.current.label ?? "Low";
  const recommendation = forecast?.current.recommendation ?? getMidgeRecommendation(index);
  const title = `${location.name} Midge Forecast Today — BiteForecast`;
  const description = `Current midge activity at ${location.name}: ${label} (${index}/10). Updated every 3 hours. ${recommendation}`;
  const url = `${SITE_URL}/forecast/${slug}`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: buildMetadataAlternates(`/forecast/${slug}`),
    openGraph: buildOpenGraph({ title, description, url }),
  };
}

export default async function ForecastPage({ params }: PageProps) {
  const { slug } = await params;
  const forecast = await getMidgeForecast(slug);

  if (!forecast) {
    notFound();
  }

  const hooliganLine = getHooliganAdversaryLine(forecast.current.index);
  const shareText = `🦟 ${forecast.location.name} midge forecast: ${forecast.current.label.toUpperCase()} (${forecast.current.index}/10)\n${hooliganLine}\nbiteforecast.scot/forecast/${forecast.location.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${forecast.location.name} Midge Forecast Today — BiteForecast`,
    url: `${SITE_URL}/forecast/${forecast.location.slug}`,
    description: `Current midge activity at ${forecast.location.name}: ${forecast.current.label} (${forecast.current.index}/10).`,
    dateModified: forecast.generated.toISOString(),
  };

  return (
    <main className="min-h-screen bg-stone-950 px-6 py-12 text-stone-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="space-y-3">
          <Link className="text-sm text-emerald-300 underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Live Midge Forecast</p>
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl">{forecast.location.name} Midge Forecast</h1>
          <p className="text-sm text-stone-400">
            Updated {formatDateTime(forecast.generated)} · Next update {formatDateTime(forecast.nextUpdate)}
          </p>
        </header>

        <section className={`rounded-[2rem] border p-7 shadow-2xl shadow-black/30 ${getMidgeLevelClasses(forecast.current.index)}`}>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-80">The Index</p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-8xl font-black leading-none tracking-tight">{forecast.current.index}</p>
              <p className="mt-3 text-3xl font-black uppercase tracking-[0.12em]">{forecast.current.label}</p>
            </div>
            <p className="max-w-xl text-lg leading-7">{forecast.current.sentence}</p>
          </div>
        </section>

        <ForecastWhatToBring index={forecast.current.index} />

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-2xl font-black">Tonight&apos;s peak</h2>
            <p className="mt-3 text-lg text-stone-200">
              Peak activity tonight: {forecast.current.peakTime} — {forecast.current.peakTonight}/10
            </p>
          </div>
          <div className="rounded-3xl border border-emerald-400/25 bg-emerald-500/10 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <HooliganState indexLevel={forecast.current.index} size="md" />
              <div>
                <h2 className="text-2xl font-black">Recommendation</h2>
                <p className="mt-3 text-sm font-medium italic leading-6 text-stone-400">{hooliganLine}</p>
                <p className="mt-3 text-lg leading-7 text-stone-100">{forecast.current.recommendation}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-black">48-hour activity chart</h2>
          <MidgeBarChart forecast={forecast} />
          <p className="mt-4 text-xs text-stone-500">
            Weather data: <a className="underline-offset-4 hover:text-stone-300 hover:underline" href="https://open-meteo.com" rel="noopener noreferrer" target="_blank">Open-Meteo</a>
          </p>
        </section>

        <section className="rounded-3xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-black">5-day outlook</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-5">
            {forecast.daily.map((day) => (
              <article className="rounded-2xl border border-stone-800 bg-stone-950/80 p-4" key={day.date.toISOString()}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{formatDay(day.date)}</p>
                <p className="mt-3 text-3xl font-black text-stone-50">{day.peakIndex}/10</p>
                <p className="mt-1 font-bold text-emerald-200">{day.label}</p>
                <p className="mt-3 text-sm leading-5 text-stone-400">{day.recommendation}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-stone-800 bg-stone-900 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">Advertisement</p>
          <ins className="adsbygoogle mt-6 block min-h-24 rounded-2xl border border-stone-800 bg-stone-950/60" data-ad-client="ca-pub-2335335210412692" data-ad-format="auto" data-full-width-responsive="true" />
        </section>

        <section className="rounded-3xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-black">Share forecast</h2>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-2xl bg-stone-950 p-4 text-sm leading-6 text-stone-100">{shareText}</pre>
          <CopyShareTextButton text={shareText} />
        </section>

        {forecast.location.existingPageSlug ? (
          <section className="rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-6">
            <Link className="text-lg font-bold text-emerald-200 underline decoration-emerald-400/60 underline-offset-4" href={`/scotland/${forecast.location.existingPageSlug}`}>
              Planning a trip? See our full {forecast.location.name} midge guide →
            </Link>
          </section>
        ) : null}
      </article>
    </main>
  );
}

function MidgeBarChart({ forecast }: { forecast: MidgeForecast }) {
  const bars = forecast.hourly.slice(0, 16);
  const width = Math.max(640, bars.length * 42);
  const height = 220;
  const baseline = 180;

  return (
    <div className="mt-5 overflow-x-auto">
      <svg aria-label="48-hour midge activity bar chart" className="min-w-full" role="img" viewBox={`0 0 ${width} ${height}`}>
        <line stroke="rgba(255,255,255,0.2)" x1="0" x2={width} y1={baseline} y2={baseline} />
        {bars.map((point, index) => {
          const barHeight = Math.max(4, point.index * 16);
          const x = index * 42 + 12;
          const y = baseline - barHeight;
          return (
            <g key={point.time.toISOString()}>
              <rect fill={barColour(point.index)} height={barHeight} rx="6" width="24" x={x} y={y} />
              <text fill="#d6d3d1" fontSize="10" textAnchor="middle" x={x + 12} y="202">{formatTime(point.time)}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function barColour(index: number) {
  const label = getMidgeLabel(index);
  if (label === "Low") return "#34d399";
  if (label === "Moderate") return "#facc15";
  if (label === "High") return "#f59e0b";
  if (label === "Severe") return "#ef4444";
  return "#450a0a";
}

function formatDay(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Europe/London",
  }).format(date);
}
