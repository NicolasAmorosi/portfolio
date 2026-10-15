import type { Period } from "@/lib/dates";
import type { Localized } from "./localized";

// Source: .claude/knowledge/{profile,skills,projects}.md.

export const principles: { title: Localized; body: Localized }[] = [
  {
    title: { en: "Permissions, not booleans", es: "Permisos, no booleanos" },
    body: {
      en: "Access is a registry of permissions with scopes — own, assigned, all — checked by the server on every request. The interface hides what you can’t do; the API is what stops you.",
      es: "El acceso es un registro de permisos con alcances —propio, asignado, todo— que el servidor verifica en cada request. La interfaz oculta lo que no podés hacer; quien te frena es la API.",
    },
  },
  {
    title: { en: "Tests pin the business rules", es: "Los tests fijan las reglas del negocio" },
    body: {
      en: "Grades, credits, approval chains, balances: the rules people depend on get tests first. Libretto runs about 1,200 of them; the HR platform about 520.",
      es: "Notas, créditos, cadenas de aprobación, saldos: las reglas de las que depende la gente se testean primero. Libretto corre alrededor de 1.200 tests; la plataforma de RR. HH., unos 520.",
    },
  },
  {
    title: { en: "Migrations with a gate", es: "Migraciones con control" },
    body: {
      en: "Legacy data moves through previews, idempotent syncs and quality gates that refuse to write rather than write something wrong.",
      es: "Los datos legacy pasan por vistas previas, sincronizaciones idempotentes y controles de calidad que prefieren no escribir antes que escribir algo mal.",
    },
  },
  {
    title: { en: "Docs the next developer can use", es: "Documentación que sirva al siguiente" },
    body: {
      en: "Every repository carries its own knowledge base: decisions, gotchas, runbooks, handoffs. Libretto’s has 146 documents.",
      es: "Cada repositorio lleva su propia base de conocimiento: decisiones, trampas, procedimientos, traspasos. La de Libretto tiene 146 documentos.",
    },
  },
  {
    title: { en: "Strict types, shared contracts", es: "Tipos estrictos, contratos compartidos" },
    body: {
      en: "TypeScript in its strictest settings, and one contracts package shared by API and interface — a breaking change fails the build, not the user.",
      es: "TypeScript en su configuración más estricta y un paquete de contratos compartido entre API e interfaz: un cambio incompatible rompe el build, no al usuario.",
    },
  },
  {
    title: { en: "AI with guardrails", es: "IA con barandas" },
    body: {
      en: "I work with Claude Code every day — custom skills, MCP servers, a knowledge base per repository. It makes me faster; it doesn’t decide what ships.",
      es: "Trabajo con Claude Code todos los días: skills propios, servidores MCP, una base de conocimiento por repositorio. Me hace más rápido; no decide qué sale a producción.",
    },
  },
];

export const stack: { area: Localized; items: string[] }[] = [
  { area: { en: "Languages", es: "Lenguajes" }, items: ["TypeScript", "JavaScript", "SQL", "Python", "Ruby", "Bash"] },
  {
    area: { en: "Interface", es: "Interfaz" },
    items: ["Next.js (App Router, RSC)", "React 19", "Tailwind CSS", "shadcn/ui", "next-intl"],
  },
  {
    area: { en: "Back end", es: "Back end" },
    items: ["NestJS", "Node.js", "Express", "Ruby on Rails", "Prisma", "TypeORM", "Drizzle"],
  },
  { area: { en: "Data", es: "Datos" }, items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
  {
    area: { en: "Identity", es: "Identidad" },
    items: ["JWT + refresh rotation", "CSRF", "Microsoft Entra ID", "NextAuth", "Scoped RBAC", "Audit logs"],
  },
  {
    area: { en: "Infrastructure", es: "Infraestructura" },
    items: ["Docker", "AWS (EC2, S3)", "GitHub Actions", "Vercel", "Google Cloud Build", "Linux"],
  },
  { area: { en: "Testing", es: "Testing" }, items: ["Jest", "Vitest", "Playwright"] },
  {
    area: { en: "Integrations", es: "Integraciones" },
    items: ["Microsoft Graph", "Stripe", "Excel & PDF generation", "Electron"],
  },
];

export const languages: { name: Localized; level: Localized }[] = [
  { name: { en: "Spanish", es: "Español" }, level: { en: "Native", es: "Nativo" } },
  { name: { en: "English", es: "Inglés" }, level: { en: "Full professional", es: "Profesional completo" } },
  { name: { en: "Italian", es: "Italiano" }, level: { en: "Professional working", es: "Profesional de trabajo" } },
  { name: { en: "Portuguese", es: "Portugués" }, level: { en: "Limited working", es: "Intermedio" } },
];

// Smaller work without a case study. Disclosure levels per projects.md:
// the real-estate SaaS is never named.
export const otherWork: { title: Localized; body: Localized; period: Period; stack: string[] }[] = [
  {
    title: { en: "Dental laboratory management", es: "Gestión de un laboratorio dental" },
    body: {
      en: "Clients, monthly billing, payments and a credit ledger for Laboratorio Dental Valdense, with PDF summaries shared on WhatsApp through signed links generated on demand. Co-developed the 2023 version and led its 2026 migration to Next.js.",
      es: "Clientes, facturación mensual, pagos y un libro de saldos a favor para el Laboratorio Dental Valdense, con resúmenes en PDF compartidos por WhatsApp mediante links firmados que se generan al momento. Co-desarrollé la versión 2023 y lideré su migración 2026 a Next.js.",
    },
    period: { from: "2023-10" },
    stack: ["Next.js", "MongoDB", "Vercel"],
  },
  {
    title: { en: "Real-estate visit scheduling", es: "Agenda de visitas inmobiliarias" },
    body: {
      en: "A SaaS for agencies: an embeddable booking widget isolated in shadow DOM, a WordPress plugin that keeps listings in sync, reminders and Stripe subscriptions.",
      es: "Un SaaS para inmobiliarias: un widget de reservas embebible aislado en shadow DOM, un plugin de WordPress que mantiene sincronizadas las propiedades, recordatorios y suscripciones con Stripe.",
    },
    period: { from: "2025-09" },
    stack: ["NestJS", "TypeORM", "MySQL", "Google Cloud"],
  },
  {
    title: { en: "Radio staff absences", es: "Ausencias del personal de una radio" },
    body: {
      en: "Absence and on-air substitution management for a radio station, with admin-editable permissions — plus a video playlist player for Raspberry Pi screens fed by an ffmpeg pipeline to S3.",
      es: "Gestión de ausencias y reemplazos al aire para una radio, con permisos editables por un administrador, más un reproductor de playlists de video para pantallas con Raspberry Pi alimentado por un pipeline de ffmpeg a S3.",
    },
    period: { from: "2025-07", to: "2026-09" },
    stack: ["Next.js", "Prisma", "PostgreSQL", "ffmpeg"],
  },
  {
    title: { en: "Planner wall display", es: "Tablero de Planner en pantalla" },
    body: {
      en: "A read-only office monitor showing the team’s Microsoft Planner tasks, rendered on the server and refreshed incrementally.",
      es: "Un monitor de oficina, de solo lectura, con las tareas del equipo en Microsoft Planner, renderizado en el servidor y actualizado de forma incremental.",
    },
    period: { from: "2026-03", to: "2026-03" },
    stack: ["Next.js", "Microsoft Graph", "MSAL"],
  },
  {
    title: { en: "Database backups to S3", es: "Backups de bases de datos a S3" },
    body: {
      en: "A reusable tool for dockerized databases: dump, compress, verify integrity, upload encrypted to S3, expire after 60 days. It backs up the Union’s production databases.",
      es: "Una herramienta reutilizable para bases de datos en Docker: dump, compresión, verificación de integridad, subida cifrada a S3 y vencimiento a los 60 días. Respalda las bases productivas de la Unión.",
    },
    period: { from: "2026-07", to: "2026-07" },
    stack: ["Bash", "Docker", "AWS CLI"],
  },
];
