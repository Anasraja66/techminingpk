import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, FlaskConical, Microscope } from "lucide-react";

import { CtaBand } from "@/components/site/CtaBand";
import { PageIntro } from "@/components/site/PageIntro";
import { ComplianceStrip } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — Scientific Foundations | TechMining" },
      {
        name: "description",
        content:
          "The peer-reviewed science behind TechMining: USGS Chagai porphyry studies, MDPI Remote Sensing work on Lasbela ophiolites, and IoT underground mine safety research.",
      },
      { property: "og:title", content: "Research — Scientific Foundations | TechMining" },
      {
        property: "og:description",
        content: "Peer-reviewed benchmarks behind our satellite and IoT models.",
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
    applies: "Satellite exploration model",
  },
  {
    icon: Microscope,
    source: "MDPI · Remote Sensing",
    title: "Multispectral mapping of the Lasbela ophiolites",
    body: "Band-ratio and spectral-angle methods for discriminating serpentinite and chromite-hosting units — the basis of our chromite targeting layer.",
    applies: "Chromite targeting",
  },
  {
    icon: FlaskConical,
    source: "Springer",
    title: "IoT systems for underground mine safety",
    body: "Sensor-network architectures for gas, vibration and equipment telemetry in constrained mine environments. Informs our fleet and edge-device design.",
    applies: "Fleet & fuel telemetry",
  },
];

function Research() {
  return (
    <>
      <PageIntro label="Research" title="Built on published geology, not guesswork.">
        Every model we ship is benchmarked against peer-reviewed work on Pakistan's own
        terrain. These are the foundations our team returns to.
      </PageIntro>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-3 md:grid-cols-3">
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

      <ComplianceStrip />
      <CtaBand />
    </>
  );
}
