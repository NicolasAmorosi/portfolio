import type { ReactNode } from "react";

// Every home section: a small label, then its content, in the reading column.
export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const headingId = `${id}-title`;
  return (
    <section id={id} data-spy={id} aria-labelledby={headingId} className="column mt-20 sm:mt-24">
      <h2 id={headingId} className="text-ui font-medium text-ink-2">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}
