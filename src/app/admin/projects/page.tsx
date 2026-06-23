import {
  createProjectAction,
  deleteProjectAction,
  toggleProjectPublishAction,
} from "@/app/admin/actions";
import { prisma } from "@/lib/db";

export default async function AdminProjectsPage() {
  async function getProjects() {
    try {
      return await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          published: true,
          createdAt: true,
          shortDescription: true,
        },
      });
    } catch {
      return [];
    }
  }

  const projects = await getProjects();

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-semibold">Projects Management</h1>

      <form action={createProjectAction} className="grid gap-3 rounded-xl border border-white/10 bg-surface p-5">
        <h2 className="text-lg font-semibold">Create Project</h2>
        <input
          name="title"
          required
          placeholder="Project title"
          className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
        />
        <input
          name="shortDescription"
          required
          placeholder="Short description"
          className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
        />
        <textarea
          name="overview"
          required
          rows={3}
          placeholder="Project overview"
          className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
        />
        <input
          name="technologies"
          placeholder="Technologies (comma separated)"
          className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
        />
        <input
          name="coverImageUrl"
          placeholder="Cloudinary cover image URL"
          className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
        />
        <div className="grid gap-3 md:grid-cols-2">
          <input
            name="githubUrl"
            placeholder="GitHub URL"
            className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
          />
          <input
            name="liveUrl"
            placeholder="Live URL"
            className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
          />
        </div>
        <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white">
          Create Project
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
            {projects.map((project) => (
              <tr key={project.id} className="border-t border-white/10">
                <td className="px-4 py-3">
                  <p className="font-medium">{project.title}</p>
                  <p className="text-xs text-muted">{project.shortDescription}</p>
                </td>
                <td className="px-4 py-3 text-muted">{project.slug}</td>
                <td className="px-4 py-3">{project.published ? "Published" : "Draft"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <form action={toggleProjectPublishAction}>
                      <input type="hidden" name="id" value={project.id} />
                      <button
                        type="submit"
                        className="rounded-md border border-white/15 px-3 py-1.5 text-xs text-muted hover:text-foreground"
                      >
                        {project.published ? "Unpublish" : "Publish"}
                      </button>
                    </form>

                    <form action={deleteProjectAction}>
                      <input type="hidden" name="id" value={project.id} />
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
