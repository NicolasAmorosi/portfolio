import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { nameImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = site.name;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params;
  const locale = routing.locales.find((l) => l === requested) ?? routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });
  return nameImage(`${t("jobTitle")}. TypeScript, Next.js, NestJS, PostgreSQL.`);
}
