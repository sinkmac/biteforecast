import type { Metadata } from "next";
import Link from "next/link";

import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";

export const metadata: Metadata = {
  title: "A Practical Guide to Midge Repellents",
  description:
    "DEET, picaridin, Avon Skin So Soft, head nets, and clothing, a clear-eyed guide to what helps against Highland midges and when to use it.",
  alternates: buildMetadataAlternates("/midge-repellents"),
  openGraph: buildOpenGraph({
    title: "A Practical Guide to Midge Repellents",
    description:
      "DEET, picaridin, Avon Skin So Soft, head nets, and clothing, a clear-eyed guide to what helps against Highland midges and when to use it.",
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
            A practical guide to midge repellents
          </h1>
          <p className="max-w-3xl text-lg text-stone-300">
            Repellent can help, but it works best as part of a simple strategy that also includes timing, location choice, and basic physical coverage. The point is not to promise miracles, it is to help you stay more comfortable when Highland conditions turn annoying.
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
            <h2 className="text-2xl font-semibold">DEET</h2>
            <div className="mt-4 space-y-3 text-stone-300">
              <p>DEET remains one of the most established repellent ingredients for biting insects. For some visitors it is the most practical option when conditions are clearly bad and exposed skin time is hard to avoid.</p>
              <p>Use it according to the product instructions, keep it off areas the label tells you to avoid, and remember that strong repellent still works best alongside a better stop choice and basic physical coverage.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-2xl font-semibold">Picaridin</h2>
            <div className="mt-4 space-y-3 text-stone-300">
              <p>Picaridin is another popular repellent option and is often chosen by people who want something effective but prefer a different feel or smell from traditional DEET products.</p>
              <p>As with any repellent, the real question is not which ingredient sounds best in theory, but whether it helps enough for the kind of stop, walk, or campsite routine you actually have planned.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-2xl font-semibold">Avon Skin So Soft</h2>
            <div className="mt-4 space-y-3 text-stone-300">
              <p>Skin So Soft has a long folk reputation in Scotland and many people still swear by it for lighter nuisance conditions or short evening stops.</p>
              <p>It is worth thinking of it as a practical option some users like, not as a guaranteed substitute for stronger repellents or a fix for very still, damp, peak-season conditions.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-2xl font-semibold">Head nets</h2>
            <div className="mt-4 space-y-3 text-stone-300">
              <p>A head net is often the most reliable comfort upgrade when conditions are strong and you still need to stand around outdoors.</p>
              <p>It is especially useful for campsite cooking, photography stops, route planning, and still evenings near lochs, trees, or wet ground.</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-2xl font-semibold">Clothing</h2>
            <div className="mt-4 space-y-3 text-stone-300">
              <p>Physical coverage often makes the biggest difference once nuisance is moderate or higher. Thin long sleeves, long trousers, socks, and a lightweight layer around the neck can make short stops much more tolerable.</p>
              <p>Clothing is rarely glamorous advice, but it is one of the most dependable ways to reduce how much exposed skin midges can find.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-2xl font-semibold">Timing and position</h2>
            <div className="mt-4 space-y-3 text-stone-300">
              <p>Where you stop often matters more than what you spray. A breezier lay-by, viewpoint, or shoreline edge can feel dramatically better than a sheltered grassy verge only a short distance away.</p>
              <p>Use the <Link className="text-emerald-300 underline-offset-4 hover:underline" href="/midge-wind-watch">live calculator</Link> before settling into a calm evening spot, especially if there is damp ground, tree cover, or still water nearby.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">No affiliate hype, just practical trade-offs</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast does not rank products as miracle fixes. Different people prefer different ingredients, textures, and routines, and the right choice depends on whether you are stopping for ten minutes, cooking outside, or settling into a campsite for the evening.
            </p>
            <p>
              For most visitors, the best result comes from combining basic repellent, a head net, sensible clothing, and better timing rather than trusting any one bottle or brand to do all the work.
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
