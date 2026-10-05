export type NavLink = { label: string; href: string };

/** Full-screen menu overlay links (Figma: Nav/Menu Overlay). */
/** Pages that are not live yet point here. Switch a link back to its real route when it ships. */
const MAINTENANCE = "/maintenance";

/** The menu is laid out as three columns on desktop (stacked on mobile). */
export const menuColumns: NavLink[][] = [
  [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Blogs", href: MAINTENANCE },
  ],
  [
    { label: "Ayurveda", href: "/ayurveda" },
    { label: "Panchakarma", href: "/panchakarma" },
  ],
  [{ label: "Services", href: "/services" }],
];

/** Boxed block under the last column. Both links go to the maintenance page until accounts ship. */
export const menuPortal: { title: string; links: NavLink[] } = {
  title: "User Portal",
  links: [
    { label: "Log in", href: MAINTENANCE },
    { label: "Create account", href: MAINTENANCE },
  ],
};

/** "Contact us" link centred at the bottom of the menu overlay. */
export const menuContactLink: NavLink = { label: "Contact us", href: "/contact" };

/** Small links under "Contact us". Phone and email come from content/site.ts. */
export const menuMetaLinks: NavLink[] = [
  { label: "Contact", href: "/contact" },
  { label: "Appointments", href: "/ayurveda#book" },
];

export const footerDestinations: NavLink[] = [
  { label: "Ayurveda", href: "/ayurveda" },
  { label: "Panchakarma", href: "/panchakarma" },
  { label: "Naturopathy", href: "/services" },
  { label: "Yoga & Meditation", href: "/services" },
];

export const footerPages: NavLink[] = [
  { label: "Blogs", href: MAINTENANCE },
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];
