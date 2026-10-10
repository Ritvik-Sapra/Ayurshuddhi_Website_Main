export type NavLink = { label: string; href: string };

/** Full-screen menu overlay links (Figma: Nav/Menu Overlay). */
/** Pages that are not live yet point here. Switch a link back to its real route when it ships. */
export const MAINTENANCE = "/maintenance";

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

/** Boxed block under the last column: the account pages. */
export const menuPortal: { title: string; links: NavLink[] } = {
  title: "User Portal",
  links: [
    { label: "Log in", href: "/login" },
    { label: "Create account", href: "/signup" },
  ],
};

/** "Contact us" link centred at the bottom of the menu overlay. */
export const menuContactLink: NavLink = { label: "Contact us", href: "/contact" };

/** Small links under "Contact us". Phone and email come from content/site.ts. */
export const menuMetaLinks: NavLink[] = [
  { label: "Contact", href: "/contact" },
  { label: "Appointments", href: "/ayurveda#book" },
];
