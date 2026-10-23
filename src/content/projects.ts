import type { Period } from "@/lib/dates";
import type { Localized } from "./localized";

/*
 * Case studies. Source of truth: .claude/knowledge/projects.md (facts verified
 * against the source repos on 2026-10-14). Client code is private: no code,
 * no internal names, no open findings — only problem, approach and outcome.
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
  stack: string[];
  figure: FigureKey;
  problem: Localized<string[]>;
  constraints: Localized<string[]>;
  built: Localized<string[]>;
  hard: HardPart[];
  result: Localized<string[]>;
  // Set only for public code: links the repo and site, and replaces the "code is private" note.
  openSource?: { repo: string; website: string };
};

export type ProjectSlug = "libretto" | "legacy-migration" | "hr-platform" | "university-systems" | "lumina-live";

export const projects: Project[] = [
  {
    slug: "libretto",
    title: { en: "Libretto", es: "Libretto" },
    client: { en: "Villa Aurora, Florence", es: "Villa Aurora, Florencia" },
    period: { from: "2026-05" },
    role: {
      en: "Lead developer, author of ~96% of the code",
      es: "Desarrollador principal, autor de ~96 % del código",
    },
    summary: {
      en: "The academic records system of a theological faculty in Florence: courses, curricula, enrollments, grades and credits, with portals for teachers and students.",
      es: "El sistema de registros académicos de una facultad de teología en Florencia: cursos, planes de estudio, inscripciones, notas y créditos, con portales para docentes y estudiantes.",
    },
    lede: {
      en: "Villa Aurora kept its academic records in an application that had grown for twenty years. I designed and built its replacement — data model, API, interface, security and the migration of every record — and in October 2026 it became the faculty’s source of truth.",
      es: "Villa Aurora llevaba sus registros académicos en una aplicación que había crecido durante veinte años. Diseñé y construí su reemplazo —modelo de datos, API, interfaz, seguridad y la migración de cada registro— y en octubre de 2026 pasó a ser la fuente de verdad de la facultad.",
    },
    facts: [
      { label: { en: "Data models", es: "Modelos de datos" }, value: { en: "55", es: "55" } },
      { label: { en: "API modules", es: "Módulos de API" }, value: { en: "46", es: "46" } },
      { label: { en: "Automated tests", es: "Tests automatizados" }, value: { en: "~1,200", es: "~1.200" } },
      { label: { en: "Users in production", es: "Usuarios en producción" }, value: { en: "438", es: "438" } },
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
    problem: {
      en: [
        "The old application sat on a database that had grown table by table for two decades: one table per degree programme, yes/no flags stored as −1 and 0, and text in several encodings at once. Characters it couldn’t decode were overwritten, so accents in names and course titles were being lost for good.",
        "The secretary’s office needed a system it could trust: grades on the Italian 18–30 scale, credits (CFU) adding up per curriculum, cohorts advancing year by year — and teachers and students able to see exactly their own part of it.",
      ],
      es: [
        "La aplicación anterior se apoyaba en una base de datos que había crecido tabla por tabla durante dos décadas: una tabla por carrera, booleanos guardados como −1 y 0, y texto en varias codificaciones a la vez. Los caracteres que no podía decodificar los sobrescribía, así que los acentos de nombres y materias se perdían para siempre.",
        "La secretaría necesitaba un sistema confiable: notas en la escala italiana de 18 a 30, créditos (CFU) que cierren por plan de estudios, cohortes que avanzan año a año, y docentes y estudiantes viendo exactamente su parte.",
      ],
    },
    constraints: {
      en: [
        "Italian first, English second — and not just the interface: catalog data itself is bilingual.",
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
    },
    built: {
      en: [
        "A Turborepo monorepo: a NestJS 11 API with Prisma on MySQL 8, a Next.js 16 and React 19 interface, and a shared package of TypeScript contracts so both sides agree on every request and response. The browser never calls the API directly; Next.js route handlers sit in front of it.",
        "The API answers with stable error codes instead of sentences, and the interface translates them. Access is a registry of permissions, each with a scope — own, assigned or all — resolved on the server for every request. Admins can view the system as another user to reproduce exactly what that person sees, and every change is written to an audit log, with sensitive fields redacted, in the same transaction as the change itself.",
        "Around that core: bulk Excel import, PDF generation, files on S3 through presigned URLs with the real file type checked from its bytes, scheduled reminders by email through Microsoft Graph, and history tables that keep every past version of the records that matter.",
      ],
      es: [
        "Un monorepo con Turborepo: una API en NestJS 11 con Prisma sobre MySQL 8, una interfaz en Next.js 16 y React 19, y un paquete compartido de contratos TypeScript para que ambos lados coincidan en cada request y response. El navegador nunca llama a la API directamente: delante hay route handlers de Next.js.",
        "La API responde con códigos de error estables en lugar de frases, y la interfaz los traduce. El acceso es un registro de permisos, cada uno con un alcance —propio, asignado o todo— que el servidor resuelve en cada request. Un administrador puede ver el sistema como otro usuario para reproducir exactamente lo que esa persona ve, y cada cambio queda en un log de auditoría, con los campos sensibles ocultos, en la misma transacción que el cambio.",
        "Alrededor de ese núcleo: importación masiva desde Excel, generación de PDF, archivos en S3 con URLs prefirmadas y el tipo real del archivo verificado por sus bytes, recordatorios programados por email con Microsoft Graph, y tablas de historial que guardan cada versión anterior de los registros importantes.",
      ],
    },
    hard: [
      {
        title: { en: "Scopes, not roles", es: "Alcances, no roles" },
        body: {
          en: "A teacher can read grades — but only for the courses assigned to them. A student, only their own. The secretary’s office, all of them. Instead of hard-coding roles, each permission carries a scope and the API turns it into a database filter on every request. The interface hides what you can’t do; the server is what enforces it.",
          es: "Un docente puede ver notas, pero solo de las materias que tiene asignadas. Un estudiante, solo las suyas. La secretaría, todas. En vez de programar roles fijos, cada permiso lleva un alcance y la API lo convierte en un filtro de base de datos en cada request. La interfaz oculta lo que no podés hacer; quien lo impide es el servidor.",
        },
      },
      {
        title: { en: "No tokens in storage", es: "Sin tokens en el storage" },
        body: {
          en: "The access token lives only in memory and expires quickly. The refresh token sits in an HttpOnly cookie, is stored hashed and is rotated on every refresh — the old one is revoked as the new one is issued. Every state-changing request also carries a double-submit CSRF token.",
          es: "El access token vive solo en memoria y expira rápido. El refresh token está en una cookie HttpOnly, se guarda hasheado y rota en cada renovación: el anterior se revoca cuando se emite el nuevo. Además, cada request que modifica datos lleva un token CSRF de doble envío.",
        },
      },
      {
        title: { en: "Twenty years of data", es: "Veinte años de datos" },
        body: {
          en: "None of this mattered until every name, title and grade from the old database arrived intact. That story has its own page.",
          es: "Nada de esto importaba hasta que cada nombre, materia y nota de la base vieja llegara intacto. Esa historia tiene su propia página.",
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
    },
  },
  {
    slug: "legacy-migration",
    title: { en: "Zero lost characters", es: "Ni un carácter perdido" },
    client: { en: "Villa Aurora, Florence", es: "Villa Aurora, Florencia" },
    period: { from: "2026" },
    role: { en: "Sole author", es: "Autor único" },
    summary: {
      en: "The migration behind Libretto: a 46-table legacy database in mixed text encodings, moved record by record without a single corrupted character.",
      es: "La migración detrás de Libretto: una base legacy de 46 tablas con codificaciones mezcladas, trasladada registro por registro sin un solo carácter corrupto.",
    },
    lede: {
      en: "The old database stored text in several character sets — sometimes two within the same table. Libretto couldn’t go live until every name, title and grade came across exactly as it was meant to be.",
      es: "La base vieja guardaba texto en varios juegos de caracteres, a veces dos dentro de la misma tabla. Libretto no podía salir a producción hasta que cada nombre, materia y nota llegara exactamente como debía.",
    },
    facts: [
      { label: { en: "Legacy tables", es: "Tablas legacy" }, value: { en: "46", es: "46" } },
      { label: { en: "Canonical users", es: "Usuarios canónicos" }, value: { en: "436", es: "436" } },
      { label: { en: "Mapped records", es: "Registros mapeados" }, value: { en: "14,227", es: "14.227" } },
      { label: { en: "Replacement characters", es: "Caracteres de reemplazo" }, value: { en: "0", es: "0" } },
    ],
    stack: ["Node.js", "iconv-lite", "mysql2", "Prisma", "MySQL 8"],
    figure: "encoding",
    problem: {
      en: [
        "Each column declared its own character set — latin1, latin2, UTF-16 — and a single users table mixed two of them: latin2 for first and last names, latin1 for everything else. Read naively through a UTF-8 connection, a name like Nicolás comes out as NicolÃ¡s — or, worse, characters vanish without a trace.",
        "People were spread across three sources — personal records, logins and teaching assignments — with no shared key, and student numbers were unique only within a degree programme.",
      ],
      es: [
        "Cada columna declaraba su propio juego de caracteres —latin1, latin2, UTF-16— y una misma tabla de usuarios mezclaba dos: latin2 para nombre y apellido, latin1 para todo lo demás. Leído ingenuamente por una conexión UTF-8, un nombre como Nicolás sale como NicolÃ¡s; o peor, los caracteres desaparecen sin dejar rastro.",
        "Las personas estaban repartidas en tres fuentes —fichas personales, logins y asignaciones docentes— sin una clave común, y el número de matrícula era único solo dentro de cada carrera.",
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
    },
    built: {
      en: [
        "A sync engine in Node.js that reads the legacy database, plans every write as a pure transformation, checks the whole plan against a quality gate and only then writes — in foreign-key order, one transaction per logical unit, so a crashed run can simply be run again.",
        "It is insert-only: it never updates or deletes. A mapping table (entity, legacy key → new id) remembers what has already moved. For each item: if its key is in the map, skip it; if a row with the same natural key already exists — an email, a user and course, a catalog code — adopt it into the map; otherwise insert it. That middle rule let the engine take over a production database that earlier scripts had already filled.",
        "Three modes for three moments: a preview that writes nothing, a bootstrap that only builds the map, and real runs that require an explicit --allow-write. A wrapper for the operator opens the connections, runs it and prints the outcome in plain language.",
      ],
      es: [
        "Un motor de sincronización en Node.js que lee la base legacy, planifica cada escritura como una transformación pura, valida el plan completo contra un control de calidad y recién entonces escribe: en orden de claves foráneas, una transacción por unidad lógica, para que una corrida interrumpida se pueda simplemente volver a ejecutar.",
        "Solo inserta: nunca actualiza ni borra. Una tabla de mapeo (entidad, clave legacy → id nuevo) recuerda lo que ya se migró. Para cada ítem: si su clave está en el mapa, se saltea; si ya existe una fila con la misma clave natural —un email, un usuario y curso, un código de catálogo— se adopta en el mapa; si no, se inserta. Esa regla del medio permitió que el motor tomara una base de producción que scripts anteriores ya habían llenado.",
        "Tres modos para tres momentos: una vista previa que no escribe nada, un bootstrap que solo arma el mapa, y corridas reales que exigen un --allow-write explícito. Un wrapper para el operador abre las conexiones, lo ejecuta e imprime el resultado en lenguaje claro.",
      ],
    },
    hard: [
      {
        title: { en: "Read bytes, not text", es: "Leer bytes, no texto" },
        body: {
          en: "Every text column is read as hexadecimal — pure ASCII, so neither the driver nor the connection charset can corrupt it. The bytes are then decoded in Node with the codec that matches the column’s declared charset, looked up in information_schema and cached per table: UTF-16 as UTF-16BE, latin2 as Windows-1250, latin1 as Windows-1252.",
          es: "Cada columna de texto se lee como hexadecimal: ASCII puro, así que ni el driver ni el charset de la conexión pueden corromperla. Después los bytes se decodifican en Node con el códec que corresponde al charset declarado de la columna, consultado en information_schema y cacheado por tabla: UTF-16 como UTF-16BE, latin2 como Windows-1250, latin1 como Windows-1252.",
        },
      },
      {
        title: { en: "Why Windows-1252, not latin1", es: "Por qué Windows-1252 y no latin1" },
        body: {
          en: "In Windows-1252, bytes 0x92 to 0x96 are curly quotes and dashes. In strict latin1 they are invisible control characters — so decoding as latin1 loses them silently, without producing a single replacement character. A check that only looked for broken characters would have passed. Try it in the figure above.",
          es: "En Windows-1252, los bytes 0x92 a 0x96 son comillas tipográficas y guiones. En latin1 estricto son caracteres de control invisibles: decodificar como latin1 los pierde en silencio, sin generar un solo carácter de reemplazo. Un control que solo buscara caracteres rotos habría pasado. Probalo en la figura de arriba.",
        },
      },
      {
        title: { en: "A gate that refuses to write", es: "Un control que se niega a escribir" },
        body: {
          en: "Every decode counts U+FFFD, the replacement character. If the total is above zero, the engine throws before its first write and exits non-zero. In the prototype, decoding two sample tables as UTF-8 produced 54 and 284 of them; with the right codecs, zero. Later, when the live host converted one exam table to real UTF-8 mid-project, decoding moved from per table to per column.",
          es: "Cada decodificación cuenta los U+FFFD, el carácter de reemplazo. Si el total es mayor que cero, el motor lanza un error antes de su primera escritura y termina con código distinto de cero. En el prototipo, decodificar dos tablas de muestra como UTF-8 producía 54 y 284; con los códecs correctos, cero. Más tarde, cuando el servidor productivo convirtió una tabla de exámenes a UTF-8 real a mitad del proyecto, la decodificación pasó de ser por tabla a ser por columna.",
        },
      },
      {
        title: { en: "Who is who", es: "Quién es quién" },
        body: {
          en: "Three sources merged into 436 canonical users, including 51 placeholders for people who existed only in exam tables — without them, 280 exam records would have been dropped. Student numbers collided across people; resolving them by canonical identity and most recent enrollment assigned a number to 357 of 364 people and left 7 for a human to decide, instead of guessing.",
          es: "Tres fuentes se fusionaron en 436 usuarios canónicos, incluidos 51 marcadores para personas que solo existían en tablas de exámenes: sin ellos se habrían perdido 280 registros de examen. Los números de matrícula chocaban entre personas; resolverlos por identidad canónica e inscripción más reciente asignó número a 357 de 364 personas y dejó 7 para que decida una persona, en lugar de adivinar.",
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
    },
  },
  {
    slug: "lumina-live",
    title: { en: "Lumina Live", es: "Lumina Live" },
    client: { en: "Open source, for churches", es: "Código abierto, para iglesias" },
    period: { from: "2026-07" },
    role: { en: "Author and maintainer", es: "Autor y mantenedor" },
    summary: {
      en: "Free, open-source projection software for church services — slides, video, the Bible and timers on a second screen — built to replace EasyWorship. Public since October 2026.",
      es: "Software libre de proyección para cultos —diapositivas, video, la Biblia y temporizadores en una segunda pantalla—, hecho para reemplazar a EasyWorship. Público desde octubre de 2026.",
    },
    lede: {
      en: "During a service, one person runs the screen: a hymn, a Bible passage, the sermon slides, a video. Lumina Live is the desktop app for that job — a control window for the operator, a projection window for everyone else — and since October 2026 it is open source, with installers for Windows, macOS and Linux.",
      es: "Durante un culto, una persona maneja la pantalla: un himno, un pasaje bíblico, las diapositivas del sermón, un video. Lumina Live es la app de escritorio para esa tarea —una ventana de control para quien opera y una de proyección para todos los demás— y desde octubre de 2026 es de código abierto, con instaladores para Windows, macOS y Linux.",
    },
    openSource: {
      repo: "https://github.com/NicolasAmorosi/lumina-live",
      website: "https://lumina-live-site.vercel.app",
    },
    facts: [
      { label: { en: "License", es: "Licencia" }, value: { en: "GPL-3.0", es: "GPL-3.0" } },
      { label: { en: "Runs on", es: "Corre en" }, value: { en: "Windows, macOS, Linux", es: "Windows, macOS, Linux" } },
      { label: { en: "Automated tests", es: "Tests automatizados" }, value: { en: "507", es: "507" } },
      { label: { en: "Version", es: "Versión" }, value: { en: "2.2 beta", es: "2.2 beta" } },
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
      "LibreOffice",
      "pdf.js",
      "FFmpeg",
      "Vitest",
      "Playwright",
      "electron-builder",
    ],
    figure: "projection",
    problem: {
      en: [
        "Lumina Live — called WorshipApp until October 2026 — was built to replace EasyWorship. It is the third attempt at it: an earlier project, now archived, and a plain-JavaScript version came first.",
        "Operators already know EasyWorship’s two-step flow — pick an item, check it in the preview, only then send it live — so the replacement keeps it.",
      ],
      es: [
        "Lumina Live —WorshipApp hasta octubre de 2026— nació para reemplazar a EasyWorship. Es el tercer intento: antes hubo un proyecto, hoy archivado, y una versión en JavaScript plano.",
        "Quienes operan ya conocen el flujo en dos pasos de EasyWorship —elegir, revisarlo en la vista previa y recién entonces mandarlo en vivo—, así que el reemplazo lo conserva.",
      ],
    },
    constraints: {
      en: [
        "Runs on Windows, macOS and Linux; developed on a Mac.",
        "Live use: if the projector disconnects, the picture comes back by itself when it reconnects; if the projection window closes, it returns exactly as it was.",
        "Offline: everything local, including the Bible text and its search.",
        "Slides arrive as PowerPoint files — among them .pps hymnals that advance on their own, with the music embedded.",
        "Open source under GPL-3.0: the code, its documentation and its tests are public, in English, for anyone who wants to contribute.",
      ],
      es: [
        "Corre en Windows, macOS y Linux; desarrollada en una Mac.",
        "Uso en vivo: si el proyector se desconecta, la imagen vuelve sola al reconectarlo; si la ventana de proyección se cierra, vuelve exactamente como estaba.",
        "Sin conexión: todo local, incluido el texto bíblico y su búsqueda.",
        "Las diapositivas llegan como archivos de PowerPoint, entre ellos himnarios .pps que avanzan solos y traen la música adentro.",
        "Código abierto bajo GPL-3.0: el código, su documentación y sus tests son públicos, en inglés, para quien quiera contribuir.",
      ],
    },
    built: {
      en: [
        "An Electron app with a strict split: the main process owns state and the database, the operator works in a control window, and the projection window is a pure function of the last output it received. Reopen it and the main process replays that output — the screen comes back exactly as it was.",
        "Secure defaults kept on — sandboxed renderers, web security enabled — with local files served through a custom worship:// protocol by id, never by path.",
        "SQLite with Drizzle for service programmes, the media library and the Bible — the public-domain Reina-Valera 1909 ships with it, other versions import from five formats — with FTS5 full-text search that ignores accents, so typing “senor” finds “Señor”.",
        "Any video or audio plays: whatever Chromium can’t decode is converted in the background by a bundled FFmpeg, without touching the original. The interface speaks English, Spanish, Italian and Portuguese, and the dictionaries are typed against each other, so a missing string doesn’t compile.",
      ],
      es: [
        "Una app Electron con una separación estricta: el proceso principal es dueño del estado y la base de datos, quien opera trabaja en una ventana de control, y la ventana de proyección es una función pura de la última salida que recibió. Si se reabre, el proceso principal reenvía esa salida y la pantalla vuelve exactamente como estaba.",
        "Valores seguros por defecto —renderers en sandbox, web security activado—, con los archivos locales servidos por un protocolo propio worship:// por id, nunca por ruta.",
        "SQLite con Drizzle para programas de culto, la biblioteca de medios y la Biblia —viene con la Reina-Valera 1909, de dominio público, y otras versiones se importan desde cinco formatos—, con búsqueda de texto completo FTS5 que ignora acentos: escribir “senor” encuentra “Señor”.",
        "Cualquier video o audio se reproduce: lo que Chromium no puede decodificar lo convierte en segundo plano un FFmpeg incluido, sin tocar el original. La interfaz está en español, inglés, italiano y portugués, y los diccionarios se tipan entre sí: un texto faltante no compila.",
      ],
    },
    hard: [
      {
        title: { en: "One typed IPC contract", es: "Un único contrato IPC tipado" },
        body: {
          en: "Every message between processes is declared once, in a single contract type. A missing or mistyped handler doesn’t compile, and errors travel back as a typed result instead of exceptions crossing process boundaries.",
          es: "Cada mensaje entre procesos se declara una sola vez, en un único tipo de contrato. Un handler faltante o mal tipado no compila, y los errores vuelven como un resultado tipado en lugar de excepciones cruzando procesos.",
        },
      },
      {
        title: { en: "PowerPoint without PowerPoint", es: "PowerPoint sin PowerPoint" },
        body: {
          en: "Automating PowerPoint over COM tied the app to Office. The current pipeline converts .pptx to PDF with headless LibreOffice, renders each page to WebP with pdf.js and caches the result by content — sidestepping the fact that LibreOffice exports only the first slide to PNG. Slide timings and audio are read straight from the presentation’s XML.",
          es: "Automatizar PowerPoint por COM ataba la app a Office. El pipeline actual convierte .pptx a PDF con LibreOffice headless, renderiza cada página a WebP con pdf.js y cachea el resultado por contenido, esquivando que LibreOffice exporta a PNG solo la primera diapositiva. Los tiempos y el audio se leen directo del XML de la presentación.",
        },
      },
      {
        title: { en: "Reading it as a stranger would", es: "Leerlo como un desconocido" },
        body: {
          en: "Before the repository went public, its whole history was swept for keys, tokens and local paths, the licence was agreed with the author of the first version, and the bundled Bible was checked. Its spelling — “y fué la luz”, “ha dado á su Hijo” — gave it away as the 1909 Reina-Valera, in the public domain, not the copyrighted 1960 edition it was labelled as. It was renamed, with a migration for existing installs.",
          es: "Antes de abrir el repositorio se revisó toda su historia en busca de claves, tokens y rutas locales, la licencia se acordó con el autor de la primera versión y se verificó la Biblia incluida. Su ortografía —«y fué la luz», «ha dado á su Hijo»— la delató como la Reina-Valera de 1909, de dominio público, y no la edición de 1960, con derechos de autor, que decía ser. Se le cambió el nombre, con una migración para las instalaciones existentes.",
        },
      },
      {
        title: { en: "A space in the path", es: "Un espacio en la ruta" },
        body: {
          en: "The Linux packages were tested in containers with Chromium’s sandbox really on — the end-to-end suite turns it off. That caught a .deb that wouldn’t start: installed under “/opt/Lumina Live”, the sandbox helper’s path was split at the space. It now installs to /opt/lumina-live and keeps the product name in the menu.",
          es: "Los paquetes de Linux se probaron en contenedores con el sandbox de Chromium activado de verdad (la suite end-to-end lo apaga). Así apareció un .deb que no arrancaba: instalado en “/opt/Lumina Live”, la ruta del helper del sandbox se partía en el espacio. Ahora se instala en /opt/lumina-live y conserva el nombre del producto en el menú.",
        },
      },
    ],
    result: {
      en: [
        "Released as open source on 23 October 2026: version 2.2.0-beta.4, with installers for Windows, macOS and Linux — Linux still marked experimental.",
        "403 unit tests and 104 end-to-end tests, the end-to-end suite run against the packaged app.",
        "Next: the stable 2.2.0, once this beta has run a real church service.",
      ],
      es: [
        "Publicado como código abierto el 23 de octubre de 2026: versión 2.2.0-beta.4, con instaladores para Windows, macOS y Linux (Linux todavía experimental).",
        "403 tests unitarios y 104 end-to-end, la suite end-to-end corrida contra la app empaquetada.",
        "Lo que sigue: la 2.2.0 estable, cuando esta beta haya pasado por un culto real.",
      ],
    },
  },
  {
    slug: "hr-platform",
    title: { en: "HR & admin platform", es: "Plataforma de RR. HH." },
    client: { en: "Italian Adventist Church Union", es: "Unión Italiana de Iglesias Adventistas" },
    period: { from: "2025-06", to: "2026-09" },
    role: {
      en: "Lead developer of a team of three, plus two rotating",
      es: "Líder de un equipo de tres desarrolladores, más dos rotativos",
    },
    summary: {
      en: "Monthly work reports, absences, medical expenses, travel and treasury for the staff and ministers of the Union, with approval chains and three languages.",
      es: "Reportes mensuales de trabajo, ausencias, gastos médicos, viajes y tesorería para el personal y los pastores de la Unión, con cadenas de aprobación y tres idiomas.",
    },
    lede: {
      en: "The Union’s staff and ministers report their work every month, request time off and expenses, and wait for the right people to approve them. I led the team that built the platform for it: first a first-generation app, then the rewrite that replaced it.",
      es: "El personal y los pastores de la Unión reportan su trabajo cada mes, piden licencias y reintegros, y esperan que las personas correctas los aprueben. Lideré el equipo que construyó la plataforma para eso: primero una primera generación y después la reescritura que la reemplazó.",
    },
    facts: [
      { label: { en: "Data models", es: "Modelos de datos" }, value: { en: "29", es: "29" } },
      { label: { en: "API modules", es: "Módulos de API" }, value: { en: "29", es: "29" } },
      { label: { en: "Automated tests", es: "Tests automatizados" }, value: { en: "~520", es: "~520" } },
      { label: { en: "Interface languages", es: "Idiomas de la interfaz" }, value: { en: "3", es: "3" } },
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
    problem: {
      en: [
        "Two kinds of staff with different rules — employees under the national labour contract and ministers — each filing a monthly report, plus absences, medical expenses, travel invitations and treasury exports.",
        "Every request has to climb a hierarchy before it counts, and at the end of the month treasury and the secretariat need exports they can use without retyping anything.",
      ],
      es: [
        "Dos tipos de personal con reglas distintas —empleados bajo convenio colectivo y pastores—, cada uno con su reporte mensual, más ausencias, gastos médicos, invitaciones de viaje y exportaciones para tesorería.",
        "Cada solicitud tiene que subir por una jerarquía antes de valer, y a fin de mes tesorería y secretaría necesitan exportaciones que puedan usar sin volver a tipear nada.",
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
    },
    hard: [
      {
        title: { en: "Approval chains from the hierarchy", es: "Cadenas de aprobación desde la jerarquía" },
        body: {
          en: "Every role has a hierarchy level. When someone submits a request, the chain is built by walking up through their managers — a level-3 requester needs approvers at levels 2 and 1 — with protection against cycles, and a final step for whoever holds the final-approval permission. Each step stores a snapshot of its approver and level, so a later reorganization doesn’t rewrite history.",
          es: "Cada rol tiene un nivel jerárquico. Cuando alguien envía una solicitud, la cadena se arma subiendo por sus responsables —quien está en el nivel 3 necesita aprobadores de nivel 2 y 1—, con protección contra ciclos y un paso final para quien tenga el permiso de aprobación final. Cada paso guarda una foto de su aprobador y su nivel, para que una reorganización posterior no reescriba la historia.",
        },
      },
      {
        title: { en: "Absences that fill the timesheet", es: "Ausencias que completan el reporte" },
        body: {
          en: "When an absence is approved, the matching vacation, sick-leave or permit entries appear in that person’s monthly report, linked back to the request that created them. Nobody types the same day twice.",
          es: "Cuando se aprueba una ausencia, las entradas de vacaciones, enfermedad o permiso correspondientes aparecen en el reporte mensual de esa persona, vinculadas a la solicitud que las creó. Nadie carga el mismo día dos veces.",
        },
      },
      {
        title: { en: "Reports that close themselves", es: "Reportes que se cierran solos" },
        body: {
          en: "Ministers’ monthly reports close automatically a set number of business days after the end of the month — skipping holidays — with configurable reminders before the deadline.",
          es: "Los reportes mensuales de los pastores se cierran automáticamente una cantidad fija de días hábiles después de fin de mes —salteando feriados—, con recordatorios configurables antes del vencimiento.",
        },
      },
      {
        title: { en: "Auditing every page", es: "Auditar cada página" },
        body: {
          en: "We audited all 23 pages one by one with a custom Claude Code skill driving Playwright, signing in with locally minted sessions so the single sign-on flow didn’t have to be automated.",
          es: "Auditamos las 23 páginas una por una con un skill propio de Claude Code que maneja Playwright, entrando con sesiones generadas localmente para no tener que automatizar el flujo de inicio de sesión único.",
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
    },
  },
  {
    slug: "university-systems",
    title: { en: "Inherited systems", es: "Sistemas heredados" },
    client: { en: "Universidad Adventista del Plata", es: "Universidad Adventista del Plata" },
    period: { from: "2026-09" },
    role: { en: "Technical lead (part-time)", es: "Líder técnico (medio tiempo)" },
    summary: {
      en: "Leading the rewrite of a Progress 4GL accounts-payable system, and taking technical ownership of a research-protocol platform built by someone else.",
      es: "Liderando la reescritura de un sistema de cuentas a pagar en Progress 4GL, y a cargo técnico de una plataforma de protocolos de investigación construida por otros.",
    },
    lede: {
      en: "Two systems, two kinds of inheritance. One is a Progress 4GL desktop application that pays the university’s suppliers. The other is a modern web platform written by other developers. Since September 2026, both are my responsibility.",
      es: "Dos sistemas, dos tipos de herencia. Uno es una aplicación de escritorio en Progress 4GL que paga a los proveedores de la universidad. El otro, una plataforma web moderna escrita por otros desarrolladores. Desde septiembre de 2026, los dos son mi responsabilidad.",
    },
    facts: [
      { label: { en: "Legacy code", es: "Código legacy" }, value: { en: "~53k lines", es: "~53 mil líneas" } },
      { label: { en: "Revisions analysed", es: "Revisiones analizadas" }, value: { en: "5,774", es: "5.774" } },
      { label: { en: "Bugs traced to root cause", es: "Bugs rastreados a su causa" }, value: { en: "20", es: "20" } },
      { label: { en: "First prototype", es: "Primer prototipo" }, value: { en: "Day 3", es: "Día 3" } },
    ],
    stack: ["Progress 4GL", "Python", "PostgreSQL 18", "React", "Vite", "Next.js", "Prisma", "MongoDB", "Azure AD"],
    figure: "archaeology",
    problem: {
      en: [
        "Proveedores is the accounts-payable system for two companies: suppliers, invoices, payments with tax withholdings, the purchase VAT book and the files sent to the tax authority and the banks. It is a Progress 4GL Windows client of about 53,000 lines in 77 sources, whose history lives in old RCS version-control files.",
        "VID runs the university’s calls for research protocols: submission, methodological and scientific review, budget and vote. Other developers built it; I took it over as technical owner.",
      ],
      es: [
        "Proveedores es el sistema de cuentas a pagar de dos empresas: proveedores, facturas, pagos con retenciones, libro IVA compras y los archivos que se envían al fisco y a los bancos. Es un cliente Windows en Progress 4GL de unas 53.000 líneas en 77 fuentes, cuya historia vive en viejos archivos de versionado RCS.",
        "VID gestiona las convocatorias de protocolos de investigación de la universidad: presentación, evaluación metodológica y científica, presupuesto y votación. La construyeron otros desarrolladores; la tomé como responsable técnico.",
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
    },
    built: {
      en: [
        "Code-archaeology tools in Python — 182 lines in all: an extractor for RCS ,v history files, a parser for Progress .df schema definitions and a cross-reference of which program touches which table. Together they processed 1,789 files and 5,774 revisions.",
        "A migration plan in three steps: load the legacy tables one-to-one into a staging schema, transform with SQL, and reconcile the totals against the old system.",
        "A configuration-driven React and Vite prototype — generic list, report and process screens generated from config — shown to the accounting team with mock data two days after kickoff.",
        "For VID: a reproducible local environment, documentation of the inherited codebase, a security review and a matrix tracing 20 user-reported bugs to their root causes.",
      ],
      es: [
        "Herramientas de arqueología de código en Python —182 líneas en total—: un extractor de archivos de historia RCS ,v, un parser de definiciones de esquema .df de Progress y un cruce de qué programa toca qué tabla. Entre las tres procesaron 1.789 archivos y 5.774 revisiones.",
        "Un plan de migración en tres pasos: cargar las tablas legacy uno a uno en un esquema de staging, transformar con SQL y conciliar los totales contra el sistema viejo.",
        "Un prototipo en React y Vite guiado por configuración —pantallas genéricas de listado, reporte y proceso generadas desde config— que se mostró al equipo de contaduría con datos de prueba dos días después de arrancar.",
        "Para VID: un entorno local reproducible, documentación del código heredado, una revisión de seguridad y una matriz que rastrea 20 bugs reportados por usuarios hasta su causa raíz.",
      ],
    },
    hard: [
      {
        title: { en: "Reading 4GL without running it", es: "Leer 4GL sin ejecutarlo" },
        body: {
          en: "With production off-limits, the only reliable sources were the code and the schema. The .df files gave the real tables and fields, the cross-reference showed which programs read and write them, and the revision history showed what changed and when. Seventy-seven opaque sources became a map.",
          es: "Con producción fuera de alcance, las únicas fuentes confiables eran el código y el esquema. Los .df dieron las tablas y campos reales, el cruce mostró qué programas los leen y escriben, y el historial de revisiones mostró qué cambió y cuándo. Setenta y siete fuentes opacas se convirtieron en un mapa.",
        },
      },
      {
        title: { en: "Guarantees first", es: "Primero las garantías" },
        body: {
          en: "The rewrite starts from rules the database itself enforces: document numbers that stay correct under concurrent writes, money stored as exact decimals, and journal entries that must balance before they can be saved.",
          es: "La reescritura parte de reglas que hace cumplir la propia base de datos: numeración de comprobantes correcta aun con escrituras concurrentes, montos guardados como decimales exactos y asientos que tienen que balancear antes de poder guardarse.",
        },
      },
      {
        title: { en: "Root causes, not symptoms", es: "Causas, no síntomas" },
        body: {
          en: "Twenty issues reported by VID’s users — around time zones, identity matching and email delivery — each traced to the code responsible and grouped by root cause, so one fix closes several reports.",
          es: "Veinte problemas reportados por usuarios de VID —de husos horarios, identificación de usuarios y envío de emails— rastreados cada uno hasta el código responsable y agrupados por causa raíz, para que un solo arreglo cierre varios reportes.",
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
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
