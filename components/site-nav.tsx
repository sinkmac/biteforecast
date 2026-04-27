import Link from "next/link";

const MAIN_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/midge-wind-watch", label: "Live calculator" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const FOOTER_NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms" },
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
  );
}
