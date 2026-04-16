import { BANDS } from "../../lib/scoring/bands";

import type { LocationPage } from "./types";

export const skyeLocationPage: LocationPage = {
  slug: "skye-midges",
  name: "Isle of Skye",
  region: "Inner Hebrides",
  broaderArea: "Northwest Highlands and Islands",
  terrainType: "island mix of coast, moorland, sheltered inlets, and lochside stops",
  intro:
    "Skye can fool visitors because it often looks windswept on the big scenic lines while still holding pockets of sheltered, damp air around campsites, woodland edges, and lochside stops. The island is best treated as a place where exposure changes quickly, so your comfort level can shift a lot between open coast and tucked-in ground.",
  seasonalSummary: [
    "On Skye, midge pressure typically builds from late May, becomes more noticeable through June and July, and can stay irritating into August whenever conditions turn still and humid.",
    "Open coastal stretches are often easier, but sheltered inland glens, campsite edges, and calm evenings can still feel intensely midge-friendly during peak summer windows.",
  ],
  terrainNote: [
    "The island's exposed ridges and coastal roads often create a false sense of safety. Move just a little lower or deeper into shelter and the midge pressure can rise quickly.",
    "This is why Skye works well as a place-pattern page: broad weather matters, but terrain transitions matter just as much for the actual visitor experience.",
  ],
  planningTakeaway:
    "Plan Skye by exposure. Coast and open viewpoints are often easier; sheltered evening stops and inland stillness are where the nuisance usually builds.",
  bestWindowsSummary:
    "Exposed coastal daytime windows with moving air are often the easiest for most visitors.",
  worstWindowsSummary:
    "Calm inland evenings and sheltered campsite periods in summer are the most likely to feel uncomfortable.",
  calmerExperienceTip:
    "If you are stopping for food or photos, favour exposed lay-bys and open viewpoints before settling into more sheltered spots later on.",
  campingTip:
    "For camping, assume midge pressure can climb sharply once the air settles, especially near lochs, damp grass, and sheltered pitches.",
  timePatterns: [
    {
      label: "Late May",
      typicallyBetter: "Open daytime periods on exposed coasts or higher viewpoints",
      typicallyWorse: "Still evenings near damp grass or sheltered bays",
      terrainNote: "The contrast between exposed roadside stops and tucked-in camp areas is already noticeable.",
    },
    {
      label: "June",
      typicallyBetter: "Brighter daytime windows with steady coastal airflow",
      typicallyWorse: "Dusk in sheltered inland or lochside areas",
      terrainNote: "Interior shelter often matters more than the island-wide forecast headline.",
    },
    {
      label: "July",
      typicallyBetter: "Windy daytime periods on open ground",
      typicallyWorse: "Humid summer evenings in still pockets",
      terrainNote: "Midges often feel most aggressive where visitors stop low and sheltered rather than while moving on exposed ground.",
    },
    {
      label: "August",
      typicallyBetter: "Fresher post-front daytime windows",
      typicallyWorse: "Settled evenings after damp weather",
      terrainNote: "Late-summer nuisance lingers longest in calm sheltered pockets.",
    },
  ],
  faqs: [
    {
      question: "Are midges bad on Skye in July?",
      answer:
        "July can be one of the more midge-prone months on Skye, especially in sheltered inland or lochside spots. Open coastal and wind-exposed areas are often easier.",
    },
    {
      question: "Is Skye too windy for midges?",
      answer:
        "Not always. Big exposed areas can feel much better, but Skye still has sheltered pockets where midges thrive once the air drops still.",
    },
    {
      question: "Should I use the planning page or the live calculator for Skye?",
      answer:
        "Use the planning page for seasonal expectations and terrain logic. Use the live calculator when you need a current or day-of decision.",
    },
  ],
  planningRiskBand: BANDS.moderate,
  liveCalculatorHref: "/midge-wind-watch/?location=Isle%20of%20Skye",
  affiliateCategory: "moderate-risk planning kit",
};
