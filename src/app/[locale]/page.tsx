import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ScrollSpy, type RailItem, type Slide } from "@/components/ui/scroll-spy";
import { Section } from "@/components/ui/section";
import { roles } from "@/content/experience";
import { projects } from "@/content/projects";
import { Experience } from "@/features/experience/experience";
import { TimelinePlate } from "@/features/experience/timeline-plate";
import { About } from "@/features/home/about";
import { ClockPlate } from "@/features/home/clock-plate";
import { Contact } from "@/features/home/contact";
import { GlyphPlate } from "@/features/home/glyph-plate";
import { Hero } from "@/features/home/hero";
import { Principles } from "@/features/home/principles";
import { StackList } from "@/features/home/stack-list";
import { StackPlate } from "@/features/home/stack-plate";
import { ProjectIndex } from "@/features/projects/project-index";
import { ProjectPlate } from "@/features/projects/project-plate";
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

  // Wide screens: the rail and the plates that follow the reading (ScrollSpy).
  const rail: RailItem[] = [
    {
      key: "work",
      href: "#work",
      label: t("work.title"),
      children: projects.map((project) => ({ key: `work:${project.slug}`, href: `#project-${project.slug}`, label: project.title[locale] })),
    },
    ...(["experience", "principles", "stack", "about", "contact"] as const).map((id) => ({ key: id, href: `#${id}`, label: t(`${id}.title`) })),
  ];
  const slides: Slide[] = [
    { keys: ["intro"], node: <GlyphPlate /> },
    ...projects.map((project, i) => ({
      keys: i === 0 ? ["work", `work:${project.slug}`] : [`work:${project.slug}`],
      node: <ProjectPlate project={project} label={`/projects/${project.slug}`} />,
    })),
    ...roles.map((_, i) => ({ keys: i === 0 ? ["experience", "experience:0"] : [`experience:${i}`], node: <TimelinePlate active={i} /> })),
    { keys: ["experience:edu"], node: <TimelinePlate active="edu" /> },
    { keys: ["stack"], node: <StackPlate /> },
    { keys: ["contact"], node: <ClockPlate /> },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }}
      />
      <div className="shell">
        <ScrollSpy label={t("nav.sections")} rail={rail} slides={slides}>
          <Hero />
          <Section id="work" title={t("work.title")}>
            <ProjectIndex />
          </Section>
          <Section id="experience" title={t("experience.title")}>
            <Experience />
          </Section>
          <Section id="principles" title={t("principles.title")}>
            <Principles />
          </Section>
          <Section id="stack" title={t("stack.title")}>
            <StackList />
          </Section>
          <Section id="about" title={t("about.title")}>
            <About />
          </Section>
          <Section id="contact" title={t("contact.title")}>
            <Contact />
          </Section>
        </ScrollSpy>
      </div>
    </>
  );
}
