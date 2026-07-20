import { RISK_BANDS } from "../lib/forecast/risk-bands";

export default function RiskLegend() {
  return (
    <div className="font-mono" style={{ display: "flex", gap: 14, fontSize: 11, color: "var(--color-secondary)" }}>
      {RISK_BANDS.map((band) => (
        <span key={band.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span className="legend-dot" style={{ background: band.color }} />
          {band.label.toUpperCase()} {band.maxScore === 3 ? "0–3" : band.maxScore === 10 ? "9–10" : `${band.maxScore - 1}–${band.maxScore === 5 ? "5" : band.maxScore === 7 ? "7" : "8"}`}
        </span>
      ))}
    </div>
  );
}