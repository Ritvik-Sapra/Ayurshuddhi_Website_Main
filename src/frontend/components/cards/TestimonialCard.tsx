import { cn } from "@/frontend/lib/cn";
import type { Testimonial } from "@/frontend/content/about";

/** First letters of the first and last name: "Priya Sharma" becomes "PS". */
function initials(name: string) {
  const parts = name.split(" ");
  return `${parts[0][0]}${parts.length > 1 ? parts[parts.length - 1][0] : ""}`;
}

/** Figma: Card/Testimonial. A dark card with a star rating, the quote, and the client's name and treatment. */
export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col gap-6 rounded-card border border-cream/80 bg-green/30 p-6 text-cream",
        className,
      )}
    >
      <p className="text-body-l tracking-widest text-accent-soft">
        <span className="sr-only">{testimonial.rating} out of 5 stars</span>
        <span aria-hidden="true">{"★".repeat(testimonial.rating)}</span>
      </p>
      <blockquote className="flex-1 text-body">{testimonial.quote}</blockquote>
      <figcaption className="flex items-center gap-4 border-t border-cream/30 pt-6">
        <span
          aria-hidden="true"
          className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent-soft font-serif text-h6 text-green-dark"
        >
          {initials(testimonial.name)}
        </span>
        <span className="flex flex-col items-start gap-1">
          <span className="text-card font-semibold">{testimonial.name}</span>
          <span className="rounded-full bg-accent-soft px-3 py-0.5 text-eyebrow text-green-dark">
            {testimonial.tag}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
