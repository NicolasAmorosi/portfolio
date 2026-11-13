import { getLocale, getTranslations } from "next-intl/server";
import { education, roles } from "@/content/experience";
import { formatPeriod } from "@/lib/dates";

const row = "grid gap-x-6 gap-y-1 border-b border-rule py-5 sm:grid-cols-[9.5rem_1fr]";

export async function Experience() {
  const locale = await getLocale();
  const t = await getTranslations("experience");
  const common = await getTranslations("common");

  return (
    <ol className="border-t border-rule">
      {roles.map((role, i) => (
        <li key={`${role.org}-${role.period.from}`} data-spy={`experience:${i}`} className={row}>
          <p className="text-sm leading-6 text-ink-2 tabular-nums">{formatPeriod(role.period, locale, common("present"))}</p>
          <div className="min-w-0">
            <h3 className="font-semibold">{role.org}</h3>
            <p className="text-ui text-ink-2">
              {role.title[locale]} · {role.place[locale]}
            </p>
            <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-ui marker:text-ink-2">
              {role.points[locale].map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
      <li data-spy="experience:edu" className={row}>
        <p className="text-sm leading-6 text-ink-2">{t("education")}</p>
        <div>
          <h3 className="font-semibold">{t("school")}</h3>
          <ul className="mt-1 space-y-0.5 text-ui">
            {education.map((degree) => (
              <li key={degree.title.en} className="flex flex-wrap gap-x-3">
                <span>{degree.title[locale]}</span>
                <span className="text-ink-2 tabular-nums">{formatPeriod(degree.period, locale, common("present"))}</span>
              </li>
            ))}
          </ul>
        </div>
      </li>
    </ol>
  );
}
