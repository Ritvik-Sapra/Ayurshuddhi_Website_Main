import type { About, PractitionerCredential } from "@/frontend/content/about";
import { Reveal } from "@/frontend/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/frontend/components/ui/Stagger";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";
import { LeafIcon, MountainIcon, ScrollIcon } from "@/frontend/components/ui/icons";

const credentialIcons = {
  mountain: MountainIcon,
  scroll: ScrollIcon,
  leaf: LeafIcon,
} satisfies Record<PractitionerCredential["icon"], typeof MountainIcon>;

/** Figma: Botanical / Hanging leaf (200x227). A fan leaf on a thread, drawn in fine green lines. */
function HangingLeaf() {
  const veins = [-72, -54, -36, -18, 0, 18, 36, 54, 72];
  return (
    <svg
      viewBox="0 0 200 227"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute right-15 top-0 hidden w-50 opacity-30 lg:block"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M100 0V76" className="stroke-green" />
      <path
        d="M100 76C60 84 24 110 12 148C60 176 140 176 188 148C176 110 140 84 100 76Z"
        className="stroke-green"
      />
      {veins.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <path
            key={angle}
            d={`M100 76L${100 + Math.sin(rad) * 94} ${76 + Math.cos(rad) * 92 * 0.8 + 6}`}
            className="stroke-green"
          />
        );
      })}
    </svg>
  );
}

/**
 * Figma: Practitioner. Portrait photo beside the practitioner's name, title, bio and credentials,
 * then a white strip of three captioned photos. Stacks on mobile.
 */
export function AboutPractitioner({ practitioner }: { practitioner: About["practitioner"] }) {
  return (
    <section
      aria-labelledby="practitioner-heading"
      className="relative flex flex-col gap-12 overflow-hidden bg-cream py-16 text-green lg:gap-16 lg:py-30"
    >
      <HangingLeaf />
      <div className="flex flex-col items-center gap-10 px-5 lg:flex-row lg:gap-20 lg:px-10">
        <MediaPlaceholder
          label={practitioner.portrait.label}
          src={practitioner.portrait.src}
          sizes="(min-width: 1024px) 520px, 100vw"
          className="aspect-[13/16] w-full max-w-130 shrink-0 rounded-card border border-green lg:h-160 lg:w-130"
        />
        <Reveal className="flex min-w-0 flex-1 flex-col gap-5 self-stretch lg:justify-center">
          <p className="text-body-l">{practitioner.eyebrow}</p>
          <h2 id="practitioner-heading" className="text-h4 lg:text-name">
            {practitioner.name}
          </h2>
          <p className="text-h6">{practitioner.title}</p>
          <p className="text-body-l">{practitioner.bio}</p>
          <ul className="flex flex-col pt-4">
            {practitioner.credentials.map((credential) => {
              const Icon = credentialIcons[credential.icon];
              return (
                <li
                  key={credential.text}
                  className="flex items-center gap-4 border-t border-green py-4"
                >
                  <Icon />
                  <span className="text-body-l">{credential.text}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
      <StaggerGroup className="grid grid-cols-1 gap-6 bg-white px-5 md:grid-cols-3 lg:px-10">
        {practitioner.strip.map((photo) => (
          <StaggerItem key={photo.caption}>
            <figure className="flex flex-col gap-3">
              <MediaPlaceholder
                label={photo.label}
                src={photo.src}
                sizes="(min-width: 768px) 437px, 100vw"
                className="h-75 w-full rounded-card border border-green"
              />
              <figcaption className="text-small">{photo.caption}</figcaption>
            </figure>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
