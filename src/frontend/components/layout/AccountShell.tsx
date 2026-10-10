import type { ReactNode } from "react";
import { MenuBotanicals } from "@/frontend/components/ui/MenuBotanicals";
import { cn } from "@/frontend/lib/cn";

type AccountShellProps = {
  /** Classes for the content area (alignment, max width, extra padding). */
  className?: string;
  children: ReactNode;
};

/**
 * Backdrop for the account pages: the same dark green and line-art botanicals as the open menu,
 * with the page's cards over it. Content is centred vertically.
 */
export function AccountShell({ className, children }: AccountShellProps) {
  return (
    <section className="relative isolate flex min-h-svh flex-col bg-green-dark pt-(--nav-height)">
      <MenuBotanicals />
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
