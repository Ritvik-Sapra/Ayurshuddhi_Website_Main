import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .max(200)
    .pipe(z.email("Please enter a valid email address")),
  /** Not trimmed or length-checked beyond "present": the server decides what a valid password is. */
  password: z.string().min(1, "Please enter your password").max(200),
});

export type SignInInput = z.infer<typeof signInSchema>;
