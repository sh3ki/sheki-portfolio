"use client";

import { useActionState } from "react";

import { loginAction, type LoginFormState } from "@/app/admin/login/actions";

const initialState: LoginFormState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm text-muted">
          Admin Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-white/15 bg-background px-3 py-2 text-sm outline-none ring-primary/30 transition focus:ring"
          placeholder="admin@example.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm text-muted">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className="w-full rounded-lg border border-white/15 bg-background px-3 py-2 text-sm outline-none ring-primary/30 transition focus:ring"
          placeholder="Enter your password"
        />
      </div>

      {state.error ? <p className="text-sm text-red-300">{state.error}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-60"
      >
        {pending ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}
