import type { CSSProperties } from "react";
import type { GalleryImage } from "@/frontend/content/about";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";

/** Frame sizes (width/height) from the Figma "Gallery (scroll stack)" frame, top to bottom. */
const mobileRatios = ["390/260", "390/260", "390/288", "390/260", "390/260", "390/260"];

/**
 * Frame sizes from the Figma "Gallery (masonry)" frame (1440x1368, 8px gaps). Each column is
 * filled top to bottom and every column ends at the same height, so the widths set the grid
 * and each photo keeps its own aspect ratio.
 */
const columns: { widthFr: number; ratios: string[] }[] = [
  { widthFr: 490, ratios: ["490/327", "490/327", "490/327", "490/363"] },
  { widthFr: 458, ratios: ["458/305", "458/306", "458/305", "458/428"] },
  { widthFr: 476, ratios: ["476/318", "476/318", "476/351", "476/357"] },
];

type AboutGalleryProps = {
  /** Twelve photos in column order (three columns of four). */
  desktop: GalleryImage[];
  /** Six photos for the mobile stack. */
  mobile: GalleryImage[];
};

/** Figma: Gallery. A stacked list of six on mobile and a three-column masonry of twelve on desktop. */
export function AboutGallery({ desktop, mobile }: AboutGalleryProps) {
  return (
    <section aria-label="Photo gallery">
      <div className="flex flex-col gap-2 lg:hidden">
        {mobile.slice(0, mobileRatios.length).map((image, index) => (
          <MediaPlaceholder
            key={image.label}
            label={image.label}
            src={image.src}
            sizes="100vw"
            preload={index === 0}
            className="gallery-tile w-full"
            style={{ aspectRatio: mobileRatios[index], "--row": index } as CSSProperties}
          />
        ))}
      </div>

      <div
        className="hidden items-start gap-x-2 lg:grid"
        style={{ gridTemplateColumns: columns.map((column) => `${column.widthFr}fr`).join(" ") }}
      >
        {columns.map((column, columnIndex) => (
          <div key={column.widthFr} className="flex flex-col gap-2">
            {column.ratios.map((ratio, rowIndex) => {
              const image = desktop[columnIndex * 4 + rowIndex];
              if (!image) return null;
              return (
                <MediaPlaceholder
                  key={image.label}
                  label={image.label}
                  src={image.src}
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="gallery-tile w-full"
                  style={
                    { aspectRatio: ratio, "--row": rowIndex, "--col": columnIndex } as CSSProperties
                  }
                />
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
