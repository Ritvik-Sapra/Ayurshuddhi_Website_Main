/**
 * Home hero copy (Figma: Home).
 *
 * TODO(copy): hero headline variants to A/B test later:
 *   A. "Rooted in Ancient Wisdom. Refined for Modern Living."  (current, from Figma)
 *   B. "Ayurveda that fits your body, not a template."
 *   C. "Root-cause healing, guided by classical Ayurveda."
 */
export const home = {
  headline: "Rooted in Ancient Wisdom. Refined for Modern Living.",
  cta: {
    label: "Book Now",
    href: "/ayurveda#book",
  },
  hero: {
    /**
     * TODO(media): drop licensed files into /public/media and set the paths, e.g.
     * videoSrc: "/media/hero.mp4" (desktop), videoSrcMobile: "/media/hero-mobile.mp4" (under 2 MB),
     * posterSrc: "/media/hero-poster.jpg" (also the LCP image, keep it under ~300 KB).
     * With nothing set, the dark placeholder background is shown.
     */
    videoSources: [
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/videos/AdobeStock_2185762968.mp4",
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/videos/video2.mp4",
    ] as readonly string[],
    videoSourcesMobile: [
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/videos/AdobeStock_2185762968.mp4",
      "https://pub-fe7d6537004a4bd49472a6861a9a1224.r2.dev/videos/video2.mp4",
    ] as readonly string[],
    posterSrc: undefined as string | undefined,
    posterAlt: "Sunlight streaming through a green forest",
  },
};
