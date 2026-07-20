import type { ForecastCalendarDay } from "../lib/calculator/forecast";

type ForecastCalendarProps = {
  title: string;
  intro: string;
  days: ForecastCalendarDay[];
};

export function ForecastCalendar({ title, intro, days }: ForecastCalendarProps) {
  if (!days.length) {
    return null;
  }

  return (
    <section style={{ border: "1px solid var(--color-border-ink)", background: "var(--color-card-bg)", padding: 24 }}>
      <h2 className="font-serif" style={{ fontSize: 22, fontWeight: 500, margin: "0 0 10px" }}>{title}</h2>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.6, color: "var(--color-secondary)", margin: "0 0 20px", maxWidth: "64ch" } as React.CSSProperties}>{intro}</p>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
        {days.map((day) => (
          <article
            key={day.dateIso}
            style={{ border: "1px solid var(--color-border-light)", background: "var(--color-card-bg)", padding: 16 }}
          >
            <p className="font-mono" style={{ fontSize: 10, color: "var(--color-muted-mid)" }}>
              {day.label}
            </p>
            <p className="font-serif" style={{ fontSize: 24, fontWeight: 600, lineHeight: 1.1, color: "var(--color-ink)", marginTop: 8 }}>{day.band}</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.5, color: "var(--color-secondary)", marginTop: 8 }}>{day.advice}</p>
            {day.peakTimeMessage ? (
              <p className="font-mono" style={{ fontSize: 10, color: "var(--color-muted-mid)", marginTop: 8 }}>{day.peakTimeMessage}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}