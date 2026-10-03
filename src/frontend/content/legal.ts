export type LegalSection = { title: string; text: string };

export type LegalDocument = {
  title: string;
  description: string;
  lastUpdated: { text: string; iso: string };
  sections: LegalSection[];
};

// TODO(legal): replace every placeholder below with legal copy reviewed for your jurisdiction.
const PLACEHOLDER =
  "Placeholder policy text. Replace with your own legal copy, reviewed for your jurisdiction.";

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description:
    "How AyurshuddhiWellness collects, uses and protects your personal information when you use our website or book a consultation.",
  lastUpdated: { text: "19th September, 2025", iso: "2025-09-19" },
  sections: [
    "Introduction",
    "Information We Collect",
    "How We Use Your Information",
    "Cookies and Website Tracking",
    "Data Protection and Security",
    "Third Party Services",
    "User Rights and Control",
    "Policy Updates",
  ].map((title) => ({ title, text: PLACEHOLDER })),
};

/** No Figma screen exists for the terms: same template, placeholder section titles. */
export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use the AyurshuddhiWellness website and book consultations or therapies.",
  lastUpdated: { text: "19th September, 2025", iso: "2025-09-19" },
  sections: [
    "Acceptance of Terms",
    "Our Services",
    "Bookings and Cancellations",
    "Medical Disclaimer",
    "Your Responsibilities",
    "Intellectual Property",
    "Limitation of Liability",
    "Changes to These Terms",
  ].map((title) => ({ title, text: PLACEHOLDER })),
};
