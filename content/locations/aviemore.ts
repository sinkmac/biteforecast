import { BANDS } from "../../lib/scoring/bands";

import type { LocationPage } from "./types";

export const aviemoreLocationPage: LocationPage = {
  slug: "aviemore-midges",
  name: "Aviemore",
  region: "Cairngorms",
  broaderArea: "Strathspey",
  terrainType: "forest edge, river corridor, moorland approaches, and mountain gateway base",
  intro:
    "Aviemore sits in a landscape where forest edges, river-side ground, and calmer lower-level stops can all feel much midge-friendlier than the more open upland image visitors often have in mind. It is a good example of why a mountain gateway still needs a careful midge planning page.",
  seasonalSummary: [
    "Aviemore usually becomes more midge-prone from late May onwards, with June and July often bringing the most noticeable nuisance whenever the air is calm and humid.",
    "Open higher ground and breezier daytime periods can feel easier, but forest edges and calmer evening base locations often tell a different story.",
  ],
  terrainNote: [
    "The main planning contrast here is between open upland movement and lower, more sheltered stop points near trees, rivers, and damp ground.",
    "That makes Aviemore less about blanket 'Cairngorms' conditions and more about where you pause, camp, or spend the evening.",
  ],
  planningTakeaway:
    "Use Aviemore as a timing-and-stop-choice location. Moving on exposed ground is usually easier than lingering low and sheltered once the air settles.",
  bestWindowsSummary:
    "Breezier daytime windows and more exposed movement are often the easiest options.",
  worstWindowsSummary:
    "Sheltered forest-edge or riverside evenings are usually the most uncomfortable periods.",
  calmerExperienceTip:
    "Treat higher, brighter, breezier daytime periods as the default comfort window when planning walks or stops.",
  campingTip:
    "If camping or stopping near tree cover and damp ground, assume the nuisance can rise sharply toward evening.",
  timePatterns: [
    { label: "Late May", typicallyBetter: "Late morning to mid-afternoon with open air movement", typicallyWorse: "Still evenings near tree cover", terrainNote: "Lower sheltered pitches often feel worse than active daytime movement." },
    { label: "June", typicallyBetter: "Breezier daytime windows", typicallyWorse: "Dusk near riverside or forest-edge ground", terrainNote: "Forested shelter is the planning warning sign." },
    { label: "July", typicallyBetter: "Open, breezier daytime routes", typicallyWorse: "Humid calm evenings", terrainNote: "Mountain-gateway travel can feel fine while basecamp conditions deteriorate." },
    { label: "August", typicallyBetter: "Fresher daytime periods", typicallyWorse: "Settled damp evenings", terrainNote: "Residual dampness near low sheltered ground keeps nuisance elevated." },
  ],
  faqs: [
    { question: "Are midges bad in Aviemore?", answer: "They can be, especially in summer when you are near calmer sheltered ground such as forest edge or riverside areas." },
    { question: "What time are midges worst in Aviemore?", answer: "Evening and dusk windows are often the hardest, especially once the air settles near damp sheltered spots." },
    { question: "Does higher ground help near Aviemore?", answer: "Often, yes. Exposed and breezier ground is usually easier than lower sheltered stop points." },
  ],
  planningRiskBand: BANDS.moderate,
  liveCalculatorHref: "/midge-wind-watch/?location=Aviemore",
  affiliateCategory: "moderate-risk planning kit",
};
