import type { FigureKey } from "@/content/projects";

// Small line drawings for the work index. Ink lines on paper; the accent
// parts turn to highlighter when the row (.group) is hovered.
const accent = "fill-ink transition-colors duration-300 group-hover:fill-mark";
const line = "fill-none stroke-current";

function Scopes() {
  // 55 squares: one per data model in Libretto.
  return (
    <>
      {Array.from({ length: 55 }, (_, i) => {
        const col = i % 11;
        const row = Math.floor(i / 11);
        const lit = (col === 3 || col === 7) && row < 4;
        return (
          <rect
            key={i}
            x={13 + col * 20}
            y={28 + row * 20}
            width="14"
            height="14"
            rx="2"
            className={lit ? accent : `${line} stroke-[1.25]`}
          />
        );
      })}
    </>
  );
}

function Encoding() {
  return (
    <>
      <text x="20" y="40" className="fill-current font-mono text-[13px]">
        C3 A1
      </text>
      <text x="20" y="112" className="fill-current text-[64px] font-extrabold [font-stretch:62%]">
        Ã¡
      </text>
      <path d="M16 92 H98" className={`${line} stroke-[2]`} />
      <path d="M114 88 H146 M138 80 L146 88 L138 96" className={`${line} stroke-[1.5]`} />
      <rect x="160" y="54" width="54" height="64" rx="3" className={accent} />
      <text x="168" y="112" className="fill-paper text-[64px] font-extrabold [font-stretch:62%] transition-colors duration-300 group-hover:fill-mark-ink">
        á
      </text>
    </>
  );
}

function Approval() {
  const steps = [
    [34, 118],
    [88, 94],
    [142, 70],
    [196, 46],
  ] as const;
  return (
    <>
      <path d="M34 118 L88 94 L142 70 L196 46" className={`${line} stroke-[1.5]`} strokeDasharray="4 4" />
      {steps.map(([x, y], i) => (
        <g key={x}>
          <circle cx={x} cy={y} r="11" className={i === steps.length - 1 ? accent : `${line} fill-paper-2 stroke-[1.5]`} />
          <rect x={x - 7} y={y + 18} width="14" height="6" rx="1" className={`${line} stroke-[1.25]`} />
        </g>
      ))}
    </>
  );
}

function Archaeology() {
  const widths = [70, 52, 84, 40, 66, 90, 48, 74, 58];
  return (
    <>
      {widths.map((w, i) => (
        <rect key={i} x={i % 3 === 0 ? 18 : 28} y={30 + i * 11} width={w} height="4" rx="2" className="fill-current" />
      ))}
      <path d="M128 75 H156 M148 67 L156 75 L148 83" className={`${line} stroke-[1.5]`} />
      {Array.from({ length: 16 }, (_, i) => (
        <rect
          key={i}
          x={168 + (i % 4) * 14}
          y={47 + Math.floor(i / 4) * 14}
          width="14"
          height="14"
          className={i < 4 ? accent : `${line} stroke-[1.25]`}
        />
      ))}
    </>
  );
}

function Projection() {
  return (
    <>
      <rect x="16" y="52" width="78" height="56" rx="4" className={`${line} stroke-[1.5]`} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="26" y={63 + i * 10} width={i === 1 ? 58 : 44} height="4" rx="2" className={i === 1 ? accent : "fill-current"} />
      ))}
      <path d="M100 80 H124" className={`${line} stroke-[1.5]`} strokeDasharray="3 4" />
      <rect x="130" y="34" width="96" height="70" rx="4" className={`${line} stroke-[1.5]`} />
      <rect x="150" y="60" width="56" height="5" rx="2.5" className={accent} />
      <rect x="158" y="72" width="40" height="5" rx="2.5" className={accent} />
      <path d="M166 104 V116 M150 116 H194" className={`${line} stroke-[1.5]`} />
    </>
  );
}

const drawings: Record<FigureKey, () => React.JSX.Element> = {
  scopes: Scopes,
  encoding: Encoding,
  approval: Approval,
  archaeology: Archaeology,
  projection: Projection,
};

export function MiniFigure({ kind, className }: { kind: FigureKey; className?: string }) {
  const Drawing = drawings[kind];
  return (
    <svg viewBox="0 0 240 150" aria-hidden="true" className={className}>
      <Drawing />
    </svg>
  );
}
