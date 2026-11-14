import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Check, CircleAlert, Loader2, RotateCcw, Sparkles } from "lucide-react";

import satelliteImg from "@/assets/card-satellite.jpg";
import weighbridgeImg from "@/assets/card-weighbridge.jpg";
import fleetImg from "@/assets/card-fleet.jpg";
import oreGradeImg from "@/assets/card-ore-grade.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionLabel } from "@/components/site/PageIntro";
import { CHALLENGES, LIMITS, STAGES, type Advice, type ServiceId } from "@/lib/advisor";
import { getSiteAdvice } from "@/lib/advisor.functions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/advisor")({
  head: () => ({
    meta: [
      { title: "AI Site Advisor — Which TechMining Service Fits Your Mine?" },
      {
        name: "description",
        content:
          "Describe your mine, its problems and your goals. TechMining's AI advisor recommends the right services and clear next steps in under a minute.",
      },
      { property: "og:title", content: "AI Site Advisor — TechMining.pk" },
      {
        property: "og:description",
        content: "Tell us about your site and get service recommendations and next steps for your mine.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdvisorPage,
});

const SERVICE_IMAGES: Record<ServiceId, string> = {
  exploration: satelliteImg,
  weighbridge: weighbridgeImg,
  fleet: fleetImg,
  grade: oreGradeImg,
};

const EXAMPLE = {
  mineral: "Chromite",
  location: "Muslim Bagh, Balochistan",
  stage: "Active production",
  description:
    "Open-pit chromite lease with 3 excavators and 12 dumpers. We dispatch about 40 trucks a day through our own weighbridge, but weights are written by hand and we suspect drivers and the operator adjust them. Diesel bills keep rising.",
  challenges: ["Weight / scale fraud", "Diesel theft", "Shipments rejected by buyers"],
  goals: "Stop losses at the gate and in fuel, and reliably ship 40%+ Cr2O3 to buyers in China.",
};

const EMPTY = { mineral: "", location: "", stage: "", description: "", challenges: [] as string[], goals: "" };

function AdvisorPage() {
  const ask = useServerFn(getSiteAdvice);
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [advice, setAdvice] = useState<Advice | null>(null);

  const set = <K extends keyof typeof EMPTY>(k: K, v: (typeof EMPTY)[K]) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (c: string) =>
    set("challenges", form.challenges.includes(c) ? form.challenges.filter((x) => x !== c) : [...form.challenges, c]);

  const tooShort = form.description.trim().length < LIMITS.description.min;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (tooShort || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await ask({ data: form });
      if (res.ok) {
        setAdvice(res.advice);
        requestAnimationFrame(() =>
          document.getElementById("advice")?.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
      } else setError(res.error);
    } catch {
      setError("We couldn't reach the advisor. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6 md:pt-16">
        <span className="inline-flex items-center gap-2 rounded-sm bg-primary-container px-2.5 py-1 type-label-lg text-on-primary-container">
          <Sparkles className="size-4" /> AI Site Advisor
        </span>
        <h1 className="mt-4 max-w-3xl type-display-md text-foreground">
          Tell us about your mine. We'll tell you where to start.
        </h1>
        <p className="mt-4 max-w-2xl type-body-lg text-muted-foreground">
          Describe your site, what's going wrong and what you want to achieve. Our AI advisor picks the
          TechMining services that fit and gives you clear next steps — in under a minute.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* Form */}
        <form onSubmit={submit} className="card-outlined p-5 sm:p-7 lg:sticky lg:top-24">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="type-title-lg">Your site</h2>
            <button
              type="button"
              onClick={() => setForm(EXAMPLE)}
              className="state-layer ml-auto rounded-full px-3 py-1.5 type-label-lg text-primary"
            >
              Fill an example
            </button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Main mineral">
              <Input value={form.mineral} onChange={(e) => set("mineral", e.target.value)} placeholder="e.g. Chromite, copper, marble" maxLength={LIMITS.short} />
            </Field>
            <Field label="Location">
              <Input value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="e.g. Chagai, Balochistan" maxLength={LIMITS.short} />
            </Field>
          </div>

          <fieldset className="mt-5">
            <legend className="type-label-lg text-foreground">Stage of your mine</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {STAGES.map((s) => (
                <Chip key={s} selected={form.stage === s} onClick={() => set("stage", form.stage === s ? "" : s)}>
                  {s}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="type-label-lg text-foreground">Biggest challenges</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {CHALLENGES.map((c) => (
                <Chip key={c} selected={form.challenges.includes(c)} onClick={() => toggle(c)}>
                  {c}
                </Chip>
              ))}
            </div>
          </fieldset>

          <Field label="Describe your site" className="mt-5" hint={`${form.description.trim().length}/${LIMITS.description.max} · at least ${LIMITS.description.min}`}>
            <Textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              maxLength={LIMITS.description.max}
              rows={5}
              required
              placeholder="Size of the lease, number of machines and trucks, how you weigh and dispatch, where you think money is lost…"
              className="rounded-sm px-4 py-3 text-base"
            />
          </Field>

          <Field label="Your goals" className="mt-5">
            <Textarea
              value={form.goals}
              onChange={(e) => set("goals", e.target.value)}
              maxLength={LIMITS.goals.max}
              rows={2}
              placeholder="e.g. Cut diesel cost, pass provincial audits, start exporting"
              className="rounded-sm px-4 py-3 text-base"
            />
          </Field>

          {error && (
            <p role="alert" className="mt-5 flex items-start gap-2 rounded-sm bg-destructive/10 px-3 py-2.5 type-body-md text-destructive">
              <CircleAlert className="mt-0.5 size-4 shrink-0" /> {error}
            </p>
          )}

          <Button type="submit" size="lg" className="mt-6 w-full" disabled={tooShort || loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Analysing your site…
              </>
            ) : (
              <>
                <Sparkles /> Get my recommendations
              </>
            )}
          </Button>
          <p className="mt-3 text-center type-body-md text-muted-foreground">
            AI suggestions are a starting point — our team confirms them during a site audit.
          </p>
        </form>

        {/* Results */}
        <div id="advice" className="scroll-mt-24">
          {loading ? (
            <ResultSkeleton />
          ) : advice ? (
            <AdviceView advice={advice} onReset={() => { setAdvice(null); setForm(EMPTY); }} />
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </>
  );
}

function Field({ label, hint, className, children }: { label: string; hint?: string; className?: string; children: React.ReactNode }) {
  return (
    <label className={cn("block", className)}>
      <span className="flex items-baseline gap-2 type-label-lg text-foreground">
        {label}
        {hint && <span className="ml-auto type-label-sm text-muted-foreground">{hint}</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "state-layer inline-flex h-9 items-center gap-1.5 rounded-sm border px-3 type-label-lg",
        selected
          ? "border-transparent bg-primary-container text-on-primary-container"
          : "border-outline-variant text-muted-foreground",
      )}
    >
      {selected && <Check className="size-4" />}
      {children}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="card-filled flex flex-col items-start p-6 sm:p-8">
      <SectionLabel>What you'll get</SectionLabel>
      <h2 className="mt-3 type-headline-sm">A short, practical plan for your site</h2>
      <ul className="mt-5 space-y-3">
        {[
          "Which of our 4 services fit your mine — ranked by match",
          "Why each one fits, in plain words",
          "First steps for each service at your site",
          "Overall next steps, ending with a site audit",
        ].map((t) => (
          <li key={t} className="flex items-start gap-3 type-body-md text-foreground">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-surface-lowest text-primary">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            {t}
          </li>
        ))}
      </ul>
      <div className="mt-6 grid w-full grid-cols-4 gap-2">
        {Object.values(SERVICE_IMAGES).map((src) => (
          <img key={src} src={src} alt="" width={1024} height={768} loading="lazy" className="aspect-square w-full rounded-[12px] object-cover" />
        ))}
      </div>
    </div>
  );
}

function ResultSkeleton() {
  return (
    <div className="space-y-4" aria-live="polite" aria-busy="true">
      <p className="sr-only">Analysing your site</p>
      <div className="card-filled h-28 animate-pulse" />
      {[0, 1].map((i) => (
        <div key={i} className="card-outlined flex animate-pulse gap-4 p-4">
          <div className="size-24 shrink-0 rounded-[12px] bg-surface-high" />
          <div className="flex-1 space-y-3 py-1">
            <div className="h-4 w-1/2 rounded-full bg-surface-high" />
            <div className="h-3 w-full rounded-full bg-surface-high" />
            <div className="h-3 w-4/5 rounded-full bg-surface-high" />
          </div>
        </div>
      ))}
    </div>
  );
}

function AdviceView({ advice, onReset }: { advice: Advice; onReset: () => void }) {
  return (
    <div className="space-y-4" aria-live="polite">
      <div className="rounded-[16px] bg-primary-container p-5 text-on-primary-container sm:p-6">
        <p className="type-label-sm uppercase tracking-[0.12em]">Your site at a glance</p>
        <p className="mt-2 type-body-lg">{advice.summary}</p>
      </div>

      <ol className="space-y-4">
        {advice.recommendations.map((r, i) => (
          <li key={r.serviceId} className="card-outlined overflow-hidden">
            <div className="flex flex-col sm:flex-row">
              <div className="relative sm:w-44 sm:shrink-0">
                <img
                  src={SERVICE_IMAGES[r.serviceId]}
                  alt=""
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="aspect-[16/9] size-full object-cover sm:aspect-auto"
                />
                <span className="absolute top-3 left-3 rounded-sm bg-surface-lowest px-2 py-0.5 type-label-sm text-primary shadow-elev-1">
                  #{i + 1}
                </span>
              </div>
              <div className="flex-1 p-5">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <h3 className="type-title-lg">{r.name}</h3>
                  <span className="rounded-sm bg-secondary px-2 py-0.5 type-label-lg text-secondary-foreground sm:ml-auto">
                    {r.match}% match
                  </span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-high" aria-hidden>
                  <div className="h-full rounded-full bg-primary" style={{ width: `${r.match}%` }} />
                </div>
                <p className="mt-3 type-body-md text-muted-foreground">{r.why}</p>
                {r.firstSteps.length > 0 && (
                  <ul className="mt-3 space-y-1.5">
                    {r.firstSteps.map((s) => (
                      <li key={s} className="flex items-start gap-2 type-body-md text-foreground">
                        <ArrowRight className="mt-1 size-3.5 shrink-0 text-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ol>

      {advice.nextSteps.length > 0 && (
        <div className="card-filled p-5 sm:p-6">
          <h3 className="type-title-lg">Your next steps</h3>
          <ol className="mt-4 space-y-3">
            {advice.nextSteps.map((s, i) => (
              <li key={s} className="flex items-start gap-3 type-body-md">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary type-label-lg text-primary-foreground">
                  {i + 1}
                </span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button size="lg" className="sm:flex-1" asChild>
          <Link to="/contact">
            Book a site audit <ArrowRight />
          </Link>
        </Button>
        <Button size="lg" variant="outline" onClick={onReset}>
          <RotateCcw /> Start again
        </Button>
      </div>
    </div>
  );
}
