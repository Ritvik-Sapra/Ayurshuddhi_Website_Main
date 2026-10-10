export const site = {
  name: "AyurshuddhiWellness",
  shortName: "Ayurshuddhi",
  tagline: "Rooted in ancient wisdom. Refined for modern living.",
  description:
    "Classical Ayurveda and naturopathy in Greater Noida: personalised herbal care, Panchakarma detox, pulse diagnosis and daily-rhythm guidance.",
  // TODO(domain): set NEXT_PUBLIC_SITE_URL to the production domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  phone: "+91 8510049114",
  phoneHref: "tel:+918510049114",
  email: "ayurshuddhiwellness@gmail.com",
  address: {
    line: "A-228 Sector 36, Greater Noida, UP 201310",
    street: "A-228 Sector 36",
    locality: "Greater Noida",
    region: "Uttar Pradesh",
    postalCode: "201310",
    country: "IN",
  },
  hours: [
    { label: "Mon–Sat", value: "9:00 AM – 7:00 PM" },
    { label: "Sun", value: "10:00 AM – 2:00 PM" },
  ],
} as const;
