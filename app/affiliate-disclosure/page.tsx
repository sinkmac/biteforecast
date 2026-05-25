import type { Metadata } from "next";
import Link from "next/link";

import { SITE_URL, buildMetadataAlternates, buildOpenGraph } from "../../lib/seo/site-metadata";

const title = "Affiliate disclosure";
const description = "BiteForecast may earn from qualifying Amazon purchases when affiliate links are used. Product links appear after forecast guidance and do not change the midge index.";

export const metadata: Metadata = {
  title,
  description,
  alternates: buildMetadataAlternates("/affiliate-disclosure"),
  openGraph: buildOpenGraph({ title, description, url: `${SITE_URL}/affiliate-disclosure` }),
};

export default function AffiliateDisclosurePage() {
  return (
    <main className="min-h-screen bg-stone-950 px-6 py-12 text-stone-50">
      <article className="mx-auto max-w-3xl rounded-3xl border border-stone-800 bg-stone-900 p-6 shadow-2xl shadow-black/20">
        <Link className="text-sm text-emerald-300 underline-offset-4 hover:underline" href="/">
          ← Back to BiteForecast
        </Link>
        <h1 className="mt-6 text-4xl font-black tracking-tight">Affiliate disclosure</h1>
        <p className="mt-4 leading-7 text-stone-300">
          BiteForecast includes Amazon affiliate links on some forecast and guide pages. As an Amazon Associate, BiteForecast may earn from qualifying purchases.
        </p>
        <p className="mt-4 leading-7 text-stone-300">
          Affiliate links appear after the forecast or guidance has done its job. They do not affect the midge index, the recommendation, or the order of risk labels.
        </p>
        <p className="mt-4 leading-7 text-stone-300">
          BiteForecast is a planning tool, not a guarantee of real-world conditions. Always use judgement outdoors, especially around still, damp, sheltered places at dawn and dusk.
        </p>
      </article>
    </main>
  );
}
