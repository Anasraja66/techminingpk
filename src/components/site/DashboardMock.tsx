import { useState } from "react";
import { BadgeCheck, Crosshair, Layers, ListOrdered, Navigation, Radar, Satellite, Waves } from "lucide-react";

import { cn } from "@/lib/utils";
import { MAP_H, MAP_W, PROVINCES, project } from "@/components/site/pakistanMap";

/** Sample anomaly targets at real deposit locations (illustrative scores). */
const TARGETS = [
  { id: "T-01", name: "Reko Diq NW", lon: 62.1, lat: 29.13, mineral: "Cu-Au porphyry", alteration: "Phyllic", score: 0.92, gsp: true, feature: 2.2, depth: 0.34 },
  { id: "T-02", name: "Saindak East", lon: 61.62, lat: 29.27, mineral: "Cu-Au", alteration: "Argillic", score: 0.86, gsp: true, feature: 2.17, depth: 0.29 },
  { id: "T-03", name: "Muslim Bagh", lon: 67.73, lat: 30.83, mineral: "Chromite", alteration: "Serpentinite", score: 0.81, gsp: true, feature: 2.32, depth: 0.27 },
  { id: "T-04", name: "Chagai Hills", lon: 64.3, lat: 29.0, mineral: "Cu-Mo", alteration: "Propylitic", score: 0.74, gsp: false, feature: 2.33, depth: 0.2 },
  { id: "T-05", name: "Gunga, Khuzdar", lon: 66.65, lat: 27.95, mineral: "Barite-Zn", alteration: "Gossan / Fe-oxide", score: 0.69, gsp: true, feature: 0.9, depth: 0.22 },
] as const;

/** Lower-priority occurrences shown as small dots. */
const OCCURRENCES = [
  { name: "Bela ophiolite", lon: 66.35, lat: 26.2 },
  { name: "Boya, N. Waziristan", lon: 70.05, lat: 32.95 },
  { name: "Swat emerald belt", lon: 72.36, lat: 34.78 },
  { name: "Chitral antimony", lon: 71.78, lat: 35.85 },
  { name: "Hunza gem belt", lon: 74.65, lat: 36.32 },
  { name: "Zhob ophiolite", lon: 69.3, lat: 31.35 },
  { name: "Nokkundi iron", lon: 62.75, lat: 28.82 },
  { name: "Dasht-e-Kain", lon: 63.4, lat: 29.35 },
];

const PROVINCE_LABELS = [
  { name: "BALOCHISTAN", lon: 65.2, lat: 27.4 },
  { name: "SINDH", lon: 68.6, lat: 25.9 },
  { name: "PUNJAB", lon: 72.3, lat: 30.6 },
  { name: "KP", lon: 71.2, lat: 33.9 },
  { name: "GILGIT-BALTISTAN", lon: 74.6, lat: 35.6 },
];

const LAYERS = ["Sentinel-2 SWIR", "ASTER TIR", "GSP occurrences"];

const KPIS = [
  { label: "Scenes processed", value: "1,284" },
  { label: "Anomalies flagged", value: "37" },
  { label: "GSP-confirmed", value: "21" },
  { label: "Area screened", value: "12,460 km²" },
];

function pct(lon: number, lat: number) {
  const [x, y] = project(lon, lat);
  return { left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` };
}

/** Deterministic SWIR-style reflectance curve with one diagnostic absorption. */
function spectrum(feature: number, depth: number, w = 300, h = 120) {
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const wl = 0.4 + (i / 60) * 2.1;
    const continuum = 0.18 + 0.32 * (1 - Math.exp(-(wl - 0.35) * 1.6));
    const absorb = depth * Math.exp(-((wl - feature) ** 2) / (2 * 0.035 ** 2));
    const water = 0.08 * Math.exp(-((wl - 1.92) ** 2) / (2 * 0.05 ** 2));
    const r = continuum * (1 - absorb) - water;
    pts.push(`${((i / 60) * w).toFixed(1)},${(h - r * h * 1.6).toFixed(1)}`);
  }
  return pts.join(" ");
}

function Panel({
  icon: Icon,
  title,
  meta,
  className,
  children,
}: {
  icon: typeof Radar;
  title: string;
  meta?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col rounded-[16px] bg-surface-lowest p-4", className)}>
      <div className="mb-3 flex items-center gap-2">
        <Icon className="size-4 shrink-0 text-primary" />
        <p className="type-title-md text-[14px]">{title}</p>
        {meta && <span className="ml-auto hidden truncate type-label-sm text-muted-foreground sm:inline">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

export function DashboardMock() {
  const [activeId, setActiveId] = useState<string>(TARGETS[0].id);
  const active = TARGETS.find((t) => t.id === activeId) ?? TARGETS[0];

  return (
    <div className="rounded-[28px] border border-outline-variant bg-surface p-3 shadow-elev-3 sm:p-4">
      {/* window bar */}
      <div className="mb-3 flex items-center gap-3 px-2">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-outline-variant" />
          <span className="size-2.5 rounded-full bg-outline-variant" />
          <span className="size-2.5 rounded-full bg-outline-variant" />
        </div>
        <p className="min-w-0 truncate font-mono text-[12px] text-muted-foreground">
          techmining.pk / exploration / pakistan
        </p>
        <span className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-success-container px-2.5 py-0.5 type-label-sm text-on-success-container">
          <span className="size-1.5 rounded-full bg-success" /> Live
        </span>
      </div>

      {/* KPI strip */}
      <dl className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-[16px] bg-surface-lowest px-4 py-3">
            <dt className="type-label-sm uppercase text-muted-foreground">{k.label}</dt>
            <dd className="mt-1 font-mono text-[20px] font-medium text-foreground">{k.value}</dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-3 lg:grid-cols-12">
        {/* Map */}
        <Panel icon={Satellite} title="Mineral anomaly map" meta="Sentinel-2 · ASTER · GSP" className="lg:col-span-7">
          <div className="mb-3 flex flex-wrap gap-2">
            {LAYERS.map((l) => (
              <span
                key={l}
                className="inline-flex items-center gap-1.5 rounded-sm border border-outline-variant bg-secondary px-2.5 py-1 type-label-sm text-secondary-foreground"
              >
                <Layers className="size-3" /> {l}
              </span>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[12px] border border-outline-variant bg-surface-low">
            <div className="relative aspect-[1000/916] w-full">
              <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 size-full" aria-hidden="true">
                {/* graticule */}
                {[62, 64, 66, 68, 70, 72, 74, 76].map((lon) => {
                  const [x] = project(lon, 30);
                  return <line key={`lon${lon}`} x1={x} x2={x} y1={0} y2={MAP_H} className="stroke-outline-variant" strokeWidth={1} strokeDasharray="4 6" />;
                })}
                {[24, 26, 28, 30, 32, 34, 36].map((lat) => {
                  const [, y] = project(65, lat);
                  return <line key={`lat${lat}`} x1={0} x2={MAP_W} y1={y} y2={y} className="stroke-outline-variant" strokeWidth={1} strokeDasharray="4 6" />;
                })}
                {PROVINCES.map((p) => (
                  <path
                    key={p.name}
                    d={p.d}
                    className={cn(
                      "stroke-primary/50",
                      p.name === "Balochistan" ? "fill-primary-container" : "fill-surface-lowest",
                    )}
                    strokeWidth={1.6}
                    strokeLinejoin="round"
                  />
                ))}
                {/* survey footprint around active target */}
                {(() => {
                  const [x, y] = project(active.lon, active.lat);
                  return (
                    <g>
                      <circle cx={x} cy={y} r={70} className="fill-anomaly/10 stroke-anomaly/60" strokeWidth={1.5} strokeDasharray="6 5" />
                      <line x1={x - 90} x2={x + 90} y1={y} y2={y} className="stroke-anomaly/40" strokeWidth={1} />
                      <line x1={x} x2={x} y1={y - 90} y2={y + 90} className="stroke-anomaly/40" strokeWidth={1} />
                    </g>
                  );
                })()}
                {PROVINCE_LABELS.map((l) => {
                  const [x, y] = project(l.lon, l.lat);
                  return (
                    <text
                      key={l.name}
                      x={x}
                      y={y}
                      textAnchor="middle"
                      className="hidden fill-muted-foreground font-mono sm:block"
                      style={{ fontSize: 19, letterSpacing: 3 }}
                    >
                      {l.name}
                    </text>
                  );
                })}
                {/* scale bar: ~200 km */}
                {(() => {
                  const [x0] = project(72.6, 24);
                  const [x1] = project(72.6 + 200 / (111 * Math.cos((30 * Math.PI) / 180)), 24);
                  const y = MAP_H - 40;
                  return (
                    <g className="hidden sm:block">
                      <line x1={x0} x2={x1} y1={y} y2={y} className="stroke-foreground" strokeWidth={3} />
                      <line x1={x0} x2={x0} y1={y - 8} y2={y + 2} className="stroke-foreground" strokeWidth={3} />
                      <line x1={x1} x2={x1} y1={y - 8} y2={y + 2} className="stroke-foreground" strokeWidth={3} />
                      <text x={(x0 + x1) / 2} y={y - 14} textAnchor="middle" className="fill-foreground font-mono" style={{ fontSize: 18 }}>
                        200 km
                      </text>
                    </g>
                  );
                })()}
              </svg>

              {OCCURRENCES.map((o) => (
                <span
                  key={o.name}
                  title={o.name}
                  className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-surface-lowest bg-warning"
                  style={pct(o.lon, o.lat)}
                />
              ))}

              {TARGETS.map((t) => {
                const isActive = t.id === active.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveId(t.id)}
                    aria-label={`${t.id} ${t.name}, score ${t.score}`}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 p-1.5"
                    style={pct(t.lon, t.lat)}
                  >
                    {isActive && <span className="absolute inset-1.5 rounded-full bg-anomaly animate-ping-soft" />}
                    <span
                      className={cn(
                        "relative block rounded-full border-2 border-surface-lowest shadow-elev-1 transition-transform group-hover:scale-125",
                        isActive ? "size-3.5 bg-anomaly" : "size-3 bg-anomaly/80",
                      )}
                    />
                    <span
                      className={cn(
                        "pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm px-1.5 py-0.5 font-mono text-[10px]",
                        isActive ? "bg-inverse-surface text-inverse-on-surface" : "hidden bg-surface-lowest text-foreground shadow-elev-1 group-hover:block",
                      )}
                    >
                      {t.id}
                    </span>
                  </button>
                );
              })}

              {/* active target callout (top-left = Afghanistan side, empty) */}
              <div className="absolute left-2 top-2 max-w-[60%] rounded-[12px] bg-surface-lowest/95 p-2.5 shadow-elev-2 sm:left-3 sm:top-3 sm:p-3">
                <p className="flex items-center gap-1.5 type-label-sm uppercase text-muted-foreground">
                  <Crosshair className="size-3 text-anomaly" /> {active.id} · Selected
                </p>
                <p className="mt-0.5 truncate type-title-md text-[14px]">{active.name}</p>
                <p className="hidden font-mono text-[11px] text-muted-foreground sm:block">
                  {active.lat.toFixed(2)}°N {active.lon.toFixed(2)}°E
                </p>
                <p className="mt-1 type-body-md text-[12px] text-foreground">
                  {active.mineral} · {active.alteration}
                </p>
              </div>

              {/* legend + north arrow (bottom-right = empty corner) */}
              <div className="absolute right-2 bottom-2 hidden flex-col gap-1 rounded-sm bg-surface-lowest/95 px-2.5 py-2 type-label-sm text-muted-foreground shadow-elev-1 sm:flex">
                <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-anomaly" /> Ranked target</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-warning" /> Known occurrence</span>
                <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-[3px] bg-primary-container ring-1 ring-primary/50" /> Focus province</span>
              </div>
              <div className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-surface-lowest/95 text-foreground shadow-elev-1">
                <Navigation className="size-4 -rotate-45 fill-current" />
              </div>
            </div>
          </div>
          <p className="mt-2 type-label-sm text-muted-foreground">Boundaries: geoBoundaries (CC BY 4.0). Scores shown are sample values.</p>
        </Panel>

        <div className="flex min-w-0 flex-col gap-3 lg:col-span-5">
          {/* Ranked targets */}
          <Panel icon={ListOrdered} title="Ranked drill targets" meta="Tap to view on map">
            <ul className="-mx-1 flex flex-col">
              {TARGETS.map((t, i) => {
                const isActive = t.id === active.id;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(t.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "state-layer flex w-full items-center gap-3 rounded-[12px] px-2 py-2 text-left",
                        isActive && "bg-primary-container text-on-primary-container",
                      )}
                    >
                      <span className="w-4 font-mono text-[12px] text-muted-foreground">{i + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5">
                          <span className="truncate type-title-md text-[13.5px]">{t.name}</span>
                          {t.gsp && <BadgeCheck className="size-3.5 shrink-0 text-success" aria-label="GSP match" />}
                        </span>
                        <span className="block truncate type-label-sm text-muted-foreground">{t.mineral}</span>
                      </span>
                      <span className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-surface-high sm:block">
                        <span className="block h-full rounded-full bg-primary" style={{ width: `${t.score * 100}%` }} />
                      </span>
                      <span className="w-9 text-right font-mono text-[13px] font-medium">{t.score.toFixed(2)}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Panel>

          {/* Spectral signature */}
          <Panel icon={Waves} title="Spectral signature" meta={`${active.id} · reflectance`} className="flex-1">
            <div className="relative">
              <svg viewBox="0 0 300 130" className="h-auto w-full" aria-hidden="true">
                {[0, 1, 2, 3].map((i) => (
                  <line key={i} x1={0} x2={300} y1={10 + i * 36} y2={10 + i * 36} className="stroke-outline-variant" strokeWidth={0.6} strokeDasharray="3 4" />
                ))}
                {(() => {
                  const x = ((active.feature - 0.4) / 2.1) * 300;
                  return (
                    <g>
                      <rect x={x - 8} y={0} width={16} height={120} className="fill-anomaly/10" />
                      <text x={x} y={128} textAnchor="middle" className="fill-anomaly font-mono" style={{ fontSize: 8 }}>
                        {active.feature.toFixed(2)} µm
                      </text>
                    </g>
                  );
                })()}
                <polyline points={spectrum(active.feature, active.depth * 0.45)} fill="none" className="stroke-outline" strokeWidth={1.2} strokeDasharray="4 3" />
                <polyline points={spectrum(active.feature, active.depth)} fill="none" className="stroke-primary" strokeWidth={2} strokeLinejoin="round" />
              </svg>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 type-label-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-primary" /> Target pixel</span>
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 border-t border-dashed border-outline" /> Background</span>
              <span className="ml-auto font-mono">0.4 – 2.5 µm</span>
            </div>
            <div className="mt-3 flex items-start gap-2 rounded-[12px] bg-secondary p-2.5 text-secondary-foreground">
              <Radar className="mt-0.5 size-4 shrink-0 text-primary" />
              <p className="type-body-md text-[12.5px] leading-snug">
                {active.alteration} absorption at {active.feature.toFixed(2)} µm
                {active.gsp ? " matches a GSP-recorded occurrence." : " — no GSP record yet, field check advised."}
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
