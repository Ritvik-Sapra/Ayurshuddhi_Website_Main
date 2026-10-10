type StatusPillProps = {
  /** Visible status text, e.g. "Confirmed". */
  label: string;
};

/**
 * Figma: Status pill. Cream text on a tinted accent fill (the Figma accent-soft text on accent
 * fill is well under 4.5:1; cream on this tint is about 5:1 over the card).
 */
export function StatusPill({ label }: StatusPillProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent/15 px-2.5 py-1 text-xs/4 text-cream ring-1 ring-inset ring-accent/40">
      <span className="sr-only">Status: </span>
      {label}
    </span>
  );
}
