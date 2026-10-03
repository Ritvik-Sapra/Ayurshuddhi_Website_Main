import type { Metadata } from "next";
import Image from "next/image";
import { home } from "@/frontend/content/home";
import { GlassCta } from "@/frontend/components/ui/GlassCta";
import { BackgroundVideo } from "@/frontend/components/ui/BackgroundVideo";

export const metadata: Metadata = {
  title: { absolute: "AyurshuddhiWellness: Ayurveda & Naturopathy in Greater Noida" },
  alternates: { canonical: "/" },
};

/** Figma: Home. Full-screen video hero with the headline and one featured service card. */
export default function HomePage() {
  const { hero, cta, headline } = home;
  return (
    <main
      id="main"
      className="relative isolate flex min-h-[max(844px,100svh)] flex-col justify-end gap-8 overflow-hidden bg-placeholder-dark px-[var(--gutter)] pb-8 lg:block lg:min-h-[max(900px,100svh)] lg:p-0"
    >
      {/* Background: poster (LCP) with the video fading in over it. Flat placeholder until media is added. */}
      <div aria-hidden={hero.posterSrc ? undefined : true} className="absolute inset-0 -z-10">
        {hero.posterSrc ? (
          <Image
            src={hero.posterSrc}
            alt={hero.posterAlt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="size-full bg-gradient-to-b from-placeholder-dark via-placeholder-dark to-green-dark/60" />
        )}
        <BackgroundVideo
          sources={hero.videoSources}
          sourcesMobile={hero.videoSourcesMobile}
          poster={hero.posterSrc}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      </div>

      <h1 className="text-hero text-white lg:absolute lg:left-10 lg:top-1/2 lg:w-[760px] lg:-translate-y-1/2">
        {headline}
      </h1>

      <div className="mb-8 lg:absolute lg:bottom-24 lg:right-10 lg:mb-0">
        <GlassCta href={cta.href} className="w-full lg:w-auto">
          {cta.label}
        </GlassCta>
      </div>
    </main>
  );
}
