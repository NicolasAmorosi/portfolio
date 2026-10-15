import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="shell no-print pt-6 pb-10">
      <div className="grid gap-6 border-t border-rule pt-6 text-sm text-ink-2 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-1">
          <p>{t("rights", { year })}</p>
          <p>{t("colophon")}</p>
        </div>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {(["work", "experience", "about", "contact"] as const).map((id) => (
            <li key={id}>
              <Link href={{ pathname: "/", hash: id }} className="link">
                {nav(id)}
              </Link>
            </li>
          ))}
          <li>
            <a href={site.github} className="link">
              GitHub
            </a>
          </li>
          <li>
            <a href="#top" className="link">
              {t("top")}
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
