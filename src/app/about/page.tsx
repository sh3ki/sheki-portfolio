const strengths = [
  "Full Stack Development",
  "System Architecture",
  "API Engineering",
  "Cloud Deployment",
  "Database Design",
];

const skills = {
  Frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  Backend: ["Node.js", "Route Handlers", "Server Actions", "REST APIs"],
  Database: ["PostgreSQL", "Prisma", "Query Optimization"],
  Cloud: ["Render", "Neon", "Cloudinary CDN"],
  DevOps: ["CI/CD", "Monitoring", "Performance Profiling"],
  AI: ["Prompt Design", "LLM Integration", "AI-Assisted UX"],
};

const timeline = [
  { period: "2025 - Present", role: "Independent Software Engineer", summary: "Building modern web systems and CMS platforms." },
  { period: "2023 - 2025", role: "Full Stack Engineer", summary: "Shipped product features across frontend, backend, and infra." },
  { period: "2021 - 2023", role: "Software Developer", summary: "Built APIs and dashboards for internal and external stakeholders." },
];

export default function AboutPage() {
  return (
    <section className="space-y-12">
      <header className="rounded-xl border border-white/10 bg-surface p-6 md:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Introduction</p>
        <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Software Engineer focused on reliable product systems.</h1>
        <p className="mt-3 max-w-3xl text-sm text-muted md:text-base">
          I design and implement web platforms that balance product quality, developer experience, and operational
          efficiency. My work combines architecture rigor with practical delivery.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Core Strengths</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {strengths.map((item) => (
            <article key={item} className="rounded-lg border border-white/10 bg-surface px-4 py-3 text-sm text-muted">
              {item}
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Experience Timeline</h2>
        <div className="space-y-3">
          {timeline.map((item) => (
            <article key={item.period} className="rounded-lg border border-white/10 bg-surface p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold">{item.role}</h3>
              <p className="mt-1 text-sm text-muted">{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Skills Overview</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(skills).map(([category, items]) => (
            <article key={category} className="rounded-lg border border-white/10 bg-surface p-4">
              <h3 className="font-semibold">{category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
