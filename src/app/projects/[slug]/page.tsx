import { notFound } from "next/navigation";

import { getProjectBySlug, getPublishedProjects } from "@/lib/content";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <header className="rounded-xl border border-white/10 bg-surface p-6">
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <p className="mt-3 text-sm text-muted md:text-base">{project.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologyUsed.map((tech) => (
            <span key={tech} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-muted">
              {tech}
            </span>
          ))}
        </div>
      </header>

      <section className="rounded-xl border border-white/10 bg-surface p-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="mt-2 text-sm text-muted md:text-base">{project.overview}</p>
      </section>

      <section className="rounded-xl border border-white/10 bg-surface p-6">
        <h2 className="text-xl font-semibold">Key Features</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
          {project.keyFeatures.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </section>

      {project.challengesAndLessons ? (
        <section className="rounded-xl border border-white/10 bg-surface p-6">
          <h2 className="text-xl font-semibold">Challenges and Learnings</h2>
          <p className="mt-2 text-sm text-muted md:text-base">{project.challengesAndLessons}</p>
        </section>
      ) : null}

      {project.outcome ? (
        <section className="rounded-xl border border-white/10 bg-surface p-6">
          <h2 className="text-xl font-semibold">Outcome</h2>
          <p className="mt-2 text-sm text-muted md:text-base">{project.outcome}</p>
        </section>
      ) : null}
    </article>
  );
}
