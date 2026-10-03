import Link from "next/link";
import { cn } from "@/frontend/lib/cn";
import { ArrowTile } from "@/frontend/components/ui/icons";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";

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

/** Figma: Card/Destination (ServiceCard). A photo slot above a dark bar with title and arrow. */
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
      className={cn(
        "relative flex flex-col overflow-hidden rounded-sm bg-white/[0.01] backdrop-blur-[6px]",
        href &&
          "card-lift has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent",
        className,
      )}
    >
      <MediaPlaceholder
        label={imageLabel}
        src={imageSrc}
        sizes="(min-width: 1024px) 256px, 350px"
        className={cn("h-[204px] w-full shrink-0", imageClassName)}
      />
      <div className="flex items-center gap-3 bg-scrim p-5 text-cream">
        <div className="min-w-0 flex-1">
          <Heading className="text-h5">
            {href ? (
              <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                {title}
              </Link>
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
