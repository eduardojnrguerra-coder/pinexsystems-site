import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DemoShell } from "@/components/demos/DemoShell";
import { demoSystemSlugs, getDemoSystem } from "@/lib/demo-systems";
import { createPageMetadata } from "@/lib/metadata";

interface DemoPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return demoSystemSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const system = getDemoSystem(slug);

  if (!system) return {};

  return createPageMetadata({
    title: system.seoTitle,
    description: system.seoDescription,
    path: `/demos/${system.slug}`,
    keywords: [
      system.shortTitle,
      "custom business systems South Africa",
      "business automation South Africa",
      "owner dashboard",
      "operations dashboard",
      "staff workflow system",
    ],
  });
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const system = getDemoSystem(slug);

  if (!system) {
    notFound();
  }

  return <DemoShell system={system} />;
}
