// Single source of truth for what TechMining Global offers, what is Live vs Planned,
// the technology stack and the service engagements shown on the pricing page.

export const BRAND = {
  name: "TechMining Global",
  domain: "techminingglobal.com",
  launchRegion: "Pakistan",
} as const;

export const STATUSES = ["Live", "Planned"] as const;
export type Status = (typeof STATUSES)[number];

export type Capability = {
  id: string;
  name: string;
  status: Status;
  group: "Core" | "Data" | "Delivery";
  body: string;
};

/** Every capability on the site carries one of these status labels. */
export const CAPABILITIES: Capability[] = [
  {
    id: "screening",
    name: "Mineral Prospectivity Screening",
    status: "Live",
    group: "Core",
    body: "Sentinel-2 and ASTER imagery for any area of interest, scored by a Random Forest prospectivity model into a ranked map.",
  },
  {
    id: "reviewed-zones",
    name: "Reviewed Zones",
    status: "Live",
    group: "Core",
    body: "The highest-ranked cells are checked by a geologist against mapped geology and known occurrences. Only zones that pass are delivered.",
  },
  {
    id: "survey-fusion",
    name: "National survey data fusion",
    status: "Live",
    group: "Data",
    body: "Known occurrences from USGS MRDS and the Geological Survey of Pakistan train and check the model. Other national surveys are added per country.",
  },
  {
    id: "global-coverage",
    name: "Screening in any country",
    status: "Live",
    group: "Data",
    body: "Sentinel-2 images the world's land surface every 5 days, so an Area Audit can run wherever you hold or study ground.",
  },
  {
    id: "prithvi",
    name: "Prithvi foundation-model features",
    status: "Planned",
    group: "Data",
    body: "Fine-tuning NASA-IBM Prithvi-EO-2.0 on our labelled zones to add learned spatial-temporal features to the Random Forest.",
  },
  {
    id: "deliverables",
    name: "GeoTIFF, KML & PDF deliverables",
    status: "Live",
    group: "Delivery",
    body: "Prospectivity raster, reviewed-zone polygons and a written geologist note for every engagement.",
  },
  {
    id: "monitoring",
    name: "Re-screening on new satellite passes",
    status: "Planned",
    group: "Delivery",
    body: "Automatic refresh of your area as new cloud-free Sentinel-2 scenes arrive, with alerts on changed zones.",
  },
  {
    id: "api",
    name: "Partner API (GeoJSON)",
    status: "Planned",
    group: "Delivery",
    body: "Pull reviewed zones and prospectivity scores straight into your GIS or platform. Pilot partners get early access.",
  },
  {
    id: "blending",
    name: "Ore blending & grade control",
    status: "Planned",
    group: "Delivery",
    body: "Stockpile grade tracking and blend ratios to hit buyer specifications for chromite, copper and barite.",
  },
];

export function capability(id: string) {
  const c = CAPABILITIES.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown capability: ${id}`);
  return c;
}

export type StackItem = {
  name: string;
  role: string;
  status: Status;
  body: string;
  facts: string[];
  source?: { label: string; url: string };
};

export const TECH_STACK: StackItem[] = [
  {
    name: "ESA Sentinel-2 MSI",
    role: "Primary imagery",
    status: "Live",
    body: "13 spectral bands including two SWIR bands that respond to clay, sericite and iron-oxide alteration.",
    facts: ["10–20 m resolution", "5-day revisit", "Global land coverage"],
    source: { label: "ESA Sentinel-2", url: "https://sentiwiki.copernicus.eu/web/s2-mission" },
  },
  {
    name: "NASA ASTER",
    role: "SWIR & thermal detail",
    status: "Live",
    body: "Six SWIR bands separate Al-OH, Mg-OH and carbonate minerals more finely than Sentinel-2.",
    facts: ["14 bands", "VNIR · SWIR · TIR", "Archive back to 2000"],
    source: { label: "NASA ASTER", url: "https://asterweb.jpl.nasa.gov/" },
  },
  {
    name: "Random Forest prospectivity model",
    role: "Scoring engine",
    status: "Live",
    body: "An ensemble of decision trees trained on known occurrences versus background, using band ratios, spectral indices, terrain and structure as inputs. Each cell gets a 0–1 prospectivity score.",
    facts: ["Interpretable feature importance", "Works with few labelled sites", "Benchmarked in mineral prospectivity studies"],
    source: {
      label: "Rodriguez-Galiano et al. 2015, Ore Geology Reviews",
      url: "https://doi.org/10.1016/j.oregeorev.2015.01.001",
    },
  },
  {
    name: "NASA-IBM Prithvi-EO-2.0",
    role: "Geospatial foundation model",
    status: "Planned",
    body: "Open-source model from NASA, IBM and Jülich Supercomputing Centre, pretrained on 4.2 million Harmonized Landsat Sentinel-2 (HLS) time series at 30 m. We are fine-tuning it to feed learned features into the Random Forest.",
    facts: ["Up to 600M parameters", "Pretrained on NASA HLS", "Released Dec 2024 · open weights"],
    source: { label: "NASA-IMPACT / Prithvi-EO-2.0", url: "https://github.com/NASA-IMPACT/Prithvi-EO-2.0" },
  },
  {
    name: "Geologist review",
    role: "Human check",
    status: "Live",
    body: "Every top-ranked zone is checked against geology maps, structure and known occurrences before it becomes a Reviewed Zone.",
    facts: ["Pass / fail per zone", "Written field note", "Review call with your team"],
  },
];

export type Engagement = {
  id: "area-audit" | "pilot";
  name: string;
  tagline: string;
  pricing: string;
  scope: string;
  includes: { label: string; status: Status }[];
  cta: string;
};

/** Service engagements — no subscription tiers. Every engagement is quoted after a scoping call. */
export const ENGAGEMENTS: Engagement[] = [
  {
    id: "area-audit",
    name: "Area Audit",
    tagline: "One area. A screened map and reviewed zones you can take to the field.",
    pricing: "Fixed quote per area",
    scope: "One concession, licence block or area of interest — in any country.",
    includes: [
      { label: "Sentinel-2 & ASTER alteration mapping", status: "Live" },
      { label: "Random Forest prospectivity map", status: "Live" },
      { label: "Reviewed Zones with geologist notes", status: "Live" },
      { label: "GeoTIFF, KML & PDF deliverables", status: "Live" },
      { label: "Review call with your geologist", status: "Live" },
    ],
    cta: "Request an Area Audit",
  },
  {
    id: "pilot",
    name: "Mineral Intelligence Pilot",
    tagline: "A time-boxed programme across several areas or a whole district.",
    pricing: "Scoped per pilot",
    scope: "Multiple areas or a regional belt, with success criteria agreed up front.",
    includes: [
      { label: "Everything in the Area Audit, per area", status: "Live" },
      { label: "Model tuned on your own drill & assay data", status: "Live" },
      { label: "Re-screening on new satellite passes", status: "Planned" },
      { label: "Prithvi foundation-model features", status: "Planned" },
      { label: "Early Partner API access (GeoJSON)", status: "Planned" },
    ],
    cta: "Discuss a pilot",
  },
];
