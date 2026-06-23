const metrics = [
  { label: "Total Projects", value: "0" },
  { label: "Total Blogs", value: "0" },
  { label: "Total Inquiries", value: "0" },
  { label: "Total Testimonials", value: "0" },
];

export default function AdminDashboardPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted">Metrics will be connected to Prisma queries in the next step.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-xl border border-white/10 bg-surface p-5">
            <p className="text-xs uppercase tracking-wide text-muted">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
