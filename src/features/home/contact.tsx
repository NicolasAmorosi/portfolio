import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";
import { CopyEmail } from "./copy-email";
import { LocalClock } from "./local-clock";

export async function Contact() {
  const t = await getTranslations("contact");
  const links = [
    { href: site.linkedin, label: t("linkedin") },
    { href: site.github, label: t("github") },
    { href: site.cv, label: t("cv") },
  ];

  return (
    <div className="@container">
      <p className="max-w-[44ch] text-lg">{t("lead")}</p>
      <a
        href={`mailto:${site.email}`}
        className="group type-display mt-6 inline-block text-[min(10.6cqi,5.75rem)] whitespace-nowrap"
      >
        <span className="highlight">{site.email}</span>
      </a>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <CopyEmail email={site.email} label={t("copy")} done={t("copied")} />
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="link text-ui">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10 max-w-[60ch] space-y-1 border-t border-rule pt-4 text-ui">
        <LocalClock />
        <p className="text-ink-2">{t("overlap")}</p>
      </div>
    </div>
  );
}
