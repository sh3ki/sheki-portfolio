import { createBlogAction, deleteBlogAction, toggleBlogPublishAction } from "@/app/admin/actions";
import { prisma } from "@/lib/db";

export default async function AdminBlogsPage() {
  async function getBlogs() {
    try {
      return await prisma.blog.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          published: true,
          excerpt: true,
        },
      });
    } catch {
      return [];
    }
  }

  const blogs = await getBlogs();

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-semibold">Blogs Management</h1>

      <form action={createBlogAction} className="grid gap-3 rounded-xl border border-white/10 bg-surface p-5">
        <h2 className="text-lg font-semibold">Create Blog Post</h2>
        <input
          name="title"
          required
          placeholder="Blog title"
          className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
        />
        <input
          name="excerpt"
          placeholder="Excerpt"
          className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
        />
        <input
          name="coverImageUrl"
          placeholder="Cloudinary cover image URL"
          className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
        />
        <textarea
          name="content"
          required
          rows={5}
          placeholder="Write blog content"
          className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
        />
        <div className="grid gap-3 md:grid-cols-2">
          <input
            name="categories"
            placeholder="Categories (comma separated)"
            className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
          />
          <input
            name="tags"
            placeholder="Tags (comma separated)"
            className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
          />
        </div>
        <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white">
          Create Blog
        </button>
      </form>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-muted">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-t border-white/10">
                <td className="px-4 py-3">
                  <p className="font-medium">{blog.title}</p>
                  <p className="text-xs text-muted">{blog.excerpt ?? "No excerpt"}</p>
                </td>
                <td className="px-4 py-3 text-muted">{blog.slug}</td>
                <td className="px-4 py-3">{blog.published ? "Published" : "Draft"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <form action={toggleBlogPublishAction}>
                      <input type="hidden" name="id" value={blog.id} />
                      <button
                        type="submit"
                        className="rounded-md border border-white/15 px-3 py-1.5 text-xs text-muted hover:text-foreground"
                      >
                        {blog.published ? "Unpublish" : "Publish"}
                      </button>
                    </form>

                    <form action={deleteBlogAction}>
                      <input type="hidden" name="id" value={blog.id} />
                      <button
                        type="submit"
                        className="rounded-md border border-red-300/20 px-3 py-1.5 text-xs text-red-300"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
