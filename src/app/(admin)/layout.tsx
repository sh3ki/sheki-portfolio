import Link from "next/link";

import { logoutAction } from "@/app/admin/login/actions";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-background-elevated text-foreground md:grid md:grid-cols-[240px_1fr]">
      <aside className="border-r border-white/10 bg-background p-5">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Admin Portal</p>
        <nav className="mt-6 space-y-2 text-sm">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-muted transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <form action={logoutAction} className="mt-8">
          <button
            type="submit"
            className="w-full rounded-md border border-white/15 px-3 py-2 text-sm text-muted transition hover:border-white/25 hover:text-foreground"
          >
            Sign Out
          </button>
        </form>
      </aside>
      <main className="p-6 md:p-10">{children}</main>
    </div>
  );
}
