import { z } from "zod";
import { SERVICE_SLUGS } from "@/shared/constants";

/** Phone: optional leading +, then 8 to 17 digits, spaces or dashes. */
export const phonePattern = /^\+?[0-9][0-9\s-]{7,17}$/;

export const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.email("Please enter a valid email address").max(200),
  phone: z.string().trim().regex(phonePattern, "Please enter a valid phone number"),
  service: z.enum(SERVICE_SLUGS, "Please choose a service"),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a preferred date")
    .refine((value) => value >= new Date(Date.now() - 864e5).toISOString().slice(0, 10), {
      message: "Please choose today or a future date",
    }),
  /** Honeypot. Real visitors never see or fill this field. */
  website: z.string().max(0).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
