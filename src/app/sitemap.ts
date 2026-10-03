import type { MetadataRoute } from "next";
import { blogPosts } from "@/frontend/content/blogs";
import { site } from "@/frontend/content/site";
import { serviceSlugs } from "@/frontend/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly",
    lastModified: Date = now,
  ) => ({ url: `${site.url}${path}`, lastModified, changeFrequency, priority });

  return [
    page("", 1, "monthly"),
    ...serviceSlugs.map((slug) => page(`/${slug}`, 0.9, "monthly")),
    page("/services", 0.8, "monthly"),
    page("/about", 0.7, "yearly"),
    page("/blogs", 0.7, "weekly"),
    ...blogPosts
      .filter((post) => post.published)
      .map((post) =>
        page(`/blogs/${post.slug}`, 0.6, "monthly", new Date(post.updated?.iso ?? now)),
      ),
    page("/contact", 0.7, "yearly"),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
