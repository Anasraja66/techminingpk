import { AlertTriangle, BadgeCheck, Fuel, Radar, Scale, Satellite } from "lucide-react";

import { cn } from "@/lib/utils";

const HOTSPOTS = [
  { name: "Reko Diq", x: 18, y: 30, level: "high", note: "Phyllic alteration · 0.91" },
  { name: "Saindak", x: 9, y: 42, level: "high", note: "Argillic · 0.84" },
  { name: "Chagai Hills", x: 30, y: 22, level: "mid", note: "Propylitic · 0.67" },
  { name: "Muslim Bagh", x: 72, y: 34, level: "mid", note: "Serpentinite · 0.72" },
  { name: "Lasbela", x: 62, y: 80, level: "mid", note: "Ophiolite · 0.63" },
] as const;

const WEIGHINGS = [
  { plate: "QTA-4471", mineral: "Chromite", gross: 41.82, tare: 14.1, time: "11:02" },
  { plate: "ZHB-0918", mineral: "Chromite", gross: 39.6, tare: 13.85, time: "10:47" },
  { plate: "CGI-2203", mineral: "Cu conc.", gross: 44.18, tare: 15.02, time: "10:31" },
];

const FLEET = [
  { unit: "EX-02", pct: 58 },
  { unit: "DMP-03", pct: 64 },
  { unit: "DMP-05", pct: 61 },
  { unit: "DMP-07", pct: 88, flag: true },
  { unit: "DMP-09", pct: 60 },
  { unit: "LDR-01", pct: 52 },
];

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
        <Icon className="size-4 text-primary" />
        <p className="type-title-md text-[14px]">{title}</p>
        {meta && <span className="ml-auto hidden type-label-sm text-muted-foreground sm:inline">{meta}</span>}
      </div>
      {children}
    </div>
  );
}

export function DashboardMock() {
  return (
    <div className="rounded-[28px] border border-outline-variant bg-surface p-3 shadow-elev-3 sm:p-4">
      {/* window bar */}
      <div className="mb-3 flex items-center gap-3 px-2">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-outline-variant" />
          <span className="size-2.5 rounded-full bg-outline-variant" />
          <span className="size-2.5 rounded-full bg-outline-variant" />
        </div>
        <p className="min-w-0 truncate font-mono text-[12px] text-muted-foreground">techmining.pk / control-room / balochistan</p>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-success-container px-2.5 py-0.5 type-label-sm text-on-success-container">
          <span className="size-1.5 rounded-full bg-success" /> Live
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-5">
        {/* Map */}
        <Panel icon={Satellite} title="Alteration anomalies" meta="Sentinel-2 · ASTER SWIR" className="lg:col-span-3">
          <div className="topo-grid relative aspect-[16/10] overflow-hidden rounded-[12px]">
            <svg viewBox="0 0 100 62" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
              <path
                d="M2 30 C8 18 20 10 34 12 S52 4 64 10 S84 14 94 24 S98 44 88 52 S70 60 56 58 S30 60 18 54 S0 42 2 30Z"
                className="fill-surface-lowest/70 stroke-primary/40"
                strokeWidth="0.4"
                strokeDasharray="1.2 0.8"
              />
              {[0, 1, 2, 3].map((i) => (
                <path
                  key={i}
                  d={`M${10 + i * 4} ${36 - i * 3} C${24 + i * 2} ${22 - i * 2} ${44} ${26 - i * 3} ${60 - i * 2} ${22 + i} S${82 - i * 3} ${30 - i} ${86 - i * 4} ${42 - i * 2}`}
                  className="fill-none stroke-primary/20"
                  strokeWidth="0.35"
                />
              ))}
            </svg>
            {HOTSPOTS.map((h) => (
              <div
                key={h.name}
                className="group absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                <span
                  className={cn(
                    "absolute inset-0 rounded-full animate-ping-soft",
                    h.level === "high" ? "bg-anomaly" : "bg-warning",
                  )}
                />
                <span
                  className={cn(
                    "relative block size-3 rounded-full border-2 border-surface-lowest",
                    h.level === "high" ? "bg-anomaly" : "bg-warning",
                  )}
                />
                <span className="absolute left-4 top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-sm bg-inverse-surface px-2 py-1 font-mono text-[10px] text-inverse-on-surface sm:block">
                  {h.name}
                  <span className="hidden opacity-70 group-hover:inline"> · {h.note}</span>
                </span>
              </div>
            ))}
            <div className="absolute bottom-2 left-2 flex gap-3 rounded-sm bg-surface-lowest/90 px-2 py-1 type-label-sm text-muted-foreground">
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-anomaly" /> High</span>
              <span className="flex items-center gap-1"><span className="size-2 rounded-full bg-warning" /> Moderate</span>
            </div>
          </div>
        </Panel>

        {/* Fleet */}
        <Panel icon={Fuel} title="Fuel burn vs. engine hours" meta="Shift B" className="lg:col-span-2">
          <div className="flex flex-1 items-end gap-2 pt-2" style={{ minHeight: 150 }}>
            {FLEET.map((f) => (
              <div key={f.unit} className="flex flex-1 flex-col items-center gap-1.5">
                {f.flag && (
                  <span className="rounded-sm bg-destructive px-1 font-mono text-[10px] text-destructive-foreground">+25%</span>
                )}
                <div className="flex h-28 w-full items-end rounded-t-[6px] bg-surface">
                  <div
                    className={cn("w-full rounded-t-[6px]", f.flag ? "bg-destructive" : "bg-primary/70")}
                    style={{ height: `${f.pct}%` }}
                  />
                </div>
                <span className={cn("font-mono text-[10px]", f.flag ? "text-destructive" : "text-muted-foreground")}>
                  {f.unit}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-start gap-2 rounded-[12px] bg-warning-container p-2.5 text-on-warning-container">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <p className="type-body-md text-[12.5px] leading-snug">
              Dumper-07: 38 L over model at 4.2 engine hrs. WhatsApp alert sent to site manager.
            </p>
          </div>
        </Panel>

        {/* Weighbridge */}
        <Panel icon={Scale} title="Weighbridge feed" meta="Muslim Bagh WB-1 · RS232" className="lg:col-span-5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="type-label-sm uppercase text-muted-foreground">
                  <th className="pb-2 font-medium">Time</th>
                  <th className="pb-2 font-medium">Plate</th>
                  <th className="pb-2 font-medium">Mineral</th>
                  <th className="pb-2 text-right font-medium">Gross (t)</th>
                  <th className="pb-2 text-right font-medium">Tare (t)</th>
                  <th className="pb-2 text-right font-medium">Net (t)</th>
                  <th className="pb-2 pl-4 font-medium">e-Challan</th>
                </tr>
              </thead>
              <tbody className="font-mono text-[13px]">
                {WEIGHINGS.map((w) => (
                  <tr key={w.plate} className="border-t border-outline-variant">
                    <td className="py-2.5 text-muted-foreground">{w.time}</td>
                    <td className="py-2.5">
                      <span className="rounded-[4px] border border-outline px-1.5 py-0.5">{w.plate}</span>
                    </td>
                    <td className="py-2.5 font-sans">{w.mineral}</td>
                    <td className="py-2.5 text-right">{w.gross.toFixed(2)}</td>
                    <td className="py-2.5 text-right">{w.tare.toFixed(2)}</td>
                    <td className="py-2.5 text-right font-semibold">{(w.gross - w.tare).toFixed(2)}</td>
                    <td className="py-2.5 pl-4">
                      <span className="inline-flex items-center gap-1 rounded-sm bg-success-container px-2 py-0.5 font-sans type-label-sm text-on-success-container">
                        <BadgeCheck className="size-3.5" /> Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </div>
  );
}
