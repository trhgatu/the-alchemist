export interface Project {
  _id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
  tech?: {
    name: string;
    icon: string;
  }[];
  category?: string;
  projectStatus: 'Completed' | 'In Progress';
  status: 'published' | 'draft';
  link?: string;
  repo?: string;
  featured?: boolean;
  downloads: number;
  year?: number;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type ViewMode = 'grid' | 'list';
export type Category =
  | 'All'
  | 'Full-Stack'
  | 'Frontend'
  | 'Backend'
  | 'AI/ML'
  | 'Mobile'
  | 'Productivity';
