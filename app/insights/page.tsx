import Link from "next/link";

import { InsightsExplorer } from "@/components/ui/insights-explorer";
import { SectionHeading } from "@/components/ui/section-heading";
import { insightArticles } from "@/lib/content/insights";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Insights | Pine X Systems",
  description:
    "Pine X Systems insights hub for South African business owners: systems, automation, dashboards, CRM, lead control, and practical operations advice.",
  path: "/insights",
  keywords: [
    "business systems South Africa blog",
    "business automation South Africa insights",
    "custom CRM South Africa advice",
    "owner dashboard insights",
  ],
});

export default function InsightsPage() {
  return (
    <div className="bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.14),transparent_26rem),linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)]">
      <div className="section-shell py-12 sm:py-16">
      <SectionHeading
        badge="Insights"
        title={
          <>
            Business Systems{" "}
            <span className="heading-gradient">Knowledge Hub</span>
          </>
        }
        description="Useful, practical content for South African business owners who want cleaner operations, stronger follow-up, and better visibility."
      />

      <div className="mt-10">
        <InsightsExplorer articles={insightArticles} />
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <article className="glass-card p-7">
          <h2 className="font-heading text-2xl font-semibold text-[#111111]">
            Need help applying this to your business?
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#555962] sm:text-base">
            We can review your current workflow and show you what the first high-impact
            system improvement should be.
          </p>
          <div className="mt-5">
            <Link href="/contact#lead-form" className="cta-button">
              Book A Free Demo Call
            </Link>
          </div>
        </article>

        <article className="glass-card p-7">
          <h2 className="font-heading text-2xl font-semibold text-[#111111]">
            Prefer seeing examples first?
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#555962] sm:text-base">
            Browse demo concepts to understand what custom systems look like
            across industries and operations.
          </p>
          <div className="mt-5">
            <Link href="/demos" className="cta-secondary">
              View Demo Concepts
            </Link>
          </div>
        </article>
      </div>
      </div>
    </div>
  );
}
