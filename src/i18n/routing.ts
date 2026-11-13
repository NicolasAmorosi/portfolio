import { defineRouting } from "next-intl/routing";

// English is the default (international recruiters) and lives at "/"; Spanish,
// Italian and Portuguese (Brazil) at "/es", "/it" and "/pt".
export const routing = defineRouting({
  locales: ["en", "es", "it", "pt"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
