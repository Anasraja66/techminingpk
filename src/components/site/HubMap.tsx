import { Navigation } from "lucide-react";

import { MRDS_SITES, isProducing } from "@/components/site/pakistanDeposits";
import type { Hub } from "@/lib/hubs";

const W = 1600;

/** Real Sentinel-2 crop of a hub with USGS MRDS sites and named deposits drawn in the same lon/lat frame. */
export function HubMap({ hub }: { hub: Hub }) {
  const [lo0, la0, lo1, la1] = hub.bbox;
  const latc = (la0 + la1) / 2;
  const cos = Math.cos((latc * Math.PI) / 180);
  const H = Math.round((W * (la1 - la0)) / ((lo1 - lo0) * cos));
  const px = (lon: number, lat: number): [number, number] => [
    ((lon - lo0) / (lo1 - lo0)) * W,
    ((la1 - lat) / (la1 - la0)) * H,
  ];

  const sites = MRDS_SITES.filter((s) => s.lon >= lo0 && s.lon <= lo1 && s.lat >= la0 && s.lat <= la1);
  const widthKm = (lo1 - lo0) * 111.32 * cos;
  const barKm = widthKm > 300 ? 100 : widthKm > 120 ? 25 : 10;
  const barPx = (barKm / widthKm) * W;

  return (
    <figure className="overflow-hidden rounded-[28px] border border-outline-variant bg-surface-lowest">
      <div className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Sentinel-2 satellite image of the ${hub.name} hub with mineral sites`}>
          <image href={hub.image} x={0} y={0} width={W} height={H} preserveAspectRatio="none" />

          {/* graticule every 0.5° */}
          <g className="stroke-surface-lowest/35" strokeWidth={1.5} strokeDasharray="6 8">
            {Array.from({ length: Math.floor((lo1 - lo0) / 0.5) + 1 }, (_, i) => Math.ceil(lo0 * 2) / 2 + i * 0.5)
              .filter((l) => l < lo1)
              .map((l) => {
                const [x] = px(l, la0);
                return <line key={`x${l}`} x1={x} x2={x} y1={0} y2={H} />;
              })}
            {Array.from({ length: Math.floor((la1 - la0) / 0.5) + 1 }, (_, i) => Math.ceil(la0 * 2) / 2 + i * 0.5)
              .filter((l) => l < la1)
              .map((l) => {
                const [, y] = px(lo0, l);
                return <line key={`y${l}`} x1={0} x2={W} y1={y} y2={y} />;
              })}
          </g>

          {/* USGS MRDS records */}
          {sites.map((s) => {
            const [x, y] = px(s.lon, s.lat);
            return (
              <circle
                key={s.id}
                cx={x}
                cy={y}
                r={11}
                className={isProducing(s) ? "fill-success stroke-surface-lowest" : "fill-warning stroke-surface-lowest"}
                strokeWidth={4}
              >
                <title>{`${s.name} — ${s.commodities.join(", ")} (${s.status}, USGS MRDS)`}</title>
              </circle>
            );
          })}

          {/* Named deposits & localities */}
          {hub.places.map((p) => {
            const [x, y] = px(p.lon, p.lat);
            const right = x < W * 0.7;
            return (
              <g key={p.name}>
                <circle cx={x} cy={y} r={p.major ? 34 : 24} className="fill-none stroke-primary-foreground" strokeWidth={3} />
                <circle cx={x} cy={y} r={p.major ? 13 : 10} className="fill-primary stroke-primary-foreground" strokeWidth={4} />
                <text
                  x={right ? x + 46 : x - 46}
                  y={y - 4}
                  textAnchor={right ? "start" : "end"}
                  className="fill-primary-foreground stroke-inverse-surface font-sans"
                  strokeWidth={7}
                  paintOrder="stroke"
                  fontSize={36}
                  fontWeight={600}
                >
                  {p.name}
                </text>
                <text
                  x={right ? x + 46 : x - 46}
                  y={y + 32}
                  textAnchor={right ? "start" : "end"}
                  className="fill-primary-foreground stroke-inverse-surface font-sans"
                  strokeWidth={6}
                  paintOrder="stroke"
                  fontSize={24}
                >
                  {p.note}
                </text>
              </g>
            );
          })}

          {/* scale bar */}
          <g transform={`translate(40 ${H - 50})`}>
            <rect x={-14} y={-38} width={barPx + 28} height={62} rx={10} className="fill-surface-lowest/90" />
            <rect x={0} y={0} width={barPx} height={8} className="fill-foreground" />
            <rect x={0} y={0} width={barPx / 2} height={8} className="fill-primary" />
            <text x={0} y={-12} fontSize={22} className="fill-foreground font-mono">0</text>
            <text x={barPx} y={-12} fontSize={22} textAnchor="end" className="fill-foreground font-mono">
              {barKm} km
            </text>
          </g>
        </svg>

        <span className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-surface-lowest text-foreground shadow-elev-1" aria-label="North">
          <Navigation className="size-4" />
        </span>
        <span className="absolute top-3 left-3 rounded-sm bg-surface-lowest px-2.5 py-1 font-mono text-[12px] text-foreground shadow-elev-1">
          {lo0.toFixed(1)}–{lo1.toFixed(1)}°E · {la0.toFixed(1)}–{la1.toFixed(1)}°N
        </span>
      </div>

      <figcaption className="flex flex-col gap-3 border-t border-outline-variant px-4 py-3 sm:flex-row sm:items-center sm:px-5">
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5 type-label-lg text-muted-foreground">
          <li className="flex items-center gap-2">
            <span className="size-3 rounded-full border-2 border-surface-lowest bg-primary ring-1 ring-primary" /> Named deposit
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-success" /> USGS producer
          </li>
          <li className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-warning" /> USGS occurrence / prospect
          </li>
          <li>{sites.length} USGS MRDS record{sites.length === 1 ? "" : "s"} in view</li>
        </ul>
        <p className="type-label-sm text-muted-foreground sm:ml-auto">
          Imagery: Sentinel-2 cloudless 2016 by EOX (CC BY 4.0) · Sites: USGS MRDS
        </p>
      </figcaption>
    </figure>
  );
}
