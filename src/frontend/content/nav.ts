export type NavLink = { label: string; href: string };

/** Full-screen menu overlay links (Figma: Nav/Menu Overlay). */
/** Pages that are not live yet point here. Switch a link back to its real route when it ships. */
const MAINTENANCE = "/maintenance";

export const menuLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Ayurveda", href: "/ayurveda" },
  { label: "Panchakarma", href: "/panchakarma" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: MAINTENANCE },
  { label: "About Us", href: "/about" },
  { label: "Sign In / Sign Up", href: MAINTENANCE },
];

/** Small text link pinned to the bottom right of the menu overlay. */
export const menuContactLink: NavLink = { label: "Contact us", href: "/contact" };

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
