import { getLocale, getTranslations } from "next-intl/server";
import { languages } from "@/content/profile";

export async function About() {
  const locale = await getLocale();
  const t = await getTranslations("about");

  return (
    <div className="grid gap-x-10 gap-y-10 xl:grid-cols-[1fr_16rem]">
      <div className="max-w-[62ch] space-y-5 text-md leading-[1.55]">
        <p>{t("p1")}</p>
        <p>{t("p2")}</p>
        <p className="text-ink-2">{t("p3")}</p>
      </div>
      <div>
        <h3 className="text-sm text-ink-2">{t("languages")}</h3>
        <dl className="mt-3">
          {languages.map((language) => (
            <div key={language.name.en} className="flex justify-between gap-4 border-t border-rule py-2.5">
              <dt className="font-medium">{language.name[locale]}</dt>
              <dd className="text-right text-sm leading-6 text-ink-2">{language.level[locale]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
