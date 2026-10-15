import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { getProject, projects, type Project } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { formatPeriod } from "@/lib/dates";
import { CaseFigure } from "./figures/case-figure";
import { MiniFigure } from "./mini-figure";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-rule pt-6">
      <h2 className="type-heading text-xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export async function CaseStudy({ project }: { project: Project }) {
  const locale = await getLocale();
  const t = await getTranslations("case");
  const common = await getTranslations("common");
  const next = projects[(projects.indexOf(project) + 1) % projects.length] ?? project;

  return (
    <article>
      <div aria-hidden="true" className="reading-progress no-print fixed inset-x-0 top-16 z-30 h-[3px] bg-mark" />

      <header className="shell grid gap-x-10 pt-8 pb-12 sm:pt-12 lg:grid-cols-12">
        <div className="lg:col-span-12">
          <Link href={{ pathname: "/", hash: "work" }} className="link text-sm text-ink-2">
            <span aria-hidden="true">← </span>
            {t("back")}
          </Link>
        </div>
        <div className="lg:col-span-9">
          <p className="mt-10 text-ui text-ink-2 sm:mt-14">{project.client[locale]}</p>
          <h1 className="type-display mt-3 text-[clamp(3.6rem,13vw,10rem)]">{project.title[locale]}</h1>
          <p className="mt-8 max-w-[40ch] text-lg leading-[1.35] sm:text-[1.75rem] sm:leading-[1.3]">{project.lede[locale]}</p>
        </div>
        <MiniFigure kind={project.figure} className="hidden w-full self-end pb-2 text-ink-2 lg:col-span-3 lg:block" />
      </header>

      <div className="shell grid gap-x-10 gap-y-12 pb-16 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <dl className="grid grid-cols-2 gap-x-6 border-t border-ink lg:sticky lg:top-24 lg:grid-cols-1">
            {[
              { label: t("role"), value: project.role[locale] },
              { label: t("period"), value: formatPeriod(project.period, locale, common("present")) },
              ...project.facts.map((fact) => ({ label: fact.label[locale], value: fact.value[locale] })),
            ].map((item) => (
              <div key={item.label} className="border-b border-rule py-3">
                <dt className="text-xs text-ink-2">{item.label}</dt>
                <dd className="mt-0.5 text-ui font-medium tabular-nums">{item.value}</dd>
              </div>
            ))}
            <div className="col-span-2 py-3 lg:col-span-1">
              <dt className="text-xs text-ink-2">{t("stack")}</dt>
              <dd className="mt-1 text-sm leading-relaxed">{project.stack.join(", ")}</dd>
            </div>
          </dl>
        </aside>

        <div className="min-w-0 space-y-14 lg:col-span-9 [&_p]:max-w-[66ch]">
          <Block title={t("problem")}>
            <div className="space-y-4">
              {project.problem[locale].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Block>

          <Block title={t("constraints")}>
            <ul className="max-w-[66ch] list-disc space-y-2 pl-5 marker:text-ink-2">
              {project.constraints[locale].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Block>

          <Block title={t("built")}>
            <div className="space-y-4">
              {project.built[locale].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Block>

          <Block title={t("hard")}>
            <div className="mb-10 [&_p]:max-w-none">
              <CaseFigure kind={project.figure} />
            </div>
            <div className="space-y-9">
              {project.hard.map((part) => {
                const related = part.seeAlso ? getProject(part.seeAlso) : undefined;
                return (
                  <div key={part.title.en}>
                    <h3 className="type-heading text-lg">{part.title[locale]}</h3>
                    <p className="mt-2">{part.body[locale]}</p>
                    {related ? (
                      <Link href={`/projects/${related.slug}`} className="link mt-3 inline-block">
                        {t("seeAlso", { title: related.title[locale] })}
                      </Link>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Block>

          <Block title={t("result")}>
            <ul className="max-w-[66ch] divide-y divide-rule border-y border-rule">
              {project.result[locale].map((item) => (
                <li key={item} className="py-3 text-md leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <p className="text-sm text-ink-2">{t("privacy")}</p>
        </div>
      </div>

      <nav aria-label={t("next")} className="shell no-print pb-16">
        <Link
          href={`/projects/${next.slug}`}
          className="group block border-t border-ink pt-6"
        >
          <span className="text-sm text-ink-2">{t("next")}</span>
          <span className="type-display mt-3 block text-[clamp(2.75rem,9vw,6.5rem)]">
            <span className="highlight">{next.title[locale]}</span>
          </span>
          <span className="mt-3 block text-ink-2">{next.client[locale]}</span>
        </Link>
      </nav>
    </article>
  );
}
