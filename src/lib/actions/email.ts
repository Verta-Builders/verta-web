"use server";

import { z } from "zod";

import nodemailer from "nodemailer";

// Define validation messages for each locale
const validationMessages = {
  en: {
    nameMin: "Name must be at least 2 characters",
    emailInvalid: "Invalid email address",
    messageMin: "Message must be at least 10 characters",
    sendFailed: "Failed to send message. Please try again later.",
  },
  el: {
    nameMin: "Το όνομα πρέπει να έχει τουλάχιστον 2 χαρακτήρες",
    emailInvalid: "Μη έγκυρη διεύθυνση email",
    messageMin: "Το μήνυμα πρέπει να έχει τουλάχιστον 10 χαρακτήρες",
    sendFailed: "Αποτυχία αποστολής μηνύματος. Παρακαλώ δοκιμάστε ξανά αργότερα.",
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

// Create a reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465", // Use SSL/TLS for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

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

    // Send the email
    await transporter.sendMail({
      from: `"${validatedData.name}" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_EMAIL,
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

    console.log("Contact email sent successfully for:", validatedData.email);

    return { success: true };
  } catch (error) {
    console.error("Error sending contact email:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: messages.sendFailed };
  }
}
