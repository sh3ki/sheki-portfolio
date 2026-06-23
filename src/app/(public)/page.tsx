import Link from "next/link";

import { getPublishedBlogs, getPublishedProjects } from "@/lib/content";

const services = [
  "Web Platform Engineering",
  "Backend & API Architecture",
  "CMS Product Development",
  "Cloud Deployment & Optimization",
];

const technologies = [
  "Next.js",
  "TypeScript",
  "Prisma",
  "PostgreSQL",
  "Auth.js",
  "Tailwind CSS",
  "Cloudinary",
  "Render",
];

const testimonials = [
  {
    quote:
      "The architecture decisions were practical, scalable, and perfectly aligned with our resource constraints.",
    author: "Senior Product Manager",
  },
  {
    quote:
      "From API design to deployment strategy, execution quality was consistently high and product-focused.",
    author: "Engineering Lead",
  },
];

export default async function HomePage() {
  const projects = await getPublishedProjects();
  const blogs = await getPublishedBlogs();

  const featuredProjects = projects.slice(0, 3);
  const latestBlogs = blogs.slice(0, 3);

  return (
    <section className="space-y-16">
      <div className="rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.3),_transparent_46%),radial-gradient(circle_at_top_right,_rgba(6,182,212,0.22),_transparent_44%),#0a0f1f] p-8 md:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.26em] text-muted">Developer Command Center</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-semibold leading-tight md:text-6xl">
          Shipping product-grade systems with architecture you can actually maintain.
        </h1>
        <p className="mt-4 max-w-2xl text-muted md:text-lg">
          Portfolio, blogs, services, and an internal admin command panel. Built to showcase execution quality,
          system thinking, and pragmatic engineering.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white">
            Explore Projects
          </Link>
          <Link href="/contact" className="rounded-md border border-white/15 px-4 py-2 text-sm text-muted">
            Start a Conversation
          </Link>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold md:text-3xl">Featured Projects</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredProjects.map((project) => (
            <article key={project.id} className="rounded-xl border border-white/10 bg-surface/80 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">Case Study</p>
              <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
              <p className="mt-2 text-sm text-muted">{project.shortDescription}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologyUsed.slice(0, 4).map((tech) => (
                  <span key={tech} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-muted">
                    {tech}
                  </span>
                ))}
              </div>
              <Link href={`/projects/${project.slug}`} className="mt-5 inline-block text-sm text-secondary">
                View project
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-8 rounded-2xl border border-white/10 bg-surface/60 p-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold md:text-3xl">Services</h2>
          <p className="mt-3 text-sm text-muted md:text-base">
            End-to-end delivery from architecture and implementation to deployment and long-term maintainability.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {services.map((service) => (
              <span key={service} className="rounded-md bg-background px-3 py-2 text-sm text-muted">
                {service}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Technology Stack</h3>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {technologies.map((tech) => (
              <div key={tech} className="rounded-md border border-white/10 px-3 py-2 text-sm text-muted">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold md:text-3xl">What Teams Say</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {testimonials.map((item) => (
            <blockquote key={item.quote} className="rounded-xl border border-white/10 bg-surface p-6">
              <p className="text-sm leading-relaxed text-foreground/90">&quot;{item.quote}&quot;</p>
              <footer className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">{item.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold md:text-3xl">Latest Engineering Notes</h2>
          <Link href="/blogs" className="text-sm text-secondary">
            See all blogs
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {latestBlogs.map((blog) => (
            <article key={blog.id} className="rounded-xl border border-white/10 bg-surface p-5">
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="mt-2 text-sm text-muted">{blog.excerpt}</p>
              <Link href={`/blogs/${blog.slug}`} className="mt-5 inline-block text-sm text-secondary">
                Read article
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,_rgba(59,130,246,0.22),_rgba(6,182,212,0.14),_rgba(17,24,39,1))] p-8 text-center md:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Contact CTA</p>
        <h2 className="mt-2 text-2xl font-semibold md:text-3xl">Let’s build your next system.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted md:text-base">
          If you need a high-quality engineering partner for architecture, implementation, or delivery, I’m
          available for product-focused collaborations.
        </p>
        <Link href="/contact" className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm text-white">
          Send a Project Brief
        </Link>
      </section>
    </section>
  );
}
