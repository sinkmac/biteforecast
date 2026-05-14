import { BANDS } from "../../lib/scoring/bands";

import { STANDARD_SEASONAL_BANDS } from "./seasonal-bands";
import type { LocationPage } from "./types";

export const cairngormsLocationPage: LocationPage = {
  slug: "cairngorms-midges",
  name: "Cairngorms",
  h1: "Midges in the Cairngorms: when they're bad, when they're not, and how to deal with them",
  region: "Cairngorms National Park",
  broaderArea: "Central Highlands",
  coordinates: { latitude: 57.0783, longitude: -3.7281 },
  seasonalFallbackByMonth: STANDARD_SEASONAL_BANDS,
  terrainType: "drier national-park mix of Aviemore, sheltered glens, woodland, burns, lower campsites, moorland, and exposed mountain terrain",
  intro:
    "The Cairngorms are not the west coast. That matters. The area is generally drier, higher and more exposed than places like Glencoe, Skye or Fort William, so midge pressure is often lower. But lower does not mean none. Around Aviemore, sheltered glens, woodland, burns and lower campsites can still be bad when the air is still.",
  seasonalSummary: [
    "The main season is still late May through September, with June, July and August the months to think about. September can remain active if mild, damp weather hangs around.",
    "Dawn and dusk are the worst times around Aviemore, Rothiemurchus, Glenmore, loch edges and low-level woodland routes. Higher, windier ground is often much easier, but you still have to start, stop and return through lower areas.",
  ],
  terrainNote: [
    "Still, overcast, humid conditions are the classic problem. The Cairngorms often give you more breeze and elevation than the west coast, which is why many days are fine.",
    "The trap is assuming that means midges are not relevant. A sheltered forest path, low campsite or lochside stop on a damp evening can still be miserable.",
  ],
  planningTakeaway:
    "Cairngorms midges are usually less severe than west coast midges, but they can still spoil a stop if you are low, sheltered or still on the wrong evening.",
  bestWindowsSummary:
    "Breezy days, higher routes, open moorland, exposed ground and the middle of the day are usually easier.",
  worstWindowsSummary:
    "Still dawns and dusks around Aviemore, Glenmore, sheltered woodland, low glens, loch edges and campsites.",
  calmerExperienceTip:
    "Use the forecast alongside elevation and wind. A breezy ridge may be fine while a sheltered glen is not.",
  campingTip:
    "If you are camping low, fishing, photographing at dawn or dusk, or spending time in sheltered woodland, keep a head net in the bag.",
  timePatterns: [
    {
      label: "Late May",
      typicallyBetter: "Late morning to mid-afternoon in open areas",
      typicallyWorse: "Still evening periods near shelter",
      terrainNote: "Broad regional weather matters less than where you stop.",
    },
    {
      label: "June",
      typicallyBetter: "Breezier daytime windows and higher open routes",
      typicallyWorse: "Dusk in forest-edge, riverside or Aviemore-area low spots",
      terrainNote: "Sheltered low ground is the main planning risk.",
    },
    {
      label: "July",
      typicallyBetter: "Exposed, windier daytime movement",
      typicallyWorse: "Warm, humid calm evenings",
      terrainNote: "The contrast between open upland and low shelter is often stark.",
    },
    {
      label: "August to September",
      typicallyBetter: "Fresher daytime periods after changeable weather",
      typicallyWorse: "Settled evenings after damp days",
      terrainNote: "Residual dampness can keep nuisance elevated in shelter.",
    },
  ],
  faqs: [
    {
      question: "Are midges bad in the Cairngorms?",
      answer:
        "Usually less bad than the west coast, but still relevant in sheltered glens, around Aviemore, woodland, loch edges and lower elevations in still conditions.",
    },
    {
      question: "Are there midges around Aviemore?",
      answer:
        "Yes. Aviemore midges can be annoying on still damp evenings, especially near woodland, loch edges and lower sheltered spots.",
    },
    {
      question: "Do the Cairngorms have fewer midges on higher ground?",
      answer:
        "Often yes. Exposed higher terrain is usually easier than low sheltered stop points, but conditions can still change with wind and time of day.",
    },
  ],
  planningRiskBand: BANDS.moderate,
  liveCalculatorHref: "/midge-wind-watch/?location=Cairngorms",
  affiliateCategory: "lower-pressure but still-practical planning kit",
};
