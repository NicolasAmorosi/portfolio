import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  aside?: ReactNode;
  children: ReactNode;
};

// The page grid: a margin column (title + note, sticky on wide screens) and
// a content column. Every home section uses it, so rhythm stays identical.
export function Section({ id, title, aside, children }: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className="shell py-14 sm:py-20">
      <div className="grid gap-x-10 gap-y-8 border-t border-rule pt-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <h2 id={headingId} className="type-heading text-xl">
              {title}
            </h2>
            {aside ? <p className="mt-3 max-w-[36ch] text-sm text-ink-2">{aside}</p> : null}
          </div>
        </div>
        <div className="min-w-0 lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
