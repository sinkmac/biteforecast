export default function RiskLegend() {
  return (
    <div className="font-mono" style={{ display: "flex", gap: 18, fontSize: 11, color: "var(--color-secondary)" }}>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span className="legend-dot" style={{ background: "var(--color-risk-low)" }} />
        LOW 0–3
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span className="legend-dot" style={{ background: "var(--color-risk-moderate)" }} />
        MODERATE 4–6
      </span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span className="legend-dot" style={{ background: "var(--color-risk-high)" }} />
        HIGH 7–10
      </span>
    </div>
  );
}