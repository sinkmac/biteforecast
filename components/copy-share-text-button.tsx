"use client";

import { useState } from "react";

export function CopyShareTextButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      className="mt-4 rounded-full bg-emerald-300 px-5 py-3 text-sm font-black text-stone-950 transition hover:bg-emerald-200"
      onClick={copyText}
      type="button"
    >
      {copied ? "Copied" : "Copy to share"}
    </button>
  );
}
