import { cn } from "@/frontend/lib/cn";
import type { Testimonial } from "@/frontend/content/about";

/** Figma: Card/Testimonial. A green card with a star rating, the client's name and their quote. */
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
        "flex flex-col items-center gap-4 rounded-sm bg-green p-6 text-center text-cream",
        className,
      )}
    >
      <p className="whitespace-pre text-body-l text-accent-soft">
        <span className="sr-only">{testimonial.rating} out of 5 stars</span>
        <span aria-hidden="true">{`${"★".repeat(testimonial.rating)}  (${testimonial.rating})`}</span>
      </p>
      <figcaption className="text-h6">{testimonial.name}</figcaption>
      <blockquote className="text-body">{testimonial.quote}</blockquote>
    </figure>
  );
}
