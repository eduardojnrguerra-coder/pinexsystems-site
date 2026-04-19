import type { MetadataRoute } from "next";

import { insightArticles } from "@/lib/content/insights";
import { seoPages } from "@/lib/content/seo-pages";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/services",
    "/industries",
    "/demos",
    "/about",
    "/contact",
    "/insights",
  ];

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.domain}${route}`,
    lastModified: now,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));

  const seoEntries: MetadataRoute.Sitemap = seoPages.map((page) => ({
    url: `${siteConfig.domain}/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.78,
  }));

  const insightEntries: MetadataRoute.Sitemap = insightArticles.map((article) => ({
    url: `${siteConfig.domain}/insights/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  return [...staticEntries, ...seoEntries, ...insightEntries];
}
