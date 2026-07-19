import { Newsreader, Public_Sans, IBM_Plex_Mono } from "next/font/google";

export const fontSerif = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const fontBody = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const fontMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});