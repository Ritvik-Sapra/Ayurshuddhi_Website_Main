import type { ReactNode } from "react";

type BookingRowProps = {
  title: string;
  /** Detail line under the title, e.g. date, time and place. */
  meta: string;
  /** Status pill and links. Stacks under the details on mobile, sits to the right on desktop. */
  actions: ReactNode;
};

/** Figma: Booking row. A lighter strip inside a profile card (an item of a `<ul>`). */
export function BookingRow({ title, meta, actions }: BookingRowProps) {
  return (
    <li className="flex flex-col items-start gap-3 rounded-sm bg-glass-strong px-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-6">
      <div className="flex min-w-0 flex-col gap-1.5">
        <h3 className="text-body-l text-cream lg:text-card">{title}</h3>
        <p className="text-small text-cream">{meta}</p>
      </div>
      <div className="flex shrink-0 items-center gap-4">{actions}</div>
    </li>
  );
}
