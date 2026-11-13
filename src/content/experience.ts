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

export const roles: Role[] = [
  {
    org: "Universidad Adventista del Plata",
    title: { en: "Software developer, part-time", es: "Desarrollador de software, medio tiempo", it: "Sviluppatore software, part-time", pt: "Desenvolvedor de software, meio período" },
    period: { from: "2026-09" },
    place: { en: "Entre Ríos, Argentina", es: "Entre Ríos, Argentina", it: "Entre Ríos, Argentina", pt: "Entre Ríos, Argentina" },
    points: {
      en: [
        "Technical owner of VID, the research-protocol platform: audited the inherited codebase and traced 20 reported bugs to their root causes.",
        "Leading the rewrite of the accounts-payable system from Progress 4GL (~53k lines) to a web stack on PostgreSQL.",
      ],
      es: [
        "Responsable técnico de VID, la plataforma de protocolos de investigación: audité el código heredado y rastreé 20 bugs reportados hasta su causa raíz.",
        "Lidero la reescritura del sistema de cuentas a pagar, de Progress 4GL (~53 mil líneas) a un stack web sobre PostgreSQL.",
      ],
      it: [
        "Responsabile tecnico di VID, la piattaforma per i protocolli di ricerca: ho sottoposto ad audit la codebase ereditata e ricondotto 20 bug segnalati alle loro cause radice.",
        "Guido la riscrittura del sistema di contabilità fornitori da Progress 4GL (~53 mila righe) a uno stack web su PostgreSQL.",
      ],
      pt: [
        "Responsável técnico pelo VID, a plataforma de protocolos de pesquisa: auditei a base de código herdada e rastreei 20 bugs relatados até as causas raiz.",
        "Lidero a reescrita do sistema de contas a pagar, de Progress 4GL (~53 mil linhas) para uma stack web sobre PostgreSQL.",
      ],
    },
  },
  {
    org: "Villa Aurora",
    title: { en: "Freelance full-stack engineer", es: "Ingeniero full-stack freelance", it: "Full-stack engineer freelance", pt: "Engenheiro full-stack freelancer" },
    period: { from: "2026-08" },
    place: { en: "Remote, for Florence, Italy", es: "Remoto, para Florencia, Italia", it: "In remoto, per Firenze, Italia", pt: "Remoto, para Florença, Itália" },
    points: {
      en: [
        "Lead developer of Libretto, the faculty’s academic records system, and of the migration of its twenty-year-old database.",
      ],
      es: [
        "Desarrollador principal de Libretto, el sistema de registros académicos de la facultad, y de la migración de su base de datos de veinte años.",
      ],
      it: [
        "Lead developer di Libretto, il sistema di gestione delle carriere accademiche della facoltà, e della migrazione del suo database ventennale.",
      ],
      pt: [
        "Desenvolvedor principal do Libretto, o sistema de registros acadêmicos da faculdade, e da migração do seu banco de dados de vinte anos.",
      ],
    },
  },
  {
    org: "HopeMedia Italia",
    title: { en: "IT infrastructure & lead developer", es: "Infraestructura IT y desarrollador principal", it: "Infrastruttura IT e lead developer", pt: "Infraestrutura de TI e desenvolvedor principal" },
    period: { from: "2025-01", to: "2026-08" },
    place: { en: "Rome, Italy", es: "Roma, Italia", it: "Roma, Italia", pt: "Roma, Itália" },
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
      it: [
        "Ho guidato un team di tre sviluppatori, più due a rotazione, nella realizzazione della piattaforma HR e amministrativa dell’Unione Italiana delle Chiese Cristiane Avventiste del 7° Giorno.",
        "Ho realizzato il sistema per le assenze e le sostituzioni in onda della radio, e un player video per schermi con Raspberry Pi alimentato da una pipeline ffmpeg verso S3.",
        "Ho gestito la produzione: deploy Docker su AWS EC2, CI/CD con GitHub Actions, backup cifrati dei database su S3 con conservazione di 60 giorni.",
        "Ho avviato Libretto, che ho poi proseguito come freelance.",
      ],
      pt: [
        "Liderei uma equipe de três desenvolvedores, mais dois em rodízio, na construção da plataforma de RH e administração da União Italiana das Igrejas Adventistas.",
        "Construí o sistema de ausências e substituições no ar da rádio, e um player de vídeo para telas com Raspberry Pi alimentado por um pipeline de ffmpeg para o S3.",
        "Operei a produção: deploys com Docker no AWS EC2, CI/CD com GitHub Actions, backups criptografados de bancos de dados no S3 com retenção de 60 dias.",
        "Comecei o Libretto, que continuei como freelancer.",
      ],
    },
  },
  {
    org: "Freelance",
    title: { en: "Full-stack developer", es: "Desarrollador full-stack", it: "Sviluppatore full-stack", pt: "Desenvolvedor full-stack" },
    period: { from: "2023-10" },
    place: { en: "Remote", es: "Remoto", it: "In remoto", pt: "Remoto" },
    points: {
      en: [
        "Management system for a dental laboratory: co-developed the 2023 version and led its 2026 migration to Next.js.",
        "A real-estate visit-scheduling SaaS: embeddable booking widget, WordPress plugin, Stripe subscriptions.",
      ],
      es: [
        "Sistema de gestión para un laboratorio dental: co-desarrollé la versión 2023 y lideré su migración 2026 a Next.js.",
        "Un SaaS de agenda de visitas inmobiliarias: widget de reservas embebible, plugin de WordPress, suscripciones con Stripe.",
      ],
      it: [
        "Gestionale per un laboratorio odontotecnico: ho co-sviluppato la versione del 2023 e guidato la sua migrazione a Next.js nel 2026.",
        "Un SaaS per la pianificazione di visite immobiliari: widget di prenotazione incorporabile, plugin WordPress, abbonamenti Stripe.",
      ],
      pt: [
        "Sistema de gestão para um laboratório de prótese dentária: codesenvolvi a versão de 2023 e liderei sua migração para Next.js em 2026.",
        "Um SaaS de agendamento de visitas a imóveis: widget de reservas incorporável, plugin de WordPress, assinaturas com Stripe.",
      ],
    },
  },
  {
    org: "Universidad Adventista del Plata",
    title: { en: "Junior developer", es: "Programador auxiliar", it: "Sviluppatore junior", pt: "Desenvolvedor júnior" },
    period: { from: "2023-03", to: "2024-12" },
    place: { en: "Entre Ríos, Argentina", es: "Entre Ríos, Argentina", it: "Entre Ríos, Argentina", pt: "Entre Ríos, Argentina" },
    points: {
      en: [
        "Upgraded three production systems to the latest Ruby on Rails.",
        "Built an internal tool to keep the university’s database organized, and started two new systems: an expense-reimbursement assistant and an early-warning system for students at risk of dropping out.",
      ],
      es: [
        "Actualicé tres sistemas productivos a la última versión de Ruby on Rails.",
        "Construí una herramienta interna para mantener ordenada la base de datos de la universidad, y arranqué dos sistemas nuevos: un asistente de reintegros y un sistema de alerta temprana de deserción estudiantil.",
      ],
      it: [
        "Ho aggiornato tre sistemi in produzione all’ultima versione di Ruby on Rails.",
        "Ho realizzato uno strumento interno per mantenere in ordine il database dell’università e avviato due nuovi sistemi: un assistente per i rimborsi spese e un sistema di allerta precoce per gli studenti a rischio di abbandono.",
      ],
      pt: [
        "Atualizei três sistemas em produção para a versão mais recente do Ruby on Rails.",
        "Construí uma ferramenta interna para manter organizado o banco de dados da universidade e comecei dois sistemas novos: um assistente de reembolso de despesas e um sistema de alerta precoce para alunos em risco de evasão.",
      ],
    },
  },
];

export const education: { title: Localized; period: Period }[] = [
  { title: { en: "Systems Engineering (Ingeniero en Sistemas)", es: "Ingeniero en Sistemas", it: "Ingegneria dei sistemi (Ingeniero en Sistemas)", pt: "Engenharia de Sistemas (Ingeniero en Sistemas)" }, period: { from: "2023-03", to: "2024-11" } },
  { title: { en: "Systems Analysis (Analista en Sistemas)", es: "Analista en Sistemas", it: "Analisi dei sistemi (Analista en Sistemas)", pt: "Análise de Sistemas (Analista en Sistemas)" }, period: { from: "2020-03", to: "2022-11" } },
];
