import { getTranslations } from "next-intl/server";
import { Figure } from "@/components/ui/figure";

function Card({ title, note, strong = false }: { title: string; note?: string; strong?: boolean }) {
  return (
    <div className={strong ? "rounded-[6px] bg-ink px-4 py-3 text-paper" : "rounded-[6px] border border-rule bg-paper px-4 py-3"}>
      <p className="text-ui leading-snug font-semibold">{title}</p>
      {note ? <p className={strong ? "mt-0.5 text-sm text-paper/75" : "mt-0.5 text-sm text-ink-2"}>{note}</p> : null}
    </div>
  );
}

function Arrow() {
  return (
    <span aria-hidden="true" className="grid place-items-center text-ink-2 lg:rotate-0">
      <span className="rotate-90 lg:rotate-0">→</span>
    </span>
  );
}

export async function ArchaeologyFigure() {
  const t = await getTranslations("figures.archaeology");

  return (
    <Figure caption={t("caption")}>
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_0.9fr_auto_1fr] lg:items-center">
        <div>
          <p className="mb-2 text-sm text-ink-2">{t("read")}</p>
          <div className="grid gap-2">
            <Card title={t("history")} note={t("historyNote")} />
            <Card title={t("schema")} note={t("schemaNote")} />
            <Card title={t("sources")} note={t("sourcesNote")} />
          </div>
        </div>
        <Arrow />
        <Card title={t("map")} strong />
        <Arrow />
        <div>
          <p className="mb-2 text-sm text-ink-2">{t("move")}</p>
          <ol className="grid gap-2">
            <li><Card title={t("staging")} note={t("stagingNote")} /></li>
            <li><Card title={t("transform")} note={t("transformNote")} /></li>
            <li><Card title={t("reconcile")} note={t("reconcileNote")} /></li>
          </ol>
          <p className="mt-2 font-mono text-sm">PostgreSQL 18</p>
        </div>
      </div>
    </Figure>
  );
}
