import { Project } from "@/types";
import { ProjectTypeEnum } from "../enums";
import { getMockProjects, getMockProjectBySlug } from "../constants/mock-projects";

export const getPublicProjects = (
  lang: string,
  type?: ProjectTypeEnum,
  featured?: boolean
): Project[] => {
  return getMockProjects(lang, type, featured);
};

export const getPublicProjectBySlug = (slug: string, lang: string): Project => {
  return getMockProjectBySlug(slug, lang);
};
