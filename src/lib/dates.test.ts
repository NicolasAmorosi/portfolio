import { describe, expect, it } from "vitest";
import { formatPeriod, formatYears, monthIndex } from "./dates";

describe("dates", () => {
  it("counts months from January 2020", () => {
    expect(monthIndex("2020-01")).toBe(0);
    expect(monthIndex("2023-03")).toBe(38);
    expect(monthIndex("2026")).toBe(72);
  });

  it("formats open and closed periods per locale", () => {
    expect(formatPeriod({ from: "2025-01", to: "2026-08" }, "en", "present")).toBe("Jan 2025 – Aug 2026");
    expect(formatPeriod({ from: "2026-08" }, "en", "present")).toBe("Aug 2026 – present");
    expect(formatPeriod({ from: "2026-03", to: "2026-03" }, "en", "present")).toBe("Mar 2026");
    expect(formatPeriod({ from: "2026-08" }, "es", "hoy")).toMatch(/^ago 2026 – hoy$/);
  });

  it("collapses same-year ranges to one year", () => {
    expect(formatYears({ from: "2026-07", to: "2026-07" }, "present")).toBe("2026");
    expect(formatYears({ from: "2023-10" }, "present")).toBe("2023 – present");
  });
});
