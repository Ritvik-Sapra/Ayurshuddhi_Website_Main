import type { About } from "@/frontend/content/about";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";
import { cn } from "@/frontend/lib/cn";

/** Desktop photo positions from the 1440x720 Figma frame: left as % of width, top in px. */
const scatter = [
  { left: (455 / 1440) * 100, top: 0 },
  { left: (996 / 1440) * 100, top: 52 },
  { left: (227 / 1440) * 100, top: 420 },
  { left: (719 / 1440) * 100, top: 460 },
];

/** Figma: Guides. The practitioner heading and bio between scattered portrait photos. */
export function AboutPractitioner({ practitioner }: { practitioner: About["practitioner"] }) {
  const photos = practitioner.photos;
  return (
    <section
      aria-labelledby="practitioner-heading"
      className="bg-white text-green lg:relative lg:mt-40 lg:h-[720px]"
    >
      {/* Mobile: photos, heading and bio stacked. */}
      <div className="flex flex-col items-center gap-6 px-5 py-16 text-center lg:hidden">
        {/* 340px squares from Figma, shrinking to fit screens narrower than 380px. */}
        <div className="flex w-full max-w-[340px] flex-col gap-6">
          {photos.slice(0, 2).map((photo, index) => (
            <MediaPlaceholder
              key={photo.label}
              label={photo.label}
              className={cn("aspect-square w-full rounded-sm", index === 1 && "bg-green")}
            />
          ))}
        </div>
        <h2 id="practitioner-heading" className="max-w-[350px] text-h1">
          {practitioner.headingMobile}
        </h2>
        <p className="max-w-[340px] text-body">{practitioner.bio}</p>
        <div className="flex w-full max-w-[340px] flex-col gap-6">
          {photos.slice(2).map((photo) => (
            <MediaPlaceholder
              key={photo.label}
              label={photo.label}
              className="aspect-square w-full rounded-sm"
            />
          ))}
        </div>
      </div>

      {/* Desktop: centred copy with the four photos scattered around it. */}
      <div className="hidden lg:block">
        <h2
          id="practitioner-heading-desktop"
          className="absolute left-1/2 top-[240px] -translate-x-1/2 whitespace-nowrap text-h1"
        >
          {practitioner.headingDesktop}
        </h2>
        <p className="absolute left-1/2 top-[353px] w-[500px] -translate-x-1/2 text-center text-body">
          {practitioner.bio}
        </p>
        {photos.map((photo, index) => (
          <MediaPlaceholder
            key={photo.label}
            label={photo.label}
            className="absolute aspect-square w-[min(251px,17.4vw)] rounded-sm"
            style={{ left: `${scatter[index].left}%`, top: scatter[index].top }}
          />
        ))}
      </div>
    </section>
  );
}
