import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { DecodedName } from "./decoded-name";

// Name, role, what I do right now (linked to the case studies), availability
// and the ways to reach me: everything a recruiter needs before scrolling.
export async function Hero() {
  const t = await getTranslations("hero");
  const caseLink = (slug: string) =>
    function CaseLink(chunks: ReactNode) {
      return (
        <Link href={`/projects/${slug}`} className="link">
          {chunks}
        </Link>
      );
    };
  const links = [
    { href: `mailto:${site.email}`, label: site.email },
    { href: site.cv, label: t("cv") },
    { href: site.linkedin, label: "LinkedIn" },
    { href: site.github, label: "GitHub" },
  ];

  return (
    <section id="intro" data-spy="intro" aria-labelledby="intro-title" className="column pt-14 sm:pt-24">
      <h1 id="intro-title" className="text-xl tracking-[-0.02em]">
        <DecodedName name={site.name} />
      </h1>
      <p className="mt-2 text-ink-2">{t("role")}</p>

      <div className="mt-8 space-y-4">
        <p>
          {t.rich("now", { libretto: caseLink("libretto"), payables: caseLink("university-systems") })}
        </p>
        <p>
          {t.rich("before", { hr: caseLink("hr-platform"), himnova: caseLink("himnova-live") })}
        </p>
        <p>{t("status")}</p>
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm text-ink-2">
        {t.rich("note", {
          bytes: (chunks) => (
            <span lang="und" className="font-mono text-[0.95em] text-ink">
              {chunks}
            </span>
          ),
          fix: caseLink("legacy-migration"),
        })}
      </p>
    </section>
  );
}
