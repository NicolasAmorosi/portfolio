"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { site } from "@/lib/site";

// Minutes since epoch: stable between ticks, so React only re-renders when
// the displayed time changes. The server snapshot is null (time is per-visit).
const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
};
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

export function LocalClock() {
  const locale = useLocale();
  const t = useTranslations("contact");
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);

  if (minute === null) return <p className="text-ink-2">{t("clockFallback")}</p>;

  const date = new Date(minute * 60_000);
  const time = (timeZone: string) =>
    new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone }).format(date);

  return (
    <p className="text-ink-2">
      {t("clock", { here: time(site.timeZone), rome: time("Europe/Rome"), newYork: time("America/New_York") })}
    </p>
  );
}
