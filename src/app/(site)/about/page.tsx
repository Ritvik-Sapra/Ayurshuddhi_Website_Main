import type { Metadata } from "next";
import { getAbout } from "@/frontend/content";
import { AboutGallery } from "@/frontend/components/sections/about/AboutGallery";
import { AboutPractitioner } from "@/frontend/components/sections/about/AboutPractitioner";
import { AboutStory } from "@/frontend/components/sections/about/AboutStory";
import { AboutTestimonials } from "@/frontend/components/sections/about/AboutTestimonials";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind AyurshuddhiWellness: classical Ayurveda delivered with care, a root-cause approach, and Acharya Abbhiraath Singh, Nadi Vaidya and Ayurvedacharya.",
  alternates: { canonical: "/about" },
};

/** Figma: About. Gallery, story, practitioner and client testimonials. */
export default async function AboutPage() {
  const about = await getAbout();
  return (
    <>
      <AboutGallery desktop={about.gallery.desktop} mobile={about.gallery.mobile} />
      <AboutStory story={about.story} />
      <AboutPractitioner practitioner={about.practitioner} />
      <AboutTestimonials testimonials={about.testimonials} />
      <div className="lg:h-[120px]" aria-hidden="true" />
    </>
  );
}
