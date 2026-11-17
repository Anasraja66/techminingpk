import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ExternalLink, Info, MapPin, Waves } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/site/CtaBand";
import { HubMap } from "@/components/site/HubMap";
import { SectionLabel } from "@/components/site/PageIntro";
import { StatusBadge } from "@/components/site/StatusBadge";
import { HUBS, getHub } from "@/lib/hubs";

export const Route = createFileRoute("/hubs/$slug")({
  loader: ({ params }) => {
    const hub = getHub(params.slug);
    if (!hub) throw notFound();
    return { hub };
  },
  head: ({ loaderData }) => {
    const hub = loaderData?.hub;
    if (!hub) {
      return { meta: [{ title: "Hub not found — TechMining Global" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${hub.name} Hub — ${hub.focus.slice(0, 2).join(" & ")} | TechMining Global`;
    return {
      meta: [
        { title },
        { name: "description", content: `${hub.summary} Satellite imagery, sourced facts and screening status for ${hub.name}, ${hub.region}.` },
        { property: "og:title", content: title },
        { property: "og:description", content: hub.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: () => (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <h1 className="type-headline-lg">This hub doesn't exist.</h1>
      <Button className="mt-6" asChild>
        <Link to="/hubs">See all hubs</Link>
      </Button>
    </section>
  ),
  component: HubPage,
});

function HubPage() {
  const { hub } = Route.useLoaderData();
  const others = HUBS.filter((h) => h.slug !== hub.slug);

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-8 sm:px-6 md:pt-14">
        <Link to="/hubs" className="inline-flex items-center gap-1.5 type-label-lg text-primary hover:underline">
          <ArrowLeft className="size-4" /> All hubs
        </Link>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-2 type-label-sm uppercase tracking-[0.12em] text-primary">
              <MapPin className="size-3.5" /> {hub.region}
            </p>
            <h1 className="mt-3 type-display-md text-foreground">{hub.name} hub</h1>
            <p className="mt-4 max-w-2xl type-body-lg text-muted-foreground">{hub.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {hub.focus.map((f) => (
                <span key={f} className="rounded-sm bg-secondary px-3 py-1.5 type-label-lg text-secondary-foreground">
                  {f}
                </span>
              ))}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-3">
            <div className="card-filled p-4">
              <dt className="type-label-sm uppercase text-muted-foreground">Prospectivity screening</dt>
              <dd className="mt-2">
                <StatusBadge status={hub.screening} />
              </dd>
            </div>
            <div className="card-filled p-4">
              <dt className="type-label-sm uppercase text-muted-foreground">Reviewed Zones</dt>
              <dd className="mt-2">
                <StatusBadge status={hub.reviewedZones} />
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <HubMap hub={hub} />
        {hub.note && (
          <p className="mt-4 flex items-start gap-3 rounded-[16px] bg-surface-low p-4 type-body-md text-foreground">
            <Info className="mt-0.5 size-5 shrink-0 text-primary" /> {hub.note}
          </p>
        )}
      </section>

      <section className="bg-surface-low py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionLabel>Published facts</SectionLabel>
          <h2 className="mt-3 type-headline-lg">What the public record says</h2>
          <dl className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {hub.facts.map((f) => (
              <div key={f.label} className="flex flex-col rounded-[16px] bg-surface-lowest p-5">
                <dt className="type-label-sm uppercase text-muted-foreground">{f.label}</dt>
                <dd className="mt-2 flex-1 type-title-lg text-foreground">{f.value}</dd>
                <dd className="mt-4">
                  <a
                    href={f.source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 type-label-sm text-primary hover:underline"
                  >
                    {f.source.label} <ExternalLink className="size-3" />
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:py-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionLabel>Geology</SectionLabel>
          <h2 className="mt-3 type-headline-lg">Why {hub.name} shows up from orbit</h2>
          <p className="mt-4 type-body-lg text-muted-foreground">{hub.geology}</p>
          <Button className="mt-8" asChild>
            <Link to="/contact">
              Request an Area Audit in {hub.name} <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="card-outlined overflow-hidden">
          <div className="flex items-center gap-2 border-b border-outline-variant px-5 py-3">
            <Waves className="size-4 text-primary" />
            <p className="type-title-md">Spectral targets we screen for</p>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="type-label-sm uppercase text-muted-foreground">
                <th className="px-5 py-2.5 font-medium">Mineral</th>
                <th className="px-3 py-2.5 font-medium">Feature</th>
                <th className="hidden px-5 py-2.5 font-medium sm:table-cell">What it means</th>
              </tr>
            </thead>
            <tbody>
              {hub.signals.map((s) => (
                <tr key={s.mineral} className="border-t border-outline-variant align-top">
                  <td className="px-5 py-3 type-body-md text-foreground">
                    {s.mineral}
                    <span className="mt-0.5 block type-label-sm text-muted-foreground sm:hidden">{s.meaning}</span>
                  </td>
                  <td className="px-3 py-3 font-mono text-[13px] text-primary">{s.feature}</td>
                  <td className="hidden px-5 py-3 type-body-md text-muted-foreground sm:table-cell">{s.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <SectionLabel>Other hubs</SectionLabel>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {others.map((h) => (
            <li key={h.slug}>
              <Link
                to="/hubs/$slug"
                params={{ slug: h.slug }}
                className="state-layer flex items-center gap-4 rounded-[16px] border border-outline-variant bg-surface-lowest p-3"
              >
                <img src={h.image} alt="" width={96} height={60} loading="lazy" className="h-14 w-20 rounded-[10px] object-cover" />
                <div className="min-w-0">
                  <p className="type-title-md">{h.name}</p>
                  <p className="truncate type-label-sm text-muted-foreground">{h.focus.join(" · ")}</p>
                </div>
                <ArrowRight className="ml-auto size-4 shrink-0 text-primary" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
