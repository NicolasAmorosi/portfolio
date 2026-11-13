import Image from "next/image";
import { getLocale } from "next-intl/server";
import { Plate } from "@/components/ui/plate";
import type { Project } from "@/content/projects";
import { Drawing } from "./drawings";

// The side plate for a project row: its real screenshot when there is one,
// otherwise its drawing, with the line of numbers underneath.
export async function ProjectPlate({ project, label }: { project: Project; label: string }) {
  const locale = await getLocale();
  const screenshot = project.screenshot;
  return (
    <Plate label={label} title={project.title[locale]} note={project.proof[locale]}>
      {screenshot ? (
        <Image
          src={screenshot.image[locale].light}
          alt=""
          sizes="26rem"
          className="fill-in h-auto w-full rounded-[4px] ring-1 ring-plan-line/30"
        />
      ) : (
        <Drawing kind={project.figure} className="w-full text-plan-line" />
      )}
    </Plate>
  );
}
