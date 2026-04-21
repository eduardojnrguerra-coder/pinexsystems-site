import Link from "next/link";
import { ArrowRight, BarChart3, BriefcaseBusiness, CheckCircle2, Target, Users } from "lucide-react";

import { LeakEstimator } from "@/components/home/leak-estimator";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";

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

export default function BusinessLossCalculatorPage() {
  return (
    <div className="bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.12),transparent_26rem),linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)]">
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
              <Link href="/contact#lead-form" className="cta-button">
                Book A Free Demo
              </Link>
              <Link href="/demos" className="cta-secondary">
                View System Demos
              </Link>
            </div>
          </div>
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
            A free discovery call helps identify the exact control layers your
            business needs to reduce missed leads, admin waste, and operational blind spots.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact#lead-form" className="cta-button">
              Book Your Free Discovery Call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}