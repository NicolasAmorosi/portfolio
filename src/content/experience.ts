import type { Period } from "@/lib/dates";
import type { Localized } from "./localized";

// Source: .claude/knowledge/profile.md (timeline confirmed by Nicolás, 2026-10-14).

export type Role = {
  org: string;
  title: Localized;
  period: Period;
  place: Localized;
  points: Localized<string[]>;
};

export type TimelineTrack = {
  label: Localized;
  bars: { period: Period; label: Localized }[];
};

export const roles: Role[] = [
  {
    org: "Universidad Adventista del Plata",
    title: { en: "Software developer, part-time", es: "Desarrollador de software, medio tiempo" },
    period: { from: "2026-09" },
    place: { en: "Entre Ríos, Argentina", es: "Entre Ríos, Argentina" },
    points: {
      en: [
        "Technical owner of VID, the research-protocol platform: audited the inherited codebase and traced 20 reported bugs to their root causes.",
        "Leading the rewrite of the accounts-payable system from Progress 4GL (~53k lines) to a web stack on PostgreSQL.",
      ],
      es: [
        "Responsable técnico de VID, la plataforma de protocolos de investigación: audité el código heredado y rastreé 20 bugs reportados hasta su causa raíz.",
        "Lidero la reescritura del sistema de cuentas a pagar, de Progress 4GL (~53 mil líneas) a un stack web sobre PostgreSQL.",
      ],
    },
  },
  {
    org: "Villa Aurora",
    title: { en: "Freelance full-stack engineer", es: "Ingeniero full-stack freelance" },
    period: { from: "2026-08" },
    place: { en: "Remote, for Florence, Italy", es: "Remoto, para Florencia, Italia" },
    points: {
      en: [
        "Lead developer of Libretto, the faculty’s academic records system, and of the migration of its twenty-year-old database.",
      ],
      es: [
        "Desarrollador principal de Libretto, el sistema de registros académicos de la facultad, y de la migración de su base de datos de veinte años.",
      ],
    },
  },
  {
    org: "HopeMedia Italia",
    title: { en: "IT infrastructure & lead developer", es: "Infraestructura IT y desarrollador principal" },
    period: { from: "2025-01", to: "2026-08" },
    place: { en: "Rome, Italy", es: "Roma, Italia" },
    points: {
      en: [
        "Led a team of three developers, plus two rotating, building the HR and admin platform of the Italian Adventist Church Union.",
        "Built the radio station’s absence and on-air substitution system, and a video player for Raspberry Pi screens fed by an ffmpeg pipeline to S3.",
        "Ran production: Docker deploys on AWS EC2, CI/CD with GitHub Actions, encrypted database backups to S3 with 60-day retention.",
        "Started Libretto, which I continued as a freelancer.",
      ],
      es: [
        "Lideré un equipo de tres desarrolladores, más dos rotativos, en la plataforma de RR. HH. y administración de la Unión Italiana de Iglesias Adventistas.",
        "Construí el sistema de ausencias y reemplazos al aire de la radio, y un reproductor de video para pantallas con Raspberry Pi alimentado por un pipeline de ffmpeg a S3.",
        "Operé producción: deploys con Docker en AWS EC2, CI/CD con GitHub Actions, backups cifrados de bases de datos en S3 con retención de 60 días.",
        "Arranqué Libretto, que continué como freelance.",
      ],
    },
  },
  {
    org: "Freelance",
    title: { en: "Full-stack developer", es: "Desarrollador full-stack" },
    period: { from: "2023-10" },
    place: { en: "Remote", es: "Remoto" },
    points: {
      en: [
        "Management system for a dental laboratory: co-developed the 2023 version and led its 2026 migration to Next.js.",
        "A real-estate visit-scheduling SaaS: embeddable booking widget, WordPress plugin, Stripe subscriptions.",
      ],
      es: [
        "Sistema de gestión para un laboratorio dental: co-desarrollé la versión 2023 y lideré su migración 2026 a Next.js.",
        "Un SaaS de agenda de visitas inmobiliarias: widget de reservas embebible, plugin de WordPress, suscripciones con Stripe.",
      ],
    },
  },
  {
    org: "Universidad Adventista del Plata",
    title: { en: "Junior developer", es: "Programador auxiliar" },
    period: { from: "2023-03", to: "2024-12" },
    place: { en: "Entre Ríos, Argentina", es: "Entre Ríos, Argentina" },
    points: {
      en: [
        "Upgraded three production systems to the latest Ruby on Rails.",
        "Built an internal tool to keep the university’s database organized, and started two new systems: an expense-reimbursement assistant and an early-warning system for students at risk of dropping out.",
      ],
      es: [
        "Actualicé tres sistemas productivos a la última versión de Ruby on Rails.",
        "Construí una herramienta interna para mantener ordenada la base de datos de la universidad, y arranqué dos sistemas nuevos: un asistente de reintegros y un sistema de alerta temprana de deserción estudiantil.",
      ],
    },
  },
];

export const education: { title: Localized; period: Period }[] = [
  { title: { en: "Systems Engineer", es: "Ingeniero en Sistemas" }, period: { from: "2023-03", to: "2024-11" } },
  { title: { en: "Systems Analyst", es: "Analista en Sistemas" }, period: { from: "2020-03", to: "2022-11" } },
];

// The timeline chart: one track per place, bars can overlap across tracks.
export const tracks: TimelineTrack[] = [
  {
    label: { en: "Education", es: "Formación" },
    bars: [
      { period: { from: "2020-03", to: "2022-11" }, label: { en: "Systems Analyst", es: "Analista" } },
      { period: { from: "2023-03", to: "2024-11" }, label: { en: "Systems Engineer", es: "Ingeniero" } },
    ],
  },
  {
    label: { en: "Universidad Adventista del Plata", es: "Universidad Adventista del Plata" },
    bars: [
      { period: { from: "2023-03", to: "2024-12" }, label: { en: "Junior developer", es: "Programador auxiliar" } },
      { period: { from: "2026-09" }, label: { en: "Developer", es: "Desarrollador" } },
    ],
  },
  {
    label: { en: "Freelance", es: "Freelance" },
    bars: [{ period: { from: "2023-10" }, label: { en: "Full-stack", es: "Full-stack" } }],
  },
  {
    label: { en: "HopeMedia Italia, Rome", es: "HopeMedia Italia, Roma" },
    bars: [{ period: { from: "2025-01", to: "2026-08" }, label: { en: "Lead developer", es: "Desarrollador principal" } }],
  },
  {
    label: { en: "Villa Aurora, Florence", es: "Villa Aurora, Florencia" },
    bars: [{ period: { from: "2026-08" }, label: { en: "Libretto", es: "Libretto" } }],
  },
];
