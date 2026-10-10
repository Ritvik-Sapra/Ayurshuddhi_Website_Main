import type { Metadata } from "next";
import Image from "next/image";
import { home } from "@/frontend/content/home";
import { GlassCta } from "@/frontend/components/ui/GlassCta";
import { BackgroundVideo } from "@/frontend/components/ui/BackgroundVideo";
import { cormorant, inter } from "@/frontend/lib/fonts";
import { HomeIntro } from "@/frontend/components/layout/HomeIntro";

export const metadata: Metadata = {
  title: { absolute: "AyurshuddhiWellness: Ayurveda & Naturopathy in Greater Noida" },
  alternates: { canonical: "/" },
};

/** Figma: Home. Full-screen video hero with the headline and one featured service card. */
export default function HomePage() {
  const { hero, cta, headline, subhead } = home;
  return (
    <>
      <HomeIntro />
      <main
        id="main"
        className={`${cormorant.variable} ${inter.variable} relative isolate flex min-h-[max(844px,100svh)] flex-col justify-end gap-8 overflow-hidden bg-placeholder-dark px-[var(--nav-inset)] pb-8 lg:block lg:min-h-[max(900px,100svh)] lg:p-0`}
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
          <div className="hero-scrim absolute inset-0" />
        </div>

        <div className="home-reveal flex flex-col gap-4 lg:absolute lg:bottom-40 lg:left-[var(--nav-inset)] lg:gap-6">
          <h1 className="hero-headline text-display text-cream">{headline}</h1>
          <p className="hero-sub max-w-md text-pretty text-body text-cream/80">{subhead}</p>
        </div>

        <div className="home-reveal home-reveal--late mb-16 lg:absolute lg:bottom-40 lg:right-[var(--nav-inset)] lg:mb-0">
          <GlassCta href={cta.href} className="w-full lg:w-auto">
            {cta.label}
          </GlassCta>
        </div>
      </main>
    </>
  );
}
