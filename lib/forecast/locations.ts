export type ForecastLocation = {
  name: string;
  slug: string;
  lat: number;
  lng: number;
  description: string;
  midgeSeason: string;
  existingPageSlug?: string;
  localNotes?: [string, string]; // Two-paragraph "Know this glen" content
};

export const FORECAST_LOCATIONS: ForecastLocation[] = [
  {
    name: "Glencoe",
    slug: "glencoe",
    lat: 56.682,
    lng: -5.1036,
    description: "A damp west-coast glen where still dusk air can turn a short stop into a feeding window.",
    midgeSeason: "June–August",
    existingPageSlug: "glencoe-midges",
    localNotes: [
      "Glencoe's steep walls shelter the glen floor from wind that would otherwise keep midges grounded. The riverside flats and forestry edges near the campsites are the busiest spots on still evenings.",
      "Higher on the ridges you're usually fine — the trouble is the car park when you get back down.",
    ],
  },
  {
    name: "Fort William",
    slug: "fort-william",
    lat: 56.8198,
    lng: -5.1052,
    description: "Lochaber's busy base town sits close to wet woodland, loch edges and sheltered glens.",
    midgeSeason: "June–August",
    existingPageSlug: "fort-william-midges",
    localNotes: [
      "Fort William sits at the foot of Ben Nevis in a damp basin that holds still air longer than surrounding areas. The woodland paths along the loch shore and the Glen Nevis approach are the first places to notice activity.",
      "The town centre itself is usually breezier and less affected — midge trouble here tends to be on the outskirts, not the high street.",
    ],
  },
  {
    name: "Isle of Skye — Portree",
    slug: "isle-of-skye-portree",
    lat: 57.4122,
    lng: -6.196,
    description: "Portree is breezy when exposed, but sheltered gardens, burns and campsite corners can still bite.",
    midgeSeason: "June–August",
    existingPageSlug: "isle-of-skye-midges",
    localNotes: [
      "Portree harbour is often breezy enough to keep the cloud out, but the wooded glens just outside town — particularly toward the Storr and the Braes — trap damp air and midges efficiently.",
      "Campers on Skye should check forecasts for the specific campsite, not the town; a five-minute drive inland can mean a very different evening.",
    ],
  },
  {
    name: "Loch Lomond — Balloch",
    slug: "loch-lomond-balloch",
    lat: 56.0019,
    lng: -4.5793,
    description: "The south loch shore can feel harmless by day and suddenly busy around damp evening water edges.",
    midgeSeason: "June–August",
    existingPageSlug: "loch-lomond-midges",
    localNotes: [
      "The southern end of Loch Lomond is popular and accessible, but the sheltered bays and wooded islands concentrate midges on still evenings. The West Highland Way path along the lochside is a known hotspot after 6pm.",
      "The loch's size creates local microclimates — if the water is flat calm, midge risk is higher than the breeze on your face might suggest.",
    ],
  },
  {
    name: "Cairngorms — Aviemore",
    slug: "cairngorms-aviemore",
    lat: 57.1953,
    lng: -3.8277,
    description: "Aviemore is often easier in breeze and open ground, but forest edges and lochans still need respect.",
    midgeSeason: "June–August",
    existingPageSlug: "aviemore-midges",
    localNotes: [
      "Aviemore benefits from more open ground than the west coast, but the surrounding pine forests and small lochans trap damp air and create localised midge pockets even on breezy days.",
      "The Cairngorm plateau itself is too exposed and cool — midges here are a lowland and treeline problem, not a summit one.",
    ],
  },
  {
    name: "Arisaig",
    slug: "arisaig",
    lat: 56.9194,
    lng: -5.8391,
    description: "A west-coast beach and campsite favourite where calm humid evenings deserve proper repellent.",
    midgeSeason: "June–August",
    localNotes: [
      "Arisaig's white sands and island views draw campers, but the surrounding machair and damp grassland hold humidity well into the evening. The campsite and the road end near the beach are the places to watch.",
      "Coastal breezes can clear things out during the day, but when the wind drops at dusk the cloud appears fast.",
    ],
  },
  {
    name: "Glenfinnan",
    slug: "glenfinnan",
    lat: 56.8734,
    lng: -5.438,
    description: "A scenic stop with loch, woodland and sheltered ground that can concentrate midges at dusk.",
    midgeSeason: "June–August",
    localNotes: [
      "Glenfinnan sits at the head of Loch Shiel in a natural bowl that traps still evening air. The monument area and shoreline are the worst spots; higher ground toward the viaduct is usually better.",
      "The combination of loch, woodland, and shelter makes this one of those places where a beautiful view and a bad evening can arrive together.",
    ],
  },
  {
    name: "Torridon",
    slug: "torridon",
    lat: 57.55,
    lng: -5.5,
    description: "Big mountain scenery, damp glen floors and lochside shelter make Torridon a classic midge watch point.",
    midgeSeason: "June–August",
    existingPageSlug: "torridon-midges",
    localNotes: [
      "Torridon's dramatic landscape is also a textbook midge habitat: damp glen floors, loch edges, and shelter from the prevailing wind. The lower ground around the Torridon Inn and the loch shore are the busiest areas.",
      "The mountain paths climb quickly into wind and cooler air — if you're heading up Beinn Eighe or Liathach, the midge problem ends at about 300 metres.",
    ],
  },
  {
    name: "Applecross",
    slug: "applecross",
    lat: 57.436,
    lng: -5.8131,
    description: "Coastal air can help, but sheltered bays and still campsite evenings can still produce clouds.",
    midgeSeason: "June–August",
    localNotes: [
      "Applecross enjoys coastal air that helps on most days, but the sheltered bays and the campsite at the shore create still pockets that midges exploit at dusk.",
      "The famous Bealach na Bà climb is windy and exposed — midges don't reach the pass, but the car park at either end can be a different story.",
    ],
  },
  {
    name: "Isle of Mull — Craignure",
    slug: "isle-of-mull-craignure",
    lat: 56.4685,
    lng: -5.7098,
    description: "Mull's ferry gateway mixes sea breeze with damp woodland pockets where nuisance can build fast.",
    midgeSeason: "June–August",
    existingPageSlug: "mull-midges",
    localNotes: [
      "Craignure mixes sea breeze with damp woodland — ferry passengers stepping off often feel a breeze that disappears as they head inland. The sheltered roads toward Salen and the lochside campsites are the hot spots.",
      "Mull's western side, toward Calgary and the Treshnish Isles, is more exposed and generally easier.",
    ],
  },
  {
    name: "Loch Ness — Drumnadrochit",
    slug: "loch-ness-drumnadrochit",
    lat: 57.3333,
    lng: -4.4667,
    description: "Lochside shelter, woodland and tourist stops make evening conditions worth checking before lingering.",
    midgeSeason: "June–August",
    localNotes: [
      "Drumnadrochit sits on a sheltered stretch of Loch Ness where the loch's depth moderates temperature but the surrounding woodland traps humidity. The castle ruins and the lochside paths are classic midge territory on still evenings.",
      "The main A82 corridor through the glen is often breezy enough — it's the lay-bys, picnic spots, and campsites off the road that need checking.",
    ],
  },
  {
    name: "Glen Affric",
    slug: "glen-affric",
    lat: 57.2833,
    lng: -4.9167,
    description: "Trees, lochs and sheltered glen air make Glen Affric beautiful midge country in the wrong conditions.",
    midgeSeason: "June–August",
    localNotes: [
      "Glen Affric is one of Scotland's most beautiful glens and one of the best midge habitats: ancient pinewoods, lochans, boggy ground, and almost complete shelter from wind. It is spectacular and can be unbearable on still days.",
      "The forestry paths and the loch shore are the worst. Higher up the glen toward Affric Lodge is slightly more open but the midges follow the water.",
    ],
  },
  {
    name: "Rannoch Moor",
    slug: "rannoch-moor",
    lat: 56.6667,
    lng: -4.7333,
    description: "Open moor can be saved by wind, but boggy still air is exactly what midges are waiting for.",
    midgeSeason: "June–August",
    localNotes: [
      "Rannoch Moor is exposed, which usually means wind, and wind means clear air. But on the still, humid days that follow rain, the boggy moorland becomes a breeding ground and the cloud can be thick.",
      "The A82 crossing is usually fine — the trouble is if you stop, step off the road, or camp anywhere near the lochans.",
    ],
  },
  {
    name: "Knoydart — Inverie",
    slug: "knoydart-inverie",
    lat: 57.0333,
    lng: -5.6833,
    description: "Remote west-coast shelter and wet ground make Inverie a place to take dusk forecasts seriously.",
    midgeSeason: "June–August",
    localNotes: [
      "Inverie is accessible only by ferry or a long hike — which means visitors tend to stay a while. The village sits in a sheltered bowl on the coast with wet woodland, burns and boggy ground all around it.",
      "The pubs and bothies are cosy, but the walk back to a tent in still dusk air is when the midges remind you where you are.",
    ],
  },
  {
    name: "Kinlochleven",
    slug: "kinlochleven",
    lat: 56.7167,
    lng: -4.95,
    description: "A sheltered loch-head village where damp evening air can make midges feel organised.",
    midgeSeason: "June–August",
    localNotes: [
      "Kinlochleven sits at the head of Loch Leven in a damp, sheltered basin beneath the Mamores. The village's position traps still air, and the riverside and lochside paths are active midge corridors on warm evenings.",
      "The West Highland Way passes through here — walkers arriving tired and pitching near the water sometimes regret it.",
    ],
  },
  {
    name: "Isle of Arran — Brodick",
    slug: "isle-of-arran-brodick",
    lat: 55.5774,
    lng: -5.1397,
    description: "Brodick often benefits from movement off the water, but calm wooded edges still need a check.",
    midgeSeason: "June–August",
    localNotes: [
      "Brodick's position on Arran's east coast means it catches breeze off the Firth of Clyde on most days. The ferry terminal and main street are usually fine, but the wooded paths up Glen Rosa and around Brodick Castle are sheltered and can concentrate midges.",
      "Arran's west coast, around Lochranza and Machrie, is more exposed and generally quieter midge-wise.",
    ],
  },
  {
    name: "Pitlochry",
    slug: "pitlochry",
    lat: 56.7059,
    lng: -3.7322,
    description: "Usually less brutal than the west, but riverside, woodland and warm still evenings can still annoy.",
    midgeSeason: "June–August",
    localNotes: [
      "Pitlochry is in a rain shadow east of the Highlands and is generally easier than the west coast. But the riverside paths along the Tummel, the woodland around the dam, and the warm still evenings that Perthshire does so well can still produce localised midge activity.",
      "It's rarely as intense as Glencoe or Skye, but 'less intense' is not the same as 'none'.",
    ],
  },
  {
    name: "Inveraray",
    slug: "inveraray",
    lat: 56.2333,
    lng: -5.0667,
    description: "Loch Fyne's sheltered shore can turn damp twilight into a proper repellent test.",
    midgeSeason: "June–August",
    localNotes: [
      "Inveraray sits on the sheltered shore of Loch Fyne, surrounded by forestry and damp ground. The castle grounds and the lochside path are the main spots — beautiful at dusk, but the midges know it.",
      "The town itself and the main road through are usually breezier and less affected.",
    ],
  },
  {
    name: "Dunoon",
    slug: "dunoon",
    lat: 55.9495,
    lng: -4.9261,
    description: "Cowal's coast, forestry and damp sheltered ground make Dunoon worth watching in calm weather.",
    midgeSeason: "June–August",
    localNotes: [
      "Dunoon faces the Clyde and catches coastal air, but the Cowal peninsula behind it is thick with forestry, damp glens and sheltered lochans. The town waterfront is fine; the wooded areas toward the Ardgartan and Loch Eck side are where midges gather.",
      "The ferry crossing from Gourock is usually the breeziest part of the trip.",
    ],
  },
  {
    name: "Helensburgh",
    slug: "helensburgh",
    lat: 56.0044,
    lng: -4.7286,
    description: "A Clyde-side base where breeze helps, but sheltered woodland and damp garden edges can still lift risk.",
    midgeSeason: "June–August",
    localNotes: [
      "Helensburgh is on the Clyde coast and gets breeze off the water on most days. The promenade and town centre are generally midge-free. The risk comes from the wooded residential areas and the gardens backing onto the Rhu and Shandon woodland.",
      "It's a gateway to the Argyll Forest Park and Loch Lomond — the midge problem escalates as soon as you leave the coast.",
    ],
  },
];

export function getForecastLocationBySlug(slug: string) {
  return FORECAST_LOCATIONS.find((location) => location.slug === slug);
}