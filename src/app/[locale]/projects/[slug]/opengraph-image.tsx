import { getTranslations } from "next-intl/server";
import { getProject, projects } from "@/content/projects";
import { routing } from "@/i18n/routing";
import { caseImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const size = ogSize;
export const contentType = "image/png";
export const alt = site.name;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: requested, slug } = await params;
  const locale = routing.locales.find((l) => l === requested) ?? routing.defaultLocale;
  const project = getProject(slug);
  const t = await getTranslations({ locale, namespace: "meta" });
  if (!project) return caseImage({ client: "", title: site.name, footer: t("jobTitle") });
  return caseImage({ client: project.client[locale], title: project.title[locale], footer: t("jobTitle") });
}
