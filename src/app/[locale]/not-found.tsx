import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="shell">
      <div className="column pt-16 pb-8 sm:pt-24">
        <p aria-hidden="true" className="font-mono text-xl">
          4<span className="bg-mark px-[0.04em] text-mark-ink">�</span>4
        </p>
        <h1 className="mt-6 text-md">{t("title")}</h1>
        <p className="mt-2 text-ink-2">{t("body")}</p>
        <Link href="/" className="link mt-6 inline-block">
          {t("home")}
        </Link>
      </div>
    </section>
  );
}
