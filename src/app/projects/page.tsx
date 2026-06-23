import Link from "next/link";

import { getPublishedProjects } from "@/lib/content";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Projects</h1>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} className="rounded-xl border border-white/10 bg-surface p-5">
            <h2 className="text-lg font-semibold">{project.title}</h2>
            <p className="mt-2 text-sm text-muted">{project.shortDescription}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologyUsed.slice(0, 5).map((tech) => (
                <span key={tech} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-muted">
                  {tech}
                </span>
              ))}
            </div>
            <Link href={`/projects/${project.slug}`} className="mt-5 inline-block text-sm text-secondary">
              View details
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
