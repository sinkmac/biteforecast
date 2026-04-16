import { BANDS } from "../../lib/scoring/bands";

import { STANDARD_SEASONAL_BANDS } from "./seasonal-bands";
import type { LocationPage } from "./types";

export const torridonLocationPage: LocationPage = {
  slug: "torridon-midges",
  name: "Torridon",
  region: "Wester Ross",
  broaderArea: "Northwest Highlands",
  coordinates: { latitude: 57.5486, longitude: -5.5048 },
  seasonalFallbackByMonth: STANDARD_SEASONAL_BANDS,
  terrainType: "mountain base, lochside, glen shelter, and exposed high-level terrain",
  intro:
    "Torridon is one of the best examples of why exposed mountain scenery does not guarantee an easy midge experience. The surrounding ridges can feel clear and airy while lower stops, lochside pauses, and sheltered glen sections turn markedly worse once the air settles.",
  seasonalSummary: [
    "Torridon generally becomes more midge-prone from late May through August, with the strongest nuisance often arriving in June and July when conditions are mild, humid, and still.",
    "Daytime movement on exposed ground often feels easier than low sheltered pauses near water, camps, and roadside stop points.",
  ],
  terrainNote: [
    "The planning contrast here is sharp: open, high, and breezy feels very different from low lochside or glen shelter.",
    "That makes Torridon useful for place-pattern planning even without pretending a static page can know exact live conditions for every roadside pull-in or track.",
  ],
  planningTakeaway:
    "Assume the biggest comfort difference in Torridon comes from whether you are moving through exposed terrain or lingering low and sheltered later in the day.",
  bestWindowsSummary:
    "Open, brighter daytime windows with moving air are often the easiest.",
  worstWindowsSummary:
    "Still evening periods near lochside or glen-floor shelter are usually the toughest.",
  calmerExperienceTip:
    "Try to keep longer breaks for more exposed points and avoid long low sheltered stops if the air is close and humid.",
  campingTip:
    "Camps and sheltered evening cooking spots are where the nuisance can rise quickly in summer.",
  timePatterns: [
    { label: "Late May", typicallyBetter: "Late morning and early afternoon on exposed ground", typicallyWorse: "Still evening lochside pauses", terrainNote: "The glen-floor effect matters early in the season too." },
    { label: "June", typicallyBetter: "Breezier daytime windows", typicallyWorse: "Dusk in sheltered low ground", terrainNote: "Open mountain approaches and sheltered stopovers feel very different." },
    { label: "July", typicallyBetter: "Bright windy daytime travel", typicallyWorse: "Humid calm evenings", terrainNote: "Low lochside shelter is the planning warning sign." },
    { label: "August", typicallyBetter: "Fresher daytime periods after changing weather", typicallyWorse: "Settled damp evenings", terrainNote: "Late-season nuisance often lingers where the air stays still." },
  ],
  faqs: [
    { question: "Are midges bad in Torridon?", answer: "They can be, especially in summer when you are low, sheltered, and near damp ground or lochside air." },
    { question: "Does higher ground help in Torridon?", answer: "Often yes. Exposed higher ground usually feels easier than sheltered lower stops and camps." },
    { question: "Should I use the live calculator for Torridon?", answer: "Yes. Use this page for planning tendencies and the live calculator for current conditions." },
  ],
  planningRiskBand: BANDS.moderate,
  liveCalculatorHref: "/midge-wind-watch/?location=Torridon",
  affiliateCategory: "moderate-risk planning kit",
};

