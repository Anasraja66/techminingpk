import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, BrainCircuit, Microscope, Trees } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PageIntro } from "@/components/site/PageIntro";
import { DataSourcesStrip } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Scientific Foundations | TechMining Global" },
      {
        name: "description",
        content:
          "The published science behind TechMining Global: Random Forest prospectivity mapping, the NASA-IBM Prithvi-EO-2.0 foundation model, USGS porphyry studies and ophiolite spectral mapping.",
      },
      { property: "og:title", content: "Research — Scientific Foundations | TechMining Global" },
      {
        property: "og:description",
        content: "Published benchmarks behind our screening model and Reviewed Zones.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Research,
});

const PAPERS = [
  {
    icon: BookOpen,
    source: "USGS",
    title: "Chagai belt porphyry copper assessments",
    body: "Regional porphyry Cu-Au models for the Chagai magmatic arc. We use them to calibrate alteration-zone priors around Reko Diq and Saindak.",
    applies: "Chagai hub screening",
  },
  {
    icon: Microscope,
    source: "MDPI · Remote Sensing",
    title: "Multispectral mapping of the Lasbela ophiolites",
    body: "Band-ratio and spectral-angle methods for discriminating serpentinite and chromite-hosting units — the basis of our chromite targeting layer.",
    applies: "Muslim Bagh hub screening",
  },
  {
    icon: Trees,
    source: "Ore Geology Reviews · 2015",
    title: "Machine learning for mineral prospectivity",
    body: "Rodriguez-Galiano et al. compare random forest, neural networks, regression trees and SVMs for prospectivity mapping — the benchmark behind our choice of Random Forest.",
    applies: "Prospectivity Screening (Live)",
  },
  {
    icon: BrainCircuit,
    source: "NASA · IBM · Jülich · 2024",
    title: "Prithvi-EO-2.0 foundation model",
    body: "An open geospatial foundation model pretrained on 4.2M Harmonized Landsat Sentinel-2 time series. We are fine-tuning it to add learned features to our model.",
    applies: "Foundation-model features (Planned)",
  },
];

function Research() {
  return (
    <>
      <PageIntro label="Research" title="Built on published geology, not guesswork.">
        Every model we ship is benchmarked against published work — global methods, tested first
        on our Pakistan hubs. These are the foundations our team returns to.
      </PageIntro>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-3 md:grid-cols-2">
          {PAPERS.map((p) => (
            <article key={p.title} className="card-outlined flex flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-secondary text-secondary-foreground">
                  <p.icon className="size-5" />
                </span>
                <span className="type-label-lg text-primary">{p.source}</span>
              </div>
              <h2 className="mt-5 type-title-lg">{p.title}</h2>
              <p className="mt-3 flex-1 type-body-md text-muted-foreground">{p.body}</p>
              <p className="mt-6 border-t border-outline-variant pt-4 type-label-lg">
                <span className="text-muted-foreground">Used in · </span>
                {p.applies}
              </p>
            </article>
          ))}
        </div>
      </section>

      <DataSourcesStrip />
      <CtaBand />
    </>
  );
}
