import { useState } from "react";
import { BadgeCheck, Crosshair, Database, ExternalLink, ListOrdered, Navigation, Satellite, Waves } from "lucide-react";

import satelliteImage from "@/assets/pakistan-sentinel2.jpg.asset.json";
import { cn } from "@/lib/utils";
import { MAP_H, MAP_W, PROVINCES, project } from "@/components/site/pakistanMap";
import {
  MAJOR_DEPOSITS,
  MRDS_SITES,
  MRDS_SOURCE_URL,
  isProducing,
} from "@/components/site/pakistanDeposits";

const PROVINCE_LABELS = [
  { name: "BALOCHISTAN", lon: 65.4, lat: 27.3 },
  { name: "SINDH", lon: 68.6, lat: 25.9 },
  { name: "PUNJAB", lon: 72.3, lat: 30.6 },
  { name: "KP", lon: 71.2, lat: 33.9 },
  { name: "GILGIT-BALTISTAN", lon: 74.6, lat: 35.6 },
];

const LAYERS = ["Sentinel-2 true colour", "USGS MRDS sites", "Published deposits"];

const PRODUCING = MRDS_SITES.filter(isProducing).length;

const KPIS = [
  { label: "Mineral sites on record", value: String(MRDS_SITES.length), source: "USGS MRDS" },
  { label: "Producing sites", value: String(PRODUCING), source: "USGS MRDS" },
  { label: "Reko Diq reserve", value: "3.0 Bt", source: "Barrick 2024" },
  { label: "Sentinel-2 revisit", value: "5 days", source: "ESA" },
];

/** Labels drawn on satellite imagery need a dark halo to stay readable. */
const HALO = { paintOrder: "stroke", strokeLinejoin: "round" } as const;

function pct(lon: number, lat: number) {
  const [x, y] = project(lon, lat);
  return { left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` };
}

/** Schematic SWIR reflectance curve with one diagnostic absorption feature. */
function spectrum(feature: number, depth: number, w = 300, h = 120) {
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const wl = 0.4 + (i / 60) * 2.1;
    const continuum = 0.18 + 0.32 * (1 - Math.exp(-(wl - 0.35) * 1.6));
    const width = feature < 1.2 ? 0.12 : 0.035;
    const absorb = depth * 1.5 * Math.exp(-((wl - feature) ** 2) / (2 * width ** 2));
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
  icon: typeof Satellite;
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
  const [activeId, setActiveId] = useState<string>(MAJOR_DEPOSITS[0]!.id);
  const active = MAJOR_DEPOSITS.find((d) => d.id === activeId) ?? MAJOR_DEPOSITS[0]!;

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
          <Database className="size-3" /> Public data
        </span>
      </div>

      {/* KPI strip */}
      <dl className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-[16px] bg-surface-lowest px-4 py-3">
            <dt className="type-label-sm uppercase text-muted-foreground">{k.label}</dt>
            <dd className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <span className="whitespace-nowrap font-mono text-[20px] font-medium text-foreground">{k.value}</span>
              <span className="truncate type-label-sm text-muted-foreground">{k.source}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="grid gap-3 lg:grid-cols-12">
        {/* Map */}
        <Panel icon={Satellite} title="Pakistan mineral map" meta="Sentinel-2 · USGS MRDS" className="lg:col-span-7">
          <div className="mb-3 flex flex-wrap gap-2">
            {LAYERS.map((l) => (
              <span
                key={l}
                className="inline-flex items-center gap-1.5 rounded-sm border border-outline-variant bg-secondary px-2.5 py-1 type-label-sm text-secondary-foreground"
              >
                {l}
              </span>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-[12px] border border-outline-variant bg-surface-high">
            <div className="relative aspect-[1000/916] w-full">
              <img
                src={satelliteImage.url}
                alt="Sentinel-2 satellite image of Pakistan with province boundaries"
                width={1600}
                height={1466}
                loading="lazy"
                className="absolute inset-0 size-full object-cover"
              />
              <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 size-full" aria-hidden="true">
                <defs>
                  <mask id="tm-outside-pakistan">
                    <rect width={MAP_W} height={MAP_H} fill="white" />
                    {PROVINCES.map((p) => (
                      <path key={p.name} d={p.d} fill="black" />
                    ))}
                  </mask>
                </defs>
                {/* fade neighbouring countries so Pakistan stands out */}
                <rect width={MAP_W} height={MAP_H} className="fill-surface-lowest" opacity={0.55} mask="url(#tm-outside-pakistan)" />
                {PROVINCES.map((p) => (
                  <path
                    key={p.name}
                    d={p.d}
                    fill="none"
                    className="stroke-surface-lowest"
                    strokeOpacity={0.9}
                    strokeWidth={p.name === "Balochistan" ? 2.4 : 1.4}
                    strokeLinejoin="round"
                  />
                ))}
                {/* survey footprint around the selected deposit */}
                {(() => {
                  const [x, y] = project(active.lon, active.lat);
                  return (
                    <g>
                      <circle cx={x} cy={y} r={60} className="fill-anomaly/15 stroke-surface-lowest" strokeWidth={1.5} strokeDasharray="6 5" />
                      <line x1={x - 80} x2={x + 80} y1={y} y2={y} className="stroke-surface-lowest/70" strokeWidth={1} />
                      <line x1={x} x2={x} y1={y - 80} y2={y + 80} className="stroke-surface-lowest/70" strokeWidth={1} />
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
                      className="hidden fill-surface-lowest stroke-foreground/45 font-mono sm:block"
                      strokeWidth={4}
                      style={{ ...HALO, fontSize: 19, letterSpacing: 3 }}
                    >
                      {l.name}
                    </text>
                  );
                })}
                {/* scale bar: 200 km */}
                {(() => {
                  const [x0] = project(61, 24);
                  const [x1] = project(61 + 200 / (111 * Math.cos((30 * Math.PI) / 180)), 24);
                  const y = MAP_H - 40;
                  return (
                    <g className="hidden sm:block">
                      <line x1={x0} x2={x1} y1={y} y2={y} className="stroke-surface-lowest" strokeWidth={3} />
                      <line x1={x0} x2={x0} y1={y - 8} y2={y + 2} className="stroke-surface-lowest" strokeWidth={3} />
                      <line x1={x1} x2={x1} y1={y - 8} y2={y + 2} className="stroke-surface-lowest" strokeWidth={3} />
                      <text
                        x={(x0 + x1) / 2}
                        y={y - 14}
                        textAnchor="middle"
                        className="fill-surface-lowest stroke-foreground/50 font-mono"
                        strokeWidth={4}
                        style={{ ...HALO, fontSize: 18 }}
                      >
                        200 km
                      </text>
                    </g>
                  );
                })()}
              </svg>

              {MRDS_SITES.map((s) => (
                <span
                  key={s.id}
                  title={`${s.name} — ${s.commodities.join(", ")} (${s.status}, USGS MRDS)`}
                  className={cn(
                    "absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-surface-lowest",
                    isProducing(s) ? "bg-success" : "bg-warning",
                  )}
                  style={pct(s.lon, s.lat)}
                />
              ))}

              {MAJOR_DEPOSITS.map((d) => {
                const isActive = d.id === active.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setActiveId(d.id)}
                    aria-label={`${d.name}: ${d.figure}`}
                    className="group absolute -translate-x-1/2 -translate-y-1/2 p-1.5"
                    style={pct(d.lon, d.lat)}
                  >
                    {isActive && <span className="absolute inset-1.5 rounded-full bg-anomaly animate-ping-soft" />}
                    <span
                      className={cn(
                        "relative block rounded-full border-2 border-surface-lowest shadow-elev-1 transition-transform group-hover:scale-125",
                        isActive ? "size-3.5 bg-anomaly" : "size-3 bg-anomaly/85",
                      )}
                    />
                    <span
                      className={cn(
                        "pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm px-1.5 py-0.5 font-mono text-[10px]",
                        isActive ? "bg-inverse-surface text-inverse-on-surface" : "hidden bg-surface-lowest text-foreground shadow-elev-1 group-hover:block",
                      )}
                    >
                      {d.name}
                    </span>
                  </button>
                );
              })}

              {/* selected deposit callout (top-left = neighbouring countries) */}
              <div className="absolute left-2 top-2 max-w-[62%] rounded-[12px] bg-surface-lowest/95 p-2.5 shadow-elev-2 sm:left-3 sm:top-3 sm:p-3">
                <p className="flex items-center gap-1.5 type-label-sm uppercase text-muted-foreground">
                  <Crosshair className="size-3 text-anomaly" /> {active.district} · Selected
                </p>
                <p className="mt-0.5 truncate type-title-md text-[14px]">{active.name}</p>
                <p className="hidden font-mono text-[11px] text-muted-foreground sm:block">
                  {active.lat.toFixed(2)}°N {active.lon.toFixed(2)}°E
                </p>
                <p className="mt-1 hidden type-body-md text-[12px] text-foreground sm:block">{active.figure}</p>
                <p className="font-mono text-[11px] text-foreground sm:hidden">{active.headline}</p>
              </div>

              {/* legend + north arrow */}
              <div className="absolute right-2 bottom-2 hidden flex-col gap-1 rounded-sm bg-surface-lowest/95 px-2.5 py-2 type-label-sm text-muted-foreground shadow-elev-1 sm:flex">
                <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-anomaly" /> Major deposit</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-success" /> USGS: producing</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-warning" /> USGS: occurrence / prospect</span>
              </div>
              <div className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-surface-lowest/95 text-foreground shadow-elev-1">
                <Navigation className="size-4 -rotate-45 fill-current" />
              </div>
            </div>
          </div>
          <p className="mt-2 type-label-sm leading-relaxed text-muted-foreground">
            Imagery:{" "}
            <a href="https://s2maps.eu" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">
              Sentinel-2 cloudless 2016 by EOX
            </a>{" "}
            (CC BY 4.0, contains modified Copernicus Sentinel data). Sites:{" "}
            <a href={MRDS_SOURCE_URL} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">
              USGS MRDS
            </a>
            . Boundaries: geoBoundaries (CC BY 4.0).
          </p>
        </Panel>

        <div className="flex min-w-0 flex-col gap-3 lg:col-span-5">
          {/* Major deposits */}
          <Panel icon={ListOrdered} title="Major deposits" meta="Published figures · tap to view">
            <ul className="-mx-1 flex flex-col">
              {MAJOR_DEPOSITS.map((d, i) => {
                const isActive = d.id === active.id;
                return (
                  <li key={d.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(d.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "state-layer flex w-full items-center gap-3 rounded-[12px] px-2 py-2 text-left",
                        isActive && "bg-primary-container text-on-primary-container",
                      )}
                    >
                      <span className="w-4 font-mono text-[12px] text-muted-foreground">{i + 1}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5">
                          <span className="truncate type-title-md text-[13.5px]">{d.name}</span>
                          <span className="hidden truncate type-label-sm text-muted-foreground sm:inline">· {d.district}</span>
                        </span>
                        <span className="block truncate type-label-sm text-muted-foreground">{d.commodity}</span>
                      </span>
                      <span className="shrink-0 text-right font-mono text-[13px] font-medium">{d.headline}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Panel>

          {/* Spectral signature + facts */}
          <Panel icon={Waves} title="SWIR marker" meta={`${active.swir.mineral}`} className="flex-1">
            <svg viewBox="0 0 300 130" className="h-auto w-full" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1={0} x2={300} y1={10 + i * 36} y2={10 + i * 36} className="stroke-outline-variant" strokeWidth={0.6} strokeDasharray="3 4" />
              ))}
              {(() => {
                const x = ((active.swir.feature - 0.4) / 2.1) * 300;
                return (
                  <g>
                    <rect x={x - 8} y={0} width={16} height={120} className="fill-anomaly/10" />
                    <text x={x} y={128} textAnchor="middle" className="fill-anomaly font-mono" style={{ fontSize: 8 }}>
                      {active.swir.feature.toFixed(2)} µm
                    </text>
                  </g>
                );
              })()}
              <polyline points={spectrum(active.swir.feature, active.swir.depth * 0.45)} fill="none" className="stroke-outline" strokeWidth={1.2} strokeDasharray="4 3" />
              <polyline points={spectrum(active.swir.feature, active.swir.depth)} fill="none" className="stroke-primary" strokeWidth={2} strokeLinejoin="round" />
            </svg>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 type-label-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-primary" /> Altered rock</span>
              <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 border-t border-dashed border-outline" /> Background</span>
              <span className="ml-auto">Schematic · 0.4–2.5 µm</span>
            </div>

            <dl className="mt-3 grid gap-2 rounded-[12px] bg-secondary p-3 text-secondary-foreground">
              <div className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <dt className="type-label-sm uppercase text-muted-foreground">{active.basis}</dt>
                  <dd className="type-body-md text-[12.5px] leading-snug">{active.contained}</dd>
                </div>
              </div>
              <p className="type-body-md text-[12.5px] leading-snug">{active.status}</p>
              <a
                href={active.source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 type-label-sm text-primary underline-offset-2 hover:underline"
              >
                Source: {active.source.label} <ExternalLink className="size-3" />
              </a>
            </dl>
          </Panel>
        </div>
      </div>
    </div>
  );
}
