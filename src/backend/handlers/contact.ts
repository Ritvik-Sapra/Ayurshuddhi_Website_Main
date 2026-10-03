import "server-only";
import { contactSchema } from "@/shared/schemas/contact";
import { sendEmail } from "@/backend/services/email";
import { saveLead } from "@/backend/services/leads";
import { clientIp, isRateLimited, verifyTurnstile } from "@/backend/services/spam";
import { json } from "@/backend/handlers/http";

/** POST /api/contact: validates a contact message. */
export async function handleContact(request: Request): Promise<Response> {
  if (isRateLimited(clientIp(request))) {
    return json(
      { ok: false, message: "Too many requests. Please try again in a few minutes." },
      429,
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        message: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      400,
    );
  }
  if (!(await verifyTurnstile())) {
    return json({ ok: false, message: "Spam check failed. Please try again." }, 400);
  }

  const { website, ...message } = parsed.data;
  void website;
  try {
    await saveLead({ kind: "contact", receivedAt: new Date().toISOString(), data: message });
    await sendEmail({
      subject: `Website message: ${message.subject}`,
      replyTo: message.email,
      text: [
        `Name: ${message.fullName}`,
        `Email: ${message.email}`,
        `Phone: ${message.phone || "-"}`,
        `Subject: ${message.subject}`,
        "",
        message.message,
      ].join("\n"),
    });
  } catch {
    return json({ ok: false, message: "Something went wrong on our side. Please try again." }, 500);
  }

  return json({ ok: true });
}
