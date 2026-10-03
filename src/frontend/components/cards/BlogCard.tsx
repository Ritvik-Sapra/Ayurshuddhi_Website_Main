import Link from "next/link";
import { cn } from "@/frontend/lib/cn";
import type { BlogPost } from "@/frontend/content/blogs";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";

type BlogCardProps = {
  post: BlogPost;
  imageSrc?: string;
  className?: string;
};

/**
 * Figma: Card/Insight (BlogCard). A photo slot with a frosted label at the bottom holding the
 * category and title. Unpublished posts show a "Coming soon" badge and are not linked.
 */
export function BlogCard({ post, imageSrc, className }: BlogCardProps) {
  return (
    <article
      className={cn(
        "relative h-[216px] w-full overflow-hidden lg:h-[311px] lg:w-[505px]",
        post.published &&
          "card-lift has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent",
        className,
      )}
    >
      <MediaPlaceholder
        label={post.imageLabel}
        src={imageSrc}
        sizes="(min-width: 1024px) 505px, 350px"
        className="absolute inset-0 items-start pt-[10px]"
      />

      {post.published ? null : (
        <span className="absolute right-4 top-4 rounded-sm bg-scrim-soft px-3 py-1 text-eyebrow text-cream backdrop-blur-[6px]">
          Coming soon
        </span>
      )}

      <div className="absolute bottom-6 left-1/2 flex w-[302px] max-w-[calc(100%-32px)] -translate-x-1/2 flex-col items-center gap-2 rounded-sm bg-scrim-soft px-6 py-4 backdrop-blur-[6px]">
        <p className="whitespace-nowrap text-eyebrow text-accent">{post.category}</p>
        <h2 className="w-full text-card text-cream">
          {post.published ? (
            <Link
              href={`/blogs/${post.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {post.title}
            </Link>
          ) : (
            post.title
          )}
        </h2>
      </div>
    </article>
  );
}
