import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { routing } from "./routing";

// Only English is type-checked (global.d.ts), so the other locales are checked
// here: same keys, and the same {placeholders} and <tags> in every message.
type Tree = { [key: string]: string | Tree };

function flatten(tree: Tree, prefix = ""): Record<string, string> {
  return Object.fromEntries(
    Object.entries(tree).flatMap(([key, value]) =>
      typeof value === "string" ? [[prefix + key, value]] : Object.entries(flatten(value, `${prefix}${key}.`)),
    ),
  );
}

const load = (locale: string) => flatten(JSON.parse(readFileSync(join(__dirname, "messages", `${locale}.json`), "utf8")) as Tree);
// Placeholders are the first word after a "{" (ICU plural branches have none); tags are <name>.
const tokens = (message: string) => [...message.matchAll(/\{(\w+)|<\/?(\w+)>/g)].map((m) => m[0]).sort();

const english = load("en");

describe("messages", () => {
  for (const locale of routing.locales.filter((l) => l !== "en")) {
    it(`${locale} matches English key for key`, () => {
      const messages = load(locale);
      expect(Object.keys(messages).sort()).toEqual(Object.keys(english).sort());
      for (const [key, message] of Object.entries(english)) {
        expect(tokens(messages[key] ?? ""), `${locale}: ${key}`).toEqual(tokens(message));
      }
    });
  }
});
