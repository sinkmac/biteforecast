import { BANDS } from "../../lib/scoring/bands";

import { STANDARD_SEASONAL_BANDS } from "./seasonal-bands";
import type { LocationPage } from "./types";

export const glencoeLocationPage: LocationPage = {
  slug: "glencoe-midges",
  name: "Glencoe",
  h1: "Midges in Glencoe: when they're bad, when they're not, and how to deal with them",
  region: "Lochaber",
  broaderArea: "West Highlands",
  coordinates: { latitude: 56.653614, longitude: -5.117935 },
  seasonalFallbackByMonth: STANDARD_SEASONAL_BANDS,
  terrainType: "west coast glen with high rainfall, sheltered valley air, burns, loch edges, and damp ground",
  intro:
    "Glencoe is one of the worst midge locations in Scotland. That is not drama, it is geography. West coast rainfall, sheltered valleys, trees, burns, loch edges and still air all work in the midges' favour. If the forecast is bad in Glencoe, expect it to feel bad on the ground, especially at dawn, dusk or near water.",
  seasonalSummary: [
    "The main Glencoe midge season usually runs from late May through September. June, July and August are the months most visitors need to think about. September can still be rough if the weather stays mild and damp.",
    "Weather matters as much as the calendar. Still, overcast, humid days are the classic trouble pattern. Light rain does not always clear them. Wind is your friend, and proper breeze can make a huge difference even in peak season.",
  ],
  terrainNote: [
    "Dawn and dusk are usually the worst times around car parks, campsites, woodland edges, burns and lochside stops. If you are planning photos, a short walk or a campsite meal at those times, pack properly.",
    "Higher and more exposed ground can feel much easier than the valley floor, so do not judge the whole day from one breezy ridge or one still roadside stop.",
  ],
  planningTakeaway:
    "Treat Glencoe as a place where terrain matters as much as the regional weather line. If the risk is high and the air is still, bring repellent, cover skin and keep a head net handy.",
  bestWindowsSummary:
    "Early spring, later autumn, windy summer days, exposed viewpoints and the middle of the day are usually easier.",
  worstWindowsSummary:
    "Late May through September, especially still overcast dawns, dusks and sheltered valley-floor stops.",
  calmerExperienceTip:
    "Choose exposed lay-bys and viewpoints for longer stops, and keep sheltered glen-floor pauses short when the air is still.",
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
      label: "August to September",
      typicallyBetter: "Moving-air daytime periods after fresher weather",
      typicallyWorse: "Still evenings after damp spells",
      terrainNote: "Late-summer nuisance often lingers in damp sheltered pockets rather than every stop equally.",
    },
  ],
  faqs: [
    {
      question: "When are midges bad in Glencoe?",
      answer:
        "Late May through September is the main season, with June to August usually needing the most planning. Dawn, dusk and still overcast conditions are the worst windows.",
    },
    {
      question: "Is Glencoe one of Scotland's worst midge areas?",
      answer:
        "Yes. The mix of west coast rainfall, damp ground, sheltered valley air and water makes Glencoe one of the places where visitors should take midges seriously.",
    },
    {
      question: "Does wind help in Glencoe?",
      answer:
        "Yes, but terrain matters. A breezy forecast can still feel much calmer in sheltered glen-floor locations than on exposed ridges or viewpoints.",
    },
  ],
  planningRiskBand: BANDS.moderate,
  liveCalculatorHref: "/midge-wind-watch/?location=Glencoe",
  affiliateCategory: "west coast high-risk planning kit",
};
