import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { PageIntro, SectionLabel } from "@/components/site/PageIntro";
import { StatusBadge } from "@/components/site/StatusBadge";
import { HUBS } from "@/lib/hubs";

export const Route = createFileRoute("/hubs/")({
  head: () => ({
    meta: [
      { title: "Regional Hubs — Chagai, Muslim Bagh, Thar, Swat | TechMining Global" },
      {
        name: "description",
        content:
          "TechMining Global's launch hubs in Pakistan: Chagai copper-gold, Muslim Bagh chromite, Thar lignite and Swat emerald — each with real Sentinel-2 imagery, sourced facts and Live / Planned status.",
      },
      { property: "og:title", content: "Regional Hubs — TechMining Global" },
      {
        property: "og:description",
        content: "Four launch hubs in Pakistan with satellite imagery, sourced deposit facts and screening status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HubsIndex,
});

function HubsIndex() {
  return (
    <>
      <PageIntro label="Regional hubs · Launch region Pakistan" title="Four hubs where we know the ground best.">
        A hub is a mineral belt we have studied in depth — imagery, known deposits, spectral targets
        and review notes. Area Audits run in any country; hubs are where Reviewed Zones are built first.
      </PageIntro>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {HUBS.map((h) => (
            <Link
              key={h.slug}
              to="/hubs/$slug"
              params={{ slug: h.slug }}
              className="group card-outlined flex flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-surface-high">
                <img
                  src={h.image}
                  alt={`Sentinel-2 satellite view of the ${h.name} hub`}
                  width={1600}
                  height={1000}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-sm bg-inverse-surface/85 px-2.5 py-1.5 font-mono text-[12px] text-inverse-on-surface">
                  <MapPin className="size-3.5" /> {h.region}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="type-headline-sm text-foreground transition-colors group-hover:text-primary">{h.name}</h2>
                  <div className="ml-auto flex flex-wrap gap-1.5">
                    {h.focus.map((f) => (
                      <span key={f} className="rounded-sm bg-secondary px-2 py-0.5 type-label-sm text-secondary-foreground">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mt-3 mb-5 type-body-md text-muted-foreground">{h.summary}</p>
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-outline-variant pt-4 type-label-lg">
                  <span className="flex items-center gap-2">
                    Screening <StatusBadge status={h.screening} />
                  </span>
                  <span className="flex items-center gap-2">
                    Reviewed Zones <StatusBadge status={h.reviewedZones} />
                  </span>
                  <ArrowRight className="ml-auto size-4 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-surface-low py-14">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-center">
          <span className="grid size-14 shrink-0 place-items-center rounded-[16px] bg-primary-container text-on-primary-container">
            <Globe2 className="size-7" />
          </span>
          <div className="max-w-2xl">
            <SectionLabel>Beyond Pakistan</SectionLabel>
            <h2 className="mt-2 type-headline-sm">Your belt isn't listed? Screening still works there.</h2>
            <p className="mt-2 type-body-md text-muted-foreground">
              Sentinel-2 covers every land surface on Earth. Book an Area Audit for any country — new
              hubs open where clients need them. <StatusBadge status="Planned" className="ml-1 align-middle" />
            </p>
          </div>
          <Button className="md:ml-auto" asChild>
            <Link to="/contact">
              Request an Area Audit <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
