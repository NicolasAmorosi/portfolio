import type { ReactNode } from "react";

// A blueprint sheet for the side panel: figure label, drawing, title, one note.
export function Plate({ label, title, note, children }: { label: string; title: string; note?: string; children: ReactNode }) {
  return (
    <div className="plate-grid overflow-hidden rounded-[6px] text-plan-line">
      <p className="px-4 pt-3 font-mono text-xs text-plan-line/70">{label}</p>
      <div className="px-4 pt-3 pb-1">{children}</div>
      <div className="mt-3 border-t border-plan-line/20 px-4 py-3">
        <p className="font-semibold">{title}</p>
        {note ? <p className="mt-1 text-sm leading-snug text-plan-line/75">{note}</p> : null}
      </div>
    </div>
  );
}
