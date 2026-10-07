import { Project } from "@/types";
import { ProjectTypeEnum } from "../enums";

const IMG = "/assets/images/craftings";

type Text = Pick<Project, "description" | "credit">;

// What stays the same in every language
const WORKS: Omit<Project, keyof Text>[] = [
  {
    _id: "proj-1",
    slug: "magnum-opus",
    name: "Magnum Opus",
    thumbnail: `${IMG}/magnum-opus.webp`,
    images: [
      `${IMG}/magnum-opus.webp`,
      `${IMG}/magnum-opus-architecture.webp`,
      `${IMG}/magnum-opus-sign-in.webp`,
    ],
    tech: [
      { name: "TypeScript" },
      { name: "NestJS" },
      { name: "Next.js" },
      { name: "PostgreSQL & Prisma" },
      { name: "Redis & BullMQ" },
      { name: "Docker" },
    ],
    category: "Full-Stack",
    projectStatus: "In Progress",
    status: "published",
    link: "https://www.magnum-opus.dev",
    repo: "https://github.com/trhgatu/magnum-opus",
    featured: true,
    year: "2026",
  },
  {
    _id: "proj-2",
    slug: "the-ronin",
    name: "The Ronin",
    thumbnail: `${IMG}/the-ronin.webp`,
    images: [
      `${IMG}/the-ronin.webp`,
      `${IMG}/the-ronin-lake.webp`,
      `${IMG}/the-ronin-philosophy.webp`,
      `${IMG}/the-ronin-summons.webp`,
    ],
    tech: [
      { name: "Next.js" },
      { name: "React Three Fiber" },
      { name: "OGL" },
      { name: "GSAP" },
      { name: "Lenis" },
      { name: "Tailwind CSS" },
    ],
    category: "Frontend",
    projectStatus: "Completed",
    status: "published",
    link: "https://thatu.dev",
    repo: "https://github.com/trhgatu/thatu",
    featured: true,
    year: "2026",
  },
  {
    _id: "proj-3",
    slug: "kim-khanh",
    name: "Kim Khanh",
    thumbnail: `${IMG}/kim-khanh.webp`,
    images: [
      `${IMG}/kim-khanh.webp`,
      `${IMG}/kim-khanh-about.webp`,
      `${IMG}/kim-khanh-journey.webp`,
      `${IMG}/kim-khanh-notes.webp`,
    ],
    tech: [
      { name: "Next.js" },
      { name: "Three.js" },
      { name: "OGL" },
      { name: "GSAP" },
      { name: "Lenis" },
      { name: "Tailwind CSS" },
    ],
    category: "Frontend",
    projectStatus: "Completed",
    status: "published",
    link: "https://kimkhanh-portfolio.vercel.app/",
    repo: "https://github.com/trhgatu/kimkhanh-portfolio",
    featured: true,
    year: "2026",
  },
  {
    _id: "proj-4",
    slug: "the-alchemist",
    name: "The Alchemist",
    thumbnail: `${IMG}/the-alchemist.webp`,
    images: [
      `${IMG}/the-alchemist.webp`,
      `${IMG}/the-alchemist-hero.webp`,
      `${IMG}/the-alchemist-journal.webp`,
      `${IMG}/the-alchemist-desert.webp`,
    ],
    tech: [
      { name: "Next.js" },
      { name: "React Three Fiber" },
      { name: "OGL" },
      { name: "GSAP" },
      { name: "Zustand" },
      { name: "Tailwind CSS" },
    ],
    category: "Frontend",
    projectStatus: "Completed",
    status: "published",
    link: "https://thatu.is-a.dev",
    repo: "https://github.com/trhgatu/the-alchemist",
    featured: true,
    year: "2025–2026",
  },
];

const TEXT: Record<"en" | "vi", Record<string, Text>> = {
  en: {
    "magnum-opus": {
      description:
        "The great work is a life. A private place to keep days, moods and memories, and to see in them, slowly, what needs to change.",
    },
    "the-ronin": {
      description:
        "A masterless swordsman walks through ink and snow. My portfolio, told as a samurai's tale, each chapter a page of torn washi.",
    },
    "kim-khanh": {
      description:
        "Made for Kim Khanh. A scrapbook of flowers, places and small everyday joys, kept as gently as petals pressed between pages.",
      credit: '3D model "Rhododendron - Azalea" by Nestaeric on Sketchfab, licensed CC BY 4.0.',
    },
    "the-alchemist": {
      description:
        "The book in your hands. The tale of a shepherd boy who left home to find his treasure, retold through my own years of learning to make things.",
    },
  },
  vi: {
    "magnum-opus": {
      description:
        "Đời người là kiệt tác lớn nhất. Một chốn riêng để cất giữ ngày tháng, buồn vui và ký ức, để mỗi lần nhìn lại là thấy rõ hơn mình cần thay đổi điều gì.",
    },
    "the-ronin": {
      description:
        "Portfolio của tôi, kể bằng câu chuyện một lãng nhân lang bạt giữa mực tàu và tuyết trắng. Mỗi chương là một trang giấy washi rách mép.",
    },
    "kim-khanh": {
      description:
        "Trang web dành riêng cho Kim Khanh, như một cuốn sổ lưu niệm: có hoa, có những nơi đã đi qua, có những niềm vui nho nhỏ mỗi ngày, nâng niu như cánh hoa ép trong trang sách.",
      credit:
        'Mô hình 3D "Rhododendron - Azalea" của Nestaeric trên Sketchfab, giấy phép CC BY 4.0.',
    },
    "the-alchemist": {
      description:
        "Chính là cuốn sách bạn đang đọc. Chuyện cậu bé chăn cừu rời quê đi tìm kho báu, kể lại qua chính những năm tháng tôi học cách tạo ra mọi thứ.",
    },
  },
};

const withText = (lang: "en" | "vi"): Project[] =>
  WORKS.map((work) => ({ ...work, ...TEXT[lang][work.slug] }));

export const MOCK_PROJECTS_EN: Project[] = withText("en");
export const MOCK_PROJECTS_VI: Project[] = withText("vi");

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
