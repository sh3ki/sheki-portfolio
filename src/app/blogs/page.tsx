import Link from "next/link";

import { getPublishedBlogs } from "@/lib/content";

export default async function BlogsPage() {
  const blogs = await getPublishedBlogs();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Blogs</h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog) => (
          <article key={blog.id} className="rounded-xl border border-white/10 bg-surface p-5">
            <h2 className="text-lg font-semibold">{blog.title}</h2>
            <p className="mt-2 text-sm text-muted">{blog.excerpt}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {blog.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>
            <Link href={`/blogs/${blog.slug}`} className="mt-5 inline-block text-sm text-secondary">
              Read article
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
