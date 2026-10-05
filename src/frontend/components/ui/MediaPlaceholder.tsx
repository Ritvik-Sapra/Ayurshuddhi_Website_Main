import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/frontend/lib/cn";
import { FadeInImage } from "@/frontend/components/ui/FadeInImage";
import { ImageIcon } from "@/frontend/components/ui/icons";

type MediaPlaceholderProps = {
  /** Description of the intended image. Used as `alt` when `src` is set, and read by screen readers otherwise only if `decorative` is false. */
  label: string;
  /** Image URL. When omitted the Figma image-icon placeholder is rendered. */
  src?: string;
  /** Mark as decorative (alt=""). Use for background imagery. */
  decorative?: boolean;
  sizes?: string;
  /** Encoder quality (next.config.ts `images.qualities` lists the allowed values). */
  quality?: number;
  /** Preload the image (LCP images only). */
  preload?: boolean;
  className?: string;
  /** Extra classes for the icon (e.g. to pin it to the top of a card). */
  iconClassName?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/**
 * Figma: Media/Placeholder. Fills its parent's box: give it a size through `className`
 * (e.g. `h-[204px] w-full` or `absolute inset-0`).
 */
export function MediaPlaceholder({
  label,
  src,
  decorative = false,
  sizes = "100vw",
  quality,
  preload = false,
  className,
  iconClassName,
  style,
  children,
}: MediaPlaceholderProps) {
  return (
    <div
      style={style}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-placeholder",
        src && "media-slot",
        className,
      )}
    >
      {src ? (
        <FadeInImage
          src={src}
          alt={decorative ? "" : label}
          fill
          sizes={sizes}
          quality={quality}
          preload={preload}
          className="object-cover"
        />
      ) : (
        <ImageIcon className={iconClassName} />
      )}
      {children}
    </div>
  );
}
