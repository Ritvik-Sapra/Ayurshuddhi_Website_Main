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
        // Hover lift + glow: Tailwind's `hover:` only matches real pointers, so touch screens never stick.
        "flex flex-col items-center gap-4 rounded-sm bg-green p-6 text-center text-cream transition-[translate,box-shadow] duration-300 ease-out-expo hover:-translate-y-1.5 hover:shadow-lift motion-reduce:transition-none motion-reduce:hover:translate-y-0",
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
