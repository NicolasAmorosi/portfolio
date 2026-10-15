import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { Experience } from "@/features/experience/experience";
import { About } from "@/features/home/about";
import { Contact } from "@/features/home/contact";
import { Hero } from "@/features/home/hero";
import { Principles } from "@/features/home/principles";
import { StackList } from "@/features/home/stack-list";
import { ProjectIndex } from "@/features/projects/project-index";
import { routing } from "@/i18n/routing";
import { alternatesFor } from "@/lib/metadata";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return { alternates: alternatesFor(locale, "/") };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations();
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: t("meta.jobTitle"),
    nationality: "Italian",
    address: { "@type": "PostalAddress", addressRegion: "Entre Ríos", addressCountry: "AR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Adventista del Plata" },
    knowsLanguage: ["es", "en", "it", "pt"],
    knowsAbout: ["TypeScript", "Next.js", "React", "NestJS", "PostgreSQL", "MySQL", "Legacy data migration", "Access control"],
    sameAs: [site.linkedin, site.github],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Section id="work" title={t("work.title")} aside={t("work.aside")}>
        <ProjectIndex />
      </Section>
      <Section id="experience" title={t("experience.title")} aside={t("experience.aside")}>
        <Experience />
      </Section>
      <Section id="principles" title={t("principles.title")} aside={t("principles.aside")}>
        <Principles />
      </Section>
      <Section id="stack" title={t("stack.title")} aside={t("stack.aside")}>
        <StackList />
      </Section>
      <Section id="about" title={t("about.title")}>
        <About />
      </Section>
      <Section id="contact" title={t("contact.title")}>
        <Contact />
      </Section>
    </>
  );
}
