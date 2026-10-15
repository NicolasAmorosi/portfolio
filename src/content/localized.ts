import type { Locale } from "@/i18n/routing";

// Every user-facing string in src/content exists in every locale; a missing
// translation is a type error, not a runtime surprise.
export type Localized<T = string> = Record<Locale, T>;
