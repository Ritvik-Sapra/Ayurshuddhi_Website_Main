import { MAINTENANCE, type NavLink } from "@/frontend/content/nav";

export type FooterGroup = { heading: string; links: NavLink[] };

/** Footer copy. Contact details for the "Visit" group come from content/site.ts. */
export const footer = {
  /** Decorative. Its bottom edge already fades into --color-footer, so it needs no overlay. */
  imageSrc:
    "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/images/footer-images/footer-hills.webp",
  groups: [
    {
      heading: "Therapies",
      links: [
        { label: "Ayurveda", href: "/ayurveda" },
        { label: "Panchakarma", href: "/panchakarma" },
        { label: "Naturopathy", href: "/naturopathy" },
        { label: "Yoga & Meditation", href: "/yoga-pranayama-meditation" },
      ],
    },
    {
      heading: "Explore",
      links: [
        { label: "Blogs", href: MAINTENANCE },
        { label: "About Us", href: "/about" },
        { label: "Book a consultation", href: "/ayurveda#book" },
      ],
    },
  ] satisfies FooterGroup[],
  contactHeading: "Visit",
  wordmarkSub: "Wellness",
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms" },
  ] satisfies NavLink[],
  copyright: (year: number) => `© ${year} Ayurshuddhi Wellness. All rights reserved.`,
};
