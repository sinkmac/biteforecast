import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { HooliganState } from "../components/hooligan-state";
import { FooterNav, SiteHeader } from "../components/site-nav";

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
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <footer className="border-t border-stone-800 bg-stone-950/95 px-6 py-6 text-sm text-stone-400">
          <div className="mx-auto flex max-w-5xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p>
                BiteForecast is an information and planning tool, not a guarantee of real-world conditions.
              </p>
              <a className="inline-flex items-center gap-3 text-stone-500 transition hover:text-stone-300" href="/about#hooligan">
                <HooliganState indexLevel={0} size="sm" />
                <span className="text-xs leading-4">Hooligan · Scotland&apos;s most dedicated midge</span>
              </a>
            </div>
            <FooterNav />
          </div>
        </footer>
      </body>
    </html>
  );
}
