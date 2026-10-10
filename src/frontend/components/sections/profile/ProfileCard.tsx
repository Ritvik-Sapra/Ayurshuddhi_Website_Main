import type { ReactNode } from "react";
import { GlassCard } from "@/frontend/components/ui/GlassCard";
import { cn } from "@/frontend/lib/cn";

type ProfileCardProps = {
  /** Id for the heading; the card is labelled by it. */
  id: string;
  heading: string;
  className?: string;
  children: ReactNode;
};

/** A glass card (Figma: 24px side padding on mobile, 32px on desktop) with a section heading. */
export function ProfileCard({ id, heading, className, children }: ProfileCardProps) {
  return (
    <GlassCard
      as="section"
      aria-labelledby={id}
      className={cn("flex flex-col gap-6 px-6 py-10 text-cream lg:px-8", className)}
    >
      <h2 id={id} className="text-h4 leading-11 lg:text-h2 lg:leading-14">
        {heading}
      </h2>
      {children}
    </GlassCard>
  );
}
