import type { MetadataRoute } from "next";
import { COUNTRY_SLUGS } from "@/types";
import { getAllBlogPosts } from "@/lib/sanity/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const posts = await getAllBlogPosts();
  const staticRoutes = [
    "",
    "/about",
    "/success-stories",
    "/blog",
    "/faq",
    "/contact",
    "/free-consultation",
    "/tools/eligibility-checker",
    "/tools/crs-calculator",
    "/tools/document-checklist",
    "/tools/book-consultation",
    ...COUNTRY_SLUGS.map((s) => `/${s}`),
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
    })),
  ];
}
