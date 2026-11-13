import { getLocale, getTranslations } from "next-intl/server";
import { Plate } from "@/components/ui/plate";
import { education, roles } from "@/content/experience";
import type { Period } from "@/lib/dates";
import { formatPeriod } from "@/lib/dates";

const ORIGIN = 2020;

function months(value: string): number {
  const [year, month] = value.split("-");
  return (Number(year) - ORIGIN) * 12 + (month ? Number(month) - 1 : 0);
}

// The plate next to the experience list: every role on one time axis, the one
// being read in highlighter. Built at build time, so "now" is the deploy date.
export async function TimelinePlate({ active }: { active: number | "edu" }) {
  const locale = await getLocale();
  const t = await getTranslations("experience");
  const common = await getTranslations("common");

  const now = new Date();
  const nowMonths = (now.getUTCFullYear() - ORIGIN) * 12 + now.getUTCMonth() + 1;
  const span = nowMonths + 3;
  const pct = (value: number) => `${(value / span) * 100}%`;
  const years = Array.from({ length: now.getUTCFullYear() - ORIGIN + 1 }, (_, i) => ORIGIN + i);
  const rows: { key: number | "edu"; periods: Period[] }[] = [
    ...roles.map((role, i) => ({ key: i, periods: [role.period] })),
    { key: "edu" as const, periods: education.map((degree) => degree.period) },
  ];

  const role = active === "edu" ? undefined : roles[active];
  const title = role ? role.org : t("school");
  const note = role
    ? `${role.title[locale]} · ${formatPeriod(role.period, locale, common("present"))}`
    : education.map((degree) => degree.title[locale]).join(" · ");

  return (
    <Plate label={`${ORIGIN} – ${now.getUTCFullYear()}`} title={title} note={note}>
      <div className="relative">
        <div className="relative h-5 font-mono text-[10px] text-plan-line/70">
          {years.map((year) => (
            <span key={year} className="absolute top-0" style={{ left: pct((year - ORIGIN) * 12) }}>
              ’{String(year).slice(2)}
            </span>
          ))}
        </div>
        <div className="relative space-y-2 py-1">
          {years.map((year) => (
            <span
              key={year}
              aria-hidden="true"
              className="absolute inset-y-0 w-px bg-plan-line/15"
              style={{ left: pct((year - ORIGIN) * 12) }}
            />
          ))}
          <span aria-hidden="true" className="absolute inset-y-0 w-px border-l border-dashed border-plan-line/60" style={{ left: pct(nowMonths) }} />
          {rows.map((row) => (
            <div key={row.key} className="relative h-3">
              {row.periods.map((period) => {
                const start = months(period.from);
                const end = period.to === undefined ? nowMonths : months(period.to) + 1;
                const on = row.key === active;
                return (
                  <span
                    key={period.from}
                    className={`absolute inset-y-0 rounded-[2px] ${on ? "grow-x bg-mark" : "bg-plan-line/35"}`}
                    style={{ left: pct(start), width: pct(end - start) }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Plate>
  );
}
