"use client";

import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { Plate } from "@/components/ui/plate";

const cities = [
  { key: "here", timeZone: "America/Argentina/Buenos_Aires" },
  { key: "rome", timeZone: "Europe/Rome" },
  { key: "newYork", timeZone: "America/New_York" },
] as const;

const WINDOW = 12; // hours shown on each strip, centred on now

// Minutes since epoch: stable between ticks, so React only re-renders when
// the minute changes. The server snapshot is null (time is per visit).
const subscribe = (onChange: () => void) => {
  const id = window.setInterval(onChange, 10_000);
  return () => window.clearInterval(id);
};
const getMinute = () => Math.floor(Date.now() / 60_000);
const getServerMinute = () => null;

function localTime(date: Date, timeZone: string): { hours: number; label: string } {
  const label = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone }).format(date);
  const [h = 0, m = 0] = label.split(":").map(Number);
  return { hours: h + m / 60, label };
}

// The plate next to the contact section: three time zones on strips that
// line up on the same instant, so the offsets read at a glance.
export function ClockPlate() {
  const t = useTranslations("plates.clock");
  const minute = useSyncExternalStore(subscribe, getMinute, getServerMinute);
  const date = minute === null ? null : new Date(minute * 60_000);

  return (
    <Plate label="UTC−3" title={t("title")} note={t("note")}>
      <div className="relative space-y-3">
        {cities.map((city) => {
          const time = date ? localTime(date, city.timeZone) : null;
          const start = time ? time.hours - WINDOW / 2 : 0;
          const first = Math.floor(start);
          return (
            <div key={city.key}>
              <div className="flex items-baseline justify-between text-xs">
                <span>{t(city.key)}</span>
                <span className="font-mono tabular-nums">{time?.label ?? "--:--"}</span>
              </div>
              <div className="relative mt-1 h-4 overflow-hidden rounded-[2px] border border-plan-line/30">
                {time
                  ? Array.from({ length: WINDOW + 2 }, (_, i) => {
                      const hour = first + i;
                      const local = ((hour % 24) + 24) % 24;
                      const day = local >= 7 && local < 19;
                      return (
                        <span
                          key={hour}
                          className={`absolute inset-y-0 border-l border-plan-line/15 ${day ? "bg-plan-line/20" : ""}`}
                          style={{ left: `${((hour - start) / WINDOW) * 100}%`, width: `${100 / WINDOW}%` }}
                        >
                          {local % 3 === 0 ? (
                            <span className="absolute top-0 left-0.5 font-mono text-[9px] leading-4 text-plan-line/70">
                              {String(local).padStart(2, "0")}
                            </span>
                          ) : null}
                        </span>
                      );
                    })
                  : null}
              </div>
            </div>
          );
        })}
        <span aria-hidden="true" className="absolute -top-1 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-mark" />
      </div>
    </Plate>
  );
}
