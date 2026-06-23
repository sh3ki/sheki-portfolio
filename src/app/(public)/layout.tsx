import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-background/85 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
          <Link href="/" className="font-display text-xs uppercase tracking-[0.22em] text-muted">
            Sheki / Command Center
          </Link>
          <ul className="hidden items-center gap-6 text-sm text-muted md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/admin/login"
            className="rounded-md border border-white/15 px-3 py-1.5 text-xs text-muted transition hover:text-foreground"
          >
            Admin
          </Link>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">{children}</main>
    </div>
  );
}
