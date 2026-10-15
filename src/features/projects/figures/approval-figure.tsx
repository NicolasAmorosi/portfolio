import { getTranslations } from "next-intl/server";
import { Figure } from "@/components/ui/figure";

// A real sequence, so it is an ordered list: each step climbs one level.
export async function ApprovalFigure() {
  const t = await getTranslations("figures.approval");
  const steps = [
    { title: t("requester"), note: t("level", { level: 3 }), snapshot: false, accent: false },
    { title: t("approver", { level: 2 }), note: t("snapshot"), snapshot: true, accent: false },
    { title: t("approver", { level: 1 }), note: t("snapshot"), snapshot: true, accent: false },
    { title: t("final"), note: t("finalNote"), snapshot: true, accent: true },
    { title: t("effect"), note: t("effectNote"), snapshot: false, accent: false },
  ];

  return (
    <Figure caption={t("caption")}>
      <ol className="relative grid gap-5 border-l border-dashed border-ink-2/60 pl-6 sm:grid-cols-5 sm:items-end sm:gap-3 sm:border-l-0 sm:pl-0">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="relative sm:mb-[var(--rise)] sm:border-t sm:border-dashed sm:border-ink-2/60 sm:pt-4"
            style={{ "--rise": `${(i < 4 ? i : 3) * 1.75}rem` } as React.CSSProperties}
          >
            <span
              aria-hidden="true"
              className={`absolute top-1.5 -left-[1.95rem] size-3.5 rounded-full border border-ink sm:-top-[0.5rem] sm:left-0 ${
                step.accent ? "bg-mark" : i === 4 ? "bg-ink" : "bg-paper-2"
              }`}
            />
            <p className="text-ui leading-snug font-semibold">{step.title}</p>
            <p className="mt-1 text-sm leading-snug text-ink-2">
              {step.snapshot ? (
                <span aria-hidden="true" className="mr-1.5 inline-block size-2 rounded-[1px] border border-ink-2 align-middle" />
              ) : null}
              {step.note}
            </p>
          </li>
        ))}
      </ol>
    </Figure>
  );
}
