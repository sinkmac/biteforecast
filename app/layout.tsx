import type { Metadata } from "next";

import { FooterNav, SiteHeader } from "../components/site-nav";
import { fontSerif, fontBody, fontMono } from "../lib/theme/fonts";

import {
  HOMEPAGE_DESCRIPTION,
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../lib/seo/site-metadata";

import "./globals.css";

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

function formatTimestamp(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = date.getDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  return `${hours}:${minutes} · ${day} ${month}`;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const now = new Date();
  const timestamp = formatTimestamp(now);

  return (
    <html lang="en-GB" className={`${fontSerif.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="KTZYhFpcjI3yjWHdGA0Oaw_caFVl5_56zgvAcFYFrt8"
        />
        <meta name="google-adsense-account" content="ca-pub-2335335210412692" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2335335210412692"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <SiteHeader timestamp={timestamp} />
        <div className="flex-1" style={{ maxWidth: 1280, margin: "0 auto", width: "100%" }}>
          {children}
        </div>
        <FooterNav />
      </body>
    </html>
  );
}