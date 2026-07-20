import type { Metadata } from "next";
import Link from "next/link";

import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";

export const metadata: Metadata = {
  title: "About BiteForecast",
  description:
    "Learn what BiteForecast does, who it is for, and how to use the site for practical Scottish midge trip planning.",
  alternates: buildMetadataAlternates("/about"),
  openGraph: buildOpenGraph({
    title: "About BiteForecast",
    description:
      "Learn what BiteForecast does, who it is for, and how to use the site for practical Scottish midge trip planning.",
    url: `${SITE_URL}/about`,
  }),
};

export default function AboutPage() {
  return (
    <main className="px-6 py-16">
      <article className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-4">
          <Link className="text-sm text-almanac-green underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-almanac-green">
            About
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            A practical midge-planning tool for Scotland
          </h1>
          <p className="max-w-3xl text-lg text-almanac-secondary">
            BiteForecast is built for people trying to make better real-world decisions about Scottish midges, especially before a road trip, walk, campsite stop, or evening outdoors.
          </p>
        </header>

        <section className="border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-semibold">What the site does</h2>
          <div className="mt-4 space-y-3 text-almanac-secondary">
            <p>
              BiteForecast combines two useful layers: planning pages for well-known Highland destinations and a live calculator for checking current conditions on the day itself.
            </p>
            <p>
              The planning pages explain broad seasonal patterns, terrain effects, and the kinds of places that often feel worse than the headline weather suggests. The live calculator then weighs weather inputs such as wind, humidity, and time of day to give a more current nuisance estimate.
            </p>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="border border-almanac-border bg-almanac-card p-6">
            <h2 className="text-2xl font-semibold">Who it is for</h2>
            <div className="mt-4 space-y-3 text-almanac-secondary">
              <p>Visitors planning Highland trips, campers choosing where to stop, walkers timing routes, and anyone trying to avoid a miserable still evening near water.</p>
              <p>The site is written in plain language on purpose. It is meant to be useful even if you are not a weather expert.</p>
            </div>
          </div>
          <div className="border border-almanac-border bg-almanac-card p-6">
            <h2 className="text-2xl font-semibold">What it is not</h2>
            <div className="mt-4 space-y-3 text-almanac-secondary">
              <p>BiteForecast is not an official weather service, a pest-control authority, or a guarantee that any specific stop will feel comfortable.</p>
              <p>Local shelter, damp ground, loch edges, woodland cover, and fast-changing weather can all make real conditions feel better or worse than a broad forecast suggests.</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-semibold">How to use BiteForecast well</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-stone-100/90">
            <li>Start with a destination guide to understand the usual seasonal pattern.</li>
            <li>Use the live calculator close to departure time or before a stop.</li>
            <li>Favour exposed, breezier ground when conditions look marginal.</li>
            <li>Keep practical kit secondary to location choice and timing, not the other way round.</li>
          </ol>
        </section>

        <section id="grieve" className="rounded-2xl border border-amber-200/20 bg-amber-100/10 p-6">
          <h2 className="text-2xl font-semibold">Intelligence source</h2>
          <div className="mt-4 space-y-4 text-almanac-secondary">
            <p>
              The midge activity reported on BiteForecast is derived from intercepted communiqués of Air Vice-Marshal Grieve, General Officer Commanding 
              the airborne divisions known as The Cloud (intelligence codename: THE BAMPOT). His operational reports — pompous, aggrieved, and deeply personal — 
              are reframed as a practical public forecast.
            </p>
            <p>He is not aware that we do this. He would write a strongly worded letter if he found out. We would read it. We would not change anything.</p>
            <p>
              No midges were consulted in the production of this forecast. Staff officers were. They were not helpful.
            </p>
          </div>
          <figure className="mt-6 overflow-hidden rounded-2xl border border-amber-100/30 bg-[#f5eedf] p-2">
            <div className="border border-almanac-border bg-almanac-card p-6 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300/80">
                <span className="text-almanac-ink0">FILE:</span> THE BAMPOT
                <span className="mx-2 text-stone-600">|</span>
                CLASSIFIED — FOR INTERNAL DISTRIBUTION ONLY
              </p>
              <p className="mt-4 text-2xl font-black uppercase tracking-[0.15em] text-white">
                WITHDRAWN TO THE POOLS
              </p>
              <p className="mt-3 text-sm italic text-almanac-muted">
                Intelligence confirms the airborne divisions have been stood down. Personnel have withdrawn to the pools. They are regrouping. They are not defeated. The public will interpret this as a victory. It is not.
              </p>
            </div>
            <figcaption className="px-2 py-3 text-center text-sm font-medium text-stone-700">
              Grieve — operational communiqué sample, level 1
            </figcaption>
          </figure>
        </section>

        <section className="border border-almanac-border bg-almanac-card p-6">
          <h2 className="text-2xl font-semibold">Editorial approach</h2>
          <div className="mt-4 space-y-3 text-almanac-secondary">
            <p>
              The aim is to stay helpful, specific, and honest. Pages are written to inform users first, not to pad thin content or force product decisions.
            </p>
            <p>
              Where the site includes advertising or affiliate links, those are intended to remain secondary to the core utility of the planning and forecast content.
            </p>
            <p>
              If you need to report a problem, suggest an update, or ask a policy question, please use the <Link className="text-almanac-green underline-offset-4 hover:underline" href="/contact">contact page</Link>.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
