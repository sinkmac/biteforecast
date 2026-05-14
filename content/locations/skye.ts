import { BANDS } from "../../lib/scoring/bands";

import { STANDARD_SEASONAL_BANDS } from "./seasonal-bands";
import type { LocationPage } from "./types";

export const skyeLocationPage: LocationPage = {
  slug: "isle-of-skye-midges",
  name: "Isle of Skye",
  h1: "Midges on Skye: when they're bad, when they're not, and how to deal with them",
  region: "Inner Hebrides",
  broaderArea: "Northwest Highlands and Islands",
  coordinates: { latitude: 57.412525, longitude: -6.194458 },
  seasonalFallbackByMonth: STANDARD_SEASONAL_BANDS,
  terrainType: "island mix of windward coast, exposed viewpoints, sheltered glens, damp paths, campsites, and lochside stops",
  intro:
    "Skye has earned its midge reputation. It is wet, green, exposed in some places and very sheltered in others. That mix catches out road trip visitors who step out at the Fairy Pools, Quiraing or a quiet lay-by and realise they have brought a camera but no repellent. If the Skye midge forecast is bad and the wind drops, expect trouble.",
  seasonalSummary: [
    "The main season usually runs from late May through September. June, July and August are the months to plan for, with September still capable of being annoying if the weather stays mild and damp.",
    "Dawn and dusk are the worst times. Visitors often chase early photos, sunset stops and quiet evening walks, but still water, damp grass, campsite edges and sheltered glens can turn unpleasant quickly.",
  ],
  terrainNote: [
    "Wind decides a lot on Skye. The windward west coast can feel completely different from a sheltered glen or wooded burn only a short drive away, so do not judge the whole island from one breezy viewpoint.",
    "The Fairy Pools, Quiraing and parts of Trotternish can all be classic midge traps in still conditions. Not every visit will be bad, but when the forecast lines up with calm air, the midges do not need long.",
  ],
  planningTakeaway:
    "Use the Skye midge forecast with common sense. A windy headland may be fine while a sheltered glen is miserable. If the risk is high, take protection before you leave the car.",
  bestWindowsSummary:
    "Windy days, exposed coastal stops, open viewpoints and the middle of the day are usually easier.",
  worstWindowsSummary:
    "Still dawns, dusks, campsites, Fairy Pools stops, sheltered glens and damp paths are the classic traps.",
  calmerExperienceTip:
    "If you are travelling by ferry or doing a road trip, buy repellent before you need it. The mistake is waiting until the first bad stop.",
  campingTip:
    "If you are camping, cooking outdoors, waiting for photos or standing beside water, midges can become the main event on a still evening.",
  timePatterns: [
    {
      label: "Late May",
      typicallyBetter: "Open daytime periods on exposed coasts or higher viewpoints",
      typicallyWorse: "Still evenings near damp grass, sheltered bays or campsites",
      terrainNote: "The contrast between exposed roadside stops and tucked-in camp areas is already noticeable.",
    },
    {
      label: "June",
      typicallyBetter: "Brighter daytime windows with steady coastal airflow",
      typicallyWorse: "Dusk in sheltered inland, Fairy Pools-style or lochside areas",
      terrainNote: "Interior shelter often matters more than the island-wide forecast headline.",
    },
    {
      label: "July",
      typicallyBetter: "Windy daytime periods on open ground",
      typicallyWorse: "Humid summer evenings in still pockets around Quiraing, Trotternish and campsites",
      terrainNote: "Midges often feel most aggressive where visitors stop low and sheltered rather than while moving on exposed ground.",
    },
    {
      label: "August to September",
      typicallyBetter: "Fresher post-front daytime windows",
      typicallyWorse: "Settled evenings after damp weather",
      terrainNote: "Late-summer nuisance lingers longest in calm sheltered pockets.",
    },
  ],
  faqs: [
    {
      question: "Are midges bad on the Isle of Skye?",
      answer:
        "They can be, especially from late May through September in still, damp, sheltered conditions. Wind-exposed coastal stops are often easier.",
    },
    {
      question: "Are there midges at the Fairy Pools?",
      answer:
        "Yes, the Fairy Pools can be a classic midge trap in still conditions, especially around dawn, dusk and damp summer weather.",
    },
    {
      question: "Is Skye too windy for midges?",
      answer:
        "Not always. Big exposed areas can feel much better, but Skye still has sheltered pockets where midges thrive once the air drops still.",
    },
  ],
  planningRiskBand: BANDS.moderate,
  liveCalculatorHref: "/midge-wind-watch/?location=Isle%20of%20Skye",
  affiliateCategory: "island high-risk planning kit",
};
