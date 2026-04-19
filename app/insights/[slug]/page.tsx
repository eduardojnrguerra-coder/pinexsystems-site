import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { InsightArticleView } from "@/components/insights/insight-article";
import { insightArticleMap, insightArticles } from "@/lib/content/insights";
import { createPageMetadata } from "@/lib/metadata";

interface InsightArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return insightArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: InsightArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = insightArticleMap[slug];

  if (!article) {
    return {};
  }

  return createPageMetadata({
    title: `${article.title} | Pine X Systems Insights`,
    description: article.description,
    path: `/insights/${article.slug}`,
    keywords: article.keywords,
  });
}

export default async function InsightArticlePage({ params }: InsightArticlePageProps) {
  const { slug } = await params;
  const article = insightArticleMap[slug];

  if (!article) {
    notFound();
  }

  return <InsightArticleView article={article} />;
}
