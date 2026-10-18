import { getPublicProjectBySlug } from "../services";
import { Project } from "@/types";

export const usePublicProjectBySlug = (
  slug: string,
  lang: string
): { data: Project | undefined; isLoading: false; isError: false } => {
  const data = slug ? getPublicProjectBySlug(slug, lang) : undefined;
  return {
    data,
    isLoading: false,
    isError: false,
  };
};
