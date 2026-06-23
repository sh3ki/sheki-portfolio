export type PublishedStatus = "draft" | "published";

export interface ProjectCardData {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  coverImageUrl: string | null;
  technologies: string[];
  status: PublishedStatus;
}

export interface BlogCardData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string | null;
  categories: string[];
  tags: string[];
  status: PublishedStatus;
}
