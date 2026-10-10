import { Open_Sans, Playfair_Display } from "next/font/google";

/** Open Sans is the only typeface (Figma text styles). Two weights keep the payload small. */
export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-open-sans",
});

/** Playfair Display is used only for the home intro wordmark (HomeIntro.tsx), never site-wide. */
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});
