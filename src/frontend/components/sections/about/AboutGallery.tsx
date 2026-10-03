import type { GalleryImage } from "@/frontend/content/about";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";

/** Aspect ratios from the Figma frames. Mobile shows five photos, desktop ten in three columns. */
const mobileRatios = ["390/434", "390/434", "390/324", "390/324", "390/360"];
const columns: { widthFr: number; ratio: string; from: number; count: number }[] = [
  { widthFr: 395, ratio: "395/436", from: 0, count: 3 },
  { widthFr: 691, ratio: "691/330", from: 3, count: 4 },
  { widthFr: 334, ratio: "334/436", from: 7, count: 3 },
];

/** Figma: Gallery. A stacked list on mobile and a three-column masonry on desktop. */
export function AboutGallery({ images }: { images: GalleryImage[] }) {
  return (
    <section aria-label="Photo gallery">
      <div className="flex flex-col gap-2 lg:hidden">
        {images.slice(0, mobileRatios.length).map((image, index) => (
          <MediaPlaceholder
            key={image.label}
            label={image.label}
            src={image.src}
            sizes="100vw"
            preload={index === 0}
            className="w-full"
            style={{ aspectRatio: mobileRatios[index] }}
          />
        ))}
      </div>

      <div
        className="hidden items-start gap-x-2.5 lg:grid"
        style={{ gridTemplateColumns: columns.map((column) => `${column.widthFr}fr`).join(" ") }}
      >
        {columns.map((column) => (
          <div key={column.from} className="flex flex-col gap-2">
            {images.slice(column.from, column.from + column.count).map((image) => (
              <MediaPlaceholder
                key={image.label}
                label={image.label}
                src={image.src}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="w-full"
                style={{ aspectRatio: column.ratio }}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
