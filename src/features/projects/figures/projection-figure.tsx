import { getTranslations } from "next-intl/server";
import { Figure } from "@/components/ui/figure";

function Window({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="overflow-hidden rounded-[6px] border border-ink">
        <div className="flex gap-1 border-b border-ink px-2 py-1.5" aria-hidden="true">
          <span className="size-1.5 rounded-full bg-ink-2" />
          <span className="size-1.5 rounded-full bg-ink-2" />
          <span className="size-1.5 rounded-full bg-ink-2" />
        </div>
        <div aria-hidden="true" className="aspect-[16/9]">{children}</div>
      </div>
      <p className="mt-2 text-ui font-semibold">{title}</p>
      <p className="text-sm text-ink-2">{note}</p>
    </div>
  );
}

function Link({ label, oneWay = false }: { label: string; oneWay?: boolean }) {
  return (
    <div className="flex items-center gap-2 text-ink-2 sm:flex-col sm:gap-1">
      <span aria-hidden="true" className="rotate-90 text-lg leading-none sm:rotate-0">{oneWay ? "→" : "⇄"}</span>
      <span className="font-mono text-xs sm:max-w-[7rem] sm:text-center">{label}</span>
    </div>
  );
}

export async function ProjectionFigure() {
  const t = await getTranslations("figures.projection");
  const pipeline = [".pptx", "LibreOffice", "PDF", "pdf.js", "WebP"];

  return (
    <Figure caption={t("caption")}>
      <div className="grid gap-5 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        <Window title={t("control")} note={t("controlNote")}>
          <div className="grid h-full content-center gap-1.5 bg-paper p-3">
            {[70, 90, 55, 80].map((w, i) => (
              <span key={i} className={i === 1 ? "h-2 rounded-full bg-mark ring-1 ring-ink/40" : "h-2 rounded-full bg-rule"} style={{ width: `${w}%` }} />
            ))}
          </div>
        </Window>
        <Link label={t("ipc")} />
        <Window title={t("main")} note={t("mainNote")}>
          <div className="grid h-full place-items-center bg-paper font-mono text-xs text-ink-2">SQLite</div>
        </Window>
        <Link label="ProjectionOutput" oneWay />
        <Window title={t("screen")} note={t("screenNote")}>
          <div className="grid h-full content-center justify-items-center gap-1.5 bg-mark-ink p-3">
            <span className="h-2 w-3/4 rounded-full bg-mark" />
            <span className="h-2 w-1/2 rounded-full bg-mark" />
          </div>
        </Window>
      </div>

      <div className="mt-8 border-t border-rule pt-5">
        <p className="text-sm text-ink-2">{t("pipeline")}</p>
        <ol className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-sm">
          {pipeline.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-[3px] border border-rule bg-paper px-2 py-0.5">{step}</span>
              {i < pipeline.length - 1 ? <span aria-hidden="true" className="text-ink-2">→</span> : null}
            </li>
          ))}
          <li className="text-ink-2">({t("cache")})</li>
        </ol>
      </div>
    </Figure>
  );
}
