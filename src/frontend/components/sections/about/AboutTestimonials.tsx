import type { About } from "@/frontend/content/about";
import { Reveal } from "@/frontend/components/ui/Reveal";
import { GinkgoLeaf } from "@/frontend/components/ui/MenuBotanicals";
import { TestimonialMarquee } from "@/frontend/components/sections/about/TestimonialMarquee";
import { playfair } from "@/frontend/lib/fonts";

/** Figma: Testimonials. A dark green band with a heading and an endless sideways loop of client quote cards. */
export function AboutTestimonials({
  testimonials,
  intro,
}: {
  testimonials: About["testimonials"];
  intro: About["testimonialsIntro"];
}) {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className={`${playfair.variable} section-reveal relative bg-green-dark py-16 text-cream lg:py-28`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <GinkgoLeaf className="absolute -right-8 -top-6 w-64 rotate-[160deg] opacity-10 lg:w-96" />
        <GinkgoLeaf className="absolute -bottom-10 -left-8 w-56 -rotate-12 opacity-10 lg:w-80" />
      </div>
      <div className="relative flex flex-col gap-12 lg:gap-14">
        <Reveal className="flex flex-col items-center gap-3 px-5 text-center">
          <p className="text-body-l text-accent-soft">{intro.eyebrow}</p>
          <h2 id="testimonials-heading" className="font-serif text-h3 lg:text-h2">
            {intro.title}
          </h2>
        </Reveal>
        <TestimonialMarquee testimonials={testimonials} />
      </div>
    </section>
  );
}
