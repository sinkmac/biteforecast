import type { LocationPage } from "../../content/locations/types";
import type { TimePreset, LiveWeatherSnapshot } from "../calculator/engine";
import type { ForecastWeatherSnapshot } from "../calculator/forecast";

const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchOpenMeteoSnapshot(args: {
  location: LocationPage;
  currentDate: Date;
  preset: TimePreset;
}): Promise<LiveWeatherSnapshot | null> {
  const payload = await fetchOpenMeteoPayload({
    location: args.location,
    forecastDays: 2,
    cacheMode: "no-store",
  });

  if (!payload) {
    return null;
  }

  const targetTimeIso = resolveTargetTimeIso(payload, args.currentDate, args.preset);

  if (!targetTimeIso) {
    return null;
  }

  const index = payload.hourly.time.indexOf(targetTimeIso);

  if (index === -1) {
    return null;
  }

  return {
    windMph: payload.hourly.wind_speed_10m[index],
    humidity: payload.hourly.relative_humidity_2m[index],
    temperatureC: payload.hourly.temperature_2m[index],
    targetTimeIso,
    sunriseIso: payload.daily.sunrise[0],
    sunsetIso: payload.daily.sunset[0],
  };
}

export async function fetchOpenMeteoSevenDayForecast(args: {
  location: LocationPage;
  currentDate: Date;
  preset: TimePreset;
}): Promise<ForecastWeatherSnapshot[] | null> {
  const payload = await fetchOpenMeteoPayload({
    location: args.location,
    forecastDays: 7,
    revalidateSeconds: 1800,
  });

  if (!payload?.daily?.time?.length) {
    return null;
  }

  const snapshots = payload.daily.time
    .map((dateIso, dayIndex) => {
      const sunriseIso = payload.daily.sunrise[dayIndex];
      const sunsetIso = payload.daily.sunset[dayIndex];
      const targetTimeIso = resolveForecastTargetTimeIso({
        payload,
        dateIso,
        currentDate: args.currentDate,
        preset: args.preset,
        sunriseIso,
        sunsetIso,
      });

      if (!targetTimeIso) {
        return null;
      }

      const index = payload.hourly.time.indexOf(targetTimeIso);

      if (index === -1) {
        return null;
      }

      return {
        dateIso,
        windMph: payload.hourly.wind_speed_10m[index],
        humidity: payload.hourly.relative_humidity_2m[index],
        temperatureC: payload.hourly.temperature_2m[index],
        targetTimeIso,
        sunriseIso,
        sunsetIso,
      };
    })
    .filter((snapshot): snapshot is ForecastWeatherSnapshot => snapshot !== null);

  return snapshots.length ? snapshots : null;
}

type OpenMeteoResponse = {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
  };
  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
  };
};

function resolveTargetTimeIso(
  payload: OpenMeteoResponse,
  currentDate: Date,
  preset: TimePreset,
): string | null {
  if (!payload.hourly?.time?.length || !payload.daily?.sunrise?.length || !payload.daily?.sunset?.length) {
    return null;
  }

  if (preset === "sunrise") {
    return findNearestHourIso(payload.hourly.time, payload.daily.sunrise[0]);
  }

  if (preset === "sunset") {
    return findNearestHourIso(payload.hourly.time, payload.daily.sunset[0]);
  }

  const nowIso = toLondonHourIso(currentDate);
  return findNearestHourIso(payload.hourly.time, nowIso);
}

function toLondonHourIso(date: Date): string {
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = Object.fromEntries(
    formatter
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

async function fetchOpenMeteoPayload(args: {
  location: LocationPage;
  forecastDays: number;
  cacheMode?: RequestCache;
  revalidateSeconds?: number;
}): Promise<OpenMeteoResponse | null> {
  const { location, forecastDays, cacheMode, revalidateSeconds } = args;

  const url = new URL(OPEN_METEO_BASE_URL);
  url.searchParams.set("latitude", String(location.coordinates.latitude));
  url.searchParams.set("longitude", String(location.coordinates.longitude));
  url.searchParams.set("hourly", "temperature_2m,relative_humidity_2m,wind_speed_10m");
  url.searchParams.set("daily", "sunrise,sunset");
  url.searchParams.set("forecast_days", String(forecastDays));
  url.searchParams.set("wind_speed_unit", "mph");
  url.searchParams.set("timezone", "Europe/London");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      cache: cacheMode,
      next: revalidateSeconds ? { revalidate: revalidateSeconds } : undefined,
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as OpenMeteoResponse;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function resolveForecastTargetTimeIso(args: {
  payload: OpenMeteoResponse;
  dateIso: string;
  currentDate: Date;
  preset: TimePreset;
  sunriseIso: string;
  sunsetIso: string;
}): string | null {
  const { payload, dateIso, currentDate, preset, sunriseIso, sunsetIso } = args;

  if (preset === "sunrise") {
    return findNearestHourIso(payload.hourly.time, sunriseIso);
  }

  if (preset === "sunset") {
    return findNearestHourIso(payload.hourly.time, sunsetIso);
  }

  const hourFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  });
  const hour = hourFormatter.format(currentDate);

  return findNearestHourIso(payload.hourly.time, `${dateIso}T${hour}:00`);
}
