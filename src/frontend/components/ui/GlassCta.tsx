import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/frontend/lib/cn";
import { ArrowTile } from "@/frontend/components/ui/icons";

type GlassCtaProps = ComponentProps<typeof Link> & { href: string };

/** Mostly opaque, softly frosted call to action for use over photo or video backgrounds. */
export function GlassCta({ className, children, ...rest }: GlassCtaProps) {
  return (
    <Link
      className={cn(
        "card-lift group/cta relative inline-flex min-h-16 items-center justify-between gap-8 rounded-2xl",
        "border border-cream/30 bg-green-dark/75 py-4 pl-8 pr-4 text-h6 text-cream",
        "shadow-lg backdrop-blur-md",
        "transition-colors duration-150 ease-out hover:bg-green-dark hover:border-cream/50",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent",
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      <ArrowTile tone="cream" className="card-arrow size-10 rounded-xl" />
    </Link>
  );
}
