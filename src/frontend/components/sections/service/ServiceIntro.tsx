import { BackgroundVideo } from "@/frontend/components/ui/BackgroundVideo";
import { Reveal } from "@/frontend/components/ui/Reveal";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";

type ServiceIntroProps = {
  title: string;
  intro: [string, string];
  videoSrc?: string;
  videoLabel: string;
};

/** Figma: Intro. Cream section with the page's h1, two centred paragraphs and a video strip. */
export function ServiceIntro({ title, intro, videoSrc, videoLabel }: ServiceIntroProps) {
  return (
    <section className="flex flex-col items-center gap-8 bg-cream px-5 pb-16 pt-32 text-center text-green lg:gap-16 lg:pb-20 lg:pt-40">
      <h1 className="text-h1">{title}</h1>
      <Reveal className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        {intro.map((paragraph) => (
          <p key={paragraph} className="max-w-[300px] text-body lg:w-[345px] lg:max-w-none">
            {paragraph}
          </p>
        ))}
      </Reveal>
      <MediaPlaceholder
        label={videoLabel}
        decorative
        className="h-[135px] w-full max-w-[350px] lg:h-[147px] lg:max-w-none"
      >
        <BackgroundVideo sources={videoSrc ? [videoSrc] : undefined} />
      </MediaPlaceholder>
    </section>
  );
}
