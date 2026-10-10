import type { ComponentProps, ElementType } from "react";
import { cn } from "@/frontend/lib/cn";

/** The glass card (tokens in globals.css) with its standard padding. Use on elements that can't take <GlassCard>, e.g. a Reveal. */
export const glassCardClass = "glass-card px-4 py-6 lg:px-8 lg:py-10";

type GlassCardProps<T extends ElementType> = { as?: T } & Omit<ComponentProps<T>, "as">;

/** The one card style for contact, booking and account panels. Override padding or layout through `className`. */
export function GlassCard<T extends ElementType = "div">({
  as,
  className,
  ...props
}: GlassCardProps<T>) {
  const Tag: ElementType = as ?? "div";
  return <Tag className={cn(glassCardClass, className)} {...props} />;
}
