"use client";

import { openSans } from "@/frontend/lib/fonts";
import { StatusScreen, statusActionClass } from "@/frontend/components/layout/StatusScreen";
import "@/frontend/styles/globals.css";
import "@/frontend/styles/motion.css";

/**
 * Last-resort boundary for errors in the root layout itself (nav, menu, scroll flag). It
 * replaces the whole document, so it brings its own <html>, <body>, styles and font.
 */
export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en" className={openSans.variable}>
      <body>
        <title>Something went wrong | AyurshuddhiWellness</title>
        <StatusScreen
          title="Something Went Wrong"
          // TODO(copy): confirm final wording
          message="The site hit a problem while loading. Please try again."
        >
          <button type="button" className={statusActionClass} onClick={() => retry()}>
            Try Again
          </button>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- deliberate full reload */}
          <a href="/" className={statusActionClass}>
            Back to Home
          </a>
        </StatusScreen>
      </body>
    </html>
  );
}
