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
          "Work with TechMining: Partner API access from $500 / month, or on-demand satellite exploration reports for mine owners and leaseholders. Custom enterprise ERP on request.",
      },
      { property: "og:title", content: "Pricing & Engagement — TechMining" },
      {
        property: "og:description",
        content: "Partner API from $500 / month and exploration reports for mine owners and leaseholders.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Pricing,
});

type Tier = {
  tier: string;
  name: string;
  price?: string;
  billing: string;
  body: string;
  features: string[];
  cta: string;
  to: "/partners" | "/contact";
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    tier: "For platforms",
    name: "Partner API",
    price: "From $500 / month",
    billing: "Monthly subscription",
    body: "For software companies and consultancies building on our mineral intelligence layer.",
    features: ["API key", "500 anomaly queries / month", "GeoJSON output", "Email support"],
    cta: "Get API Key →",
    to: "/partners",
    featured: true,
  },
  {
    tier: "Tier 1",
    name: "Exploration Reports for Mine Owners & Leaseholders",
    billing: "Per concession, on demand",
    body: "For mine owners and leaseholders who want to know where to drill before committing capital.",
    features: [
      "Sentinel-2 & ASTER alteration mapping",
      "GSP ground-truth match on every target",
      "Ranked drill targets with confidence",
      "GeoTIFF / KML deliverables",
      "Geologist review call",
    ],
    cta: "Request a report",
    to: "/contact",
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
        <div className="grid max-w-5xl gap-4 lg:grid-cols-2">
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
                    New
                  </span>
                )}
              </div>
              <h2 className="mt-4 type-headline-sm">{t.name}</h2>
              {t.price && <p className="mt-3 type-headline-lg">{t.price}</p>}
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
                <Link to={t.to}>{t.cta}</Link>
              </Button>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-5xl border-t border-outline-variant pt-6 type-body-md text-muted-foreground">
          * Custom Enterprise ERP (weighbridge, fleet telemetry, digital challan) available on
          request — priced per site.{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Talk to us →
          </Link>
        </p>
      </section>
    </>
  );
}
