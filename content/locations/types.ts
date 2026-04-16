import type { PublicBand } from "@/lib/scoring/bands";

export type TimeOfDayPattern = {
  label: string;
  typicallyBetter: string;
  typicallyWorse: string;
  terrainNote: string;
};

export type LocationFaq = {
  question: string;
  answer: string;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type SeasonalBandByMonth = Record<number, PublicBand>;

export type LocationPage = {
  slug: string;
  name: string;
  region: string;
  broaderArea: string;
  coordinates: Coordinates;
  seasonalFallbackByMonth: SeasonalBandByMonth;
  terrainType: string;
  intro: string;
  seasonalSummary: string[];
  terrainNote: string[];
  planningTakeaway: string;
  bestWindowsSummary: string;
  worstWindowsSummary: string;
  calmerExperienceTip: string;
  campingTip: string;
  timePatterns: TimeOfDayPattern[];
  faqs: LocationFaq[];
  planningRiskBand: PublicBand;
  liveCalculatorHref: string;
  affiliateCategory: string;
};
