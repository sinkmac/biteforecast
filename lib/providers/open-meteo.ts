import type { LocationPage } from "../../content/locations/types";
import type { TimePreset, LiveWeatherSnapshot } from "../calculator/engine";

const OPEN_METEO_BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function fetchOpenMeteoSnapshot(args: {
  location: LocationPage;
  currentDate: Date;
  preset: TimePreset;
}): Promise<LiveWeatherSnapshot | null> {
  const { location, currentDate, preset } = args;

  const url = new URL(OPEN_METEO_BASE_URL);
  url.searchParams.set("latitude", String(location.coordinates.latitude));
  url.searchParams.set("longitude", String(location.coordinates.longitude));
  url.searchParams.set("hourly", "temperature_2m,relative_humidity_2m,wind_speed_10m");
  url.searchParams.set("daily", "sunrise,sunset");
  url.searchParams.set("forecast_days", "2");
  url.searchParams.set("wind_speed_unit", "mph");
  url.searchParams.set("timezone", "Europe/London");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as OpenMeteoResponse;
    const targetTimeIso = resolveTargetTimeIso(payload, currentDate, preset);

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
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

type OpenMeteoResponse = {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
  };
  daily: {
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
