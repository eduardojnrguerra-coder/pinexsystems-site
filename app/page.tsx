import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Gauge,
  Target,
  TrendingUp,
} from "lucide-react";

import { DemoCardGrid } from "@/components/demos/DemoCardGrid";
import { HeroBrandLockup } from "@/components/home/HeroBrandLockup";
import { MiniCalculator } from "@/components/home/mini-calculator";
import { Reveal } from "@/components/ui/reveal";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title:
    "Custom Business Systems & Automation South Africa | Pine X Systems",
  description:
    "Pine X Systems builds custom business dashboards, lead management, staff workflows, job tracking, and automation tools for South African businesses.",
  path: "/",
  keywords: [
    "custom business systems south africa",
    "business automation software south africa",
    "owner dashboard software",
    "dealership management software south africa",
    "workshop management system south africa",
    "lead management system south africa",
    "workflow automation software south africa",
  ],
});

const quickValue = [
  "Capture every lead",
  "Track staff work",
  "Live owner dashboard",
  "Automate follow-ups",
  "Control jobs and stock",
];

const serviceCards = [
  {
    title: "Owner Dashboard",
    description: "Live clarity across leads, jobs, reporting, and operational risk.",
    href: "/services",
  },
  {
    title: "Lead Management",
    description: "Capture every enquiry, assign ownership, and stop silent lead loss.",
    href: "/services",
  },
  {
    title: "Staff Workflows",
    description: "See who is doing what, what is late, and where work is slowing down.",
    href: "/services",
  },
  {
    title: "Job Cards",
    description: "Digitise operational work with status, handovers, notes, and accountability.",
    href: "/services",
  },
  {
    title: "Stock Control",
    description: "Track movement, reorder points, and shortages before they create delays.",
    href: "/services",
  },
  {
    title: "Automated Reports",
    description: "Generate management reporting automatically instead of chasing updates.",
    href: "/services",
  },
];

const howItWorks = [
  {
    step: "1",
    title: "Discovery Call",
    description: "We map pressure points, missed visibility, and what the owner needs to control.",
  },
  {
    step: "2",
    title: "System Blueprint",
    description: "You get a clear control-layer plan with dashboards, logic, roles, and automations.",
  },
  {
    step: "3",
    title: "Demo Build",
    description: "A tailored preview validates the operating flow before full implementation starts.",
  },
  {
    step: "4",
    title: "Launch & Improve",
    description: "The system goes live, the team is trained, and the control layer evolves with the business.",
  },
];

const trustBlocks = [
  {
    icon: Target,
    title: "What owners usually fix first",
    description:
      "Most projects start by closing the most expensive leak first: missed leads, weak follow-up, delayed job visibility, or manual reporting pressure.",
    points: [
      "Missed or stale enquiries",
      "No clear task ownership",
      "Slow reporting to owners",
    ],
  },
  {
    icon: ClipboardList,
    title: "What the first system usually includes",
    description:
      "We focus the first Pine X build around one working control layer instead of trying to digitise the whole business in one jump.",
    points: [
      "Role-based dashboards",
      "Workflow stages and handovers",
      "Alerts, reminders, and audit history",
    ],
  },
  {
    icon: Gauge,
    title: "What happens after launch",
    description:
      "You do not get abandoned with a login and a hope. We refine the reporting, tighten the process, and help the team settle into the new operating rhythm.",
    points: [
      "Team onboarding support",
      "Iterative module improvement",
      "Owner visibility tuned over time",
    ],
  },
];

const typicalImpact = [
  {
    title: "Lead control example",
    description:
      "A business with scattered WhatsApp enquiries usually starts by centralising lead capture, assigning ownership, and tracking overdue follow-up visibly.",
    href: "/lead-management-system",
    label: "Lead management systems",
  },
  {
    title: "Operations control example",
    description:
      "A workshop or contractor often needs job progress, delayed items, and blocked work surfaced in one place before management can improve throughput.",
    href: "/business-loss-calculator",
    label: "Use the loss calculator",
  },
  {
    title: "Owner visibility example",
    description:
      "Owners usually want one trusted view of pipeline, workload, exceptions, and reporting so they can act earlier instead of waiting for manual updates.",
    href: "/owner-dashboard-system",
    label: "See owner dashboard pages",
  },
];

const strategicLinks = [
  { label: "Custom business systems", href: "/business-systems" },
  { label: "Owner dashboard systems", href: "/owner-dashboard-system" },
  { label: "Workshop management systems", href: "/workshop-management-system" },
  {
    label: "Dealership systems in South Africa",
    href: "/dealership-management-system-south-africa",
  },
];

const industryLinks = [
  { label: "Dealerships", href: "/industries" },
  { label: "Workshops", href: "/industries" },
  { label: "Agencies", href: "/industries" },
  { label: "Construction", href: "/industries" },
  { label: "View All", href: "/industries" },
];

function SectionBadge({
  children,
}: {
  children: string;
}) {
  return (
    <p className="inline-flex rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] border border-[#111111]/10 bg-white text-[#555962]">
      {children}
    </p>
  );
}

function ServiceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-[8px] border border-[#111111]/10 bg-white p-5 shadow-[0_12px_34px_rgba(17,17,17,0.05)] transition hover:border-[#67E8F9]/40"
    >
      <h3 className="font-heading text-lg font-semibold text-[#111111] group-hover:text-[#0b0c10]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#555962]">{description}</p>
      <div className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#67E8F9]">
        Learn more <ChevronRight className="h-3 w-3" />
      </div>
    </Link>
  );
}

function HowItWorksStep({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative">
      <div className="light-panel h-full rounded-[8px] p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9d9d1] bg-white text-sm font-semibold text-[#0b0c10]">
            {step}
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">Step</p>
            <h3 className="mt-1 font-heading text-lg font-semibold text-[#0b0c10]">{title}</h3>
          </div>
        </div>
        <p className="mt-4 text-sm leading-6 text-[#50545b]">{description}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="hero-stage relative overflow-hidden border-b border-[#111111]/10 bg-[#F7F7F2]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(103,232,249,0.08),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(96,165,250,0.05),transparent_40%)]" />
        <div className="section-shell relative py-12 sm:py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start xl:gap-12">
            <Reveal>
              <HeroBrandLockup />
              <SectionBadge>Custom Business Control Systems</SectionBadge>
              <h1 className="mt-5 font-heading text-[2rem] font-semibold leading-[1.1] text-[#0b0c10] sm:text-[2.5rem] lg:text-[2.2rem] xl:text-[2.5rem]">
                Your Business Is Leaking Money In Places You Cannot See
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#555962] sm:text-lg">
                Pine X Systems builds custom dashboards, lead systems, staff
                workflows, job tracking, automation, and reporting tools that
                expose operational gaps before they cost you more money.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/contact#lead-form" className="cta-button">
                  Book A Free Demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/demos" className="cta-secondary">
                  View Live Demos
                </Link>
              </div>

              <div className="mt-8">
                <p className="mb-3 text-[11px] uppercase tracking-[0.16em] text-[#a8a8a2]">Why business owners trust us</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: CheckCircle2, text: "Free 30-minute discovery call" },
                    { icon: CheckCircle2, text: "Built around your workflow" },
                    { icon: CheckCircle2, text: "South African business experts" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 rounded-full border border-[#111111]/10 bg-white px-4 py-2 text-sm text-[#555962] shadow-[0_4px_12px_rgba(17,17,17,0.04)]"
                    >
                      <item.icon className="h-4 w-4 text-[#67E8F9]" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <div className="relative">
                <MiniCalculator />
              </div>
            </Reveal>
          </div>

          <div className="mt-12 lg:mt-16">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-[11px] uppercase tracking-[0.16em] text-[#a8a8a2]">Built for</span>
              <div className="flex flex-wrap justify-center gap-2">
                {industryLinks.slice(0, -1).map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-full border border-[#111111]/15 bg-white px-5 py-2.5 text-sm font-medium text-[#555962] shadow-[0_4px_16px_rgba(17,17,17,0.06)] transition-all hover:border-[#67E8F9]/40 hover:text-[#111111] hover:shadow-[0_6px_24px_rgba(17,17,17,0.1)]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <Link
                href={industryLinks[industryLinks.length - 1].href}
                className="text-sm font-medium text-[#67E8F9] transition hover:text-[#0e7490]"
              >
                View all industries
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="value-strip-section border-b border-[#111111]/10 bg-[linear-gradient(90deg,#F7F7F2_0%,#F3F2EE_50%,#F7F7F2_100%)] py-8">
        <div className="section-shell">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {quickValue.map((item, index) => (
              <Reveal key={item} delayMs={index * 45}>
                <div className="flex items-center gap-2 rounded-[8px] border border-[#111111]/10 bg-white px-4 py-3 text-sm text-[#111111] shadow-[0_12px_34px_rgba(17,17,17,0.05)]">
                  <span className="live-dot h-2 w-2" />
                  <span>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="services-preview-section bg-[linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)] py-16 sm:py-20">
        <div className="section-shell">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center text-[#0b0c10]">
              <SectionBadge>What We Build</SectionBadge>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                Control Layers Designed Around Your Business
              </h2>
              <p className="mt-4 text-base leading-8 text-[#555962] sm:text-lg">
                Each module solves a specific operational problem. Choose what
                your business needs now and grow the platform as you evolve.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((card, index) => (
              <Reveal key={card.title} delayMs={index * 40}>
                <ServiceCard {...card} />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111]">
              View All Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[#d9d9d1] bg-[#F7F7F2] py-16 sm:py-20">
        <div className="section-shell">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center text-[#0b0c10]">
              <SectionBadge>Trust Through Structure</SectionBadge>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                Pine X Systems Is Built Around Operational Control, Not Hype
              </h2>
              <p className="mt-4 text-base leading-8 text-[#555962] sm:text-lg">
                We do not rely on vague transformation language. We map the
                workflow, define the control points, and build the visibility
                layer owners and managers actually need.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {trustBlocks.map((block, index) => {
              const Icon = block.icon;

              return (
                <Reveal key={block.title} delayMs={index * 45}>
                  <article className="light-panel rounded-[8px] p-6">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#111111]/10 bg-white">
                      <Icon className="h-5 w-5 text-[#111111]" />
                    </span>
                    <h3 className="mt-5 font-heading text-xl font-semibold text-[#0b0c10]">
                      {block.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[#555962]">
                      {block.description}
                    </p>
                    <ul className="mt-5 space-y-2 text-sm text-[#3d4147]">
                      {block.points.map((point) => (
                        <li
                          key={point}
                          className="rounded-[8px] border border-[#111111]/10 bg-white px-4 py-3"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <article className="rounded-[8px] border border-[#111111]/10 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.06)] sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
                  Typical system impact
                </p>
                <h3 className="mt-3 font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
                  Honest examples of where businesses usually feel the gain first
                </h3>
                <div className="mt-6 space-y-4">
                  {typicalImpact.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-4"
                    >
                      <h4 className="font-heading text-lg font-semibold text-[#111111]">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-sm leading-7 text-[#555962]">
                        {item.description}
                      </p>
                      <Link
                        href={item.href}
                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#111111]"
                      >
                        {item.label} <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>

            <Reveal delayMs={80}>
              <article className="light-panel rounded-[8px] p-6 sm:p-8">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
                  Useful next steps
                </p>
                <h3 className="mt-3 font-heading text-2xl font-semibold text-[#111111]">
                  Start with the pages most relevant to your business
                </h3>
                <div className="mt-6 grid gap-3">
                  {strategicLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center justify-between rounded-[8px] border border-[#111111]/10 bg-white px-4 py-3 text-sm font-medium text-[#3d4147] transition hover:border-[#67E8F9]/40 hover:text-[#111111]"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="h-4 w-4 text-[#67E8F9]" />
                    </Link>
                  ))}
                </div>
                <div className="mt-6 rounded-[8px] border border-[#111111]/10 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="mt-0.5 h-5 w-5 text-[#111111]" />
                    <div>
                      <h4 className="font-heading text-base font-semibold text-[#111111]">
                        Want a fast operational estimate first?
                      </h4>
                      <p className="mt-2 text-sm leading-7 text-[#555962]">
                        Use the business loss calculator to estimate where weak
                        follow-up, manual admin, and process gaps may be costing
                        you each month.
                      </p>
                      <Link
                        href="/business-loss-calculator"
                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#111111]"
                      >
                        Open the calculator <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="demo-preview-section border-y border-[#d9d9d1] bg-[#F7F7F2] py-16 sm:py-20">
        <div className="section-shell">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center text-[#0b0c10]">
              <SectionBadge>Live System Previews</SectionBadge>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                See Real Control Systems In Action
              </h2>
              <p className="mt-4 text-base leading-8 text-[#555962] sm:text-lg">
                Explore interactive demos built for different industries. Each
                shows the kind of control layer Pine X Systems can build.
              </p>
            </div>
          </Reveal>

          <div className="mt-10">
            <DemoCardGrid tone="light" compact />
          </div>

          <div className="mt-8 text-center">
            <Link href="/demos" className="cta-button">
              Browse All Demos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="how-it-works-section bg-[linear-gradient(180deg,#ECEAE4_0%,#F7F7F2_100%)] py-16 sm:py-20">
        <div className="section-shell">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center text-[#0b0c10]">
              <SectionBadge>How It Works</SectionBadge>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                A Clear Path From Messy Operations To Working System
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 lg:grid-cols-4">
            {howItWorks.map((step, index) => (
              <Reveal key={step.step} delayMs={index * 40}>
                <HowItWorksStep
                  step={step.step}
                  title={step.title}
                  description={step.description}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta-section relative overflow-hidden border-t border-[#111111]/10 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.16),transparent_25%),linear-gradient(180deg,#ECEAE4_0%,#F7F7F2_100%)] py-16 sm:py-20">
        <div className="section-shell relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <SectionBadge>Ready To Take Control?</SectionBadge>
            <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[#111111] sm:text-4xl">
              Stop Running Your Business Blind
            </h2>
            <p className="mt-4 text-base leading-8 text-[#555962] sm:text-lg">
              If your business depends on scattered messages, spreadsheets,
              memory, and manual follow-ups, you are losing money quietly. Let us
              show you what a proper control system could look like.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/contact#lead-form" className="cta-button">
                Book My Free Demo
              </Link>
              <Link href="/business-loss-calculator" className="cta-secondary">
                Try The Loss Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
