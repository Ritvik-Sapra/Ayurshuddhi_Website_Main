import { z } from "zod";
import { phonePattern } from "@/shared/schemas/booking";

export const signUpSchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name").max(100),
    /** Optional: an empty string is fine. */
    phone: z
      .string()
      .trim()
      .refine(
        (value) => value === "" || phonePattern.test(value),
        "Please enter a valid phone number",
      ),
    email: z.email("Please enter a valid email address").max(200),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be 128 characters or fewer"),
    confirmPassword: z.string().min(1, "Please re-enter your password"),
    terms: z.boolean().refine((accepted) => accepted, {
      message: "Please accept the Terms of Service and Privacy Policy",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignUpInput = z.infer<typeof signUpSchema>;
