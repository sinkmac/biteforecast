import { BANDS } from "../../lib/scoring/bands";

import { STANDARD_SEASONAL_BANDS } from "./seasonal-bands";
import type { LocationPage } from "./types";

export const lochLomondLocationPage: LocationPage = {
  slug: "loch-lomond-midges",
  name: "Loch Lomond",
  region: "Loch Lomond and The Trossachs",
  broaderArea: "West Central Scotland",
  coordinates: { latitude: 56.0833, longitude: -4.5833 },
  seasonalFallbackByMonth: STANDARD_SEASONAL_BANDS,
  terrainType: "lochside, wooded shorelines, sheltered bays, and low rolling hills",
  intro:
    "Loch Lomond is one of the easiest places for visitors to underestimate midges because the setting feels open at first glance while many stops are actually low, sheltered, and damp. The loch edge, wooded banks, and slower evening air all create the kind of planning conditions where midge nuisance can build fast.",
  seasonalSummary: [
    "Loch Lomond typically becomes more midge-prone from late May, with June and July often feeling the strongest when the air is calm, mild, and humid.",
    "Daytime stops can feel manageable on brighter breezier days, but evenings near the shoreline and sheltered tree cover are often a different story.",
  ],
  terrainNote: [
    "Lochside settings and wooded edges are the main planning clue here. Even when the wider area looks fresh, sheltered bays and campsite-style ground can hold much stiller air.",
    "That makes Loch Lomond a classic place-pattern location: useful for planning, but not a place to pretend a static page knows the exact live conditions for each shore or bay.",
  ],
  planningTakeaway:
    "Plan around exposure and timing. Open daytime windows are usually easier; sheltered lochside evenings are where the nuisance risk climbs.",
  bestWindowsSummary:
    "Brighter daytime windows with a bit of air moving across the shore are often the easiest for most visitors.",
  worstWindowsSummary:
    "Still evenings and dusk near sheltered shoreline or wooded banks are usually the hardest windows.",
  calmerExperienceTip:
    "Favour more exposed viewpoints and shorter low-shore pauses later in the day.",
  campingTip:
    "If stopping overnight nearby, expect the nuisance level to rise quickly once the air settles around trees, water, and damp grass.",
  timePatterns: [
    { label: "Late May", typicallyBetter: "Late morning and early afternoon in open shore stretches", typicallyWorse: "Still evenings near wooded or damp ground", terrainNote: "Sheltered bays often feel worse than exposed roadside viewpoints." },
    { label: "June", typicallyBetter: "Breezier daytime windows", typicallyWorse: "Dusk and sheltered lochside stops", terrainNote: "Tree cover and calmer shoreline air are the main planning risks." },
    { label: "July", typicallyBetter: "Open daytime periods with moving air", typicallyWorse: "Humid evenings by the water", terrainNote: "Low sheltered ground near the shore can hold midge pressure surprisingly well." },
    { label: "August", typicallyBetter: "Fresher daytime windows after windy weather", typicallyWorse: "Settled evenings after damp days", terrainNote: "Late-summer nuisance usually lingers in the calmer pockets." },
  ],
  faqs: [
    { question: "Are midges bad at Loch Lomond in summer?", answer: "They can be, especially in June and July when evenings turn still and humid near the shoreline and wooded shelter." },
    { question: "When are midges worst at Loch Lomond?", answer: "For many visitors, the worst windows are calm evening and dusk periods near sheltered lochside ground." },
    { question: "Should I use the live calculator for Loch Lomond?", answer: "Yes. Use this page for planning by season and terrain pattern, then check the live calculator for current conditions before you go." },
  ],
  planningRiskBand: BANDS.moderate,
  liveCalculatorHref: "/midge-wind-watch/?location=Loch%20Lomond",
  affiliateCategory: "moderate-risk planning kit",
};

