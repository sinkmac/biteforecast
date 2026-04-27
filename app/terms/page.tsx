import type { Metadata } from "next";
import Link from "next/link";

import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of use for BiteForecast, including site purpose, no-guarantee language, acceptable use, and advertising disclosures.",
  alternates: buildMetadataAlternates("/terms"),
  openGraph: buildOpenGraph({
    title: "Terms",
    description:
      "Terms of use for BiteForecast, including site purpose, no-guarantee language, acceptable use, and advertising disclosures.",
    url: `${SITE_URL}/terms`,
  }),
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
            These terms explain the basis on which BiteForecast is made available. By using the site, you agree to use it lawfully and to understand its limits as an information and planning tool.
          </p>
          <p className="text-sm text-stone-500">Last updated: 27 April 2026</p>
        </header>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Purpose of the site</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast provides planning guides, forecast-driven tools, and practical content about Scottish midge conditions. The aim is to help users make better timing, route, stop, and kit decisions.
            </p>
            <p>
              The site is intended for general informational use only. It is not a substitute for official weather forecasts, professional outdoor guidance, medical advice, or your own judgement in the field.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-amber-300/25 bg-amber-500/10 p-6">
          <h2 className="text-2xl font-semibold">No guarantee of conditions or outcomes</h2>
          <div className="mt-4 space-y-3 text-stone-100/90">
            <p>
              Scottish midge activity varies with weather, shelter, dampness, terrain, season, and micro-location. Conditions can change quickly and can differ sharply over short distances.
            </p>
            <p>
              Because of that, BiteForecast does not guarantee the accuracy, completeness, availability, or real-world outcome of any score, summary, route, recommendation, or product mention on the site.
            </p>
            <p>
              You remain responsible for your own travel plans, outdoor decisions, equipment choices, health considerations, and personal safety.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Acceptable use</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              You may use BiteForecast for personal planning, general research, editorial reference, and other lawful purposes.
            </p>
            <p>
              You must not misuse the site, interfere with its operation, attempt unauthorised access, scrape or automate requests in a way that harms service availability, or use the content in a misleading or unlawful manner.
            </p>
            <p>
              You must not present BiteForecast output as an official guarantee or falsely imply endorsement by the site operator.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">No scraping or abusive automation</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              You must not use bots, scripts, scrapers, or other automated methods to extract, copy, mirror, or monitor BiteForecast content in a way that is excessive, deceptive, commercially exploitative, or harmful to service availability.
            </p>
            <p>
              Reasonable search-engine crawling and normal browser use are not the target of this rule. The rule is aimed at abusive collection, unauthorised reuse, and activity that puts the service or its content at risk.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Content, methods, and changes</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast may update or remove pages, change calculation logic, revise wording, add or remove locations, alter affiliate links, or modify site features without notice.
            </p>
            <p>
              The site may also be unavailable from time to time because of maintenance, data-source outages, infrastructure problems, policy updates, or other operational reasons.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Advertising and affiliate disclosure</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast may display advertising, including Google AdSense placements, and may include affiliate links to third-party retailers.
            </p>
            <p>
              This means the site operator may receive revenue when ads are displayed or when qualifying purchases are made through affiliate links.
            </p>
            <p>
              Advertising or commercial relationships do not create a warranty, endorsement, or promise that any product, service, or destination will be right for your circumstances.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Third-party services and external links</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast relies on third-party services, including hosting, weather-data providers, advertising systems, contact-form processing, and external retailers.
            </p>
            <p>
              External links are provided for convenience and context. BiteForecast is not responsible for the content, pricing, availability, or practices of third-party services or websites.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Intellectual property and reuse</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              Unless stated otherwise, the BiteForecast site design, copy, and original compiled content remain the property of the site operator.
            </p>
            <p>
              Short quotations or references may be fair and reasonable when properly attributed, but wholesale copying, deceptive republishing, or unauthorised commercial reuse is not permitted.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Limitation of liability</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              To the fullest extent permitted by law, BiteForecast is provided on an as-is and as-available basis without warranties of any kind.
            </p>
            <p>
              The site operator is not liable for losses or damages arising from reliance on the site, inability to access the site, third-party outages, product purchases, travel choices, or changing outdoor conditions.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Governing law</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              These terms are governed by the law of Scotland. Any dispute or claim relating to BiteForecast or your use of the site should be interpreted in line with Scottish law, subject to any mandatory rights that apply in your place of residence.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <div className="mt-4 space-y-3 text-stone-100/90">
            <p>
              For legal, privacy, policy, or site-use questions, please use the <Link className="text-emerald-200 underline-offset-4 hover:underline" href="/contact">contact page</Link>.
            </p>
            <p>Continued use of BiteForecast after changes are published means you accept the updated terms.</p>
          </div>
        </section>
      </article>
    </main>
  );
}
