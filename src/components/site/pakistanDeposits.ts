/**
 * Every Pakistan record in the USGS Mineral Resources Data System (MRDS),
 * fetched from https://mrdata.usgs.gov/services/wfs/mrds (fips_code = fPK, 48 records).
 * Locations are as recorded by USGS; some older records use approximate coordinates.
 */
export type SiteStatus = "Producer" | "Past Producer" | "Plant" | "Prospect" | "Occurrence";

export interface MrdsSite {
  id: string;
  name: string;
  status: SiteStatus;
  commodities: string[];
  lon: number;
  lat: number;
}

const COMMODITY_NAMES: Record<string, string> = {
  AG: "Silver", AL: "Bauxite", AU: "Gold", BA: "Barite", CR: "Chromite", CU: "Copper",
  GYP: "Gypsum", MBL: "Marble", MG: "Magnesite", MN: "Manganese", MO: "Molybdenum",
  NA_H: "Rock salt", P: "Phosphate", PGE_PT: "Platinum", S_A: "Sulfuric acid",
  S_P: "Pyrite", STN_D: "Dimension stone",
};

export function commodityName(code: string) {
  return COMMODITY_NAMES[code] ?? code;
}

const RAW: [string, string, SiteStatus, string, number, number][] = [
  ["10303979", "Hazara-Kakul", "Producer", "P", 73.201, 34.218],
  ["10110368", "Bauxite - Pakistan", "Producer", "AL", 69.387, 29.966],
  ["10183176", "Bolan Gunga", "Producer", "BA", 66.534, 27.741],
  ["10206977", "H.M.Habibullan Hindubagh Area", "Prospect", "CR", 67.834, 30.849],
  ["10230926", "Pakistan Chrome Mines", "Prospect", "CR MG", 67.001, 25.999],
  ["10279638", "Saindak", "Producer", "CU AU MO AG S_P", 61.618, 29.232],
  ["10158809", "Zam Tower", "Occurrence", "P", 70.201, 31.741],
  ["10183238", "Mushal Khot", "Occurrence", "P", 70.043, 31.441],
  ["10207060", "Hazara-Lagarban", "Prospect", "P", 73.201, 34.215],
  ["60000959", "Kohat District", "Occurrence", "PGE_PT AU", 71.501, 32.899],
  ["10106730", "Kalabagh", "Producer", "NA_H", 71.567, 32.965],
  ["10003911", "Siro Dhora", "Occurrence", "MN", 66.551, 26.282],
  ["10003912", "Mohd Khan Bent", "Occurrence", "MN", 66.401, 26.516],
  ["10003913", "Kohan Jhal", "Occurrence", "MN", 66.334, 26.524],
  ["10003914", "Sotkinoh Hill", "Occurrence", "MN", 64.501, 28.932],
  ["10003915", "Naweoba", "Occurrence", "MN", 69.517, 31.349],
  ["10003916", "Nushki", "Occurrence", "MN", 66.017, 29.716],
  ["10003917", "Miara", "Occurrence", "MN", 73.501, 34.432],
  ["10003918", "Sanjro", "Past Producer", "MN", 66.501, 26.632],
  ["10003919", "Galdanian", "Occurrence", "MN", 73.317, 34.265],
  ["10003920", "Thal", "Occurrence", "MN", 71.501, 33.665],
  ["10003921", "Bhandi Dhundan", "Occurrence", "MN", 73.334, 34.299],
  ["10022497", "Koti Tehsil", "Occurrence", "AL", 65.878, 28.315],
  ["10023306", "Chamalang", "Occurrence", "GYP", 68.601, 30.366],
  ["10023307", "Kohat", "Occurrence", "GYP NA_H", 71.434, 33.582],
  ["10023308", "Spin Tangi", "Occurrence", "GYP", 67.917, 29.499],
  ["10023309", "Saidu Wali Deposits", "Occurrence", "GYP", 71.834, 32.082],
  ["10023310", "Kohala", "Producer", "BA", 73.484, 34.115],
  ["10023311", "Kundi", "Occurrence", "BA", 66.601, 26.399],
  ["10023312", "Khuzdar", "Producer", "BA", 66.517, 26.766],
  ["10023313", "Nowshera", "Producer", "MBL STN_D", 71.984, 34.015],
  ["10023314", "Warcha", "Producer", "NA_H", 71.984, 32.415],
  ["10023315", "Khewra", "Producer", "NA_H", 73.017, 32.649],
  ["10038987", "Safed - Cona", "Occurrence", "PGE_PT", 72.146, 30.833],
  ["10068673", "Bauxite - Pakistan", "Producer", "AL", 69.387, 29.966],
  ["10068674", "Bauxite - West Pakistan", "Occurrence", "AL", 72.834, 31.999],
  ["10090241", "Khabri Dhora", "Occurrence", "MN", 66.417, 28.466],
  ["10090242", "Khan Khed Nai", "Occurrence", "MN", 66.334, 25.999],
  ["10090243", "Hindubagh Massif", "Occurrence", "MN", 67.834, 30.849],
  ["10090244", "Cape Gadani", "Occurrence", "MN", 69.387, 29.966],
  ["10090245", "Killa", "Occurrence", "MN", 73.501, 34.365],
  ["10090246", "Ghura Gali", "Occurrence", "MN", 73.467, 34.299],
  ["10133899", "Domanda Post", "Occurrence", "P", 70.193, 31.553],
  ["10159178", "Hazara Haripur Phos Acid Plant", "Plant", "P S_A", 73.017, 33.999],
  ["10207328", "Baska", "Occurrence", "P", 70.143, 31.491],
  ["10279737", "Mineral Grinding Mills Co.Mgm", "Producer", "CR", 66.301, 27.666],
  ["10303726", "Hazara Magnesite", "Prospect", "MG", 73.167, 34.665],
  ["10304219", "Drazinda", "Occurrence", "P", 70.14, 31.714],
];

export const MRDS_SITES: MrdsSite[] = RAW.map(([id, name, status, codes, lon, lat]) => ({
  id,
  name,
  status,
  commodities: codes.split(" ").map(commodityName),
  lon,
  lat,
}));

export const MRDS_SOURCE_URL = "https://mrdata.usgs.gov/mrds/";

export function isProducing(s: MrdsSite) {
  return s.status === "Producer";
}

/** Major deposits with figures published by their operators or peer-reviewed sources. */
export interface MajorDeposit {
  id: string;
  name: string;
  district: string;
  lon: number;
  lat: number;
  commodity: string;
  headline: string;
  figure: string;
  contained: string;
  basis: string;
  status: string;
  source: { label: string; url: string };
  swir: { mineral: string; feature: number; depth: number };
}

export const MAJOR_DEPOSITS: MajorDeposit[] = [
  {
    id: "reko-diq",
    name: "Reko Diq",
    district: "Chagai",
    lon: 62.05,
    lat: 29.12,
    commodity: "Cu-Au porphyry",
    headline: "3.0 Bt",
    figure: "3,008 Mt @ 0.48% Cu · 0.28 g/t Au",
    contained: "15 Mt Cu · 26 Moz Au contained",
    basis: "Proven & probable reserve",
    status: "In development — first production targeted for end-2028",
    source: {
      label: "Barrick NI 43-101 report, Dec 2024",
      url: "https://s25.q4cdn.com/322814910/files/doc_downloads/reko_diq/Barrick_RekoDiq_TechnicalReport_20241231.pdf",
    },
    swir: { mineral: "Sericite (Al-OH)", feature: 2.2, depth: 0.34 },
  },
  {
    id: "saindak",
    name: "Saindak",
    district: "Chagai",
    lon: 61.618,
    lat: 29.232,
    commodity: "Cu-Au-Mo porphyry",
    headline: "440 Mt",
    figure: "440 Mt @ 0.41% Cu · 0.5 g/t Au",
    contained: "≈1.8 Mt Cu · ≈7 Moz Au contained (calculated)",
    basis: "Resource across three ore bodies",
    status: "Producing — operated by MCC since 2003",
    source: { label: "PorterGeo deposit database", url: "https://portergeo.com.au/database/mineinfo.php?mineid=mn1658" },
    swir: { mineral: "Sericite (Al-OH)", feature: 2.2, depth: 0.29 },
  },
  {
    id: "duddar",
    name: "Duddar",
    district: "Lasbela",
    lon: 66.836,
    lat: 26.089,
    commodity: "Zn-Pb sediment-hosted",
    headline: "50 Mt",
    figure: "50 Mt @ 8.6% Zn · 3.2% Pb",
    contained: "≈4.3 Mt Zn · ≈1.6 Mt Pb contained (calculated)",
    basis: "Estimated ore reserve",
    status: "Producing — underground, 500 kt/yr capacity",
    source: { label: "Duddar mine (Wikipedia, MHD figures)", url: "https://en.wikipedia.org/wiki/Duddar_mine" },
    swir: { mineral: "Iron-oxide gossan (Fe³⁺)", feature: 0.9, depth: 0.22 },
  },
  {
    id: "muslim-bagh",
    name: "Muslim Bagh",
    district: "Killa Saifullah",
    lon: 67.834,
    lat: 30.849,
    commodity: "Podiform chromite",
    headline: "56% Cr₂O₃",
    figure: "54.3–56.4% Cr₂O₃ · Cr/Fe 2.5–3.0",
    contained: "No audited tonnage published",
    basis: "Grade from mine 7 ML samples",
    status: "Small-scale underground mining",
    source: {
      label: "Ahmad (1978), chromites of Muslimbagh",
      url: "https://psa.pastic.gov.pk/article/43567/geochemistry-of-chromites-from-mine-7-ml-muslimbagh-zhob-valley-baluchistan",
    },
    swir: { mineral: "Serpentine (Mg-OH)", feature: 2.32, depth: 0.27 },
  },
];
