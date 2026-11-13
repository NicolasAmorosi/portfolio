import type { ReactNode } from "react";

// Frame for diagrams and interactive demos, with the caption underneath.
export function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure>
      <div className="rounded-[6px] border border-rule bg-paper-2 p-4 sm:p-6">{children}</div>
      <figcaption className="mt-3 text-sm text-ink-2">{caption}</figcaption>
    </figure>
  );
}
