import { createFileRoute } from "@tanstack/react-router";
import { BrainCircuit, ExternalLink, FileCheck2, Orbit, Trees, Waves } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { DashboardMock } from "@/components/site/DashboardMock";
import { PageIntro, SectionLabel } from "@/components/site/PageIntro";
import { StatusBadge } from "@/components/site/StatusBadge";
import { TECH_STACK, type Status } from "@/lib/platform";

export const Route = createFileRoute("/deep-tech")({
  head: () => ({
    meta: [
      { title: "Technology — Sentinel-2, Random Forest & Prithvi | TechMining Global" },
      {
        name: "description",
        content:
          "TechMining Global's technology stack: Sentinel-2 and ASTER imagery, a Random Forest prospectivity model, the NASA-IBM Prithvi-EO-2.0 foundation model (planned) and geologist review.",
      },
      { property: "og:title", content: "Technology — Sentinel-2, Random Forest & Prithvi" },
      {
        property: "og:description",
        content: "Satellite imagery, Random Forest scoring and the NASA-IBM Prithvi foundation model, with Live / Planned status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Technology,
});

const PIPELINE: { icon: typeof Orbit; title: string; body: string; status: Status }[] = [
  { icon: Orbit, title: "Acquire", body: "Cloud-free Sentinel-2 and ASTER scenes are pulled for your area polygon.", status: "Live" },
  { icon: Waves, title: "Extract", body: "SWIR band ratios and spectral indices for clay, sericite, iron oxide and Mg-OH minerals, plus terrain and structure.", status: "Live" },
  { icon: BrainCircuit, title: "Embed", body: "Prithvi-EO-2.0 turns multi-date imagery into learned features the model can use.", status: "Planned" },
  { icon: Trees, title: "Score", body: "A Random Forest trained on known occurrences gives every cell a 0–1 prospectivity score.", status: "Live" },
  { icon: FileCheck2, title: "Review", body: "A geologist checks the top cells. Passing cells become Reviewed Zones.", status: "Live" },
];

function Technology() {
  return (
    <>
      <PageIntro label="Technology" title="Open satellite data, an explainable model, a human check.">
        We use a Random Forest because it works with the few labelled sites most belts have and
        shows which inputs drove each score. The NASA-IBM Prithvi foundation model is next.
      </PageIntro>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PIPELINE.map((s, i) => (
            <li key={s.title} className="card-filled flex flex-col p-5">
              <div className="flex items-center justify-between">
                <s.icon className="size-6 text-primary" />
                <span className="font-mono text-[13px] text-muted-foreground">Step {i + 1}</span>
              </div>
              <h2 className="mt-5 type-title-lg">{s.title}</h2>
              <p className="mt-2 flex-1 type-body-md text-muted-foreground">{s.body}</p>
              <StatusBadge status={s.status} className="mt-4 self-start" />
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-surface-low py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionLabel>Technology stack</SectionLabel>
          <h2 className="mt-3 max-w-2xl type-headline-lg">Every layer, and whether it's running today.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {TECH_STACK.map((t) => (
              <article
                key={t.name}
                className={
                  t.name.includes("Prithvi") || t.name.includes("Random Forest")
                    ? "flex flex-col rounded-[28px] border border-primary/40 bg-surface-lowest p-6 sm:p-7"
                    : "flex flex-col rounded-[28px] border border-outline-variant bg-surface-lowest p-6 sm:p-7"
                }
              >
                <div className="flex items-start gap-3">
                  <div>
                    <p className="type-label-sm uppercase text-primary">{t.role}</p>
                    <h3 className="mt-1 type-headline-sm">{t.name}</h3>
                  </div>
                  <StatusBadge status={t.status} className="ml-auto mt-1" />
                </div>
                <p className="mt-4 flex-1 type-body-md text-muted-foreground">{t.body}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {t.facts.map((f) => (
                    <li key={f} className="rounded-sm bg-secondary px-2.5 py-1 type-label-lg text-secondary-foreground">
                      {f}
                    </li>
                  ))}
                </ul>
                {t.source && (
                  <a
                    href={t.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1 self-start type-label-lg text-primary hover:underline"
                  >
                    {t.source.label} <ExternalLink className="size-3.5" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16">
        <SectionLabel>Launch region demo</SectionLabel>
        <h2 className="mt-3 max-w-2xl type-headline-lg">Pakistan's public mineral record, on one map.</h2>
        <p className="mt-3 max-w-2xl type-body-lg text-muted-foreground">
          Real Sentinel-2 imagery, USGS mineral records and published deposit figures. Tap a deposit to
          see its grade, tonnage and source.
        </p>
        <div className="mt-8">
          <DashboardMock />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
