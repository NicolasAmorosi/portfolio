import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";

const sections = ["work", "experience", "about", "contact"] as const;

export async function SiteHeader() {
  const t = await getTranslations("nav");

  return (
    <header className="header-rule no-print sticky top-0 z-30 border-b border-transparent bg-paper/90 backdrop-blur-md">
      <div className="shell">
        <div className="column flex h-14 items-center justify-between gap-6 xl:max-w-[72.5rem] 2xl:max-w-[83rem]">
          <Link href="/" aria-label={t("home")} className="header-name font-semibold whitespace-nowrap">
            {site.name}
          </Link>

          <div className="flex items-center gap-1 sm:gap-5">
            <nav aria-label={t("sections")} className="header-nav hidden md:block">
              <ul className="flex gap-5 text-sm">
                {sections.map((id) => (
                  <li key={id}>
                    <Link href={{ pathname: "/", hash: id }} className="text-ink-2 transition-colors hover:text-ink">
                      {t(id)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-1">
              <LocaleSwitch label={t("language")} />
              <ThemeToggle label={t("theme")} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
