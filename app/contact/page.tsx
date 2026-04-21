import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { LeadForm } from "@/components/ui/lead-form";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact | Pine X Systems",
  description:
    "Contact Pine X Systems to request a custom business system demo, discuss automation, or map your operational bottlenecks.",
  path: "/contact",
  keywords: [
    "book custom business system demo",
    "business automation South Africa consultation",
    "custom CRM South Africa contact",
    "owner dashboard demo request",
  ],
});

const checklist = [
  "Leads are slipping through without proper follow-up",
  "Staff updates happen in scattered messages",
  "Owners cannot see live business performance",
  "Job or task tracking is inconsistent",
  "Reports are delayed or inaccurate",
  "Stock or resource visibility is poor",
  "Departments are using disconnected tools",
];

const nextSteps = [
  {
    title: "1. We review the problem properly",
    description:
      "We look at your current workflow, where the operational friction sits, and what visibility or automation would make the biggest difference first.",
  },
  {
    title: "2. We recommend a focused control layer",
    description:
      "You get practical guidance on the first modules worth building, whether that means lead control, dashboards, job tracking, approvals, or reporting.",
  },
  {
    title: "3. We show you what the next step looks like",
    description:
      "That may be a discovery session, a tailored demo direction, or a clear rollout plan. There is no hard sell and no pressure to force a bad fit.",
  },
];

const prepItems = [
  "Your main operational bottleneck or the workflow that feels messy",
  "What owners or managers currently cannot see quickly enough",
  "Which team members need role-based visibility or controls",
  "Any current tools, spreadsheets, WhatsApp flows, or reports you rely on",
];

export default function ContactPage() {
  return (
    <div className="bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.12),transparent_26rem),linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)]">
      <div className="section-shell py-12 sm:py-16">
      <SectionHeading
        badge="Contact"
        title={
          <>
            Let&apos;s Build The{" "}
            <span className="heading-gradient">System Your Business Needs</span>
          </>
        }
        description="Choose your preferred channel or submit the form and we will get back to you quickly."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <div className="space-y-5">
          <article className="glass-card p-6">
            <h2 className="font-heading text-2xl font-semibold text-[#111111]">
              Direct Contact
            </h2>
            <div className="mt-5 space-y-3">
              <a
                href={`https://wa.me/${siteConfig.phonePlain.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3 text-[#2a2a2a]"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp {siteConfig.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3 text-[#2a2a2a]"
              >
                <Mail className="h-5 w-5" />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phonePlain}`}
                className="flex items-center gap-3 rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3 text-[#2a2a2a]"
              >
                <Phone className="h-5 w-5 text-[#6b6c70]" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
          </article>

          <article className="glass-card p-6">
            <h2 className="font-heading text-2xl font-semibold text-[#111111]">
              Business Problem Checklist
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#555962]">
              If you checked more than two of these, your business is likely ready
              for a proper system:
            </p>
            <ul className="mt-5 space-y-2 text-sm text-[#3d4147]">
              {checklist.map((item) => (
                <li key={item} className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="glass-card p-6">
            <h2 className="font-heading text-2xl font-semibold text-[#111111]">
              What Happens After You Submit
            </h2>
            <div className="mt-5 space-y-3">
              {nextSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-4"
                >
                  <h3 className="font-heading text-lg font-semibold text-[#111111]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#555962]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[8px] border border-[#111111]/10 bg-white p-6 shadow-[0_18px_45px_rgba(17,17,17,0.06)]">
            <h2 className="font-heading text-2xl font-semibold text-[#111111]">
              Strong Next Step
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#555962]">
              Most businesses hear back within one business day. The first call is
              for diagnosis and fit, not a pressured pitch. We want to understand
              the operation before recommending technology.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/demos" className="cta-secondary">
                See Demos
              </Link>
              <Link href="/services" className="cta-secondary">
                View Services
              </Link>
            </div>
          </article>
        </div>

        <div className="space-y-5">
          <article className="rounded-[8px] border border-[#111111]/10 bg-white p-6 shadow-[0_18px_45px_rgba(17,17,17,0.06)]">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
              Before the first call
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-[#111111]">
              Bring these points and we can make the conversation useful fast
            </h2>
            <ul className="mt-5 space-y-2 text-sm text-[#3d4147]">
              {prepItems.map((item) => (
                <li
                  key={item}
                  className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-7 text-[#555962]">
              If you are not sure yet, that is fine. Even a rough outline of the
              problem helps us guide the first step.
            </p>
          </article>

          <LeadForm
            compact
            tone="light"
            title="Request Your Discovery Call Or Demo Direction"
            subtitle="Tell us what is slowing the business down, what you want more control over, and how you would prefer us to contact you. We will use that context to make the first conversation practical."
          />
        </div>
      </div>
      </div>
    </div>
  );
}
