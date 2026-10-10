import type { About } from "@/frontend/content/about";
import { Reveal } from "@/frontend/components/ui/Reveal";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";

/** Figma: Story. Green panel on mobile; on desktop a full-bleed photo with the panel floating right. */
export function AboutStory({ story }: { story: About["story"] }) {
  return (
    <section
      aria-labelledby="story-heading"
      className="relative bg-green text-cream lg:mt-10 lg:h-[976px] lg:bg-transparent"
    >
      <MediaPlaceholder
        label={story.imageLabel}
        decorative
        className="absolute inset-0 hidden lg:flex"
      />
      <Reveal className="relative flex flex-col gap-6 px-5 pb-12 pt-8 lg:absolute lg:right-[9.8vw] lg:top-[200px] lg:w-[404px] lg:bg-green lg:p-6">
        <div className="flex flex-col gap-4">
          <h1 id="story-heading" className="text-h4">
            {story.headline}
          </h1>
          <p className="text-body">{story.intro}</p>
        </div>
        {story.blocks.map((block) => (
          <div key={block.title} className="flex flex-col gap-4">
            <h2 className="text-h4">{block.title}</h2>
            <p className="text-body">{block.text}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
