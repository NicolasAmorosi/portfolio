import { getLocale } from "next-intl/server";
import { stack } from "@/content/profile";

export async function StackList() {
  const locale = await getLocale();
  return (
    <dl className="grid gap-x-10 sm:grid-cols-2">
      {stack.map((group) => (
        <div key={group.area.en} className="grid grid-cols-[7.5rem_1fr] gap-x-4 border-t border-rule py-3.5 sm:grid-cols-[8.5rem_1fr]">
          <dt className="text-sm leading-6 text-ink-2">{group.area[locale]}</dt>
          <dd className="text-ui">{group.items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}
