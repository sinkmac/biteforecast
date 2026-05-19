import type { Metadata } from "next";

import { BiteForecastHomeTool } from "../components/biteforecast-home-tool";
import { FaqSchema } from "../components/faq-block";
import {
  HOMEPAGE_DESCRIPTION,
  HOMEPAGE_FAQS,
  SITE_URL,
  buildMetadataAlternates,
  buildOpenGraph,
} from "../lib/seo/site-metadata";
import {
  getLocationPageBySlug,
  getLocationPageSlugs,
} from "../lib/seo/location-pages";

const locationCards = getLocationPageSlugs()
  .map((slug) => getLocationPageBySlug(slug))
  .filter((page) => page !== undefined);

export const metadata: Metadata = {
  title: "Will there be midges where I'm going?",
  description: HOMEPAGE_DESCRIPTION,
  alternates: buildMetadataAlternates("/"),
  openGraph: buildOpenGraph({
    title: "Will there be midges where I'm going?",
    description: HOMEPAGE_DESCRIPTION,
    url: SITE_URL,
  }),
};

export default function Home() {
  return (
    <>
      <FaqSchema faqs={HOMEPAGE_FAQS} />
      <BiteForecastHomeTool locations={locationCards} />
    </>
  );
}
