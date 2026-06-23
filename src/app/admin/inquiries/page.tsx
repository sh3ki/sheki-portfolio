import { archiveInquiryAction, markInquiryReadAction } from "@/app/admin/actions";
import { prisma } from "@/lib/db";

export default async function AdminInquiriesPage() {
  async function getInquiries() {
    try {
      return await prisma.inquiry.findMany({
        where: { archived: false },
        orderBy: { createdAt: "desc" },
      });
    } catch {
      return [];
    }
  }

  const inquiries = await getInquiries();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Inquiries</h1>

      <div className="space-y-3">
        {inquiries.length === 0 ? (
          <article className="rounded-xl border border-white/10 bg-surface p-5 text-sm text-muted">
            No inquiries yet.
          </article>
        ) : (
          inquiries.map((inquiry) => (
            <article key={inquiry.id} className="rounded-xl border border-white/10 bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{inquiry.subject}</p>
                  <p className="text-sm text-muted">
                    {inquiry.name} · {inquiry.email}
                  </p>
                </div>
                <span className="text-xs text-muted">
                  {inquiry.readAt ? "Read" : "Unread"} · {new Date(inquiry.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="mt-3 text-sm text-muted">{inquiry.message}</p>

              <div className="mt-4 flex gap-2">
                <form action={markInquiryReadAction}>
                  <input type="hidden" name="id" value={inquiry.id} />
                  <button
                    type="submit"
                    className="rounded-md border border-white/15 px-3 py-1.5 text-xs text-muted hover:text-foreground"
                  >
                    Mark Read
                  </button>
                </form>

                <form action={archiveInquiryAction}>
                  <input type="hidden" name="id" value={inquiry.id} />
                  <button
                    type="submit"
                    className="rounded-md border border-red-300/20 px-3 py-1.5 text-xs text-red-300"
                  >
                    Archive
                  </button>
                </form>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
