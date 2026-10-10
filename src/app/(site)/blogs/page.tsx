import type { Metadata } from "next";
import { getBlogPosts } from "@/frontend/content";
import { blogsIntro } from "@/frontend/content/blogs";
import { BlogCard } from "@/frontend/components/cards/BlogCard";
import { DragScroll } from "@/frontend/components/ui/DragScroll";
import { Reveal } from "@/frontend/components/ui/Reveal";
import { StaggerGroup, StaggerItem } from "@/frontend/components/ui/Stagger";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Ayurvedic wisdom in modern stories: seasonal rituals, herbal spotlights and guides to mindful living from AyurshuddhiWellness.",
  alternates: { canonical: "/blogs" },
};

/** Figma: Blogs. A list of articles on mobile, a draggable snap carousel on desktop. */
export default async function BlogsPage() {
  const posts = await getBlogPosts();
  return (
    <section className="bg-green pb-16 pt-[160px] text-center text-cream lg:pb-[100px] lg:pt-[228px]">
      <Reveal className="mx-auto flex max-w-[1440px] flex-col items-center gap-5 px-5 lg:gap-6 lg:px-3">
        <h1 className="max-w-[350px] text-balance text-title lg:max-w-none">{blogsIntro.title}</h1>
        <p className="max-w-[310px] text-body lg:max-w-[463px]">{blogsIntro.subtitle}</p>
      </Reveal>

      <StaggerGroup>
        <DragScroll
          label="Articles, scroll sideways to browse"
          className="mt-12 flex flex-col gap-6 px-5 text-left lg:mt-[76px] lg:snap-x lg:snap-mandatory lg:scroll-pl-10 lg:flex-row lg:gap-8 lg:overflow-x-auto lg:px-10 lg:pb-2 lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post) => (
            <StaggerItem key={post.slug} className="lg:shrink-0 lg:snap-start">
              <BlogCard post={post} />
            </StaggerItem>
          ))}
        </DragScroll>
      </StaggerGroup>
    </section>
  );
}
