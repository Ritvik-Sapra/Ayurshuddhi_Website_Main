"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/frontend/components/ui/Button";
import { FormField, controlClass } from "@/frontend/components/ui/FormField";
import { SelectControl } from "@/frontend/components/ui/SelectControl";
import { cn } from "@/frontend/lib/cn";
import { useFormSubmit } from "@/frontend/lib/useFormSubmit";
import { SERVICE_LABELS, SERVICE_SLUGS, type ServiceSlug } from "@/shared/constants";
import { bookingSchema, type BookingInput } from "@/shared/schemas/booking";

type BookingFormProps = {
  /** Service preselected in the dropdown (the page's own service). */
  defaultService: ServiceSlug;
  className?: string;
};

/** Booking form (Figma: Booking > Form panel fields). Validated with the same Zod schema as the server. */
export function BookingForm({ defaultService, className }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: defaultService,
      preferredDate: "",
      website: "",
    },
  });

  const { status, setStatus, serverError, submit } = useFormSubmit<BookingInput>(
    "/api/book",
    setError,
  );

  if (status === "sent") {
    return (
      <div role="status" className={cn("flex flex-col gap-4 text-cream", className)}>
        <p className="text-h5">Thank you. Your request is in.</p>
        <p className="text-body">
          We&rsquo;ll contact you shortly to confirm a time for your consultation.
        </p>
        <button
          type="button"
          className="link-underline w-fit text-small text-accent-soft"
          onClick={() => {
            reset();
            setStatus("idle");
          }}
        >
          Send another request
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
        <FormField
          label="Full Name"
          htmlFor="booking-name"
          error={errors.fullName?.message}
          className="lg:col-span-2"
        >
          <input
            id="booking-name"
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? "booking-name-error" : undefined}
            className={controlClass}
            {...register("fullName")}
          />
        </FormField>

        <FormField label="Email" htmlFor="booking-email" error={errors.email?.message}>
          <input
            id="booking-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "booking-email-error" : undefined}
            className={controlClass}
            {...register("email")}
          />
        </FormField>

        <FormField label="Phone" htmlFor="booking-phone" error={errors.phone?.message}>
          <input
            id="booking-phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "booking-phone-error" : undefined}
            className={controlClass}
            {...register("phone")}
          />
        </FormField>

        <FormField label="Service" htmlFor="booking-service" error={errors.service?.message}>
          <SelectControl
            id="booking-service"
            aria-invalid={errors.service ? true : undefined}
            aria-describedby={errors.service ? "booking-service-error" : undefined}
            {...register("service")}
          >
            {SERVICE_SLUGS.map((slug) => (
              <option key={slug} value={slug} className="bg-ink text-cream">
                {SERVICE_LABELS[slug]}
              </option>
            ))}
          </SelectControl>
        </FormField>

        <FormField
          label="Preferred Date"
          htmlFor="booking-date"
          error={errors.preferredDate?.message}
        >
          <input
            id="booking-date"
            type="date"
            aria-invalid={errors.preferredDate ? true : undefined}
            aria-describedby={errors.preferredDate ? "booking-date-error" : undefined}
            className={controlClass}
            {...register("preferredDate")}
          />
        </FormField>
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="booking-website">Website</label>
        <input
          id="booking-website"
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
        {isSubmitting ? "Sending…" : "Book Now"}
      </Button>
    </form>
  );
}
