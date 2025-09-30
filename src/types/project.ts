export interface Project {
  _id: string;
  slug: string;
  name: string;
  description: string;
  thumbnail?: string;
  images?: string[];
  tech?: {
    name: string;
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
