// Regional hubs — Pakistan is TechMining Global's launch region. Every figure carries a public source.
import chagaiImg from "@/assets/hub-chagai.jpg.asset.json";
import muslimBaghImg from "@/assets/hub-muslim-bagh.jpg.asset.json";
import swatImg from "@/assets/hub-swat.jpg.asset.json";
import tharImg from "@/assets/hub-thar.jpg.asset.json";
import type { Status } from "@/lib/platform";

export type Source = { label: string; url: string };

export type Hub = {
  slug: string;
  name: string;
  region: string;
  focus: string[];
  summary: string;
  geology: string;
  /** [west lon, south lat, east lon, north lat] — matches the satellite crop exactly. */
  bbox: [number, number, number, number];
  image: string;
  screening: Status;
  reviewedZones: Status;
  note?: string;
  facts: { label: string; value: string; source: Source }[];
  signals: { mineral: string; feature: string; meaning: string }[];
  places: { name: string; lon: number; lat: number; note: string; major?: boolean }[];
};

const GSP: Source = { label: "Geological Survey of Pakistan", url: "https://gsp.gov.pk/gsp-achievements/" };
const BARRICK: Source = {
  label: "Barrick NI 43-101 report, Dec 2024",
  url: "https://s25.q4cdn.com/322814910/files/doc_downloads/reko_diq/Barrick_RekoDiq_TechnicalReport_20241231.pdf",
};
const TCEB: Source = { label: "Thar Coal & Energy Board", url: "https://www.tceb.gos.pk/thar-coalfield/" };

export const HUBS: Hub[] = [
  {
    slug: "chagai",
    name: "Chagai",
    region: "Balochistan, Pakistan",
    focus: ["Copper", "Gold", "Molybdenum"],
    summary:
      "The Chagai magmatic arc hosts Reko Diq and Saindak — porphyry copper-gold systems whose alteration halos show clearly in short-wave infrared.",
    geology:
      "Tethyan porphyry belt of Eocene–Miocene intrusions. Phyllic (sericite) and argillic (clay) alteration around the intrusions is the main satellite target.",
    bbox: [60.6, 27.95, 65.0, 30.35],
    image: chagaiImg.url,
    screening: "Live",
    reviewedZones: "Live",
    facts: [
      { label: "Reko Diq reserve", value: "3,008 Mt @ 0.48% Cu", source: BARRICK },
      { label: "Contained metal", value: "15 Mt Cu · 26 Moz Au", source: BARRICK },
      {
        label: "Saindak resource",
        value: "440 Mt @ 0.41% Cu",
        source: { label: "PorterGeo deposit database", url: "https://portergeo.com.au/database/mineinfo.php?mineid=mn1658" },
      },
      { label: "Discovered by GSP", value: "Saindak 1973 · Reko Diq 1978–79", source: GSP },
    ],
    signals: [
      { mineral: "Sericite (Al-OH)", feature: "2.20 µm", meaning: "Phyllic alteration core" },
      { mineral: "Kaolinite / alunite", feature: "2.17 µm", meaning: "Argillic alteration" },
      { mineral: "Chlorite / epidote", feature: "2.33 µm", meaning: "Propylitic outer halo" },
      { mineral: "Iron oxides (Fe³⁺)", feature: "0.90 µm", meaning: "Gossan over sulphides" },
    ],
    places: [
      { name: "Reko Diq", lon: 62.05, lat: 29.12, note: "Cu-Au porphyry · in development", major: true },
      { name: "Saindak", lon: 61.618, lat: 29.232, note: "Cu-Au-Mo · producing since 2003", major: true },
    ],
  },
  {
    slug: "muslim-bagh",
    name: "Muslim Bagh",
    region: "Balochistan, Pakistan",
    focus: ["Chromite", "Magnesite"],
    summary:
      "The Muslim Bagh (Hindubagh) ophiolite carries podiform chromite with metallurgical-grade Cr₂O₃ — mined underground at small scale for decades.",
    geology:
      "Obducted Cretaceous ophiolite in the Zhob valley. Chromite pods sit in serpentinised dunite and harzburgite, which have distinct Mg-OH absorption.",
    bbox: [67.03, 30.42, 68.63, 31.28],
    image: muslimBaghImg.url,
    screening: "Live",
    reviewedZones: "Live",
    facts: [
      {
        label: "Chromite grade",
        value: "54.3–56.4% Cr₂O₃",
        source: {
          label: "Ahmad (1978), chromites of Muslimbagh",
          url: "https://psa.pastic.gov.pk/article/43567/geochemistry-of-chromites-from-mine-7-ml-muslimbagh-zhob-valley-baluchistan",
        },
      },
      {
        label: "Cr/Fe ratio",
        value: "2.5–3.0",
        source: {
          label: "Ahmad (1978), chromites of Muslimbagh",
          url: "https://psa.pastic.gov.pk/article/43567/geochemistry-of-chromites-from-mine-7-ml-muslimbagh-zhob-valley-baluchistan",
        },
      },
      { label: "USGS MRDS records", value: "Hindubagh area chromite & manganese", source: { label: "USGS MRDS", url: "https://mrdata.usgs.gov/mrds/" } },
    ],
    signals: [
      { mineral: "Serpentine (Mg-OH)", feature: "2.32 µm", meaning: "Serpentinised ultramafic host" },
      { mineral: "Olivine / pyroxene (Fe²⁺)", feature: "~1.0 µm", meaning: "Fresh dunite & harzburgite" },
      { mineral: "Magnesite / talc", feature: "2.30–2.33 µm", meaning: "Carbonate alteration zones" },
    ],
    places: [{ name: "Muslim Bagh", lon: 67.834, lat: 30.849, note: "Podiform chromite · small-scale mining", major: true }],
  },
  {
    slug: "thar",
    name: "Thar",
    region: "Sindh, Pakistan",
    focus: ["Lignite", "China clay", "Granite"],
    summary:
      "The Thar coalfield is one of the world's largest lignite resources. It lies under desert sand, so this hub pairs coalfield data with screening of the Nagarparkar granite outcrop to the south-east.",
    geology:
      "Paleocene Bara Formation lignite under 114–203 m of dune sand and alluvium, with no rock exposure. Nagarparkar's Precambrian granites are the only outcrop in the area.",
    bbox: [69.45, 24.16, 71.35, 25.24],
    image: tharImg.url,
    screening: "Planned",
    reviewedZones: "Planned",
    note: "Satellite spectra cannot see coal buried 100+ m deep. Thar screening will focus on the Nagarparkar outcrop (kaolin, granite) and surface mapping around the coal blocks.",
    facts: [
      { label: "Coal resource", value: "175 billion tonnes", source: TCEB },
      { label: "Coalfield area", value: "9,100 km²", source: TCEB },
      { label: "Overburden", value: "114–203 m", source: TCEB },
      { label: "Discovered", value: "1991 · GSP & USAID", source: GSP },
    ],
    signals: [
      { mineral: "Kaolinite", feature: "2.165 / 2.205 µm doublet", meaning: "China clay in weathered granite" },
      { mineral: "Granite (felsic)", feature: "TIR silica emissivity", meaning: "Dimension-stone outcrop (ASTER TIR)" },
      { mineral: "Land surface change", feature: "Multi-date Sentinel-2", meaning: "Mine-block and dump expansion" },
    ],
    places: [
      { name: "Thar coalfield (Islamkot)", lon: 70.18, lat: 24.7, note: "Lignite · open-pit mining since 2019", major: true },
      { name: "Nagarparkar", lon: 70.74, lat: 24.36, note: "Granite outcrop · china clay" },
    ],
  },
  {
    slug: "swat",
    name: "Swat",
    region: "Khyber Pakhtunkhwa, Pakistan",
    focus: ["Emerald", "Magnesite", "Talc"],
    summary:
      "Swat's emeralds grow in talc-magnesite rocks along the Indus Suture Zone — an alteration assemblage with a strong carbonate and Mg-OH signature.",
    geology:
      "Mingora ophiolitic mélange of the Indus Suture Zone. Serpentinised ultramafics altered to magnesite-talc-quartz rock host emerald, Cr-tourmaline and fuchsite.",
    bbox: [71.7, 34.5, 73.1, 35.22],
    image: swatImg.url,
    screening: "Live",
    reviewedZones: "Planned",
    note: "Forest and terrace farming cover parts of the valley; screening masks vegetation and works on exposed slopes.",
    facts: [
      { label: "Key deposit", value: "Mingora emerald mine", source: { label: "Mindat — Mingora emerald deposit", url: "http://www.mindat.org/loc-13756.html" } },
      {
        label: "Host rock",
        value: "Magnesite-talc altered ultramafics",
        source: { label: "Arif et al. 2011, Ore Geology Reviews", url: "https://doi.org/10.1016/j.oregeorev.2010.11.006" },
      },
      {
        label: "Setting",
        value: "Indus Suture mélange",
        source: { label: "Kazmi et al. 1984, J. Himalayan Earth Sci.", url: "http://ojs.uop.edu.pk/jhes/article/view/1273" },
      },
    ],
    signals: [
      { mineral: "Magnesite (CO₃)", feature: "2.30 µm", meaning: "Carbonate-altered ultramafic" },
      { mineral: "Talc (Mg-OH)", feature: "2.31 µm", meaning: "Talc-carbonate emerald host" },
      { mineral: "Fuchsite (Cr-mica)", feature: "2.20 µm", meaning: "Cr-bearing alteration near veins" },
    ],
    places: [{ name: "Mingora emerald deposit", lon: 72.36, lat: 34.78, note: "Emerald · talc-magnesite host", major: true }],
  },
];

export function getHub(slug: string) {
  return HUBS.find((h) => h.slug === slug);
}
