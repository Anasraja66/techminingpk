import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Code2,
  Database,
  ClipboardCheck,
  Gem,
  Landmark,
  LayoutDashboard,
  Pickaxe,
  PlayCircle,
  Sparkles,
  Radar,
  Scale,
  Ship,
  Truck,
  Wrench,
} from "lucide-react";

import heroImg from "@/assets/hero-mine.jpg";
import satelliteImg from "@/assets/card-satellite.jpg";
import gspImg from "@/assets/card-gsp-data.jpg";
import partnerApiImg from "@/assets/card-partner-api.jpg";
import oreGradeImg from "@/assets/card-ore-grade.jpg";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { DashboardMock } from "@/components/site/DashboardMock";
import { SectionLabel } from "@/components/site/PageIntro";
import { ServiceCard, type Service } from "@/components/site/ServiceCard";
import { ComplianceStrip } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechMining.pk — Mining Technology for Pakistan's Mines" },
      {
        name: "description",
        content:
          "TechMining.pk ranks drill targets inside your concession using ESA Sentinel-2 and NASA ASTER satellite data fused with Geological Survey of Pakistan ground truth — plus ore grade reports and a partner API.",
      },
      { property: "og:title", content: "TechMining.pk — Mining Technology for Pakistan's Mines" },
      {
        property: "og:description",
        content:
          "Satellite AI exploration with GSP ground truth, ore grade reports and a partner API — for Balochistan, KP and GB concessions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const DELIVERABLES = [
  "Satellite maps of where to drill",
  "Ore grade & blend reports for export",
  "GSP-integrated ground truth layer",
  "Partner API for your platform",
];

const SERVICES: Service[] = [
  {
    n: "01",
    tag: "Deep Tech",
    image: satelliteImg,
    imageAlt: "Earth seen from orbit at night over South Asia",
    caption: "Space-borne sensors",
    captionIcon: Radar,
    title: "Satellite AI Exploration",
    body: "We read ESA Sentinel-2 and NASA ASTER satellite data to map copper, gold and chromite alteration zones in your lease — before you spend on a single drill hole.",
    outcome: "You get: ranked drill-target map",
  },
  {
    n: "02",
    tag: "Local Advantage",
    image: gspImg,
    imageAlt: "Geologist reviewing a printed geological survey map of Balochistan beside rock samples",
    caption: "Government ground truth",
    captionIcon: Database,
    title: "GSP Data Integration",
    body: "We fuse Geological Survey of Pakistan's verified mineral occurrence data with live satellite spectral analysis — giving your targets a government-confirmed ground truth layer no foreign company can replicate.",
    outcome: "Verified GSP occurrence match",
  },
  {
    n: "03",
    tag: "Open Platform",
    image: partnerApiImg,
    imageAlt: "Laptop and monitor showing a GIS map with mineral anomaly points over mountains",
    caption: "REST API · GeoJSON",
    captionIcon: Code2,
    title: "Partner API & Data Layer",
    body: "Mining companies, consultancies and JV partners connect directly to our mineral intelligence layer via API. Pull ranked anomaly data, spectral signatures and drill-target coordinates into your own platform or dashboard.",
    outcome: "For partners & platforms",
  },
  {
    n: "04",
    tag: "Quality & Yield",
    image: oreGradeImg,
    imageAlt: "Geologist testing an ore sample with a handheld analyser beside stockpiles",
    caption: "Grade optimization",
    captionIcon: Gem,
    title: "Ore Blending & Quality",
    body: "We track the purity of every stockpile and tell you the exact low- and high-grade mix to hit your buyer's spec — for example 42% Cr₂O₃ — so no shipment is rejected at port.",
    outcome: "Chromite, copper, barite",
  },
];

const STATS = [
  { value: "70%", label: "Shorter exploration lead time" },
  { value: "90%+", label: "Mineral anomaly detection accuracy (Sentinel-2 SWIR)" },
  { value: "3–5x", label: "ROI vs traditional airborne surveys" },
  { value: "48 hrs", label: "From coordinates to ranked drill-target report" },
];

const STEPS = [
  {
    icon: ClipboardCheck,
    title: "Site audit",
    body: "Our team visits your mine for two days and writes down where money is leaking — scale, fleet, stockpile and paperwork.",
  },
  {
    icon: Wrench,
    title: "We install & connect",
    body: "We connect your existing weighbridge, fit fuel sensors on machines and run the satellite study. Works offline in remote areas.",
  },
  {
    icon: LayoutDashboard,
    title: "You run it from one screen",
    body: "Owners and managers see weights, challans, diesel and grade live — on laptop, phone and WhatsApp. We train your site staff.",
  },
];

const AUDIENCE = [
  { icon: Pickaxe, title: "Mine owners & leaseholders", body: "Stop losses you can't see today." },
  { icon: Ship, title: "Mineral exporters", body: "Ship on-spec grade, every time." },
  { icon: Landmark, title: "Provincial mines departments", body: "Verified challans and royalty data." },
  { icon: Building2, title: "Investors & JV partners", body: "Transparent numbers from the ground." },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pt-10 pb-14 sm:px-6 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-sm border border-outline-variant bg-surface-lowest py-1.5 pr-3 pl-2 type-label-lg text-muted-foreground">
            <span className="size-2 rounded-full bg-success" />
            techmining.pk · Mining technology for Balochistan, KP & GB
          </span>
          <h1 className="mt-6 type-display-lg text-foreground">
            We help Pakistan's mines <span className="text-primary">find more ore and lose less money.</span>
          </h1>
          <p className="mt-6 max-w-xl type-body-lg text-muted-foreground">
            We analyse ESA Sentinel-2 and NASA ASTER satellite data, fused with GSP's verified
            ground-truth mineral maps, to rank exact drill targets inside your concession — before
            you spend on a single hole.
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
                Book a Mine Audit <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="tonal" asChild>
              <Link to="/solutions">
                <PlayCircle /> See what we offer
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative animate-rise [animation-delay:120ms]">
          <img
            src={heroImg}
            alt="Open-pit mine benches and haul road in the mountains of Balochistan"
            width={1600}
            height={1104}
            className="aspect-[4/3.4] w-full rounded-[28px] object-cover"
          />
          <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-3 rounded-[16px] bg-surface-lowest p-3 shadow-elev-2 sm:left-6 sm:right-auto sm:max-w-sm">
            <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-primary-container text-on-primary-container">
              <Radar className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="type-label-sm uppercase text-muted-foreground">Drill target #04 · Chagai</p>
              <p className="truncate type-title-md">Cu-Au alteration · GSP match</p>
            </div>
            <span className="ml-auto rounded-sm bg-success-container px-2 py-0.5 type-label-sm text-on-success-container">
              High
            </span>
          </div>
        </div>
      </section>

      {/* What we deliver */}
      <section className="bg-surface-low py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel>What TechMining delivers</SectionLabel>
              <h2 className="mt-3 type-headline-lg">
                Four services. Take one, or run your whole mine on them.
              </h2>
              <p className="mt-3 type-body-lg text-muted-foreground">
                Each one solves a real loss we see on Pakistani sites — and comes installed,
                connected and supported by our team.
              </p>
            </div>
            <Link to="/solutions" className="type-label-lg text-primary hover:underline md:ml-auto">
              Full details →
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {SERVICES.map((s) => (
              <ServiceCard key={s.n} s={s} />
            ))}
          </div>

          <p className="mt-5 type-body-md text-muted-foreground">
            Need weighbridge, fleet telemetry or digital challan systems?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Ask about our Custom Enterprise ERP solutions →
            </Link>
          </p>

          <div className="mt-8 flex flex-col gap-4 rounded-[16px] border border-outline-variant bg-surface-lowest p-5 sm:flex-row sm:items-center sm:p-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-[12px] bg-primary-container text-on-primary-container">
              <Sparkles className="size-6" />
            </span>
            <div>
              <p className="type-title-lg">Not sure which service you need?</p>
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

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6">
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="card-filled p-5 sm:p-6">
              <dt className="sr-only">{s.label}</dt>
              <dd className="type-display-md text-primary">{s.value}</dd>
              <dd className="mt-1 type-body-md text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <SectionLabel>How it works</SectionLabel>
        <h2 className="mt-3 max-w-2xl type-headline-lg">From first site visit to a live dashboard.</h2>
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
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

      {/* Dashboard */}
      <section className="bg-surface-low py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel>Your control room</SectionLabel>
              <h2 className="mt-3 type-headline-lg">This is the screen you'll use every day.</h2>
              <p className="mt-3 type-body-lg text-muted-foreground">
                Trucks weighed, challans issued, diesel alerts and grade — all live, all in one place.
              </p>
            </div>
            <Button variant="outline" className="md:ml-auto" asChild>
              <Link to="/deep-tech">
                How the satellite layer works <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <DashboardMock />
        </div>
      </section>

      {/* Who it's for */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <SectionLabel>Who it's for</SectionLabel>
        <h2 className="mt-3 max-w-2xl type-headline-lg">Built for everyone who depends on a mine's numbers.</h2>
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

      <ComplianceStrip />
      <CtaBand
        title="Not sure where your mine is losing money?"
        body="Book a two-day site audit. You get a written report of every leak we find — weighbridge, fleet, stockpile and paperwork."
      />
    </>
  );
}
