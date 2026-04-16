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

export type LocationPage = {
  slug: string;
  name: string;
  region: string;
  broaderArea: string;
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
