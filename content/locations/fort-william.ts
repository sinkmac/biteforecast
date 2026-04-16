import { BANDS } from "../../lib/scoring/bands";

import type { LocationPage } from "./types";

export const fortWilliamLocationPage: LocationPage = {
  slug: "fort-william-midges",
  name: "Fort William",
  region: "Lochaber",
  broaderArea: "West Highlands",
  terrainType: "mountain gateway town with lochside, woodland edges, and sheltered valley approaches",
  intro:
    "Fort William is a classic mountain-gateway location where visitors often move between exposed travel corridors and much more sheltered evening stops. That means midge pressure can feel surprisingly local: open transit can feel fine while calmer lochside or campsite periods turn noticeably worse.",
  seasonalSummary: [
    "Fort William usually starts to feel midge-prone from late May, with the strongest nuisance windows often arriving through June and July and lingering into August when the air is still and humid.",
    "Because it is a gateway rather than a single exposed landscape, the difference between town edges, lochside stops, and more sheltered nearby ground often matters more than broad weather summaries alone.",
  ],
  terrainNote: [
    "Loch influence, wooded edges, and the surrounding valley geography all create the kind of calmer pockets that midges favour when the air settles.",
    "For planning purposes, Fort William should be treated as a place where the wider weather picture is only half the story; local stop choice and timing still matter a lot.",
  ],
  planningTakeaway:
    "If you are using Fort William as a base, assume the most comfortable windows are the brighter, breezier daytime ones and be more cautious about still evening stops near damp or sheltered ground.",
  bestWindowsSummary:
    "Open daytime windows with moving air are often the easiest for travel, walks, and short stops.",
  worstWindowsSummary:
    "Calm evening periods near lochside, woodland edges, or sheltered campsites are the most likely to feel uncomfortable.",
  calmerExperienceTip:
    "Shorter pauses in more open areas usually feel better than long still stops low and sheltered later in the day.",
  campingTip:
    "If staying nearby, expect nuisance to rise quickly once the air settles around camp in summer, especially after humid or damp conditions.",
  timePatterns: [
    {
      label: "Late May",
      typicallyBetter: "Late morning and early afternoon in open areas",
      typicallyWorse: "Still evenings near damp ground or lochside stops",
      terrainNote: "Gateway travel may feel fine while calmer base locations feel noticeably worse.",
    },
    {
      label: "June",
      typicallyBetter: "Breezier daytime periods",
      typicallyWorse: "Dusk and still evening periods",
      terrainNote: "Town-edge shelter and wooded approaches can hold midge pressure even when transit feels comfortable.",
    },
    {
      label: "July",
      typicallyBetter: "Open, brighter daytime windows",
      typicallyWorse: "Humid evenings and sheltered stopovers",
      terrainNote: "Local stop choice matters more than visitors often expect.",
    },
    {
      label: "August",
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
      question: "What time are midges worst around Fort William?",
      answer:
        "For many visitors, dusk and calm evening periods are the worst windows, especially near lochside or sheltered ground.",
    },
    {
      question: "Should I rely on the planning page or the live calculator for Fort William?",
      answer:
        "Use this page for typical seasonal behaviour and timing. Use the live calculator when you need a current decision for today, tonight, or this weekend.",
    },
  ],
  planningRiskBand: BANDS.moderate,
  liveCalculatorHref: "/midge-wind-watch/?location=Fort%20William",
  affiliateCategory: "moderate-risk planning kit",
};
