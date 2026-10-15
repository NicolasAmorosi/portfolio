import { getLocale, getTranslations } from "next-intl/server";
import { otherWork } from "@/content/profile";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { formatYears } from "@/lib/dates";
import { MiniFigure } from "./mini-figure";

export async function ProjectIndex() {
  const locale = await getLocale();
  const t = await getTranslations("work");
  const common = await getTranslations("common");

  return (
    <>
      <ul className="border-t border-ink">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="group relative grid gap-6 border-b border-rule py-8 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ink sm:grid-cols-[1fr_10rem] sm:gap-10 lg:grid-cols-[1fr_13rem] lg:py-11"
          >
            <div className="min-w-0">
              <p className="flex flex-wrap gap-x-4 text-sm text-ink-2">
                <span>{project.client[locale]}</span>
                <span className="tabular-nums">{formatYears(project.period, common("present"))}</span>
              </p>
              <h3 className="type-heading mt-2 text-2xl sm:text-3xl">
                <Link
                  href={`/projects/${project.slug}`}
                  className="highlight after:absolute after:inset-0 focus-visible:outline-none"
                >
                  {project.title[locale]}
                </Link>
              </h3>
              <p className="mt-4 max-w-[60ch] text-ink-2">{project.summary[locale]}</p>
              <dl className="mt-6 flex flex-wrap gap-x-9 gap-y-4">
                {project.facts.slice(0, 3).map((fact) => (
                  <div key={fact.label.en} className="flex flex-col-reverse">
                    <dt className="text-xs text-ink-2">{fact.label[locale]}</dt>
                    <dd className="type-heading text-lg tabular-nums">{fact.value[locale]}</dd>
                  </div>
                ))}
              </dl>
              <p aria-hidden="true" className="mt-6 text-sm text-ink-2 underline decoration-rule underline-offset-4 group-hover:text-ink group-hover:decoration-ink">
                {t("read")}
              </p>
            </div>
            <MiniFigure kind={project.figure} className="hidden w-full self-center text-ink-2 sm:block" />
          </li>
        ))}
      </ul>

      <h3 className="type-heading mt-16 text-lg">{t("otherTitle")}</h3>
      <ul className="mt-6 grid gap-x-10 gap-y-9 sm:grid-cols-2">
        {otherWork.map((work) => (
          <li key={work.title.en} className="border-t border-rule pt-4">
            <p className="text-sm text-ink-2 tabular-nums">{formatYears(work.period, common("present"))}</p>
            <h4 className="mt-1 font-semibold">{work.title[locale]}</h4>
            <p className="mt-2 text-ui text-ink-2">{work.body[locale]}</p>
            <p className="mt-3 text-sm text-ink-2">{work.stack.join(", ")}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
