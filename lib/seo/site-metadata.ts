import type { PublicBand } from "../scoring/bands";

export const SITE_URL = "https://www.biteforecast.scot";

export const HOMEPAGE_DESCRIPTION =
  "Scotland's midge forecast and planning tool. Location guides for every major Highland destination plus a live risk calculator.";

export const CALCULATOR_DESCRIPTION =
  "Live midge forecast for Scotland — check wind, humidity, time of day, and a 7-day risk outlook before you travel.";

export const LOCATION_META_DESCRIPTIONS: Record<string, string> = {
  "glencoe-midges":
    "Check midge risk for Glencoe — seasonal patterns, best times to visit, and a live 7-day forecast. Plan your trip around the conditions.",
  "skye-midges":
    "Midge forecast for the Isle of Skye — when midges are worst, which spots to avoid at dusk, and live conditions before you travel.",
  "fort-william-midges":
    "Fort William midge forecast — seasonal risk, calmer times to visit, and live 7-day conditions before you head out.",
  "loch-lomond-midges":
    "Loch Lomond midge forecast — seasonal patterns, dusk risk, and live 7-day conditions for planning your stop or stay.",
  "aviemore-midges":
    "Aviemore midge forecast — when nuisance builds, which conditions matter most, and a live 7-day outlook before you travel.",
  "mull-midges":
    "Isle of Mull midge forecast — seasonal pressure, sheltered spots to watch, and live 7-day conditions before you go.",
  "torridon-midges":
    "Torridon midge forecast — exposed vs sheltered risk, best visiting windows, and live 7-day conditions before you travel.",
  "cairngorms-midges":
    "Cairngorms midge forecast — seasonal patterns, exposed vs sheltered risk, and a live 7-day outlook before your trip.",
};

export type FaqEntry = {
  question: string;
  answer: string;
};

export const HOMEPAGE_FAQS: FaqEntry[] = [
  {
    question: "How does BiteForecast help me plan around midges?",
    answer:
      "Use the location guides to understand seasonal patterns first, then use the live calculator for day-of checks using wind, humidity, and time of day.",
  },
  {
    question: "Which places does BiteForecast cover right now?",
    answer:
      "The launch set covers Glencoe, Isle of Skye, Fort William, Loch Lomond, Aviemore, Isle of Mull, Torridon, and the Cairngorms.",
  },
  {
    question: "Is BiteForecast a guarantee of real-world conditions?",
    answer:
      "No. It is a planning tool that combines pattern guidance and live weather data, but sheltered spots can still feel worse than a broad forecast suggests.",
  },
];

export const CALCULATOR_FAQS: FaqEntry[] = [
  {
    question: "What does the live midge risk result mean?",
    answer:
      "The result is a practical band based on wind, humidity, temperature, and time of day so you can judge whether a stop is likely to feel manageable or irritating.",
  },
  {
    question: "Why does wind matter so much in the calculator?",
    answer:
      "Moving air is the strongest suppressor in the model. Sheltered, damp, still air is where nuisance usually climbs fastest.",
  },
  {
    question: "What happens if live weather data is unavailable?",
    answer:
      "BiteForecast falls back to a seasonal estimate for that location and month rather than pretending the missing data is live.",
  },
];

export function buildCanonicalUrl(pathname: string) {
  if (pathname === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${pathname}`;
}

export function buildMetadataAlternates(pathname: string) {
  return {
    canonical: buildCanonicalUrl(pathname),
  };
}

export function buildOpenGraph(args: {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
}) {
  return {
    title: args.title,
    description: args.description,
    url: args.url,
    type: args.type ?? "website",
    siteName: "BiteForecast",
  };
}

export function getBandColorClasses(band: PublicBand | string) {
  switch (band) {
    case "Very High":
      return {
        border: "border-rose-400/60",
        bg: "bg-rose-500/10",
        text: "text-rose-200",
      };
    case "High":
      return {
        border: "border-amber-300/60",
        bg: "bg-amber-500/10",
        text: "text-amber-200",
      };
    case "Moderate":
    case "Guarded":
      return {
        border: "border-emerald-300/50",
        bg: "bg-emerald-500/10",
        text: "text-emerald-200",
      };
    default:
      return {
        border: "border-sky-300/45",
        bg: "bg-sky-500/10",
        text: "text-sky-200",
      };
  }
}
