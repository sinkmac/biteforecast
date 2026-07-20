import type { Metadata } from "next";
import Link from "next/link";

import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";

const amazonLinkClass = "text-almanac-green underline decoration-emerald-500/60 underline-offset-4";

export const metadata: Metadata = {
  title: "Smidge vs Avon Skin So Soft: which works better on Scottish midges?",
  description:
    "Smidge vs Avon Skin So Soft for Scottish midges: practical comparison, DEET advice, head net backup, and when to check your local midge forecast.",
  alternates: buildMetadataAlternates("/smidge-vs-avon-skin-so-soft"),
  openGraph: buildOpenGraph({
    title: "Smidge vs Avon Skin So Soft: which works better on Scottish midges?",
    description:
      "Smidge vs Avon Skin So Soft for Scottish midges: practical comparison, DEET advice, head net backup, and when to check your local midge forecast.",
    url: `${SITE_URL}/smidge-vs-avon-skin-so-soft`,
    type: "article",
  }),
};

export default function SmidgeVsAvonPage() {
  return (
    <main className="min-h-screen px-6 py-16">
      <article className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-4">
          <Link className="text-sm text-almanac-green underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-almanac-green">
            Practical kit
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Smidge vs Avon Skin So Soft: which works better on Scottish midges?
          </h1>
          <p className="max-w-3xl text-lg text-almanac-secondary">
            If you&apos;re already being eaten alive, here&apos;s the short version: Smidge is the safer dedicated pick, Avon Skin So Soft is the pub-chat legend, and DEET is the harder-use option for grim conditions. Scots swear by both because both have earned a place in rucksacks, glove boxes and holiday bags. But they are not the same thing. One is built as a midge repellent. The other has a long reputation for helping some people, some of the time.
          </p>
          <p className="max-w-3xl text-sm italic text-almanac-muted">
            As an Amazon Associate, BiteForecast may earn from qualifying purchases. This does not affect what you pay.
          </p>
        </header>

        <section className="border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-semibold">Smidge That Midge</h2>
          <p className="mt-4">
            <a className={amazonLinkClass} href="https://www.amazon.co.uk/s?k=smidge+that+midge&tag=biteforecast2-21" rel="sponsored nofollow noopener" target="_blank">
              Smidge That Midge on Amazon UK
            </a>
          </p>
          <div className="mt-4 space-y-3 text-almanac-secondary">
            <p>Smidge That Midge is the purpose-built option for Scottish midges. Made for biting insects, so you are not relying on folklore or wishful thinking when the air starts moving around your face.</p>
            <p>Easy to carry, easier to live with than many strong repellents, and it suits the usual Scottish use case: standing near a loch, walking through damp woodland, sitting outside a tent, or trying to enjoy a west coast evening without slapping your neck every thirty seconds.</p>
            <p>Pros: made for the job, widely used in Scotland, usually less harsh-feeling than DEET, sensible first buy for visitors. Cons: needs reapplying as directed, not a magic shield, and in a proper midge cloud you may still want a head net.</p>
          </div>
        </section>

        <section className="border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-semibold">Avon Skin So Soft Dry Oil Spray</h2>
          <p className="mt-4">
            <a className={amazonLinkClass} href="https://www.amazon.co.uk/s?k=avon+skin+so+soft+dry+oil+spray&tag=biteforecast2-21" rel="sponsored nofollow noopener" target="_blank">
              Avon Skin So Soft Dry Oil Spray on Amazon UK
            </a>
          </p>
          <div className="mt-4 space-y-3 text-almanac-secondary">
            <p>The accidental legend. Ask around in Scotland and someone will tell you the army used it, their auntie swore by it, or it saved a camping trip in the 1990s.</p>
            <p>That reputation is real. The certainty around it is not. Avon Skin So Soft is not a dedicated midge repellent in the same way Smidge is. Some people find it helps. Others find the midges do not care. The likely appeal is the oily skin feel, scent, and barrier effect — but do not treat it as proven protection for heavy exposure.</p>
            <p>Pros: smells better than most repellents, feels more like skincare, handy for low-pressure evenings if you already use it. Cons: reliability varies, can feel oily, and on a still evening near water you should not rely on vibes.</p>
          </div>
        </section>

        <section className="border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-semibold">Head-to-head</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-stone-700 text-almanac-muted">
                  <th className="pb-3 pr-4">Factor</th>
                  <th className="pb-3 pr-4">Smidge</th>
                  <th className="pb-3">Avon Skin So Soft</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Effectiveness", "More reliable dedicated repellent", "Reputation-based; works for some, not all"],
                  ["Smell", "Functional but manageable", "More cosmetic, often preferred"],
                  ["Skin feel", "Repellent feel, not too heavy", "Oily/dry-oil skincare feel"],
                  ["Price", "Usually costs more for repellent volume", "Often competitive, varies by seller"],
                  ["Kid-safe", "Check label age guidance", "Check label age guidance"],
                ].map(([factor, smidge, avon]) => (
                  <tr key={factor} className="border-b border-stone-800 align-top">
                    <td className="py-4 pr-4 font-medium text-stone-100">{factor}</td>
                    <td className="py-4 pr-4 text-almanac-secondary">{smidge}</td>
                    <td className="py-4 text-almanac-secondary">{avon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-semibold">What about DEET?</h2>
          <p className="mt-4">
            <a className={amazonLinkClass} href="https://www.amazon.co.uk/s?k=deet+insect+repellent&tag=biteforecast2-21" rel="sponsored nofollow noopener" target="_blank">
              DEET insect repellent on Amazon UK
            </a>
          </p>
          <div className="mt-4 space-y-3 text-almanac-secondary">
            <p>Not the lifestyle choice. The hard-use option.</p>
            <p>Camping, fishing, working outdoors, forestry, or a bad west coast forecast — DEET belongs in the conversation. Stronger protection, but trade-offs apply: smell, skin feel, and care needed around plastics and synthetic fabrics. Read the label and use it properly.</p>
            <p>For normal visitor use, Smidge is the easier first stop.</p>
          </div>
        </section>

        <section className="border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-semibold">Verdict: which should you buy?</h2>
          <div className="mt-4 space-y-4 text-almanac-secondary">
            <p>No universal winner. Depends where you are going and how long you will be outside.</p>
            <p><strong className="text-stone-100">Casual visitor, beer garden, short walk or low-risk evening:</strong> Smidge. Avon is fine if you already use it, but it is the less dependable bet.</p>
            <p>
              <strong className="text-stone-100">Hillwalker, camper, or anyone heading into Glencoe, Skye, Argyll or lochside woodland at dusk:</strong> Smidge or DEET, plus a {" "}
              <a className={amazonLinkClass} href="https://www.amazon.co.uk/s?k=midge+head+net&tag=biteforecast2-21" rel="sponsored nofollow noopener" target="_blank">
                midge head net
              </a>
              . A head net looks ridiculous until it saves your walk.
            </p>
            <p><strong className="text-stone-100">Parents with kids:</strong> do not guess. Check label age guidance, cover skin where practical, consider a head net if the forecast is ugly. Repellent helps, but clothing and timing matter too.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-almanac-border bg-almanac-card p-6">
          <p className="text-stone-100/90">
            Before you buy, check the conditions. Heading west? {" "}
            <Link className="text-almanac-green underline decoration-emerald-400/60 underline-offset-4" href="/scotland/glencoe-midges">
              Check the Glencoe midge forecast
            </Link>
            . For anywhere else in Scotland, {" "}
            <Link className="text-almanac-green underline decoration-emerald-400/60 underline-offset-4" href="/">
              check your local midge forecast
            </Link>{" "}
            and decide whether you need Smidge, DEET, a head net, or just a better time of day to be outside.
          </p>
        </section>
      </article>
    </main>
  );
}
