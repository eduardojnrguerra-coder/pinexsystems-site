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

const implementationSteps = [
  {
    title: "Workflow mapping first",
    description:
      "We start by understanding how work actually moves through your business, where delays happen, and what the owner needs to see without chasing people.",
  },
  {
    title: "Control layer design",
    description:
      "We decide what should be tracked, who owns the next action, which alerts matter, and what dashboards or approvals each role needs.",
  },
  {
    title: "Practical rollout",
    description:
      "The first version is focused on the highest-impact workflow, so the team gets something useful quickly instead of a bloated system that nobody adopts.",
  },
  {
    title: "After-launch refinement",
    description:
      "Once the workflow is live, we tighten reports, improve handovers, and add modules where the business will feel the next gain.",
  },
];

const fitCards = [
  {
    title: "Built for businesses that need control",
    items: [
      "Operations-heavy teams with live jobs, leads, or stock",
      "Owners who need visibility without waiting for weekly reports",
      "Managers who are tired of chasing updates across chats and spreadsheets",
    ],
  },
  {
    title: "Not built for businesses chasing software for its own sake",
    items: [
      "Teams looking for a generic template with no workflow depth",
      "Businesses that do not want to change weak process habits",
      "Projects that want flashy dashboards without operational discipline underneath",
    ],
  },
];

const serviceTrustLinks = [
  { label: "Business systems guide", href: "/business-systems" },
  { label: "Owner dashboard systems", href: "/owner-dashboard-system" },
  { label: "Business loss calculator", href: "/business-loss-calculator" },
  { label: "Interactive demos", href: "/demos" },
];

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

      <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="glass-card p-6 sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
            What implementation looks like
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-[#111111]">
            A structured delivery process built around clarity
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {implementationSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-4"
              >
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 font-heading text-lg font-semibold text-[#111111]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#555962]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </article>

        <div className="space-y-6">
          {fitCards.map((card) => (
            <article key={card.title} className="glass-card p-6">
              <h2 className="font-heading text-2xl font-semibold text-[#111111]">
                {card.title}
              </h2>
              <ul className="mt-5 space-y-2 text-sm text-[#3d4147]">
                {card.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <article className="rounded-[8px] border border-[#111111]/10 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.06)] sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
            What businesses usually gain
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-[#111111]">
            Typical operational improvements after the first build
          </h2>
          <div className="mt-6 space-y-4">
            {[
              "Fewer missed leads because follow-up ownership becomes visible",
              "Cleaner daily execution because tasks, approvals, and status changes live in one flow",
              "Stronger owner confidence because key signals can be checked without waiting for manual updates",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-4 text-sm leading-7 text-[#555962]"
              >
                {item}
              </div>
            ))}
          </div>
        </article>

        <article className="glass-card p-6 sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
            Explore by business priority
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold text-[#111111]">
            Useful next pages if you are evaluating the fit
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {serviceTrustLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[8px] border border-[#111111]/10 bg-white px-4 py-4 text-sm font-medium text-[#3d4147] transition hover:border-[#67E8F9]/40 hover:text-[#111111]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-[#555962]">
            If you are not sure where to start, the calculator is the fastest way
            to estimate where weak follow-up, manual admin, or poor visibility
            may already be costing the business.
          </p>
        </article>
      </section>

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
