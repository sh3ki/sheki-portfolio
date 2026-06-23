"use client";

import { useActionState } from "react";

import { submitInquiryAction, type ContactFormState } from "@/app/contact/actions";

const initialState: ContactFormState = {};

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitInquiryAction, initialState);

  return (
    <form action={formAction} className="grid gap-4 rounded-xl border border-white/10 bg-surface p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Name"
          className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
        />
        <input
          name="email"
          required
          type="email"
          placeholder="Email"
          className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
        />
      </div>

      <input
        name="subject"
        required
        placeholder="Subject"
        className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
      />

      <textarea
        name="message"
        required
        rows={6}
        placeholder="Message"
        className="rounded-md border border-white/15 bg-background px-3 py-2 text-sm"
      />

      {state.error ? <p className="text-sm text-red-300">{state.error}</p> : null}
      {state.success ? <p className="text-sm text-secondary">{state.success}</p> : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
