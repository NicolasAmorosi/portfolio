"use client";

import { useLocale } from "next-intl";
import { useLayoutEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const names = { en: "English", es: "Español" } as const;

/*
 * Switching language must keep the reader where they are. Both locales render
 * the same DOM structure, so the element under the top of the viewport is
 * remembered by its child-index path from <main> plus its offset, and put back
 * at that offset after the switch. (A raw scrollY would drift: Spanish is longer.)
 * Module scope survives the soft navigation that remounts this component.
 */
type Anchor = { path: number[]; top: number };
let pending: Anchor | null = null;

function captureAnchor(): Anchor | null {
  const main = document.getElementById("main");
  const headerBottom = document.querySelector("body > header")?.getBoundingClientRect().bottom ?? 0;
  // 60% across lands in the content column on wide screens, not the sticky margin.
  const hit = document.elementFromPoint(window.innerWidth * 0.6, headerBottom + 8);
  if (!main || !hit || !main.contains(hit) || hit === main) return null;

  const path: number[] = [];
  for (let node: Element = hit; node !== main; ) {
    const parent = node.parentElement;
    if (!parent) return null;
    path.unshift(Array.prototype.indexOf.call(parent.children, node));
    node = parent;
  }
  return { path, top: hit.getBoundingClientRect().top };
}

function restoreAnchor({ path, top }: Anchor): void {
  let node: Element | undefined = document.getElementById("main") ?? undefined;
  for (const index of path) node = node?.children[index];
  if (!node) return;
  window.scrollTo({ top: window.scrollY + node.getBoundingClientRect().top - top, behavior: "instant" });
}

export function LocaleSwitch({ label }: { label: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!pending) return;
    restoreAnchor(pending);
    pending = null;
  }, [locale]);

  return (
    <ul aria-label={label} className="flex items-center text-sm">
      {routing.locales.map((l) => (
        <li key={l}>
          <Link
            href={pathname}
            locale={l}
            hrefLang={l}
            lang={l}
            title={names[l]}
            scroll={false}
            onClick={() => {
              pending = l === locale ? null : captureAnchor();
            }}
            aria-current={l === locale ? "true" : undefined}
            className="grid h-8 min-w-9 place-items-center rounded-[3px] px-1.5 font-medium uppercase tracking-wide text-ink-2 transition-colors hover:text-ink aria-[current]:bg-mark aria-[current]:text-mark-ink"
          >
            {l}
          </Link>
        </li>
      ))}
    </ul>
  );
}
