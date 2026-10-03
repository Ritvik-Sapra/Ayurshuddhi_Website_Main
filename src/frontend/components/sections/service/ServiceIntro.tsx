import { BackgroundVideo } from "@/frontend/components/ui/BackgroundVideo";
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
    <section className="flex flex-col items-center gap-8 bg-cream px-5 py-16 text-center text-green lg:gap-16 lg:pb-20 lg:pt-10">
      <h1 className="text-h1">{title}</h1>
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
        {intro.map((paragraph) => (
          <p key={paragraph} className="max-w-[300px] text-body lg:w-[345px] lg:max-w-none">
            {paragraph}
          </p>
        ))}
      </div>
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
