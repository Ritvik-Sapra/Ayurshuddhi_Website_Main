import "server-only";
import { bookingSchema } from "@/shared/schemas/booking";
import { SERVICE_LABELS } from "@/shared/constants";
import { sendEmail } from "@/backend/services/email";
import { saveLead } from "@/backend/services/leads";
import { clientIp, isRateLimited, verifyTurnstile } from "@/backend/services/spam";
import { json } from "@/backend/handlers/http";

/** POST /api/book: validates a consultation booking request. */
export async function handleBooking(request: Request): Promise<Response> {
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

  const parsed = bookingSchema.safeParse(payload);
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

  const { website, ...booking } = parsed.data;
  void website;
  try {
    await saveLead({ kind: "booking", receivedAt: new Date().toISOString(), data: booking });
    await sendEmail({
      subject: `New booking request: ${SERVICE_LABELS[booking.service]}`,
      replyTo: booking.email,
      text: [
        `Name: ${booking.fullName}`,
        `Email: ${booking.email}`,
        `Phone: ${booking.phone}`,
        `Service: ${SERVICE_LABELS[booking.service]}`,
        `Preferred date: ${booking.preferredDate}`,
      ].join("\n"),
    });
  } catch {
    return json({ ok: false, message: "Something went wrong on our side. Please try again." }, 500);
  }

  return json({ ok: true });
}
