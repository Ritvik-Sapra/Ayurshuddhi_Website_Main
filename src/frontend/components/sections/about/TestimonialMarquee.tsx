import type { Testimonial } from "@/frontend/content/about";
import { TestimonialCard } from "@/frontend/components/cards/TestimonialCard";

const GROUP = "flex shrink-0 gap-6 pr-6";
const CARD = "w-80 shrink-0 md:w-86";

/**
 * Figma: Testimonials. The cards drift sideways in one endless loop (motion.css "Testimonial
 * marquee"). The first group is the real list; the other two are aria-hidden copies that make the
 * loop seamless.
 */
export function TestimonialMarquee({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <div className="marquee">
      <div className="marquee-track">
        <ul className={GROUP} aria-label="Client testimonials">
          {testimonials.map((testimonial) => (
            <li key={testimonial.name} className={CARD}>
              <TestimonialCard testimonial={testimonial} />
            </li>
          ))}
        </ul>
        {[1, 2].map((copy) => (
          <div key={copy} className={GROUP} aria-hidden="true">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className={CARD}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
