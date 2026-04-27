import type { Metadata } from "next";
import Link from "next/link";

import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";

export const metadata: Metadata = {
  title: "Contact BiteForecast",
  description:
    "Contact BiteForecast about accuracy, privacy, advertising, legal, or general site questions.",
  alternates: buildMetadataAlternates("/contact"),
  openGraph: buildOpenGraph({
    title: "Contact BiteForecast",
    description:
      "Contact BiteForecast about accuracy, privacy, advertising, legal, or general site questions.",
    url: `${SITE_URL}/contact`,
  }),
};

export default function ContactPage() {
  return (
    <main className="bg-stone-950 px-6 py-16 text-stone-50">
      <article className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-6">
          <div className="space-y-4">
            <Link className="text-sm text-emerald-300 underline-offset-4 hover:underline" href="/">
              ← Back to BiteForecast
            </Link>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
              Contact
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Get in touch about BiteForecast
            </h1>
            <p className="text-lg text-stone-300">
              Use this form for site feedback, accuracy questions, privacy requests, legal concerns, or general business enquiries.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6 text-stone-300">
            <h2 className="text-2xl font-semibold text-stone-50">What to include</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>The page URL if your message is about a specific route</li>
              <li>The location and date if you are reporting a forecast accuracy issue</li>
              <li>Enough detail for us to understand the concern and reply usefully</li>
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-stone-800 bg-stone-900 p-6 shadow-2xl shadow-black/20">
          <form action="https://formspree.io/f/xkoqkkbw" className="grid gap-4" method="POST">
            <input name="_subject" type="hidden" value="BiteForecast contact form" />
            <label className="grid gap-2 text-sm text-stone-300">
              Name
              <input
                className="rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-stone-50 outline-none transition focus:border-emerald-300"
                name="name"
                required
                type="text"
              />
            </label>
            <label className="grid gap-2 text-sm text-stone-300">
              Email
              <input
                className="rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-stone-50 outline-none transition focus:border-emerald-300"
                name="email"
                required
                type="email"
              />
            </label>
            <label className="grid gap-2 text-sm text-stone-300">
              Topic
              <select
                className="rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-stone-50 outline-none transition focus:border-emerald-300"
                name="topic"
                defaultValue="General enquiry"
              >
                <option>General enquiry</option>
                <option>Forecast accuracy</option>
                <option>Privacy request</option>
                <option>Advertising or partnership</option>
                <option>Legal or policy question</option>
              </select>
            </label>
            <label className="grid gap-2 text-sm text-stone-300">
              Message
              <textarea
                className="min-h-40 rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-base text-stone-50 outline-none transition focus:border-emerald-300"
                name="message"
                required
              />
            </label>
            <button
              className="inline-flex w-fit rounded-full bg-emerald-300 px-5 py-3 font-medium text-stone-950 transition hover:bg-emerald-200"
              type="submit"
            >
              Send message
            </button>
            <p className="text-sm text-stone-500">
              By submitting this form, you are sending the details you enter to BiteForecast via Formspree for the purpose of responding to your enquiry.
            </p>
          </form>
        </section>
      </article>
    </main>
  );
}
