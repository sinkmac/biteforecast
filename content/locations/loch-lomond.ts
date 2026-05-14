import { BANDS } from "../../lib/scoring/bands";

import { STANDARD_SEASONAL_BANDS } from "./seasonal-bands";
import type { LocationPage } from "./types";

export const lochLomondLocationPage: LocationPage = {
  slug: "loch-lomond-midges",
  name: "Loch Lomond",
  h1: "Midges at Loch Lomond: when they're bad, when they're not, and how to deal with them",
  region: "Loch Lomond and The Trossachs",
  broaderArea: "West Central Scotland",
  coordinates: { latitude: 56.0833, longitude: -4.5833 },
  seasonalFallbackByMonth: STANDARD_SEASONAL_BANDS,
  terrainType: "lochside, wooded shorelines, sheltered bays, low rolling hills, east-bank campsites, and easy day-trip stops",
  intro:
    "Loch Lomond catches people out because it is close to Glasgow and easy to visit. That does not make it soft on midges. You have water, trees, damp ground, campsites and sheltered banks. For day-trippers with no midge experience, a still summer evening at Loch Lomond can be a quick education.",
  seasonalSummary: [
    "The main Loch Lomond midge season usually runs from late May through September. June, July and August are the months to take seriously. September can still be bad if the weather stays mild and damp.",
    "Dawn and dusk are the worst times. That matters for camping, evening picnics, paddleboard stops, fishing and anyone trying to sit outside near the water.",
  ],
  terrainNote: [
    "Campsites on the east bank can be particularly annoying in still conditions because you have trees, water and sheltered air close together.",
    "A decent breeze across the loch can make a huge difference, while a sheltered bay or wooded path can be rough only minutes away. Day-trippers get bitten too.",
  ],
  planningTakeaway:
    "Use the Loch Lomond midge forecast before you pack the car. If the risk is high and the air is still, bring protection even for a short visit.",
  bestWindowsSummary:
    "Early spring, later autumn, breezy summer days, open shorelines and the middle of the day are usually easier.",
  worstWindowsSummary:
    "Still summer evenings beside trees and water, especially campsites, east-bank stops, bays and wooded shoreline.",
  calmerExperienceTip:
    "If you only have a few hours, avoid planning your main stop for a still evening beside trees and water.",
  campingTip:
    "Camping Loch Lomond midges can be bad around dusk. Bring Smidge, cover skin and consider a head net if you are staying near the bank.",
  timePatterns: [
    {
      label: "Late May",
      typicallyBetter: "Late morning and early afternoon in open shore stretches",
      typicallyWorse: "Still evenings near wooded or damp ground",
      terrainNote: "Sheltered bays often feel worse than exposed roadside viewpoints.",
    },
    {
      label: "June",
      typicallyBetter: "Breezier daytime windows",
      typicallyWorse: "Dusk, east-bank campsites and sheltered lochside stops",
      terrainNote: "Tree cover and calmer shoreline air are the main planning risks.",
    },
    {
      label: "July",
      typicallyBetter: "Open daytime periods with moving air",
      typicallyWorse: "Humid evenings by the water",
      terrainNote: "Low sheltered ground near the shore can hold midge pressure surprisingly well.",
    },
    {
      label: "August to September",
      typicallyBetter: "Fresher daytime windows after windy weather",
      typicallyWorse: "Settled evenings after damp days",
      terrainNote: "Late-summer nuisance usually lingers in the calmer pockets.",
    },
  ],
  faqs: [
    {
      question: "Are midges bad at Loch Lomond?",
      answer:
        "They can be, especially in June and July when evenings turn still and humid near the shoreline, campsites and wooded shelter.",
    },
    {
      question: "Where are midges worst around Loch Lomond?",
      answer:
        "Sheltered lochside ground, wooded banks, bays and east-bank campsite areas are usually more troublesome than open breezy viewpoints.",
    },
    {
      question: "Do day-trippers need midge repellent for Loch Lomond?",
      answer:
        "If the forecast is high and the air is still, yes. Even a short picnic, paddleboard stop or evening walk can become uncomfortable.",
    },
  ],
  planningRiskBand: BANDS.moderate,
  liveCalculatorHref: "/midge-wind-watch/?location=Loch%20Lomond",
  affiliateCategory: "lochside and campsite planning kit",
};
