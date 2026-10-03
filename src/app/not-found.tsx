import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

/** Figma: 404. The whole screen is one link home, so a tap or click anywhere works without JavaScript. */
export default function NotFound() {
  return (
    <main id="main" className="bg-green text-cream">
      <Link
        href="/"
        className="flex min-h-svh flex-col items-center justify-center px-[var(--gutter)] pb-[42px] text-center focus-visible:outline-offset-[-8px]"
      >
        <h1 className="flex flex-col items-center">
          <span
            aria-hidden="true"
            className="text-[min(255px,53vw)] font-normal leading-[0.98] tracking-[-0.02em]"
          >
            404
          </span>
          <span className="sr-only">Error 404. </span>
          <span className="mt-2 text-h5 font-normal lg:text-h4">Oops! The Page Doesn’t Exist</span>
        </h1>
        <span className="mt-4 text-body text-accent-soft">
          <span className="[@media(hover:none)]:hidden">Click anywhere to go home</span>
          <span className="hidden [@media(hover:none)]:inline">Tap anywhere to go home</span>
        </span>
      </Link>
    </main>
  );
}
