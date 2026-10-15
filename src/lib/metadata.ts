import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

// Canonical URL + hreflang alternates for a path, e.g. "/projects/libretto".
export function alternatesFor(locale: Locale, href: string): Metadata["alternates"] {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, getPathname({ locale: l, href })]));
  return {
    canonical: getPathname({ locale, href }),
    languages: { ...languages, "x-default": getPathname({ locale: routing.defaultLocale, href }) },
  };
}
