import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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
  title: {
    default: "BiteForecast | Scottish midge planning and live risk checks",
    template: "%s | BiteForecast",
  },
  description:
    "BiteForecast helps Scottish travellers plan around midge-prone locations with place-pattern guides and a live weather-backed calculator.",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-950 text-stone-50`}>
        {children}
      </body>
    </html>
  );
}
