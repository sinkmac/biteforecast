export type ForecastLocation = {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  dataPointSiteId: string | null;
  dataPointSiteName?: string;
  description: string;
  midgeSeason: string;
  existingPageSlug?: string;
};

// DataPoint site IDs require an active Met Office DataPoint key to verify against sitelist.
// No repo-local key is currently present, so these records are wired for Open-Meteo fallback.
// Keep dataPointSiteId nullable until the key is active and sitelist matching can be completed.
export const FORECAST_LOCATIONS: ForecastLocation[] = [
  {
    name: "Glencoe",
    slug: "glencoe",
    lat: 56.682,
    lng: -5.1036,
    dataPointSiteId: null,
    description: "A damp west-coast glen where still dusk air can turn a short stop into a feeding window.",
    midgeSeason: "June–August",
    existingPageSlug: "glencoe-midges",
  },
  {
    name: "Fort William",
    slug: "fort-william",
    lat: 56.8198,
    lng: -5.1052,
    dataPointSiteId: null,
    description: "Lochaber's busy base town sits close to wet woodland, loch edges and sheltered glens.",
    midgeSeason: "June–August",
    existingPageSlug: "fort-william-midges",
  },
  {
    name: "Isle of Skye — Portree",
    slug: "isle-of-skye-portree",
    lat: 57.4122,
    lng: -6.196,
    dataPointSiteId: null,
    description: "Portree is breezy when exposed, but sheltered gardens, burns and campsite corners can still bite.",
    midgeSeason: "June–August",
    existingPageSlug: "isle-of-skye-midges",
  },
  {
    name: "Loch Lomond — Balloch",
    slug: "loch-lomond-balloch",
    lat: 56.0019,
    lng: -4.5793,
    dataPointSiteId: null,
    description: "The south loch shore can feel harmless by day and suddenly busy around damp evening water edges.",
    midgeSeason: "June–August",
    existingPageSlug: "loch-lomond-midges",
  },
  {
    name: "Cairngorms — Aviemore",
    slug: "cairngorms-aviemore",
    lat: 57.1953,
    lng: -3.8277,
    dataPointSiteId: null,
    description: "Aviemore is often easier in breeze and open ground, but forest edges and lochans still need respect.",
    midgeSeason: "June–August",
    existingPageSlug: "aviemore-midges",
  },
  {
    name: "Arisaig",
    slug: "arisaig",
    lat: 56.9194,
    lng: -5.8391,
    dataPointSiteId: null,
    description: "A west-coast beach and campsite favourite where calm humid evenings deserve proper repellent.",
    midgeSeason: "June–August",
  },
  {
    name: "Glenfinnan",
    slug: "glenfinnan",
    lat: 56.8734,
    lng: -5.438,
    dataPointSiteId: null,
    description: "A scenic stop with loch, woodland and sheltered ground that can concentrate midges at dusk.",
    midgeSeason: "June–August",
  },
  {
    name: "Torridon",
    slug: "torridon",
    lat: 57.55,
    lng: -5.5,
    dataPointSiteId: null,
    description: "Big mountain scenery, damp glen floors and lochside shelter make Torridon a classic midge watch point.",
    midgeSeason: "June–August",
    existingPageSlug: "torridon-midges",
  },
  {
    name: "Applecross",
    slug: "applecross",
    lat: 57.436,
    lng: -5.8131,
    dataPointSiteId: null,
    description: "Coastal air can help, but sheltered bays and still campsite evenings can still produce clouds.",
    midgeSeason: "June–August",
  },
  {
    name: "Isle of Mull — Craignure",
    slug: "isle-of-mull-craignure",
    lat: 56.4685,
    lng: -5.7098,
    dataPointSiteId: null,
    description: "Mull's ferry gateway mixes sea breeze with damp woodland pockets where nuisance can build fast.",
    midgeSeason: "June–August",
    existingPageSlug: "mull-midges",
  },
  {
    name: "Loch Ness — Drumnadrochit",
    slug: "loch-ness-drumnadrochit",
    lat: 57.3333,
    lng: -4.4667,
    dataPointSiteId: null,
    description: "Lochside shelter, woodland and tourist stops make evening conditions worth checking before lingering.",
    midgeSeason: "June–August",
  },
  {
    name: "Glen Affric",
    slug: "glen-affric",
    lat: 57.2833,
    lng: -4.9167,
    dataPointSiteId: null,
    description: "Trees, lochs and sheltered glen air make Glen Affric beautiful midge country in the wrong conditions.",
    midgeSeason: "June–August",
  },
  {
    name: "Rannoch Moor",
    slug: "rannoch-moor",
    lat: 56.6667,
    lng: -4.7333,
    dataPointSiteId: null,
    description: "Open moor can be saved by wind, but boggy still air is exactly what midges are waiting for.",
    midgeSeason: "June–August",
  },
  {
    name: "Knoydart — Inverie",
    slug: "knoydart-inverie",
    lat: 57.0333,
    lng: -5.6833,
    dataPointSiteId: null,
    description: "Remote west-coast shelter and wet ground make Inverie a place to take dusk forecasts seriously.",
    midgeSeason: "June–August",
  },
  {
    name: "Kinlochleven",
    slug: "kinlochleven",
    lat: 56.7167,
    lng: -4.95,
    dataPointSiteId: null,
    description: "A sheltered loch-head village where damp evening air can make midges feel organised.",
    midgeSeason: "June–August",
  },
  {
    name: "Isle of Arran — Brodick",
    slug: "isle-of-arran-brodick",
    lat: 55.5774,
    lng: -5.1397,
    dataPointSiteId: null,
    description: "Brodick often benefits from movement off the water, but calm wooded edges still need a check.",
    midgeSeason: "June–August",
  },
  {
    name: "Pitlochry",
    slug: "pitlochry",
    lat: 56.7059,
    lng: -3.7322,
    dataPointSiteId: null,
    description: "Usually less brutal than the west, but riverside, woodland and warm still evenings can still annoy.",
    midgeSeason: "June–August",
  },
  {
    name: "Inveraray",
    slug: "inveraray",
    lat: 56.2333,
    lng: -5.0667,
    dataPointSiteId: null,
    description: "Loch Fyne's sheltered shore can turn damp twilight into a proper repellent test.",
    midgeSeason: "June–August",
  },
  {
    name: "Dunoon",
    slug: "dunoon",
    lat: 55.9495,
    lng: -4.9261,
    dataPointSiteId: null,
    description: "Cowal's coast, forestry and damp sheltered ground make Dunoon worth watching in calm weather.",
    midgeSeason: "June–August",
  },
  {
    name: "Helensburgh",
    slug: "helensburgh",
    lat: 56.0044,
    lng: -4.7286,
    dataPointSiteId: null,
    description: "A Clyde-side base where breeze helps, but sheltered woodland and damp garden edges can still lift risk.",
    midgeSeason: "June–August",
  },
];

export function getForecastLocationBySlug(slug: string) {
  return FORECAST_LOCATIONS.find((location) => location.slug === slug);
}
