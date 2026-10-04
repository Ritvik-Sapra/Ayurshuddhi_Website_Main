"use client";

import { StatusScreen, statusActionClass } from "@/frontend/components/layout/StatusScreen";

/**
 * Error boundary for every page. The root layout (nav, menu) stays up; only the page is
 * replaced. "Back to Home" is a full page load so it also clears any broken client state.
 */
export default function PageError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <StatusScreen
      title="Something Went Wrong"
      // TODO(copy): confirm final wording
      message="This page hit a problem while loading. Please try again."
    >
      <button type="button" className={statusActionClass} onClick={() => retry()}>
        Try Again
      </button>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- deliberate full reload */}
      <a href="/" className={statusActionClass}>
        Back to Home
      </a>
    </StatusScreen>
  );
}
