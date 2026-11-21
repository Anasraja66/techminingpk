import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Code2,
  FileCheck2,
  Gem,
  Globe2,
  Landmark,
  MapPinned,
  Pickaxe,
  Radar,
  Satellite,
  ScanSearch,
  Sparkles,
  Trees,
} from "lucide-react";

import heroImg from "@/assets/hero-laptop-map.jpg";
import satelliteImg from "@/assets/card-satellite.jpg";
import gspImg from "@/assets/card-gsp-data.jpg";
import partnerApiImg from "@/assets/card-partner-api.jpg";
import oreGradeImg from "@/assets/card-ore-grade.jpg";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { DashboardMock } from "@/components/site/DashboardMock";
import { SectionLabel } from "@/components/site/PageIntro";
import { ServiceCard, type Service } from "@/components/site/ServiceCard";
import { DataSourcesStrip } from "@/components/site/SiteFooter";
import { StatusBadge } from "@/components/site/StatusBadge";
import { HUBS } from "@/lib/hubs";
import { CAPABILITIES, capability } from "@/lib/platform";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechMining Global — Mineral Prospectivity Screening, Anywhere" },
      {
        name: "description",
        content:
          "TechMining Global screens any concession for mineral prospectivity with Sentinel-2, ASTER and a Random Forest model, then delivers geologist-reviewed zones. Launch hubs: Chagai, Muslim Bagh, Thar, Swat.",
      },
      { property: "og:title", content: "TechMining Global — Mineral Prospectivity Screening, Anywhere" },
      {
        property: "og:description",
        content: "Satellite prospectivity screening and Reviewed Zones for concessions in any country. Every capability labelled Live or Planned.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const DELIVERABLES = [
  "Prospectivity map for any country",
  "Zones reviewed by a geologist",
  "Sentinel-2 · ASTER · Random Forest",
  "GeoTIFF, KML & PDF you can field-check",
];

const SERVICES: Service[] = [
  {
    n: "01",
    tag: "Core",
    status: capability("screening").status,
    image: satelliteImg,
    imageAlt: "Earth seen from orbit at night",
    caption: "Sentinel-2 · ASTER · Random Forest",
    captionIcon: Radar,
    title: "Mineral Prospectivity Screening",
    body: "We score every cell of your area for copper, gold, chromite and other mineral systems using satellite spectra, terrain and known occurrences.",
    outcome: "You get: ranked prospectivity map",
  },
  {
    n: "02",
    tag: "Core",
    status: capability("reviewed-zones").status,
    image: gspImg,
    imageAlt: "Geologist reviewing a printed geological map beside rock samples",
    caption: "Human-checked targets",
    captionIcon: FileCheck2,
    title: "Reviewed Zones",
    body: "A geologist checks the top-ranked cells against mapped geology, structure and survey records. Only zones that pass are delivered — with a written note.",
    outcome: "You get: field-ready zones",
  },
  {
    n: "03",
    tag: "Platform",
    status: capability("api").status,
    image: partnerApiImg,
    imageAlt: "Laptop and monitor showing a GIS map with mineral anomaly points",
    caption: "REST API · GeoJSON",
    captionIcon: Code2,
    title: "Partner API & Data Layer",
    body: "Consultancies and platforms will pull reviewed zones and prospectivity scores straight into their own GIS. Pilot partners get early access.",
    outcome: "For partners & platforms",
  },
  {
    n: "04",
    tag: "Production",
    status: capability("blending").status,
    image: oreGradeImg,
    imageAlt: "Geologist testing an ore sample with a handheld analyser",
    caption: "Grade control",
    captionIcon: Gem,
    title: "Ore Blending & Quality",
    body: "Stockpile grade tracking and blend ratios to hit a buyer's spec — for example 42% Cr₂O₃ — so shipments aren't rejected at port.",
    outcome: "Chromite, copper, barite",
  },
];

const FACTS = [
  { value: "10 m", label: "Sentinel-2 visible & near-infrared resolution", source: "ESA" },
  { value: "5 days", label: "Sentinel-2 revisit over every land surface", source: "ESA" },
  { value: "14", label: "ASTER spectral bands, six in short-wave infrared", source: "NASA" },
  { value: "4", label: "Launch hubs in Pakistan, more on request", source: "TechMining" },
];

const STEPS = [
  {
    icon: MapPinned,
    title: "Send your area",
    body: "A concession polygon, licence block or just coordinates — in any country.",
  },
  {
    icon: ScanSearch,
    title: "We screen it",
    body: "Sentinel-2 and ASTER spectra, terrain and known occurrences feed a Random Forest that scores every cell.",
  },
  {
    icon: FileCheck2,
    title: "A geologist reviews",
    body: "Top-ranked cells are checked against geology and structure. Passing cells become Reviewed Zones.",
  },
  {
    icon: Pickaxe,
    title: "You go to the field",
    body: "GeoTIFF, KML and a PDF note your team can load on a tablet and check on the ground.",
  },
];

const AUDIENCE = [
  { icon: Pickaxe, title: "Mine owners & leaseholders", body: "Know where to drill before you spend." },
  { icon: Trees, title: "Exploration & junior companies", body: "Screen new ground fast, in any country." },
  { icon: Landmark, title: "Governments & geological surveys", body: "Prioritise blocks for licensing rounds." },
  { icon: Building2, title: "Investors & JV partners", body: "Check a project's ground with open data." },
];

function Index() {
  const live = CAPABILITIES.filter((c) => c.status === "Live").length;
  const planned = CAPABILITIES.length - live;

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-14 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-sm border border-outline-variant bg-surface-lowest py-1.5 pr-3 pl-2 type-label-lg text-muted-foreground">
            <Globe2 className="size-4 text-primary" />
            techminingglobal.com · Mineral prospectivity screening, worldwide
          </span>
          <h1 className="mt-6 type-display-lg text-foreground">
            Screen any concession for minerals. <span className="text-primary">Get zones a geologist has reviewed.</span>
          </h1>
          <p className="mt-6 max-w-xl type-body-lg text-muted-foreground">
            TechMining Global ranks the ground inside your licence using ESA Sentinel-2 and NASA ASTER
            satellite data and a Random Forest prospectivity model — then a geologist checks the best
            zones before you spend on a single hole.
          </p>

          <ul className="mt-6 grid max-w-xl gap-2.5 sm:grid-cols-2">
            {DELIVERABLES.map((d) => (
              <li key={d} className="flex items-start gap-2.5 type-body-md text-foreground">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary-container text-on-primary-container">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {d}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/contact">
                Request an Area Audit <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="tonal" asChild>
              <Link to="/hubs">
                <MapPinned /> Explore regional hubs
              </Link>
            </Button>
          </div>

          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 type-label-lg text-muted-foreground">
            <span className="type-label-sm uppercase">Launch hubs</span>
            {HUBS.map((h, i) => (
              <span key={h.slug} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true">·</span>}
                <Link to="/hubs/$slug" params={{ slug: h.slug }} className="text-foreground hover:text-primary">
                  {h.name}
                </Link>
              </span>
            ))}
          </p>
        </div>

        <div className="relative animate-rise pb-8 [animation-delay:120ms] lg:pb-0">
          <div className="overflow-hidden rounded-[28px] border border-outline-variant bg-surface-lowest shadow-elev-2">
            <img
              src={heroImg}
              alt="Laptop showing a TechMining exploration map with ranked zones and anomaly points"
              width={1600}
              height={1360}
              className="aspect-[20/17] w-full object-cover"
            />
          </div>

          <div className="absolute top-4 right-4 hidden items-center gap-2 rounded-full bg-surface-lowest py-1.5 pr-3.5 pl-2 shadow-elev-2 sm:flex">
            <span className="grid size-7 place-items-center rounded-full bg-primary-container text-on-primary-container">
              <Satellite className="size-3.5" />
            </span>
            <span className="type-label-lg text-foreground">Sentinel-2 · global coverage</span>
          </div>

          <div className="absolute -bottom-2 left-4 right-4 flex items-center gap-3 rounded-[16px] bg-surface-lowest p-3 shadow-elev-3 sm:left-6 sm:right-auto sm:max-w-sm lg:-bottom-6">
            <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-primary-container text-on-primary-container">
              <Radar className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="type-label-sm uppercase text-muted-foreground">Chagai hub · Reko Diq · Barrick 2024</p>
              <p className="truncate type-title-md">3.0 Bt @ 0.48% Cu</p>
            </div>
            <span className="ml-auto shrink-0 whitespace-nowrap rounded-sm bg-success-container px-2 py-0.5 font-mono type-label-sm text-on-success-container">
              15 Mt Cu
            </span>
          </div>
        </div>
      </section>

      {/* Two core outputs + capabilities */}
      <section className="bg-surface-low py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel>The platform</SectionLabel>
              <h2 className="mt-3 type-headline-lg">Two core outputs. Every capability labelled Live or Planned.</h2>
              <p className="mt-3 type-body-lg text-muted-foreground">
                Prospectivity Screening tells you where to look. Reviewed Zones tell you where a
                geologist agrees. Anything still on our roadmap is marked Planned — so you know exactly what you're buying.
              </p>
            </div>
            <Link to="/solutions" className="type-label-lg text-primary hover:underline md:ml-auto">
              Full status board →
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {SERVICES.map((s) => (
              <ServiceCard key={s.n} s={s} />
            ))}
          </div>

          <p className="mt-5 flex flex-wrap items-center gap-2 type-body-md text-muted-foreground">
            <StatusBadge status="Live" /> {live} capabilities today
            <span aria-hidden="true">·</span>
            <StatusBadge status="Planned" /> {planned} on the roadmap
            <span aria-hidden="true">·</span>
            Weighbridge or fleet ERP?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Available on request →
            </Link>
          </p>

          <div className="mt-8 flex flex-col gap-4 rounded-[16px] border border-outline-variant bg-surface-lowest p-5 sm:flex-row sm:items-center sm:p-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-[12px] bg-primary-container text-on-primary-container">
              <Sparkles className="size-6" />
            </span>
            <div>
              <p className="type-title-lg">Not sure what you need?</p>
              <p className="mt-1 type-body-md text-muted-foreground">
                Describe your site to our AI Site Advisor and get recommendations and next steps in under a minute.
              </p>
            </div>
            <Button className="sm:ml-auto" asChild>
              <Link to="/advisor">
                Ask the advisor <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {FACTS.map((s) => (
            <div key={s.label} className="card-filled p-5 sm:p-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="type-display-md text-primary">{s.value}</dd>
              <dd className="mt-1 type-body-md text-muted-foreground">{s.label}</dd>
              <dd className="mt-3 type-label-sm uppercase text-muted-foreground">Source · {s.source}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <SectionLabel>How an Area Audit works</SectionLabel>
        <h2 className="mt-3 max-w-2xl type-headline-lg">From coordinates to reviewed zones.</h2>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <li key={step.title} className="card-outlined p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-[12px] bg-primary-container text-on-primary-container">
                  <step.icon className="size-5" />
                </span>
                <span className="font-mono text-[13px] text-muted-foreground">Step 0{i + 1}</span>
              </div>
              <h3 className="mt-5 type-title-lg">{step.title}</h3>
              <p className="mt-2 type-body-md text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Hubs */}
      <section className="bg-surface-low py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel>Regional hubs · Pakistan launch region</SectionLabel>
              <h2 className="mt-3 type-headline-lg">Four belts we know in depth.</h2>
              <p className="mt-3 type-body-lg text-muted-foreground">
                Real Sentinel-2 imagery, published deposit figures and the spectral targets we screen
                for in each hub.
              </p>
            </div>
            <Link to="/hubs" className="type-label-lg text-primary hover:underline md:ml-auto">
              All hubs →
            </Link>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HUBS.map((h) => (
              <li key={h.slug}>
                <Link
                  to="/hubs/$slug"
                  params={{ slug: h.slug }}
                  className="group card-outlined flex h-full flex-col overflow-hidden"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-surface-high">
                    <img
                      src={h.image}
                      alt={`Sentinel-2 view of the ${h.name} hub`}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="type-label-sm uppercase text-muted-foreground">{h.region}</p>
                    <h3 className="mt-1 type-title-lg group-hover:text-primary">{h.name}</h3>
                    <p className="mt-1 type-body-md text-muted-foreground">{h.focus.join(" · ")}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-4 type-label-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        Screening <StatusBadge status={h.screening} />
                      </span>
                      <span className="flex items-center gap-1.5">
                        Zones <StatusBadge status={h.reviewedZones} />
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Dashboard */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <SectionLabel>Launch region view</SectionLabel>
            <h2 className="mt-3 type-headline-lg">Pakistan, on one screen.</h2>
            <p className="mt-3 type-body-lg text-muted-foreground">
              Real Sentinel-2 imagery, every USGS-recorded mineral site in Pakistan and published deposit figures — tap a deposit to see its numbers and source.
            </p>
          </div>
          <Button variant="outline" className="md:ml-auto" asChild>
            <Link to="/deep-tech">
              See the technology stack <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <DashboardMock />
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 md:pb-20">
        <SectionLabel>Who it's for</SectionLabel>
        <h2 className="mt-3 max-w-2xl type-headline-lg">For anyone deciding where to explore — in any country.</h2>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AUDIENCE.map((a) => (
            <li key={a.title} className="card-filled flex items-start gap-4 p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-lowest text-primary">
                <a.icon className="size-5" />
              </span>
              <div>
                <p className="type-title-md">{a.title}</p>
                <p className="mt-1 type-body-md text-muted-foreground">{a.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <DataSourcesStrip />
      <CtaBand />
    </>
  );
}
