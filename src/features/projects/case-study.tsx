import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { getProject, projects, type Project } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { formatPeriod } from "@/lib/dates";
import { CaseFigure } from "./figures/case-figure";

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mt-14">
      <h2 id={`${id}-title`} className="text-md">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4">
      {items.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-ink-2">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export async function CaseStudy({ project }: { project: Project }) {
  const locale = await getLocale();
  const t = await getTranslations("case");
  const common = await getTranslations("common");
  const next = projects[(projects.indexOf(project) + 1) % projects.length] ?? project;
  const screenshot = project.screenshot;
  const specs = [
    { label: t("role"), value: project.role[locale] },
    ...project.facts.map((fact) => ({ label: fact.label[locale], value: fact.value[locale] })),
    { label: t("stack"), value: project.stack.join(", ") },
  ];

  return (
    <article>
      <header className="shell">
        <div className="column pt-10 sm:pt-16">
          <Link href={{ pathname: "/", hash: "work" }} className="link text-sm text-ink-2">
            <span aria-hidden="true">← </span>
            {t("back")}
          </Link>
          <p className="mt-10 text-sm text-ink-2">
            {project.client[locale]} · <span className="tabular-nums">{formatPeriod(project.period, locale, common("present"))}</span>
          </p>
          <h1 className="mt-2 text-xl tracking-[-0.02em]">{project.title[locale]}</h1>
          <p className="mt-5 text-md">{project.lede[locale]}</p>
          {project.openSource ? (
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
              {[
                { href: project.openSource.repo, label: t("repo") },
                { href: `${project.openSource.repo}/releases/latest`, label: t("download") },
                { href: project.openSource.website, label: t("website") },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}

          <dl className="mt-10 border-t border-rule text-ui">
            {specs.map((spec) => (
              <div key={spec.label} className="grid gap-x-6 border-b border-rule py-2.5 sm:grid-cols-[11rem_1fr]">
                <dt className="text-ink-2">{spec.label}</dt>
                <dd className="tabular-nums">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {screenshot ? (
        <figure className="shell mt-12">
          <div className="mx-auto max-w-[60rem]">
            {(["light", "dark"] as const).map((scheme) => (
              <Image
                key={scheme}
                src={screenshot.image[locale][scheme]}
                alt={screenshot.alt[locale]}
                sizes="(min-width: 1040px) 960px, 100vw"
                className={`only-${scheme} h-auto w-full rounded-[6px] border border-rule`}
              />
            ))}
            {/* Same words as the alt text: hidden from screen readers so it isn't read twice. */}
            <figcaption aria-hidden="true" className="column mt-3 text-sm text-ink-2">
              {screenshot.alt[locale]}
            </figcaption>
          </div>
        </figure>
      ) : null}

      <div className="shell">
        <div className="column pb-6">
          <Block id="problem" title={t("problem")}>
            <Paragraphs items={project.problem[locale]} />
          </Block>

          <Block id="constraints" title={t("constraints")}>
            <Bullets items={project.constraints[locale]} />
          </Block>

          <Block id="built" title={t("built")}>
            <Paragraphs items={project.built[locale]} />
          </Block>

          <Block id="hard" title={t("hard")}>
            {/* Figures were drawn for ~900px: on wide screens they step out of the text column. */}
            <div className="lg:-mx-32">
              <CaseFigure kind={project.figure} />
            </div>
            <div className="mt-10 space-y-8">
              {project.hard.map((part) => {
                const related = part.seeAlso ? getProject(part.seeAlso) : undefined;
                return (
                  <div key={part.title.en}>
                    <h3 className="font-semibold">{part.title[locale]}</h3>
                    <p className="mt-1.5">{part.body[locale]}</p>
                    {related ? (
                      <Link href={`/projects/${related.slug}`} className="link mt-2 inline-block">
                        {t("seeAlso", { title: related.title[locale] })}
                      </Link>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Block>

          <Block id="result" title={t("result")}>
            <Bullets items={project.result[locale]} />
          </Block>

          <p className="mt-12 text-sm text-ink-2">{t(project.openSource ? "openSource" : "privacy")}</p>
        </div>
      </div>

      <nav aria-label={t("next")} className="shell no-print">
        <div className="column mt-16 border-t border-rule pt-5">
          <p className="text-sm text-ink-2">{t("next")}</p>
          <Link href={`/projects/${next.slug}`} className="link mt-1 inline-block font-semibold">
            {next.title[locale]} <span aria-hidden="true">→</span>
          </Link>
          <p className="mt-1 text-ui text-ink-2">{next.summary[locale]}</p>
        </div>
      </nav>
    </article>
  );
}
