import { cn } from "@/frontend/lib/cn";
import { ArrowTile } from "@/frontend/components/ui/icons";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";
import { ServiceCardLink } from "@/frontend/components/cards/ServiceCardLink";

type ServiceCardProps = {
  title: string;
  /** Destination page. Cards without a page render without a link or arrow. */
  href?: string;
  /** Description of the intended photo (used as alt text once `imageSrc` is set). */
  imageLabel: string;
  imageSrc?: string;
  /** Optional description shown under the title (used on /services). */
  summary?: string;
  headingLevel?: 2 | 3;
  className?: string;
  imageClassName?: string;
};

/**
 * Figma: Card/Destination (ServiceCard). A photo slot above a dark bar with title and arrow.
 * Linked cards open their page through the radial card transition (see CardTransition.tsx),
 * which measures `[data-service-card]` and copies the `.card-media` photo slot. Motion styles
 * (reveal, parallax, hover) live in motion.css under "Service cards".
 */
export function ServiceCard({
  title,
  href,
  imageLabel,
  imageSrc,
  summary,
  headingLevel = 2,
  className,
  imageClassName,
}: ServiceCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article
      data-service-card
      className={cn(
        // overflow-clip, not hidden: a scroll container here would freeze the photo's parallax.
        "service-card relative flex flex-col overflow-clip rounded-card border border-card-border backdrop-blur-card",
        href &&
          "card-lift has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent",
        className,
      )}
    >
      <MediaPlaceholder
        label={imageLabel}
        src={imageSrc}
        // Cards render ~390px wide on desktop and the photo is scaled up to 1.12x, so request a wide source.
        sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
        quality={90}
        className={cn("card-media h-[204px] w-full shrink-0", imageClassName)}
      />
      <div className="flex flex-1 items-center gap-3 bg-card-fill p-5 text-cream">
        <div className="min-w-0 flex-1">
          <Heading className="text-h5">
            {href ? (
              <ServiceCardLink
                href={href}
                title={title}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {title}
              </ServiceCardLink>
            ) : (
              title
            )}
          </Heading>
          {summary ? <p className="mt-2 text-small text-cream/80">{summary}</p> : null}
        </div>
        {href ? <ArrowTile tone="green" className="card-arrow" /> : null}
      </div>
    </article>
  );
}
