import type { Metadata } from "next";
import Link from "next/link";

import {
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../../lib/seo/site-metadata";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How BiteForecast handles site analytics, advertising, affiliate links, contact submissions, and basic technical data.",
  alternates: buildMetadataAlternates("/privacy-policy"),
  openGraph: buildOpenGraph({
    title: "Privacy policy",
    description:
      "How BiteForecast handles site analytics, advertising, affiliate links, contact submissions, and basic technical data.",
    url: `${SITE_URL}/privacy-policy`,
  }),
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
            This policy explains what BiteForecast may collect directly, what service providers may process on our behalf, and how advertising, affiliate links, and contact submissions fit into that picture.
          </p>
          <p className="text-sm text-stone-500">Last updated: 27 April 2026</p>
        </header>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Who this policy covers</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>This policy applies to the public BiteForecast website and its related pages, tools, and contact routes.</p>
            <p>BiteForecast is an information and planning site focused on Scottish midge conditions. It does not require user accounts to browse the main content.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Information we may receive automatically</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              Like most websites, BiteForecast and its hosting or infrastructure providers may process technical data such as IP address, approximate location derived from IP, browser type, device type, referring page, requested URL, timestamps, and basic diagnostic logs.
            </p>
            <p>
              This information is typically used for security, fraud prevention, service delivery, troubleshooting, performance monitoring, and aggregate traffic understanding.
            </p>
            <p>
              BiteForecast does not ask ordinary visitors to create a profile or submit personal account data in order to read the site.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Cookies and similar technologies</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast and third-party services used by the site may rely on cookies, local storage, pixels, or similar technologies to deliver pages, protect the service, remember basic preferences, measure performance, and support advertising or referral attribution.
            </p>
            <p>
              If you disable cookies in your browser, parts of the site may still work normally, but some third-party features or measurement functions may not.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Google AdSense and advertising</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast uses or may use Google AdSense and related advertising services. Google and its partners may use cookies or similar technologies to serve ads, measure performance, prevent fraud, limit repetition, and understand general browsing context.
            </p>
            <p>
              If personalised advertising is enabled by Google for eligible users, that processing is handled through Google&apos;s own systems and controls. BiteForecast does not operate a custom behavioural advertising platform.
            </p>
            <p>
              You can learn more about how Google uses information in advertising products through Google&apos;s policies and ad settings resources.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Affiliate links and outbound retailers</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              Some BiteForecast pages may include affiliate links to outdoor or midge-related products. If you follow one of those links, the retailer or affiliate network may collect information needed to attribute the referral and measure resulting purchases.
            </p>
            <p>
              That tracking is handled by the relevant retailer or network, not by a separate BiteForecast user account system.
            </p>
            <p>
              Product mentions are intended to support utility content, not to build a personal health, safety, or behaviour profile about you.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Contact form submissions</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              If you contact BiteForecast using the site form, the details you submit, such as your name, email address, topic, and message content, are processed so that your enquiry can be received and answered.
            </p>
            <p>
              Contact submissions are handled through Formspree, which acts as a service provider for form delivery. Any information you send should be limited to what is reasonably necessary for your request.
            </p>
            <p>
              Please do not send payment details, special category personal data, or other highly sensitive information through the public contact form.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">External links and third-party services</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              BiteForecast links to external services such as weather-data providers, mapping or reference sources, ad systems, and retailers. Once you leave BiteForecast, those third parties operate under their own terms and privacy policies.
            </p>
            <p>
              We do not control their practices and cannot guarantee that they match this policy.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">How long information may be kept</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>
              Technical logs and service diagnostics may be retained for as long as reasonably necessary for security, abuse prevention, performance monitoring, legal compliance, or operational troubleshooting.
            </p>
            <p>
              Contact enquiries may be retained for as long as needed to respond, maintain correspondence history, handle follow-up issues, or meet legal and administrative obligations.
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-stone-800 bg-stone-900 p-6">
          <h2 className="text-2xl font-semibold">Your choices</h2>
          <div className="mt-4 space-y-3 text-stone-300">
            <p>You can choose not to submit the contact form, block or clear cookies in your browser, and use Google&apos;s own advertising controls where available.</p>
            <p>If you contact BiteForecast about a privacy issue, please provide enough detail for the request to be understood and handled.</p>
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-6">
          <h2 className="text-2xl font-semibold">Contact</h2>
          <div className="mt-4 space-y-3 text-stone-100/90">
            <p>
              For privacy questions, accuracy concerns, legal notices, or general site issues, please use the <Link className="text-emerald-200 underline-offset-4 hover:underline" href="/contact">contact page</Link>.
            </p>
            <p>
              This policy may be updated from time to time as the site changes, new services are added, or legal wording needs to be clarified.
            </p>
          </div>
        </section>
      </article>
    </main>
  );
}
