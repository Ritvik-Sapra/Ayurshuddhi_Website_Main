import "server-only";
import { z } from "zod";

/**
 * The only file that reads process.env. Every key is optional today so the site runs
 * without any setup; the services below fall back to logging until keys are added.
 */
const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1).optional(),
  CONTACT_TO_EMAIL: z.email().optional(),
  CONTACT_FROM_EMAIL: z.string().min(3).optional(),
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
  SUPABASE_URL: z.url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
});

export const env = envSchema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
  CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL || undefined,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL || undefined,
  TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY || undefined,
  SUPABASE_URL: process.env.SUPABASE_URL || undefined,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || undefined,
});
