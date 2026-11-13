import type { Period } from "@/lib/dates";
import type { Localized } from "./localized";

// Source: .claude/knowledge/{profile,skills,projects}.md.

// How I work: one plain sentence or two each, no headings.
export const principles: Localized[] = [
  {
    en: "Access is a registry of permissions with scopes (own, assigned, all), checked by the server on every request. The interface hides what you can’t do, but the API is what stops you.",
    es: "El acceso es un registro de permisos con alcances (propio, asignado, todo) que el servidor verifica en cada request. La interfaz oculta lo que no podés hacer, pero quien te frena es la API.",
    it: "L’accesso è un registro di permessi con ambiti (propri, assegnati, tutti), verificati dal server a ogni request. L’interfaccia nasconde ciò che non puoi fare, ma è l’API a fermarti.",
    pt: "O acesso é um registro de permissões com escopos (próprio, atribuído, todos), verificado pelo servidor a cada request. A interface esconde o que você não pode fazer, mas quem impede é a API.",
  },
  {
    en: "The rules people depend on (grades, credits, approval chains, balances) get tests first. Libretto runs about 1,200 of them and the HR platform about 520.",
    es: "Las reglas de las que depende la gente (notas, créditos, cadenas de aprobación, saldos) se testean primero. Libretto corre alrededor de 1.200 tests y la plataforma de RR. HH., unos 520.",
    it: "Le regole su cui contano le persone (voti, crediti, catene di approvazione, saldi) sono le prime a essere testate. Libretto ha circa 1.200 test e la piattaforma HR circa 520.",
    pt: "As regras de que as pessoas dependem (notas, créditos, cadeias de aprovação, saldos) recebem testes primeiro. O Libretto roda cerca de 1.200 deles, e a plataforma de RH, cerca de 520.",
  },
  {
    en: "Legacy data moves through previews, idempotent syncs and quality gates that refuse to write rather than write something wrong.",
    es: "Los datos legacy pasan por vistas previas, sincronizaciones idempotentes y controles de calidad que prefieren no escribir antes que escribir algo mal.",
    it: "I dati legacy passano per anteprime, sincronizzazioni idempotenti e controlli di qualità che si rifiutano di scrivere piuttosto che scrivere qualcosa di sbagliato.",
    pt: "Dados legados passam por prévias, sincronizações idempotentes e controles de qualidade que se recusam a gravar em vez de gravar algo errado.",
  },
  {
    en: "Every repository carries its own knowledge base: decisions, gotchas, runbooks, handoffs. Libretto’s has 146 documents.",
    es: "Cada repositorio lleva su propia base de conocimiento: decisiones, trampas, procedimientos, traspasos. La de Libretto tiene 146 documentos.",
    it: "Ogni repository porta con sé la propria knowledge base: decisioni, insidie, runbook, passaggi di consegne. Quella di Libretto contiene 146 documenti.",
    pt: "Cada repositório carrega a própria base de conhecimento: decisões, armadilhas, runbooks, handoffs. A do Libretto tem 146 documentos.",
  },
  {
    en: "TypeScript in its strictest settings, and one contracts package shared by the API and the interface, so a breaking change fails the build before it reaches anyone.",
    es: "TypeScript en su configuración más estricta y un paquete de contratos compartido entre la API y la interfaz, así un cambio incompatible rompe el build antes de llegarle a nadie.",
    it: "TypeScript nella configurazione più rigorosa e un unico pacchetto di contratti condiviso tra API e interfaccia, così una modifica incompatibile fa fallire la build prima che arrivi a qualcuno.",
    pt: "TypeScript na configuração mais estrita e um único pacote de contratos compartilhado pela API e pela interface, então uma mudança incompatível quebra o build antes de chegar a alguém.",
  },
  {
    en: "I work with Claude Code every day, with my own skills, MCP servers and a knowledge base per repository. It makes me faster, but it doesn’t decide what ships.",
    es: "Trabajo con Claude Code todos los días, con skills propios, servidores MCP y una base de conocimiento por repositorio. Me hace más rápido, pero no decide qué sale a producción.",
    it: "Lavoro con Claude Code ogni giorno, con skill scritte da me, server MCP e una knowledge base per repository. Mi rende più veloce, ma non decide cosa va in produzione.",
    pt: "Trabalho com o Claude Code todos os dias, com minhas próprias skills, servidores MCP e uma base de conhecimento por repositório. Ele me deixa mais rápido, mas não decide o que vai para produção.",
  },
];

export const stack: { area: Localized; items: string[] }[] = [
  { area: { en: "Languages", es: "Lenguajes", it: "Linguaggi", pt: "Linguagens" }, items: ["TypeScript", "JavaScript", "SQL", "Python", "Ruby", "Bash"] },
  {
    area: { en: "Interface", es: "Interfaz", it: "Interfaccia", pt: "Interface" },
    items: ["Next.js (App Router, RSC)", "React 19", "Tailwind CSS", "shadcn/ui", "next-intl"],
  },
  {
    area: { en: "Back end", es: "Back end", it: "Back end", pt: "Back-end" },
    items: ["NestJS", "Node.js", "Express", "Ruby on Rails", "Prisma", "TypeORM", "Drizzle"],
  },
  { area: { en: "Data", es: "Datos", it: "Dati", pt: "Dados" }, items: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"] },
  {
    area: { en: "Identity", es: "Identidad", it: "Identità", pt: "Identidade" },
    items: ["JWT + refresh rotation", "CSRF", "Microsoft Entra ID", "NextAuth", "Scoped RBAC", "Audit logs"],
  },
  {
    area: { en: "Infrastructure", es: "Infraestructura", it: "Infrastruttura", pt: "Infraestrutura" },
    items: ["Docker", "AWS (EC2, S3)", "GitHub Actions", "Vercel", "Google Cloud Build", "Linux"],
  },
  { area: { en: "Testing", es: "Testing", it: "Testing", pt: "Testes" }, items: ["Jest", "Vitest", "Playwright"] },
  {
    area: { en: "Integrations", es: "Integraciones", it: "Integrazioni", pt: "Integrações" },
    items: ["Microsoft Graph", "Stripe", "Excel & PDF generation", "Electron"],
  },
];

export const languages: { name: Localized; level: Localized }[] = [
  { name: { en: "Spanish", es: "Español", it: "Spagnolo", pt: "Espanhol" }, level: { en: "Native", es: "Nativo", it: "Madrelingua", pt: "Nativo" } },
  { name: { en: "English", es: "Inglés", it: "Inglese", pt: "Inglês" }, level: { en: "Full professional", es: "Profesional completo", it: "Conoscenza professionale completa", pt: "Proficiência profissional plena" } },
  { name: { en: "Italian", es: "Italiano", it: "Italiano", pt: "Italiano" }, level: { en: "Professional working", es: "Profesional de trabajo", it: "Conoscenza professionale", pt: "Proficiência profissional" } },
  { name: { en: "Portuguese", es: "Portugués", it: "Portoghese", pt: "Português" }, level: { en: "Limited working", es: "Intermedio", it: "Conoscenza professionale limitata", pt: "Intermediário" } },
];

// Smaller work without a case study. Disclosure levels per projects.md:
// the real-estate SaaS is never named.
export const otherWork: { title: Localized; body: Localized; period: Period; stack: string[] }[] = [
  {
    title: { en: "Dental laboratory management", es: "Gestión de un laboratorio dental", it: "Gestione di un laboratorio odontotecnico", pt: "Gestão de laboratório de prótese dentária" },
    body: {
      en: "Clients, monthly billing, payments and a credit ledger for Laboratorio Dental Valdense, with PDF summaries shared on WhatsApp through signed links generated on demand. Co-developed the 2023 version and led its 2026 migration to Next.js.",
      es: "Clientes, facturación mensual, pagos y un libro de saldos a favor para el Laboratorio Dental Valdense, con resúmenes en PDF compartidos por WhatsApp mediante links firmados que se generan al momento. Co-desarrollé la versión 2023 y lideré su migración 2026 a Next.js.",
      it: "Clienti, fatturazione mensile, pagamenti e un registro dei saldi a credito per il Laboratorio Dental Valdense, con riepiloghi PDF condivisi su WhatsApp tramite link firmati generati su richiesta. Ho co-sviluppato la versione del 2023 e guidato la sua migrazione a Next.js nel 2026.",
      pt: "Clientes, faturamento mensal, pagamentos e um livro-razão de créditos para o Laboratorio Dental Valdense, com resumos em PDF compartilhados pelo WhatsApp por meio de links assinados gerados na hora. Codesenvolvi a versão de 2023 e liderei sua migração para Next.js em 2026.",
    },
    period: { from: "2023-10" },
    stack: ["Next.js", "MongoDB", "Vercel"],
  },
  {
    title: { en: "Real-estate visit scheduling", es: "Agenda de visitas inmobiliarias", it: "Pianificazione di visite immobiliari", pt: "Agendamento de visitas a imóveis" },
    body: {
      en: "A SaaS for agencies: an embeddable booking widget isolated in shadow DOM, a WordPress plugin that keeps listings in sync, reminders and Stripe subscriptions.",
      es: "Un SaaS para inmobiliarias: un widget de reservas embebible aislado en shadow DOM, un plugin de WordPress que mantiene sincronizadas las propiedades, recordatorios y suscripciones con Stripe.",
      it: "Un SaaS per agenzie immobiliari: un widget di prenotazione incorporabile isolato in shadow DOM, un plugin WordPress che mantiene sincronizzati gli annunci, promemoria e abbonamenti Stripe.",
      pt: "Um SaaS para imobiliárias: um widget de reservas incorporável e isolado em shadow DOM, um plugin de WordPress que mantém os anúncios sincronizados, lembretes e assinaturas com Stripe.",
    },
    period: { from: "2025-09" },
    stack: ["NestJS", "TypeORM", "MySQL", "Google Cloud"],
  },
  {
    title: { en: "Radio staff absences", es: "Ausencias del personal de una radio", it: "Assenze del personale di una radio", pt: "Ausências da equipe de uma rádio" },
    body: {
      en: "Absence and on-air substitution management for a radio station, with admin-editable permissions, plus a video playlist player for Raspberry Pi screens fed by an ffmpeg pipeline to S3.",
      es: "Gestión de ausencias y reemplazos al aire para una radio, con permisos editables por un administrador, más un reproductor de playlists de video para pantallas con Raspberry Pi alimentado por un pipeline de ffmpeg a S3.",
      it: "Gestione delle assenze e delle sostituzioni in onda per una radio, con permessi modificabili da un amministratore, più un player di playlist video per schermi con Raspberry Pi alimentato da una pipeline ffmpeg verso S3.",
      pt: "Gestão de ausências e substituições no ar para uma rádio, com permissões editáveis pelo administrador, além de um player de playlists de vídeo para telas com Raspberry Pi alimentado por um pipeline de ffmpeg para o S3.",
    },
    period: { from: "2025-07", to: "2026-09" },
    stack: ["Next.js", "Prisma", "PostgreSQL", "ffmpeg"],
  },
  {
    title: { en: "Planner wall display", es: "Tablero de Planner en pantalla", it: "Planner su schermo a parete", pt: "Painel de parede do Planner" },
    body: {
      en: "A read-only office monitor showing the team’s Microsoft Planner tasks, rendered on the server and refreshed incrementally.",
      es: "Un monitor de oficina, de solo lectura, con las tareas del equipo en Microsoft Planner, renderizado en el servidor y actualizado de forma incremental.",
      it: "Un monitor d’ufficio in sola lettura che mostra le attività del team in Microsoft Planner, renderizzato sul server e aggiornato in modo incrementale.",
      pt: "Um monitor de escritório somente leitura que mostra as tarefas da equipe no Microsoft Planner, renderizado no servidor e atualizado de forma incremental.",
    },
    period: { from: "2026-03", to: "2026-03" },
    stack: ["Next.js", "Microsoft Graph", "MSAL"],
  },
  {
    title: { en: "Database backups to S3", es: "Backups de bases de datos a S3", it: "Backup dei database su S3", pt: "Backups de bancos de dados para o S3" },
    body: {
      en: "A reusable tool for dockerized databases: dump, compress, verify integrity, upload encrypted to S3, expire after 60 days. It backs up the Union’s production databases.",
      es: "Una herramienta reutilizable para bases de datos en Docker: dump, compresión, verificación de integridad, subida cifrada a S3 y vencimiento a los 60 días. Respalda las bases productivas de la Unión.",
      it: "Uno strumento riutilizzabile per database in Docker: dump, compressione, verifica dell’integrità, upload cifrato su S3, scadenza dopo 60 giorni. Esegue il backup dei database di produzione dell’Unione.",
      pt: "Uma ferramenta reutilizável para bancos de dados em Docker: dump, compressão, verificação de integridade, upload criptografado para o S3 e expiração após 60 dias. Ela faz o backup dos bancos de produção da União.",
    },
    period: { from: "2026-07", to: "2026-07" },
    stack: ["Bash", "Docker", "AWS CLI"],
  },
];
