"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(3).max(150),
  message: z.string().min(10).max(2000),
  honeypot: z.string().max(0),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export async function sendContactEmail(values: ContactFormValues) {
  try {
    if (values.honeypot !== "") {
      return { success: true };
    }

    const validated = contactSchema.parse(values);

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev",
      to: process.env.CONTACT_TO_EMAIL || "admin@example.com",
      replyTo: validated.email,
      subject: `Contact Form: ${validated.subject}`,
      text: `Name: ${validated.name}\nEmail: ${validated.email}\n\nMessage:\n${validated.message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Failed to send email. Please try again later." };
    }

    return { success: true };
  } catch (e) {
    if (e instanceof z.ZodError) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: e.flatten().fieldErrors,
      };
    }
    console.error("Unexpected error:", e);
    return { success: false, error: "An unexpected error occurred." };
  }
}
