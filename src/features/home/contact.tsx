import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";
import { CopyEmail } from "./copy-email";

export async function Contact() {
  const t = await getTranslations("contact");
  const links = [
    { href: site.linkedin, label: "LinkedIn" },
    { href: site.github, label: "GitHub" },
    { href: site.cv, label: t("cv") },
  ];

  return (
    <div className="space-y-4">
      <p>{t("lead")}</p>
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <a href={`mailto:${site.email}`} className="link text-md font-semibold">
          {site.email}
        </a>
        <CopyEmail email={site.email} label={t("copy")} done={t("copied")} />
      </p>
      <ul className="flex flex-wrap gap-x-5 gap-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="link">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="text-ui text-ink-2">{t("hours")}</p>
    </div>
  );
}
