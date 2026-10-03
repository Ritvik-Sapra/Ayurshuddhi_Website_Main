import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/frontend/content";
import { blogPosts } from "@/frontend/content/blogs";
import { site } from "@/frontend/content/site";
import { jsonLdString } from "@/frontend/lib/jsonld";
import { ArticleView } from "@/frontend/components/sections/blog/ArticleView";

// Only published posts have a page; every other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.filter((post) => post.published).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date?.iso,
      modifiedTime: post.updated?.iso,
    },
  };
}

/** Figma: Article (Dinacharya). */
export default async function BlogArticlePage({ params }: PageProps<"/blogs/[slug]">) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date?.iso,
    dateModified: post.updated?.iso,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <ArticleView post={post} />
      <script
        type="application/ld+json"
        // Static, server-generated data: safe to inline.
        dangerouslySetInnerHTML={{ __html: jsonLdString(jsonLd) }}
      />
    </>
  );
}
