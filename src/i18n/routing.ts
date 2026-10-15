import { defineRouting } from "next-intl/routing";

// English is the default (international recruiters) and lives at "/"; Spanish at "/es".
export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
