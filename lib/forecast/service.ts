import { FORECAST_LOCATIONS, type ForecastLocation } from "./locations";
import {
  calculateMidgeIndex,
  getMidgeLabel,
  getMidgePlainEnglish,
  getMidgeRecommendation,
  type MidgeLabel,
} from "./midge-index";

export type ForecastPoint = {
  time: Date;
  index: number;
  temp: number;
  windMph: number;
  humidity: number;
};

export type MidgeForecast = {
  location: ForecastLocation;
  generated: Date;
  nextUpdate: Date;
  current: {
    index: number;
    label: MidgeLabel;
    temp: number;
    windMph: number;
    humidity: number;
    peakTonight: number;
    peakTime: string;
    sentence: string;
    recommendation: string;
  };
  hourly: ForecastPoint[];
  daily: Array<{
    date: Date;
    peakIndex: number;
    label: MidgeLabel;
    recommendation: string;
  }>;
};

type OpenMeteoForecast = {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
    uv_index?: number[];
  };
  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
  };
};

const forecastCache = new Map<string, { expires: number; data: MidgeForecast }>();
const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

export async function getMidgeForecast(slug: string): Promise<MidgeForecast | null> {
  const location = FORECAST_LOCATIONS.find((item) => item.slug === slug);

  if (!location) {
    return null;
  }

  return getMidgeForecastForLocation(location);
}

export async function getMidgeForecastForLocation(location: ForecastLocation): Promise<MidgeForecast> {
  const cacheKey = location.slug;
  const cached = forecastCache.get(cacheKey);
  const now = Date.now();

  if (cached && cached.expires > now) {
    return cached.data;
  }

  const payload = await fetchOpenMeteoForecast(location).catch(() => buildFallbackOpenMeteoForecast(location));
  const forecast = buildForecastFromOpenMeteo(location, payload, new Date());
  forecastCache.set(cacheKey, { expires: now + THREE_HOURS_MS, data: forecast });
  return forecast;
}

export async function getHomepageForecastSummaries() {
  return Promise.all(
    FORECAST_LOCATIONS.map(async (location) => {
      const forecast = await getMidgeForecastForLocation(location);
      return {
        location,
        index: forecast.current.index,
        label: forecast.current.label,
      };
    }),
  );
}

async function fetchOpenMeteoForecast(location: ForecastLocation): Promise<OpenMeteoForecast> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(location.lat));
  url.searchParams.set("longitude", String(location.lng));
  url.searchParams.set("hourly", "temperature_2m,relative_humidity_2m,wind_speed_10m,uv_index");
  url.searchParams.set("daily", "sunrise,sunset");
  url.searchParams.set("forecast_days", "5");
  url.searchParams.set("wind_speed_unit", "mph");
  url.searchParams.set("timezone", "Europe/London");

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Open-Meteo forecast failed for ${location.slug}: ${response.status}`);
  }

  return (await response.json()) as OpenMeteoForecast;
}

function buildForecastFromOpenMeteo(
  location: ForecastLocation,
  payload: OpenMeteoForecast,
  generated: Date,
): MidgeForecast {
  const points: ForecastPoint[] = payload.hourly.time
    .slice(0, 5 * 24)
    .filter((_, index) => index % 3 === 0)
    .slice(0, 40)
    .map((iso) => {
      const index = payload.hourly.time.indexOf(iso);
      const date = new Date(iso);
      const dayIndex = resolveDayIndex(payload.daily.time, iso);
      const dawn = new Date(payload.daily.sunrise[dayIndex] ?? payload.daily.sunrise[0]);
      const dusk = new Date(payload.daily.sunset[dayIndex] ?? payload.daily.sunset[0]);
      const month = date.getMonth() + 1;
      const temp = payload.hourly.temperature_2m[index];
      const windMph = payload.hourly.wind_speed_10m[index];
      const humidity = payload.hourly.relative_humidity_2m[index];
      const uvIndex = payload.hourly.uv_index?.[index] ?? 0;

      return {
        time: date,
        index: calculateMidgeIndex({
          temperatureC: temp,
          windMph,
          humidity,
          month,
          time: date,
          dawn,
          dusk,
          uvIndex,
        }),
        temp,
        windMph,
        humidity,
      };
    });

  const currentPoint = points[0] ?? {
    time: generated,
    index: 0,
    temp: 0,
    windMph: 0,
    humidity: 0,
  };
  const tonightIso = toDateIso(currentPoint.time);
  const eveningTonightPoints = points.filter((point) => {
    return toDateIso(point.time) === tonightIso && getLondonHour(point.time) >= 17;
  });
  const tonightPoints = eveningTonightPoints.length
    ? eveningTonightPoints
    : points.filter((point) => toDateIso(point.time) === tonightIso);
  const peakTonightPoint = tonightPoints.reduce(
    (peak, point) => (point.index > peak.index ? point : peak),
    currentPoint,
  );

  const daily = payload.daily.time.slice(0, 5).map((dateIso) => {
    const dayPoints = points.filter((point) => toDateIso(point.time) === dateIso);
    const peakIndex = dayPoints.length ? Math.max(...dayPoints.map((point) => point.index)) : 0;
    return {
      date: new Date(`${dateIso}T12:00:00`),
      peakIndex,
      label: getMidgeLabel(peakIndex),
      recommendation: getMidgeRecommendation(peakIndex),
    };
  });

  const label = getMidgeLabel(currentPoint.index);

  return {
    location,
    generated,
    nextUpdate: new Date(generated.getTime() + THREE_HOURS_MS),
    current: {
      index: currentPoint.index,
      label,
      temp: currentPoint.temp,
      windMph: currentPoint.windMph,
      humidity: currentPoint.humidity,
      peakTonight: peakTonightPoint.index,
      peakTime: formatTime(peakTonightPoint.time),
      sentence: getMidgePlainEnglish({
        index: currentPoint.index,
        locationName: location.name,
        temp: currentPoint.temp,
        windMph: currentPoint.windMph,
        humidity: currentPoint.humidity,
      }),
      recommendation: getMidgeRecommendation(currentPoint.index),
    },
    hourly: points,
    daily,
  };
}

function buildFallbackOpenMeteoForecast(location: ForecastLocation): OpenMeteoForecast {
  const start = new Date();
  start.setMinutes(0, 0, 0);
  const hourly = {
    time: [] as string[],
    temperature_2m: [] as number[],
    relative_humidity_2m: [] as number[],
    wind_speed_10m: [] as number[],
    uv_index: [] as number[],
  };
  const daily = {
    time: [] as string[],
    sunrise: [] as string[],
    sunset: [] as string[],
  };

  for (let day = 0; day < 5; day += 1) {
    const dayDate = new Date(start.getTime() + day * 24 * 60 * 60 * 1000);
    const dateIso = toDateIso(dayDate);
    daily.time.push(dateIso);
    daily.sunrise.push(`${dateIso}T04:45`);
    daily.sunset.push(`${dateIso}T21:45`);
  }

  for (let hour = 0; hour < 5 * 24; hour += 1) {
    const date = new Date(start.getTime() + hour * 60 * 60 * 1000);
    const localHour = Number(new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      hour12: false,
      timeZone: "Europe/London",
    }).format(date));
    const iso = `${toDateIso(date)}T${String(localHour).padStart(2, "0")}:00`;
    hourly.time.push(iso);
    hourly.temperature_2m.push(15);
    hourly.relative_humidity_2m.push(location.lng < -4.8 ? 82 : 72);
    hourly.wind_speed_10m.push(location.lng < -4.8 ? 5 : 7);
    hourly.uv_index.push(localHour >= 11 && localHour <= 15 ? 5 : 0);
  }

  return { hourly, daily };
}

function resolveDayIndex(dayIsos: string[], hourIso: string): number {
  const dateIso = hourIso.slice(0, 10);
  const index = dayIsos.indexOf(dateIso);
  return index === -1 ? 0 : index;
}

function toDateIso(date: Date) {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function getLondonHour(date: Date): number {
  return Number(new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    hour12: false,
    timeZone: "Europe/London",
  }).format(date));
}

export function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Europe/London",
  })
    .format(date)
    .toLowerCase()
    .replace(" ", "");
}

export function formatDateTime(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Europe/London",
  })
    .format(date)
    .toLowerCase();
}
