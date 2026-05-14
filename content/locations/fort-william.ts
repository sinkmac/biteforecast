import { BANDS } from "../../lib/scoring/bands";

import { STANDARD_SEASONAL_BANDS } from "./seasonal-bands";
import type { LocationPage } from "./types";

export const fortWilliamLocationPage: LocationPage = {
  slug: "fort-william-midges",
  name: "Fort William",
  h1: "Midges in Fort William: when they're bad, when they're not, and how to deal with them",
  region: "Lochaber",
  broaderArea: "West Highlands",
  coordinates: { latitude: 56.798077, longitude: -5.095093 },
  seasonalFallbackByMonth: STANDARD_SEASONAL_BANDS,
  terrainType: "mountain gateway town with Loch Linnhe, wooded edges, lower Ben Nevis slopes, campsites, and sheltered valley approaches",
  intro:
    "Fort William gets proper west coast midge pressure. It is a base for Ben Nevis, the West Highland Way and Great Glen trips, but it is also damp, sheltered in places and surrounded by water, woodland and lower slopes where midges can gather fast. If the Fort William midge forecast is bad and the air is still, expect it to be bad on the ground.",
  seasonalSummary: [
    "The main season usually runs from late May through September, with June, July and August the months that need the most planning. September can still bite if conditions stay mild and damp. Early spring and later autumn are usually easier.",
    "Dawn and dusk are the worst windows. That matters because visitors are often setting off early for Ben Nevis, finishing walks late, camping, or standing around lochside stops on Loch Linnhe.",
  ],
  terrainNote: [
    "The lower Ben Nevis path can be especially annoying in still, humid air before you gain height and wind exposure. Great Glen campsites and lochside stops can be the same.",
    "If you are moving quickly on open ground, you may be fine. If you are changing boots, waiting at a campsite, sorting bags beside the car or cooking near trees and water, the midges get their chance.",
  ],
  planningTakeaway:
    "Use Fort William's forecast as a practical check before Ben Nevis, the Great Glen, Loch Linnhe stops or a campsite night. High risk plus still air means cover up and bring proper protection.",
  bestWindowsSummary:
    "Breezy days, open viewpoints, higher ground, wind-exposed sections and the middle of the day are usually easier.",
  worstWindowsSummary:
    "Calm evenings near Loch Linnhe, wooded campsites, Great Glen stops and the lower Ben Nevis path are the usual problem windows.",
  calmerExperienceTip:
    "For Ben Nevis midges, the worst part is often not the summit; it is the lower, slower, sheltered start and finish.",
  campingTip:
    "Campers and walkers feel midges more because they are still for longer. Keep a head net in the bag if you are stopping overnight.",
  timePatterns: [
    {
      label: "Late May",
      typicallyBetter: "Late morning and early afternoon in open areas",
      typicallyWorse: "Still evenings near damp ground or lochside stops",
      terrainNote: "Gateway travel may feel fine while calmer base locations feel noticeably worse.",
    },
    {
      label: "June",
      typicallyBetter: "Breezier daytime periods and higher movement on open ground",
      typicallyWorse: "Dusk, still evening periods and Great Glen campsites",
      terrainNote: "Town-edge shelter and wooded approaches can hold midge pressure even when transit feels comfortable.",
    },
    {
      label: "July",
      typicallyBetter: "Open, brighter daytime windows",
      typicallyWorse: "Humid evenings and sheltered stopovers",
      terrainNote: "Local stop choice matters more than visitors often expect.",
    },
    {
      label: "August to September",
      typicallyBetter: "Fresher periods after wind or rain clears through",
      typicallyWorse: "Settled evenings after warm damp days",
      terrainNote: "Residual dampness and shelter can keep nuisance elevated later in the season.",
    },
  ],
  faqs: [
    {
      question: "Are midges bad in Fort William in summer?",
      answer:
        "They can be, especially through June and July when evenings turn still and humid. Open daytime periods are often more manageable than sheltered evening stops.",
    },
    {
      question: "Are there midges on Ben Nevis?",
      answer:
        "Ben Nevis midges are most likely to annoy you on the lower, slower, more sheltered start and finish rather than high exposed ground.",
    },
    {
      question: "What time are midges worst around Fort William?",
      answer:
        "For many visitors, dusk and calm evening periods are the worst windows, especially near Loch Linnhe, woodland, campsites or sheltered ground.",
    },
  ],
  planningRiskBand: BANDS.moderate,
  liveCalculatorHref: "/midge-wind-watch/?location=Fort%20William",
  affiliateCategory: "west coast high-risk planning kit",
};
