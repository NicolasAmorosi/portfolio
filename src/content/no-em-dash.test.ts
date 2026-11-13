import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// Everything people read comes from these folders. An em dash (U+2014) reads
// as AI-written, so it never ships: rewrite the sentence instead.
const EM_DASH = String.fromCodePoint(0x2014);
const roots = ["src/content", "src/i18n/messages", "src/features", "src/components", "src/app", "src/lib"];

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return files(path);
    return /\.(ts|tsx|json|css)$/.test(entry.name) ? [path] : [];
  });
}

describe("copy", () => {
  it("has no em dash anywhere", () => {
    const offenders = roots
      .flatMap(files)
      .filter((path) => readFileSync(path, "utf8").includes(EM_DASH));
    expect(offenders).toEqual([]);
  });
});
