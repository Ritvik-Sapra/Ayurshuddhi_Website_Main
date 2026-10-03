import type { About } from "@/frontend/content/about";
import { TestimonialCard } from "@/frontend/components/cards/TestimonialCard";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";

/** Figma: Testimonials. Cards over a full-bleed photo: stacked on mobile, staggered diagonally on desktop. */
export function AboutTestimonials({ testimonials }: { testimonials: About["testimonials"] }) {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-placeholder lg:mx-3.5 lg:mt-[120px] lg:h-[882px] lg:rounded-sm"
    >
      <MediaPlaceholder
        label="Blurred garden background behind the client testimonials"
        decorative
        className="absolute inset-0"
      />
      <h2 id="testimonials-heading" className="sr-only">
        What our clients say
      </h2>
      <div className="relative mx-auto flex w-[340px] max-w-full flex-col gap-16 pt-16 lg:grid lg:w-full lg:grid-cols-3 lg:gap-0 lg:px-[39px] lg:pt-[120px]">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            className={
              "lg:w-[345px] " +
              [
                "lg:justify-self-start",
                "lg:mt-[180px] lg:justify-self-center",
                "lg:mt-[360px] lg:justify-self-end",
              ][index]
            }
          />
        ))}
      </div>
    </section>
  );
}
