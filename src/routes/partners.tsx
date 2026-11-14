import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Code2,
  Crosshair,
  Database,
  Handshake,
  Layers,
  MapPinned,
  ShieldCheck,
  Waves,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageIntro, SectionLabel } from "@/components/site/PageIntro";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners & API Access — TechMining" },
      {
        name: "description",
        content:
          "Build on Pakistan's only mineral intelligence layer: GSP-integrated satellite anomaly data, ranked drill targets and spectral signatures via the TechMining API.",
      },
      { property: "og:title", content: "Partners & API Access — TechMining" },
      {
        property: "og:description",
        content:
          "Data, channel and technology partnerships for Balochistan, KP and GB mineral intelligence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Partners,
});

const TIERS = [
  {
    icon: Database,
    name: "Data Partner",
    who: "Software companies, consultancies, research institutes",
    what: "Access mineral anomaly maps and drill-target rankings via REST API.",
    example: "Pull JSON anomaly data into your own GIS or dashboard",
    cta: "Apply for API Access",
    useCase: "GIS Platform",
  },
  {
    icon: Handshake,
    name: "Channel Partner",
    who: "Mining consultancies, geological firms, regional agents",
    what: "Resell TechMining exploration reports under your brand in your market. We provide the satellite analysis, you deliver to your clients.",
    example: "Exclusive Pakistan channel partner for TerraEye-class reports",
    cta: "Become a Channel Partner",
    useCase: "Consultancy",
  },
  {
    icon: Code2,
    name: "Technology Partner",
    who: "Global exploration tech companies entering Pakistan",
    what: "White-label our satellite AI engine + GSP data layer for your platform. We handle local licensing, GSP relationships and ground truth.",
    example: "Your platform, our Pakistan intelligence layer",
    cta: "Discuss Technology Partnership",
    useCase: "Exploration Software",
  },
] as const;

const API_FEATURES = [
  { icon: MapPinned, label: "Mineral anomaly coordinates (GeoJSON)" },
  { icon: Waves, label: "Spectral band ratios (Sentinel-2 SWIR B11/B12, ASTER TIR)" },
  { icon: ShieldCheck, label: "GSP ground-truth match score per anomaly" },
  { icon: Crosshair, label: "Drill-target ranking (High / Moderate / Low confidence)" },
  { icon: Layers, label: "Concession boundary overlay support" },
  { icon: Bell, label: "Webhook alerts for new satellite passes over your AOI" },
];

const PARTNER_NAMES = [
  { name: "TerraEye", note: null },
  { name: "GFZ Potsdam", note: "Germany" },
  { name: "GSP", note: "Data partner" },
  { name: "Your company here", note: null, placeholder: true },
];

const USE_CASES = ["GIS Platform", "Exploration Software", "Consultancy", "Research", "Other"];

const SAMPLE_JSON = `{
  "type": "Feature",
  "geometry": { "type": "Point", "coordinates": [64.421, 28.983] },
  "properties": {
    "target_id": "CHG-04",
    "swir_ratio_b11_b12": 1.37,
    "gsp_match_score": 0.86,
    "confidence": "High"
  }
}`;

function Partners() {
  const [useCase, setUseCase] = useState("");
  const [sent, setSent] = useState(false);

  function pickTier(value: string) {
    setUseCase(value);
    document.getElementById("request-access")?.scrollIntoView({ behavior: "smooth" });
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!useCase) {
      toast.error("Please choose your use case.");
      return;
    }
    setSent(true);
    toast.success("Request received. We'll be in touch with API documentation.");
  }

  return (
    <>
      <PageIntro
        label="Partners & API Access"
        title="Build on Pakistan's Only Mineral Intelligence Layer"
      >
        TechMining's API gives your platform access to GSP-integrated satellite anomaly data,
        ranked drill targets and spectral signatures — for Balochistan, KP and GB concessions.
      </PageIntro>

      {/* Tiers */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <article key={t.name} className="card-outlined flex flex-col p-6 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-[12px] bg-primary-container text-on-primary-container">
                  <t.icon className="size-6" />
                </span>
                <span className="font-mono text-[13px] text-muted-foreground">0{i + 1}</span>
              </div>
              <h2 className="mt-5 type-headline-sm">{t.name}</h2>
              <dl className="mt-4 flex-1 space-y-4">
                <div>
                  <dt className="type-label-sm uppercase text-muted-foreground">Who</dt>
                  <dd className="mt-1 type-body-md">{t.who}</dd>
                </div>
                <div>
                  <dt className="type-label-sm uppercase text-muted-foreground">What</dt>
                  <dd className="mt-1 type-body-md text-muted-foreground">{t.what}</dd>
                </div>
                <div className="rounded-[12px] bg-surface-low p-3">
                  <dt className="sr-only">Example</dt>
                  <dd className="type-body-md italic text-foreground">“{t.example}”</dd>
                </div>
              </dl>
              <Button className="mt-6 justify-between" variant="tonal" onClick={() => pickTier(t.useCase)}>
                {t.cta} <ArrowRight />
              </Button>
            </article>
          ))}
        </div>
      </section>

      {/* API features */}
      <section className="bg-surface-low py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <SectionLabel>API</SectionLabel>
            <h2 className="mt-3 type-headline-lg">What you get from the API</h2>
            <ul className="mt-8 grid gap-3">
              {API_FEATURES.map((f) => (
                <li key={f.label} className="flex items-start gap-3 rounded-[12px] bg-surface-lowest p-4">
                  <f.icon className="mt-0.5 size-5 shrink-0 text-primary" />
                  <span className="type-body-md">{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 overflow-hidden rounded-[16px] border border-outline-variant bg-inverse-surface">
            <div className="flex items-center justify-between border-b border-inverse-on-surface/15 px-4 py-2.5">
              <span className="truncate font-mono text-[12px] text-inverse-on-surface/80">
                GET /v1/anomalies?aoi=chagai
              </span>
              <span className="font-mono text-[11px] text-inverse-on-surface/60">sample</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-inverse-on-surface">
              {SAMPLE_JSON}
            </pre>
          </div>
        </div>
      </section>

      {/* Partners placeholder */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20">
        <SectionLabel>Network</SectionLabel>
        <h2 className="mt-3 type-headline-lg">Built with and for industry leaders</h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {PARTNER_NAMES.map((p) => (
            <li
              key={p.name}
              className={
                p.placeholder
                  ? "grid min-h-24 place-items-center rounded-[16px] border border-dashed border-outline p-4 text-center"
                  : "grid min-h-24 place-items-center rounded-[16px] border border-outline-variant bg-surface-lowest p-4 text-center"
              }
            >
              <div>
                <p className={p.placeholder ? "type-title-md text-muted-foreground" : "type-title-lg"}>
                  {p.name}
                </p>
                {p.note && <p className="mt-0.5 type-label-sm text-muted-foreground">{p.note}</p>}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 type-body-md text-muted-foreground">Partner network launching Q1 2027</p>
      </section>

      {/* Request form */}
      <section id="request-access" className="scroll-mt-20 bg-surface-low py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Get started</SectionLabel>
            <h2 className="mt-3 type-headline-lg">Ready to integrate?</h2>
            <p className="mt-3 type-body-lg text-muted-foreground">
              Tell us your use case and we'll send you API documentation and a sandbox key within
              48 hours.
            </p>
            <p className="mt-6 type-body-md text-muted-foreground">
              Looking for pricing?{" "}
              <Link to="/pricing" className="text-primary hover:underline">
                See the Partner API plan →
              </Link>
            </p>
          </div>

          <div className="rounded-[28px] border border-outline-variant bg-surface-lowest p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-start gap-4 py-8">
                <span className="grid size-14 place-items-center rounded-full bg-success-container text-on-success-container">
                  <CheckCircle2 className="size-7" />
                </span>
                <h3 className="type-headline-sm">Request received.</h3>
                <p className="max-w-md type-body-lg text-muted-foreground">
                  We'll email your API documentation and sandbox key within 48 hours.
                </p>
                <Button variant="tonal" onClick={() => setSent(false)}>
                  Send another request
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="p-name">Name</Label>
                  <Input id="p-name" name="name" required autoComplete="name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p-company">Company</Label>
                  <Input id="p-company" name="company" required autoComplete="organization" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p-usecase">Use case</Label>
                  <Select value={useCase} onValueChange={setUseCase}>
                    <SelectTrigger id="p-usecase">
                      <SelectValue placeholder="Select use case" />
                    </SelectTrigger>
                    <SelectContent>
                      {USE_CASES.map((u) => (
                        <SelectItem key={u} value={u}>
                          {u}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="p-email">Email</Label>
                  <Input id="p-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="pt-2 sm:col-span-2">
                  <Button type="submit" size="lg">
                    Request API Access
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
