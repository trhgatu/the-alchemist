import axiosInstance from '@/lib/axios';
import { Project } from '@/types';
import { ProjectTypeEnum } from '../enums';

export const getPublicProjects = async (
  lang: string,
  type?: ProjectTypeEnum,
  featured?: boolean
): Promise<Project[]> => {
  const params: Record<string, string> = { lang };
  if (type) params.type = type;

  if (featured !== undefined) {
    params.featured = String(featured);
  }
  const res = await axiosInstance.get('/projects', { params });
  return res.data.data;
};

export const getPublicProjectBySlug = async (
  slug: string,
  lang: string
): Promise<Project> => {
  const res = await axiosInstance.get(`/projects/${slug}`, {
    params: { lang },
  });
  return res.data.data;
};
