import { getTranslations } from "next-intl/server";
import { Plate } from "@/components/ui/plate";

// The plate next to the intro: the á of the name, drawn like a type specimen,
// with the bytes that old databases misread.
export async function GlyphPlate() {
  const t = await getTranslations("plates.glyph");
  const rows = [
    { label: t("codePoint"), value: "U+00E1" },
    { label: t("utf8"), value: "C3 A1" },
    { label: t("misread"), value: "Ã¡" },
  ];

  return (
    <Plate label="U+00E1" title={t("title")} note={t("note")}>
      <div className="flex items-center gap-5">
        <svg viewBox="0 0 120 132" aria-hidden="true" className="w-28 shrink-0 text-plan-line">
          <rect x="12" y="12" width="96" height="108" rx="3" className="fill-in fill-mark" />
          <text x="60" y="98" textAnchor="middle" className="fill-in fill-mark-ink text-[92px] font-semibold">
            á
          </text>
          {/* Construction lines: baseline and x-height, past the edges like on a drawing. */}
          <path d="M0 98 H120" pathLength={1} className="draw fill-none stroke-current stroke-[0.75]" />
          <path d="M0 52 H120" pathLength={1} className="draw fill-none stroke-current stroke-[0.75] opacity-60" />
          <path d="M60 0 V132" className="fill-none stroke-current stroke-[0.5] opacity-40" strokeDasharray="2 3" />
        </svg>
        <dl className="min-w-0 space-y-2.5 text-sm">
          {rows.map((row) => (
            <div key={row.value}>
              <dt className="text-xs text-plan-line/70">{row.label}</dt>
              <dd className="font-mono">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Plate>
  );
}
