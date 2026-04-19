import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/ui/section-heading";
import { fullServiceDetails } from "@/lib/content/core";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Services | Pine X Systems",
  description:
    "Explore Pine X Systems services: custom business systems, owner dashboards, lead management, CRM pipelines, workflow systems, automation and reporting.",
  path: "/services",
  keywords: [
    "custom business systems South Africa",
    "business automation South Africa",
    "custom CRM South Africa",
    "lead management system",
    "owner dashboard for business",
  ],
});

export default function ServicesPage() {
  return (
    <div className="bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.12),transparent_26rem),linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)]">
      <div className="section-shell py-12 sm:py-16">
      <SectionHeading
        badge="Services"
        title={
          <>
            Custom Business Systems{" "}
            <span className="heading-gradient">Built For Execution</span>
          </>
        }
        description="Each service is designed to solve a real operational problem and give owners stronger visibility and control."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {fullServiceDetails.map((service) => (
          <article key={service.title} className="glass-card p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold text-[#111111]">
              {service.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#555962] sm:text-base">
              {service.description}
            </p>
            <div className="mt-6 rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-4">
              <h3 className="font-heading text-sm font-semibold text-[#111111]">
                Business Problem It Solves
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#555962]">
                {service.problem}
              </p>
            </div>
            <div className="mt-4 rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-4">
              <h3 className="font-heading text-sm font-semibold text-[#111111]">
                Benefit To The Owner
              </h3>
              <p className="mt-2 text-sm leading-7 text-[#555962]">
                {service.benefit}
              </p>
            </div>
            <div className="mt-6">
              <Link className="inline-link inline-flex items-center gap-2" href="/contact#lead-form">
                Book a Free Demo <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-[8px] border border-[#111111]/10 bg-white p-8 text-center shadow-[0_18px_50px_rgba(17,17,17,0.06)]">
        <h2 className="font-heading text-3xl font-semibold text-[#111111]">
          Need A System Built Around Your Exact Workflow?
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#555962] sm:text-base">
          We can map your process and build a live system that connects owners,
          managers, staff, and operations in one place.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/contact#lead-form" className="cta-button">
            Book A Free Demo
          </Link>
          <Link href="/demos" className="cta-secondary">
            View Demo Systems
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
