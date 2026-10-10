"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CheckboxField } from "@/frontend/components/forms/CheckboxField";
import { Button } from "@/frontend/components/ui/Button";
import { FormField, controlClass } from "@/frontend/components/ui/FormField";
import type { SignUpPageContent } from "@/frontend/content/signup";
import { cn } from "@/frontend/lib/cn";
import { signUpSchema, type SignUpInput } from "@/shared/schemas/signup";

type SignUpFormProps = {
  content: SignUpPageContent["form"];
  className?: string;
};

const termsLinkClass = "underline underline-offset-2";

/** Sign up form (Figma: Sign Up > Create account). UI only: validates on the client, then moves on to the profile. */
export function SignUpForm({ content, className }: SignUpFormProps) {
  const router = useRouter();
  const { fields, terms, submit } = content;
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = handleSubmit(() => {
    // TODO(backend): create the account here (Server Action or route handler) and start a session.
    // Mock sign-up for now: nothing is sent or stored.
    router.push("/profile");
  });

  return (
    <form noValidate onSubmit={onSubmit} className={cn("flex flex-col gap-6", className)}>
      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label={fields.fullName.label}
          htmlFor="signup-name"
          error={errors.fullName?.message}
        >
          <input
            id="signup-name"
            type="text"
            autoComplete="name"
            placeholder={fields.fullName.placeholder}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? "signup-name-error" : undefined}
            className={controlClass}
            {...register("fullName")}
          />
        </FormField>

        <FormField
          label={fields.phone.label}
          htmlFor="signup-phone"
          optional
          error={errors.phone?.message}
        >
          <input
            id="signup-phone"
            type="tel"
            autoComplete="tel"
            placeholder={fields.phone.placeholder}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "signup-phone-error" : undefined}
            className={controlClass}
            {...register("phone")}
          />
        </FormField>
      </div>

      <FormField label={fields.email.label} htmlFor="signup-email" error={errors.email?.message}>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder={fields.email.placeholder}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "signup-email-error" : undefined}
          className={controlClass}
          {...register("email")}
        />
      </FormField>

      <div className="grid gap-6 md:grid-cols-2">
        <FormField
          label={fields.password.label}
          htmlFor="signup-password"
          error={errors.password?.message}
        >
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            placeholder={fields.password.placeholder}
            aria-invalid={errors.password ? true : undefined}
            aria-describedby={errors.password ? "signup-password-error" : undefined}
            className={controlClass}
            {...register("password", {
              // Once the form has been submitted, keep the "must match" error in step with this field.
              onChange: () => {
                if (isSubmitted) void trigger("confirmPassword");
              },
            })}
          />
        </FormField>

        <FormField
          label={fields.confirmPassword.label}
          htmlFor="signup-confirm-password"
          error={errors.confirmPassword?.message}
        >
          <input
            id="signup-confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder={fields.confirmPassword.placeholder}
            aria-invalid={errors.confirmPassword ? true : undefined}
            aria-describedby={errors.confirmPassword ? "signup-confirm-password-error" : undefined}
            className={controlClass}
            {...register("confirmPassword")}
          />
        </FormField>
      </div>

      <CheckboxField id="signup-terms" error={errors.terms?.message} {...register("terms")}>
        {terms.before}
        <Link
          href={terms.termsHref}
          target="_blank"
          rel="noopener noreferrer"
          className={termsLinkClass}
        >
          {terms.termsLabel}
          <span className="sr-only"> (opens in a new tab)</span>
        </Link>
        {terms.between}
        <Link
          href={terms.privacyHref}
          target="_blank"
          rel="noopener noreferrer"
          className={termsLinkClass}
        >
          {terms.privacyLabel}
          <span className="sr-only"> (opens in a new tab)</span>
        </Link>
        {terms.after}
      </CheckboxField>

      <Button
        type="submit"
        disabled={isSubmitting || isSubmitSuccessful}
        aria-busy={isSubmitting}
        className="w-fit"
      >
        {submit}
      </Button>
    </form>
  );
}
