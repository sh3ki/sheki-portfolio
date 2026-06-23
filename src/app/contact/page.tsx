import { ContactForm } from "@/app/contact/ContactForm";

export default function ContactPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Contact</h1>
      <p className="max-w-3xl text-sm text-muted md:text-base">
        Tell me what you are building, the constraints you are working with, and the outcome you want. I will
        respond with a practical implementation path.
      </p>

      <ContactForm />
    </section>
  );
}
