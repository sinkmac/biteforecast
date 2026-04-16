import { BANDS } from "../../lib/scoring/bands";

import type { LocationPage } from "./types";

export const cairngormsLocationPage: LocationPage = {
  slug: "cairngorms-midges",
  name: "Cairngorms",
  region: "Cairngorms National Park",
  broaderArea: "Central Highlands",
  terrainType: "national-park mix of forest edge, glens, rivers, moorland, and exposed mountain terrain",
  intro:
    "The Cairngorms are broad enough that a single midge story never quite fits. Exposed upland movement can feel much easier than forest-edge stops, glen shelter, and calmer evening base locations, which is why this page works best as a planning guide rather than a claim of live hyperlocal certainty.",
  seasonalSummary: [
    "Across the Cairngorms, midge nuisance typically becomes more noticeable from late May, often peaks through June and July, and can remain relevant into August whenever the air is still and humid.",
    "The national-park scale matters here: place and terrain choice affect comfort just as much as the broad weather line.",
  ],
  terrainNote: [
    "The key planning contrast is between exposed upland or breezy open areas and lower, more sheltered forest-edge, riverside, or glen-floor stops.",
    "That means a planning page for the Cairngorms should help visitors think in patterns and terrain types rather than pretend to forecast every local pocket from a static page.",
  ],
  planningTakeaway:
    "Treat the Cairngorms as a planning zone where exposure, shelter, and stop timing matter more than simple park-wide generalisations.",
  bestWindowsSummary:
    "Open, breezier daytime windows are often the easiest across much of the park.",
  worstWindowsSummary:
    "Still evening periods near sheltered forest, river, or glen locations are usually the highest nuisance windows.",
  calmerExperienceTip:
    "Choose more exposed stops and keep sheltered evening pauses short if the weather looks close and humid.",
  campingTip:
    "For camping, assume midge nuisance can rise quickly around calmer low-shelter spots as the day cools toward dusk.",
  timePatterns: [
    { label: "Late May", typicallyBetter: "Late morning to mid-afternoon in open areas", typicallyWorse: "Still evening periods near shelter", terrainNote: "Broad regional weather matters less than where you stop." },
    { label: "June", typicallyBetter: "Breezier daytime windows", typicallyWorse: "Dusk in forest-edge or riverside spots", terrainNote: "Sheltered low ground is the main planning risk." },
    { label: "July", typicallyBetter: "Exposed, windier daytime movement", typicallyWorse: "Warm, humid calm evenings", terrainNote: "The contrast between open upland and low shelter is often stark." },
    { label: "August", typicallyBetter: "Fresher daytime periods after changeable weather", typicallyWorse: "Settled evenings after damp days", terrainNote: "Residual dampness can keep nuisance elevated in shelter." },
  ],
  faqs: [
    { question: "Are midges bad in the Cairngorms in summer?", answer: "They can be, especially in sheltered forest-edge, riverside, and lower glen settings during calm evenings." },
    { question: "Do the Cairngorms have fewer midges on higher ground?", answer: "Often yes. Exposed higher terrain is usually easier than low sheltered stop points." },
    { question: "Should I check live conditions for the Cairngorms?", answer: "Yes. Use this page for broad planning patterns, then the live calculator for current or day-of checks." },
  ],
  planningRiskBand: BANDS.moderate,
  liveCalculatorHref: "/midge-wind-watch/?location=Cairngorms",
  affiliateCategory: "moderate-risk planning kit",
};
