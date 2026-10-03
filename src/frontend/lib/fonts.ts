import { Open_Sans } from "next/font/google";

/** Open Sans is the only typeface (Figma text styles). Two weights keep the payload small. */
export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-open-sans",
});
