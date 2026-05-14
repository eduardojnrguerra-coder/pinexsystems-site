import Link from "next/link";

import { DemoCardGrid } from "@/components/demos/DemoCardGrid";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Interactive System Demos | Pine X Systems",
  description:
    "Open interactive Pine X Systems demos for dealership management, workshop job cards, logistics command centres, agency operations, construction projects, warehouse stock, farm operations, security operations, and custom business systems.",
  path: "/demos",
  keywords: [
    "dealership management system South Africa",
    "workshop management system",
    "agency management system",
    "construction business system",
    "warehouse stock system",
    "logistics management system South Africa",
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
          description="Open interactive previews showing how Pine X Systems can structure dashboards, workflows, role views, actions and reporting around different business types."
        />

        <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-7 text-[#555962] sm:text-base">
          Interactive concept previews built to show how Pine X systems can structure dashboards, workflows, approvals, and reporting around real operations.
        </p>

        <div id="demo-systems" className="mt-8">
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
            <Link href="/contact#lead-form" className="cta-button" data-event="free_audit_click">
              Get My Free System Audit
            </Link>
            <Link href="#demo-systems" className="cta-secondary" data-event="demo_click">
              View Live Demo Systems
            </Link>
            <Link href="/case-studies" className="cta-secondary">
              Demo Case Studies
            </Link>
          </div>
        </div>

        <section className="mt-10 rounded-[8px] border border-[#111111]/10 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.06)] sm:p-8">
          <h2 className="font-heading text-2xl font-semibold text-[#111111]">
            Buyer Guides For System Decisions
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Custom software vs off-the-shelf CRM", href: "/custom-software-vs-off-the-shelf-crm" },
              { label: "Custom system cost in South Africa", href: "/how-much-does-a-custom-business-system-cost-south-africa" },
              { label: "Best business systems South Africa", href: "/best-business-systems-south-africa" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3 text-sm font-medium text-[#3d4147] transition hover:border-[#111111]/25 hover:text-[#111111]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
