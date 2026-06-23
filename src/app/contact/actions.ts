"use server";

import { z } from "zod";

import { prisma } from "@/lib/db";

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export type ContactFormState = {
  error?: string;
  success?: string;
};

export async function submitInquiryAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = inquirySchema.safeParse({
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  });

  if (!parsed.success) {
    return { error: "Please fill all fields correctly." };
  }

  try {
    await prisma.inquiry.create({ data: parsed.data });
    return { success: "Thanks. Your inquiry was sent successfully." };
  } catch {
    return { error: "Unable to send inquiry right now. Please try again later." };
  }
}
