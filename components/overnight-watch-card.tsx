import type { MidgeForecast } from "../lib/forecast/service";
import { getRiskLabel } from "../lib/forecast/risk-bands";

const OVERNIGHT_BANDS: Array<{ min: number; max: number; line: string }> = [
  { min: 0, max: 1, line: "A quiet night ahead. The pools stay still till first light." },
  { min: 2, max: 2, line: "Manageable through to dawn. Nothing this watch hasn't flagged before." },
  { min: 3, max: 4, line: "Head-net conditions from the bank. Not a retreat night." },
  { min: 5, max: 6, line: "Holding at Moderate from dusk to dawn. Tent flaps stay closed tonight." },
  { min: 7, max: 10, line: "As bad as it gets, dusk to dawn. No easing before first light. This is the one the pools remember." },
];

function getOvernightBandLine(index: number): string {
  const band = OVERNIGHT_BANDS.find((b) => index >= b.min && index <= b.max);
  return band?.line ?? OVERNIGHT_BANDS[0].line;
}

export function OvernightWatchCard({ forecast }: { forecast: MidgeForecast }) {
  const { overnightPeak, overnightEstimated } = forecast.current;
  const bandLine = getOvernightBandLine(overnightPeak);
  const isFallback = forecast.mode === "fallback";
  const label = getRiskLabel(overnightPeak);

  return (
    <section style={{ border: "1px solid var(--color-border-ink)", background: "var(--color-card-bg)", padding: 24 }}>
      <p className="font-mono" style={{ fontSize: 11, letterSpacing: "0.18em", color: "var(--color-muted-mid)", marginBottom: 12 }}>
        Overnight Watch
      </p>
      <p className="font-serif" style={{ fontSize: 22, fontWeight: 500, color: "var(--color-ink)", margin: 0 }}>
        Peak overnight exposure: <span style={{ color: "var(--color-risk-moderate)" }}>{overnightPeak}/10</span>
        <span className="font-mono" style={{ fontSize: 11, color: "var(--color-muted-light)", marginLeft: 6 }}>
          {label}
        </span>
      </p>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.6, color: "var(--color-secondary)", marginTop: 12, maxWidth: 64 } as React.CSSProperties}>
        {bandLine}
      </p>

      {/* Honesty framing */}
      <p className="font-mono" style={{ fontSize: 10, color: "var(--color-muted-light)", marginTop: 16 }}>
        This is a planning estimate for the overnight window, not a guarantee. Conditions can shift.
      </p>

      {/* Fallback-data honesty framing */}
      {isFallback ? (
        <p className="font-mono" style={{ fontSize: 10, color: "var(--color-risk-moderate)", marginTop: 8 }}>
          Live data unavailable — this window is an estimate, not tonight&apos;s actual sunset/sunrise.
        </p>
      ) : null}

      {/* Solar edge case / data gap honesty framing */}
      {overnightEstimated ? (
        <p className="font-mono" style={{ fontSize: 10, color: "var(--color-risk-moderate)", marginTop: 8 }}>
          Data gap — using an estimated overnight window (22:00–03:00) rather than actual sunset/sunrise.
        </p>
      ) : null}

      {/* Short-duration calibration note */}
      <p className="font-mono" style={{ fontSize: 10, color: "var(--color-muted-light)", marginTop: 8 }}>
        Calibrated for dusk-to-dawn exposure. Short evening trips: see the dog walker guide.
      </p>

      {/* Stockist salvage line */}
      <p className="font-mono" style={{ fontSize: 10, color: "var(--color-muted-light)", marginTop: 8 }}>
        Buying en route? Repellent is stocked at most Highland petrol stations and outdoor shops.
      </p>
    </section>
  );
}