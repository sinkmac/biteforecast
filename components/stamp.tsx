type StampProps = {
  text: string;
  variant?: "file" | "intercepted" | "classified";
};

export default function Stamp({ text, variant = "file" }: StampProps) {
  const rotation = variant === "file" ? "-4deg" : "-3deg";

  return (
    <div
      className="stamp stamp-rot"
      style={{ transform: `rotate(${rotation})` }}
    >
      {text}
    </div>
  );
}