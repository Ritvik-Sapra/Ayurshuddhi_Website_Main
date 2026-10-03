"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/frontend/lib/cn";

/**
 * next/image that fades in once loaded. The parent `.media-slot` shows a CSS shimmer
 * (see styles/skeleton.css) until this image sets data-loaded.
 */
export function FadeInImage({ className, onLoad, alt, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Image
      {...props}
      alt={alt}
      ref={(img) => {
        // Images that finished loading before hydration never fire onLoad.
        if (img?.complete && img.naturalWidth > 0) setLoaded(true);
      }}
      data-loaded={loaded ? "" : undefined}
      onLoad={(event) => {
        setLoaded(true);
        onLoad?.(event);
      }}
      className={cn(
        "opacity-0 transition-opacity duration-200 ease-out data-[loaded]:opacity-100 motion-reduce:transition-none",
        className,
      )}
    />
  );
}
