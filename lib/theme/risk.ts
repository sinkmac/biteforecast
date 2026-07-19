/**
 * Field Almanac risk-level mapping (3-band system per design spec)
 * LOW 0–3, MODERATE 4–6, HIGH 7–10
 */

const RISK_COLORS: Record<string, string> = {
  low: "#3d7a4e",
  moderate: "#b07d1e",
  high: "#b3452e",
};

const RISK_LABELS: Record<string, string> = {
  low: "LOW",
  moderate: "MODERATE",
  high: "HIGH",
};

export function getRiskBand(score: number): "low" | "moderate" | "high" {
  if (score <= 3) return "low";
  if (score <= 6) return "moderate";
  return "high";
}

export function getRiskColor(score: number): string {
  return RISK_COLORS[getRiskBand(score)];
}

export function getRiskLabel(score: number): string {
  return RISK_LABELS[getRiskBand(score)];
}

export function getThreatBlocks(score: number, _size?: "card" | "detail"): Array<{ filled: boolean; color: string }> {
  const color = RISK_COLORS[getRiskBand(score)];
  return Array.from({ length: 10 }, (_, i) => ({
    filled: i < score,
    color,
  }));
}

export { RISK_COLORS, RISK_LABELS };