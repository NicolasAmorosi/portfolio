"use client";

import { useEffect, useState } from "react";

type Phase = "broken" | "flag" | "fixed" | "done";

// One orchestrated moment on load: "NicolÃ¡s" (UTF-8 bytes misread as
// Windows-1252) gets flagged, decoded, and the highlighter lifts off.
// Reduced motion and no-JS skip straight to the result (see globals.css).
const steps: [Phase, number][] = [
  ["flag", 700],
  ["fixed", 1400],
  ["done", 2300],
];

// Once per visit: client-side navigations (language switch, back from a case
// study) remount the hero, and it should simply be there, already decoded.
let played = false;

export function DecodedName({ name }: { name: string }) {
  const [phase, setPhase] = useState<Phase>(() => (played ? "done" : "broken"));

  useEffect(() => {
    if (played) return;
    played = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers = steps.map(([next, delay]) => window.setTimeout(() => setPhase(next), delay));
    return () => timers.forEach(window.clearTimeout);
  }, []);

  return (
    <>
      <span className="sr-only">{name}</span>
      <span className="decode" data-phase={phase} aria-hidden="true">
        <span className="block">
          Nicol
          <span className="glyph">
            <span className="decode-broken">Ã¡</span>
            <span className="decode-fixed">á</span>
          </span>
          s
        </span>
        <span className="block">Amorosi</span>
      </span>
      <noscript>
        <style>{".decode .decode-broken{display:none}.decode .decode-fixed{display:inline}"}</style>
      </noscript>
    </>
  );
}
