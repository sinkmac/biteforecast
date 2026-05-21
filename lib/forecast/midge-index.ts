export type MidgeIndexInput = {
  temperatureC: number;
  windMph: number;
  humidity: number;
  month: number;
  time: Date;
  dawn: Date;
  dusk: Date;
  uvIndex?: number;
};

export type MidgeLabel = "Low" | "Moderate" | "High" | "Severe" | "Extreme";

export function calculateMidgeIndex(input: MidgeIndexInput): number {
  if (input.month === 11 || input.month === 12 || input.month <= 3) {
    return 0;
  }

  const tempScore = getTemperatureScore(input.temperatureC);
  const windMultiplier = getWindMultiplier(input.windMph);
  const humidityBoost = getHumidityBoost(input.humidity);
  const duskDawnMultiplier = getDuskDawnMultiplier(input);
  const raw = (tempScore + humidityBoost) * windMultiplier * duskDawnMultiplier;

  return Math.min(10, Math.round(raw * 2));
}

export function getMidgeLabel(index: number): MidgeLabel {
  if (index <= 2) return "Low";
  if (index <= 4) return "Moderate";
  if (index <= 6) return "High";
  if (index <= 8) return "Severe";
  return "Extreme";
}

export function getMidgeRecommendation(index: number): string {
  const label = getMidgeLabel(index);

  switch (label) {
    case "Low":
      return "No special precautions needed.";
    case "Moderate":
      return "Light repellent if spending time near water or forestry.";
    case "High":
      return "Apply repellent before going out. Avoid standing water at dusk.";
    case "Severe":
      return "Long sleeves, repellent essential. Avoid exposed areas between 7pm and 10pm.";
    case "Extreme":
      return "Consider changing plans. If you must go out, full cover and repellent. Get back inside before dusk.";
  }
}

export function getMidgeLevelClasses(index: number): string {
  const label = getMidgeLabel(index);

  switch (label) {
    case "Low":
      return "border-emerald-400/50 bg-emerald-500/15 text-emerald-100";
    case "Moderate":
      return "border-yellow-300/60 bg-yellow-400/15 text-yellow-100";
    case "High":
      return "border-amber-400/70 bg-amber-500/15 text-amber-100";
    case "Severe":
      return "border-red-400/70 bg-red-500/15 text-red-100";
    case "Extreme":
      return "border-red-950 bg-red-950/80 text-red-100";
  }
}

export function getMidgePlainEnglish(args: {
  index: number;
  locationName: string;
  temp: number;
  windMph: number;
  humidity: number;
}): string {
  if (args.index <= 2) {
    return `Moving air or poor midge conditions are keeping activity low at ${args.locationName}.`;
  }

  if (args.index <= 4) {
    return `Some midges are likely around sheltered or damp spots at ${args.locationName}; keep repellent handy.`;
  }

  if (args.index <= 6) {
    return `Warm, humid or sheltered conditions mean midges are active at ${args.locationName}; repellent is recommended.`;
  }

  if (args.index <= 8) {
    return `Still air, humid, and warm this evening — conditions are near-perfect for midges at ${args.locationName}.`;
  }

  return `Conditions are extremely favourable for midges at ${args.locationName}; avoid exposed dusk stops if you can.`;
}

function getTemperatureScore(temperatureC: number): number {
  if (temperatureC < 7) return 0;
  if (temperatureC < 10) return 1;
  if (temperatureC < 15) return 2.5;
  if (temperatureC < 20) return 3;
  if (temperatureC <= 25) return 2;
  return 0.5;
}

function getWindMultiplier(windMph: number): number {
  if (windMph <= 3) return 1;
  if (windMph <= 7) return 0.7;
  if (windMph <= 12) return 0.3;
  return 0.1;
}

function getHumidityBoost(humidity: number): number {
  if (humidity < 60) return 0;
  if (humidity <= 75) return 0.5;
  if (humidity <= 85) return 1;
  return 2;
}

function getDuskDawnMultiplier(input: MidgeIndexInput): number {
  const time = input.time.getTime();
  const dusk = input.dusk.getTime();
  const dawn = input.dawn.getTime();
  const minute = 60 * 1000;

  if (time >= dusk - 60 * minute && time <= dusk + 90 * minute) {
    return 1.4;
  }

  if (time >= dawn - 60 * minute && time <= dawn + 60 * minute) {
    return 1.2;
  }

  if ((input.uvIndex ?? 0) >= 4) {
    return 0.5;
  }

  return 1;
}
