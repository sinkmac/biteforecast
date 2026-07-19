import type { Metadata } from "next";
import Link from "next/link";

import { BiteForecastHomeTool } from "../components/biteforecast-home-tool";
import { FaqSchema } from "../components/faq-block";
import RiskScore from "../components/risk-score";
import ThreatBar from "../components/threat-bar";
import Stamp from "../components/stamp";
import RiskLegend from "../components/risk-legend";
import { getRiskLabel } from "../lib/theme/risk";
import { FORECAST_LOCATIONS } from "../lib/forecast/locations";
import { getHomepageForecastSummaries } from "../lib/forecast/service";
import {
  HOMEPAGE_DESCRIPTION,
  HOMEPAGE_FAQS,
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../lib/seo/site-metadata";

const homepageApplicationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "BiteForecast",
      url: SITE_URL,
      description: HOMEPAGE_DESCRIPTION,
    },
    {
      "@type": "WebApplication",
      name: "BiteForecast live midge forecast",
      url: SITE_URL,
      description: HOMEPAGE_DESCRIPTION,
      applicationCategory: "WeatherApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    },
    {
      "@type": "Organization",
      name: "AI Scotland Productions",
      url: "https://aiscotlandproductions.com",
    },
  ],
};

const DEFAULT_SEASONAL_FALLBACK = {
  1: "Low",
  2: "Low",
  3: "Low",
  4: "Guarded",
  5: "Moderate",
  6: "High",
  7: "High",
  8: "High",
  9: "Moderate",
  10: "Guarded",
  11: "Low",
  12: "Low",
} as const;

const locationCards = FORECAST_LOCATIONS.map((location) => ({
  ...location,
  region: location.midgeSeason,
  broaderArea: location.description,
  coordinates: { latitude: location.lat, longitude: location.lng },
  seasonalFallbackByMonth: DEFAULT_SEASONAL_FALLBACK,
  planningRiskBand: "Moderate" as const,
  planningTakeaway: location.description,
}));

export const metadata: Metadata = {
  title: "Will there be midges where I'm going?",
  description: HOMEPAGE_DESCRIPTION,
  alternates: buildMetadataAlternates("/"),
  openGraph: buildOpenGraph({
    title: "Will there be midges where I'm going?",
    description: HOMEPAGE_DESCRIPTION,
    url: SITE_URL,
  }),
};

export const revalidate = 10800;

export default async function Home() {
  const forecastSummaries = await getHomepageForecastSummaries();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageApplicationSchema) }} />
      <FaqSchema faqs={HOMEPAGE_FAQS} />

      {/* ================================================================ */}
      {/* DESKTOP LAYOUT (≥768px)                                          */}
      {/* ================================================================ */}
      <div className="hidden md:block">
        {/* ── Hero ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 330px",
            gap: 56,
            padding: "56px 56px 46px",
          }}
        >
          <div>
            <div className="font-mono" style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.18em", color: "var(--color-risk-low)", marginBottom: 18 }}>
              LIVE MIDGE FORECAST — EVERY 3 HOURS
            </div>
            <h1 className="font-serif" style={{ fontWeight: 500, fontSize: 60, lineHeight: 1.02, letterSpacing: "-0.02em", margin: "0 0 20px", textWrap: "balance" }}>
              Will there be midges where I&rsquo;m going?
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.6, color: "var(--color-secondary)", margin: 0, maxWidth: 54 } as React.CSSProperties}>
              Plain-English midge risk for twenty Highland destinations, updated every three hours. Free, no registration. Click any location for current conditions on the ground.
            </p>
          </div>
          <div style={{ alignSelf: "end", borderLeft: "2px solid var(--color-risk-low)", paddingLeft: 20 }}>
            <p className="font-serif" style={{ fontStyle: "italic", fontSize: 19, lineHeight: 1.45, margin: "0 0 10px", color: "#333a2f" }}>
              &ldquo;The best defence against insects short of a rolled up newspaper.&rdquo;
            </p>
            <p className="font-mono" style={{ fontSize: 11, color: "var(--color-muted-mid)", margin: 0 }}>
              — AIR VICE-MARSHAL GRIEVE, FILE: THE BAMPOT
            </p>
          </div>
        </div>

        {/* ── Section head ── */}
        <div style={{ padding: "0 56px 12px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Today across the Highlands
          </div>
          <RiskLegend />
        </div>

        {/* ── Location grid (4×5) ── */}
        <div className="grid-almanac" style={{ margin: "0 56px 28px", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {forecastSummaries.map((summary, i) => {
            const label = getRiskLabel(summary.index);
            return (
              <Link
                key={summary.location.slug}
                href={`/forecast/${summary.location.slug}`}
                className="hover-card"
                style={{
                  display: "block",
                  padding: "20px 22px 18px",
                  background: "var(--color-card-bg)",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                  <div className="font-serif" style={{ fontSize: 17, fontWeight: 500 }}>{summary.location.name}</div>
                  <div className="font-mono" style={{ fontSize: 10, color: "var(--color-muted-light)" }}>№{String(i + 1).padStart(2, "0")}</div>
                </div>
                <RiskScore score={summary.index} size="card" />
                <div style={{ marginTop: 12 }}>
                  <ThreatBar score={summary.index} />
                </div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: "var(--color-secondary)", marginTop: 11 }}>
                  {label}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="font-mono" style={{ padding: "0 56px 8px", fontSize: 11, color: "var(--color-muted-light)" }}>
          Forecast scores shown are illustrative for this design mock.
        </div>

        {/* ── Planner band ── */}
        <div style={{ margin: "40px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid var(--color-border-ink)" }}>
          <div style={{ padding: "38px 40px", background: "var(--color-ink)", color: "var(--color-card-bg)" }}>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--color-on-dark-green)", marginBottom: 14 }}>
              PLAN AHEAD
            </div>
            <div className="font-serif" style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.1, marginBottom: 12 }}>
              Skip the midges.<br /><span style={{ fontStyle: "italic" }}>Not the scenery.</span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, color: "var(--color-on-dark-muted)", margin: 0 }}>
              Choose a location and date — or allow GPS to pick the nearest forecast point — and we&rsquo;ll tell you your risk in plain English.
            </p>
          </div>
          <div style={{ padding: "38px 40px", background: "var(--color-card-bg)", display: "flex", flexDirection: "column", gap: 16, justifyContent: "center" }}>
            <BiteForecastHomeTool locations={locationCards} />
          </div>
        </div>

        {/* ── Bampot block ── */}
        <div className="divider-dashed" style={{ margin: "0 56px 0" }} />
        <div style={{ margin: "0 56px 48px", paddingTop: 32, display: "grid", gridTemplateColumns: "200px 1fr", gap: 40 }}>
          <div>
            <Stamp text="FILE: THE BAMPOT" variant="file" />
            <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--color-muted-light)", marginTop: 10 }}>
              CLASSIFIED
            </div>
          </div>
          <div>
            <div className="font-serif" style={{ fontSize: 22, fontWeight: 500, marginBottom: 10 }}>
              Intelligence summary
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.7, color: "var(--color-secondary)", margin: 0, maxWidth: 72 } as React.CSSProperties}>
              The data on this page is derived from Air Vice-Marshal Grieve&rsquo;s own tactical intelligence — intercepted communiqués from the airborne divisions known as The Cloud. We reframe his operational reports as a practical midge forecast. He is not consulted on the editorial direction. He writes letters. We ignore them.
            </p>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* MOBILE LAYOUT (<768px)                                           */}
      {/* ================================================================ */}
      <div className="block md:hidden">
        {/* ── Hero (stacked) ── */}
        <div style={{ padding: "32px 20px 24px" }}>
          <div className="font-mono" style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.16em", color: "var(--color-risk-low)", marginBottom: 12 }}>
            LIVE MIDGE FORECAST — EVERY 3 HOURS
          </div>
          <h1 className="font-serif" style={{ fontWeight: 500, fontSize: 36, lineHeight: 1.05, letterSpacing: "-0.015em", margin: "0 0 14px", textWrap: "balance" }}>
            Will there be midges where I&rsquo;m going?
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.6, color: "var(--color-secondary)", margin: 0 }}>
            Plain-English midge risk for twenty Highland destinations. Free, no registration. Tap a location for conditions on the ground.
          </p>
        </div>

        {/* ── Section head ── */}
        <div style={{ padding: "0 20px 10px", display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Today
          </div>
          <RiskLegend />
        </div>

        {/* ── Location list (single column, not cards) ── */}
        <div style={{ margin: "0 20px 24px", borderTop: "1px solid var(--color-border-ink)", display: "flex", flexDirection: "column" }}>
          {forecastSummaries.map((summary, i) => {
            const label = getRiskLabel(summary.index);
            return (
              <Link
                key={summary.location.slug}
                href={`/forecast/${summary.location.slug}`}
                className="hover-card"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "4px 14px",
                  alignItems: "center",
                  padding: "14px 4px",
                  borderBottom: "1px solid var(--color-border-ink)",
                  textDecoration: "none",
                  color: "inherit",
                  minHeight: 44,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span className="font-mono" style={{ fontSize: 9, color: "var(--color-muted-light)" }}>{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif" style={{ fontSize: 16.5, fontWeight: 500 }}>{summary.location.name}</span>
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <ThreatBar score={summary.index} />
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <RiskScore score={summary.index} size="card" />
                  <div style={{ fontFamily: "var(--font-body)", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", color: "var(--color-secondary)", marginTop: 5 }}>
                    {label}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ── Planner (full width, stacked) ── */}
        <div style={{ margin: "0 20px 28px", border: "1px solid var(--color-border-ink)" }}>
          <div style={{ padding: "24px 22px", background: "var(--color-ink)", color: "var(--color-card-bg)" }}>
            <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--color-on-dark-green)", marginBottom: 10 }}>
              PLAN AHEAD
            </div>
            <div className="font-serif" style={{ fontSize: 24, fontWeight: 500, lineHeight: 1.15 }}>
              Skip the midges. <span style={{ fontStyle: "italic" }}>Not the scenery.</span>
            </div>
          </div>
          <div style={{ padding: 22, background: "var(--color-card-bg)" }}>
            <BiteForecastHomeTool locations={locationCards} />
          </div>
        </div>

        {/* ── Bampot block ── */}
        <div style={{ margin: "0 20px 32px" }}>
          <div className="divider-dashed" style={{ margin: 0 }} />
          <div style={{ paddingTop: 24 }}>
            <Stamp text="FILE: THE BAMPOT" variant="file" />
            <div className="font-serif" style={{ fontSize: 19, fontWeight: 500, marginTop: 14, marginBottom: 8 }}>
              Intelligence summary
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.65, color: "var(--color-secondary)", margin: 0 }}>
              Data derived from Air Vice-Marshal Grieve&rsquo;s tactical intelligence — intercepted communiqués from the airborne divisions known as The Cloud. He is not consulted on the editorial direction. He writes letters. We ignore them.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}