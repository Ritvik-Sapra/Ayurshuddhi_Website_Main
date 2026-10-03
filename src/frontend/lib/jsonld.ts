import { site } from "@/frontend/content/site";

/** schema.org MedicalBusiness for the clinic. TODO(seo): add geo coordinates, logo URL and social profiles. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
  };
}

/** Serialises JSON-LD safely for inlining in a <script> tag. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
