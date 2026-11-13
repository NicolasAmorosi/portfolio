import { getLocale } from "next-intl/server";
import { stack } from "@/content/profile";

export async function StackList() {
  const locale = await getLocale();
  return (
    <dl className="border-t border-rule text-ui">
      {stack.map((group) => (
        <div key={group.area.en} className="grid gap-x-6 border-b border-rule py-2.5 sm:grid-cols-[9.5rem_1fr]">
          <dt className="text-ink-2">{group.area[locale]}</dt>
          <dd>{group.items.join(", ")}</dd>
        </div>
      ))}
    </dl>
  );
}
