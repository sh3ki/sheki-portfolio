import { LoginForm } from "@/app/admin/login/LoginForm";

export default function AdminLoginPage() {
  return (
    <section className="mx-auto w-full max-w-md rounded-2xl border border-white/10 bg-surface p-8">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      <p className="mt-2 text-sm text-muted">Access the control panel with your administrator account.</p>
      <LoginForm />
    </section>
  );
}
