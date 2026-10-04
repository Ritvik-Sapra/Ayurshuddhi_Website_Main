import type { Metadata } from "next";
import Link from "next/link";
import { StatusScreen, statusActionClass } from "@/frontend/components/layout/StatusScreen";

export const metadata: Metadata = {
  title: "Under Maintenance",
  robots: { index: false, follow: true },
  alternates: { canonical: "/maintenance" },
};

/** Shared placeholder for any page that is not live yet; same design language as the 404 screen. */
export default function MaintenancePage() {
  return (
    <StatusScreen
      title="Under Maintenance"
      // TODO(copy): confirm final wording
      message="This part of the site isn’t ready yet. Please check back soon."
    >
      <Link href="/" className={statusActionClass}>
        Back to Home
      </Link>
    </StatusScreen>
  );
}
