import { describe, expect, it } from "vitest";

import { normalizeAdvice, validateAdvisorInput } from "@/lib/advisor";

const base = { mineral: "", location: "", stage: "", challenges: [], goals: "" };

describe("AI site advisor rules", () => {
  it("rejects a site description shorter than 30 characters", () => {
    expect(validateAdvisorInput({ ...base, description: "too short" }).ok).toBe(false);
  });

  it("accepts a 30+ character description", () => {
    expect(validateAdvisorInput({ ...base, description: "x".repeat(30) }).ok).toBe(true);
  });

  it("only recommends the four TechMining services, best match first, scores capped 0-100", () => {
    const advice = normalizeAdvice({
      summary: "s",
      nextSteps: ["a"],
      recommendations: [
        { serviceId: "fleet", match: 40, why: "w", firstSteps: [] },
        { serviceId: "crypto-mining", match: 99, why: "w", firstSteps: [] },
        { serviceId: "weighbridge", match: 140, why: "w", firstSteps: [] },
        { serviceId: "fleet", match: 90, why: "dup", firstSteps: [] },
      ],
    });
    expect(advice.recommendations.map((r) => [r.serviceId, r.match])).toEqual([
      ["weighbridge", 100],
      ["fleet", 40],
    ]);
  });
});
