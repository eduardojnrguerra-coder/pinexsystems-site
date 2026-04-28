import Link from "next/link";

import { DemoCardGrid } from "@/components/demos/DemoCardGrid";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Interactive System Demos | Pine X Systems",
  description:
    "Open interactive Pine X Systems demos for dealership management, workshop job cards, agency operations, construction projects, warehouse stock, farm operations, security operations, and custom business systems.",
  path: "/demos",
  keywords: [
    "dealership management system South Africa",
    "workshop management system",
    "agency management system",
    "construction business system",
    "warehouse stock system",
    "farm operations system",
    "security operations system",
    "owner dashboard system",
  ],
});

export default function DemosPage() {
  return (
    <div className="bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.14),transparent_26rem),linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)]">
      <div className="section-shell py-12 sm:py-16 lg:py-20">
        <SectionHeading
          badge="Interactive Demos"
          title={
            <>
              Open Realistic{" "}
              <span className="heading-gradient">Business System Previews</span>
            </>
          }
          description="Each Pine X Systems demo is a frontend-only sales preview with sample data, role views, filters, actions, dashboards, and activity feeds."
        />

        <div className="mt-8">
          <DemoCardGrid tone="light" />
        </div>

        <div className="mt-10 rounded-[8px] border border-[#111111]/10 bg-white p-6 text-center shadow-[0_24px_70px_rgba(17,17,17,0.08)] sm:p-8">
          <h2 className="font-heading text-3xl font-semibold text-[#111111]">
            Need A Demo Tailored To Your Process?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#555962] sm:text-base">
            Pine X Systems can build a focused custom business system demo around your exact operation, team structure, and owner dashboard needs.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact#lead-form" className="cta-button">
              Request This Demo
            </Link>
            <Link href="/services" className="cta-secondary">
              View Services
            </Link>
            <Link href="/case-studies" className="cta-secondary">
              Demo Case Studies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
