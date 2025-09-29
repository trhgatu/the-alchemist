import { useQuery } from '@tanstack/react-query';
import { getPublicProjects } from '../services';
import { Project } from '@/types';
import { ProjectTypeEnum } from '../enums';

export const usePublicProjects = (
  lang: string,
  type?: ProjectTypeEnum,
  featured?: boolean
) => {
  return useQuery<Project[]>({
    queryKey: ['public-projects', lang, type, featured ?? 'all'],
    queryFn: () => getPublicProjects(lang, type, featured),
  });
};
