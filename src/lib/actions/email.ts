"use server";

import { z } from "zod";
import { Resend } from "resend";

// Define validation messages for each locale
const validationMessages = {
  en: {
    nameMin: "Name must be at least 2 characters",
    emailInvalid: "Invalid email address",
    messageMin: "Message must be at least 10 characters",
    sendFailed: "Failed to send message. Please try again later.",
    missingKey: "Email service is not configured correctly."
  },
  el: {
    nameMin: "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες",
    emailInvalid: "Μη έγκυρη διεύθυνση email",
    messageMin: "Το μήνυμα πρέπει να έχει τουλάχιστον 10 χαρακτήρες",
    sendFailed: "Αποτυχία αποστολής μηνύματος. Παρακαλώ δοκιμάστε ξανά αργότερα.",
    missingKey: "Η υπηρεσία email δεν έχει ρυθμιστεί σωστά."
  },
};

type Locale = keyof typeof validationMessages;

const getContactSchema = (locale: Locale) => {
  const messages = validationMessages[locale] || validationMessages.en;

  return z.object({
    name: z.string().min(2, messages.nameMin),
    email: z.string().email(messages.emailInvalid),
    company: z.string().optional(),
    message: z.string().min(10, messages.messageMin),
  });
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(
  formData: { name: string; email: string; company?: string; message: string },
  locale: string = 'en'
) {
  const validLocale = (locale === 'el' ? 'el' : 'en') as Locale;
  const messages = validationMessages[validLocale];
  const contactSchema = getContactSchema(validLocale);

  try {
    // Validate the data
    const validatedData = contactSchema.parse(formData);

    // Check if API key is present
    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY environment variable");
      return { success: false, error: messages.missingKey };
    }

    // Send the email
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@verta.builders",
      to: process.env.CONTACT_EMAIL || "info@verta.builders",
      replyTo: validatedData.email,
      subject: `New Project Inquiry from ${validatedData.name}${validatedData.company ? ` (${validatedData.company})` : ''}`,
      text: `
Name: ${validatedData.name}
Email: ${validatedData.email}
Company: ${validatedData.company || 'N/A'}

Message:
${validatedData.message}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Project Inquiry</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Company:</strong> ${validatedData.company || 'N/A'}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${validatedData.message}</div>
          <p style="margin-top: 30px; font-size: 12px; color: #777;">Sent from VERTA website contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: messages.sendFailed };
    }

    console.log("Contact email sent successfully via Resend. ID:", data?.id);

    return { success: true };
  } catch (error) {
    console.error("Error sending contact email:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: messages.sendFailed };
  }
}
