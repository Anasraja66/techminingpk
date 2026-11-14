import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/site/PageIntro";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Engagement — TechMining" },
      {
        name: "description",
        content:
          "Three ways to work with TechMining: a single weighbridge site, the full enterprise mining OS, or on-demand satellite exploration reports.",
      },
      { property: "og:title", content: "Pricing & Engagement — TechMining" },
      {
        property: "og:description",
        content: "Single site, enterprise mining OS, or exploration AI reports.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});

const TIERS = [
  {
    tier: "Tier 1",
    name: "Single Weighbridge Site",
    billing: "Hardware + monthly SaaS",
    body: "For a leaseholder with one dispatch point who needs clean challans tomorrow.",
    features: [
      "RS232 scale integration & gate printer",
      "Digital Bilti with QR provincial challan",
      "Auto royalty calculation",
      "Daily dispatch report on WhatsApp",
    ],
    cta: "Book a site visit",
  },
  {
    tier: "Tier 2",
    name: "Enterprise Mining OS",
    billing: "Annual licence, per site",
    body: "For operators running multiple pits, a heavy fleet and export contracts.",
    features: [
      "Everything in Single Site",
      "Fleet telemetry & fuel-loss AI",
      "Ore blending & grade optimisation",
      "Multi-site control-room dashboard",
      "Regulator & buyer read-only portals",
    ],
    cta: "Talk to us",
    featured: true,
  },
  {
    tier: "Tier 3",
    name: "Exploration AI Reports",
    billing: "Per concession, on demand",
    body: "For investors and leaseholders scouting ground before committing capital.",
    features: [
      "Sentinel-2 & ASTER alteration mapping",
      "Ranked drill targets with confidence",
      "GeoTIFF / KML deliverables",
      "Geologist review call",
    ],
    cta: "Request a report",
  },
];

function Pricing() {
  return (
    <>
      <PageIntro label="Pricing" title="Pay for the problem you have today.">
        Every engagement starts with a scoped quote after a short call — mine sizes and
        hardware on site vary too much for a one-size price list.
      </PageIntro>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {TIERS.map((t) => (
            <article
              key={t.name}
              className={cn(
                "flex flex-col rounded-[28px] p-7",
                t.featured
                  ? "bg-primary-container text-on-primary-container"
                  : "border border-outline-variant bg-surface-lowest",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[13px] opacity-75">{t.tier}</span>
                {t.featured && (
                  <span className="rounded-sm bg-primary px-2 py-0.5 type-label-sm text-primary-foreground">
                    Most chosen
                  </span>
                )}
              </div>
              <h2 className="mt-4 type-headline-sm">{t.name}</h2>
              <p className="mt-1 type-label-lg text-primary">{t.billing}</p>
              <p className={cn("mt-4 type-body-md", !t.featured && "text-muted-foreground")}>{t.body}</p>
              <ul className="mt-6 flex-1 space-y-3 border-t border-outline-variant pt-6">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-3 type-body-md">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-8" variant={t.featured ? "default" : "outline"} asChild>
                <Link to="/contact">{t.cta}</Link>
              </Button>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
