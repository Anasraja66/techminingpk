// Client-safe shared contract for the AI Site Advisor.

export const SERVICE_CATALOG = {
  exploration: {
    name: "Satellite AI Exploration",
    summary:
      "Sentinel-2 / ASTER satellite analysis that maps alteration zones and ranks drill targets inside a lease before drilling.",
  },
  weighbridge: {
    name: "Smart Weighbridge & Bilti",
    summary:
      "Direct scale capture of tare/gross weight, QR-verified digital bilti/e-challan, automatic royalty calculation, offline buffer.",
  },
  fleet: {
    name: "Fleet & Fuel Loss AI",
    summary:
      "Fuel probes and engine telemetry on excavators/dumpers; matches diesel to engine hours and trips; WhatsApp/SMS theft alerts.",
  },
  grade: {
    name: "Ore Blending & Quality",
    summary:
      "Stockpile grade tracking and blend ratios to hit buyer specs (e.g. 42% Cr2O3) so export shipments are not rejected.",
  },
} as const;

export type ServiceId = keyof typeof SERVICE_CATALOG;
export const SERVICE_IDS = Object.keys(SERVICE_CATALOG) as ServiceId[];

export const CHALLENGES = [
  "Don't know where to drill",
  "Weight / scale fraud",
  "Royalty & challan issues",
  "Diesel theft",
  "Machine downtime",
  "Low or mixed ore grade",
  "Shipments rejected by buyers",
  "No live view of operations",
] as const;

export const STAGES = ["Exploration", "Development", "Active production", "Exporting"] as const;

export type AdvisorInput = {
  mineral: string;
  location: string;
  stage: string;
  description: string;
  challenges: string[];
  goals: string;
};

export type Recommendation = {
  serviceId: ServiceId;
  name: string;
  match: number; // 0–100
  why: string;
  firstSteps: string[];
};

export type Advice = {
  summary: string;
  recommendations: Recommendation[];
  nextSteps: string[];
};

export const LIMITS = { description: { min: 30, max: 2000 }, goals: { max: 800 }, short: 80 } as const;

/** Trims and bounds visitor input; returns an error message when it can't be used. */
export function validateAdvisorInput(raw: AdvisorInput): { ok: true; value: AdvisorInput } | { ok: false; error: string } {
  const clip = (s: unknown, n: number) => (typeof s === "string" ? s.trim().slice(0, n) : "");
  const value: AdvisorInput = {
    mineral: clip(raw.mineral, LIMITS.short),
    location: clip(raw.location, LIMITS.short),
    stage: clip(raw.stage, LIMITS.short),
    description: clip(raw.description, LIMITS.description.max),
    goals: clip(raw.goals, LIMITS.goals.max),
    challenges: Array.isArray(raw.challenges)
      ? raw.challenges.filter((c): c is string => typeof c === "string").map((c) => c.slice(0, LIMITS.short)).slice(0, 12)
      : [],
  };
  if (value.description.length < LIMITS.description.min) {
    return { ok: false, error: `Please describe your site in at least ${LIMITS.description.min} characters.` };
  }
  return { ok: true, value };
}

/** Keeps only known services, clamps match to 0–100, removes duplicates and sorts best match first. */
export function normalizeAdvice(raw: unknown): Advice {
  const obj = (raw ?? {}) as Record<string, unknown>;
  const strings = (v: unknown, max: number) =>
    Array.isArray(v) ? v.filter((s): s is string => typeof s === "string" && s.trim() !== "").slice(0, max) : [];
  const seen = new Set<ServiceId>();
  const recs: Recommendation[] = [];
  for (const r of Array.isArray(obj["recommendations"]) ? obj["recommendations"] : []) {
    const rec = (r ?? {}) as Record<string, unknown>;
    const id = rec["serviceId"];
    if (typeof id !== "string" || !(id in SERVICE_CATALOG) || seen.has(id as ServiceId)) continue;
    seen.add(id as ServiceId);
    const n = Number(rec["match"]);
    recs.push({
      serviceId: id as ServiceId,
      name: SERVICE_CATALOG[id as ServiceId].name,
      match: Number.isFinite(n) ? Math.round(Math.min(100, Math.max(0, n))) : 0,
      why: typeof rec["why"] === "string" ? rec["why"] : "",
      firstSteps: strings(rec["firstSteps"], 4),
    });
  }
  recs.sort((a, b) => b.match - a.match);
  return {
    summary: typeof obj["summary"] === "string" ? obj["summary"] : "",
    recommendations: recs,
    nextSteps: strings(obj["nextSteps"], 5),
  };
}
