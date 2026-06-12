import Link from "next/link";

const MAIN_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/midge-wind-watch", label: "Live calculator" },
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

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-stone-800 bg-stone-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link className="text-lg font-semibold tracking-tight text-stone-50" href="/">
          BiteForecast
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-4 text-sm text-stone-300 sm:gap-6">
          {MAIN_NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              className="underline-offset-4 transition hover:text-stone-50 hover:underline"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function FooterNav() {
  return (
    <div className="flex flex-col gap-3 sm:items-end">
      <nav className="flex flex-wrap items-center gap-4">
        {FOOTER_NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            className="underline-offset-4 hover:text-stone-200 hover:underline"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <nav aria-label="Guides" className="flex flex-wrap items-center gap-4 sm:justify-end">
        <span className="font-semibold uppercase tracking-[0.16em] text-stone-500">Guides</span>
        {GUIDE_LINKS.map((link) => (
          <Link
            key={link.href}
            className="underline-offset-4 hover:text-stone-200 hover:underline"
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
