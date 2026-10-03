import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/frontend/lib/cn";
import { ArrowTile } from "@/frontend/components/ui/icons";

type GlassCtaProps = ComponentProps<typeof Link> & { href: string };

/** Frosted-glass pill call to action for use over photo or video backgrounds. */
export function GlassCta({ className, children, ...rest }: GlassCtaProps) {
  return (
    <Link
      className={cn(
        "card-lift group/cta relative inline-flex min-h-14 items-center justify-between gap-6 rounded-full",
        "border border-cream/30 bg-green-dark/50 py-2 pl-7 pr-2 text-h6 text-cream",
        "shadow-lg backdrop-blur-xl backdrop-saturate-150",
        "transition-colors duration-150 ease-out hover:bg-green-dark/65 hover:border-cream/50",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      <ArrowTile className="card-arrow size-10 rounded-full" />
    </Link>
  );
}
