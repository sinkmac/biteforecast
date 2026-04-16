import {
  getLocationPageBySlug,
  getLocationPageSlugs,
  getLocationPageByQuery,
} from "../seo/location-pages";
import type { TimePreset } from "./engine";

const DEFAULT_LOCATION_SLUG = "glencoe-midges";

export function getCalculatorLocation(query: string | undefined) {
  return (
    getLocationPageByQuery(query) ?? getLocationPageBySlug(DEFAULT_LOCATION_SLUG)
  );
}

export function getCalculatorTimePreset(query: string | undefined): TimePreset {
  if (query === "sunrise" || query === "sunset") {
    return query;
  }

  return "now";
}

export function getCalculatorLocationOptions() {
  return getLocationPageSlugs()
    .map((slug) => getLocationPageBySlug(slug))
    .filter((page) => page !== undefined);
}
