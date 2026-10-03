import type { Pin } from "@/frontend/content/services";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";

type ServiceHeroProps = {
  imageLabel: string;
  imageSrc?: string;
  pins: { mobile: Pin[]; desktop: Pin[] };
};

/** Positions come from the 390x844 and 1440x900 Figma frames, expressed as percentages of the hero. */
function PinLayer({
  pins,
  width,
  height,
  className,
}: {
  pins: Pin[];
  width: number;
  height: number;
  className: string;
}) {
  return (
    <div aria-hidden="true" className={className}>
      {pins.map((pin) => (
        <span
          key={`${pin.x}-${pin.y}`}
          className="map-pin"
          style={{ left: `${(pin.x / width) * 100}%`, top: `${(pin.y / height) * 100}%` }}
        />
      ))}
    </div>
  );
}

/** Figma: Hero / Interactive map. A full-bleed photo slot with decorative location pins. */
export function ServiceHero({ imageLabel, imageSrc, pins }: ServiceHeroProps) {
  return (
    <div className="relative h-[844px] lg:h-[900px]">
      <MediaPlaceholder
        label={imageLabel}
        src={imageSrc}
        decorative
        preload
        sizes="100vw"
        className="absolute inset-0"
      />
      <PinLayer
        pins={pins.mobile}
        width={390}
        height={844}
        className="absolute inset-0 lg:hidden"
      />
      <PinLayer
        pins={pins.desktop}
        width={1440}
        height={900}
        className="absolute inset-0 hidden lg:block"
      />
    </div>
  );
}
