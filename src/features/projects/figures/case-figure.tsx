import type { FigureKey } from "@/content/projects";
import { ApprovalFigure } from "./approval-figure";
import { ArchaeologyFigure } from "./archaeology-figure";
import { EncodingFigure } from "./encoding-figure";
import { ProjectionFigure } from "./projection-figure";
import { ScopesFigure } from "./scopes-figure";

const figures: Record<FigureKey, () => React.ReactNode | Promise<React.ReactNode>> = {
  scopes: ScopesFigure,
  encoding: EncodingFigure,
  approval: ApprovalFigure,
  archaeology: ArchaeologyFigure,
  projection: ProjectionFigure,
};

export function CaseFigure({ kind }: { kind: FigureKey }) {
  const Component = figures[kind];
  return <Component />;
}
