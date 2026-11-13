import { getLocale, getTranslations } from "next-intl/server";
import { otherWork } from "@/content/profile";
import { projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { formatYears } from "@/lib/dates";

// Work as a dated list: title and client, one line on what it is, one line of
// numbers. The whole row is the link; detail lives on the case study page.
export async function ProjectIndex() {
  const locale = await getLocale();
  const t = await getTranslations("work");
  const common = await getTranslations("common");

  return (
    <>
      <ul className="border-t border-rule">
        {projects.map((project) => (
          <li
            key={project.slug}
            id={`project-${project.slug}`}
            data-spy={`work:${project.slug}`}
            className="group relative border-b border-rule py-5 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-ink"
          >
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h3 className="font-semibold">
                <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                  <span className="highlight">{project.title[locale]}</span>
                </Link>
              </h3>
              <span className="text-sm text-ink-2">{project.client[locale]}</span>
              <span className="text-sm text-ink-2 tabular-nums sm:ml-auto">{formatYears(project.period, common("present"))}</span>
            </div>
            <p className="mt-1.5 text-ui">{project.summary[locale]}</p>
            <p className="mt-2 text-sm text-ink-2 tabular-nums">{project.proof[locale]}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-ink-2">{t("note")}</p>

      <h3 id="also-built" data-spy="work:also" className="mt-14 text-ui font-medium text-ink-2">
        {t("otherTitle")}
      </h3>
      <ul aria-labelledby="also-built" className="mt-4 border-t border-rule">
        {otherWork.map((work) => (
          <li key={work.title.en} className="border-b border-rule py-4">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <h4 className="font-medium">{work.title[locale]}</h4>
              <span className="ml-auto text-sm text-ink-2 tabular-nums">{formatYears(work.period, common("present"))}</span>
            </div>
            <p className="mt-1 text-ui text-ink-2">{work.body[locale]}</p>
            <p className="mt-1.5 text-sm text-ink-2">{work.stack.join(", ")}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
