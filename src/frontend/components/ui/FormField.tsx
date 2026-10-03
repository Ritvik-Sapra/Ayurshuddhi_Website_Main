import type { ReactNode } from "react";
import { cn } from "@/frontend/lib/cn";

type FormFieldProps = {
  label: string;
  /** id of the control inside `children`. */
  htmlFor: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
};

/** Figma: Form/Field. Label above, glass control below. Errors are announced and tied to the control. */
export function FormField({
  label,
  htmlFor,
  error,
  optional,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-body text-cream">
        {label}
        {optional ? <span className="text-cream/85"> (optional)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} role="alert" className="text-small text-accent-soft">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Shared styling for inputs, selects and textareas inside a FormField. */
export const controlClass =
  "w-full rounded-sm bg-glass-strong px-6 py-4 text-small text-white placeholder:text-white/70 " +
  "transition-colors duration-150 hover:bg-cream/15 focus-visible:bg-cream/15 " +
  "aria-[invalid=true]:outline aria-[invalid=true]:outline-1 aria-[invalid=true]:outline-accent " +
  "[color-scheme:dark]";
