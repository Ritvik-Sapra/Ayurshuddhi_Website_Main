import type { ComponentProps } from "react";
import { cn } from "@/frontend/lib/cn";
import { controlClass } from "@/frontend/components/ui/FormField";

/** A native <select> styled like the other glass controls, with a chevron. Use inside a FormField. */
export function SelectControl({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(controlClass, "appearance-none pr-12", className)} {...props}>
        {children}
      </select>
      <svg
        viewBox="0 0 16 16"
        width={16}
        height={16}
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2"
      >
        <path
          d="M3 6l5 5 5-5"
          className="stroke-cream"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
