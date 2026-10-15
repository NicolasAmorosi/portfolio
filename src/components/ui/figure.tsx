import type { ReactNode } from "react";

// Frame for diagrams and interactive demos: a raised plate with its caption.
export function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="overflow-hidden rounded-[10px] border border-rule bg-paper-2">
      <div className="p-4 sm:p-7">{children}</div>
      <figcaption className="border-t border-rule px-4 py-3 text-sm text-ink-2 sm:px-7">{caption}</figcaption>
    </figure>
  );
}
