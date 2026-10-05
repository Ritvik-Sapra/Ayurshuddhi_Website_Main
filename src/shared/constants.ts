/** Services that have a booking option. Add a slug here when a service page is added. */
export const SERVICE_SLUGS = [
  "ayurveda",
  "naturopathy",
  "panchakarma",
  "pulse-diagnosis",
  "tongue-diagnosis",
  "rakht-mokshan-leech-therapy",
  "agni-karma",
  "yoga-pranayama-meditation",
  "depression-stress-management",
] as const;
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
  naturopathy: "Naturopathy",
  panchakarma: "Panchakarma",
  "pulse-diagnosis": "Pulse Diagnosis (Nadi Pariksha)",
  "tongue-diagnosis": "Tongue Diagnosis",
  "rakht-mokshan-leech-therapy": "Rakht Mokshan and Leech Therapy",
  "agni-karma": "Agni Karma",
  "yoga-pranayama-meditation": "Yoga, Pranayama, and Meditation",
  "depression-stress-management": "Depression and Stress Management",
};

export function isServiceSlug(value: string): value is ServiceSlug {
  return (SERVICE_SLUGS as readonly string[]).includes(value);
}
