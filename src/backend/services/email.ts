import "server-only";

export type OutgoingEmail = {
  subject: string;
  text: string;
  replyTo?: string;
};

/**
 * TODO(email): send with Resend once RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL
 * are set in .env.local (new Resend(env.RESEND_API_KEY).emails.send({ from, to, subject, text })).
 * Until then the message is only logged on the server.
 */
export async function sendEmail(email: OutgoingEmail): Promise<void> {
  console.info("[email:stub]", email.subject);
}
