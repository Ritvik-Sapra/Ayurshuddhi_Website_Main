import type { ReactNode } from "react";

/** Pill styling for the actions on a status screen (links and buttons alike). */
export const statusActionClass =
  "card-lift inline-flex min-h-14 items-center rounded-full border border-cream/30 bg-green-dark/50 px-7 text-h6 text-cream transition-colors duration-150 hover:border-cream/50 hover:bg-green-dark/65 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

type StatusScreenProps = {
  title: string;
  message: ReactNode;
  /** Action links or buttons, laid out in a row under the message. */
  children?: ReactNode;
};

/**
 * Full-screen green message in the 404 screen's design language. Used for the maintenance page
 * and the error boundaries.
 */
export function StatusScreen({ title, message, children }: StatusScreenProps) {
  return (
    <main
      id="main"
      className="flex min-h-svh flex-col items-center justify-center bg-green px-[var(--gutter)] py-20 text-center text-cream"
    >
      <h1 className="text-h1">{title}</h1>
      <p className="mt-4 max-w-md text-body-l text-accent-soft">{message}</p>
      {children ? (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">{children}</div>
      ) : null}
    </main>
  );
}
