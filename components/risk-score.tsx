import { getRiskColor } from "../lib/theme/risk";

type RiskScoreProps = {
  score: number;
  size?: "card" | "hero" | "detail";
};

export default function RiskScore({ score, size = "card" }: RiskScoreProps) {
  const color = getRiskColor(score);

  const scoreSize = size === "detail" ? 88 : size === "hero" ? 58 : 44;
  const denomSize = size === "detail" ? 15 : 12;

  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
      <span
        className="font-serif"
        style={{
          fontWeight: 600,
          fontSize: scoreSize,
          lineHeight: 1,
          color,
        }}
      >
        {score}
      </span>
      <span className="font-mono" style={{ fontSize: denomSize, color: "var(--color-muted-light)" }}>
        /10
      </span>
    </div>
  );
}