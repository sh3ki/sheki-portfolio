"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function ensureAdmin() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
}

export async function createProjectAction(formData: FormData) {
  await ensureAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const shortDescription = String(formData.get("shortDescription") ?? "").trim();
  const overview = String(formData.get("overview") ?? "").trim();
  const technologies = String(formData.get("technologies") ?? "").trim();
  const coverImageUrl = String(formData.get("coverImageUrl") ?? "").trim();
  const githubUrl = String(formData.get("githubUrl") ?? "").trim();
  const liveUrl = String(formData.get("liveUrl") ?? "").trim();

  if (!title || !shortDescription || !overview) {
    throw new Error("Title, short description, and overview are required.");
  }

  await prisma.project.create({
    data: {
      title,
      slug: slugify(title),
      shortDescription,
      overview,
      keyFeatures: [],
      technologyUsed: technologies ? technologies.split(",").map((item) => item.trim()) : [],
      coverImageUrl: coverImageUrl || null,
      githubUrl: githubUrl || null,
      liveUrl: liveUrl || null,
      published: false,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function deleteProjectAction(formData: FormData) {
  await ensureAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) {
    throw new Error("Project id is required.");
  }

  await prisma.project.delete({ where: { id } });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function toggleProjectPublishAction(formData: FormData) {
  await ensureAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) {
    throw new Error("Project id is required.");
  }

  const existing = await prisma.project.findUnique({ where: { id }, select: { published: true } });
  if (!existing) {
    throw new Error("Project not found.");
  }

  await prisma.project.update({ where: { id }, data: { published: !existing.published } });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function createBlogAction(formData: FormData) {
  await ensureAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const coverImageUrl = String(formData.get("coverImageUrl") ?? "").trim();
  const categories = String(formData.get("categories") ?? "").trim();
  const tags = String(formData.get("tags") ?? "").trim();

  if (!title || !content) {
    throw new Error("Title and content are required.");
  }

  const blog = await prisma.blog.create({
    data: {
      title,
      slug: slugify(title),
      excerpt,
      content,
      coverImageUrl: coverImageUrl || null,
      published: false,
    },
  });

  const categoryNames = categories
    ? categories
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  const tagNames = tags
    ? tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  for (const name of categoryNames) {
    const category = await prisma.blogCategory.upsert({
      where: { slug: slugify(name) },
      update: { name },
      create: { name, slug: slugify(name) },
    });

    await prisma.blogCategoryRelation.upsert({
      where: {
        blogId_categoryId: {
          blogId: blog.id,
          categoryId: category.id,
        },
      },
      update: {},
      create: {
        blogId: blog.id,
        categoryId: category.id,
      },
    });
  }

  for (const name of tagNames) {
    const tag = await prisma.blogTag.upsert({
      where: { slug: slugify(name) },
      update: { name },
      create: { name, slug: slugify(name) },
    });

    await prisma.blogTagRelation.upsert({
      where: {
        blogId_tagId: {
          blogId: blog.id,
          tagId: tag.id,
        },
      },
      update: {},
      create: {
        blogId: blog.id,
        tagId: tag.id,
      },
    });
  }

  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
}

export async function toggleBlogPublishAction(formData: FormData) {
  await ensureAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) {
    throw new Error("Blog id is required.");
  }

  const existing = await prisma.blog.findUnique({ where: { id }, select: { published: true } });
  if (!existing) {
    throw new Error("Blog not found.");
  }

  await prisma.blog.update({
    where: { id },
    data: {
      published: !existing.published,
      publishedAt: !existing.published ? new Date() : null,
    },
  });

  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
}

export async function deleteBlogAction(formData: FormData) {
  await ensureAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) {
    throw new Error("Blog id is required.");
  }

  await prisma.blog.delete({ where: { id } });

  revalidatePath("/admin/blogs");
  revalidatePath("/blogs");
}

export async function markInquiryReadAction(formData: FormData) {
  await ensureAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) {
    throw new Error("Inquiry id is required.");
  }

  await prisma.inquiry.update({ where: { id }, data: { readAt: new Date() } });

  revalidatePath("/admin/inquiries");
}

export async function archiveInquiryAction(formData: FormData) {
  await ensureAdmin();

  const id = String(formData.get("id") ?? "");
  if (!id) {
    throw new Error("Inquiry id is required.");
  }

  await prisma.inquiry.update({ where: { id }, data: { archived: true } });

  revalidatePath("/admin/inquiries");
}
