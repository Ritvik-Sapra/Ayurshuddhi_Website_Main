import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/frontend/lib/cn";

type CheckboxFieldProps = Omit<ComponentProps<"input">, "type" | "children"> & {
  id: string;
  error?: string;
  /** Label content; may contain links. */
  children: ReactNode;
};

/**
 * Figma: Terms consent. A native checkbox (so keyboard, form and screen-reader behaviour come for
 * free) drawn as an 18px cream outline that fills in when checked. The whole row is the 44px target.
 */
export function CheckboxField({ id, error, className, children, ...inputProps }: CheckboxFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="flex min-h-11 cursor-pointer items-center gap-3 text-small text-cream">
        <span className="relative flex size-4.5 shrink-0">
          <input
            id={id}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className="peer size-full cursor-pointer appearance-none rounded-sm border border-cream bg-transparent transition-colors duration-150 checked:bg-cream aria-[invalid=true]:border-accent"
            {...inputProps}
          />
          <svg
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-150 peer-checked:opacity-100"
          >
            <path
              d="M5 9.3L7.7 12L13 6.3"
              className="stroke-green-dark"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="min-w-0 flex-1">{children}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-small text-accent-soft">
          {error}
        </p>
      ) : null}
    </div>
  );
}
