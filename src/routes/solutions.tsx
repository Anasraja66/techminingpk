import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, FileCheck2, ScanSearch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { PageIntro, SectionLabel } from "@/components/site/PageIntro";
import { StatusBadge } from "@/components/site/StatusBadge";
import { CAPABILITIES, capability } from "@/lib/platform";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Platform — Prospectivity Screening & Reviewed Zones | TechMining Global" },
      {
        name: "description",
        content:
          "How TechMining Global works: Mineral Prospectivity Screening and geologist-Reviewed Zones, with a public status board showing which capabilities are Live and which are Planned.",
      },
      { property: "og:title", content: "Platform — Prospectivity Screening & Reviewed Zones" },
      {
        property: "og:description",
        content: "Two core outputs and an honest Live / Planned status board for every capability.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Platform,
});

const CORE = [
  {
    cap: capability("screening"),
    icon: ScanSearch,
    lead: "Where should we look?",
    points: [
      "Sentinel-2 and ASTER band ratios for clay, sericite, iron oxide and Mg-OH minerals",
      "Terrain, structure and known occurrences as extra model inputs",
      "Random Forest score from 0 to 1 for every cell in your area",
    ],
    spec: [
      ["Imagery", "10–30 m"],
      ["Model", "Random Forest"],
      ["Coverage", "Any country"],
    ],
  },
  {
    cap: capability("reviewed-zones"),
    icon: FileCheck2,
    lead: "Where does a geologist agree?",
    points: [
      "Top-ranked cells checked against geology maps and structure",
      "Cross-checked with survey records (USGS MRDS, GSP in Pakistan)",
      "Pass / fail per zone, with a written note for your field team",
    ],
    spec: [
      ["Output", "Zone polygons"],
      ["Format", "KML · GeoTIFF · PDF"],
      ["Review", "Per zone"],
    ],
  },
];

const GROUPS = ["Core", "Data", "Delivery"] as const;

function Platform() {
  return (
    <>
      <PageIntro label="Platform" title="Prospectivity Screening, then Reviewed Zones.">
        Two outputs, one workflow. The model narrows a whole licence down to a few zones; a geologist
        decides which of those are worth a field visit.
      </PageIntro>

      <section className="mx-auto max-w-7xl space-y-4 px-4 pb-14 sm:px-6">
        {CORE.map((p, i) => (
          <article key={p.cap.id} className="card-outlined grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr_0.7fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-[16px] bg-primary-container text-on-primary-container">
                  <p.icon className="size-6" />
                </span>
                <span className="font-mono text-[13px] text-muted-foreground">Output 0{i + 1}</span>
                <StatusBadge status={p.cap.status} className="ml-auto" />
              </div>
              <h2 className="mt-5 type-headline-sm">{p.cap.name}</h2>
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

      <section className="bg-surface-low py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel>Status board</SectionLabel>
              <h2 className="mt-3 type-headline-lg">What works today, and what's next.</h2>
              <p className="mt-3 type-body-lg text-muted-foreground">
                <strong className="font-medium text-foreground">Live</strong> means you can buy it now.{" "}
                <strong className="font-medium text-foreground">Planned</strong> means it's on our roadmap — we
                won't sell it as working until it is.
              </p>
            </div>
            <div className="flex gap-2 md:ml-auto">
              <StatusBadge status="Live" />
              <StatusBadge status="Planned" />
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {GROUPS.map((g) => (
              <div key={g}>
                <p className="type-label-sm uppercase text-muted-foreground">{g}</p>
                <ul className="mt-3 grid gap-3 md:grid-cols-2">
                  {CAPABILITIES.filter((c) => c.group === g).map((c) => (
                    <li key={c.id} className="flex flex-col gap-2 rounded-[16px] bg-surface-lowest p-5">
                      <div className="flex items-start gap-3">
                        <h3 className="type-title-md">{c.name}</h3>
                        <StatusBadge status={c.status} className="ml-auto" />
                      </div>
                      <p className="type-body-md text-muted-foreground">{c.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-outline-variant pt-6 sm:flex-row sm:items-center">
            <p className="type-body-md text-muted-foreground">
              Custom Enterprise ERP (weighbridge, fleet telemetry, digital challan) is available on request, priced per site.
            </p>
            <Button variant="outline" className="sm:ml-auto" asChild>
              <Link to="/pricing">
                See services <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
