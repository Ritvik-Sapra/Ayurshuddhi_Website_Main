import type { Metadata, Viewport } from "next";
import { openSans } from "@/frontend/lib/fonts";
import { site } from "@/frontend/content/site";
import { jsonLdString, localBusinessJsonLd } from "@/frontend/lib/jsonld";
import { NavBar } from "@/frontend/components/layout/NavBar";
import { ScrollFlag } from "@/frontend/components/layout/ScrollFlag";
import "@/frontend/styles/globals.css";
import "@/frontend/styles/motion.css";
import "@/frontend/styles/skeleton.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: Ayurveda & Naturopathy in Greater Noida`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: `${site.name}: Ayurveda & Naturopathy in Greater Noida`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#456a4b",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={openSans.variable} data-scroll-behavior="smooth">
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <NavBar />
        <ScrollFlag />
        {children}
        <script
          type="application/ld+json"
          // Static, server-generated data: safe to inline.
          dangerouslySetInnerHTML={{ __html: jsonLdString(localBusinessJsonLd()) }}
        />
      </body>
    </html>
  );
}
