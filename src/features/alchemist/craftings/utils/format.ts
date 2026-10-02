import { Project } from "@/types";

export const LINK =
  "underline decoration-[#e9dfcc]/30 underline-offset-[6px] hover:decoration-amber-300 hover:text-amber-200 transition-colors";

/** One-line summary: category · year · state */
export function projectMeta(project: Project, states: Record<Project["projectStatus"], string>) {
  return [project.category, project.year, states[project.projectStatus]]
    .filter(Boolean)
    .join(" · ");
}
