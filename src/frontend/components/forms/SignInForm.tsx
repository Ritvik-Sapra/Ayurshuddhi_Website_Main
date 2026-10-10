"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/frontend/components/ui/Button";
import { FormField, controlClass } from "@/frontend/components/ui/FormField";
import type { SignInFormCopy } from "@/frontend/content/signin";
import { signInSchema, type SignInInput } from "@/shared/schemas/signin";

/** Sign-in form (Figma: Sign In frames). UI only: validates in the browser, then mock-signs in to /profile. */
export function SignInForm({ copy }: { copy: SignInFormCopy }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(() => {
    // TODO(backend): authenticate here (send the credentials to a Route Handler / Server Action,
    // start the session) and show failures with setError("root", ...). Until then any valid input signs in.
    router.push("/profile");
  });

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-6">
      <FormField label={copy.emailLabel} htmlFor="signin-email" error={errors.email?.message}>
        <input
          id="signin-email"
          type="email"
          autoComplete="email"
          placeholder={copy.emailPlaceholder}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "signin-email-error" : undefined}
          className={controlClass}
          {...register("email")}
        />
      </FormField>

      <FormField
        label={copy.passwordLabel}
        htmlFor="signin-password"
        error={errors.password?.message}
      >
        <input
          id="signin-password"
          type="password"
          autoComplete="current-password"
          placeholder={copy.passwordPlaceholder}
          aria-invalid={errors.password ? true : undefined}
          aria-describedby={errors.password ? "signin-password-error" : undefined}
          className={controlClass}
          {...register("password")}
        />
      </FormField>

      <Link
        href={copy.forgotHref}
        // The pseudo-element grows the hit area to 44px without moving the 20px Figma line.
        className="relative self-end text-small text-cream underline underline-offset-2 after:absolute after:-inset-y-3 after:inset-x-0 after:content-['']"
      >
        {copy.forgotLabel}
      </Link>

      <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="w-fit">
        {isSubmitting ? copy.submittingLabel : copy.submitLabel}
      </Button>
    </form>
  );
}
