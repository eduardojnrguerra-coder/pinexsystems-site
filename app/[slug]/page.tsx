import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeoPageTemplate } from "@/components/seo/seo-page-template";
import { seoPageMap, seoPages } from "@/lib/content/seo-pages";
import { createPageMetadata } from "@/lib/metadata";

interface SeoDynamicPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return seoPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: SeoDynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = seoPageMap[slug];

  if (!page) {
    return {};
  }

  return createPageMetadata({
    title: `${page.pageTitle} | Pine X Systems`,
    description: page.metaDescription,
    path: `/${page.slug}`,
    keywords: page.targetKeywords,
  });
}

export default async function SeoDynamicPage({ params }: SeoDynamicPageProps) {
  const { slug } = await params;
  const page = seoPageMap[slug];

  if (!page) {
    notFound();
  }

  return <SeoPageTemplate page={page} />;
}
