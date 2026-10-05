import { Footer } from "@/frontend/components/layout/Footer";
import { CardTransitionProvider } from "@/frontend/components/layout/CardTransition";

/**
 * Every page except Home and 404 shares the footer (Figma: Footer). The card transition overlay
 * lives here so it survives the route change from /services to a service page.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <CardTransitionProvider>
      <main id="main">{children}</main>
      <Footer />
    </CardTransitionProvider>
  );
}
