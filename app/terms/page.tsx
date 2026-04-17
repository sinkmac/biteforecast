import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Plain-language terms of use for BiteForecast as a Scottish midge planning and weather-information utility site.",
};

export default function TermsPage() {
  return (
    <main className="bg-stone-950 px-6 py-16 text-stone-50">
      <article className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-4">
          <Link className="text-sm text-emerald-300 underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Terms of use
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Terms for using BiteForecast</h1>
          <p className="max-w-3xl text-lg text-stone-300">
            BiteForecast is a practical information tool for planning around Scottish midge conditions. These terms are meant to be readable: use the site responsibly, understand what it is for, and do not treat it as a guaranteed field forecast or professional advice.
          </p>
          <p className="text-sm text-stone-500">Last updated: 17 April 2026</p>
        </header>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">What the site is</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast provides planning guides, location pattern summaries, and a weather-backed calculator intended to help with trip timing and kit decisions.
            </p>
            <p>
              It is an informational utility, not a promise that real-world conditions will match the site output.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">No guarantee of conditions</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              Weather, terrain, shelter, humidity, time of day, and local variation can change quickly. Even when live data is available, BiteForecast should be treated as guidance rather than a guarantee.
            </p>
            <p>
              You remain responsible for your own travel, safety, comfort, health decisions, and equipment choices.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Acceptable use</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              You may use BiteForecast for personal trip planning, research, and general information. Do not misuse the site, interfere with its operation, scrape it abusively, or use it in a way that creates security or availability problems.
            </p>
            <p>
              Do not represent BiteForecast outputs as guaranteed official forecasts or attribute statements to the site that it does not make.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Third-party services and links</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast depends on third-party services such as hosting, weather data, advertising systems, and affiliate partners. Those services may change, fail, or behave differently from what BiteForecast expects.
            </p>
            <p>
              Links to retailers, ad networks, or external resources are provided for convenience. BiteForecast is not responsible for the content, availability, pricing, or conduct of those third-party services.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Affiliate and advertising disclosures</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast may show advertising and may use affiliate links. That means the site operator may receive revenue if you view ads or buy through a qualifying referral link.
            </p>
            <p>
              That commercial relationship does not turn product mentions into safety guarantees, expert certification, or a promise that a given item is right for your situation.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Changes and availability</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast may change pages, methods, routes, recommendations, legal pages, or available features without notice. Parts of the site may also be unavailable temporarily for maintenance, data-source issues, or infrastructure problems.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              For site-level questions or policy issues, use the public project contact point:
            </p>
            <p>
              <a
                className="text-emerald-300 underline-offset-4 hover:underline"
                href="https://github.com/sinkmac/biteforecast/issues"
                rel="noreferrer"
                target="_blank"
              >
                https://github.com/sinkmac/biteforecast/issues
              </a>
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
