import type { ComponentProps } from "react";
import { cn } from "@/frontend/lib/cn";

/**
 * Figma: underlined 14px text action (Reschedule, View notes, Log out). The pseudo-element
 * stretches the hit area to 44px tall without changing the layout.
 */
export const inlineActionClass =
  "relative inline-flex items-center text-small text-cream underline transition-colors duration-150 ease-out hover:text-accent-soft " +
  "after:absolute after:-inset-y-3 after:inset-x-0 after:content-['']";

/** An inline action that is a real button (the action has no destination yet). */
export function InlineActionButton({ className, ...props }: ComponentProps<"button">) {
  return <button type="button" className={cn(inlineActionClass, className)} {...props} />;
}
