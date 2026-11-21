import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro, SectionLabel } from "@/components/site/PageIntro";
import { StatusBadge } from "@/components/site/StatusBadge";
import { ENGAGEMENTS } from "@/lib/platform";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Services — Area Audit & Mineral Intelligence Pilot | TechMining Global" },
      {
        name: "description",
        content:
          "Work with TechMining Global through an Area Audit for one concession in any country, or a Mineral Intelligence Pilot across several areas. Quoted after a scoping call — no subscriptions.",
      },
      { property: "og:title", content: "Services — Area Audit & Mineral Intelligence Pilot" },
      {
        property: "og:description",
        content: "Two services, quoted per area or per pilot: Area Audit and Mineral Intelligence Pilot.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

const PROCESS = [
  "30-minute scoping call",
  "You share area polygon & any drill data",
  "Fixed written quote",
  "Screening, review & delivery",
];

function Services() {
  return (
    <>
      <PageIntro label="Services" title="Pay for an outcome, not a software seat.">
        Two ways to work with us. Each is scoped to your ground and quoted in writing after a short call —
        no subscriptions, no per-user pricing.
      </PageIntro>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6">
        <div className="grid max-w-5xl gap-4 lg:grid-cols-2">
          {ENGAGEMENTS.map((e, i) => {
            const featured = i === 0;
            return (
              <article
                key={e.id}
                className={cn(
                  "flex flex-col rounded-[28px] p-7",
                  featured ? "bg-primary-container text-on-primary-container" : "border border-outline-variant bg-surface-lowest",
                )}
              >
                <span className="font-mono text-[13px] opacity-75">Service 0{i + 1}</span>
                <h2 className="mt-3 type-headline-lg">{e.name}</h2>
                <p className={cn("mt-2 type-body-lg", !featured && "text-muted-foreground")}>{e.tagline}</p>
                <p className="mt-5 type-title-lg">{e.pricing}</p>
                <p className={cn("mt-1 type-body-md", !featured && "text-muted-foreground")}>{e.scope}</p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-outline-variant pt-6">
                  {e.includes.map((f) => (
                    <li key={f.label} className="flex items-start gap-3 type-body-md">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="flex-1">{f.label}</span>
                      <StatusBadge status={f.status} />
                    </li>
                  ))}
                </ul>
                <Button className="mt-8" variant={featured ? "default" : "outline"} asChild>
                  <Link to="/contact">
                    {e.cta} <ArrowRight />
                  </Link>
                </Button>
              </article>
            );
          })}
        </div>

        <div className="mt-10 max-w-5xl">
          <SectionLabel>How a quote works</SectionLabel>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <li key={p} className="card-filled flex items-start gap-3 p-4">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-surface-lowest font-mono text-[13px] text-primary">
                  {i + 1}
                </span>
                <span className="type-body-md">{p}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 max-w-5xl space-y-2 border-t border-outline-variant pt-6 type-body-md text-muted-foreground">
          <p className="flex items-start gap-2">
            <Clock3 className="mt-0.5 size-4 shrink-0 text-primary" />
            Items marked Planned are on our roadmap and are not yet part of a delivered engagement.
          </p>
          <p>
            * Custom Enterprise ERP (weighbridge, fleet telemetry, digital challan) available on request — priced per site.{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Talk to us →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
