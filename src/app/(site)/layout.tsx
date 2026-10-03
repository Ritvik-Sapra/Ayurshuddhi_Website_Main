import { Footer } from "@/frontend/components/layout/Footer";

/** Every page except Home and 404 shares the footer (Figma: Footer). */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
