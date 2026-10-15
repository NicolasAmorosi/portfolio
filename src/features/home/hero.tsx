import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { site } from "@/lib/site";
import { DecodedName } from "./decoded-name";

const secondary =
  "inline-flex h-12 items-center rounded-[4px] border border-ink/30 px-6 text-ui font-medium transition-colors hover:border-ink hover:bg-ink hover:text-paper";

// Wide screens: the name spans the grid and the encoding note sits in the
// empty corner beside "Amorosi", like an annotation on a type specimen.
// Narrow screens: name, intro, actions, then the note.
export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section aria-labelledby="hero-title" className="shell grid gap-x-10 pt-8 pb-14 sm:pt-14 lg:grid-cols-12 lg:pt-16">
      <h1
        id="hero-title"
        className="type-display text-[clamp(5.25rem,29vw,15.5rem)] tracking-[-0.015em] lg:col-span-12 lg:col-start-1 lg:row-start-1"
      >
        <DecodedName name={site.name} />
      </h1>

      <div className="mt-10 sm:mt-14 lg:col-span-9 lg:col-start-1 lg:row-start-2">
        <p className="max-w-[38ch] text-lg leading-[1.35] sm:text-[1.875rem] sm:leading-[1.3]">{t("intro")}</p>

        <p className="mt-8 flex items-center gap-3 text-ui text-ink-2">
          <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-mark ring-1 ring-ink/40" />
          {t("status")}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex h-12 items-center rounded-[4px] bg-ink px-6 text-ui font-medium text-paper transition-colors hover:bg-mark hover:text-mark-ink"
          >
            {t("email")}
          </a>
          <a href={site.cv} className={secondary}>
            {t("cv")}
          </a>
          <a href={site.linkedin} className={secondary}>
            LinkedIn
          </a>
        </div>
      </div>

      <aside className="mt-16 max-w-sm lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:mt-0 lg:self-end lg:pb-[0.4rem]">
        <dl className="border-t border-ink text-sm">
          <div className="border-b border-rule py-2">
            <dt className="text-xs text-ink-2">{t("codePoint")}</dt>
            <dd className="mt-0.5">
              <span className="font-mono">U+00E1</span> <span className="text-ink-2">{t("codePointName")}</span>
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-rule py-2">
            <dt className="text-xs text-ink-2">{t("utf8")}</dt>
            <dd className="font-mono">C3 A1</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 border-b border-rule py-2">
            <dt className="text-xs text-ink-2">{t("misread")}</dt>
            <dd className="font-mono">Ã¡</dd>
          </div>
        </dl>
        <p className="mt-4 text-sm text-ink-2">{t("note")}</p>
        <Link href="/projects/legacy-migration" className="link mt-2 inline-block text-sm">
          {t("noteLink")}
        </Link>
      </aside>
    </section>
  );
}
