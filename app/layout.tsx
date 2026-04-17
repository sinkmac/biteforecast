import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

import {
  HOMEPAGE_DESCRIPTION,
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../lib/seo/site-metadata";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BiteForecast | Scottish midge planning and live risk checks",
    template: "%s | BiteForecast",
  },
  description: HOMEPAGE_DESCRIPTION,
  alternates: buildMetadataAlternates("/"),
  openGraph: buildOpenGraph({
    title: "BiteForecast | Scottish midge planning and live risk checks",
    description: HOMEPAGE_DESCRIPTION,
    url: SITE_URL,
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <head>
        <meta
          name="google-site-verification"
          content="KTZYhFpcjI3yjWHdGA0Oaw_caFVl5_56zgvAcFYFrt8"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2335335210412692"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-stone-950 text-stone-50 antialiased`}>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-stone-800 bg-stone-950/95 px-6 py-6 text-sm text-stone-400">
          <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              BiteForecast is an information and planning tool, not a guarantee of real-world conditions.
            </p>
            <nav className="flex flex-wrap items-center gap-4">
              <Link className="underline-offset-4 hover:text-stone-200 hover:underline" href="/privacy-policy">
                Privacy policy
              </Link>
              <Link className="underline-offset-4 hover:text-stone-200 hover:underline" href="/terms">
                Terms
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
