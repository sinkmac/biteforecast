import type { Metadata } from "next";
import Link from "next/link";

import { buildMetadataAlternates } from "../../lib/seo/site-metadata";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How BiteForecast handles basic site data, cookies, Google AdSense, affiliate links, and contact requests.",
  alternates: buildMetadataAlternates("/privacy-policy"),
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-stone-950 px-6 py-16 text-stone-50">
      <article className="mx-auto flex max-w-4xl flex-col gap-8">
        <header className="space-y-4">
          <Link className="text-sm text-emerald-300 underline-offset-4 hover:underline" href="/">
            ← Back to BiteForecast
          </Link>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Privacy policy
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">How BiteForecast handles data</h1>
          <p className="max-w-3xl text-lg text-stone-300">
            BiteForecast is a public information and planning site. We keep this policy short and plain on purpose: what we collect, what third parties may collect, and what that means for you.
          </p>
          <p className="text-sm text-stone-500">Last updated: 17 April 2026</p>
        </header>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">What BiteForecast collects directly</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast does not currently ask you to create an account, submit a form, or hand over personal profile data to use the site.
            </p>
            <p>
              Like most websites, basic technical request data may still be processed by hosting, security, and delivery providers. That can include items such as IP address, browser type, device information, timestamps, and the page you requested.
            </p>
            <p>
              That information is used to keep the site online, secure, and performant. It is not used here to build a personal profile of you.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Cookies and similar technologies</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast may rely on cookies or similar storage set by infrastructure and third-party services in order to deliver pages, measure abuse, and support advertising or referral tracking.
            </p>
            <p>
              If you block cookies in your browser, most of the site should still remain readable, but some third-party features may not behave normally.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Google AdSense</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast uses or is preparing to use Google AdSense to serve advertising. Google may use cookies or similar technologies to show ads, limit repetition, measure performance, and understand general browsing context.
            </p>
            <p>
              Google&apos;s use of advertising data is governed by Google&apos;s own policies and controls. If Google begins serving personalised or contextual ads here, that processing will happen under Google&apos;s systems rather than a custom BiteForecast ad platform.
            </p>
            <p>
              You can learn more about how Google uses data in advertising products through Google&apos;s own privacy and ad settings documentation.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Affiliate links</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast may include affiliate links for practical midge-related kit. If you click one of those links, the retailer or network may place tracking technology so they can attribute the referral.
            </p>
            <p>
              That tracking is handled by the retailer or affiliate platform, not by a custom in-house tracking system on BiteForecast.
            </p>
            <p>
              Editorial intent comes first. Product prompts are meant to stay secondary to the utility of the site and will not be presented as scientific ranking or safety guarantees.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">External links and third parties</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast links to third-party services, including weather providers, ad systems, affiliate destinations, and public web platforms. Once you leave this site, their policies and practices apply.
            </p>
            <p>
              We do not control third-party privacy practices and cannot promise that they match this policy.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Contact details</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              If you need to raise a privacy, accuracy, or policy concern about BiteForecast, use the public project contact point here:
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
            <p>
              A dedicated public contact mailbox may be added later. Until then, the project issue tracker is the published contact route for site-level requests.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
