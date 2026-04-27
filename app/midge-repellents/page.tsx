import type { Metadata } from "next";
import Link from "next/link";

import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";

export const metadata: Metadata = {
  title: "Midge repellents and practical protection",
  description:
    "Plain-English advice on midge repellents, head nets, clothing, and how to think about protection without overpromising results.",
  alternates: buildMetadataAlternates("/midge-repellents"),
  openGraph: buildOpenGraph({
    title: "Midge repellents and practical protection",
    description:
      "Plain-English advice on midge repellents, head nets, clothing, and how to think about protection without overpromising results.",
    url: `${SITE_URL}/midge-repellents`,
  }),
};

export default function MidgeRepellentsPage() {
  return (
    <main className="bg-stone-950 px-6 py-16 text-stone-50">
      <article className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-4">
          <Link className="text-sm text-emerald-300 underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Practical kit
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Midge repellents and sensible protection
          </h1>
          <p className="max-w-3xl text-lg text-stone-300">
            Repellent can help, but it works best as part of a simple strategy that also includes timing, location choice, and basic physical coverage.
          </p>
        </header>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Start with the basics</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-300">
            <li>Choose breezier, more exposed stops where possible.</li>
            <li>Do not linger beside still water or damp shelter if the evening is settling.</li>
            <li>Keep a repellent handy for short stops and a head net for stronger conditions.</li>
            <li>Lightweight long sleeves, trousers, and a buff often matter more than people expect.</li>
          </ul>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-2xl font-semibold">Repellent</h2>
            <div className="mt-4 space-y-3 text-stone-300">
              <p>Repellent is useful for exposed skin during stops, campsite tasks, and sheltered evenings when nuisance rises.</p>
              <p>Apply according to the product instructions and reapply as needed. Different products suit different users, skin types, and trip lengths.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-2xl font-semibold">Head net</h2>
            <div className="mt-4 space-y-3 text-stone-300">
              <p>A head net is often the most reliable comfort upgrade when conditions are strong and you still need to stand around outdoors.</p>
              <p>It is especially useful for campsite cooking, photography stops, and still evenings near lochs, trees, or wet ground.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Clothing and behaviour still matter</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              Physical coverage often makes the biggest difference once nuisance is moderate or higher. Thin long sleeves, long trousers, socks, and a lightweight layer around the neck can make short stops much more tolerable.
            </p>
            <p>
              Just as important, keep moving when you can, avoid sheltered standing water edges, and use the <Link className="text-emerald-300 underline-offset-4 hover:underline" href="/midge-wind-watch">live calculator</Link> before settling into a still spot.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-300/25 bg-amber-500/10 p-6">
          <h2 className="text-2xl font-semibold">No miracle product promise</h2>
          <div className="mt-4 space-y-3 text-stone-100/90">
            <p>
              BiteForecast does not claim that any single repellent or item of kit will eliminate bites or make every location comfortable.
            </p>
            <p>
              The best results usually come from combining practical kit with better timing, more exposed stops, and realistic expectations about sheltered Highland evenings.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
