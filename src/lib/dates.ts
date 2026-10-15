// Periods are stored as "YYYY" or "YYYY-MM"; open-ended ones have no `to`.
export type Period = { from: string; to?: string };

function parse(value: string): Date {
  const [year, month] = value.split("-");
  return new Date(Date.UTC(Number(year), month ? Number(month) - 1 : 0, 1));
}

function format(value: string, locale: string): string {
  const options: Intl.DateTimeFormatOptions =
    value.length > 4 ? { month: "short", year: "numeric", timeZone: "UTC" } : { year: "numeric", timeZone: "UTC" };
  return new Intl.DateTimeFormat(locale, options).format(parse(value));
}

export function formatPeriod(period: Period, locale: string, presentLabel: string): string {
  const from = format(period.from, locale);
  if (period.to === undefined) return `${from} – ${presentLabel}`;
  const to = format(period.to, locale);
  return from === to ? from : `${from} – ${to}`;
}

export function formatYears(period: Period, presentLabel: string): string {
  const from = period.from.slice(0, 4);
  const to = period.to?.slice(0, 4);
  if (to === undefined) return `${from} – ${presentLabel}`;
  return from === to ? from : `${from} – ${to}`;
}

// Months since Jan 2020 — the origin of the experience timeline.
export const TIMELINE_ORIGIN = 2020;

export function monthIndex(value: string): number {
  const date = parse(value);
  return (date.getUTCFullYear() - TIMELINE_ORIGIN) * 12 + date.getUTCMonth();
}
