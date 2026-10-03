/** Services that have a booking option. Add a slug here when a service page is added. */
export const SERVICE_SLUGS = ["ayurveda", "panchakarma"] as const;
export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const CONTACT_SUBJECTS = [
  "General Inquiry",
  "Book a Consultation",
  "Therapy Question",
  "Feedback",
  "Other",
] as const;
export type ContactSubject = (typeof CONTACT_SUBJECTS)[number];

/** Human-readable service names used in the booking form dropdown. */
export const SERVICE_LABELS: Record<ServiceSlug, string> = {
  ayurveda: "Ayurveda",
  panchakarma: "Panchakarma",
};

export function isServiceSlug(value: string): value is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(value);
}
