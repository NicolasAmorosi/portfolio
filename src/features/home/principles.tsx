import { getLocale } from "next-intl/server";
import { principles } from "@/content/profile";

export async function Principles() {
  const locale = await getLocale();
  return (
    <ul className="list-disc space-y-3 pl-5 marker:text-ink-2">
      {principles.map((item) => (
        <li key={item.en}>{item[locale]}</li>
      ))}
    </ul>
  );
}
