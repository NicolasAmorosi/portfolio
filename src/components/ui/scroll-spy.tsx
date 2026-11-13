"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RailItem = { key: string; href: string; label: string; children?: RailItem[] };
export type Slide = { keys: string[]; node: ReactNode };

// An element becomes "the one you're reading" once its top passes this line
// (a fraction of the viewport). Near the end of the page the line slides down
// to the bottom edge, so the last short sections still get their turn.
const READING_LINE = 0.4;

function readingLine(): number {
  const height = window.innerHeight;
  const toBottom = document.documentElement.scrollHeight - height - window.scrollY;
  const runway = height * (1 - READING_LINE);
  const t = Math.min(1, Math.max(0, 1 - toBottom / runway));
  return height * (READING_LINE + (1 - READING_LINE) * t);
}

const clamp = (value: number) => Math.min(1, Math.max(0, value));

/*
 * Wide screens only (xl+): a rail on the left with one marker that glides
 * between its items as you read, and a plate on the right that shows whatever
 * the page is talking about. Elements opt in with data-spy="<key>"; the last
 * one past the reading line is active. The marker is positioned straight from
 * the scroll position (no React render per frame); the active key, which only
 * changes a few times per page, is state. Below xl both sides are hidden.
 */
export function ScrollSpy({
  label,
  rail,
  slides,
  children,
}: {
  label: string;
  rail: RailItem[];
  slides: Slide[];
  children: ReactNode;
}) {
  const [active, setActive] = useState("intro");
  const listRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const marker = markerRef.current;
    const fill = fillRef.current;
    if (!list || !marker || !fill) return;

    const marks = Array.from(document.querySelectorAll<HTMLElement>("[data-spy]"));
    // Rail entries in page order, each with the element it follows.
    const stops = Array.from(list.querySelectorAll<HTMLAnchorElement>("a[data-rail]")).flatMap((link) => {
      const target = marks.find((mark) => mark.dataset.spy === link.dataset.rail);
      return target ? [{ link, target }] : [];
    });

    let frame = 0;
    const update = () => {
      frame = 0;
      const line = readingLine();

      let key = marks[0]?.dataset.spy ?? "intro";
      for (const mark of marks) if (mark.getBoundingClientRect().top <= line) key = mark.dataset.spy ?? key;
      setActive(key);

      // Marker: between the stop being read and the next one, by how far the
      // reading line has travelled from one to the other.
      const tops = stops.map((stop) => stop.target.getBoundingClientRect().top);
      const centers = stops.map((stop) => stop.link.offsetTop + stop.link.offsetHeight / 2);
      let i = -1;
      tops.forEach((top, j) => {
        if (top <= line) i = j;
      });
      if (i < 0) {
        marker.style.opacity = "0";
        fill.style.transform = "scaleY(0)";
        return;
      }
      const next = Math.min(i + 1, stops.length - 1);
      const from = tops[i] ?? 0;
      const to = tops[next] ?? from;
      const progress = next === i ? 0 : clamp((line - from) / (to - from));
      const y = (centers[i] ?? 0) + ((centers[next] ?? 0) - (centers[i] ?? 0)) * progress;
      marker.style.opacity = "1";
      marker.style.transform = `translateY(${y}px)`;
      fill.style.transform = `scaleY(${y / list.offsetHeight})`;
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  const section = active.split(":")[0];

  return (
    <div className="xl:grid xl:grid-cols-[8.5rem_38rem_21rem] xl:justify-center xl:gap-x-10 2xl:grid-cols-[10rem_40rem_26rem] 2xl:gap-x-14">
      <nav aria-label={label} className="no-print hidden min-w-0 xl:col-start-1 xl:row-start-1 xl:block">
        <div className="sticky top-24 mt-24">
          <div ref={listRef} className="relative">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-rule" />
            <span
              ref={fillRef}
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-px origin-top bg-ink-2/70"
              style={{ transform: "scaleY(0)" }}
            />
            <span
              ref={markerRef}
              aria-hidden="true"
              className="absolute top-0 left-[-1px] -mt-2 h-4 w-[3px] rounded-full bg-mark opacity-0 transition-opacity duration-300"
            />
            <ol className="space-y-2.5 text-sm">
              {rail.map((item) => (
                <li key={item.key}>
                  <RailLink item={item} on={section === item.key} />
                  {item.children ? (
                    <ol className="mt-2 space-y-1.5">
                      {item.children.map((child) => (
                        <li key={child.key}>
                          <RailLink item={child} on={active === child.key} nested />
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </nav>

      <div className="min-w-0 xl:col-start-2 xl:row-start-1">{children}</div>

      <aside aria-hidden="true" className="no-print hidden min-w-0 xl:col-start-3 xl:row-start-1 xl:block">
        <div className="sticky top-24 mt-24 grid grid-cols-[minmax(0,1fr)]">
          {slides.map((slide, i) => (
            <div key={i} data-on={slide.keys.includes(active) || undefined} className="slide [grid-area:1/1]">
              {slide.node}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function RailLink({ item, on, nested = false }: { item: RailItem; on: boolean; nested?: boolean }) {
  return (
    <a
      href={item.href}
      data-rail={item.key}
      aria-current={on ? "location" : undefined}
      className={`block py-0.5 transition-colors duration-200 hover:text-ink aria-[current]:text-ink ${
        nested ? "pl-7 text-xs leading-5 text-ink-2" : "pl-4 text-ink-2"
      }`}
    >
      {item.label}
    </a>
  );
}
