import { aviemoreLocationPage } from "../../content/locations/aviemore";
import { cairngormsLocationPage } from "../../content/locations/cairngorms";
import { fortWilliamLocationPage } from "../../content/locations/fort-william";
import { glencoeLocationPage } from "../../content/locations/glencoe";
import { lochLomondLocationPage } from "../../content/locations/loch-lomond";
import { mullLocationPage } from "../../content/locations/mull";
import { skyeLocationPage } from "../../content/locations/skye";
import { torridonLocationPage } from "../../content/locations/torridon";
import type { LocationPage } from "../../content/locations/types";

const LOCATION_PAGES: LocationPage[] = [
  glencoeLocationPage,
  skyeLocationPage,
  fortWilliamLocationPage,
  lochLomondLocationPage,
  aviemoreLocationPage,
  mullLocationPage,
  torridonLocationPage,
  cairngormsLocationPage,
];

export function getLocationPageSlugs(): string[] {
  return LOCATION_PAGES.map((page) => page.slug);
}

export function getLocationPageBySlug(slug: string): LocationPage | undefined {
  return LOCATION_PAGES.find((page) => page.slug === slug);
}

export function getLocationPageByQuery(query: string | undefined): LocationPage | undefined {
  if (!query) {
    return undefined;
  }

  const normalizedQuery = decodeURIComponent(query).trim().toLowerCase();

  return LOCATION_PAGES.find((page) => {
    return (
      page.slug.toLowerCase() === normalizedQuery ||
      page.name.toLowerCase() === normalizedQuery
    );
  });
}
