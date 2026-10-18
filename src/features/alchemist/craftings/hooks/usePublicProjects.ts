import { getPublicProjects } from "../services";
import { Project } from "@/types";
import { ProjectTypeEnum } from "../enums";

export const usePublicProjects = (
  lang: string,
  type?: ProjectTypeEnum,
  featured?: boolean
): { data: Project[]; isLoading: false; isError: false } => {
  const data = getPublicProjects(lang, type, featured);
  return {
    data,
    isLoading: false,
    isError: false,
  };
};
