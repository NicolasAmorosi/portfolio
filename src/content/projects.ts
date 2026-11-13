import type { StaticImageData } from "next/image";
import type { Period } from "@/lib/dates";
import himnovaEnDark from "@/assets/screenshots/himnova-control-en-dark.webp";
import himnovaEnLight from "@/assets/screenshots/himnova-control-en-light.webp";
import himnovaEsDark from "@/assets/screenshots/himnova-control-es-dark.webp";
import himnovaEsLight from "@/assets/screenshots/himnova-control-es-light.webp";
import himnovaItDark from "@/assets/screenshots/himnova-control-it-dark.webp";
import himnovaItLight from "@/assets/screenshots/himnova-control-it-light.webp";
import himnovaPtDark from "@/assets/screenshots/himnova-control-pt-dark.webp";
import himnovaPtLight from "@/assets/screenshots/himnova-control-pt-light.webp";
import librettoCareer from "@/assets/screenshots/libretto-career.webp";
import type { Localized } from "./localized";

/*
 * Case studies. Source of truth: .claude/knowledge/projects.md (facts verified
 * against the source repos on 2026-10-14). Client code is private: no code,
 * no internal names, no open findings: only problem, approach and outcome.
 */

export type FigureKey = "scopes" | "encoding" | "approval" | "archaeology" | "projection";

export type Fact = { label: Localized; value: Localized };

export type HardPart = { title: Localized; body: Localized; seeAlso?: ProjectSlug };

export type Project = {
  slug: ProjectSlug;
  title: Localized;
  client: Localized;
  period: Period;
  role: Localized;
  summary: Localized;
  lede: Localized;
  facts: Fact[];
  // One line of numbers for the work index, taken from the facts and results.
  proof: Localized;
  stack: string[];
  figure: FigureKey;
  problem: Localized<string[]>;
  constraints: Localized<string[]>;
  built: Localized<string[]>;
  hard: HardPart[];
  result: Localized<string[]>;
  // Set only for public code: links the repo and site, and replaces the "code is private" note.
  openSource?: { repo: string; website: string };
  // A real screenshot, in the page's language and color scheme. Public code, or a demo with invented data.
  screenshot?: { alt: Localized; image: Localized<{ light: StaticImageData; dark: StaticImageData }> };
};

export type ProjectSlug = "libretto" | "legacy-migration" | "hr-platform" | "university-systems" | "himnova-live";

export const projects: Project[] = [
  {
    slug: "libretto",
    title: { en: "Libretto", es: "Libretto", it: "Libretto", pt: "Libretto" },
    client: { en: "Villa Aurora, Florence", es: "Villa Aurora, Florencia", it: "Villa Aurora, Firenze", pt: "Villa Aurora, Florença" },
    period: { from: "2026-05" },
    role: {
      en: "Lead developer, author of ~96% of the code",
      es: "Desarrollador principal, autor de ~96 % del código",
      it: "Lead developer, autore del ~96% del codice",
      pt: "Desenvolvedor principal, autor de ~96% do código",
    },
    summary: {
      en: "The academic records system of a theological faculty in Florence: courses, curricula, enrollments, grades and credits, with portals for teachers and students.",
      es: "El sistema de registros académicos de una facultad de teología en Florencia: cursos, planes de estudio, inscripciones, notas y créditos, con portales para docentes y estudiantes.",
      it: "Il sistema di gestione delle carriere accademiche di una facoltà di teologia a Firenze: corsi, piani di studio, iscrizioni, voti e crediti, con portali per docenti e studenti.",
      pt: "O sistema de registros acadêmicos de uma faculdade de teologia em Florença: disciplinas, grades curriculares, matrículas, notas e créditos, com portais para professores e alunos.",
    },
    lede: {
      en: "Villa Aurora kept its academic records in an application that had grown for twenty years. I designed and built its replacement (data model, API, interface, security and the migration of every record), and in October 2026 it became the faculty’s source of truth.",
      es: "Villa Aurora llevaba sus registros académicos en una aplicación que había crecido durante veinte años. Diseñé y construí su reemplazo (modelo de datos, API, interfaz, seguridad y la migración de cada registro), y en octubre de 2026 pasó a ser la fuente de verdad de la facultad.",
      it: "Villa Aurora gestiva le carriere accademiche con un’applicazione cresciuta nell’arco di vent’anni. Ho progettato e realizzato il sistema che l’ha sostituita (modello dei dati, API, interfaccia, sicurezza e migrazione di ogni record), e a ottobre 2026 è diventato la fonte di verità della facoltà.",
      pt: "A Villa Aurora mantinha seus registros acadêmicos em uma aplicação que vinha crescendo havia vinte anos. Projetei e construí o sistema que a substituiu (modelo de dados, API, interface, segurança e a migração de cada registro), e em outubro de 2026 ele passou a ser a fonte da verdade da faculdade.",
    },
    facts: [
      { label: { en: "Data models", es: "Modelos de datos", it: "Modelli di dati", pt: "Modelos de dados" }, value: { en: "55", es: "55", it: "55", pt: "55" } },
      { label: { en: "API modules", es: "Módulos de API", it: "Moduli API", pt: "Módulos de API" }, value: { en: "46", es: "46", it: "46", pt: "46" } },
      { label: { en: "Automated tests", es: "Tests automatizados", it: "Test automatici", pt: "Testes automatizados" }, value: { en: "~1,200", es: "~1.200", it: "~1.200", pt: "~1.200" } },
      { label: { en: "Users in production", es: "Usuarios en producción", it: "Utenti in produzione", pt: "Usuários em produção" }, value: { en: "438", es: "438", it: "438", pt: "438" } },
    ],
    stack: [
      "TypeScript",
      "Next.js 16",
      "React 19",
      "NestJS 11",
      "Prisma",
      "MySQL 8",
      "Tailwind CSS 4",
      "Turborepo",
      "Docker Compose",
      "AWS S3",
      "Microsoft Graph",
      "Jest",
      "Playwright",
    ],
    figure: "scopes",
    proof: { en: "The faculty’s source of truth since October 2026 · 438 users · ~1,200 tests", es: "Fuente de verdad de la facultad desde octubre de 2026 · 438 usuarios · ~1.200 tests", it: "Fonte di verità della facoltà da ottobre 2026 · 438 utenti · ~1.200 test", pt: "A fonte da verdade da faculdade desde outubro de 2026 · 438 usuários · ~1.200 testes" },
    // Recorded on the demo institution of Libretto's help guides: every name and number is invented.
    screenshot: {
      alt: {
        en: "A student’s career in Libretto, as the secretary’s office sees it: the study plan with credits, status, grade and exam date per subject. Demo data: every name and number is invented.",
        es: "La carrera de un estudiante en Libretto, como la ve la secretaría: el plan de estudios con créditos, estado, nota y fecha de examen por materia. Datos de demostración: cada nombre y número es inventado.",
        it: "La carriera di uno studente in Libretto, come la vede la segreteria: il piano di studio con crediti, stato, voto e data d’esame per ogni materia. Dati dimostrativi: tutti i nomi e i numeri sono inventati.",
        pt: "O histórico de um aluno no Libretto, como a secretaria o vê: o plano de estudos com créditos, situação, nota e data do exame de cada disciplina. Dados de demonstração: todos os nomes e números são inventados.",
      },
      image: {
        en: { light: librettoCareer, dark: librettoCareer },
        es: { light: librettoCareer, dark: librettoCareer },
        it: { light: librettoCareer, dark: librettoCareer },
        pt: { light: librettoCareer, dark: librettoCareer },
      },
    },
    problem: {
      en: [
        "The old application sat on a database that had grown table by table for two decades: one table per degree programme, yes/no flags stored as −1 and 0, and text in several encodings at once. Characters it couldn’t decode were overwritten, so accents in names and course titles were being lost for good.",
        "The secretary’s office needed a system it could trust: grades on the Italian 18–30 scale, credits (CFU) adding up per curriculum, cohorts advancing year by year, and teachers and students able to see exactly their own part of it.",
      ],
      es: [
        "La aplicación anterior se apoyaba en una base de datos que había crecido tabla por tabla durante dos décadas: una tabla por carrera, booleanos guardados como −1 y 0, y texto en varias codificaciones a la vez. Los caracteres que no podía decodificar los sobrescribía, así que los acentos de nombres y materias se perdían para siempre.",
        "La secretaría necesitaba un sistema confiable: notas en la escala italiana de 18 a 30, créditos (CFU) que cierren por plan de estudios, cohortes que avanzan año a año, y docentes y estudiantes viendo exactamente su parte.",
      ],
      it: [
        "La vecchia applicazione poggiava su un database cresciuto tabella dopo tabella nell’arco di due decenni: una tabella per ogni corso di laurea, flag sì/no salvati come −1 e 0, e testo in più codifiche contemporaneamente. I caratteri che non riusciva a decodificare venivano sovrascritti, così gli accenti nei nomi e nei titoli dei corsi andavano persi per sempre.",
        "La segreteria aveva bisogno di un sistema affidabile: voti in trentesimi (18–30), crediti (CFU) che quadrano per ogni piano di studio, coorti che avanzano anno dopo anno, e docenti e studenti in grado di vedere esattamente la propria parte.",
      ],
      pt: [
        "A aplicação antiga rodava sobre um banco de dados que tinha crescido tabela por tabela durante duas décadas: uma tabela por curso, flags de sim/não guardadas como −1 e 0, e texto em várias codificações ao mesmo tempo. Os caracteres que ela não conseguia decodificar eram sobrescritos, então os acentos em nomes e títulos de disciplinas estavam se perdendo para sempre.",
        "A secretaria precisava de um sistema em que pudesse confiar: notas na escala italiana 18–30, créditos (CFU) que fecham em cada grade curricular, turmas que avançam ano a ano, e professores e alunos vendo exatamente a sua parte.",
      ],
    },
    constraints: {
      en: [
        "Italian first, English second. Not just the interface: catalog data itself is bilingual.",
        "WCAG AA, with layouts that hold up on a 320-pixel-wide phone.",
        "One virtual machine and Docker Compose; no managed platform.",
        "Data from the old system had to keep flowing in until cut-over, run by a non-technical operator with one command.",
        "Built mostly by one developer, so decisions, gotchas and runbooks live in the repository: 146 documents.",
      ],
      es: [
        "Primero italiano, después inglés; y no solo la interfaz: los catálogos mismos son bilingües.",
        "WCAG AA, con pantallas que funcionan en un teléfono de 320 píxeles de ancho.",
        "Una sola máquina virtual con Docker Compose; sin plataforma administrada.",
        "Los datos del sistema viejo tenían que seguir llegando hasta el corte, y debía poder correrlo una persona no técnica con un solo comando.",
        "Construido casi en su totalidad por un desarrollador, así que las decisiones, trampas y procedimientos viven en el repositorio: 146 documentos.",
      ],
      it: [
        "Prima l’italiano, poi l’inglese. Non solo l’interfaccia: anche i dati del catalogo sono bilingui.",
        "WCAG AA, con layout che reggono su uno smartphone largo 320 pixel.",
        "Una sola macchina virtuale e Docker Compose; nessuna piattaforma gestita.",
        "I dati del vecchio sistema dovevano continuare ad arrivare fino al passaggio definitivo, e la procedura doveva poterla lanciare un operatore non tecnico con un solo comando.",
        "Realizzato quasi interamente da un solo sviluppatore, quindi decisioni, insidie e runbook stanno nel repository: 146 documenti.",
      ],
      pt: [
        "Italiano primeiro, inglês depois. Não só a interface: os próprios dados do catálogo são bilíngues.",
        "WCAG AA, com layouts que funcionam em um celular de 320 pixels de largura.",
        "Uma máquina virtual e Docker Compose; nenhuma plataforma gerenciada.",
        "Os dados do sistema antigo tinham que continuar entrando até a virada, e um operador sem conhecimento técnico tinha que conseguir fazer isso com um único comando.",
        "Construído quase todo por um único desenvolvedor, então as decisões, as armadilhas e os runbooks ficam no repositório: 146 documentos.",
      ],
    },
    built: {
      en: [
        "A Turborepo monorepo: a NestJS 11 API with Prisma on MySQL 8, a Next.js 16 and React 19 interface, and a shared package of TypeScript contracts so both sides agree on every request and response. The browser never calls the API directly; Next.js route handlers sit in front of it.",
        "The API answers with stable error codes instead of sentences, and the interface translates them. Access is a registry of permissions, each with a scope (own, assigned or all) resolved on the server for every request. Admins can view the system as another user to reproduce exactly what that person sees, and every change is written to an audit log, with sensitive fields redacted, in the same transaction as the change itself.",
        "Around that core: bulk Excel import, PDF generation, files on S3 through presigned URLs with the real file type checked from its bytes, scheduled reminders by email through Microsoft Graph, and history tables that keep every past version of the records that matter.",
      ],
      es: [
        "Un monorepo con Turborepo: una API en NestJS 11 con Prisma sobre MySQL 8, una interfaz en Next.js 16 y React 19, y un paquete compartido de contratos TypeScript para que ambos lados coincidan en cada request y response. El navegador nunca llama a la API directamente: delante hay route handlers de Next.js.",
        "La API responde con códigos de error estables en lugar de frases, y la interfaz los traduce. El acceso es un registro de permisos, cada uno con un alcance (propio, asignado o todo) que el servidor resuelve en cada request. Un administrador puede ver el sistema como otro usuario para reproducir exactamente lo que esa persona ve, y cada cambio queda en un log de auditoría, con los campos sensibles ocultos, en la misma transacción que el cambio.",
        "Alrededor de ese núcleo: importación masiva desde Excel, generación de PDF, archivos en S3 con URLs prefirmadas y el tipo real del archivo verificado por sus bytes, recordatorios programados por email con Microsoft Graph, y tablas de historial que guardan cada versión anterior de los registros importantes.",
      ],
      it: [
        "Un monorepo Turborepo: un’API NestJS 11 con Prisma su MySQL 8, un’interfaccia in Next.js 16 e React 19, e un pacchetto condiviso di contratti TypeScript perché le due parti concordino su ogni request e response. Il browser non chiama mai direttamente l’API: davanti ci sono i route handler di Next.js.",
        "L’API risponde con codici di errore stabili invece che con frasi, e l’interfaccia li traduce. L’accesso è un registro di permessi, ognuno con un ambito (propri, assegnati o tutti) che il server risolve a ogni request. Gli amministratori possono vedere il sistema come un altro utente, per riprodurre esattamente ciò che vede quella persona, e ogni modifica viene scritta in un log di audit, con i campi sensibili oscurati, nella stessa transazione della modifica.",
        "Attorno a questo nucleo: importazione massiva da Excel, generazione di PDF, file su S3 tramite URL prefirmati con il tipo reale del file verificato dai suoi byte, promemoria programmati via email tramite Microsoft Graph e tabelle di storico che conservano ogni versione precedente dei record che contano.",
      ],
      pt: [
        "Um monorepo com Turborepo: uma API em NestJS 11 com Prisma sobre MySQL 8, uma interface em Next.js 16 e React 19, e um pacote compartilhado de contratos TypeScript para que os dois lados concordem em cada request e response. O navegador nunca chama a API diretamente; route handlers do Next.js ficam na frente dela.",
        "A API responde com códigos de erro estáveis em vez de frases, e a interface os traduz. O acesso é um registro de permissões, cada uma com um escopo (próprio, atribuído ou todos) resolvido no servidor a cada request. Administradores podem ver o sistema como outro usuário para reproduzir exatamente o que essa pessoa vê, e cada alteração é gravada em um log de auditoria, com os campos sensíveis mascarados, na mesma transação da própria alteração.",
        "Em volta desse núcleo: importação em massa de Excel, geração de PDF, arquivos no S3 por meio de URLs pré-assinadas, com o tipo real do arquivo verificado pelos seus bytes, lembretes agendados por e-mail via Microsoft Graph, e tabelas de histórico que guardam cada versão anterior dos registros que importam.",
      ],
    },
    hard: [
      {
        title: { en: "Scopes, not roles", es: "Alcances, no roles", it: "Ambiti, non ruoli", pt: "Escopos, não papéis" },
        body: {
          en: "A teacher can read grades, but only for the courses assigned to them. A student, only their own. The secretary’s office, all of them. Instead of hard-coding roles, each permission carries a scope and the API turns it into a database filter on every request. The interface hides what you can’t do; the server is what enforces it.",
          es: "Un docente puede ver notas, pero solo de las materias que tiene asignadas. Un estudiante, solo las suyas. La secretaría, todas. En vez de programar roles fijos, cada permiso lleva un alcance y la API lo convierte en un filtro de base de datos en cada request. La interfaz oculta lo que no podés hacer; quien lo impide es el servidor.",
          it: "Un docente può leggere i voti, ma solo dei corsi che gli sono assegnati. Uno studente, solo i propri. La segreteria, tutti. Invece di cablare i ruoli nel codice, ogni permesso porta con sé un ambito e l’API lo trasforma in un filtro sul database a ogni request. L’interfaccia nasconde ciò che non puoi fare; a impedirlo è il server.",
          pt: "Um professor pode ler notas, mas só das disciplinas que lhe foram atribuídas. Um aluno, só as suas. A secretaria, todas. Em vez de fixar papéis no código, cada permissão carrega um escopo, e a API o transforma em um filtro no banco de dados a cada request. A interface esconde o que você não pode fazer; quem impede de fato é o servidor.",
        },
      },
      {
        title: { en: "No tokens in storage", es: "Sin tokens en el storage", it: "Nessun token nello storage", pt: "Sem tokens no storage" },
        body: {
          en: "The access token lives only in memory and expires quickly. The refresh token sits in an HttpOnly cookie, is stored hashed and is rotated on every refresh: the old one is revoked as the new one is issued. Every state-changing request also carries a double-submit CSRF token.",
          es: "El access token vive solo en memoria y expira rápido. El refresh token está en una cookie HttpOnly, se guarda hasheado y rota en cada renovación: el anterior se revoca cuando se emite el nuevo. Además, cada request que modifica datos lleva un token CSRF de doble envío.",
          it: "L’access token vive solo in memoria e scade presto. Il refresh token sta in un cookie HttpOnly, viene salvato come hash e ruota a ogni refresh: il vecchio viene revocato nel momento in cui si emette il nuovo. Ogni request che modifica lo stato porta anche un token CSRF di tipo double-submit.",
          pt: "O access token fica só na memória e expira rápido. O refresh token fica em um cookie HttpOnly, é armazenado como hash e é rotacionado a cada refresh: o antigo é revogado quando o novo é emitido. Toda request que altera estado também leva um token CSRF no padrão double-submit.",
        },
      },
      {
        title: { en: "Twenty years of data", es: "Veinte años de datos", it: "Vent’anni di dati", pt: "Vinte anos de dados" },
        body: {
          en: "None of this mattered until every name, title and grade from the old database arrived intact. That story has its own page.",
          es: "Nada de esto importaba hasta que cada nombre, materia y nota de la base vieja llegara intacto. Esa historia tiene su propia página.",
          it: "Niente di tutto questo contava finché ogni nome, titolo e voto del vecchio database non fosse arrivato intatto. Questa storia ha una pagina a parte.",
          pt: "Nada disso importava até que cada nome, título e nota do banco antigo chegasse intacto. Essa história tem sua própria página.",
        },
        seeAlso: "legacy-migration",
      },
    ],
    result: {
      en: [
        "In production. On 13 October 2026 the old system was frozen and Libretto became the faculty’s source of truth.",
        "438 users and 580 enrollments in production.",
        "Reconciled against the old system’s own figures: academic records with mismatched credit totals went from 141 to 3, mismatched weighted averages from 32 to 5.",
        "About 1,200 automated tests (Jest and Playwright).",
      ],
      es: [
        "En producción. El 13 de octubre de 2026 se congeló el sistema viejo y Libretto pasó a ser la fuente de verdad de la facultad.",
        "438 usuarios y 580 inscripciones en producción.",
        "Conciliado contra las cifras del propio sistema viejo: las carreras con créditos que no cerraban bajaron de 141 a 3, y los promedios ponderados que no coincidían, de 32 a 5.",
        "Alrededor de 1.200 tests automatizados (Jest y Playwright).",
      ],
      it: [
        "In produzione. Il 13 ottobre 2026 il vecchio sistema è stato congelato e Libretto è diventato la fonte di verità della facoltà.",
        "438 utenti e 580 iscrizioni in produzione.",
        "Riconciliato con i numeri del vecchio sistema stesso: le carriere con totali di crediti discordanti sono passate da 141 a 3, quelle con medie ponderate discordanti da 32 a 5.",
        "Circa 1.200 test automatici (Jest e Playwright).",
      ],
      pt: [
        "Em produção. Em 13 de outubro de 2026 o sistema antigo foi congelado e o Libretto passou a ser a fonte da verdade da faculdade.",
        "438 usuários e 580 matrículas em produção.",
        "Conciliado com os números do próprio sistema antigo: os históricos acadêmicos com totais de créditos divergentes caíram de 141 para 3, e as médias ponderadas divergentes, de 32 para 5.",
        "Cerca de 1.200 testes automatizados (Jest e Playwright).",
      ],
    },
  },
  {
    slug: "legacy-migration",
    title: { en: "Zero lost characters", es: "Ni un carácter perdido", it: "Nessun carattere perso", pt: "Zero caracteres perdidos" },
    client: { en: "Villa Aurora, Florence", es: "Villa Aurora, Florencia", it: "Villa Aurora, Firenze", pt: "Villa Aurora, Florença" },
    period: { from: "2026" },
    role: { en: "Sole author", es: "Autor único", it: "Unico autore", pt: "Autor único" },
    summary: {
      en: "The migration behind Libretto: a 46-table legacy database in mixed text encodings, moved record by record without a single corrupted character.",
      es: "La migración detrás de Libretto: una base legacy de 46 tablas con codificaciones mezcladas, trasladada registro por registro sin un solo carácter corrupto.",
      it: "La migrazione dietro Libretto: un database legacy di 46 tabelle con codifiche del testo miste, trasferito record per record senza un solo carattere corrotto.",
      pt: "A migração por trás do Libretto: um banco de dados legado de 46 tabelas com codificações de texto misturadas, transferido registro por registro sem um único caractere corrompido.",
    },
    lede: {
      en: "The old database stored text in several character sets, sometimes two within the same table. Libretto couldn’t go live until every name, title and grade came across exactly as it was meant to be.",
      es: "La base vieja guardaba texto en varios juegos de caracteres, a veces dos dentro de la misma tabla. Libretto no podía salir a producción hasta que cada nombre, materia y nota llegara exactamente como debía.",
      it: "Il vecchio database salvava il testo in diversi set di caratteri, a volte due nella stessa tabella. Libretto non poteva andare in produzione finché ogni nome, titolo e voto non fosse arrivato esattamente come doveva essere.",
      pt: "O banco antigo guardava texto em vários conjuntos de caracteres, às vezes dois na mesma tabela. O Libretto não podia entrar em produção até que cada nome, título e nota chegasse exatamente como deveria.",
    },
    facts: [
      { label: { en: "Legacy tables", es: "Tablas legacy", it: "Tabelle legacy", pt: "Tabelas legadas" }, value: { en: "46", es: "46", it: "46", pt: "46" } },
      { label: { en: "Canonical users", es: "Usuarios canónicos", it: "Utenti canonici", pt: "Usuários canônicos" }, value: { en: "436", es: "436", it: "436", pt: "436" } },
      { label: { en: "Mapped records", es: "Registros mapeados", it: "Record mappati", pt: "Registros mapeados" }, value: { en: "14,227", es: "14.227", it: "14.227", pt: "14.227" } },
      { label: { en: "Replacement characters", es: "Caracteres de reemplazo", it: "Caratteri di sostituzione", pt: "Caracteres de substituição" }, value: { en: "0", es: "0", it: "0", pt: "0" } },
    ],
    stack: ["Node.js", "iconv-lite", "mysql2", "Prisma", "MySQL 8"],
    figure: "encoding",
    proof: { en: "46 legacy tables · 14,227 records mapped · 0 replacement characters", es: "46 tablas legacy · 14.227 registros mapeados · 0 caracteres de reemplazo", it: "46 tabelle legacy · 14.227 record mappati · 0 caratteri di sostituzione", pt: "46 tabelas legadas · 14.227 registros mapeados · 0 caracteres de substituição" },
    problem: {
      en: [
        "Each column declared its own character set (latin1, latin2, UTF-16), and a single users table mixed two of them: latin2 for first and last names, latin1 for everything else. Read naively through a UTF-8 connection, a name like Nicolás comes out as NicolÃ¡s; or worse, characters vanish without a trace.",
        "People were spread across three sources (personal records, logins and teaching assignments) with no shared key, and student numbers were unique only within a degree programme.",
      ],
      es: [
        "Cada columna declaraba su propio juego de caracteres (latin1, latin2, UTF-16), y una misma tabla de usuarios mezclaba dos: latin2 para nombre y apellido, latin1 para todo lo demás. Leído ingenuamente por una conexión UTF-8, un nombre como Nicolás sale como NicolÃ¡s; o peor, los caracteres desaparecen sin dejar rastro.",
        "Las personas estaban repartidas en tres fuentes (fichas personales, logins y asignaciones docentes) sin una clave común, y el número de matrícula era único solo dentro de cada carrera.",
      ],
      it: [
        "Ogni colonna dichiarava il proprio set di caratteri (latin1, latin2, UTF-16), e una stessa tabella degli utenti ne mescolava due: latin2 per nome e cognome, latin1 per tutto il resto. Letto in modo ingenuo attraverso una connessione UTF-8, un nome come Nicolás diventa NicolÃ¡s; o peggio, i caratteri spariscono senza lasciare traccia.",
        "Le persone erano distribuite su tre fonti (anagrafiche, login e incarichi di docenza) senza una chiave comune, e i numeri di matricola erano unici solo all’interno di un corso di laurea.",
      ],
      pt: [
        "Cada coluna declarava o próprio conjunto de caracteres (latin1, latin2, UTF-16), e uma mesma tabela de usuários misturava dois deles: latin2 para nome e sobrenome, latin1 para todo o resto. Lido de forma ingênua por uma conexão UTF-8, um nome como Nicolás sai como NicolÃ¡s; ou pior, caracteres somem sem deixar rastro.",
        "As pessoas estavam espalhadas em três fontes (cadastros pessoais, logins e atribuições de docência) sem uma chave em comum, e os números de matrícula só eram únicos dentro de cada curso.",
      ],
    },
    constraints: {
      en: [
        "The old system stayed in use until cut-over, so the migration had to run again and again without duplicating anything.",
        "Production already held data loaded by earlier scripts; the sync had to adopt it, not wipe it.",
        "A non-technical operator had to be able to run it with one command.",
        "No schema changes to the application just to support the migration.",
      ],
      es: [
        "El sistema viejo siguió en uso hasta el corte, así que la migración tenía que poder correr una y otra vez sin duplicar nada.",
        "Producción ya tenía datos cargados por scripts anteriores; la sincronización debía adoptarlos, no borrarlos.",
        "Una persona no técnica tenía que poder ejecutarla con un solo comando.",
        "Sin cambios de esquema en la aplicación solo para soportar la migración.",
      ],
      it: [
        "Il vecchio sistema è rimasto in uso fino al passaggio definitivo, quindi la migrazione doveva poter girare più e più volte senza duplicare nulla.",
        "In produzione c’erano già dati caricati da script precedenti; la sincronizzazione doveva adottarli, non cancellarli.",
        "Un operatore non tecnico doveva poterla lanciare con un solo comando.",
        "Nessuna modifica allo schema dell’applicazione solo per supportare la migrazione.",
      ],
      pt: [
        "O sistema antigo continuou em uso até a virada, então a migração tinha que rodar repetidas vezes sem duplicar nada.",
        "A produção já tinha dados carregados por scripts anteriores; a sincronização tinha que adotá-los, não apagá-los.",
        "Um operador sem conhecimento técnico tinha que conseguir executá-la com um único comando.",
        "Nenhuma mudança de schema na aplicação só para suportar a migração.",
      ],
    },
    built: {
      en: [
        "A sync engine in Node.js that reads the legacy database, plans every write as a pure transformation, checks the whole plan against a quality gate and only then writes: in foreign-key order, one transaction per logical unit, so a crashed run can simply be run again.",
        "It is insert-only: it never updates or deletes. A mapping table (entity, legacy key → new id) remembers what has already moved. For each item: if its key is in the map, skip it; if a row with the same natural key already exists (an email, a user and course, a catalog code), adopt it into the map; otherwise insert it. That middle rule let the engine take over a production database that earlier scripts had already filled.",
        "Three modes for three moments: a preview that writes nothing, a bootstrap that only builds the map, and real runs that require an explicit --allow-write. A wrapper for the operator opens the connections, runs it and prints the outcome in plain language.",
      ],
      es: [
        "Un motor de sincronización en Node.js que lee la base legacy, planifica cada escritura como una transformación pura, valida el plan completo contra un control de calidad y recién entonces escribe: en orden de claves foráneas, una transacción por unidad lógica, para que una corrida interrumpida se pueda simplemente volver a ejecutar.",
        "Solo inserta: nunca actualiza ni borra. Una tabla de mapeo (entidad, clave legacy → id nuevo) recuerda lo que ya se migró. Para cada ítem: si su clave está en el mapa, se saltea; si ya existe una fila con la misma clave natural (un email, un usuario y curso, un código de catálogo), se adopta en el mapa; si no, se inserta. Esa regla del medio permitió que el motor tomara una base de producción que scripts anteriores ya habían llenado.",
        "Tres modos para tres momentos: una vista previa que no escribe nada, un bootstrap que solo arma el mapa, y corridas reales que exigen un --allow-write explícito. Un wrapper para el operador abre las conexiones, lo ejecuta e imprime el resultado en lenguaje claro.",
      ],
      it: [
        "Un motore di sincronizzazione in Node.js che legge il database legacy, pianifica ogni scrittura come trasformazione pura, verifica l’intero piano con un controllo di qualità e solo allora scrive: nell’ordine delle chiavi esterne, una transazione per unità logica, così un’esecuzione interrotta si può semplicemente rilanciare.",
        "Lavora solo in inserimento: non aggiorna né cancella mai. Una tabella di mapping (entità, chiave legacy → nuovo id) ricorda cosa è già stato migrato. Per ogni elemento: se la sua chiave è nella mappa, lo salta; se esiste già una riga con la stessa chiave naturale (un’email, un utente e un corso, un codice di catalogo), la adotta nella mappa; altrimenti lo inserisce. Quella regola intermedia ha permesso al motore di prendere in carico un database di produzione che script precedenti avevano già popolato.",
        "Tre modalità per tre momenti: un’anteprima che non scrive nulla, un bootstrap che costruisce solo la mappa ed esecuzioni reali che richiedono un --allow-write esplicito. Un wrapper per l’operatore apre le connessioni, lo esegue e stampa l’esito in parole semplici.",
      ],
      pt: [
        "Um motor de sincronização em Node.js que lê o banco legado, planeja cada gravação como uma transformação pura, valida o plano inteiro em um controle de qualidade e só então grava: na ordem das chaves estrangeiras, uma transação por unidade lógica, para que uma execução interrompida possa simplesmente rodar de novo.",
        "Ele só insere: nunca atualiza nem apaga. Uma tabela de mapeamento (entidade, chave legada → id novo) lembra o que já foi migrado. Para cada item: se a chave dele está no mapa, pula; se já existe uma linha com a mesma chave natural (um e-mail, um usuário e uma disciplina, um código de catálogo), adota essa linha no mapa; senão, insere. Essa regra do meio permitiu que o motor assumisse um banco de produção que scripts anteriores já tinham preenchido.",
        "Três modos para três momentos: uma prévia que não grava nada, um bootstrap que só monta o mapa, e execuções reais que exigem um --allow-write explícito. Um wrapper para o operador abre as conexões, roda o motor e imprime o resultado em linguagem simples.",
      ],
    },
    hard: [
      {
        title: { en: "Read bytes, not text", es: "Leer bytes, no texto", it: "Leggere byte, non testo", pt: "Ler bytes, não texto" },
        body: {
          en: "Every text column is read as hexadecimal: pure ASCII, so neither the driver nor the connection charset can corrupt it. The bytes are then decoded in Node with the codec that matches the column’s declared charset, looked up in information_schema and cached per table: UTF-16 as UTF-16BE, latin2 as Windows-1250, latin1 as Windows-1252.",
          es: "Cada columna de texto se lee como hexadecimal: ASCII puro, así que ni el driver ni el charset de la conexión pueden corromperla. Después los bytes se decodifican en Node con el códec que corresponde al charset declarado de la columna, consultado en information_schema y cacheado por tabla: UTF-16 como UTF-16BE, latin2 como Windows-1250, latin1 como Windows-1252.",
          it: "Ogni colonna di testo viene letta in esadecimale: puro ASCII, quindi né il driver né il charset della connessione possono corromperla. I byte vengono poi decodificati in Node con il codec che corrisponde al charset dichiarato della colonna, letto da information_schema e messo in cache per tabella: UTF-16 come UTF-16BE, latin2 come Windows-1250, latin1 come Windows-1252.",
          pt: "Cada coluna de texto é lida em hexadecimal: ASCII puro, então nem o driver nem o charset da conexão conseguem corrompê-la. Depois os bytes são decodificados no Node com o codec que corresponde ao charset declarado da coluna, consultado no information_schema e guardado em cache por tabela: UTF-16 como UTF-16BE, latin2 como Windows-1250, latin1 como Windows-1252.",
        },
      },
      {
        title: { en: "Why Windows-1252, not latin1", es: "Por qué Windows-1252 y no latin1", it: "Perché Windows-1252 e non latin1", pt: "Por que Windows-1252, e não latin1" },
        body: {
          en: "In Windows-1252, bytes 0x92 to 0x96 are curly quotes and dashes. In strict latin1 they are invisible control characters, so decoding as latin1 loses them silently, without producing a single replacement character. A check that only looked for broken characters would have passed. Try it in the figure above.",
          es: "En Windows-1252, los bytes 0x92 a 0x96 son comillas tipográficas y guiones. En latin1 estricto son caracteres de control invisibles: decodificar como latin1 los pierde en silencio, sin generar un solo carácter de reemplazo. Un control que solo buscara caracteres rotos habría pasado. Probalo en la figura de arriba.",
          it: "In Windows-1252, i byte da 0x92 a 0x96 sono virgolette tipografiche e trattini. Nel latin1 in senso stretto sono caratteri di controllo invisibili, quindi decodificando come latin1 si perdono in silenzio, senza produrre un solo carattere di sostituzione. Un controllo che cercasse solo i caratteri rotti sarebbe passato. Provalo nella figura qui sopra.",
          pt: "No Windows-1252, os bytes 0x92 a 0x96 são aspas tipográficas e traços. No latin1 estrito, são caracteres de controle invisíveis, então decodificar como latin1 os perde em silêncio, sem gerar um único caractere de substituição. Uma verificação que só procurasse caracteres quebrados teria passado. Experimente na figura acima.",
        },
      },
      {
        title: { en: "A gate that refuses to write", es: "Un control que se niega a escribir", it: "Un controllo che si rifiuta di scrivere", pt: "Um controle que se recusa a gravar" },
        body: {
          en: "Every decode counts U+FFFD, the replacement character. If the total is above zero, the engine throws before its first write and exits non-zero. In the prototype, decoding two sample tables as UTF-8 produced 54 and 284 of them; with the right codecs, zero. Later, when the live host converted one exam table to real UTF-8 mid-project, decoding moved from per table to per column.",
          es: "Cada decodificación cuenta los U+FFFD, el carácter de reemplazo. Si el total es mayor que cero, el motor lanza un error antes de su primera escritura y termina con código distinto de cero. En el prototipo, decodificar dos tablas de muestra como UTF-8 producía 54 y 284; con los códecs correctos, cero. Más tarde, cuando el servidor productivo convirtió una tabla de exámenes a UTF-8 real a mitad del proyecto, la decodificación pasó de ser por tabla a ser por columna.",
          it: "Ogni decodifica conta gli U+FFFD, il carattere di sostituzione. Se il totale è maggiore di zero, il motore solleva un errore prima della sua prima scrittura ed esce con un codice diverso da zero. Nel prototipo, decodificare come UTF-8 due tabelle di esempio ne produceva 54 e 284; con i codec giusti, zero. Più avanti, quando a metà progetto il server di produzione ha convertito una tabella degli esami in vero UTF-8, la decodifica è passata da una gestione per tabella a una per colonna.",
          pt: "Cada decodificação conta os U+FFFD, o caractere de substituição. Se o total for maior que zero, o motor lança um erro antes da primeira gravação e termina com código de saída diferente de zero. No protótipo, decodificar duas tabelas de amostra como UTF-8 produziu 54 e 284 deles; com os codecs certos, zero. Mais tarde, quando o servidor de produção converteu uma tabela de exames para UTF-8 de verdade no meio do projeto, a decodificação passou de por tabela para por coluna.",
        },
      },
      {
        title: { en: "Who is who", es: "Quién es quién", it: "Chi è chi", pt: "Quem é quem" },
        body: {
          en: "Three sources merged into 436 canonical users, including 51 placeholders for people who existed only in exam tables. Without them, 280 exam records would have been dropped. Student numbers collided across people; resolving them by canonical identity and most recent enrollment assigned a number to 357 of 364 people and left 7 for a human to decide, instead of guessing.",
          es: "Tres fuentes se fusionaron en 436 usuarios canónicos, incluidos 51 marcadores para personas que solo existían en tablas de exámenes: sin ellos se habrían perdido 280 registros de examen. Los números de matrícula chocaban entre personas; resolverlos por identidad canónica e inscripción más reciente asignó número a 357 de 364 personas y dejó 7 para que decida una persona, en lugar de adivinar.",
          it: "Tre fonti sono confluite in 436 utenti canonici, tra cui 51 segnaposto per persone che esistevano solo nelle tabelle degli esami. Senza di loro si sarebbero persi 280 record d’esame. I numeri di matricola collidevano tra persone diverse; risolverli in base all’identità canonica e all’iscrizione più recente ha assegnato un numero a 357 persone su 364 e ne ha lasciate 7 alla decisione di una persona, invece di tirare a indovinare.",
          pt: "Três fontes se fundiram em 436 usuários canônicos, incluindo 51 placeholders para pessoas que só existiam nas tabelas de exames. Sem eles, 280 registros de exame teriam sido descartados. Os números de matrícula colidiam entre pessoas; resolvê-los pela identidade canônica e pela matrícula mais recente atribuiu um número a 357 de 364 pessoas e deixou 7 para um humano decidir, em vez de adivinhar.",
        },
      },
    ],
    result: {
      en: [
        "Zero replacement characters across every migrated table.",
        "436 canonical users from three sources, and 280 exam records kept that a naive merge would have dropped.",
        "357 of 364 student numbers resolved automatically; 7 flagged for review instead of guessed.",
        "Idempotent by design: running it again after a load finds nothing to do. The map holds 14,227 records.",
        "On 13 October 2026 the old system was frozen and Libretto took over.",
      ],
      es: [
        "Cero caracteres de reemplazo en todas las tablas migradas.",
        "436 usuarios canónicos a partir de tres fuentes, y 280 registros de examen conservados que una fusión ingenua habría perdido.",
        "357 de 364 matrículas resueltas automáticamente; 7 marcadas para revisión en lugar de adivinadas.",
        "Idempotente por diseño: volver a correrlo después de una carga no encuentra nada que hacer. El mapa tiene 14.227 registros.",
        "El 13 de octubre de 2026 se congeló el sistema viejo y Libretto tomó la posta.",
      ],
      it: [
        "Zero caratteri di sostituzione in tutte le tabelle migrate.",
        "436 utenti canonici da tre fonti, e 280 record d’esame conservati che una fusione ingenua avrebbe perso.",
        "357 numeri di matricola su 364 risolti automaticamente; 7 segnalati per la revisione invece che indovinati.",
        "Idempotente per costruzione: rilanciarlo dopo un caricamento non trova nulla da fare. La mappa contiene 14.227 record.",
        "Il 13 ottobre 2026 il vecchio sistema è stato congelato e Libretto ha preso il suo posto.",
      ],
      pt: [
        "Zero caracteres de substituição em todas as tabelas migradas.",
        "436 usuários canônicos a partir de três fontes, e 280 registros de exame preservados que uma fusão ingênua teria descartado.",
        "357 de 364 números de matrícula resolvidos automaticamente; 7 marcados para revisão em vez de adivinhados.",
        "Idempotente por design: rodar de novo depois de uma carga não encontra nada para fazer. O mapa guarda 14.227 registros.",
        "Em 13 de outubro de 2026 o sistema antigo foi congelado e o Libretto assumiu.",
      ],
    },
  },
  {
    slug: "himnova-live",
    title: { en: "Himnova Live", es: "Himnova Live", it: "Himnova Live", pt: "Himnova Live" },
    client: { en: "Open source, for churches", es: "Código abierto, para iglesias", it: "Open source, per le chiese", pt: "Código aberto, para igrejas" },
    period: { from: "2026-07" },
    role: { en: "Author and maintainer", es: "Autor y mantenedor", it: "Autore e maintainer", pt: "Autor e mantenedor" },
    summary: {
      en: "Free, open-source projection software for church services (slides, video, the Bible, song lyrics and timers on a second screen), built to replace EasyWorship. Public since October 2026.",
      es: "Software libre de proyección para cultos (diapositivas, video, la Biblia, letras de canciones y temporizadores en una segunda pantalla), hecho para reemplazar a EasyWorship. Público desde octubre de 2026.",
      it: "Software di proiezione gratuito e open source per il culto (slide, video, la Bibbia, testi dei canti e timer su un secondo schermo), nato per sostituire EasyWorship. Pubblico da ottobre 2026.",
      pt: "Software de projeção gratuito e de código aberto para cultos (slides, vídeo, a Bíblia, letras de músicas e temporizadores numa segunda tela), feito para substituir o EasyWorship. Público desde outubro de 2026.",
    },
    lede: {
      en: "During a service, one person runs the screen: a hymn, a Bible passage, the sermon slides, a video. Himnova Live is the desktop app for that job (a control window for the operator, a projection window for everyone else), and since October 2026 it is open source, with installers for Windows, macOS and Linux.",
      es: "Durante un culto, una persona maneja la pantalla: un himno, un pasaje bíblico, las diapositivas del sermón, un video. Himnova Live es la app de escritorio para esa tarea (una ventana de control para quien opera y una de proyección para todos los demás), y desde octubre de 2026 es de código abierto, con instaladores para Windows, macOS y Linux.",
      it: "Durante un culto, una persona gestisce lo schermo: un inno, un passo della Bibbia, le slide della predicazione, un video. Himnova Live è l’app desktop per questo compito (una finestra di controllo per l’operatore, una finestra di proiezione per tutti gli altri) e da ottobre 2026 è open source, con installer per Windows, macOS e Linux.",
      pt: "Durante um culto, uma pessoa opera a tela: um hino, uma passagem bíblica, os slides do sermão, um vídeo. O Himnova Live é o aplicativo de desktop para essa tarefa (uma janela de controle para o operador, uma janela de projeção para todos os outros), e desde outubro de 2026 é de código aberto, com instaladores para Windows, macOS e Linux.",
    },
    screenshot: {
      alt: {
        en: "The Himnova Live control window: the schedule on the left, the preview in the middle and what is on the projector on the right.",
        es: "La ventana de control de Himnova Live: el programa a la izquierda, la vista previa en el centro y lo que está en el proyector a la derecha.",
        it: "La finestra di controllo di Himnova Live: la scaletta a sinistra, l’anteprima al centro e ciò che è sul proiettore a destra.",
        pt: "A janela de controle do Himnova Live: a programação à esquerda, a prévia no meio e o que está no projetor à direita.",
      },
      image: {
        en: { light: himnovaEnLight, dark: himnovaEnDark },
        es: { light: himnovaEsLight, dark: himnovaEsDark },
        it: { light: himnovaItLight, dark: himnovaItDark },
        pt: { light: himnovaPtLight, dark: himnovaPtDark },
      },
    },
    openSource: {
      repo: "https://github.com/NicolasAmorosi/himnova-live",
      website: "https://himnova-live.vercel.app",
    },
    facts: [
      { label: { en: "License", es: "Licencia", it: "Licenza", pt: "Licença" }, value: { en: "GPL-3.0", es: "GPL-3.0", it: "GPL-3.0", pt: "GPL-3.0" } },
      { label: { en: "Runs on", es: "Corre en", it: "Funziona su", pt: "Roda em" }, value: { en: "Windows, macOS, Linux", es: "Windows, macOS, Linux", it: "Windows, macOS, Linux", pt: "Windows, macOS, Linux" } },
      { label: { en: "Automated tests", es: "Tests automatizados", it: "Test automatici", pt: "Testes automatizados" }, value: { en: "1,229", es: "1.229", it: "1.229", pt: "1.229" } },
      { label: { en: "Version", es: "Versión", it: "Versione", pt: "Versão" }, value: { en: "2.8", es: "2.8", it: "2.8", pt: "2.8" } },
    ],
    stack: [
      "Electron",
      "TypeScript",
      "React 19",
      "electron-vite",
      "Tailwind CSS 4",
      "Zustand",
      "SQLite",
      "Drizzle",
      "FTS5",
      "pdf.js",
      "libmpv",
      "C++",
      "FFmpeg",
      "NDI",
      "electron-updater",
      "Vitest",
      "Playwright",
      "electron-builder",
    ],
    figure: "projection",
    proof: { en: "GPL-3.0 · Windows, macOS and Linux · 1,229 tests", es: "GPL-3.0 · Windows, macOS y Linux · 1.229 tests", it: "GPL-3.0 · Windows, macOS e Linux · 1.229 test", pt: "GPL-3.0 · Windows, macOS e Linux · 1.229 testes" },
    problem: {
      en: [
        "Himnova Live (called WorshipApp until October 2026 and Lumina Live until November) was built to replace EasyWorship. It is the third attempt at it: an earlier project, now archived, and a plain-JavaScript version came first.",
        "Operators already know EasyWorship’s two-step flow (pick an item, check it in the preview, only then send it live), so the replacement keeps it.",
      ],
      es: [
        "Himnova Live (WorshipApp hasta octubre de 2026 y Lumina Live hasta noviembre) nació para reemplazar a EasyWorship. Es el tercer intento: antes hubo un proyecto, hoy archivado, y una versión en JavaScript plano.",
        "Quienes operan ya conocen el flujo en dos pasos de EasyWorship (elegir, revisarlo en la vista previa y recién entonces mandarlo en vivo), así que el reemplazo lo conserva.",
      ],
      it: [
        "Himnova Live (che si chiamava WorshipApp fino a ottobre 2026 e Lumina Live fino a novembre) è nato per sostituire EasyWorship. È il terzo tentativo: prima sono venuti un progetto precedente, ora archiviato, e una versione in JavaScript puro.",
        "Gli operatori conoscono già il flusso in due passaggi di EasyWorship (scegliere un elemento, controllarlo nell’anteprima e solo allora mandarlo in onda), quindi il sostituto lo mantiene.",
      ],
      pt: [
        "O Himnova Live (chamado WorshipApp até outubro de 2026 e Lumina Live até novembro) foi criado para substituir o EasyWorship. É a terceira tentativa: antes vieram outro projeto, hoje arquivado, e uma versão em JavaScript puro.",
        "Os operadores já conhecem o fluxo em duas etapas do EasyWorship (escolher um item, conferir na prévia e só então colocá-lo no ar), então o substituto o mantém.",
      ],
    },
    constraints: {
      en: [
        "Runs on Windows, macOS and Linux; developed on a Mac.",
        "Live use: if the projector disconnects, the picture comes back by itself when it reconnects; if the projection window closes, it returns exactly as it was.",
        "Offline: everything local, including the Bible text and its search.",
        "Slides arrive as PowerPoint files (among them .pps hymnals that advance on their own, with the music embedded) and must open with nothing else installed.",
        "Open source under GPL-3.0: the code, its documentation and its tests are public, in English, for anyone who wants to contribute.",
      ],
      es: [
        "Corre en Windows, macOS y Linux; desarrollada en una Mac.",
        "Uso en vivo: si el proyector se desconecta, la imagen vuelve sola al reconectarlo; si la ventana de proyección se cierra, vuelve exactamente como estaba.",
        "Sin conexión: todo local, incluido el texto bíblico y su búsqueda.",
        "Las diapositivas llegan como archivos de PowerPoint, entre ellos himnarios .pps que avanzan solos y traen la música adentro, y tienen que abrir sin instalar nada más.",
        "Código abierto bajo GPL-3.0: el código, su documentación y sus tests son públicos, en inglés, para quien quiera contribuir.",
      ],
      it: [
        "Funziona su Windows, macOS e Linux; sviluppato su un Mac.",
        "Uso dal vivo: se il proiettore si scollega, l’immagine torna da sola quando si ricollega; se la finestra di proiezione si chiude, riappare esattamente com’era.",
        "Offline: tutto in locale, compresi il testo della Bibbia e la sua ricerca.",
        "Le slide arrivano come file PowerPoint (tra cui innari .pps che avanzano da soli, con la musica incorporata) e devono aprirsi senza dover installare nient’altro.",
        "Open source con licenza GPL-3.0: il codice, la documentazione e i test sono pubblici, in inglese, per chiunque voglia contribuire.",
      ],
      pt: [
        "Roda em Windows, macOS e Linux; desenvolvido em um Mac.",
        "Uso ao vivo: se o projetor se desconecta, a imagem volta sozinha quando ele se reconecta; se a janela de projeção fecha, ela volta exatamente como estava.",
        "Offline: tudo local, inclusive o texto da Bíblia e a busca nele.",
        "Os slides chegam como arquivos de PowerPoint (entre eles hinários .pps que avançam sozinhos, com a música embutida) e precisam abrir sem mais nada instalado.",
        "Código aberto sob GPL-3.0: o código, a documentação e os testes são públicos, em inglês, para quem quiser contribuir.",
      ],
    },
    built: {
      en: [
        "An Electron app with a strict split: the main process owns state and the database, the operator works in a control window, and the projection window is a pure function of the last output it received. Reopen it and the main process replays that output: the screen comes back exactly as it was.",
        "Secure defaults kept on (sandboxed renderers, web security enabled), with local files served through a custom worship:// protocol by id, never by path.",
        "SQLite with Drizzle for service programmes, the media library and the Bible (nine public-domain or freely licensed versions in four languages ship with it, others import from five formats), with FTS5 full-text search that ignores accents, so typing “senor” finds “Señor”.",
        "Any video or audio plays straight from the original file: what Chromium can’t decode (AVI, WMV, WMA, ProRes) goes through the app’s own media engine, built on libmpv, with the same picture on the projector and the monitors. The interface speaks English, Spanish, Italian and Portuguese, and the dictionaries are typed against each other, so a missing string doesn’t compile.",
        "Song lyrics, typed or pasted, become slides, and every slide of a song is drawn at the same size: the largest at which all of them fit. Songs import from EasyWorship 6, OpenLP, OpenLyrics, SongSelect and ChordPro, and a stage screen shows the musicians the chords the projector never shows. For streaming, the projector’s picture and the app’s sound go out over NDI to OBS or vMix.",
      ],
      es: [
        "Una app Electron con una separación estricta: el proceso principal es dueño del estado y la base de datos, quien opera trabaja en una ventana de control, y la ventana de proyección es una función pura de la última salida que recibió. Si se reabre, el proceso principal reenvía esa salida y la pantalla vuelve exactamente como estaba.",
        "Valores seguros por defecto (renderers en sandbox, web security activado), con los archivos locales servidos por un protocolo propio worship:// por id, nunca por ruta.",
        "SQLite con Drizzle para programas de culto, la biblioteca de medios y la Biblia (vienen nueve versiones de dominio público o de licencia libre en cuatro idiomas, y otras se importan desde cinco formatos), con búsqueda de texto completo FTS5 que ignora acentos: escribir “senor” encuentra “Señor”.",
        "Cualquier video o audio se reproduce directo del archivo original: lo que Chromium no puede decodificar (AVI, WMV, WMA, ProRes) pasa por un motor de medios propio, construido sobre libmpv, con la misma imagen en el proyector y en los monitores. La interfaz está en español, inglés, italiano y portugués, y los diccionarios se tipan entre sí: un texto faltante no compila.",
        "Las letras de las canciones, escritas o pegadas, se vuelven diapositivas, y todas las de una canción se dibujan al mismo tamaño: el más grande en el que entran todas. Las canciones se importan desde EasyWorship 6, OpenLP, OpenLyrics, SongSelect y ChordPro, y una pantalla de escenario les muestra a los músicos los acordes que el proyector nunca muestra. Para transmitir, la imagen del proyector y el sonido de la app salen por NDI hacia OBS o vMix.",
      ],
      it: [
        "Un’app Electron con una separazione rigorosa: il processo principale possiede lo stato e il database, l’operatore lavora in una finestra di controllo e la finestra di proiezione è una funzione pura dell’ultimo output ricevuto. Se la si riapre, il processo principale reinvia quell’output: lo schermo torna esattamente com’era.",
        "Impostazioni di sicurezza predefinite lasciate attive (renderer in sandbox, web security abilitata), con i file locali serviti tramite un protocollo personalizzato worship:// per id, mai per percorso.",
        "SQLite con Drizzle per i programmi dei culti, la libreria multimediale e la Bibbia (sono incluse nove versioni di pubblico dominio o con licenza libera in quattro lingue, altre si importano da cinque formati), con ricerca full-text FTS5 che ignora gli accenti, così digitando “senor” si trova “Señor”.",
        "Qualsiasi video o audio viene riprodotto direttamente dal file originale: ciò che Chromium non sa decodificare (AVI, WMV, WMA, ProRes) passa dal motore multimediale dell’app, basato su libmpv, con la stessa immagine sul proiettore e sui monitor. L’interfaccia parla inglese, spagnolo, italiano e portoghese, e i dizionari sono tipizzati tra loro, quindi una stringa mancante non compila.",
        "I testi dei canti, digitati o incollati, diventano slide, e tutte le slide di un canto vengono disegnate alla stessa dimensione: la più grande in cui entrano tutte. I canti si importano da EasyWorship 6, OpenLP, OpenLyrics, SongSelect e ChordPro, e uno schermo per il palco mostra ai musicisti gli accordi che il proiettore non mostra mai. Per lo streaming, l’immagine del proiettore e l’audio dell’app escono via NDI verso OBS o vMix.",
      ],
      pt: [
        "Um app Electron com uma separação rígida: o processo principal é dono do estado e do banco de dados, o operador trabalha em uma janela de controle, e a janela de projeção é uma função pura da última saída que recebeu. Se ela for reaberta, o processo principal reenvia essa saída: a tela volta exatamente como estava.",
        "Os padrões seguros continuam ativos (renderers em sandbox, web security habilitada), com os arquivos locais servidos por um protocolo próprio worship:// por id, nunca por caminho.",
        "SQLite com Drizzle para as programações dos cultos, a biblioteca de mídia e a Bíblia (o app traz nove versões de domínio público ou de licença livre em quatro idiomas, e outras podem ser importadas de cinco formatos), com busca de texto completo FTS5 que ignora acentos, então digitar “senor” encontra “Señor”.",
        "Qualquer vídeo ou áudio toca direto do arquivo original: o que o Chromium não consegue decodificar (AVI, WMV, WMA, ProRes) passa pelo motor de mídia próprio do app, construído sobre a libmpv, com a mesma imagem no projetor e nos monitores. A interface está em inglês, espanhol, italiano e português, e os dicionários são tipados uns contra os outros, então uma string faltando não compila.",
        "As letras das músicas, digitadas ou coladas, viram slides, e todos os slides de uma música são desenhados no mesmo tamanho: o maior em que todos cabem. As músicas podem ser importadas do EasyWorship 6, OpenLP, OpenLyrics, SongSelect e ChordPro, e uma tela de palco mostra aos músicos os acordes que o projetor nunca mostra. Para transmissão, a imagem do projetor e o som do app saem por NDI para o OBS ou o vMix.",
      ],
    },
    hard: [
      {
        title: { en: "One typed IPC contract", es: "Un único contrato IPC tipado", it: "Un unico contratto IPC tipizzato", pt: "Um único contrato de IPC tipado" },
        body: {
          en: "Every message between processes is declared once, in a single contract type. A missing or mistyped handler doesn’t compile, and errors travel back as a typed result instead of exceptions crossing process boundaries.",
          es: "Cada mensaje entre procesos se declara una sola vez, en un único tipo de contrato. Un handler faltante o mal tipado no compila, y los errores vuelven como un resultado tipado en lugar de excepciones cruzando procesos.",
          it: "Ogni messaggio tra processi è dichiarato una sola volta, in un unico tipo di contratto. Un handler mancante o con il tipo sbagliato non compila, e gli errori tornano indietro come risultato tipizzato invece che come eccezioni che attraversano i confini tra processi.",
          pt: "Cada mensagem entre processos é declarada uma única vez, em um único tipo de contrato. Um handler ausente ou com o tipo errado não compila, e os erros voltam como um resultado tipado em vez de exceções atravessando os limites entre processos.",
        },
      },
      {
        title: { en: "PowerPoint without PowerPoint", es: "PowerPoint sin PowerPoint", it: "PowerPoint senza PowerPoint", pt: "PowerPoint sem PowerPoint" },
        body: {
          en: "Automating PowerPoint over COM tied the app to Office; converting through headless LibreOffice meant one more install and a wait before every new deck. Now the app reads presentations itself (.pptx, the older binary .ppt and .pps, and .odp) on a worker thread, into a model of what to paint on each slide, which React draws. EMF and WMF pictures become SVG, embedded fonts are rebuilt as TrueType, and a hymnal of .pps pictures opens at once, served straight from the file. Timings, transitions and each slide’s sound come from the file too.",
          es: "Automatizar PowerPoint por COM ataba la app a Office; convertir con LibreOffice headless sumaba otra instalación y una espera antes de cada presentación nueva. Ahora la app lee las presentaciones ella misma (.pptx, los viejos .ppt y .pps binarios y .odp) en un worker thread, y arma un modelo de lo que hay que pintar en cada diapositiva, que dibuja React. Las imágenes EMF y WMF pasan a SVG, las fuentes incrustadas se reconstruyen como TrueType y un himnario de .pps hechos de imágenes abre al instante, servido directo desde el archivo. Los tiempos, las transiciones y el sonido de cada diapositiva también salen del archivo.",
          it: "Automatizzare PowerPoint via COM legava l’app a Office; convertire con LibreOffice headless significava un’installazione in più e un’attesa prima di ogni nuova presentazione. Ora l’app legge da sé le presentazioni (.pptx, i vecchi .ppt e .pps binari, e .odp) in un worker thread, ricavandone un modello di cosa dipingere in ogni slide, che poi React disegna. Le immagini EMF e WMF diventano SVG, i font incorporati vengono ricostruiti come TrueType e un innario di .pps fatti di immagini si apre all’istante, servito direttamente dal file. Anche tempi, transizioni e l’audio di ogni slide vengono dal file.",
          pt: "Automatizar o PowerPoint via COM prendia o app ao Office; converter com o LibreOffice headless significava mais uma instalação e uma espera antes de cada apresentação nova. Agora o app lê as apresentações sozinho (.pptx, os antigos binários .ppt e .pps, e .odp) em uma worker thread, gerando um modelo do que pintar em cada slide, que o React desenha. Imagens EMF e WMF viram SVG, fontes embutidas são reconstruídas como TrueType, e um hinário de .pps feitos de imagens abre na hora, servido direto do arquivo. Os tempos, as transições e o som de cada slide também vêm do arquivo.",
        },
      },
      {
        title: { en: "Reading it as a stranger would", es: "Leerlo como un desconocido", it: "Leggerlo come farebbe un estraneo", pt: "Ler como um estranho leria" },
        body: {
          en: "Before the repository went public, its whole history was swept for keys, tokens and local paths, the licence was agreed with the author of the first version, and the bundled Bible was checked. Its spelling (“y fué la luz”, “ha dado á su Hijo”) gave it away as the 1909 Reina-Valera, in the public domain, not the copyrighted 1960 edition it was labelled as. It was renamed, with a migration for existing installs.",
          es: "Antes de abrir el repositorio se revisó toda su historia en busca de claves, tokens y rutas locales, la licencia se acordó con el autor de la primera versión y se verificó la Biblia incluida. Su ortografía («y fué la luz», «ha dado á su Hijo») la delató como la Reina-Valera de 1909, de dominio público, y no la edición de 1960, con derechos de autor, que decía ser. Se le cambió el nombre, con una migración para las instalaciones existentes.",
          it: "Prima che il repository diventasse pubblico, tutta la sua storia è stata passata al setaccio in cerca di chiavi, token e percorsi locali, la licenza è stata concordata con l’autore della prima versione ed è stata verificata la Bibbia inclusa. La sua ortografia (“y fué la luz”, “ha dado á su Hijo”) l’ha tradita: era la Reina-Valera del 1909, di pubblico dominio, e non l’edizione del 1960 protetta da copyright indicata nell’etichetta. È stata rinominata, con una migrazione per le installazioni esistenti.",
          pt: "Antes de o repositório se tornar público, todo o seu histórico foi varrido em busca de chaves, tokens e caminhos locais, a licença foi acertada com o autor da primeira versão, e a Bíblia incluída foi verificada. A ortografia dela (“y fué la luz”, “ha dado á su Hijo”) a denunciou como a Reina-Valera de 1909, em domínio público, e não a edição de 1960, protegida por direitos autorais, como estava rotulada. Ela foi renomeada, com uma migração para as instalações existentes.",
        },
      },
      {
        title: { en: "A space in the path", es: "Un espacio en la ruta", it: "Uno spazio nel percorso", pt: "Um espaço no caminho" },
        body: {
          en: "The Linux packages were tested in containers with Chromium’s sandbox really on (the end-to-end suite turns it off). That caught a .deb that wouldn’t start: installed under a folder named after the product, with a space in it, the sandbox helper’s path was split at the space. It now installs to /opt/himnova-live and keeps the product name in the menu.",
          es: "Los paquetes de Linux se probaron en contenedores con el sandbox de Chromium activado de verdad (la suite end-to-end lo apaga). Así apareció un .deb que no arrancaba: instalado en una carpeta con el nombre del producto, que tiene un espacio, la ruta del helper del sandbox se partía en el espacio. Ahora se instala en /opt/himnova-live y conserva el nombre del producto en el menú.",
          it: "I pacchetti Linux sono stati testati in container con la sandbox di Chromium realmente attiva (la suite end-to-end la disattiva). Così è emerso un .deb che non si avviava: installato in una cartella con il nome del prodotto, che contiene uno spazio, il percorso dell’helper della sandbox veniva spezzato in corrispondenza dello spazio. Ora si installa in /opt/himnova-live e mantiene il nome del prodotto nel menu.",
          pt: "Os pacotes para Linux foram testados em containers com o sandbox do Chromium ativado de verdade (a suíte end-to-end o desliga). Isso pegou um .deb que não iniciava: instalado em uma pasta com o nome do produto, que tem um espaço, o caminho do helper do sandbox era quebrado no espaço. Agora ele é instalado em /opt/himnova-live e mantém o nome do produto no menu.",
        },
      },
    ],
    result: {
      en: [
        "Released as open source on 23 October 2026, as 2.2.0-beta.4. The stable 2.2.0 followed on 4 November, with installers for Windows, macOS and Linux (Linux no longer experimental). Nine more releases came out in the following week, up to 2.8.0 on 11 November, when it was renamed Himnova Live.",
        "From 2.2.0 on, the app updates itself: it checks when it opens, downloads only when asked, and asks first if something is on the projector. Nothing about updates ever reaches the projection window. Installs under the old name moved to the new one through that same updater.",
        "922 unit tests and 307 end-to-end tests; before 2.8.0, the end-to-end suite ran against the packaged app on macOS, Windows and Linux.",
      ],
      es: [
        "Publicado como código abierto el 23 de octubre de 2026, como 2.2.0-beta.4. La 2.2.0 estable llegó el 4 de noviembre, con instaladores para Windows, macOS y Linux (Linux ya no es experimental). En la semana siguiente salieron nueve versiones más, hasta la 2.8.0 del 11 de noviembre, con la que pasó a llamarse Himnova Live.",
        "Desde la 2.2.0 la app se actualiza sola: busca al abrirse, descarga solo cuando se lo piden y pregunta antes si hay algo en el proyector. Nada de las actualizaciones llega nunca a la ventana de proyección. Las instalaciones con el nombre viejo pasaron al nuevo por ese mismo actualizador.",
        "922 tests unitarios y 307 end-to-end; antes de la 2.8.0, la suite end-to-end corrió contra la app empaquetada en macOS, Windows y Linux.",
      ],
      it: [
        "Pubblicato come open source il 23 ottobre 2026, con la versione 2.2.0-beta.4. La 2.2.0 stabile è arrivata il 4 novembre, con installer per Windows, macOS e Linux (Linux non più sperimentale). Nella settimana successiva sono uscite altre nove release, fino alla 2.8.0 dell’11 novembre, quando è stato rinominato Himnova Live.",
        "Dalla 2.2.0 l’app si aggiorna da sola: controlla all’apertura, scarica solo su richiesta e chiede prima se c’è qualcosa sul proiettore. Nella finestra di proiezione non arriva mai nulla che riguardi gli aggiornamenti. Le installazioni con il vecchio nome sono passate al nuovo tramite lo stesso sistema di aggiornamento.",
        "922 test unitari e 307 test end-to-end; prima della 2.8.0, la suite end-to-end è stata eseguita sull’app pacchettizzata su macOS, Windows e Linux.",
      ],
      pt: [
        "Lançado como código aberto em 23 de outubro de 2026, como 2.2.0-beta.4. A 2.2.0 estável veio em 4 de novembro, com instaladores para Windows, macOS e Linux (o Linux deixou de ser experimental). Mais nove versões saíram na semana seguinte, até a 2.8.0, em 11 de novembro, quando passou a se chamar Himnova Live.",
        "A partir da 2.2.0, o app se atualiza sozinho: verifica ao abrir, só baixa quando o usuário pede e pergunta antes se há algo no projetor. Nada relacionado às atualizações chega à janela de projeção. As instalações com o nome antigo passaram para o novo por esse mesmo atualizador.",
        "922 testes unitários e 307 testes end-to-end; antes da 2.8.0, a suíte end-to-end rodou contra o app empacotado no macOS, no Windows e no Linux.",
      ],
    },
  },
  {
    slug: "hr-platform",
    title: { en: "HR & admin platform", es: "Plataforma de RR. HH.", it: "Piattaforma HR e amministrativa", pt: "Plataforma de RH e administração" },
    client: { en: "Italian Adventist Church Union", es: "Unión Italiana de Iglesias Adventistas", it: "Unione Italiana delle Chiese Cristiane Avventiste del 7° Giorno", pt: "União Italiana das Igrejas Adventistas" },
    period: { from: "2025-06", to: "2026-09" },
    role: {
      en: "Lead developer of a team of three, plus two rotating",
      es: "Líder de un equipo de tres desarrolladores, más dos rotativos",
      it: "Lead developer di un team di tre, più due a rotazione",
      pt: "Desenvolvedor principal de uma equipe de três, mais dois em rodízio",
    },
    summary: {
      en: "Monthly work reports, absences, medical expenses, travel and treasury for the staff and ministers of the Union, with approval chains and three languages.",
      es: "Reportes mensuales de trabajo, ausencias, gastos médicos, viajes y tesorería para el personal y los pastores de la Unión, con cadenas de aprobación y tres idiomas.",
      it: "Rapportini mensili, assenze, spese mediche, viaggi e tesoreria per il personale e i pastori dell’Unione, con catene di approvazione e tre lingue.",
      pt: "Relatórios mensais de trabalho, ausências, despesas médicas, viagens e tesouraria para os funcionários e os pastores da União, com cadeias de aprovação e três idiomas.",
    },
    lede: {
      en: "The Union’s staff and ministers report their work every month, request time off and expenses, and wait for the right people to approve them. I led the team that built the platform for it: first a first-generation app, then the rewrite that replaced it.",
      es: "El personal y los pastores de la Unión reportan su trabajo cada mes, piden licencias y reintegros, y esperan que las personas correctas los aprueben. Lideré el equipo que construyó la plataforma para eso: primero una primera generación y después la reescritura que la reemplazó.",
      it: "Ogni mese il personale e i pastori dell’Unione rendicontano il proprio lavoro, chiedono permessi e rimborsi spese e aspettano che le persone giuste li approvino. Ho guidato il team che ha costruito la piattaforma per tutto questo: prima un’app di prima generazione, poi la riscrittura che l’ha sostituita.",
      pt: "Os funcionários e pastores da União relatam seu trabalho todo mês, pedem folgas e reembolsos de despesas, e esperam que as pessoas certas aprovem. Liderei a equipe que construiu a plataforma para isso: primeiro um aplicativo de primeira geração, depois a reescrita que o substituiu.",
    },
    facts: [
      { label: { en: "Data models", es: "Modelos de datos", it: "Modelli di dati", pt: "Modelos de dados" }, value: { en: "29", es: "29", it: "29", pt: "29" } },
      { label: { en: "API modules", es: "Módulos de API", it: "Moduli API", pt: "Módulos de API" }, value: { en: "29", es: "29", it: "29", pt: "29" } },
      { label: { en: "Automated tests", es: "Tests automatizados", it: "Test automatici", pt: "Testes automatizados" }, value: { en: "~520", es: "~520", it: "~520", pt: "~520" } },
      { label: { en: "Interface languages", es: "Idiomas de la interfaz", it: "Lingue dell’interfaccia", pt: "Idiomas da interface" }, value: { en: "3", es: "3", it: "3", pt: "3" } },
    ],
    stack: [
      "TypeScript",
      "Next.js 16",
      "React 19",
      "NestJS 11",
      "Prisma",
      "MySQL 8",
      "Microsoft Entra ID",
      "Microsoft Graph",
      "AWS S3",
      "shadcn/ui",
      "Docker",
      "GitHub Actions",
    ],
    figure: "approval",
    proof: { en: "29 data models · ~520 tests · 3 interface languages", es: "29 modelos de datos · ~520 tests · 3 idiomas de interfaz", it: "29 modelli di dati · ~520 test · 3 lingue dell’interfaccia", pt: "29 modelos de dados · ~520 testes · 3 idiomas de interface" },
    problem: {
      en: [
        "Two kinds of staff with different rules (employees under the national labour contract and ministers), each filing a monthly report, plus absences, medical expenses, travel invitations and treasury exports.",
        "Every request has to climb a hierarchy before it counts, and at the end of the month treasury and the secretariat need exports they can use without retyping anything.",
      ],
      es: [
        "Dos tipos de personal con reglas distintas (empleados bajo convenio colectivo y pastores), cada uno con su reporte mensual, más ausencias, gastos médicos, invitaciones de viaje y exportaciones para tesorería.",
        "Cada solicitud tiene que subir por una jerarquía antes de valer, y a fin de mes tesorería y secretaría necesitan exportaciones que puedan usar sin volver a tipear nada.",
      ],
      it: [
        "Due tipi di personale con regole diverse (dipendenti con il contratto collettivo nazionale e pastori), ciascuno con il proprio rapportino mensile, più assenze, spese mediche, inviti di viaggio ed esportazioni per la tesoreria.",
        "Ogni richiesta deve risalire una gerarchia prima di essere valida, e a fine mese tesoreria e segreteria hanno bisogno di esportazioni da usare senza ridigitare nulla.",
      ],
      pt: [
        "Dois tipos de funcionários com regras diferentes (empregados regidos pelo contrato coletivo nacional de trabalho e pastores), cada um enviando um relatório mensal, além de ausências, despesas médicas, convites de viagem e exportações para a tesouraria.",
        "Cada solicitação precisa subir por uma hierarquia antes de valer, e no fim do mês a tesouraria e a secretaria precisam de exportações que possam usar sem redigitar nada.",
      ],
    },
    constraints: {
      en: [
        "Italian by default, with Spanish and English for an international staff.",
        "Sign-in with the organization’s Microsoft accounts; email through Microsoft Graph.",
        "A team of three developers, with two more rotating in.",
        "Replace the first-generation app, which I had also started.",
      ],
      es: [
        "Italiano por defecto, con español e inglés para un personal internacional.",
        "Inicio de sesión con las cuentas Microsoft de la organización; emails a través de Microsoft Graph.",
        "Un equipo de tres desarrolladores, con dos más rotando.",
        "Reemplazar la primera generación, que también había arrancado yo.",
      ],
      it: [
        "Italiano come lingua predefinita, con spagnolo e inglese per un personale internazionale.",
        "Accesso con gli account Microsoft dell’organizzazione; email tramite Microsoft Graph.",
        "Un team di tre sviluppatori, con altri due a rotazione.",
        "Sostituire l’app di prima generazione, che avevo avviato anch’io.",
      ],
      pt: [
        "Italiano por padrão, com espanhol e inglês para uma equipe internacional.",
        "Login com as contas Microsoft da organização; e-mail via Microsoft Graph.",
        "Uma equipe de três desenvolvedores, com mais dois em rodízio.",
        "Substituir o aplicativo de primeira geração, que eu também tinha começado.",
      ],
    },
    built: {
      en: [
        "The first generation, Rapportopastori: a NestJS and Next.js monorepo with Microsoft single sign-on, PDF reports rendered with Puppeteer and deploys to AWS EC2 through GitHub Actions. I set up the monorepo and the single sign-on.",
        "Then PDOA, its replacement, on the same architecture as Libretto: Next.js route handlers in front of a NestJS 11 API on Prisma and MySQL, stateless JWT sessions in HttpOnly cookies, Microsoft Entra ID sign-in, files on S3 and email through Graph. I wrote the initial stack, authentication and single sign-on, and led the team through the rest.",
      ],
      es: [
        "La primera generación, Rapportopastori: un monorepo NestJS y Next.js con inicio de sesión único de Microsoft, reportes PDF generados con Puppeteer y deploys a AWS EC2 con GitHub Actions. Armé el monorepo y el inicio de sesión único.",
        "Después PDOA, su reemplazo, sobre la misma arquitectura que Libretto: route handlers de Next.js delante de una API en NestJS 11 con Prisma y MySQL, sesiones JWT sin estado en cookies HttpOnly, login con Microsoft Entra ID, archivos en S3 y emails con Graph. Escribí el stack inicial, la autenticación y el inicio de sesión único, y guié al equipo en el resto.",
      ],
      it: [
        "La prima generazione, Rapportopastori: un monorepo NestJS e Next.js con single sign-on Microsoft, report PDF generati con Puppeteer e deploy su AWS EC2 tramite GitHub Actions. Ho impostato il monorepo e il single sign-on.",
        "Poi PDOA, che l’ha sostituita, con la stessa architettura di Libretto: route handler di Next.js davanti a un’API NestJS 11 su Prisma e MySQL, sessioni JWT stateless in cookie HttpOnly, accesso con Microsoft Entra ID, file su S3 ed email tramite Graph. Ho scritto lo stack iniziale, l’autenticazione e il single sign-on, e ho guidato il team nel resto.",
      ],
      pt: [
        "A primeira geração, Rapportopastori: um monorepo NestJS e Next.js com single sign-on da Microsoft, relatórios em PDF renderizados com Puppeteer e deploys no AWS EC2 via GitHub Actions. Montei o monorepo e o single sign-on.",
        "Depois o PDOA, seu substituto, na mesma arquitetura do Libretto: route handlers do Next.js na frente de uma API em NestJS 11 com Prisma e MySQL, sessões JWT stateless em cookies HttpOnly, login com Microsoft Entra ID, arquivos no S3 e e-mail via Graph. Escrevi a stack inicial, a autenticação e o single sign-on, e liderei a equipe no resto.",
      ],
    },
    hard: [
      {
        title: { en: "Approval chains from the hierarchy", es: "Cadenas de aprobación desde la jerarquía", it: "Catene di approvazione dalla gerarchia", pt: "Cadeias de aprovação a partir da hierarquia" },
        body: {
          en: "Every role has a hierarchy level. When someone submits a request, the chain is built by walking up through their managers (a level-3 requester needs approvers at levels 2 and 1), with protection against cycles, and a final step for whoever holds the final-approval permission. Each step stores a snapshot of its approver and level, so a later reorganization doesn’t rewrite history.",
          es: "Cada rol tiene un nivel jerárquico. Cuando alguien envía una solicitud, la cadena se arma subiendo por sus responsables (quien está en el nivel 3 necesita aprobadores de nivel 2 y 1), con protección contra ciclos y un paso final para quien tenga el permiso de aprobación final. Cada paso guarda una foto de su aprobador y su nivel, para que una reorganización posterior no reescriba la historia.",
          it: "Ogni ruolo ha un livello gerarchico. Quando qualcuno invia una richiesta, la catena si costruisce risalendo attraverso i suoi responsabili (un richiedente di livello 3 ha bisogno di approvatori ai livelli 2 e 1), con protezione dai cicli, e con un passaggio finale per chi detiene il permesso di approvazione finale. Ogni passaggio salva uno snapshot del suo approvatore e del livello, così una riorganizzazione successiva non riscrive la storia.",
          pt: "Cada papel tem um nível hierárquico. Quando alguém envia uma solicitação, a cadeia é montada subindo pelos seus gestores (um solicitante de nível 3 precisa de aprovadores nos níveis 2 e 1), com proteção contra ciclos, e uma etapa final para quem tiver a permissão de aprovação final. Cada etapa guarda um snapshot do seu aprovador e do nível, então uma reorganização posterior não reescreve o histórico.",
        },
      },
      {
        title: { en: "Absences that fill the timesheet", es: "Ausencias que completan el reporte", it: "Assenze che compilano il rapportino", pt: "Ausências que preenchem a folha de ponto" },
        body: {
          en: "When an absence is approved, the matching vacation, sick-leave or permit entries appear in that person’s monthly report, linked back to the request that created them. Nobody types the same day twice.",
          es: "Cuando se aprueba una ausencia, las entradas de vacaciones, enfermedad o permiso correspondientes aparecen en el reporte mensual de esa persona, vinculadas a la solicitud que las creó. Nadie carga el mismo día dos veces.",
          it: "Quando un’assenza viene approvata, le voci corrispondenti di ferie, malattia o permesso compaiono nel rapportino mensile di quella persona, collegate alla richiesta che le ha generate. Nessuno inserisce due volte lo stesso giorno.",
          pt: "Quando uma ausência é aprovada, os lançamentos correspondentes de férias, licença médica ou dispensa aparecem no relatório mensal da pessoa, vinculados à solicitação que os criou. Ninguém digita o mesmo dia duas vezes.",
        },
      },
      {
        title: { en: "Reports that close themselves", es: "Reportes que se cierran solos", it: "Rapportini che si chiudono da soli", pt: "Relatórios que se fecham sozinhos" },
        body: {
          en: "Ministers’ monthly reports close automatically a set number of business days after the end of the month (skipping holidays), with configurable reminders before the deadline.",
          es: "Los reportes mensuales de los pastores se cierran automáticamente una cantidad fija de días hábiles después de fin de mes (salteando feriados), con recordatorios configurables antes del vencimiento.",
          it: "I rapportini mensili dei pastori si chiudono automaticamente dopo un numero prefissato di giorni lavorativi dalla fine del mese (saltando i festivi), con promemoria configurabili prima della scadenza.",
          pt: "Os relatórios mensais dos pastores fecham automaticamente um número definido de dias úteis após o fim do mês (pulando feriados), com lembretes configuráveis antes do prazo.",
        },
      },
      {
        title: { en: "Auditing every page", es: "Auditar cada página", it: "Audit di ogni pagina", pt: "Auditar cada página" },
        body: {
          en: "We audited all 23 pages one by one with a custom Claude Code skill driving Playwright, signing in with locally minted sessions so the single sign-on flow didn’t have to be automated.",
          es: "Auditamos las 23 páginas una por una con un skill propio de Claude Code que maneja Playwright, entrando con sesiones generadas localmente para no tener que automatizar el flujo de inicio de sesión único.",
          it: "Abbiamo sottoposto ad audit tutte e 23 le pagine, una per una, con una skill di Claude Code fatta su misura che pilota Playwright, accedendo con sessioni generate in locale per non dover automatizzare il flusso di single sign-on.",
          pt: "Auditamos as 23 páginas uma a uma com uma skill própria do Claude Code que controla o Playwright, entrando com sessões geradas localmente para que o fluxo de single sign-on não precisasse ser automatizado.",
        },
      },
    ],
    result: {
      en: [
        "In production for the Union; the first generation has been retired.",
        "About 520 automated tests, 29 data models and 29 API modules.",
        "Every page audited for behaviour and permissions.",
      ],
      es: [
        "En producción para la Unión; la primera generación quedó retirada.",
        "Alrededor de 520 tests automatizados, 29 modelos de datos y 29 módulos de API.",
        "Cada página auditada en comportamiento y permisos.",
      ],
      it: [
        "In produzione per l’Unione; la prima generazione è stata dismessa.",
        "Circa 520 test automatici, 29 modelli di dati e 29 moduli API.",
        "Ogni pagina sottoposta ad audit per comportamento e permessi.",
      ],
      pt: [
        "Em produção na União; a primeira geração foi desativada.",
        "Cerca de 520 testes automatizados, 29 modelos de dados e 29 módulos de API.",
        "Todas as páginas auditadas quanto a comportamento e permissões.",
      ],
    },
  },
  {
    slug: "university-systems",
    title: { en: "Inherited systems", es: "Sistemas heredados", it: "Sistemi ereditati", pt: "Sistemas herdados" },
    client: { en: "Universidad Adventista del Plata", es: "Universidad Adventista del Plata", it: "Universidad Adventista del Plata", pt: "Universidad Adventista del Plata" },
    period: { from: "2026-09" },
    role: { en: "Technical lead (part-time)", es: "Líder técnico (medio tiempo)", it: "Technical lead (part-time)", pt: "Líder técnico (meio período)" },
    summary: {
      en: "Leading the rewrite of a Progress 4GL accounts-payable system, and taking technical ownership of a research-protocol platform built by someone else.",
      es: "Liderando la reescritura de un sistema de cuentas a pagar en Progress 4GL, y a cargo técnico de una plataforma de protocolos de investigación construida por otros.",
      it: "Alla guida della riscrittura di un sistema di contabilità fornitori in Progress 4GL, e responsabile tecnico di una piattaforma per i protocolli di ricerca costruita da altri.",
      pt: "Liderando a reescrita de um sistema de contas a pagar em Progress 4GL e assumindo a responsabilidade técnica por uma plataforma de protocolos de pesquisa construída por outros.",
    },
    lede: {
      en: "Two systems, two kinds of inheritance. One is a Progress 4GL desktop application that pays the university’s suppliers. The other is a modern web platform written by other developers. Since September 2026, both are my responsibility.",
      es: "Dos sistemas, dos tipos de herencia. Uno es una aplicación de escritorio en Progress 4GL que paga a los proveedores de la universidad. El otro, una plataforma web moderna escrita por otros desarrolladores. Desde septiembre de 2026, los dos son mi responsabilidad.",
      it: "Due sistemi, due tipi di eredità. Uno è un’applicazione desktop in Progress 4GL che paga i fornitori dell’università. L’altro è una piattaforma web moderna scritta da altri sviluppatori. Da settembre 2026 sono entrambi sotto la mia responsabilità.",
      pt: "Dois sistemas, dois tipos de herança. Um é uma aplicação desktop em Progress 4GL que paga os fornecedores da universidade. O outro é uma plataforma web moderna escrita por outros desenvolvedores. Desde setembro de 2026, os dois são minha responsabilidade.",
    },
    facts: [
      { label: { en: "Legacy code", es: "Código legacy", it: "Codice legacy", pt: "Código legado" }, value: { en: "~53k lines", es: "~53 mil líneas", it: "~53 mila righe", pt: "~53 mil linhas" } },
      { label: { en: "Revisions analysed", es: "Revisiones analizadas", it: "Revisioni analizzate", pt: "Revisões analisadas" }, value: { en: "5,774", es: "5.774", it: "5.774", pt: "5.774" } },
      { label: { en: "Bugs traced to root cause", es: "Bugs rastreados a su causa", it: "Bug ricondotti alla causa radice", pt: "Bugs rastreados até a causa raiz" }, value: { en: "20", es: "20", it: "20", pt: "20" } },
      { label: { en: "First prototype", es: "Primer prototipo", it: "Primo prototipo", pt: "Primeiro protótipo" }, value: { en: "Day 3", es: "Día 3", it: "Giorno 3", pt: "Dia 3" } },
    ],
    stack: ["Progress 4GL", "Python", "PostgreSQL 18", "React", "Vite", "Next.js", "Prisma", "MongoDB", "Azure AD"],
    figure: "archaeology",
    proof: { en: "~53k lines of Progress 4GL · 5,774 revisions analysed · 20 bugs traced to root cause", es: "~53 mil líneas de Progress 4GL · 5.774 revisiones analizadas · 20 bugs rastreados hasta su causa", it: "~53 mila righe di Progress 4GL · 5.774 revisioni analizzate · 20 bug ricondotti alla causa radice", pt: "~53 mil linhas de Progress 4GL · 5.774 revisões analisadas · 20 bugs rastreados até a causa raiz" },
    problem: {
      en: [
        "Proveedores is the accounts-payable system for two companies: suppliers, invoices, payments with tax withholdings, the purchase VAT book and the files sent to the tax authority and the banks. It is a Progress 4GL Windows client of about 53,000 lines in 77 sources, whose history lives in old RCS version-control files.",
        "VID runs the university’s calls for research protocols: submission, methodological and scientific review, budget and vote. Other developers built it; I took it over as technical owner.",
      ],
      es: [
        "Proveedores es el sistema de cuentas a pagar de dos empresas: proveedores, facturas, pagos con retenciones, libro IVA compras y los archivos que se envían al fisco y a los bancos. Es un cliente Windows en Progress 4GL de unas 53.000 líneas en 77 fuentes, cuya historia vive en viejos archivos de versionado RCS.",
        "VID gestiona las convocatorias de protocolos de investigación de la universidad: presentación, evaluación metodológica y científica, presupuesto y votación. La construyeron otros desarrolladores; la tomé como responsable técnico.",
      ],
      it: [
        "Proveedores è il sistema di contabilità fornitori di due aziende: fornitori, fatture, pagamenti con ritenute fiscali, registro IVA acquisti e i file inviati al fisco e alle banche. È un client Windows in Progress 4GL di circa 53.000 righe in 77 sorgenti, la cui cronologia vive in vecchi file di versionamento RCS.",
        "VID gestisce i bandi dell’università per i protocolli di ricerca: presentazione, valutazione metodologica e scientifica, budget e votazione. L’hanno costruita altri sviluppatori; l’ho presa in carico come responsabile tecnico.",
      ],
      pt: [
        "Proveedores é o sistema de contas a pagar de duas empresas: fornecedores, faturas, pagamentos com retenção de impostos, o livro de IVA de compras e os arquivos enviados ao fisco e aos bancos. É um cliente Windows em Progress 4GL de cerca de 53.000 linhas em 77 arquivos-fonte, cujo histórico vive em antigos arquivos de controle de versão RCS.",
        "O VID gerencia as chamadas de protocolos de pesquisa da universidade: submissão, avaliação metodológica e científica, orçamento e votação. Outros desenvolvedores o construíram; eu o assumi como responsável técnico.",
      ],
    },
    constraints: {
      en: [
        "Nothing runs against production: analysis works from source code and schema definitions.",
        "The new accounts-payable system targets PostgreSQL 18, with a React and Vite front end.",
        "From June to November, VID only takes bug fixes.",
      ],
      es: [
        "Nada corre contra producción: el análisis trabaja sobre código fuente y definiciones de esquema.",
        "El nuevo sistema de cuentas a pagar apunta a PostgreSQL 18, con un front end en React y Vite.",
        "De junio a noviembre, VID solo admite correcciones de bugs.",
      ],
      it: [
        "Niente gira contro la produzione: l’analisi lavora su codice sorgente e definizioni dello schema.",
        "Il nuovo sistema di contabilità fornitori è pensato per PostgreSQL 18, con un front end in React e Vite.",
        "Da giugno a novembre, VID accetta solo correzioni di bug.",
      ],
      pt: [
        "Nada roda contra a produção: a análise trabalha a partir do código-fonte e das definições de schema.",
        "O novo sistema de contas a pagar tem como alvo o PostgreSQL 18, com um front-end em React e Vite.",
        "De junho a novembro, o VID só recebe correções de bugs.",
      ],
    },
    built: {
      en: [
        "Code-archaeology tools in Python, 182 lines in all: an extractor for RCS ,v history files, a parser for Progress .df schema definitions and a cross-reference of which program touches which table. Together they processed 1,789 files and 5,774 revisions.",
        "A migration plan in three steps: load the legacy tables one-to-one into a staging schema, transform with SQL, and reconcile the totals against the old system.",
        "A configuration-driven React and Vite prototype (generic list, report and process screens generated from config) shown to the accounting team with mock data two days after kickoff.",
        "For VID: a reproducible local environment, documentation of the inherited codebase, a security review and a matrix tracing 20 user-reported bugs to their root causes.",
      ],
      es: [
        "Herramientas de arqueología de código en Python (182 líneas en total): un extractor de archivos de historia RCS ,v, un parser de definiciones de esquema .df de Progress y un cruce de qué programa toca qué tabla. Entre las tres procesaron 1.789 archivos y 5.774 revisiones.",
        "Un plan de migración en tres pasos: cargar las tablas legacy uno a uno en un esquema de staging, transformar con SQL y conciliar los totales contra el sistema viejo.",
        "Un prototipo en React y Vite guiado por configuración (pantallas genéricas de listado, reporte y proceso generadas desde config) que se mostró al equipo de contaduría con datos de prueba dos días después de arrancar.",
        "Para VID: un entorno local reproducible, documentación del código heredado, una revisión de seguridad y una matriz que rastrea 20 bugs reportados por usuarios hasta su causa raíz.",
      ],
      it: [
        "Strumenti di archeologia del codice in Python, 182 righe in tutto: un estrattore per i file di cronologia RCS ,v, un parser per le definizioni di schema .df di Progress e un riferimento incrociato di quale programma tocca quale tabella. Insieme hanno elaborato 1.789 file e 5.774 revisioni.",
        "Un piano di migrazione in tre passaggi: caricare le tabelle legacy uno a uno in uno schema di staging, trasformare con SQL e riconciliare i totali con il vecchio sistema.",
        "Un prototipo React e Vite guidato dalla configurazione (schermate generiche di elenco, report e processo generate dalla configurazione) mostrato al team della contabilità con dati fittizi due giorni dopo l’avvio.",
        "Per VID: un ambiente locale riproducibile, la documentazione della codebase ereditata, una revisione di sicurezza e una matrice che riconduce 20 bug segnalati dagli utenti alle loro cause radice.",
      ],
      pt: [
        "Ferramentas de arqueologia de código em Python, 182 linhas no total: um extrator de arquivos de histórico RCS ,v, um parser de definições de schema .df do Progress e um cruzamento de qual programa acessa qual tabela. Juntas, processaram 1.789 arquivos e 5.774 revisões.",
        "Um plano de migração em três passos: carregar as tabelas legadas um para um em um schema de staging, transformar com SQL e conciliar os totais com o sistema antigo.",
        "Um protótipo em React e Vite orientado por configuração (telas genéricas de listagem, relatório e processo geradas a partir da config) mostrado à equipe de contabilidade com dados fictícios dois dias depois do início.",
        "Para o VID: um ambiente local reproduzível, documentação da base de código herdada, uma revisão de segurança e uma matriz que rastreia 20 bugs relatados por usuários até as causas raiz.",
      ],
    },
    hard: [
      {
        title: { en: "Reading 4GL without running it", es: "Leer 4GL sin ejecutarlo", it: "Leggere il 4GL senza eseguirlo", pt: "Ler 4GL sem executá-lo" },
        body: {
          en: "With production off-limits, the only reliable sources were the code and the schema. The .df files gave the real tables and fields, the cross-reference showed which programs read and write them, and the revision history showed what changed and when. Seventy-seven opaque sources became a map.",
          es: "Con producción fuera de alcance, las únicas fuentes confiables eran el código y el esquema. Los .df dieron las tablas y campos reales, el cruce mostró qué programas los leen y escriben, y el historial de revisiones mostró qué cambió y cuándo. Setenta y siete fuentes opacas se convirtieron en un mapa.",
          it: "Con la produzione off-limits, le uniche fonti affidabili erano il codice e lo schema. I file .df davano le tabelle e i campi reali, il riferimento incrociato mostrava quali programmi li leggono e li scrivono, e la cronologia delle revisioni mostrava cosa era cambiato e quando. Settantasette sorgenti opachi sono diventati una mappa.",
          pt: "Com a produção fora de alcance, as únicas fontes confiáveis eram o código e o schema. Os arquivos .df deram as tabelas e os campos reais, o cruzamento mostrou quais programas os leem e escrevem, e o histórico de revisões mostrou o que mudou e quando. Setenta e sete arquivos-fonte opacos viraram um mapa.",
        },
      },
      {
        title: { en: "Guarantees first", es: "Primero las garantías", it: "Prima le garanzie", pt: "Garantias primeiro" },
        body: {
          en: "The rewrite starts from rules the database itself enforces: document numbers that stay correct under concurrent writes, money stored as exact decimals, and journal entries that must balance before they can be saved.",
          es: "La reescritura parte de reglas que hace cumplir la propia base de datos: numeración de comprobantes correcta aun con escrituras concurrentes, montos guardados como decimales exactos y asientos que tienen que balancear antes de poder guardarse.",
          it: "La riscrittura parte da regole che fa rispettare il database stesso: una numerazione dei documenti che resta corretta anche con scritture concorrenti, importi salvati come decimali esatti e registrazioni contabili che devono quadrare prima di poter essere salvate.",
          pt: "A reescrita parte de regras que o próprio banco de dados impõe: números de documentos que continuam corretos sob escritas concorrentes, valores monetários guardados como decimais exatos e lançamentos contábeis que precisam estar balanceados antes de poderem ser salvos.",
        },
      },
      {
        title: { en: "Root causes, not symptoms", es: "Causas, no síntomas", it: "Cause, non sintomi", pt: "Causas raiz, não sintomas" },
        body: {
          en: "Twenty issues reported by VID’s users (around time zones, identity matching and email delivery), each traced to the code responsible and grouped by root cause, so one fix closes several reports.",
          es: "Veinte problemas reportados por usuarios de VID (de husos horarios, identificación de usuarios y envío de emails), rastreados cada uno hasta el código responsable y agrupados por causa raíz, para que un solo arreglo cierre varios reportes.",
          it: "Venti problemi segnalati dagli utenti di VID (su fusi orari, abbinamento delle identità e invio delle email), ciascuno ricondotto al codice responsabile e raggruppato per causa radice, così un’unica correzione chiude più segnalazioni.",
          pt: "Vinte problemas relatados pelos usuários do VID (envolvendo fusos horários, correspondência de identidades e envio de e-mails), cada um rastreado até o código responsável e agrupado por causa raiz, para que uma única correção resolva vários relatos.",
        },
      },
    ],
    result: {
      en: [
        "Proveedores: analysis complete and a working prototype in front of its users in the first week.",
        "VID: 20 issues traced to root cause, a documented codebase and a local environment anyone on the team can reproduce.",
      ],
      es: [
        "Proveedores: análisis completo y un prototipo funcionando frente a sus usuarios en la primera semana.",
        "VID: 20 problemas rastreados hasta su causa, código documentado y un entorno local que cualquiera del equipo puede reproducir.",
      ],
      it: [
        "Proveedores: analisi completata e un prototipo funzionante davanti ai suoi utenti nella prima settimana.",
        "VID: 20 problemi ricondotti alla causa radice, una codebase documentata e un ambiente locale che chiunque nel team può riprodurre.",
      ],
      pt: [
        "Proveedores: análise concluída e um protótipo funcionando diante dos usuários na primeira semana.",
        "VID: 20 problemas rastreados até a causa raiz, uma base de código documentada e um ambiente local que qualquer pessoa da equipe pode reproduzir.",
      ],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
