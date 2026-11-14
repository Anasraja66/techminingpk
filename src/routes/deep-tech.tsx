import { createFileRoute } from "@tanstack/react-router";
import { Layers, Orbit, Target, Waves } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { DashboardMock } from "@/components/site/DashboardMock";
import { PageIntro, SectionLabel } from "@/components/site/PageIntro";

export const Route = createFileRoute("/deep-tech")({
  head: () => ({
    meta: [
      { title: "Deep Tech — Satellite Mineral AI | TechMining" },
      {
        name: "description",
        content:
          "How TechMining uses Sentinel-2 and ASTER SWIR imagery to detect hydrothermal alteration zones in Chagai and Reko Diq, plus a live control-room demo.",
      },
      { property: "og:title", content: "Deep Tech — Satellite Mineral AI | TechMining" },
      {
        property: "og:description",
        content: "Satellite alteration mapping and a live mine control-room demo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DeepTech,
});

const STEPS = [
  {
    icon: Orbit,
    title: "Acquire",
    body: "Cloud-free Sentinel-2 MSI and ASTER L1T scenes are pulled for your concession polygon.",
  },
  {
    icon: Waves,
    title: "Unmix",
    body: "SWIR band ratios (b4/b6, b5/b7) and spectral angle mapping isolate clay, sericite and iron oxides.",
  },
  {
    icon: Layers,
    title: "Fuse",
    body: "Spectral layers are fused with GSP geology, DEM structure and known porphyry occurrences.",
  },
  {
    icon: Target,
    title: "Rank",
    body: "A trained model scores each pixel. You get ranked targets with confidence and field notes.",
  },
];

function DeepTech() {
  return (
    <>
      <PageIntro label="Deep tech · Satellite AI" title="Reading the rock from 786 km up.">
        Porphyry copper and chromite systems leave a mineral signature at the surface. Short-wave
        infrared sees it — we turn it into drill targets a geologist can verify in the field.
      </PageIntro>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="card-filled p-6">
              <div className="flex items-center justify-between">
                <s.icon className="size-6 text-primary" />
                <span className="font-mono text-[13px] text-muted-foreground">Step {i + 1}</span>
              </div>
              <h2 className="mt-6 type-title-lg">{s.title}</h2>
              <p className="mt-2 type-body-md text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-surface-low py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionLabel>Live demo</SectionLabel>
          <h2 className="mt-3 max-w-2xl type-headline-lg">The control room, as your site manager sees it.</h2>
          <p className="mt-3 max-w-2xl type-body-lg text-muted-foreground">
            Hover the hotspots for alteration type and model confidence. Sample data from a
            Balochistan demo tenancy.
          </p>
          <div className="mt-8">
            <DashboardMock />
          </div>
        </div>
      </section>

      <CtaBand
        title="Want this on your concession?"
        body="Send us your lease coordinates. We'll return a first-pass anomaly map within ten working days."
      />
    </>
  );
}
