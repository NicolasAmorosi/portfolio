import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="shell pt-16 pb-24 sm:pt-24">
      <p aria-hidden="true" className="type-display text-[clamp(6rem,30vw,16rem)]">
        4<span className="rounded-[0.06em] bg-mark px-[0.04em] text-mark-ink">�</span>4
      </p>
      <h1 className="type-heading mt-8 text-2xl">{t("title")}</h1>
      <p className="mt-3 max-w-[44ch] text-md text-ink-2">{t("body")}</p>
      <Link href="/" className="link mt-6 inline-block text-ui">
        {t("home")}
      </Link>
    </section>
  );
}
