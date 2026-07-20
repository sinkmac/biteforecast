/**
 * Single source of truth for risk-score → label → color mapping.
 * Five-tier banding per production brief (July 2026).
 *
 * Low      0–3
 * Moderate 4–5
 * High     6–7
 * Severe   8
 * Extreme  9–10
 */

export type RiskLabel = "Low" | "Moderate" | "High" | "Severe" | "Extreme";

const BANDS: Array<{ max: number; label: RiskLabel; color: string }> = [
  { max: 3, label: "Low", color: "#3d7a4e" },
  { max: 5, label: "Moderate", color: "#7a9e6a" },
  { max: 7, label: "High", color: "#b07d1e" },
  { max: 8, label: "Severe", color: "#d48a3a" },
  { max: 10, label: "Extreme", color: "#b3452e" },
];

export function getRiskLabel(score: number): RiskLabel {
  for (const band of BANDS) {
    if (score <= band.max) return band.label;
  }
  return "Extreme";
}

export function getRiskColor(score: number): string {
  for (const band of BANDS) {
    if (score <= band.max) return band.color;
  }
  return "#b3452e";
}

export function getRiskLevel(score: number): number {
  for (let i = 0; i < BANDS.length; i++) {
    if (score <= BANDS[i].max) return i + 1;
  }
  return 5;
}

/** All band data for rendering legends, filters, etc. */
export const RISK_BANDS = BANDS.map((b) => ({
  label: b.label,
  maxScore: b.max,
  color: b.color,
})) as ReadonlyArray<{
  label: RiskLabel;
  maxScore: number;
  color: string;
}>;