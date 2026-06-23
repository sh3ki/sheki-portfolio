import { prisma } from "@/lib/db";

type ProjectRecord = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  overview?: string;
  outcome?: string | null;
  keyFeatures: string[];
  technologyUsed: string[];
  challengesAndLessons?: string | null;
  coverImageUrl?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
};

type BlogRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string | null;
  publishedAt?: Date | null;
  categories: string[];
  tags: string[];
};

const sampleProjects: ProjectRecord[] = [
  {
    id: "sample-proj-1",
    title: "Neon Commerce Platform",
    slug: "neon-commerce-platform",
    shortDescription: "A modular e-commerce suite optimized for free-tier cloud infrastructure.",
    overview:
      "Built a complete commerce workflow with modular services, background jobs, and an admin-facing catalog manager.",
    outcome: "Reduced deployment costs by 38% while increasing checkout completion by 16%.",
    keyFeatures: [
      "Server Action-based checkout flow",
      "Role-aware admin controls",
      "Cloudinary-powered image transformations",
    ],
    technologyUsed: ["Next.js", "TypeScript", "Prisma", "Neon", "Cloudinary"],
    challengesAndLessons:
      "Balancing dynamic and static rendering improved perceived performance across high-traffic routes.",
    githubUrl: "https://github.com/your-username/neon-commerce-platform",
    liveUrl: "https://example.com",
  },
  {
    id: "sample-proj-2",
    title: "Ops Visibility Dashboard",
    slug: "ops-visibility-dashboard",
    shortDescription: "Monitoring command center for service health, incidents, and release insights.",
    overview:
      "Implemented a dashboard that consolidates logs, alerts, and release timelines for engineering teams.",
    outcome: "Cut mean-time-to-diagnosis from 43 minutes to 14 minutes.",
    keyFeatures: ["Incident timeline", "Service heatmaps", "Automated release annotations"],
    technologyUsed: ["React", "Next.js", "Tailwind CSS", "PostgreSQL"],
    challengesAndLessons: "Clear observability UI patterns matter as much as data fidelity.",
    githubUrl: "https://github.com/your-username/ops-visibility-dashboard",
  },
  {
    id: "sample-proj-3",
    title: "Knowledge API Core",
    slug: "knowledge-api-core",
    shortDescription: "A typed API layer for managing technical documentation and semantic metadata.",
    overview:
      "Designed a robust API platform with schema validation, caching, and audit-ready mutation logs.",
    outcome: "Enabled 4 product teams to ship docs integrations with a single API surface.",
    keyFeatures: ["Schema-first contracts", "Audit log events", "Smart content indexing"],
    technologyUsed: ["Node.js", "Prisma", "PostgreSQL", "Zod"],
    challengesAndLessons: "Schema versioning needs to be treated as a product concern, not only infra.",
  },
];

const sampleBlogs: BlogRecord[] = [
  {
    id: "sample-blog-1",
    title: "Designing Resilient Server Actions",
    slug: "designing-resilient-server-actions",
    excerpt: "A practical guide to validation, authorization, and cache revalidation in production Next.js apps.",
    content:
      "Server Actions are powerful when paired with strict validation and explicit authorization checks. Start by validating every input, then gate every mutation with session checks, and finally revalidate only the paths that changed.",
    categories: ["Architecture"],
    tags: ["nextjs", "server-actions", "security"],
    publishedAt: new Date("2026-06-01"),
  },
  {
    id: "sample-blog-2",
    title: "Prisma Query Patterns for Free-Tier Scale",
    slug: "prisma-query-patterns-for-free-tier-scale",
    excerpt: "How to avoid expensive query patterns and still keep your code maintainable.",
    content:
      "Most free-tier bottlenecks are query-shape issues. Paginate aggressively, index selectively, and keep relation loading explicit to preserve both speed and predictability.",
    categories: ["Backend"],
    tags: ["prisma", "postgres", "performance"],
    publishedAt: new Date("2026-05-20"),
  },
];

export async function getPublishedProjects(): Promise<ProjectRecord[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        overview: true,
        outcome: true,
        keyFeatures: true,
        technologyUsed: true,
        challengesAndLessons: true,
        coverImageUrl: true,
        githubUrl: true,
        liveUrl: true,
      },
    });

    if (!projects.length) {
      return sampleProjects;
    }

    return projects;
  } catch {
    return sampleProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectRecord | null> {
  try {
    const project = await prisma.project.findFirst({
      where: { slug, published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        overview: true,
        outcome: true,
        keyFeatures: true,
        technologyUsed: true,
        challengesAndLessons: true,
        coverImageUrl: true,
        githubUrl: true,
        liveUrl: true,
      },
    });

    if (project) {
      return project;
    }
  } catch {
    // fall back to sample content
  }

  return sampleProjects.find((project) => project.slug === slug) ?? null;
}

export async function getPublishedBlogs(): Promise<BlogRecord[]> {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        coverImageUrl: true,
        publishedAt: true,
        categoryLinks: { select: { category: { select: { name: true } } } },
        tagLinks: { select: { tag: { select: { name: true } } } },
      },
    });

    if (!blogs.length) {
      return sampleBlogs;
    }

    return blogs.map((blog) => ({
      id: blog.id,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt ?? "",
      content: blog.content,
      coverImageUrl: blog.coverImageUrl,
      publishedAt: blog.publishedAt,
      categories: blog.categoryLinks.map((link) => link.category.name),
      tags: blog.tagLinks.map((link) => link.tag.name),
    }));
  } catch {
    return sampleBlogs;
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogRecord | null> {
  try {
    const blog = await prisma.blog.findFirst({
      where: { slug, published: true },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        coverImageUrl: true,
        publishedAt: true,
        categoryLinks: { select: { category: { select: { name: true } } } },
        tagLinks: { select: { tag: { select: { name: true } } } },
      },
    });

    if (blog) {
      return {
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt ?? "",
        content: blog.content,
        coverImageUrl: blog.coverImageUrl,
        publishedAt: blog.publishedAt,
        categories: blog.categoryLinks.map((link) => link.category.name),
        tags: blog.tagLinks.map((link) => link.tag.name),
      };
    }
  } catch {
    // fall back to sample content
  }

  return sampleBlogs.find((blog) => blog.slug === slug) ?? null;
}
