import type { ReactNode } from "react";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";
import { cn } from "@/frontend/lib/cn";

type AccountShellProps = {
  /** Description of the intended background photo. */
  imageLabel: string;
  imageSrc?: string;
  /** Classes for the content area (alignment, max width, extra padding). */
  className?: string;
  children: ReactNode;
};

/**
 * Backdrop for the account pages (Figma: User Portal frames): the green nav band, then the
 * background image slot with the page's cards over it. Content is centred vertically.
 */
export function AccountShell({ imageLabel, imageSrc, className, children }: AccountShellProps) {
  return (
    <section className="relative isolate flex min-h-svh flex-col bg-green pt-(--nav-height)">
      <MediaPlaceholder
        label={imageLabel}
        src={imageSrc}
        decorative
        className="absolute inset-x-0 bottom-0 top-(--nav-height) -z-10"
      />
      <div
        className={cn(
          "relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-5 py-12 lg:px-8 lg:py-[120px]",
          className,
        )}
      >
        {children}
      </div>
    </section>
  );
}
