import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DealershipDemo } from "@/components/demos/DealershipDemo";
import { DemoShell } from "@/components/demos/DemoShell";
import { HuttonServiceDemo } from "@/components/demos/hutton/HuttonServiceDemo";
import { SchemaScript } from "@/components/ui/schema-script";
import { demoSystemSlugs, getDemoSystem } from "@/lib/demo-systems";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/schema";

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

  if (slug === "hutton-motors-service-centre") {
    return (
      <>
        <SchemaScript
          data={softwareApplicationSchema({
            name: system.title,
            description: system.seoDescription,
            path: `/demos/${system.slug}`,
            category: "BusinessApplication",
          })}
        />
        <SchemaScript
          data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Demos", path: "/demos" },
            { name: system.title, path: `/demos/${system.slug}` },
          ])}
        />
        <HuttonServiceDemo />
      </>
    );
  }

  if (slug === "dealership") {
    return (
      <>
        <SchemaScript
          data={softwareApplicationSchema({
            name: system.title,
            description: system.seoDescription,
            path: `/demos/${system.slug}`,
            category: "BusinessApplication",
          })}
        />
        <SchemaScript
          data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Demos", path: "/demos" },
            { name: system.title, path: `/demos/${system.slug}` },
          ])}
        />
        <DealershipDemo />
      </>
    );
  }

  return (
    <>
      <SchemaScript
        data={softwareApplicationSchema({
          name: system.title,
          description: system.seoDescription,
          path: `/demos/${system.slug}`,
          category: "BusinessApplication",
        })}
      />
      <SchemaScript
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Demos", path: "/demos" },
          { name: system.title, path: `/demos/${system.slug}` },
        ])}
      />
      <DemoShell key={system.slug} system={system} />
    </>
  );
}
