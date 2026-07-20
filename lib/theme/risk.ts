/**
 * Almanac visual helpers — delegates to shared risk-bands for label/color,
 * but keeps its own block-generation logic for the threat bar so it
 * doesn't break the redesign.
 */
import { getRiskLabel, getRiskColor } from "../forecast/risk-bands";

const RISK_LABELS: Record<string, string> = {
  low: "LOW",
  moderate: "MODERATE",
  high: "HIGH",
  severe: "SEVERE",
  extreme: "EXTREME",
};

/**
 * 3-band mapping for the almanac threat-bar / risk-score visual components.
 * The redesign uses 3 colors; this maps the 5-tier label onto those colors.
 */
const VISUAL_COLORS: Record<string, string> = {
  low: "#3d7a4e",
  moderate: "#b07d1e",
  high: "#b3452e",
};

function visualBand(score: number): "low" | "moderate" | "high" {
  const label = getRiskLabel(score);
  if (label === "Low") return "low";
  if (label === "Moderate" || label === "High") return "moderate";
  return "high";
}

export { getRiskColor, getRiskLabel };

export function getRiskBand(score: number): string {
  return visualBand(score);
}

export function getRiskLabelUppercase(score: number): string {
  return RISK_LABELS[visualBand(score)];
}

export function getThreatBlocks(score: number): Array<{ filled: boolean; color: string }> {
  const color = VISUAL_COLORS[visualBand(score)];
  return Array.from({ length: 10 }, (_, i) => ({
    filled: i < score,
    color,
  }));
}