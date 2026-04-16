export const BANDS = {
  low: "Low",
  guarded: "Guarded",
  moderate: "Moderate",
  high: "High",
  veryHigh: "Very High",
} as const;

export type PublicBand = (typeof BANDS)[keyof typeof BANDS];

const BAND_ADVICE: Record<PublicBand, string> = {
  [BANDS.low]: "Likely manageable unless you stop in very sheltered damp spots.",
  [BANDS.guarded]:
    "Could get annoying if the air drops still, especially later in the day.",
  [BANDS.moderate]:
    "Expect nuisance in sheltered spots, especially toward dusk.",
  [BANDS.high]:
    "Sheltered stops are likely to be uncomfortable without protection.",
  [BANDS.veryHigh]:
    "Strong nuisance likely in sheltered areas — change timing, location, or kit if you can.",
};

export function normalizeScore(score: number): number {
  if (Number.isNaN(score)) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(score)));
}

export function getBandForScore(score: number): PublicBand {
  const normalizedScore = normalizeScore(score);

  if (normalizedScore <= 19) {
    return BANDS.low;
  }

  if (normalizedScore <= 39) {
    return BANDS.guarded;
  }

  if (normalizedScore <= 64) {
    return BANDS.moderate;
  }

  if (normalizedScore <= 84) {
    return BANDS.high;
  }

  return BANDS.veryHigh;
}

export function getBandAdvice(band: PublicBand): string {
  return BAND_ADVICE[band];
}
