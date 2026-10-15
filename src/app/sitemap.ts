import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { site } from "@/lib/site";

const paths = ["/", ...projects.map((project) => `/projects/${project.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (locale: (typeof routing.locales)[number], href: string) => site.url + getPathname({ locale, href });
  return paths.map((href) => ({
    url: url(routing.defaultLocale, href),
    lastModified: new Date(),
    alternates: { languages: Object.fromEntries(routing.locales.map((locale) => [locale, url(locale, href)])) },
  }));
}
