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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-950 text-stone-50`}>
        {children}
      </body>
    </html>
  );
}
