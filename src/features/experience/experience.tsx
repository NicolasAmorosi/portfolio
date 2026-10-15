import { getLocale, getTranslations } from "next-intl/server";
import { Fragment } from "react";
import { education, roles, tracks } from "@/content/experience";
import { formatPeriod, monthIndex, TIMELINE_ORIGIN } from "@/lib/dates";

// The chart is a visual summary (aria-hidden); the role list below carries
// the same information for everyone, including screen readers.
export async function Experience() {
  const locale = await getLocale();
  const t = await getTranslations("experience");
  const common = await getTranslations("common");

  const now = new Date();
  const nowIndex = (now.getUTCFullYear() - TIMELINE_ORIGIN) * 12 + now.getUTCMonth();
  const span = nowIndex + 7; // air after "now" so its label fits
  const pct = (months: number) => `${(months / span) * 100}%`;
  const years = Array.from({ length: now.getUTCFullYear() - TIMELINE_ORIGIN + 1 }, (_, i) => TIMELINE_ORIGIN + i);

  return (
    <>
      <div aria-hidden="true" className="grid grid-cols-[6.5rem_1fr] gap-x-3 sm:grid-cols-[11rem_1fr] sm:gap-x-5">
        <div />
        <div className="relative h-7 text-xs text-ink-2 tabular-nums">
          {years.map((year) => (
            <span key={year} className="absolute top-0 h-full border-l border-rule pl-1.5" style={{ left: pct((year - TIMELINE_ORIGIN) * 12) }}>
              {/* On phones the current year's label would collide with "Now". */}
              <span className={year === now.getUTCFullYear() ? "hidden" : "sm:hidden"}>’{String(year).slice(2)}</span>
              <span className="hidden sm:inline">{year}</span>
            </span>
          ))}
          <span
            className="absolute top-0 -translate-x-1/2 rounded-[3px] bg-mark px-1.5 font-medium text-mark-ink"
            style={{ left: pct(nowIndex + 1) }}
          >
            {t("now")}
          </span>
        </div>

        {tracks.map((track) => (
          <div key={track.label.en} className="contents">
            <p className="flex items-center border-t border-rule py-1.5 text-xs leading-tight text-ink-2 sm:text-sm sm:leading-tight">
              {track.label[locale]}
            </p>
            <div className="relative h-11 border-t border-rule">
              <span className="absolute inset-y-0 border-l border-dashed border-ink-2/60" style={{ left: pct(nowIndex + 1) }} />
              {track.bars.map((bar) => {
                const start = monthIndex(bar.period.from);
                const end = bar.period.to === undefined ? nowIndex + 1 : monthIndex(bar.period.to) + 1;
                const ongoing = bar.period.to === undefined;
                const short = end - start < 10; // too narrow for its label: put it outside, on the left
                return (
                  <Fragment key={bar.period.from}>
                    <span
                      className="absolute top-2.5 flex h-6 items-center overflow-hidden rounded-l-[3px] bg-ink text-xs whitespace-nowrap text-paper data-[ongoing=false]:rounded-r-[3px]"
                      data-ongoing={ongoing}
                      style={{ left: pct(start), width: pct(end - start) }}
                    >
                      {short ? null : <span className="hidden px-2 sm:inline">{bar.label[locale]}</span>}
                      {ongoing ? <span className="ml-auto h-full w-1 shrink-0 bg-mark" /> : null}
                    </span>
                    {short ? (
                      <span
                        className="absolute top-2.5 hidden h-6 items-center pr-2 text-xs whitespace-nowrap text-ink sm:flex"
                        style={{ right: pct(span - start) }}
                      >
                        {bar.label[locale]}
                      </span>
                    ) : null}
                  </Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <ol className="mt-14">
        {roles.map((role) => (
          <li key={`${role.org}-${role.period.from}`} className="grid gap-x-10 gap-y-3 border-t border-rule py-7 sm:grid-cols-[11rem_1fr]">
            <div className="text-sm text-ink-2">
              <p className="tabular-nums">{formatPeriod(role.period, locale, common("present"))}</p>
              <p>{role.place[locale]}</p>
            </div>
            <div className="min-w-0">
              <h3 className="type-heading text-lg">{role.org}</h3>
              <p className="text-ink-2">{role.title[locale]}</p>
              <ul className="mt-4 max-w-[66ch] list-disc space-y-2 pl-5 text-ui marker:text-ink-2">
                {role.points[locale].map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
        <li className="grid gap-x-10 gap-y-3 border-t border-rule py-7 sm:grid-cols-[11rem_1fr]">
          <p className="text-sm text-ink-2">{t("education")}</p>
          <div>
            <h3 className="type-heading text-lg">{t("school")}</h3>
            <ul className="mt-2 space-y-1 text-ui">
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
    </>
  );
}
