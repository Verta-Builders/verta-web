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

export async function sendStrategyEmail(
  strategyData: {
    sections: {
      title: string;
      questions: { label: string; answer: string }[];
    }[];
  }
) {
  try {
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; background-color: #ffffff; color: #1a1a1a;">
        <header style="border-bottom: 2px solid #f0f0f0; margin-bottom: 40px; padding-bottom: 20px;">
          <h1 style="font-size: 24px; margin: 0; color: #000;">Strategy Questionnaire Submission</h1>
          <p style="color: #666; font-size: 14px; margin: 10px 0 0 0;">New project strategy framework details received.</p>
        </header>

        ${strategyData.sections.map(section => `
          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 18px; color: #000; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 20px; background-color: #f9f9f9; padding: 10px 15px; border-left: 4px solid #000;">
              ${section.title}
            </h2>
            <div style="padding-left: 15px;">
              ${section.questions.map(q => `
                <div style="margin-bottom: 25px;">
                  <h3 style="font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px;">
                    ${q.label}
                  </h3>
                  <div style="font-size: 16px; color: #333; line-height: 1.6; background-color: #fff; border: 1px solid #f0f0f0; padding: 15px; border-radius: 8px;">
                    ${q.answer || '<i style="color: #ccc;">No answer provided</i>'}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <footer style="margin-top: 60px; padding-top: 20px; border-top: 1px solid #f0f0f0; font-size: 12px; color: #999; text-align: center;">
          <p>This is an automated message from the VERTA Strategy Framework module.</p>
        </footer>
      </div>
    `;

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "noreply@verta.builders",
      to: process.env.CONTACT_EMAIL || "info@verta.builders",
      subject: `Strategy Questionnaire: ${new Date().toLocaleDateString('el-GR')}`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error (Strategy):", error);
      return { success: false, error: "Failed to send strategy details." };
    }

    console.log("Strategy email sent successfully via Resend. ID:", data?.id);
    return { success: true };
  } catch (error) {
    console.error("Error sending strategy email:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}
