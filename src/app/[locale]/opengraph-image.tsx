import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { nameImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

// Next appends a hash of this file's source to the image URL. Social networks
// cache images by URL, so when the image's design changes, change this file
// too (or the old picture keeps showing on LinkedIn and friends).
export const size = ogSize;
export const contentType = "image/png";
export const alt = `${site.name}, full-stack engineer`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: requested } = await params;
  const locale = routing.locales.find((l) => l === requested) ?? routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });
  return nameImage(`${t("jobTitle")}. TypeScript, Next.js, NestJS, PostgreSQL.`);
}
