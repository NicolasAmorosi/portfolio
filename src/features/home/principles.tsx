import { getLocale } from "next-intl/server";
import { principles } from "@/content/profile";

export async function Principles() {
  const locale = await getLocale();
  return (
    <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
      {principles.map((item) => (
        <li key={item.title.en} className="border-t border-ink pt-4">
          <h3 className="type-heading text-lg">{item.title[locale]}</h3>
          <p className="mt-2 max-w-[48ch] text-ink-2">{item.body[locale]}</p>
        </li>
      ))}
    </ul>
  );
}
