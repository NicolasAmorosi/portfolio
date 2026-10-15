import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LocaleSwitch } from "./locale-switch";
import { ThemeToggle } from "./theme-toggle";

const sections = ["work", "experience", "about", "contact"] as const;

export async function SiteHeader() {
  const t = await getTranslations("nav");

  return (
    <header className="header-rule no-print sticky top-0 z-30 border-b border-transparent bg-paper/90 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link href="/" aria-label={t("home")} className="group type-heading text-md whitespace-nowrap">
          Nicol
          <span className="highlight">
            á
          </span>
          s Amorosi
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav aria-label={t("sections")} className="hidden md:block">
            <ul className="flex gap-6 text-ui">
              {sections.map((id) => (
                <li key={id}>
                  <Link href={{ pathname: "/", hash: id }} className="text-ink-2 transition-colors hover:text-ink">
                    {t(id)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1 md:border-l md:border-rule md:pl-4">
            <LocaleSwitch label={t("language")} />
            <ThemeToggle label={t("theme")} />
          </div>
        </div>
      </div>
    </header>
  );
}
