import { dinacharyaArticle, type BlogPost } from "@/frontend/content/blogs";
import { MediaPlaceholder } from "@/frontend/components/ui/MediaPlaceholder";

function MetaItem({ label, value }: { label: string; value?: BlogPost["date"] }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-2">
      <p className="text-card text-accent-soft">{label}</p>
      <time dateTime={value.iso} className="text-body text-cream">
        {value.text}
      </time>
    </div>
  );
}

/**
 * Figma: Article. Meta row (date, category, title, last update) over a narrow reading column.
 * TODO(copy): the body text and images are the Figma placeholders.
 */
export function ArticleView({ post }: { post: BlogPost }) {
  const { standfirst, blocks } = dinacharyaArticle;
  return (
    <article className="bg-green pb-20 pt-[104px] text-cream lg:pb-12 lg:pt-[144px]">
      <header className="flex flex-col gap-3 px-5 py-6 lg:grid lg:grid-cols-[1fr_minmax(0,860px)_1fr] lg:items-start lg:gap-8 lg:px-[53px] lg:py-0">
        <MetaItem label="Date" value={post.date} />
        <div className="flex flex-col gap-3 lg:order-none lg:items-center lg:text-center">
          <p className="text-body-l text-accent-soft">{post.category}</p>
          <h1 className="text-h5 lg:text-h2">{post.title}</h1>
        </div>
        <div className="lg:justify-self-end">
          <MetaItem label="Last Update" value={post.updated} />
        </div>
      </header>

      <div className="mx-auto flex max-w-[533px] flex-col gap-5 px-5 pt-2 lg:mt-8 lg:gap-8 lg:px-0 lg:pt-0">
        <p className="text-body">{standfirst}</p>
        {blocks.map((block) =>
          block.type === "image" ? (
            <MediaPlaceholder
              key={block.label}
              label={block.label}
              className="w-full"
              // Aspect ratios from the Figma frames (533x355 and 533x298).
              style={{ aspectRatio: block.ratio }}
            />
          ) : (
            <p key={block.text} className="text-body">
              {block.text}
            </p>
          ),
        )}
      </div>
    </article>
  );
}
