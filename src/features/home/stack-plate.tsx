import { getLocale, getTranslations } from "next-intl/server";
import { Plate } from "@/components/ui/plate";
import { stack } from "@/content/profile";

const layers = ["Interface", "Back end", "Data", "Infrastructure"];
const across = ["Identity", "Testing"];

// The plate next to the tools: the stack as layers, with identity and tests
// drawn across all of them.
export async function StackPlate() {
  const locale = await getLocale();
  const t = await getTranslations("plates.stack");
  const find = (area: string) => stack.find((group) => group.area.en === area);

  return (
    <Plate label="stack" title={t("title")} note={t("note")}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] gap-1.5">
        {layers.map((area, i) => {
          const group = find(area);
          return (
            <div key={area} className="fill-in rounded-[3px] border border-plan-line/50 px-2.5 py-1.5" style={{ gridRow: i + 1, gridColumn: 1 }}>
              <p className="text-xs font-semibold">{group?.area[locale]}</p>
              <p className="font-mono text-[10px] leading-tight text-plan-line/75">{group?.items.slice(0, 3).join(" · ")}</p>
            </div>
          );
        })}
        {across.map((area, i) => (
          <div
            key={area}
            className={`fill-in grid place-items-center rounded-[3px] px-1 ${i === 0 ? "bg-mark text-mark-ink" : "border border-plan-line/50"}`}
            style={{ gridRow: "1 / span 4", gridColumn: i + 2 }}
          >
            <span className="text-xs font-semibold [writing-mode:vertical-rl]">{find(area)?.area[locale]}</span>
          </div>
        ))}
      </div>
    </Plate>
  );
}
