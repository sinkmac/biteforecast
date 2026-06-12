import { getBandAdvice, getBandForScore, type PublicBand } from "../scoring/bands";
import type { LocationPage } from "../../content/locations/types";

export type CalculatorMode = "live" | "fallback";
export type AffiliateTier = "none" | "moderate" | "high" | "veryHigh";
export type TimePreset = "now" | "sunrise" | "sunset";

export type LiveWeatherSnapshot = {
  windMph: number;
  humidity: number;
  temperatureC: number;
  targetTimeIso: string;
  sunriseIso: string;
  sunsetIso: string;
};

export type CalculatorState = {
  mode: CalculatorMode;
  band: PublicBand;
  advice: string;
  notice?: string;
  peakTimeMessage?: string;
  affiliateTier: AffiliateTier;
  showNumericScore: boolean;
  liveSnapshot?: LiveWeatherSnapshot;
};

type BuildStateArgs = {
  location: LocationPage;
  currentDate: Date;
};

type BuildLiveStateArgs = BuildStateArgs & {
  snapshot: LiveWeatherSnapshot;
};

const MONTH_FORMATTER = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  timeZone: "Europe/London",
});

const BAND_MIDPOINTS: Record<PublicBand, number> = {
  Low: 10,
  Guarded: 30,
  Moderate: 52,
  High: 74,
  "Very High": 92,
};

export function buildFallbackCalculatorState({
  location,
  currentDate,
}: BuildStateArgs): CalculatorState {
  const month = getMonthNumber(currentDate);
  const band = location.seasonalFallbackByMonth[month] ?? location.planningRiskBand;

  return {
    mode: "fallback",
    band,
    advice: getBandAdvice(band),
    notice: `Live data unavailable — showing seasonal estimate for ${MONTH_FORMATTER.format(currentDate)}`,
    affiliateTier: "moderate",
    showNumericScore: false,
  };
}

export function buildLiveCalculatorState({
  location,
  currentDate,
  snapshot,
}: BuildLiveStateArgs): CalculatorState {
  const seasonalPrior = BAND_MIDPOINTS[
    location.seasonalFallbackByMonth[getMonthNumber(currentDate)] ?? location.planningRiskBand
  ];

  const baseScore =
    seasonalPrior * 0.45 +
    computeHumidityContribution(snapshot.humidity) +
    computeTemperatureContribution(snapshot.temperatureC);

  const target = new Date(snapshot.targetTimeIso);
  const duskWindow = isWithinHour(target, new Date(snapshot.sunsetIso));
  const dawnWindow = isWithinHour(target, new Date(snapshot.sunriseIso));
  const timeMultiplier = getDiurnalMultiplier(target, new Date(snapshot.sunriseIso), new Date(snapshot.sunsetIso));

  const scoreWithBiology = (baseScore + (duskWindow ? 6 : dawnWindow ? 0 : 0)) * timeMultiplier;
  const finalScore = applyWindSuppressor(scoreWithBiology, snapshot.windMph);
  const band = getBandForScore(finalScore);

  return {
    mode: "live",
    band,
    advice: getBandAdvice(band),
    peakTimeMessage:
      duskWindow && band !== "Low" ? "Peak midge time: Dusk approaching" : undefined,
    affiliateTier: getAffiliateTierForBand(band),
    showNumericScore: false,
    liveSnapshot: snapshot,
  };
}

function getMonthNumber(date: Date): number {
  return Number(
    new Intl.DateTimeFormat("en-GB", {
      month: "numeric",
      timeZone: "Europe/London",
    }).format(date),
  );
}

function computeHumidityContribution(humidity: number): number {
  if (humidity <= 60) {
    return 0;
  }

  const effectiveHumidity = Math.min(100, humidity);
  return ((effectiveHumidity - 60) / 40) * 24;
}

function computeTemperatureContribution(temperatureC: number): number {
  if (temperatureC < 7) {
    return -100;
  }

  const distanceFromIdeal = Math.abs(temperatureC - 15);
  return Math.max(0, 18 - distanceFromIdeal * 2);
}

function applyWindSuppressor(score: number, windMph: number): number {
  if (windMph <= 7) {
    return Math.max(0, score);
  }

  if (windMph >= 12) {
    return 0;
  }

  const factor = 1 - (windMph - 7) / 5;
  return Math.max(0, score * factor);
}

function getDiurnalMultiplier(target: Date, sunrise: Date, sunset: Date): number {
  const targetMs = target.getTime();
  const sunriseMs = sunrise.getTime();
  const sunsetMs = sunset.getTime();
  const minute = 60 * 1000;

  if (targetMs >= sunsetMs - 60 * minute && targetMs <= sunsetMs + 90 * minute) {
    return 1.2;
  }

  if (targetMs >= sunriseMs - 60 * minute && targetMs <= sunriseMs + 60 * minute) {
    return 1;
  }

  const hour = Number(new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  }).format(target));

  if (hour <= 3 || (targetMs > sunsetMs + 90 * minute && targetMs < sunriseMs - 60 * minute)) {
    return 0.25;
  }

  return 0.7;
}

function isWithinHour(target: Date, anchor: Date): boolean {
  const hourWindow = 60 * 60 * 1000;
  return Math.abs(target.getTime() - anchor.getTime()) <= hourWindow;
}

export function getAffiliateTierForBand(band: PublicBand): AffiliateTier {
  if (band === "Very High") {
    return "veryHigh";
  }

  if (band === "High") {
    return "high";
  }

  if (band === "Guarded" || band === "Moderate") {
    return "moderate";
  }

  return "none";
}
