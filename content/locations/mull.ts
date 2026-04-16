import { BANDS } from "../../lib/scoring/bands";

import { STANDARD_SEASONAL_BANDS } from "./seasonal-bands";
import type { LocationPage } from "./types";

export const mullLocationPage: LocationPage = {
  slug: "mull-midges",
  name: "Isle of Mull",
  region: "Inner Hebrides",
  broaderArea: "West Coast islands",
  coordinates: { latitude: 56.4469, longitude: -6.0008 },
  seasonalFallbackByMonth: STANDARD_SEASONAL_BANDS,
  terrainType: "island mix of coast, lochside, woodland pockets, and sheltered inland roads",
  intro:
    "Mull combines exposed coastal travel with quieter inland pockets that can feel much more midge-prone than visitors expect. Like Skye, the island effect is not simply 'windy equals safe'; stop choice and local shelter still matter a lot for comfort.",
  seasonalSummary: [
    "Midge pressure on Mull generally builds from late May, peaks through June and July, and can remain noticeable in August when calm humid conditions settle in.",
    "Open island travel often feels easier, but sheltered inland and lochside pauses can still be classic midge trouble spots.",
  ],
  terrainNote: [
    "The planning key on Mull is the contrast between exposed roads, coast, and viewpoints versus inland shelter, damp grass, and calmer evening stops.",
    "For a visitor, that means island-wide weather headlines are useful but not enough on their own.",
  ],
  planningTakeaway:
    "Plan Mull around exposed movement and cautious evening stops. The island can feel easy by day and much less comfortable once the air drops still in sheltered places.",
  bestWindowsSummary:
    "Exposed coastal daytime windows with moving air are often the easiest for most visitors.",
  worstWindowsSummary:
    "Still inland or lochside evening periods are usually the highest nuisance windows.",
  calmerExperienceTip:
    "Keep longer pauses for more open spots if the weather looks close and humid.",
  campingTip:
    "Treat sheltered summer camps and lochside pauses as higher-risk even if the wider island looks breezy on paper.",
  timePatterns: [
    { label: "Late May", typicallyBetter: "Open daytime coastal windows", typicallyWorse: "Still inland evenings", terrainNote: "Coast and inland shelter can feel very different on the same day." },
    { label: "June", typicallyBetter: "Breezier daytime periods", typicallyWorse: "Dusk around calmer inland spots", terrainNote: "Sheltered routes and stopping points are the planning risk." },
    { label: "July", typicallyBetter: "Wind-exposed daytime travel", typicallyWorse: "Warm, humid evening pauses", terrainNote: "Island travel can mask how quickly nuisance rises when you stop in shelter." },
    { label: "August", typicallyBetter: "Fresher daytime weather", typicallyWorse: "Settled evenings after damp spells", terrainNote: "Residual moisture and shelter are the main late-season warning signs." },
  ],
  faqs: [
    { question: "Are midges bad on Mull in summer?", answer: "They can be, especially in sheltered inland or lochside spots during calm summer evenings." },
    { question: "Does the coast make Mull easier for midges?", answer: "Often yes, but only if you stay exposed. Inland shelter can still feel much worse." },
    { question: "Should I check live conditions for Mull before travelling?", answer: "Yes. Use this page for pattern planning, then the live calculator for current conditions and day-of decisions." },
  ],
  planningRiskBand: BANDS.moderate,
  liveCalculatorHref: "/midge-wind-watch/?location=Isle%20of%20Mull",
  affiliateCategory: "moderate-risk planning kit",
};

