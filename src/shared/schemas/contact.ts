import { z } from "zod";
import { CONTACT_SUBJECTS } from "@/shared/constants";
import { phonePattern } from "@/shared/schemas/booking";

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.email("Please enter a valid email address").max(200),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || phonePattern.test(value),
      "Please enter a valid phone number",
    )
    .optional(),
  subject: z.enum(CONTACT_SUBJECTS, "Please choose a subject"),
  message: z.string().trim().min(10, "Please write at least 10 characters").max(2000),
  /** Honeypot. Real visitors never see or fill this field. */
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
