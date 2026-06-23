import { notFound } from "next/navigation";

import { getBlogBySlug, getPublishedBlogs } from "@/lib/content";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogs = await getPublishedBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <header className="rounded-xl border border-white/10 bg-surface p-6">
        <h1 className="text-3xl font-semibold">{blog.title}</h1>
        <p className="mt-3 text-sm text-muted md:text-base">{blog.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <section className="rounded-xl border border-white/10 bg-surface p-6">
        <h2 className="text-xl font-semibold">Article</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted md:text-base">{blog.content}</p>
      </section>
    </article>
  );
}
