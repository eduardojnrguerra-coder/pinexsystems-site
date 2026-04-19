import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { fullIndustryDetails } from "@/lib/content/core";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Industries | Pine X Systems",
  description:
    "Industry-focused system builds for dealerships, workshops, agencies, construction, warehouses, farms, security operations and custom sectors.",
  path: "/industries",
  keywords: [
    "dealership management system South Africa",
    "workshop management system",
    "agency management system",
    "construction business system",
    "custom business portal",
  ],
});

export default function IndustriesPage() {
  return (
    <div className="bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.12),transparent_26rem),linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)]">
      <div className="section-shell py-12 sm:py-16">
      <SectionHeading
        badge="Industries"
        title={
          <>
            Systems Built For{" "}
            <span className="heading-gradient">Real South African Businesses</span>
          </>
        }
        description="Not generic software. Systems tailored to your operational reality, team structure, and customer journey."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {fullIndustryDetails.map((industry) => (
          <article key={industry.title} className="glass-card p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold text-[#111111]">
              {industry.title}
            </h2>
            <p className="mt-1 text-sm text-[#6b6c70]">
              {industry.subtitle}
            </p>
            <ul className="mt-5 space-y-2 text-sm leading-7 text-[#555962]">
              {industry.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span className="text-[#6b6c70]">-</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <Link className="inline-link mt-6 inline-flex" href="/contact#lead-form">
              Request Demo
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-10 rounded-[8px] border border-[#111111]/10 bg-white p-8 text-center shadow-[0_18px_50px_rgba(17,17,17,0.06)]">
        <h2 className="font-heading text-3xl font-semibold text-[#111111]">
          Do You Operate In A Different Industry?
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#555962] sm:text-base">
          Pine X Systems builds custom systems for operations-heavy businesses
          beyond the examples above. We map your process and build around it.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/contact#lead-form" className="cta-button">
            Book A Free Discovery Call
          </Link>
          <Link href="/demos" className="cta-secondary">
            See Demo Concepts
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
