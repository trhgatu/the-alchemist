import { useQuery } from '@tanstack/react-query';
import { getPublicProjectBySlug } from '../services';
import { Project } from '@/types';

export const usePublicProjectBySlug = (slug: string, lang: string) => {
  return useQuery<Project>({
    queryKey: ['public-project', slug, lang],
    queryFn: () => getPublicProjectBySlug(slug, lang),
    enabled: !!slug,
  });
};
