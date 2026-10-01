import { Project } from "@/types";
import { ProjectTypeEnum } from "../enums";

export const MOCK_PROJECTS_EN: Project[] = [
  {
    _id: "proj-1",
    slug: "magnum-opus",
    name: "Magnum Opus",
    description:
      "The Great Work — A sovereign digital sanctuary of memory and reflection, forged through unyielding architectural mastery and the alchemy of code.",
    thumbnail: "/assets/images/craftings/magnum-opus.png",
    images: [
      "/assets/images/craftings/magnum-opus.png",
      "/assets/images/craftings/magic_circle.png",
    ],
    tech: [
      { name: "Turborepo" },
      { name: "NestJS (DDD/CQRS)" },
      { name: "Next.js 15" },
      { name: "Vite Admin" },
      { name: "Prisma & Postgres" },
      { name: "Redis & BullMQ" },
      { name: "Socket.IO" },
    ],
    category: "Full-Stack",
    projectStatus: "In Progress",
    status: "published",
    link: "https://magnum-opus.dev/",
    repo: "https://github.com/trhgatu",
    featured: true,
    downloads: 320,
    year: 2026,
    publishedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "proj-2",
    slug: "the-ronin",
    name: "The Ronin",
    description:
      "An ethereal Japanese Sumi-e interactive experience — Chronicling the path of the masterless warrior through traditional ink artistry and dynamic 3D physics.",
    thumbnail: "/assets/images/craftings/the-ronin.png",
    images: [
      "/assets/images/craftings/the-ronin.png",
      "/assets/images/craftings/bg_sumi_e_snow.png",
      "/assets/images/craftings/sumi_tree.png",
    ],
    tech: [
      { name: "Next.js" },
      { name: "Three.js" },
      { name: "GSAP" },
      { name: "Sumi-e Shaders" },
      { name: "Tailwind CSS" },
    ],
    category: "Frontend",
    projectStatus: "Completed",
    status: "published",
    link: "https://thatu.vercel.app/",
    repo: "https://github.com/trhgatu",
    featured: true,
    downloads: 215,
    year: 2026,
    publishedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "proj-3",
    slug: "the-alchemist",
    name: "The Alchemist",
    description:
      "An interactive 3D digital grimoire portfolio and alchemical forge — Transmuting abstract logic and code into enduring structural art.",
    thumbnail: "/assets/images/craftings/alchemist_forge_bg.png",
    images: [
      "/assets/images/craftings/alchemist_forge_bg.png",
      "/assets/images/craftings/alchemist_mountain_path.png",
      "/assets/images/craftings/alchemist_silhoutte_boy.png",
    ],
    tech: [
      { name: "Next.js 15" },
      { name: "Three.js / OGL" },
      { name: "GSAP" },
      { name: "SVG Displacement" },
      { name: "Tailwind CSS" },
    ],
    category: "Frontend",
    projectStatus: "Completed",
    status: "published",
    link: "https://thatu.is-a.dev/",
    repo: "https://github.com/trhgatu/the-alchemist",
    featured: true,
    downloads: 180,
    year: 2026,
    publishedAt: "2026-01-01T00:00:00.000Z",
  },
];

export const MOCK_PROJECTS_VI: Project[] = [
  {
    _id: "proj-1",
    slug: "magnum-opus",
    name: "Magnum Opus",
    description:
      "The Great Work — Thánh địa kỹ thuật số lưu giữ ký ức và tâm thức, được đúc kết từ hàng vạn dòng lệnh bất hoại và quy luật kiến trúc vĩnh hằng.",
    thumbnail: "/assets/images/craftings/magnum-opus.png",
    images: [
      "/assets/images/craftings/magnum-opus.png",
      "/assets/images/craftings/magic_circle.png",
    ],
    tech: [
      { name: "Turborepo" },
      { name: "NestJS (DDD/CQRS)" },
      { name: "Next.js 15" },
      { name: "Vite Admin" },
      { name: "Prisma & Postgres" },
      { name: "Redis & BullMQ" },
      { name: "Socket.IO" },
    ],
    category: "Full-Stack",
    projectStatus: "In Progress",
    status: "published",
    link: "https://magnum-opus.dev/",
    repo: "https://github.com/trhgatu",
    featured: true,
    downloads: 320,
    year: 2026,
    publishedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "proj-2",
    slug: "the-ronin",
    name: "The Ronin",
    description:
      "Tuyệt tác thủy mặc tương tác sống động — Khắc họa hành trình kiếm sĩ vô danh qua nghệ thuật Sumi-e truyền thống và công nghệ 3D tân tiến.",
    thumbnail: "/assets/images/craftings/the-ronin.png",
    images: [
      "/assets/images/craftings/the-ronin.png",
      "/assets/images/craftings/bg_sumi_e_snow.png",
      "/assets/images/craftings/sumi_tree.png",
    ],
    tech: [
      { name: "Next.js" },
      { name: "Three.js" },
      { name: "GSAP" },
      { name: "Sumi-e Shaders" },
      { name: "Tailwind CSS" },
    ],
    category: "Frontend",
    projectStatus: "Completed",
    status: "published",
    link: "https://thatu.vercel.app/",
    repo: "https://github.com/trhgatu",
    featured: true,
    downloads: 215,
    year: 2026,
    publishedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "proj-3",
    slug: "the-alchemist",
    name: "The Alchemist",
    description:
      "Bản thảo ma thuật 3D tương tác đa chiều — Nơi dòng lệnh biến thành thi ca và tư duy logic hòa quyện cùng triết lý giả kim thuật.",
    thumbnail: "/assets/images/craftings/alchemist_forge_bg.png",
    images: [
      "/assets/images/craftings/alchemist_forge_bg.png",
      "/assets/images/craftings/alchemist_mountain_path.png",
      "/assets/images/craftings/alchemist_silhoutte_boy.png",
    ],
    tech: [
      { name: "Next.js 15" },
      { name: "Three.js / OGL" },
      { name: "GSAP" },
      { name: "SVG Displacement" },
      { name: "Tailwind CSS" },
    ],
    category: "Frontend",
    projectStatus: "Completed",
    status: "published",
    link: "https://thatu.is-a.dev/",
    repo: "https://github.com/trhgatu/the-alchemist",
    featured: true,
    downloads: 180,
    year: 2026,
    publishedAt: "2026-01-01T00:00:00.000Z",
  },
];

export const MOCK_PROJECTS: Project[] = MOCK_PROJECTS_EN;

export const getMockProjects = async (
  lang: string,
  _type?: ProjectTypeEnum,
  featured?: boolean
): Promise<Project[]> => {
  const source = lang === "vi" ? MOCK_PROJECTS_VI : MOCK_PROJECTS_EN;
  let result = [...source];
  if (featured !== undefined) {
    result = result.filter((p) => p.featured === featured);
  }
  return result;
};

export const getMockProjectBySlug = async (slug: string, lang?: string): Promise<Project> => {
  const source = lang === "vi" ? MOCK_PROJECTS_VI : MOCK_PROJECTS_EN;
  const project = source.find((p) => p.slug === slug);
  if (!project) {
    throw new Error(`Project with slug '${slug}' not found.`);
  }
  return project;
};
