"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { Figure } from "@/components/ui/figure";

// Sample data only: generic courses, letters for students, grades on the
// Italian 18–30 scale ("30L" = 30 cum laude).
const courses = ["Greco I", "Storia della Chiesa", "Ebraico I", "Etica"];
const students = ["A", "B", "C", "D", "E", "F"];
const grades = [
  ["28", "30", "27", "25"],
  ["24", "26", "30L", "29"],
  ["30", "27", "28", "30L"],
  ["22", "25", "26", "24"],
  ["29", "30L", "27", "28"],
  ["26", "23", "30", "27"],
];
const me = 2; // the student viewer is student C
const assignedCourses = [0, 2]; // the teacher viewer teaches these

const viewers = [
  { key: "student", scope: "own", filter: "where: { studentId: me.id }" },
  { key: "teacher", scope: "assigned", filter: "where: { courseId: { in: me.courseIds } }" },
  { key: "secretary", scope: "all", filter: "where: {}" },
] as const;

type Viewer = (typeof viewers)[number];

function visible(viewer: Viewer, row: number, col: number): boolean {
  if (viewer.scope === "own") return row === me;
  if (viewer.scope === "assigned") return assignedCourses.includes(col);
  return true;
}

export function ScopesFigure() {
  const t = useTranslations("figures.scopes");
  const name = useId();
  const [index, setIndex] = useState(1);
  const viewer = viewers[index] ?? viewers[1];

  return (
    <Figure caption={t("caption")}>
      <fieldset>
        <legend className="text-sm text-ink-2">{t("legend")}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {viewers.map((v, i) => (
            <label
              key={v.key}
              className="cursor-pointer rounded-[4px] border border-rule px-3 py-1.5 text-ui transition-colors hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink"
            >
              <input type="radio" name={name} className="sr-only" checked={i === index} onChange={() => setIndex(i)} />
              {t(v.key)} <span className="ml-1 font-mono text-xs opacity-75">{v.scope}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <p className="mt-6 text-sm text-ink-2">{t("filter")}</p>
      <p className="mt-1 overflow-x-auto font-mono text-sm whitespace-nowrap">{viewer.filter}</p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[30rem] table-fixed border-separate border-spacing-1 text-center">
          <colgroup>
            <col className="w-28" />
            {courses.map((course) => (
              <col key={course} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <td />
              {courses.map((course) => (
                <th key={course} scope="col" lang="it" className="px-1 pb-1 align-bottom text-xs leading-tight font-normal text-ink-2">
                  {course}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((letter, row) => (
              <tr key={letter}>
                <th scope="row" className="pr-2 text-left text-sm font-normal whitespace-nowrap text-ink-2">
                  {viewer.scope === "own" && row === me ? t("you") : t("studentRow", { letter })}
                </th>
                {courses.map((course, col) => {
                  const shown = visible(viewer, row, col);
                  return (
                    <td
                      key={course}
                      className={
                        shown
                          ? "h-10 rounded-[4px] bg-paper font-medium tabular-nums shadow-[inset_0_0_0_1px_var(--color-ink)] transition-colors duration-300"
                          : "h-10 rounded-[4px] shadow-[inset_0_0_0_1px_var(--color-rule)] [background:repeating-linear-gradient(135deg,transparent_0_5px,var(--color-rule)_5px_6px)] transition-colors duration-300"
                      }
                    >
                      {shown ? grades[row]?.[col] : <span className="sr-only">{t("hidden")}</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Figure>
  );
}
