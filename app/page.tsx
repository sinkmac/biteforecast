import type { Metadata } from "next";
import Link from "next/link";

import { FaqSchema, FaqSection } from "../components/faq-block";
import {
  HOMEPAGE_DESCRIPTION,
  HOMEPAGE_FAQS,
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../lib/seo/site-metadata";
import {
  getLocationPageBySlug,
  getLocationPageSlugs,
} from "../lib/seo/location-pages";

const locationCards = getLocationPageSlugs()
  .map((slug) => getLocationPageBySlug(slug))
  .filter((page) => page !== undefined);

export const metadata: Metadata = {
  title: "Scotland's midge forecast and planning tool",
  description: HOMEPAGE_DESCRIPTION,
  alternates: buildMetadataAlternates("/"),
  openGraph: buildOpenGraph({
    title: "Scotland's midge forecast and planning tool",
    description: HOMEPAGE_DESCRIPTION,
    url: SITE_URL,
  }),
};

export default function Home() {
  return (
    <>
      <FaqSchema faqs={HOMEPAGE_FAQS} />
      <main className="min-h-screen bg-stone-950 px-6 py-16 text-stone-50">
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <section className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
              BiteForecast
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Planning a trip to the Highlands? Check the midges first.
            </h1>
            <p className="max-w-3xl text-lg text-stone-300">
              Location guides for planning ahead. Live calculator for the day itself.
            </p>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Link
              className="rounded-2xl border border-stone-700 bg-stone-900 p-6 transition hover:border-stone-500 hover:bg-stone-800"
              href="/midge-wind-watch"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-stone-400">
                Live calculator
              </p>
              <h2 className="mt-3 text-2xl font-semibold">Midge Wind-Watch</h2>
              <p className="mt-2 text-stone-300">
                Check live midge conditions for your location right now, with wind speed, humidity, and time of day factored in.
              </p>
            </Link>

            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
                Planning guides
              </p>
              <h2 className="mt-3 text-2xl font-semibold">All eight launch locations</h2>
              <p className="mt-2 text-stone-300">
                Jump straight to the destination you care about, then use the live calculator before you travel.
              </p>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                href: "/about",
                label: "About",
                title: "What BiteForecast is for",
                body: "Understand how the site fits together and how to use it well.",
              },
              {
                href: "/how-we-calculate",
                label: "Method",
                title: "How risk is calculated",
                body: "See the plain-English logic behind the live scoring approach.",
              },
              {
                href: "/midge-hotspots",
                label: "Hotspots",
                title: "Where midges usually feel worst",
                body: "Learn the kinds of sheltered Scottish spots that often catch visitors out.",
              },
              {
                href: "/midge-repellents",
                label: "Practical kit",
                title: "Repellents and protection",
                body: "Keep product advice realistic and secondary to timing and location choice.",
              },
            ].map((card) => (
              <Link
                key={card.href}
                className="rounded-2xl border border-stone-800 bg-stone-900 p-6 transition hover:border-emerald-400/40 hover:bg-stone-800"
                href={card.href}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  {card.label}
                </p>
                <h2 className="mt-3 text-2xl font-semibold">{card.title}</h2>
                <p className="mt-2 text-stone-300">{card.body}</p>
              </Link>
            ))}
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {locationCards.map((page) => (
              <Link
                key={page.slug}
                className="rounded-2xl border border-stone-800 bg-stone-900 p-6 transition hover:border-emerald-400/40 hover:bg-stone-800"
                href={`/scotland/${page.slug}`}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
                  {page.region}
                </p>
                <h2 className="mt-3 text-2xl font-semibold">{page.name}</h2>
                <p className="mt-2 text-sm text-stone-400">
                  Planning baseline: {page.planningRiskBand}
                </p>
                <p className="mt-3 text-stone-300">{page.planningTakeaway}</p>
              </Link>
            ))}
          </section>

          <FaqSection faqs={HOMEPAGE_FAQS} title="Homepage FAQ" />

          <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
            <h2 className="text-2xl font-semibold">Before you head out</h2>
            <div className="mt-4 space-y-4 text-stone-300">
              <p>
                If the forecast is showing high midge activity, these are worth having.
              </p>
              <p>
                Smidge is the repellent most Scots actually use. DEET-free, effective,
                and doesn&apos;t strip the finish off your waterproofs. {" "}
                <a
                  className="text-emerald-300 underline decoration-emerald-500/60 underline-offset-4"
                  href="https://www.amazon.co.uk/s?k=Smidge+midge+repellent&tag=biteforecast2-21"
                  rel="nofollow sponsored noopener noreferrer"
                  target="_blank"
                >
                  Amazon UK
                </a>
              </p>
              <p>
                Avon Skin So Soft Dry Oil Spray remains the unexpected local favourite —
                hillwalkers have sworn by it for decades. {" "}
                <a
                  className="text-emerald-300 underline decoration-emerald-500/60 underline-offset-4"
                  href="https://www.amazon.co.uk/s?k=Avon+Skin+So+Soft+spray&tag=biteforecast2-21"
                  rel="nofollow sponsored noopener noreferrer"
                  target="_blank"
                >
                  Amazon UK
                </a>
              </p>
              <p>
                A midge head net costs almost nothing and is the only guaranteed solution
                when conditions are severe. {" "}
                <a
                  className="text-emerald-300 underline decoration-emerald-500/60 underline-offset-4"
                  href="https://www.amazon.co.uk/s?k=midge+head+net&tag=biteforecast2-21"
                  rel="nofollow sponsored noopener noreferrer"
                  target="_blank"
                >
                  Amazon UK
                </a>
              </p>
              <p>
                If you&apos;re going out with children, insect repellent wristbands are easier
                than applying spray. {" "}
                <a
                  className="text-emerald-300 underline decoration-emerald-500/60 underline-offset-4"
                  href="https://www.amazon.co.uk/s?k=insect+repellent+wristbands+kids&tag=biteforecast2-21"
                  rel="nofollow sponsored noopener noreferrer"
                  target="_blank"
                >
                  Amazon UK
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
