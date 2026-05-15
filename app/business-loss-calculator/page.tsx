import Link from "next/link";
import { ArrowRight, BarChart3, BriefcaseBusiness, Target, Users } from "lucide-react";

import { LeakEstimator } from "@/components/home/leak-estimator";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { SchemaScript } from "@/components/ui/schema-script";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata = createPageMetadata({
  title:
    "Business Loss Calculator | Operational Leakage Estimator South Africa",
  description:
    "Calculate how much revenue your business loses through missed leads, poor follow-up, and admin waste. See your estimated monthly and yearly operational leakage.",
  path: "/business-loss-calculator",
  keywords: [
    "business loss calculator south africa",
    "operational leakage calculator",
    "business leakage calculator",
    "missed leads calculator",
    "revenue loss calculator",
    "admin waste calculator",
    "lead follow-up calculator",
    "business automation roi calculator",
  ],
});

const calculatorFaq = [
  {
    question: "How accurate is this calculator?",
    answer:
      "This calculator provides a reasonable estimate based on industry averages and your inputs. Actual results vary based on lead quality, close rates, margins, and internal processes. Use it as a starting point to understand the scale of potential leakage in your business.",
  },
  {
    question: "What counts as a missed lead?",
    answer:
      "A missed lead is any enquiry that receives delayed follow-up (more than 24-48 hours), unclear ownership, or no structured follow-up at all. This includes WhatsApp messages, phone calls, website forms, walk-ins, and social media enquiries.",
  },
  {
    question: "Why does admin waste matter?",
    answer:
      "Manual admin tasks like updating spreadsheets, sending repeated messages, and chasing updates consume hours each week. This time has an opportunity cost - your team could be working on revenue-generating activities instead.",
  },
  {
    question: "How do I reduce this leakage?",
    answer:
      "The most effective approach is implementing a connected business control system with lead management, workflow automation, and owner dashboard visibility. This eliminates scattered messages, unclear ownership, and manual follow-up.",
  },
  {
    question: "Is this relevant for small businesses?",
    answer:
      "Yes. Even small businesses with few staff members experience leakage through missed follow-up, manual admin, and poor visibility. The impact is proportionally significant because every enquiry matters more in a smaller operation.",
  },
];

const benefits = [
  {
    icon: Target,
    title: "Lead Management",
    description: "Capture every enquiry and ensure proper follow-up with clear ownership.",
  },
  {
    icon: Users,
    title: "Staff Workflows",
    description: "See who is doing what, what is overdue, and where work is slowing down.",
  },
  {
    icon: BarChart3,
    title: "Owner Dashboard",
    description: "Get live visibility across leads, jobs, staff, and operational performance.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Workflow Automation",
    description: "Reduce manual tasks and keep your business processes flowing smoothly.",
  },
];

const leakageCauses = [
  {
    title: "Lead follow-up without ownership",
    description:
      "Enquiries land in WhatsApp, email, phone calls, or walk-ins, but nobody can see clearly who owns the next action or how long the lead has been waiting.",
  },
  {
    title: "Manual reporting delays",
    description:
      "Owners and managers only discover the real picture after someone has cleaned a spreadsheet or manually compiled updates from several departments.",
  },
  {
    title: "Scattered operational handovers",
    description:
      "Jobs, bookings, approvals, and customer updates move through informal messages instead of one visible workflow, which creates repeat delays and missed steps.",
  },
  {
    title: "Admin that should be automated",
    description:
      "Teams burn hours on reminders, repeated status checks, duplicated data entry, and chasing information that should already be visible in the system.",
  },
];

const nextSteps = [
  "Review which part of the estimate feels most believable: missed leads, weak reporting, or manual admin pressure.",
  "Map the workflow where that leakage starts so you can see what should be tracked, automated, or escalated.",
  "Use a demo or discovery call to turn the estimate into a practical control-layer plan for your business.",
];

const industryLinks = [
  { label: "Workshop management systems", href: "/workshop-management-system" },
  {
    label: "Dealership systems in South Africa",
    href: "/dealership-management-system-south-africa",
  },
  { label: "Construction business systems", href: "/construction-business-system" },
  { label: "Warehouse stock systems", href: "/warehouse-stock-system" },
];

const relatedResources = [
  { label: "Custom business systems", href: "/business-systems" },
  { label: "Owner dashboard systems", href: "/owner-dashboard-system" },
  { label: "Lead management systems", href: "/lead-management-system" },
  { label: "Interactive demo systems", href: "/demos" },
  { label: "Insights hub", href: "/insights" },
  {
    label: "What the calculator numbers really mean",
    href: "/insights/business-loss-calculator-what-the-numbers-really-mean",
  },
];

export default function BusinessLossCalculatorPage() {
  return (
    <div className="bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.12),transparent_26rem),linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)]">
      <SchemaScript
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Business Loss Calculator", path: "/business-loss-calculator" },
        ])}
      />
      <SchemaScript data={faqSchema(calculatorFaq)} />
      <div className="section-shell py-12 sm:py-16">
        <SectionHeading
          badge="Business Loss Calculator"
          title={
            <>
              Calculate Your{" "}
              <span className="heading-gradient">Operational Leakage</span>
            </>
          }
          description="See how much revenue your business loses through missed follow-up, admin waste, and operational gaps. Adjust the numbers to match your reality."
        />

        <div className="mt-10">
          <LeakEstimator />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="glass-card p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
              Plain-language explanation
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
              What “operational leakage” actually means
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-[#555962] sm:text-base">
              <p>
                Operational leakage is the quiet loss created when your business
                cannot capture, follow up, track, or report work cleanly enough.
                It is not always obvious because it hides inside slow follow-up,
                missed reminders, repeated admin, poor visibility, and delayed
                decisions.
              </p>
              <p>
                This calculator is designed to help owners and managers put rough
                numbers to that hidden pressure. It does not replace a financial
                model, but it is useful for estimating how expensive weak process
                control may already be.
              </p>
            </div>
          </article>

          <article className="rounded-[8px] border border-[#111111]/10 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.06)] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
              Why this matters
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
              Owners and managers use this estimate differently
            </h2>
            <div className="mt-5 space-y-3">
              {[
                "Owners use it to understand whether weak control may already be hurting margin and growth capacity.",
                "Managers use it to explain why follow-up discipline, approvals, and reporting structure need attention now rather than later.",
                "Operational teams use it to identify which workflow deserves a proper system first.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3 text-sm leading-7 text-[#555962]"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
              What The Calculator Measures
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#555962] sm:text-base">
              This calculator estimates two key types of business leakage that quietly
              drain revenue from South African operations every month.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-[8px] border border-[#111111]/10 bg-white p-5 shadow-[0_12px_34px_rgba(17,17,17,0.05)]">
                <h3 className="font-heading text-lg font-semibold text-[#111111]">
                  Revenue At Risk
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#555962]">
                  The estimated value of leads that go cold due to delayed or missed
                  follow-up. Calculated using your close rate and gross margin.
                </p>
              </div>

              <div className="rounded-[8px] border border-[#111111]/10 bg-white p-5 shadow-[0_12px_34px_rgba(17,17,17,0.05)]">
                <h3 className="font-heading text-lg font-semibold text-[#111111]">
                  Admin Waste
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#555962]">
                  The cost of manual processes, scattered updates, and repeated
                  admin work that could be automated or streamlined.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
              How To Reduce Leakage
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#555962] sm:text-base">
              A connected business control system addresses both types of leakage
              by bringing everything into one organized layer.
            </p>

            <div className="mt-6 grid gap-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="rounded-[8px] border border-[#111111]/10 bg-white p-4 shadow-[0_12px_34px_rgba(17,17,17,0.05)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2]">
                        <Icon className="h-5 w-5 text-[#67E8F9]" />
                      </span>
                      <div>
                        <h3 className="font-heading text-base font-semibold text-[#111111]">
                          {benefit.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-[#555962]">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/contact#lead-form" className="cta-button" data-event="free_audit_click">
                Get My Free System Audit
              </Link>
              <Link href="/demos" className="cta-secondary" data-event="demo_click">
                View Live Demo Systems
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="glass-card p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
              Common causes of leakage in real operations
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {leakageCauses.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-4"
                >
                  <h3 className="font-heading text-lg font-semibold text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#555962]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
              What to do after you see the result
            </h2>
            <div className="mt-6 space-y-3">
              {nextSteps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-4"
                >
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#555962]">{step}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <article className="rounded-[8px] border border-[#111111]/10 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.06)] sm:p-8">
            <h2 className="font-heading text-2xl font-semibold text-[#111111]">
              Industry pages that make this estimate more specific
            </h2>
            <div className="mt-5 grid gap-3">
              {industryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3 text-sm font-medium text-[#3d4147] transition hover:border-[#67E8F9]/40 hover:text-[#111111]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </article>

          <article className="glass-card p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-semibold text-[#111111]">
              Related pages to keep exploring
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {relatedResources.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-[8px] border border-[#111111]/10 bg-white px-4 py-3 text-sm font-medium text-[#3d4147] transition hover:border-[#67E8F9]/40 hover:text-[#111111]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-16">
          <h2 className="font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-6">
            <FaqAccordion items={calculatorFaq} />
          </div>
        </div>

        <div className="mt-16 rounded-[8px] border border-[#111111]/10 bg-white p-6 text-center shadow-[0_24px_70px_rgba(17,17,17,0.08)] sm:p-8">
          <h2 className="font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
            Ready To Close The Leakage Gaps?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#555962] sm:text-base">
            A free system audit helps identify the exact control layers your
            business needs to reduce missed leads, admin waste, and operational blind spots.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact#lead-form" className="cta-button" data-event="free_audit_click">
              Get My Free System Audit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
