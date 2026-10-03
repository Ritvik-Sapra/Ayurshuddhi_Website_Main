export type NavLink = { label: string; href: string };

/** Full-screen menu overlay links (Figma: Nav/Menu Overlay). */
export const menuLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Ayurveda", href: "/ayurveda" },
  { label: "Panchakarma", href: "/panchakarma" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about" },
];

export const footerDestinations: NavLink[] = [
  { label: "Ayurveda", href: "/ayurveda" },
  { label: "Panchakarma", href: "/panchakarma" },
  { label: "Naturopathy", href: "/services" },
  { label: "Yoga & Meditation", href: "/services" },
];

export const footerPages: NavLink[] = [
  { label: "Blogs", href: "/blogs" },
  { label: "About Us", href: "/about" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms" },
];
