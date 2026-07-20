import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getForecastLocationBySlug,
  FORECAST_LOCATIONS,
} from "../../../lib/forecast/locations";
import {
  getHomepageForecastSummaries,
  getMidgeForecast,
  formatTime,
} from "../../../lib/forecast/service";
import {
  getMidgeRecommendation,
} from "../../../lib/forecast/midge-index";
import { ForecastWhatToBring } from "../../../components/affiliate-kit";
import { CopyShareTextButton } from "../../../components/copy-share-text-button";
import {
  GrieveOverlay,
  getGrieveLevel,
  getGrieveStateName,
} from "../../../components/grieve-overlay";
import { OPERATIONAL_FACTS, SITE_URL, buildForecastPageTitle, buildMetadataAlternates, buildOpenGraph } from "../../../lib/seo/site-metadata";
import {
  OvernightWatchCard,
} from "../../../components/overnight-watch-card";

import RiskScore from "../../../components/risk-score";
import ThreatBar from "../../../components/threat-bar";
import Stamp from "../../../components/stamp";
import { getRiskColor, getRiskLabel } from "../../../lib/theme/risk";
import { getPlainEnglishAdvice, getNearbyPoints } from "../../../lib/forecast/almanac-utils";

export const revalidate = 10800;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getForecastLocationBySlug(slug);

  if (!location) {
    return { title: "Midge forecast not found" };
  }

  const forecast = await getMidgeForecast(slug);
  const index = forecast?.current.index ?? 0;
  const label = forecast?.current.label ?? "Low";
  const recommendation = forecast?.current.recommendation ?? getMidgeRecommendation(index);
  const title = buildForecastPageTitle(location.name);
  const description = `Current midge activity at ${location.name}: ${label} (${index}/10). Updated ${OPERATIONAL_FACTS.updateCadenceLabel}. ${recommendation}`;
  const url = `${SITE_URL}/forecast/${slug}`;

  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: buildMetadataAlternates(`/forecast/${slug}`),
    openGraph: buildOpenGraph({ title, description, url }),
  };
}

function cloudDescription(cover: number): string {
  if (cover >= 80) return "Overcast";
  if (cover >= 50) return "Mostly cloudy";
  if (cover >= 20) return "Partly cloudy";
  return "Clear";
}

export default async function ForecastPage({ params }: PageProps) {
  const { slug } = await params;
  const forecast = await getMidgeForecast(slug);

  if (!forecast) {
    notFound();
  }

  const grieveLevel = getGrieveLevel(forecast.current.index);
  const grieveStateName = getGrieveStateName(grieveLevel);
  const shareText = ` 🏴󠁧󠁢󠁳󠁣󠁴󠁿 ${forecast.location.name} midge forecast: ${forecast.current.label.toUpperCase()} (${forecast.current.index}/10)\\\\n${grieveStateName}\\\\nbiteforecast.scot/forecast/${forecast.location.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: buildForecastPageTitle(forecast.location.name),
    url: `${SITE_URL}/forecast/${forecast.location.slug}`,
    description: `Current midge activity at ${forecast.location.name}: ${forecast.current.label} (${forecast.current.index}/10).`,
    dateModified: forecast.generated.toISOString(),
  };

  const locationIndex = FORECAST_LOCATIONS.findIndex((l) => l.slug === slug);
  const paddedIndex = String(locationIndex + 1).padStart(2, "0");

  /* Timeline: 8 × 3-hour slots starting from current slot */
  const timelineSlots = forecast.hourly.slice(0, 8).map((point) => {
    const isNow = point.time.getTime() === forecast.generated.getTime();
    const c = getRiskColor(point.index);
    const h = 10 + point.index * 9;
    return {
      t: formatTime(point.time),
      score: point.index,
      color: c,
      height: h,
      nowBg: isNow ? "var(--color-card-hover)" : "var(--color-card-bg)",
    };
  });

  /* Nearby points */
  const allSummaries = await getHomepageForecastSummaries();
  const scoreMap = new Map(allSummaries.map((s) => [s.location.slug, s.index]));

  const nearbyPoints = getNearbyPoints(
    slug,
    forecast.location.lat,
    forecast.location.lng,
    FORECAST_LOCATIONS,
    (s) => scoreMap.get(s) ?? 0,
    getRiskColor,
  );

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ================================================================ */}
      {/* DESKTOP LAYOUT (≥768px)                                          */}
      {/* ================================================================ */}
      <div className="hidden md:block">
        {/* ── Breadcrumb ── */}
        <div className="font-mono" style={{ padding: "22px 56px 0", fontSize: 11, color: "var(--color-muted-mid)" }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            ← ALL LOCATIONS
          </Link>
          &nbsp;/&nbsp;
          <span style={{ color: "var(--color-risk-low)" }}>FORECAST POINT №{paddedIndex}</span>
        </div>

        {/* ── Hero: 2-col ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 56, padding: "26px 56px 40px", alignItems: "start" }}>
          <div>
            <h1 className="font-serif" style={{ fontWeight: 500, fontSize: 58, lineHeight: 1.02, letterSpacing: "-0.02em", margin: "0 0 14px" }}>
              {forecast.location.name}
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15.5, lineHeight: 1.6, color: "var(--color-secondary)", margin: "0 0 26px", maxWidth: "56ch" } as React.CSSProperties}>
              {forecast.location.description} Season: {forecast.location.midgeSeason}.
            </p>
            <div style={{ borderLeft: "2px solid var(--color-risk-moderate)", paddingLeft: 20, marginBottom: 8 }}>
              <div className="font-mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--color-risk-moderate)", marginBottom: 8 }}>
                IN PLAIN ENGLISH
              </div>
              <p className="font-serif" style={{ fontSize: 21, lineHeight: 1.45, margin: 0, color: "#333a2f" }}>
                {getPlainEnglishAdvice(forecast.current.index, forecast.generated, forecast.location.name)}
              </p>
            </div>
          </div>

          {/* RIGHT NOW card */}
          <div style={{ border: "1px solid var(--color-border-ink)", background: "var(--color-card-bg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 22px", borderBottom: "1px solid var(--color-border-ink)", background: "var(--color-ink)", color: "var(--color-card-bg)" }}>
              <span className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.18em" }}>
                RIGHT NOW · {formatTime(forecast.generated)}
              </span>
              <span className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.18em", color: "var(--color-on-dark-amber)" }}>
                {getRiskLabel(forecast.current.index)}
              </span>
            </div>
            <div style={{ padding: "26px 22px 8px" }}>
              <RiskScore score={forecast.current.index} size="detail" />
            </div>
            <div style={{ padding: "0 22px 22px" }}>
              <ThreatBar score={forecast.current.index} size="detail" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--color-border-ink)" }}>
              <div style={{ padding: "14px 22px", borderRight: "1px solid var(--color-border-light)", borderBottom: "1px solid var(--color-border-light)" }}>
                <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: "0.16em", color: "var(--color-muted-mid)" }}>WIND</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, marginTop: 4 }}>{Math.round(forecast.current.windMph)} mph</div>
              </div>
              <div style={{ padding: "14px 22px", borderBottom: "1px solid var(--color-border-light)" }}>
                <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: "0.16em", color: "var(--color-muted-mid)" }}>TEMP</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, marginTop: 4 }}>{Math.round(forecast.current.temp)}°C</div>
              </div>
              <div style={{ padding: "14px 22px", borderRight: "1px solid var(--color-border-light)" }}>
                <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: "0.16em", color: "var(--color-muted-mid)" }}>HUMIDITY</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, marginTop: 4 }}>{Math.round(forecast.current.humidity)}%</div>
              </div>
              <div style={{ padding: "14px 22px" }}>
                <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: "0.16em", color: "var(--color-muted-mid)" }}>CLOUD</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, marginTop: 4 }}>{cloudDescription(forecast.current.cloudCover)}</div>
              </div>
            </div>
            <div style={{ padding: "12px 22px", borderTop: "1px solid var(--color-border-ink)", fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--color-muted-light)", letterSpacing: "0.08em" }}>
              WIND ABOVE ~7 MPH GROUNDS THE CLOUD. WATCH FOR IT DROPPING.
            </div>
          </div>
        </div>

        {/* ── Next 24 hours ── */}
        <div style={{ padding: "0 56px 14px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Next 24 hours
          </div>
          <div className="font-mono" style={{ fontSize: 11, color: "var(--color-muted-mid)" }}>
            3-HOUR INTERVALS · LOCAL TIME
          </div>
        </div>
        <div style={{ margin: "0 56px 44px", border: "1px solid var(--color-border-ink)", display: "grid", gridTemplateColumns: "repeat(8, 1fr)", background: "var(--color-card-bg)" }}>
          {timelineSlots.map((slot, i) => (
            <div key={i} style={{ borderRight: i < 7 ? "1px solid var(--color-border-light)" : "none", padding: "18px 14px 16px", display: "flex", flexDirection: "column", gap: 10, background: slot.nowBg }}>
              <div className="font-mono" style={{ fontSize: 10.5, color: "var(--color-muted-mid)", letterSpacing: "0.08em" }}>{slot.t}</div>
              <div style={{ height: 100, display: "flex", alignItems: "flex-end" }}>
                <div style={{ width: "100%", background: slot.color, height: slot.height }} />
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
                <span className="font-serif" style={{ fontWeight: 600, fontSize: 22, lineHeight: 1, color: slot.color }}>{slot.score}</span>
                <span className="font-mono" style={{ fontSize: 9.5, color: "var(--color-muted-light)" }}>/10</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Know this glen + Bampot ── */}
        <div style={{ margin: "0 56px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, borderTop: "1px dashed var(--color-border-dashed)", paddingTop: 32 }}>
          <div>
            <div className="font-serif" style={{ fontSize: 22, fontWeight: 500, marginBottom: 12 }}>
              Know this {forecast.location.name.includes("Glen") ? "glen" : "place"}
            </div>
            {forecast.location.localNotes ? (
              <>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.7, color: "var(--color-secondary)", margin: "0 0 12px" }}>{forecast.location.localNotes[0]}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.7, color: "var(--color-secondary)", margin: 0 }}>{forecast.location.localNotes[1]}</p>
              </>
            ) : (
              <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.7, color: "var(--color-secondary)", margin: 0 }}>{forecast.location.description}</p>
            )}
          </div>
          <div style={{ border: "1px solid var(--color-border-ink)", background: "var(--color-card-bg)", padding: "24px 26px", alignSelf: "start" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 12 }}>
              <Stamp text="INTERCEPTED" variant="intercepted" />
              <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--color-muted-light)" }}>FILE: THE BAMPOT</div>
            </div>
            <p className="font-serif" style={{ fontStyle: "italic", fontSize: 17.5, lineHeight: 1.5, margin: "0 0 8px", color: "#333a2f" }}>
              &ldquo;The {forecast.location.name.includes("Glen") ? "glen" : "sector"} reports excellent feeding conditions at dusk. Morale among the squadrons is regrettably high.&rdquo;
            </p>
            <p className="font-mono" style={{ fontSize: 10.5, color: "var(--color-muted-mid)", margin: 0 }}>
              — AIR VICE-MARSHAL GRIEVE, EVENING DISPATCH
            </p>
          </div>
        </div>

        {/* ── Nearby forecast points ── */}
        <div style={{ margin: "0 56px", padding: "0 0 14px", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Nearby forecast points
        </div>
        <div className="grid-almanac" style={{ margin: "0 56px 48px", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {nearbyPoints.length > 0 ? nearbyPoints.map((pt) => (
            <Link key={pt.slug} href={`/forecast/${pt.slug}`} className="hover-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "16px 20px", background: "var(--color-card-bg)", textDecoration: "none", color: "inherit" }}>
              <span className="font-serif" style={{ fontSize: 16, fontWeight: 500 }}>{pt.name}</span>
              <span className="font-serif" style={{ fontWeight: 600, fontSize: 24, color: pt.color }}>{pt.score > 0 ? pt.score : "—"}</span>
            </Link>
          )) : (
            <div style={{ padding: "16px 20px", background: "var(--color-card-bg)", gridColumn: "1 / -1" }}>
              <span className="font-mono" style={{ fontSize: 11, color: "var(--color-muted-mid)" }}>No nearby forecast points available.</span>
            </div>
          )}
        </div>
      </div>

      {/* ================================================================ */}
      {/* MOBILE LAYOUT (<768px)                                           */}
      {/* ================================================================ */}
      <div className="block md:hidden">
        {/* ── Breadcrumb ── */}
        <div className="font-mono" style={{ padding: "18px 20px 0", fontSize: 10, color: "var(--color-muted-mid)" }}>
          <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
            ← ALL LOCATIONS
          </Link>
          &nbsp;/&nbsp;
          <span style={{ color: "var(--color-risk-low)" }}>FORECAST POINT №{paddedIndex}</span>
        </div>

        {/* ── Hero location info ── */}
        <div style={{ padding: "20px 20px 16px" }}>
          <h1 className="font-serif" style={{ fontWeight: 500, fontSize: 36, lineHeight: 1.05, letterSpacing: "-0.015em", margin: "0 0 12px" }}>
            {forecast.location.name}
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, color: "var(--color-secondary)", margin: "0 0 20px" }}>
            {forecast.location.description} Season: {forecast.location.midgeSeason}.
          </p>
          <div style={{ borderLeft: "2px solid var(--color-risk-moderate)", paddingLeft: 16 }}>
            <div className="font-mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--color-risk-moderate)", marginBottom: 6 }}>
              IN PLAIN ENGLISH
            </div>
            <p className="font-serif" style={{ fontSize: 18, lineHeight: 1.4, margin: 0, color: "#333a2f" }}>
              {getPlainEnglishAdvice(forecast.current.index, forecast.generated, forecast.location.name)}
            </p>
          </div>
        </div>

        {/* ── RIGHT NOW card ── */}
        <div style={{ margin: "0 20px 24px", border: "1px solid var(--color-border-ink)", background: "var(--color-card-bg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid var(--color-border-ink)", background: "var(--color-ink)", color: "var(--color-card-bg)" }}>
            <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.16em" }}>
              RIGHT NOW · {formatTime(forecast.generated)}
            </span>
            <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.16em", color: "var(--color-on-dark-amber)" }}>
              {getRiskLabel(forecast.current.index)}
            </span>
          </div>
          <div style={{ padding: "20px 16px 6px" }}>
            <RiskScore score={forecast.current.index} size="detail" />
          </div>
          <div style={{ padding: "0 16px 18px" }}>
            <ThreatBar score={forecast.current.index} size="detail" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid var(--color-border-ink)" }}>
            <div style={{ padding: "12px 16px", borderRight: "1px solid var(--color-border-light)", borderBottom: "1px solid var(--color-border-light)" }}>
              <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.16em", color: "var(--color-muted-mid)" }}>WIND</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, marginTop: 4 }}>{Math.round(forecast.current.windMph)} mph</div>
            </div>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--color-border-light)" }}>
              <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.16em", color: "var(--color-muted-mid)" }}>TEMP</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, marginTop: 4 }}>{Math.round(forecast.current.temp)}°C</div>
            </div>
            <div style={{ padding: "12px 16px", borderRight: "1px solid var(--color-border-light)" }}>
              <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.16em", color: "var(--color-muted-mid)" }}>HUMIDITY</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, marginTop: 4 }}>{Math.round(forecast.current.humidity)}%</div>
            </div>
            <div style={{ padding: "12px 16px" }}>
              <div className="font-mono" style={{ fontSize: 9, letterSpacing: "0.16em", color: "var(--color-muted-mid)" }}>CLOUD</div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, marginTop: 4 }}>{cloudDescription(forecast.current.cloudCover)}</div>
            </div>
          </div>
          <div style={{ padding: "10px 16px", borderTop: "1px solid var(--color-border-ink)", fontFamily: "var(--font-mono)", fontSize: 9.5, color: "var(--color-muted-light)", letterSpacing: "0.06em" }}>
            WIND ABOVE ~7 MPH GROUNDS THE CLOUD. WATCH FOR IT DROPPING.
          </div>
        </div>

        {/* ── Next 24 hours ── */}
        <div style={{ padding: "0 20px 10px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Next 24 hours
          </div>
          <div className="font-mono" style={{ fontSize: 10, color: "var(--color-muted-mid)" }}>
            3-HOUR INTERVALS
          </div>
        </div>
        <div style={{ margin: "0 20px 28px", border: "1px solid var(--color-border-ink)", overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(8, 100px)", background: "var(--color-card-bg)", minWidth: 800 }}>
            {timelineSlots.map((slot, i) => (
              <div key={i} style={{ borderRight: i < 7 ? "1px solid var(--color-border-light)" : "none", padding: "14px 10px 12px", display: "flex", flexDirection: "column", gap: 8, background: slot.nowBg }}>
                <div className="font-mono" style={{ fontSize: 9.5, color: "var(--color-muted-mid)", letterSpacing: "0.08em" }}>{slot.t}</div>
                <div style={{ height: 80, display: "flex", alignItems: "flex-end" }}>
                  <div style={{ width: "100%", background: slot.color, height: slot.height }} />
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
                  <span className="font-serif" style={{ fontWeight: 600, fontSize: 20, lineHeight: 1, color: slot.color }}>{slot.score}</span>
                  <span className="font-mono" style={{ fontSize: 9, color: "var(--color-muted-light)" }}>/10</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Know this glen + Bampot (stacked) ── */}
        <div style={{ margin: "0 20px 28px", borderTop: "1px dashed var(--color-border-dashed)", paddingTop: 24 }}>
          <div className="font-serif" style={{ fontSize: 19, fontWeight: 500, marginBottom: 10 }}>
            Know this {forecast.location.name.includes("Glen") ? "glen" : "place"}
          </div>
          {forecast.location.localNotes ? (
            <>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.65, color: "var(--color-secondary)", margin: "0 0 10px" }}>{forecast.location.localNotes[0]}</p>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.65, color: "var(--color-secondary)", margin: "0 0 24px" }}>{forecast.location.localNotes[1]}</p>
            </>
          ) : (
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.65, color: "var(--color-secondary)", margin: "0 0 24px" }}>{forecast.location.description}</p>
          )}
          <div style={{ border: "1px solid var(--color-border-ink)", background: "var(--color-card-bg)", padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
              <Stamp text="INTERCEPTED" variant="intercepted" />
              <div className="font-mono" style={{ fontSize: 9.5, letterSpacing: "0.16em", color: "var(--color-muted-light)" }}>FILE: THE BAMPOT</div>
            </div>
            <p className="font-serif" style={{ fontStyle: "italic", fontSize: 16, lineHeight: 1.45, margin: "0 0 6px", color: "#333a2f" }}>
              &ldquo;The {forecast.location.name.includes("Glen") ? "glen" : "sector"} reports excellent feeding conditions at dusk. Morale among the squadrons is regrettably high.&rdquo;
            </p>
            <p className="font-mono" style={{ fontSize: 10, color: "var(--color-muted-mid)", margin: 0 }}>
              — AIR VICE-MARSHAL GRIEVE, EVENING DISPATCH
            </p>
          </div>
        </div>

        {/* ── Nearby forecast points ── */}
        <div style={{ margin: "0 20px", padding: "0 0 10px", fontFamily: "var(--font-body)", fontSize: 11.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Nearby forecast points
        </div>
        <div className="grid-almanac" style={{ margin: "0 20px 28px", gridTemplateColumns: "repeat(2, 1fr)" }}>
          {nearbyPoints.length > 0 ? nearbyPoints.slice(0, 4).map((pt) => (
            <Link key={pt.slug} href={`/forecast/${pt.slug}`} className="hover-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 16px", background: "var(--color-card-bg)", textDecoration: "none", color: "inherit" }}>
              <span className="font-serif" style={{ fontSize: 14, fontWeight: 500 }}>{pt.name}</span>
              <span className="font-serif" style={{ fontWeight: 600, fontSize: 20, color: pt.color }}>{pt.score > 0 ? pt.score : "—"}</span>
            </Link>
          )) : (
            <div style={{ padding: "14px 16px", background: "var(--color-card-bg)", gridColumn: "1 / -1" }}>
              <span className="font-mono" style={{ fontSize: 10, color: "var(--color-muted-mid)" }}>No nearby forecast points available.</span>
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════════════════ */}
      {/* Existing content below almanac sections     */}
      {/* ════════════════════════════════════════════ */}
      <div style={{ padding: "48px 56px", background: "var(--color-page-bg)" }}>
        <ForecastWhatToBring index={forecast.current.index} />

        <section style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", marginTop: 40 }}>
          <div style={{ border: "1px solid var(--color-border-ink)", background: "var(--color-card-bg)", padding: 24 }}>
            <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 10px" }}>Tonight&apos;s peak</h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--color-secondary)" }}>
              Peak activity tonight: {forecast.current.peakTime} — {forecast.current.peakTonight}/10
            </p>
          </div>
          <div style={{ border: "1px solid var(--color-border-ink)", background: "var(--color-card-bg)", padding: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <GrieveOverlay grieveLevel={grieveLevel} showCommuniqué={false} />
              <div>
                <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 10px" }}>Recommendation</h2>
                <p className="font-serif" style={{ fontStyle: "italic", fontSize: 15, lineHeight: 1.5, color: "var(--color-muted-mid)" }}>
                  {getGrieveStateName(grieveLevel)}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--color-secondary)", marginTop: 8 }}>
                  {forecast.current.recommendation}
                </p>
              </div>
            </div>
          </div>
        </section>

        <div style={{ marginTop: 40 }}>
          <OvernightWatchCard forecast={forecast} />
        </div>

        <section style={{ marginTop: 40, border: "1px solid var(--color-border-ink)", background: "var(--color-card-bg)", padding: 24 }}>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 10px" }}>{OPERATIONAL_FACTS.forecastHorizonLabel} outlook</h2>
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", marginTop: 20 }}>
            {forecast.daily.map((day) => (
              <div key={day.date.toISOString()} style={{ border: "1px solid var(--color-border-light)", background: "var(--color-card-bg)", padding: 16 }}>
                <p className="font-mono" style={{ fontSize: 10, color: "var(--color-muted-mid)" }}>
                  {new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Europe/London" }).format(day.date)}
                </p>
                <p className="font-serif" style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.1, color: getRiskColor(day.peakIndex), marginTop: 8 }}>
                  {day.peakIndex}/10
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", color: getRiskColor(day.peakIndex) }}>
                  {getRiskLabel(day.peakIndex)}
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "var(--color-secondary)", marginTop: 8 }}>
                  {day.recommendation}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 40, border: "1px solid var(--color-border-ink)", padding: 24, background: "var(--color-card-bg)" }}>
          <p className="font-mono" style={{ fontSize: 10, color: "var(--color-muted-mid)" }}>Advertisement</p>
          <ins className="adsbygoogle mt-6 block min-h-24" style={{ border: "1px solid var(--color-border-light)", background: "var(--color-card-bg)" }} data-ad-client="ca-pub-2335335210412692" data-ad-format="auto" data-full-width-responsive="true" />
        </section>

        <section style={{ marginTop: 40, border: "1px solid var(--color-border-ink)", background: "var(--color-card-bg)", padding: 24 }}>
          <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 10px" }}>Share forecast</h2>
          <pre style={{ fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.6, color: "var(--color-secondary)", background: "var(--color-page-bg)", padding: 16, border: "1px solid var(--color-border-light)", marginTop: 12, overflow: "auto", whiteSpace: "pre-wrap" }}>{shareText}</pre>
          <div style={{ marginTop: 12 }}>
            <CopyShareTextButton text={shareText} />
          </div>
        </section>

        {forecast.location.existingPageSlug ? (
          <section style={{ marginTop: 40, border: "1px solid var(--color-risk-low)", background: "var(--color-card-bg)", padding: 24 }}>
            <Link href={`/scotland/${forecast.location.existingPageSlug}`} style={{ fontFamily: "var(--font-body)", fontSize: 16, fontWeight: 600, color: "var(--color-risk-low)", textDecoration: "underline" }}>
              Planning a trip? See our full {forecast.location.name} midge guide →
            </Link>
          </section>
        ) : null}
      </div>
    </main>
  );
}