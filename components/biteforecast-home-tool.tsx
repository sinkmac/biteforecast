"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  GrieveOverlay,
  getGrieveLevel,
  getGrieveLevelFromRiskNumber,
  getGrieveStateName,
  getGrieveOperatorLabel,
} from "./grieve-overlay";
import { MorishSnackPromo } from "./morish-snack-promo";
import type { PublicBand } from "../lib/scoring/bands";

type HomeLocation = {
  slug: string;
  name: string;
  region: string;
  broaderArea: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  seasonalFallbackByMonth: Record<number, PublicBand>;
  planningRiskBand: PublicBand;
  planningTakeaway: string;
};

type RiskLevel = {
  number: 1 | 2 | 3 | 4 | 5;
  band: PublicBand;
  name: string;
  copy: string;
  shortCopy: string;
  tone: string;
};

type ForecastDay = {
  dateIso: string;
  label: string;
  level: RiskLevel;
};

type WeatherSnapshot = {
  windMph: number;
  humidity: number;
  temperatureC: number;
  targetTimeIso: string;
  sunriseIso: string;
  sunsetIso: string;
};

type SelectedPlace = HomeLocation | {
  slug: "gps";
  name: string;
  region: string;
  broaderArea: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  seasonalFallbackByMonth: Record<number, PublicBand>;
  planningRiskBand: PublicBand;
  planningTakeaway: string;
};

const RISK_LEVELS: Record<PublicBand, RiskLevel> = {
  Low: {
    number: 1,
    band: "Low",
    name: "Low",
    copy: "No special precautions needed. Moving air or poor conditions are keeping activity low.",
    shortCopy: "No special precautions needed.",
    tone: "from-emerald-300 to-lime-200 text-stone-950",
  },
  Guarded: {
    number: 2,
    band: "Guarded",
    name: "Moderate",
    copy: "Some midges are likely around sheltered or damp spots. Keep repellent handy.",
    shortCopy: "Midges likely near water or forestry.",
    tone: "from-lime-200 to-yellow-100 text-stone-950",
  },
  Moderate: {
    number: 3,
    band: "Moderate",
    name: "High",
    copy: "Warm, humid or sheltered conditions mean midges are active. Repellent is recommended.",
    shortCopy: "Repellent recommended.",
    tone: "from-yellow-200 to-amber-300 text-stone-950",
  },
  High: {
    number: 4,
    band: "High",
    name: "Severe",
    copy: "Long sleeves and repellent essential. Avoid exposed areas between 7pm and 10pm.",
    shortCopy: "Long sleeves and repellent essential.",
    tone: "from-orange-300 to-red-300 text-stone-950",
  },
  "Very High": {
    number: 5,
    band: "Very High",
    name: "Extreme",
    copy: "Consider changing plans. If you must go out, full cover and repellent. Get back inside before dusk.",
    shortCopy: "Consider changing plans.",
    tone: "from-red-400 to-rose-500 text-white",
  },
};

const PRODUCT_RECOMMENDATIONS = [
  {
    label: "Smidge 75ml",
    note: "The practical Scottish default. Small enough to live in a day bag.",
    href: "https://amzn.to/4mBlUbS",
  },
  {
    label: "Midge head net",
    note: "Not glamorous. Absolutely correct when the air stops moving.",
    href: "https://amzn.to/42i5LOY",
  },
  {
    label: "Avon Skin So Soft",
    note: "The old local favourite for lighter nuisance and short stops.",
    href: "https://amzn.to/4tX26lN",
  },
];

const BAND_MIDPOINTS: Record<PublicBand, number> = {
  Low: 10,
  Guarded: 30,
  Moderate: 52,
  High: 74,
  "Very High": 92,
};

const BAND_ORDER: PublicBand[] = ["Low", "Guarded", "Moderate", "High", "Very High"];

export function BiteForecastHomeTool({ locations }: { locations: HomeLocation[] }) {
  const defaultLocation = locations[0];
  const [selectedSlug, setSelectedSlug] = useState(defaultLocation?.slug ?? "");
  const [gpsLocation, setGpsLocation] = useState<SelectedPlace | null>(null);
  const [gpsStatus, setGpsStatus] = useState("Choose a location, or allow GPS to pick the nearest forecast point.");
  const [selectedDate, setSelectedDate] = useState(() => toDateInputValue(new Date()));
  const [result, setResult] = useState<{ level: RiskLevel; place: SelectedPlace; mode: "live" | "fallback"; snapshot?: WeatherSnapshot } | null>(null);
  const [forecastDays, setForecastDays] = useState<ForecastDay[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [shareCardUrl, setShareCardUrl] = useState<string | null>(null);
  const cardRef = useRef<HTMLCanvasElement | null>(null);

  const selectedPlace = useMemo<SelectedPlace>(() => {
    if (selectedSlug === "gps" && gpsLocation) {
      return gpsLocation;
    }

    return locations.find((location) => location.slug === selectedSlug) ?? defaultLocation;
  }, [defaultLocation, gpsLocation, locations, selectedSlug]);

  useEffect(() => {
    if (!navigator.geolocation || !defaultLocation) {
      setGpsStatus("GPS unavailable — choose a location manually.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nearest = findNearestLocation(position.coords.latitude, position.coords.longitude, locations) ?? defaultLocation;
        const detected: SelectedPlace = {
          ...nearest,
          slug: "gps",
          name: `Current location near ${nearest.name}`,
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        };
        setGpsLocation(detected);
        setSelectedSlug("gps");
        setGpsStatus("GPS location detected. You can override it manually.");
      },
      () => {
        setGpsStatus("GPS blocked or unavailable — choose a location manually.");
      },
      { enableHighAccuracy: false, maximumAge: 1000 * 60 * 20, timeout: 5000 },
    );
  }, [defaultLocation, locations]);

  async function checkRisk() {
    if (!selectedPlace) {
      return;
    }

    setIsChecking(true);
    setShareCardUrl(null);

    try {
      const { level, mode, snapshot } = await calculateRisk(selectedPlace, selectedDate);
      const sevenDay = await calculateSevenDayForecast(selectedPlace);
      setResult({ level, place: selectedPlace, mode, snapshot });
      setForecastDays(sevenDay);
    } finally {
      setIsChecking(false);
    }
  }

  function resetCheck() {
    setResult(null);
    setForecastDays([]);
    setShareCardUrl(null);
  }

  function generateShareCard() {
    if (!result || !cardRef.current) {
      return;
    }

    const canvas = cardRef.current;
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;

    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#052e24");
    gradient.addColorStop(0.55, "#0c0a09");
    gradient.addColorStop(1, "#1c1917");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    context.fillStyle = "rgba(16, 185, 129, 0.16)";
    context.beginPath();
    context.arc(1010, 120, 260, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = "rgba(251, 191, 36, 0.12)";
    context.beginPath();
    context.arc(120, 590, 280, 0, Math.PI * 2);
    context.fill();

    context.fillStyle = "#d1fae5";
    context.font = "700 38px Arial";
    context.fillText("BiteForecast", 72, 92);

    context.fillStyle = "#a8a29e";
    context.font = "400 30px Arial";
    context.fillText(result.place.name, 72, 160);

    wrapCanvasText(context, result.level.name, 72, 285, 980, 82, "800 76px Arial", "#ffffff");
    wrapCanvasText(context, result.level.shortCopy, 76, 455, 900, 42, "400 38px Arial", "#d6d3d1");

    context.fillStyle = "#34d399";
    context.font = "700 30px Arial";
    context.fillText("biteforecast.scot", 72, 565);

    context.fillStyle = "#fef3c7";
    context.font = "800 92px Arial";
    context.fillText(String(result.level.number), 1010, 540);

    const url = canvas.toDataURL("image/png");
    setShareCardUrl(url);

    if (navigator.share) {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          const file = new File([blob], "biteforecast-result.png", { type: "image/png" });
          return navigator.share({
            title: `BiteForecast: ${result.level.name}`,
            text: `${result.place.name}: ${result.level.name}`,
            files: [file],
          });
        })
        .catch(() => undefined);
    }
  }

  const showProductsAbove = result ? result.level.number >= 3 : false;
  const grieveLevel = result ? getGrieveLevelFromRiskNumber(result.level.number) : undefined;

  return (
    <main className="biteforecast-home overflow-x-hidden bg-stone-950 text-stone-50">
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-x-hidden px-4 py-4 sm:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(132,204,22,0.14),transparent_32%)]" />
        <div className="absolute left-4 top-4 z-10 sm:left-6 sm:top-6">
            <p className="text-base font-black tracking-tight text-stone-50">BiteForecast</p>
            <p className="mt-1 text-xs font-medium text-emerald-200 sm:text-sm">Skip the midges. Not the scenery.</p>
        </div>

        <div className="bf-tool-shell relative mx-auto flex items-center justify-center pt-14 sm:pt-16">
            <div className="bf-tool-card rounded-[2rem] border border-white/10 bg-stone-900/88 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-7">
              <div className="space-y-3 sm:space-y-5">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">Location</span>
                  <select
                    aria-label="Location"
                    className="block w-full min-w-0 max-w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base font-semibold text-stone-50 outline-none transition focus:border-emerald-300 sm:text-lg"
                    value={selectedSlug}
                    onChange={(event) => {
                      setSelectedSlug(event.target.value);
                      resetCheck();
                    }}
                  >
                    {gpsLocation ? <option value="gps">{gpsLocation.name}</option> : null}
                    {locations.map((location) => (
                      <option key={location.slug} value={location.slug}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                  <span className="mt-2 block min-h-4 text-xs text-stone-500">{gpsStatus}</span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-stone-400">Date</span>
                  <input
                    aria-label="Date"
                    className="block w-full min-w-0 max-w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base font-semibold text-stone-50 outline-none transition focus:border-emerald-300 sm:text-lg"
                    min={toDateInputValue(new Date())}
                    type="date"
                    value={selectedDate}
                    onChange={(event) => {
                      setSelectedDate(event.target.value);
                      resetCheck();
                    }}
                  />
                </label>

                {result ? (
                  <div className="rounded-[1.5rem] border border-emerald-300/20 bg-stone-950 p-4 text-center sm:p-6">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:text-left">
                      <div className="text-center sm:text-left">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-stone-500">
                          BiteForecast
                        </p>
                        <h1 className="text-3xl font-black leading-none tracking-tight text-white sm:text-5xl">
                          Level {result.level.number} — {result.level.name}
                        </h1>
                        <p className="mt-2 text-sm leading-6 text-stone-200 sm:text-base">
                          {result.level.copy}
                        </p>
                      </div>
                    </div>
                    {grieveLevel !== undefined ? (
                      <div className="mt-4 border-t border-stone-800 pt-4">
                        <GrieveOverlay grieveLevel={grieveLevel} />
                      </div>
                    ) : null}
                    <p className="mt-3 text-xs text-stone-500">Based on live weather data. Updated every 3 hours.</p>
                    {result.mode === "fallback" ? <p className="mt-2 text-xs text-amber-200">Live feed unavailable — showing a seasonal estimate.</p> : null}
                    <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
                      <button
                        className="rounded-full bg-emerald-300 px-5 py-3 text-sm font-black text-stone-950 transition hover:bg-emerald-200"
                        onClick={generateShareCard}
                        type="button"
                      >
                        Share result
                      </button>
                      <button
                        className="rounded-full border border-stone-700 px-5 py-3 text-sm font-bold text-stone-200 transition hover:border-stone-500"
                        onClick={resetCheck}
                        type="button"
                      >
                        Check again
                      </button>
                    </div>
                    <canvas ref={cardRef} className="hidden" />
                    {shareCardUrl ? (
                      <a
                        className="mt-3 inline-flex text-xs font-semibold text-emerald-200 underline underline-offset-4"
                        download="biteforecast-result.png"
                        href={shareCardUrl}
                      >
                        Download share card
                      </a>
                    ) : null}
                    <MorishSnackPromo show={result.level.number >= 3} />
                  </div>
                ) : (
                  <button
                    className="block w-full min-w-0 max-w-full rounded-2xl bg-emerald-300 px-5 py-4 text-lg font-black text-stone-950 shadow-lg shadow-emerald-950/30 transition hover:bg-emerald-200 disabled:cursor-wait disabled:bg-stone-600 disabled:text-stone-300"
                    disabled={isChecking || !selectedPlace}
                    onClick={checkRisk}
                    type="button"
                  >
                    {isChecking ? "Checking…" : "Check my risk"}
                  </button>
                )}
              </div>
            </div>
        </div>
      </section>

      <section className="mx-auto -mt-14 max-w-2xl px-4 pb-10 text-center sm:-mt-12 sm:px-6">
        <p className="text-sm leading-6 text-stone-400 sm:text-base">
          BiteForecast tells you midge risk for your Highland destination today, in plain English, updated every 3 hours.
        </p>
      </section>

      <section className="mx-auto -mt-24 max-w-3xl px-4 pb-20 sm:-mt-20 sm:px-6">
        <div className="rounded-3xl border border-amber-300/20 bg-stone-900/90 p-5 shadow-2xl shadow-black/20 backdrop-blur sm:p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded border border-stone-700/60 bg-stone-900/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300/80">
                      <span className="text-stone-500">FILE:</span> THE BAMPOT
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-600">CLASSIFIED</span>
                  </div>
                  <h2 className="mt-3 text-xl font-black tracking-tight text-stone-50">Intelligence summary</h2>
                  <p className="mt-3 text-sm leading-6 text-stone-300 sm:text-base">
                    The data you see on this page is derived from Air Vice-Marshal Grieve&apos;s own tactical intelligence — intercepted communiqués from the airborne divisions known as The Cloud. We reframe his operational reports as a practical midge forecast. He is not consulted on the editorial direction. He writes letters. We ignore them.
                  </p>
                </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-16 sm:px-6">
        {showProductsAbove ? <ProductRecommendations heading="Recommended for this result" /> : null}

        <SevenDayForecast days={forecastDays} locationName={result?.place.name ?? selectedPlace?.name ?? "your location"} />

        <section className="rounded-3xl border border-stone-800 bg-stone-900 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-stone-300">Other locations</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {locations.map((location) => (
              <Link
                className="rounded-2xl border border-stone-800 bg-stone-950/80 p-4 transition hover:border-emerald-400/50"
                href={`/forecast/${location.slug}`}
                key={location.slug}
              >
                <p className="text-sm font-semibold text-stone-100">{location.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone-500">{location.region}</p>
                <p className="mt-3 text-sm text-stone-400">{location.planningTakeaway}</p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

function SevenDayForecast({ days, locationName }: { days: ForecastDay[]; locationName: string }) {
  if (!days.length) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-stone-800 bg-stone-900 p-6">
      <h2 className="text-2xl font-black tracking-tight">5-day forecast for {locationName}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {days.map((day) => (
          <article className="rounded-2xl border border-stone-800 bg-stone-950/80 p-4" key={day.dateIso}>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{day.label}</p>
            <p className="mt-3 text-lg font-black text-stone-50">{day.level.name}</p>
            <p className="mt-2 text-sm text-stone-400">Level {day.level.number}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductRecommendations({ heading }: { heading: string }) {
  return (
    <section className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">Affiliate recommendations</p>
      <h2 className="mt-2 text-2xl font-black tracking-tight">{heading}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {PRODUCT_RECOMMENDATIONS.map((item) => (
          <a
            className="rounded-2xl border border-emerald-400/20 bg-stone-950/70 p-4 transition hover:border-emerald-300/50"
            href={item.href}
            key={item.label}
            rel="nofollow sponsored noopener noreferrer"
            target="_blank"
          >
            <p className="font-bold text-stone-100">{item.label}</p>
            <p className="mt-2 text-sm text-stone-400">{item.note}</p>
            <p className="mt-4 text-sm font-bold text-emerald-200">View on Amazon →</p>
          </a>
        ))}
      </div>
    </section>
  );
}

async function calculateRisk(place: SelectedPlace, dateIso: string): Promise<{ level: RiskLevel; mode: "live" | "fallback"; snapshot?: WeatherSnapshot }> {
  const snapshot = await fetchWeatherSnapshot(place, dateIso);

  if (!snapshot) {
    return { level: getFallbackLevel(place, dateIso), mode: "fallback" };
  }

  const seasonalPrior = BAND_MIDPOINTS[getSeasonalBand(place, dateIso)];
  const baseScore = seasonalPrior * 0.45 + computeHumidityContribution(snapshot.humidity) + computeTemperatureContribution(snapshot.temperatureC);
  const duskWindow = isWithinHour(new Date(snapshot.targetTimeIso), new Date(snapshot.sunsetIso));
  const scoreWithDusk = baseScore + (duskWindow ? 2 : 0);
  const finalScore = applyWindSuppressor(scoreWithDusk, snapshot.windMph);

  return { level: RISK_LEVELS[getBandForScore(finalScore)], mode: "live", snapshot };
}

async function calculateSevenDayForecast(place: SelectedPlace): Promise<ForecastDay[]> {
  const payload = await fetchOpenMeteoPayload(place, 5);

  if (!payload?.daily?.time?.length) {
    return [];
  }

  return payload.daily.time.slice(0, 5).map((dateIso: string, dayIndex: number) => {
    const sunsetIso = payload.daily.sunset[dayIndex];
    const targetTimeIso = findNearestHourIso(payload.hourly.time, sunsetIso ?? `${dateIso}T18:00`);
    const index = targetTimeIso ? payload.hourly.time.indexOf(targetTimeIso) : -1;

    if (index === -1) {
      return {
        dateIso,
        label: formatDayLabel(dateIso),
        level: getFallbackLevel(place, dateIso),
      };
    }

    const snapshot: WeatherSnapshot = {
      windMph: payload.hourly.wind_speed_10m[index],
      humidity: payload.hourly.relative_humidity_2m[index],
      temperatureC: payload.hourly.temperature_2m[index],
      targetTimeIso: payload.hourly.time[index],
      sunriseIso: payload.daily.sunrise[dayIndex],
      sunsetIso: payload.daily.sunset[dayIndex],
    };

    const seasonalPrior = BAND_MIDPOINTS[getSeasonalBand(place, dateIso)];
    const score = applyWindSuppressor(
      seasonalPrior * 0.45 + computeHumidityContribution(snapshot.humidity) + computeTemperatureContribution(snapshot.temperatureC) + 2,
      snapshot.windMph,
    );

    return {
      dateIso,
      label: formatDayLabel(dateIso),
      level: RISK_LEVELS[getBandForScore(score)],
    };
  });
}

async function fetchWeatherSnapshot(place: SelectedPlace, dateIso: string): Promise<WeatherSnapshot | null> {
  const payload = await fetchOpenMeteoPayload(place, 7);

  if (!payload) {
    return null;
  }

  const selectedDate = new Date(`${dateIso}T12:00:00`);
  const today = toDateInputValue(new Date()) === dateIso;
  const targetIso = today ? toLondonHourIso(new Date()) : `${dateIso}T18:00`;
  const targetTimeIso = findNearestHourIso(payload.hourly.time, targetIso);

  if (!targetTimeIso) {
    return null;
  }

  const index = payload.hourly.time.indexOf(targetTimeIso);
  const dayIndex = payload.daily.time.indexOf(dateIso) === -1 ? 0 : payload.daily.time.indexOf(dateIso);

  if (index === -1 || Number.isNaN(selectedDate.getTime())) {
    return null;
  }

  return {
    windMph: payload.hourly.wind_speed_10m[index],
    humidity: payload.hourly.relative_humidity_2m[index],
    temperatureC: payload.hourly.temperature_2m[index],
    targetTimeIso,
    sunriseIso: payload.daily.sunrise[dayIndex],
    sunsetIso: payload.daily.sunset[dayIndex],
  };
}

async function fetchOpenMeteoPayload(place: SelectedPlace, forecastDays: number) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(place.coordinates.latitude));
  url.searchParams.set("longitude", String(place.coordinates.longitude));
  url.searchParams.set("hourly", "temperature_2m,relative_humidity_2m,wind_speed_10m");
  url.searchParams.set("daily", "sunrise,sunset");
  url.searchParams.set("forecast_days", String(forecastDays));
  url.searchParams.set("wind_speed_unit", "mph");
  url.searchParams.set("timezone", "Europe/London");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function getFallbackLevel(place: SelectedPlace, dateIso: string): RiskLevel {
  return RISK_LEVELS[getSeasonalBand(place, dateIso)];
}

function getSeasonalBand(place: SelectedPlace, dateIso: string): PublicBand {
  const month = new Date(`${dateIso}T12:00:00`).getMonth() + 1;
  return place.seasonalFallbackByMonth[month] ?? place.planningRiskBand;
}

function getBandForScore(score: number): PublicBand {
  const normalizedScore = Math.min(100, Math.max(0, Math.round(score)));

  if (normalizedScore <= 19) return "Low";
  if (normalizedScore <= 39) return "Guarded";
  if (normalizedScore <= 64) return "Moderate";
  if (normalizedScore <= 84) return "High";
  return "Very High";
}

function computeHumidityContribution(humidity: number): number {
  if (humidity <= 60) return 0;
  return ((Math.min(100, humidity) - 60) / 40) * 24;
}

function computeTemperatureContribution(temperatureC: number): number {
  const distanceFromIdeal = Math.abs(temperatureC - 15);
  return Math.max(0, 18 - distanceFromIdeal * 2);
}

function applyWindSuppressor(score: number, windMph: number): number {
  if (windMph <= 7) return score;
  if (windMph >= 12) return 0;
  return score * (1 - (windMph - 7) / 5);
}

function isWithinHour(target: Date, anchor: Date): boolean {
  return Math.abs(target.getTime() - anchor.getTime()) <= 60 * 60 * 1000;
}

function findNearestLocation(latitude: number, longitude: number, locations: HomeLocation[]): HomeLocation | undefined {
  return locations.reduce<HomeLocation | undefined>((nearest, location) => {
    if (!nearest) return location;

    const currentDistance = distanceSquared(latitude, longitude, location.coordinates.latitude, location.coordinates.longitude);
    const nearestDistance = distanceSquared(latitude, longitude, nearest.coordinates.latitude, nearest.coordinates.longitude);
    return currentDistance < nearestDistance ? location : nearest;
  }, undefined);
}

function distanceSquared(latA: number, lonA: number, latB: number, lonB: number): number {
  return (latA - latB) ** 2 + (lonA - lonB) ** 2;
}

function toDateInputValue(date: Date): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function toLondonHourIso(date: Date): string {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("sv-SE", {
      timeZone: "Europe/London",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
      .formatToParts(date)
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:00`;
}

function findNearestHourIso(hourlyTimes: string[], targetIso: string): string | null {
  const targetTime = new Date(targetIso).getTime();
  let bestIso: string | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  for (const iso of hourlyTimes) {
    const distance = Math.abs(new Date(iso).getTime() - targetTime);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestIso = iso;
    }
  }

  return bestIso;
}

function formatDayLabel(dateIso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "Europe/London",
  }).format(new Date(`${dateIso}T12:00:00`));
}

function wrapCanvasText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  font: string,
  fillStyle: string,
) {
  context.font = font;
  context.fillStyle = fillStyle;
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    const metrics = context.measureText(testLine);

    if (metrics.width > maxWidth && line) {
      context.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line) {
    context.fillText(line, x, currentY);
  }
}

export const BITEFORECAST_RISK_LEVELS_FOR_TESTS = RISK_LEVELS;
export const BITEFORECAST_RISK_LEVEL_ORDER_FOR_TESTS = BAND_ORDER;
