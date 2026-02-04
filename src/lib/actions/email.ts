"use server";

import { z } from "zod";

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

    // SIMULATION: In a real production app, you would use a service like Resend here:
    /*
    const { data, error } = await resend.emails.send({
      from: 'VERTA <info@verta.builders>',
      to: ['info@verta.builders'],
      subject: `New Project Inquiry from ${validatedData.name}`,
      html: `<p>Name: ${validatedData.name}</p>...`,
    });
    */

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Contact form submission received:", validatedData);

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: messages.sendFailed };
  }
}
