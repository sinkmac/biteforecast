import { getThreatBlocks } from "../lib/theme/risk";

type ThreatBarProps = {
  score: number;
  size?: "card" | "detail";
};

export default function ThreatBar({ score, size = "card" }: ThreatBarProps) {
  const blocks = getThreatBlocks(score, size);
  const blockSize = size === "detail" ? { width: 24, height: 9 } : { width: 15, height: 7 };

  return (
    <div style={{ display: "flex", gap: 3 }}>
      {blocks.map((block, i) => (
        <span
          key={i}
          style={{
            width: blockSize.width,
            height: blockSize.height,
            background: block.filled ? block.color : "transparent",
            border: `1px solid ${block.filled ? block.color : "#cfc9b8"}`,
          }}
        />
      ))}
    </div>
  );
}