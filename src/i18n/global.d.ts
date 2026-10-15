import type messages from "./messages/en.json";
import type { routing } from "./routing";

// Type-checks every t("…") key against the English messages (the reference locale).
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
