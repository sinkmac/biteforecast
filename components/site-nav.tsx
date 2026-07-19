"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MAIN_NAV_LINKS = [
  { href: "/", label: "Forecast" },
  { href: "/midge-wind-watch", label: "Calculator" },
  { href: "/guide", label: "Field Guide" },
  { href: "/how-the-index-works", label: "How it works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const FOOTER_NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
  { href: "/terms", label: "Terms" },
];

const GUIDE_LINKS = [
  { href: "/about-scottish-midges", label: "About Scottish Midges" },
  { href: "/midge-season-scotland", label: "Midge Season Guide" },
  { href: "/how-to-avoid-midges-scotland", label: "How to Avoid Midges" },
];

function HamburgerButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "6px 2px",
        background: "none",
        border: "none",
        cursor: "pointer",
      }}
    >
      <span style={{ width: 20, height: 2, background: "var(--color-ink)", display: "block" }} />
      <span style={{ width: 20, height: 2, background: "var(--color-ink)", display: "block" }} />
      <span style={{ width: 20, height: 2, background: "var(--color-ink)", display: "block" }} />
    </button>
  );
}

export function SiteHeader({ timestamp }: { timestamp: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header>
      <div style={{ borderBottom: "1px solid var(--color-border-ink)" }}>
        {/* Desktop bar */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: "baseline",
            justifyContent: "space-between",
            padding: "22px 56px 18px",
          }}
        >
          <Link
            href="/"
            className="font-serif no-underline"
            style={{ fontWeight: 600, fontSize: 23, letterSpacing: "-0.01em", color: "var(--color-ink)" }}
          >
            BiteForecast<span style={{ color: "var(--color-risk-low)" }}>.</span>
          </Link>
          <nav className="flex gap-7" style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-secondary)" }}>
            {MAIN_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: isActive(link.href) ? "var(--color-ink)" : undefined,
                  borderBottom: isActive(link.href) ? "2px solid var(--color-risk-low)" : "2px solid transparent",
                  paddingBottom: 3,
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="font-mono" style={{ fontSize: 11.5, color: "var(--color-muted-mid)" }}>
            Updated {timestamp}
          </div>
        </div>

        {/* Mobile bar */}
        <div
          className="flex md:hidden"
          style={{
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px 14px",
          }}
        >
          <Link
            href="/"
            className="font-serif no-underline"
            style={{ fontWeight: 600, fontSize: 20, color: "var(--color-ink)" }}
          >
            BiteForecast<span style={{ color: "var(--color-risk-low)" }}>.</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="font-mono" style={{ fontSize: 10, color: "var(--color-muted-mid)" }}>
              {timestamp}
            </div>
            <HamburgerButton open={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {menuOpen && (
          <nav
            className="flex md:hidden"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 0,
              borderTop: "1px solid var(--color-border-ink)",
              padding: "8px 20px",
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              background: "var(--color-card-bg)",
            }}
          >
            {MAIN_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  color: isActive(link.href) ? "var(--color-ink)" : "var(--color-secondary)",
                  borderBottom: "1px solid var(--color-border-light)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
      <div className="double-rule" />
    </header>
  );
}

export function FooterNav() {
  return (
    <footer style={{ background: "var(--color-ink)", color: "var(--color-card-bg)", padding: "36px 56px 28px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto auto",
          gap: 60,
          paddingBottom: 26,
          borderBottom: "1px solid #3a4235",
        }}
      >
        <div>
          <div className="font-serif" style={{ fontSize: 19, fontWeight: 600, marginBottom: 8 }}>
            BiteForecast<span style={{ color: "var(--color-on-dark-green)" }}>.</span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12.5, lineHeight: 1.6, color: "var(--color-on-dark-muted)", margin: 0, maxWidth: 44 } as React.CSSProperties}>
            An information and planning tool, not a guarantee of real-world conditions. Weather data: Open-Meteo.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--color-on-dark-green)" }}>GUIDES</span>
          {GUIDE_LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--color-on-dark-muted)", textDecoration: "none" }}>
              {link.label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "var(--color-on-dark-green)" }}>SITE</span>
          {FOOTER_NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--color-on-dark-muted)", textDecoration: "none" }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div
        className="font-mono"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 16,
          fontSize: 10.5,
          letterSpacing: "0.12em",
          color: "var(--color-on-dark-meta)",
        }}
      >
        <span>SKIP THE MIDGES. NOT THE SCENERY.</span>
        <span>© 2026 BITEFORECAST.SCOT</span>
      </div>
    </footer>
  );
}