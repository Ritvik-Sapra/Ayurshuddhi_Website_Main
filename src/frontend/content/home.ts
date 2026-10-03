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
  featured: {
    title: "Ayurveda",
    href: "/ayurveda",
    imageLabel: "Ayurvedic herbs and healing ingredients arranged on a wooden table",
    imageSrc: undefined as string | undefined,
  },
  hero: {
    /**
     * TODO(media): drop licensed files into /public/media and set the paths, e.g.
     * videoSrc: "/media/hero.mp4" (desktop), videoSrcMobile: "/media/hero-mobile.mp4" (under 2 MB),
     * posterSrc: "/media/hero-poster.jpg" (also the LCP image, keep it under ~300 KB).
     * With nothing set, the dark placeholder background is shown.
     */
    videoSrc: undefined as string | undefined,
    videoSrcMobile: undefined as string | undefined,
    posterSrc: undefined as string | undefined,
    posterAlt: "Sunlight streaming through a green forest",
  },
};
