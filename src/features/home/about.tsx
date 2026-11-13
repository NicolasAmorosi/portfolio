import { getLocale, getTranslations } from "next-intl/server";
import { languages } from "@/content/profile";

export async function About() {
  const locale = await getLocale();
  const t = await getTranslations("about");

  return (
    <div className="space-y-4">
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
      <p>{t("p3")}</p>
      <p className="text-ui text-ink-2">
        {t("languages")}: {languages.map((l) => `${l.name[locale]} (${l.level[locale].toLowerCase()})`).join(", ")}.
      </p>
    </div>
  );
}
