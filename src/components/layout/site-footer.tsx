import { getTranslations } from "next-intl/server";
import { site } from "@/lib/site";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="shell no-print">
      <div className="column mt-24 xl:max-w-[72.5rem] 2xl:max-w-[83rem] flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-rule pt-5 pb-10 text-sm text-ink-2">
        <p>
          {t("rights", { year })} · {t("colophon")}{" "}
          <a href={site.repo} className="link">
            {t("source")}
          </a>
        </p>
        <a href="#top" className="link">
          {t("top")}
        </a>
      </div>
    </footer>
  );
}
