import { BANDS } from "../../lib/scoring/bands";

import type { LocationPage } from "./types";

export const glencoeLocationPage: LocationPage = {
  slug: "glencoe-midges",
  name: "Glencoe",
  region: "Lochaber",
  broaderArea: "West Highlands",
  terrainType: "sheltered glen with steep valley walls, burns, and damp ground",
  intro:
    "Glencoe is one of the clearest examples of why Scottish midges are a planning problem rather than just a weather problem. Even when the wider forecast looks breezy, the valley floor, lochside stops, and sheltered evening parking areas can feel much more midge-friendly than the ridgelines above them.",
  seasonalSummary: [
    "Midge pressure in Glencoe typically builds from late May, peaks across June and July, and can remain annoying into August whenever the air is still, mild, and humid.",
    "Early spring and late autumn are often easier, but calm damp evenings can still feel worse than visitors expect if they are parked low in the glen or lingering near water.",
  ],
  terrainNote: [
    "The glen floor traps humid air and gives midges the kind of sheltered, damp conditions they favour, especially around burns, loch edges, campsites, and roadside stops.",
    "Higher, more exposed ground can feel dramatically better, which is why a breezy ridge walk does not always translate into a comfortable pub garden or van stop at dusk.",
  ],
  planningTakeaway:
    "Treat Glencoe as a place where terrain matters as much as the regional weather line. Timing, exposure, and where you stop will usually matter more than broad daily summaries.",
  bestWindowsSummary:
    "Exposed, brighter daytime windows with moving air are often the easiest for many visitors.",
  worstWindowsSummary:
    "Sheltered evening and dusk periods in summer are the most likely to feel uncomfortable.",
  calmerExperienceTip:
    "If you can, stop in more exposed lay-bys or viewpoints first and leave sheltered valley-floor pauses for shorter windows.",
  campingTip:
    "If camping or cooking low in the glen, assume the nuisance level can rise quickly toward dusk even when the wider forecast looks reasonable.",
  timePatterns: [
    {
      label: "Late May",
      typicallyBetter: "Late morning to mid-afternoon in exposed stops",
      typicallyWorse: "Calm evenings and damp dusk periods",
      terrainNote: "Valley-floor lay-bys and sheltered campsite edges often feel worse than passing traffic viewpoints.",
    },
    {
      label: "June",
      typicallyBetter: "Brighter daytime windows with a bit of breeze",
      typicallyWorse: "Dusk, still evenings, and sheltered lochside pauses",
      terrainNote: "Peak nuisance often shows up low in the glen even when higher ground feels airy.",
    },
    {
      label: "July",
      typicallyBetter: "Exposed daytime walks and breezier ridge access points",
      typicallyWorse: "Warm, humid evenings and low-shelter camping spots",
      terrainNote: "The difference between open roadside stops and tucked-in woodland edges can be stark.",
    },
    {
      label: "August",
      typicallyBetter: "Moving-air daytime periods after fresher weather",
      typicallyWorse: "Still evenings after damp spells",
      terrainNote: "Late-summer nuisance often lingers in damp sheltered pockets rather than every stop equally.",
    },
  ],
  faqs: [
    {
      question: "Are midges bad in Glencoe in July?",
      answer:
        "July is one of the months when Glencoe can feel especially midge-prone, particularly in sheltered places toward dusk. Exposed stops and breezier daytime windows are often more manageable.",
    },
    {
      question: "What time of day are midges worst in Glencoe?",
      answer:
        "For many visitors, the worst windows are calm evening and dusk periods when the valley floor stays humid and still.",
    },
    {
      question: "Does wind help in Glencoe?",
      answer:
        "Yes, but terrain matters. A breezy forecast can still feel much calmer in sheltered glen-floor locations than on exposed ridges or viewpoints.",
    },
  ],
  planningRiskBand: BANDS.moderate,
  liveCalculatorHref: "/midge-wind-watch/?location=Glencoe",
  affiliateCategory: "moderate-risk planning kit",
};
