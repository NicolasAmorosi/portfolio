import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { CaseStudy } from "@/features/projects/case-study";
import { routing } from "@/i18n/routing";
import { alternatesFor } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !hasLocale(routing.locales, locale)) return {};
  return {
    title: project.title[locale],
    description: project.summary[locale],
    alternates: alternatesFor(locale, `/projects/${slug}`),
    openGraph: { type: "article", title: project.title[locale], description: project.summary[locale] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  return <CaseStudy project={project} />;
}
