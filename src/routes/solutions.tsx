import { createFileRoute } from "@tanstack/react-router";
import { Blend, Check, Fuel, Satellite, Scale } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PageIntro } from "@/components/site/PageIntro";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — TechMining Mining OS" },
      {
        name: "description",
        content:
          "Satellite mineral AI, smart weighbridge & e-Bilti, predictive fleet fuel-loss AI and ore blending optimization for Pakistani mines.",
      },
      { property: "og:title", content: "Solutions — TechMining Mining OS" },
      {
        property: "og:description",
        content: "Four modules that cover exploration, dispatch, fleet and export grade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Solutions,
});

const PILLARS = [
  {
    icon: Satellite,
    n: "01",
    title: "Space-borne mineral AI exploration",
    lead: "Find alteration zones before you mobilise a rig.",
    points: [
      "ESA Sentinel-2 and NASA ASTER SWIR band-ratio analysis",
      "Phyllic, argillic and propylitic alteration mapping across Chagai & Reko Diq",
      "Ranked drill targets delivered as GeoTIFF and KML",
    ],
    spec: [
      ["Resolution", "10–30 m"],
      ["Bands", "VNIR + SWIR"],
      ["Turnaround", "10 days"],
    ],
  },
  {
    icon: Scale,
    n: "02",
    title: "Smart weighbridge & e-Bilti",
    lead: "The scale talks to the system. Nobody types a weight.",
    points: [
      "Direct RS232 serial capture from existing load-cell indicators",
      "QR-coded provincial challans, printed at the gate",
      "Royalty and excise calculated automatically per mineral schedule",
    ],
    spec: [
      ["Interface", "RS232 / RS485"],
      ["Offline buffer", "72 hrs"],
      ["Challan", "QR + SMS"],
    ],
  },
  {
    icon: Fuel,
    n: "03",
    title: "Predictive fleet & fuel-loss AI",
    lead: "Every litre matched against engine hours and payload.",
    points: [
      "CAN-bus and fuel-probe telemetry on excavators, loaders and dumpers",
      "Consumption models per machine, per shift, per haul road",
      "Instant WhatsApp / SMS alerts when burn deviates from model",
    ],
    spec: [
      ["Alert latency", "< 2 min"],
      ["Detection", "±3% burn"],
      ["Channels", "WhatsApp · SMS"],
    ],
  },
  {
    icon: Blend,
    n: "04",
    title: "AI ore blending & grade optimization",
    lead: "Hit contract purity without over-shipping good ore.",
    points: [
      "Linear programming across stockpile assays and tonnages",
      "Targets like 42% Cr₂O₃ met with minimum high-grade dilution",
      "Blend sheets issued to loader operators on mobile",
    ],
    spec: [
      ["Solver", "LP / MILP"],
      ["Inputs", "XRF · lab assays"],
      ["Output", "Loader plan"],
    ],
  },
];

function Solutions() {
  return (
    <>
      <PageIntro label="Solutions" title="Four modules. One record from pit to port.">
        Start with the leak that costs you most. Every module writes to the same ledger, so
        the regulator, the buyer and your finance team read the same numbers.
      </PageIntro>

      <section className="mx-auto max-w-7xl space-y-4 px-4 pb-8 sm:px-6">
        {PILLARS.map((p) => (
          <article
            key={p.n}
            className="card-outlined grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr_0.7fr]"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-[16px] bg-primary-container text-on-primary-container">
                  <p.icon className="size-6" />
                </span>
                <span className="font-mono text-[13px] text-muted-foreground">Pillar {p.n}</span>
              </div>
              <h2 className="mt-5 type-headline-sm">{p.title}</h2>
              <p className="mt-2 type-body-lg text-muted-foreground">{p.lead}</p>
            </div>
            <ul className="space-y-3 self-center">
              {p.points.map((pt) => (
                <li key={pt} className="flex gap-3 type-body-md">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {pt}
                </li>
              ))}
            </ul>
            <dl className="card-filled grid grid-cols-3 gap-2 self-center p-4 lg:grid-cols-1 lg:gap-3">
              {p.spec.map(([k, v]) => (
                <div key={k}>
                  <dt className="type-label-sm uppercase text-muted-foreground">{k}</dt>
                  <dd className="font-mono text-[14px]">{v}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </section>

      <CtaBand />
    </>
  );
}
