const serviceCards = [
  {
    title: "Web Development",
    description: "Responsive, modern web apps with scalable architecture and maintainable code.",
  },
  {
    title: "Backend Development",
    description: "Robust APIs, data modeling, and secure server workflows.",
  },
  {
    title: "CMS Development",
    description: "Internal admin systems that make content operations fast and safe.",
  },
  {
    title: "Cloud Solutions",
    description: "Deployment design, performance tuning, and free-tier-conscious scaling.",
  },
  {
    title: "AI Integration",
    description: "Practical AI-powered assistants and workflows integrated into product experience.",
  },
];

export default function ServicesPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Services</h1>
      <p className="max-w-3xl text-sm text-muted md:text-base">
        I help teams build production-grade systems from architecture and backend design to frontend delivery and
        deployment.
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {serviceCards.map((service) => (
          <article key={service.title} className="rounded-xl border border-white/10 bg-surface p-5">
            <h2 className="text-lg font-semibold">{service.title}</h2>
            <p className="mt-2 text-sm text-muted">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
