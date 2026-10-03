"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/frontend/components/ui/Button";
import { FormField, controlClass } from "@/frontend/components/ui/FormField";
import { SelectControl } from "@/frontend/components/ui/SelectControl";
import { cn } from "@/frontend/lib/cn";
import { useFormSubmit } from "@/frontend/lib/useFormSubmit";
import { CONTACT_SUBJECTS } from "@/shared/constants";
import { contactSchema, type ContactInput } from "@/shared/schemas/contact";

/** Contact form. Same styling and submit flow as the booking form; posts to /api/contact. */
export function ContactForm({ className }: { className?: string }) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "General Inquiry",
      message: "",
      website: "",
    },
  });

  const { status, setStatus, serverError, submit } = useFormSubmit<ContactInput>(
    "/api/contact",
    setError,
  );

  if (status === "sent") {
    return (
      <div role="status" className={cn("flex flex-col gap-4 text-cream", className)}>
        <p className="text-h5">Thank you. Your message is on its way.</p>
        <p className="text-body">We&rsquo;ll get back to you as soon as we can.</p>
        <button
          type="button"
          className="link-underline w-fit text-small text-accent-soft"
          onClick={() => {
            reset();
            setStatus("idle");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(submit)}
      className={cn("flex flex-col gap-4 lg:gap-6", className)}
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <FormField label="Full Name" htmlFor="contact-name" error={errors.fullName?.message}>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? "contact-name-error" : undefined}
            className={controlClass}
            {...register("fullName")}
          />
        </FormField>

        <FormField label="Email" htmlFor="contact-email" error={errors.email?.message}>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={controlClass}
            {...register("email")}
          />
        </FormField>

        <FormField label="Phone" htmlFor="contact-phone" optional error={errors.phone?.message}>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "contact-phone-error" : undefined}
            className={controlClass}
            {...register("phone")}
          />
        </FormField>

        <FormField label="Subject" htmlFor="contact-subject" error={errors.subject?.message}>
          <SelectControl
            id="contact-subject"
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            {...register("subject")}
          >
            {CONTACT_SUBJECTS.map((subject) => (
              <option key={subject} value={subject} className="bg-ink text-cream">
                {subject}
              </option>
            ))}
          </SelectControl>
        </FormField>

        <FormField
          label="Message"
          htmlFor="contact-message"
          error={errors.message?.message}
          className="lg:col-span-2"
        >
          <textarea
            id="contact-message"
            rows={5}
            placeholder="How can we help?"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "contact-message-error" : undefined}
            className={cn(controlClass, "min-h-32 resize-y")}
            {...register("message")}
          />
        </FormField>
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      {serverError ? (
        <p role="alert" className="text-small text-accent-soft">
          {serverError}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="w-fit">
        {isSubmitting ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
