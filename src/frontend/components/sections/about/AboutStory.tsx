import type { About } from "@/frontend/content/about";
import { Reveal } from "@/frontend/components/ui/Reveal";
import { FadeInImage } from "@/frontend/components/ui/FadeInImage";
import { glassCardClass } from "@/frontend/components/ui/GlassCard";
import { cn } from "@/frontend/lib/cn";

/** Splits "A. B." into its sentences so the headline can sit on two lines. */
function sentences(text: string) {
  return text.split(/(?<=\.)\s+/);
}

/**
 * Figma: Story. A full-bleed garden photo with one glass card on the left holding the intro and
 * the three principles. On mobile the photo sits above the card, which is full width below it.
 */
export function AboutStory({ story }: { story: About["story"] }) {
  return (
    <section
      aria-labelledby="story-heading"
      className="section-reveal relative isolate flex flex-col justify-end overflow-hidden bg-green-dark px-(--nav-inset) pb-(--nav-inset) pt-80 text-cream mt-2 md:justify-center md:pb-32 md:pt-32 lg:min-h-[70vh]"
    >
      <div className="media-slot absolute inset-x-0 top-0 -z-10 h-[36rem] md:inset-0 md:h-auto">
        <FadeInImage
          src={story.imageSrc}
          alt=""
          fill
          sizes="100vw"
          quality={75}
          className="object-cover object-[70%_center]"
        />
      </div>
      <Reveal
        className={cn(
          glassCardClass,
          "flex w-full flex-col gap-8 p-6 md:w-3/5 md:max-w-140 md:p-8 lg:w-[44%] lg:p-10",
        )}
      >
        <div className="flex flex-col gap-4">
          <p className="text-small text-accent-soft">{story.eyebrow}</p>
          <h2 id="story-heading" className="text-h5 lg:text-h4">
            {sentences(story.headline).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="text-body">{story.intro}</p>
        </div>
        <ol className="flex flex-col xl:flex-row">
          {story.blocks.map((block, index) => (
            <li
              key={block.title}
              className="flex gap-4 border-t border-cream/15 py-5 last:pb-0 xl:flex-1 xl:flex-col xl:gap-3 xl:border-l xl:border-t-0 xl:px-4 xl:py-0 xl:first:border-l-0 xl:first:pl-0 xl:last:pr-0"
            >
              <span
                aria-hidden="true"
                className="w-16 shrink-0 text-numeral font-light text-cream/30 xl:w-auto"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-card">{block.title}</h3>
                <p className="text-small text-cream/80">{block.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
