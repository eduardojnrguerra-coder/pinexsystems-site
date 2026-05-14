import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About | Pine X Systems",
  description:
    "Pine X Systems helps South African businesses replace scattered tools and manual admin with custom systems for clarity and control.",
  path: "/about",
  keywords: [
    "custom business systems South Africa",
    "business systems builder",
    "custom software for small businesses",
    "operations management system",
  ],
});

const values = [
  {
    title: "Practical By Design",
    description:
      "We build systems your team can use daily, not theoretical software architecture that looks impressive but fails in operations.",
  },
  {
    title: "Built Around Reality",
    description:
      "Every flow is designed around how your business already works, then improved for speed, control, and accountability.",
  },
  {
    title: "South African Context",
    description:
      "Our approach is grounded in the realities of South African SMEs where agility, clarity, and execution discipline matter.",
  },
  {
    title: "Future-Ready Foundations",
    description:
      "We build modular systems that can expand as your team, customer base, and operational complexity grow.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.12),transparent_26rem),linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)]">
      <div className="section-shell py-12 sm:py-16">
      <SectionHeading
        badge="About Pine X Systems"
        title={
          <>
            Building The{" "}
            <span className="heading-gradient">Operating Layer</span> Businesses
            Need
          </>
        }
        description="Pine X Systems was created to help businesses move away from scattered tools, manual admin, and disconnected operations."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="glass-card p-7 sm:p-9">
          <h2 className="font-heading text-2xl font-semibold text-[#111111]">
            Our Mission
          </h2>
          <p className="mt-4 text-sm leading-8 text-[#555962] sm:text-base">
            Pine X Systems builds custom systems that give owners clarity,
            control, and better decision-making power. We focus on the operational
            layer where businesses win or lose momentum: lead flow, workflow
            execution, team accountability, and real-time owner visibility.
          </p>
          <p className="mt-4 text-sm leading-8 text-[#555962] sm:text-base">
            Our tone is ambitious and practical. We believe systems should make
            your business easier to run, not harder to understand. We do not push
            generic templates. We design around your process and deliver a system
            that feels native to your operation.
          </p>
          <p className="mt-4 text-lg italic text-[#2a2a2a] sm:text-2xl">
            &quot;We do not sell software. We build the operating layer your
            business should have had years ago.&quot;
          </p>
        </article>

        <div className="grid gap-4">
          {values.map((value) => (
            <article key={value.title} className="glass-card p-5">
              <h3 className="font-heading text-xl font-semibold text-[#111111]">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#555962]">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-[8px] border border-[#111111]/10 bg-white p-8 text-center shadow-[0_18px_50px_rgba(17,17,17,0.06)]">
        <h2 className="font-heading text-3xl font-semibold text-[#111111]">
          Ready To Build Your Control Layer?
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#555962] sm:text-base">
          Let us map your operation and show you exactly what a custom system can
          look like for your business.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/contact#lead-form" className="cta-button" data-event="free_audit_click">
            Get My Free System Audit
          </Link>
          <Link href="/demos" className="cta-secondary" data-event="demo_click">
            View Live Demo Systems
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
