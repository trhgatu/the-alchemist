export type SkillCategory = 'frontend' | 'backend' | 'database' | 'tools' | 'language';

export type Skill = {
  name: string;
  category: SkillCategory;
  iconPath: string;
};

export const SKILLS: Skill[] = [
  { name: 'HTML5', category: 'frontend', iconPath: '/assets/icons/HTML5.svg' },
  { name: 'CSS3', category: 'frontend', iconPath: '/assets/icons/CSS3.svg' },
  { name: 'TypeScript', category: 'language', iconPath: '/assets/icons/TypeScript.svg' },
  { name: 'JavaScript', category: 'language', iconPath: '/assets/icons/JavaScript.svg' },
  { name: 'ReactJS', category: 'frontend', iconPath: '/assets/icons/React.svg' },
  { name: 'Next.js', category: 'frontend', iconPath: '/assets/icons/Next.js.svg' },
  { name: 'TailwindCSS', category: 'frontend', iconPath: '/assets/icons/TailwindCSS.svg' },
  { name: 'GSAP', category: 'frontend', iconPath: '/assets/icons/gsap.svg' },
  { name: 'Node.js', category: 'backend', iconPath: '/assets/icons/Node.js.svg' },
  { name: 'ExpressJS', category: 'backend', iconPath: '/assets/icons/Express.svg' },
  { name: 'NestJS', category: 'backend', iconPath: '/assets/icons/Nest.js.svg' },
  { name: 'MongoDB', category: 'database', iconPath: '/assets/icons/MongoDB.svg' },
  { name: 'GraphQL', category: 'backend', iconPath: '/assets/icons/GraphQL.svg' },
  { name: 'Redis', category: 'backend', iconPath: '/assets/icons/Redis.svg' },
  { name: 'Git', category: 'tools', iconPath: '/assets/icons/Git.svg' },
  { name: 'VSCode', category: 'tools', iconPath: '/assets/icons/VSCode.svg' },
  { name: 'Postman', category: 'tools', iconPath: '/assets/icons/Postman.svg' },
  { name: 'Docker', category: 'tools', iconPath: '/assets/icons/Docker.svg' },
  { name: 'Redux', category: 'frontend', iconPath: '/assets/icons/Redux.svg' },
];

export const TECH_ICON_MAP: Record<string, string> = SKILLS.reduce(
  (acc, skill) => {
    acc[skill.name] = skill.iconPath;
    return acc;
  },
  {} as Record<string, string>
);
