import Link from "next/link";
import {
  type LucideIcon,
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Gauge,
  LineChart,
  LockKeyhole,
  MessageSquare,
  PhoneMissed,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Workflow,
} from "lucide-react";

import { DemoCardGrid } from "@/components/demos/DemoCardGrid";
import { HeroVisualLayer } from "@/components/HeroVisualLayer";
import { DemoSelector } from "@/components/home/demo-selector";
import { HeroLogoReveal } from "@/components/home/HeroLogoReveal";
import { LeakEstimator } from "@/components/home/leak-estimator";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { LeadForm } from "@/components/ui/lead-form";
import { Reveal } from "@/components/ui/reveal";
import { homeFaq } from "@/lib/content/core";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Pine X Systems | Custom Business Systems & Automation South Africa",
  description:
    "Pine X Systems builds custom business dashboards, automation platforms, lead systems, staff workflows, and operational tools for South African businesses.",
  path: "/",
  keywords: [
    "Custom business systems South Africa",
    "Business automation South Africa",
    "Custom CRM South Africa",
    "Business dashboard systems",
    "Operations management system",
    "Dealership management system South Africa",
    "Workshop management system",
    "Lead management system",
    "Business process automation",
    "Owner dashboard for business",
  ],
});

const heroMetrics = [
  {
    label: "Leads captured",
    value: "184",
    detail: "+22 qualified this month",
    progress: 86,
  },
  {
    label: "Jobs in progress",
    value: "38",
    detail: "7 due today",
    progress: 74,
  },
  {
    label: "Staff tasks",
    value: "126",
    detail: "91% on time",
    progress: 91,
  },
  {
    label: "Stock alerts",
    value: "12",
    detail: "4 high priority",
    progress: 48,
  },
  {
    label: "Follow-up risk",
    value: "3",
    detail: "Needs action today",
    progress: 24,
  },
  {
    label: "System health",
    value: "92%",
    detail: "Layers connected",
    progress: 92,
  },
];

const heroNotes = [
  {
    title: "Follow-up automated",
    detail: "6 finance reminders sent from the workflow",
    className: "right-[-0.75rem] top-[0.25rem] hidden 2xl:block",
  },
  {
    title: "Owner report generated",
    detail: "Daily control summary delivered to management",
    className: "right-[-0.35rem] bottom-[2rem] hidden xl:block",
  },
];

const valueStrip = [
  "Stop missed leads",
  "Track staff work",
  "See live business data",
  "Automate follow-ups",
  "Control jobs and stock",
  "Build around your workflow",
];

const controlFlow = [
  { label: "Leads", icon: Target },
  { label: "Sales", icon: TrendingUp },
  { label: "Jobs", icon: ClipboardList },
  { label: "Staff", icon: Users },
  { label: "Stock", icon: Boxes },
  { label: "Reports", icon: BarChart3 },
  { label: "Owner Dashboard", icon: Gauge },
];

const riskCards = [
  {
    title: "Missed Leads",
    detail:
      "Leads arrive from WhatsApp, websites, calls, forms, and social media, but without a proper lead management system, follow-ups are missed and sales opportunities go cold.",
    impact: "High cost impact",
    icon: PhoneMissed,
    featured: true,
  },
  {
    title: "Weak Staff Visibility",
    detail:
      "Owners cannot control what they cannot see. A staff workflow system shows who is responsible, what is overdue, and where work is slowing down.",
    impact: "Visibility risk",
    icon: Users,
  },
  {
    title: "Manual Admin",
    detail:
      "Spreadsheets, repeated messages, and manual updates waste time. Business process automation helps reduce admin and keeps workflows moving.",
    impact: "Time leakage",
    icon: ClipboardList,
  },
  {
    title: "Late Reports",
    detail:
      "If reports only arrive after the problem has already cost money, the business is running blind. A live owner dashboard gives faster visibility.",
    impact: "Control gap",
    icon: Clock3,
  },
  {
    title: "Stock Blind Spots",
    detail:
      "Poor stock visibility causes delays, lost sales, and frustrated customers. A stock management system helps track stock movement and reorder risks.",
    impact: "Revenue leak",
    icon: Boxes,
  },
  {
    title: "No Owner Dashboard",
    detail:
      "Without one central operations dashboard, owners have to guess what is happening across leads, jobs, staff, stock, and revenue.",
    impact: "Decision risk",
    icon: Gauge,
    featured: true,
  },
];

const beforeItems = [
  "WhatsApp updates",
  "Spreadsheet stock",
  "Manual job cards",
  "Missed calls",
  "No owner dashboard",
];

const afterItems = [
  "Live dashboard",
  "Lead pipeline",
  "Staff task control",
  "Job tracking",
  "Automated follow-ups",
];

const modules = [
  {
    title: "Owner Dashboard",
    description: "Live clarity across leads, jobs, reporting, and operational risk.",
    chip: "Owner view",
    icon: Gauge,
  },
  {
    title: "Lead Management",
    description: "Capture every enquiry, assign ownership, and stop silent lead loss.",
    chip: "Visibility",
    icon: Target,
  },
  {
    title: "Sales Pipeline",
    description: "Track movement from first contact to payment with stage-by-stage control.",
    chip: "Workflow",
    icon: TrendingUp,
  },
  {
    title: "Staff Workflows",
    description: "See who is doing what, what is late, and where work is getting stuck.",
    chip: "Workflow",
    icon: Users,
  },
  {
    title: "Job Cards",
    description: "Digitise operational work with status, handovers, notes, and accountability.",
    chip: "Operations",
    icon: ClipboardList,
  },
  {
    title: "Stock Control",
    description: "Track movement, reorder points, and shortages before they create delays.",
    chip: "Control",
    icon: Boxes,
  },
  {
    title: "Client Portal",
    description: "Give customers a premium place to view progress, updates, and approvals.",
    chip: "Client view",
    icon: BriefcaseBusiness,
  },
  {
    title: "Automated Reports",
    description: "Generate management reporting automatically instead of chasing updates.",
    chip: "Automation",
    icon: BarChart3,
  },
  {
    title: "Follow-Up Automation",
    description: "Trigger reminders and sequences so prospects never disappear in silence.",
    chip: "Automation",
    icon: MessageSquare,
  },
  {
    title: "AI Recommendations",
    description: "Spot missed action, weak follow-up, and the next problem worth attention.",
    chip: "AI layer",
    icon: Bot,
  },
  {
    title: "Finance Visibility",
    description: "Watch margin pressure, collections, and performance from one clean layer.",
    chip: "Finance",
    icon: CircleDollarSign,
  },
  {
    title: "Role-Based Access",
    description: "Owners, managers, staff, and clients each get the right view and permissions.",
    chip: "Security",
    icon: LockKeyhole,
  },
];

const aiSignals = [
  "Missed lead warnings",
  "Staff delay alerts",
  "Stock risk alerts",
  "Revenue visibility",
  "Follow-up suggestions",
  "Daily owner summaries",
];

const aiRecommendations = [
  "3 leads have not been contacted within 24 hours",
  "Workshop job JC-48 is waiting on parts",
  "Stock item brake pads is below reorder level",
  "Salesperson follow-up activity dropped this week",
];

const timeline = [
  {
    title: "Discovery Call",
    description:
      "We map pressure points, missed visibility, and what the owner needs to control.",
  },
  {
    title: "Workflow Mapping",
    description:
      "We document how leads, jobs, stock, staff, and reporting actually move today.",
  },
  {
    title: "System Blueprint",
    description:
      "You get a clear control-layer plan with dashboards, logic, roles, and automations.",
  },
  {
    title: "Demo Build",
    description:
      "A tailored preview validates the operating flow before full implementation starts.",
  },
  {
    title: "Full Build",
    description:
      "We build the complete platform around your business instead of forcing a generic tool.",
  },
  {
    title: "Launch & Improve",
    description:
      "The system goes live, the team is trained, and the control layer evolves with the business.",
  },
];

function SectionBadge({
  children,
  tone = "dark",
}: {
  children: string;
  tone?: "dark" | "light";
}) {
  return (
    <p
      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] ${
        tone === "light"
          ? "border border-[#d9d9d1] bg-white text-[#5b5f66]"
          : "border border-[#111111]/10 bg-white text-[#555962]"
      }`}
    >
      {children}
    </p>
  );
}

function HeroMetricCard({
  label,
  value,
  detail,
  progress,
}: {
  label: string;
  value: string;
  detail: string;
  progress: number;
}) {
  return (
    <div className="dashboard-metric-card min-w-0 rounded-[8px] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#a8a8a2]">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        </div>
        <div className="live-indicator hidden shrink-0 rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] text-[#d8d8d2] sm:inline-flex">
          <span className="live-dot" /> Live
        </div>
      </div>
      <p className="mt-2 text-xs text-[#a8a8a2]">{detail}</p>
      <div className="mt-4 h-1.5 rounded-full bg-white/8">
        <div
          className="metric-bar-fill animate-gradient h-full rounded-full bg-[linear-gradient(90deg,rgba(247,247,242,0.95),rgba(103,232,249,0.78),rgba(96,165,250,0.78))]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function FloatingHeroNote({
  title,
  detail,
  className,
}: {
  title: string;
  detail: string;
  className: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-30 max-w-[172px] rounded-[8px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.035))] px-3 py-2.5 shadow-[0_16px_44px_rgba(0,0,0,0.28)] backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#a8a8a2]">
        <span className="live-dot" /> Live flag
      </div>
      <p className="mt-1.5 text-[13px] font-medium text-white">{title}</p>
      <p className="mt-1 text-[11px] leading-5 text-[#d8d8d2]">{detail}</p>
    </div>
  );
}

function RiskCard({
  icon: Icon,
  title,
  detail,
  impact,
  featured = false,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
  impact: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`risk-card card-lift rounded-[8px] border border-[#111111]/10 p-6 ${
        featured
          ? "min-h-[18rem] bg-[linear-gradient(135deg,#ffffff_0%,#f7f7f2_62%,rgba(103,232,249,0.08)_100%)] shadow-[0_22px_55px_rgba(17,17,17,0.08)]"
          : "bg-white shadow-[0_18px_45px_rgba(17,17,17,0.06)]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] text-[#111111]">
          <Icon className="h-5 w-5" />
        </span>
        <span className="rounded-full border border-[#F5D36C]/45 bg-[#F5D36C]/18 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#7a5200]">
          {impact}
        </span>
      </div>
      <h3 className="mt-5 font-heading text-xl font-semibold text-[#111111]">{title}</h3>
      <p className="mt-3 text-[0.95rem] leading-7 text-[#555962]">{detail}</p>
    </article>
  );
}

function ModuleCard({
  icon: Icon,
  title,
  description,
  chip,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  chip: string;
}) {
  return (
    <article className="module-select-card card-lift rounded-[8px] border border-[#111111]/10 bg-white p-5 shadow-[0_18px_45px_rgba(17,17,17,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] text-[#111111]">
          <Icon className="h-5 w-5" />
        </span>
        <span className="rounded-full border border-[#111111]/10 bg-[#F7F7F2] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#555962]">
          {chip}
        </span>
      </div>
      <h3 className="mt-5 font-heading text-lg font-semibold text-[#111111]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[#555962]">{description}</p>
      <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#67E8F9]/35 bg-[#67E8F9]/14 px-3 py-1.5 text-xs font-medium text-[#0e7490]">
        <span className="live-dot h-2 w-2" /> Add to system
      </div>
    </article>
  );
}

function ProcessStep({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  return (
    <div className="relative">
      <div className="light-panel process-step-card h-full rounded-[8px] p-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d9d9d1] bg-white text-sm font-semibold text-[#0b0c10]">
            {index + 1}
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">Step {index + 1}</p>
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
      <section className="hero-stage relative overflow-hidden border-b border-[#111111]/10">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-sheen" aria-hidden="true" />
        <HeroVisualLayer />
        <div className="radial-glow radial-glow-top" aria-hidden="true" />
        <div className="hero-separator-fade" aria-hidden="true" />
        <div className="section-shell relative z-10 pt-20 pb-12 sm:pt-24 lg:pt-28 lg:pb-16">
          <HeroLogoReveal />
          <div className="grid min-w-0 gap-10 lg:min-h-[640px] lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.82fr)] lg:items-center lg:gap-10 xl:gap-14">
            <div className="hero-copy-panel relative z-40 min-w-0 lg:pr-4">
              <Reveal>
                <SectionBadge>Custom Business Control Systems</SectionBadge>
                <h1 className="mt-5 max-w-full font-heading text-[2.05rem] font-semibold leading-[1.08] text-[#0b0c10] sm:max-w-[43rem] sm:text-balance sm:text-[3rem] sm:leading-[1.05] lg:text-[2.4rem] xl:text-[2.6rem] 2xl:text-[2.8rem]">
                  <span className="block xl:whitespace-nowrap">Your Business Is Leaking Money</span>
                  <span className="block text-[#20242a] xl:whitespace-nowrap">In Places You Can&apos;t See</span>
                </h1>
                <p className="mt-5 max-w-[36rem] text-base leading-8 text-[#343941] sm:text-lg">
                  Pine X Systems builds custom dashboards, lead systems, staff workflows,
                  job tracking, automation, and reporting tools that expose operational gaps
                  before they cost you more money.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/contact#lead-form" className="cta-button premium-glow animate-glow-pulse">
                    Find The Gaps In My Business <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="#system-examples" className="cta-secondary premium-glow">
                    View Live System Examples
                  </Link>
                </div>

                <div className="mt-7 flex flex-wrap gap-3 text-sm text-[#3f434a]">
                  {[
                    "Free 30-minute discovery call",
                    "Built around your workflow",
                    "Designed for South African businesses",
                  ].map((point) => (
                    <div
                      key={point}
                      className="hero-trust-pill flex items-center gap-2 rounded-full border border-[#111111]/10 bg-white px-4 py-2 shadow-[0_12px_34px_rgba(17,17,17,0.06)]"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#67E8F9]" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={90} className="min-w-0 lg:justify-self-end">
              <div className="relative z-20 mx-auto w-full min-w-0 max-w-[520px] lg:ml-auto xl:max-w-[550px]">
                <div className="command-network hidden lg:block" aria-hidden="true">
                  <span className="command-network-line" style={{ top: "24%", left: "10%", width: "44%", transform: "rotate(15deg)" }} />
                  <span className="command-network-line" style={{ top: "44%", left: "18%", width: "48%", transform: "rotate(-8deg)" }} />
                  <span className="command-network-line" style={{ top: "58%", left: "32%", width: "42%", transform: "rotate(22deg)" }} />
                  <span className="command-network-line" style={{ top: "30%", left: "38%", width: "28%", transform: "rotate(56deg)" }} />
                  <span className="command-network-dot" style={{ top: "20%", left: "9%" }} />
                  <span className="command-network-dot is-soft" style={{ top: "31%", left: "28%" }} />
                  <span className="command-network-dot" style={{ top: "45%", left: "20%" }} />
                  <span className="command-network-dot is-soft" style={{ top: "56%", left: "52%" }} />
                  <span className="command-network-dot" style={{ top: "69%", left: "72%" }} />
                </div>

                {heroNotes.map((note) => (
                  <FloatingHeroNote
                    key={note.title}
                    title={note.title}
                    detail={note.detail}
                    className={note.className}
                  />
                ))}

                <div className="dashboard-frame relative z-20 max-w-full overflow-hidden rounded-[8px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.13),rgba(255,255,255,0.03))] p-[1px] shadow-[0_40px_120px_rgba(0,0,0,0.38)]">
                  <div className="relative overflow-hidden rounded-[8px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,20,27,0.96),rgba(11,12,16,0.96))] p-4 sm:p-5">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.1),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.05),transparent_42%)]" />
                    <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
                    <div className="relative z-10 rounded-[8px] border border-white/10 bg-[rgba(11,12,16,0.72)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.16em] text-[#a8a8a2]">
                            Pine X Command Layer
                          </p>
                          <h2 className="mt-2 font-heading text-xl font-semibold text-white sm:text-2xl">
                            One crisp view of the business
                          </h2>
                        </div>
                        <div className="live-indicator rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-[#d8d8d2]">
                          <span className="live-dot" /> System live
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {heroMetrics.map((metric) => (
                          <HeroMetricCard key={metric.label} {...metric} />
                        ))}
                      </div>

                      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_0.92fr]">
                        <div className="rounded-[8px] border border-white/10 bg-white/[0.03] p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-white">Command network</p>
                              <p className="mt-1 text-xs text-[#a8a8a2]">
                                Leads, tasks, stock, and reports flowing into one control layer.
                              </p>
                            </div>
                            <Workflow className="h-4 w-4 text-[#67E8F9]" />
                          </div>
                          <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            {[
                              ["Lead capture", 82],
                              ["Task control", 68],
                              ["Owner visibility", 94],
                            ].map(([label, value]) => (
                              <div key={label as string} className="rounded-[8px] border border-white/10 bg-black/15 p-3">
                                <p className="text-[11px] uppercase tracking-[0.16em] text-[#a8a8a2]">
                                  {label as string}
                                </p>
                                <div className="mt-3 h-1.5 rounded-full bg-white/8">
                                  <div
                                    className="metric-bar-fill animate-gradient h-full rounded-full bg-[linear-gradient(90deg,rgba(247,247,242,0.95),rgba(103,232,249,0.75))]"
                                    style={{ width: `${value}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-[8px] border border-white/10 bg-white/[0.03] p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-white">Priority feed</p>
                              <p className="mt-1 text-xs text-[#a8a8a2]">
                                Small signals the owner should not miss today.
                              </p>
                            </div>
                            <Activity className="h-4 w-4 text-[#67E8F9]" />
                          </div>
                          <div className="mt-4 space-y-2">
                            {[
                              "New lead captured",
                              "Stock alert triggered",
                              "Manager report generated",
                              "Follow-up reminder sent",
                            ].map((item) => (
                              <div
                                key={item}
                                className="flex items-center gap-2 rounded-[8px] border border-white/10 bg-black/15 px-3 py-2 text-xs text-[#d8d8d2]"
                              >
                                <span className="live-dot h-2 w-2" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="value-strip-section border-b border-[#111111]/10">
        <div className="section-shell py-5">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            {valueStrip.map((item, index) => (
              <Reveal key={item} delayMs={index * 45}>
                <div className="value-strip-card card-lift rounded-[8px] border border-[#111111]/10 bg-white px-4 py-3 shadow-[0_12px_34px_rgba(17,17,17,0.05)]">
                  <div className="flex items-center gap-2 text-sm text-[#111111]">
                    <span className="live-dot h-2 w-2" />
                    <span>{item}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="control-layer-section border-b border-[#d9d9d1] bg-[#F7F7F2] py-16 sm:py-20 lg:py-24">
        <div className="section-shell">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center text-[#0b0c10]">
              <SectionBadge tone="light">The Control Layer Your Business Is Missing</SectionBadge>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                One connected layer instead of more disconnected apps
              </h2>
              <p className="mt-4 text-base leading-8 text-[#51555d] sm:text-lg">
                Most businesses do not need more disconnected apps. They need one connected
                layer that shows leads, jobs, staff, stock, follow-ups, and reports in one place.
              </p>
            </div>
          </Reveal>

          <div className="system-flow mt-10">
            {controlFlow.map((step, index) => {
              const Icon = step.icon;

              return (
                <Reveal key={step.label} delayMs={index * 40}>
                  <div className="system-flow-step">
                    <div className="light-panel system-flow-card flex min-h-[88px] min-w-[140px] items-center gap-3 rounded-[8px] px-4 py-4 text-left text-[#0b0c10]">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#d9d9d1] bg-white text-[#0b0c10]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-sm font-semibold">{step.label}</span>
                    </div>
                    {index < controlFlow.length - 1 ? (
                      <div className="system-flow-arrow flex items-center gap-2 px-1 text-[#60A5FA]">
                        <span className="command-network-dot is-soft relative static inline-flex" />
                        <ChevronRight className="h-4 w-4" />
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="money-leaks-section bg-[linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)] py-16 sm:py-20 lg:py-24">
        <div className="section-shell">
          <Reveal>
            <div className="max-w-3xl">
              <SectionBadge tone="light">Where Money Leaks</SectionBadge>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[#111111] sm:text-4xl">
                Where South African Businesses Lose Money Without Realising It
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#555962]">
                These are the quiet gaps that create missed revenue, weak follow-through,
                and poor owner visibility even when the team is working hard.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {riskCards.map((card, index) => (
              <Reveal key={card.title} delayMs={index * 45}>
                <RiskCard {...card} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="before-after-section border-y border-[#d9d9d1] bg-[linear-gradient(180deg,#f2f2ed_0%,#F7F7F2_100%)] py-16 sm:py-20 lg:py-24">
        <div className="section-shell">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center text-[#0b0c10]">
              <SectionBadge tone="light">Transformation</SectionBadge>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                From Scattered Operations To One Connected System
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <Reveal>
              <div className="chaos-stack rounded-[8px] border border-[#171a22] bg-[linear-gradient(180deg,#131720_0%,#0b0c10_100%)] p-6 text-[#f7f7f2] shadow-[0_24px_70px_rgba(17,24,39,0.22)]">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-2xl font-semibold">Before</h3>
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#d8d8d2]">
                    Chaos stack
                  </span>
                </div>
                <div className="mt-6 grid gap-3">
                  {beforeItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-[8px] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-[#d8d8d2]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={100}>
              <div className="relative flex min-h-24 items-center justify-center lg:min-h-[280px]">
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#67E8F9] to-transparent lg:hidden" />
                <div className="absolute top-1/2 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-[#67E8F9] to-transparent lg:block" />
                <div className="control-layer-chip rounded-[8px] border border-[#67E8F9]/30 bg-[linear-gradient(180deg,rgba(103,232,249,0.12),rgba(96,165,250,0.12))] px-5 py-4 text-center text-[#0b0c10] shadow-[0_18px_50px_rgba(96,165,250,0.18)]">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#2563eb]">
                    Pine X Control Layer
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#0b0c10]">
                    Connect data, workflow, and visibility
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={140}>
              <div className="light-panel rounded-[8px] p-6 text-[#0b0c10]">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-2xl font-semibold">After</h3>
                  <span className="rounded-full border border-[#d9d9d1] bg-white px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#50545b]">
                    Connected system
                  </span>
                </div>
                <div className="mt-6 grid gap-3">
                  {afterItems.map((item) => (
                    <div
                      key={item}
                      className="rounded-[8px] border border-[#d9d9d1] bg-white px-4 py-3 text-sm text-[#373a40] shadow-[0_10px_30px_rgba(17,24,39,0.05)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="module-builder-section bg-[linear-gradient(180deg,#F7F7F2_0%,#F3F2EE_100%)] py-16 sm:py-20 lg:py-24">
        <div className="section-shell">
          <Reveal>
            <div className="max-w-3xl">
              <SectionBadge tone="light">Module Builder</SectionBadge>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[#111111] sm:text-4xl">
                Choose The Control Layers Your Business Needs
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#555962]">
                Start with the modules your business needs now and grow the platform as the operation evolves.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {modules.map((module, index) => (
              <Reveal key={module.title} delayMs={index * 30}>
                <ModuleCard {...module} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="system-examples" className="demo-selector-section border-y border-[#d9d9d1] bg-[#F7F7F2] py-16 sm:py-20 lg:py-24">
        <div className="section-shell">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center text-[#0b0c10]">
              <SectionBadge tone="light">Interactive Demo Selector</SectionBadge>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                Explore command systems built for real operations
              </h2>
              <p className="mt-4 text-base leading-8 text-[#555962] sm:text-lg">
                Switch between industries to see the kind of control layer Pine X Systems can build.
              </p>
            </div>
          </Reveal>
          <div className="mt-10">
            <DemoSelector />
          </div>
          <Reveal delayMs={80}>
            <div className="mt-10">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-4 text-[#0b0c10]">
                <div>
                  <h3 className="font-heading text-2xl font-semibold">
                    Open A Full Interactive System Demo
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[#555962]">
                    Each card opens a branded Pine X Systems preview with role views,
                    sample data, filters, actions, and live activity.
                  </p>
                </div>
                <Link href="/demos" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b0c10]">
                  View all demos <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <DemoCardGrid tone="light" compact />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="money-leak-estimator" className="estimator-section bg-[linear-gradient(180deg,#ECEAE4_0%,#F7F7F2_100%)] py-16 sm:py-20 lg:py-24">
        <div className="section-shell">
          <Reveal>
            <div className="max-w-3xl">
              <SectionBadge tone="light">Money Leak Estimator</SectionBadge>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[#0b0c10] sm:text-4xl">
                How Much Is Operational Chaos Costing You?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#555962]">
                Adjust the numbers or choose an industry preset to see how missed
                follow-up, margin, and admin waste compound each month.
              </p>
            </div>
          </Reveal>
          <div className="mt-10">
            <LeakEstimator />
          </div>
        </div>
      </section>

      <section className="ai-section bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.18),transparent_28%),linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)] py-16 sm:py-20 lg:py-24">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <Reveal>
              <div className="rounded-[8px] border border-[#111111]/10 bg-white p-6 text-[#111111] shadow-[0_30px_80px_rgba(17,17,17,0.08)] sm:p-7">
                <SectionBadge tone="light">AI Intelligence</SectionBadge>
                <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                  AI That Helps Owners See What They Usually Miss
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-[#555962]">
                  Pine X Systems can add an AI intelligence layer so owners and managers can spot risks, missed opportunities, and workflow drift faster.
                </p>

                <div className="mt-8 rounded-[8px] border border-[#67E8F9]/25 bg-[linear-gradient(180deg,rgba(103,232,249,0.12),rgba(255,255,255,0.86))] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-[#67E8F9]">
                        Today&apos;s Recommendations
                      </p>
                      <p className="mt-2 text-xl font-semibold text-[#111111]">Priority actions across the business</p>
                    </div>
                    <Bot className="h-5 w-5 text-[#67E8F9]" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {aiRecommendations.map((item, index) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-[8px] border border-[#111111]/10 bg-white px-4 py-3 text-sm text-[#555962] shadow-[0_12px_30px_rgba(17,17,17,0.05)]"
                      >
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#111111]/10 bg-[#111111] text-xs font-semibold text-white">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {aiSignals.map((signal, index) => (
                <Reveal key={signal} delayMs={index * 40}>
                  <div className="glass-panel card-lift rounded-[8px] border border-[#111111]/10 bg-white p-5 text-[#111111] shadow-[0_18px_45px_rgba(17,17,17,0.06)]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2]">
                        {index % 2 === 0 ? (
                          <Sparkles className="h-5 w-5 text-[#67E8F9]" />
                        ) : (
                          <LineChart className="h-5 w-5 text-[#60A5FA]" />
                        )}
                      </span>
                      <span className="live-indicator rounded-full border border-[#111111]/10 bg-[#F7F7F2] px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#555962]">
                        <span className="live-dot" /> Active
                      </span>
                    </div>
                    <h3 className="mt-5 font-heading text-lg font-semibold text-[#111111]">{signal}</h3>
                    <p className="mt-3 text-sm leading-6 text-[#555962]">
                      Surface weak points before they become expensive through missed follow-up, low visibility, or slow operational response.
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="process-section border-y border-[#d9d9d1] bg-[#F7F7F2] py-16 sm:py-20 lg:py-24">
        <div className="section-shell">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center text-[#0b0c10]">
              <SectionBadge tone="light">Process</SectionBadge>
              <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                A clean path from messy operations to a working system
              </h2>
            </div>
          </Reveal>

          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-[#67E8F9]/45 to-transparent lg:block" />
            <div className="grid gap-4 lg:grid-cols-6">
              {timeline.map((step, index) => (
                <Reveal key={step.title} delayMs={index * 35}>
                  <ProcessStep index={index} title={step.title} description={step.description} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section bg-[linear-gradient(180deg,#f1f1eb_0%,#F7F7F2_100%)] py-16 sm:py-20 lg:py-24">
        <div className="section-shell">
          <div className="grid gap-6 xl:grid-cols-[0.82fr_1.18fr] xl:items-start">
            <Reveal>
              <div className="space-y-5 text-[#0b0c10]">
                <div>
                  <SectionBadge tone="light">Contact & Demo</SectionBadge>
                  <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
                    See What Your Business Could Look Like With A Real Control System
                  </h2>
                  <p className="mt-4 max-w-xl text-base leading-8 text-[#555962]">
                    Tell us what is slowing your business down. We&apos;ll show you what system could fix it.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full border border-[#d9d9d1] bg-white px-4 py-2 text-sm text-[#0b0c10]">
                    Free 30-minute discovery call
                  </span>
                  <span className="rounded-full border border-[#d9d9d1] bg-white px-4 py-2 text-sm text-[#0b0c10]">
                    No obligation
                  </span>
                </div>

                <a
                  href="https://wa.me/27638035628"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="light-panel card-lift flex items-center justify-between rounded-[8px] px-5 py-4"
                >
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-[#6b6c70]">WhatsApp Pine X Systems</p>
                    <p className="mt-2 text-lg font-semibold text-[#0b0c10]">063 803 5628</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-[#6b6c70]" />
                </a>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="light-panel rounded-[8px] p-5">
                    <p className="text-sm font-semibold text-[#0b0c10]">Why owners book a demo</p>
                    <p className="mt-3 text-sm leading-7 text-[#555962]">
                      To see how lead loss, weak follow-up, reporting delays, and operational blind spots could be fixed inside one platform.
                    </p>
                  </div>
                  <div className="light-panel rounded-[8px] p-5">
                    <p className="text-sm font-semibold text-[#0b0c10]">What you get</p>
                    <p className="mt-3 text-sm leading-7 text-[#555962]">
                      A practical recommendation for the first control layers your business should build and why.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={90}>
              <LeadForm
                title="Get A Free Control System Demo For Your Business"
                subtitle="Tell us what is slowing your business down. We will show you what a custom control layer could look like."
                tone="light"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="faq-section bg-[linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)] py-16 sm:py-20 lg:py-24">
        <div className="section-shell">
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr] lg:items-start">
            <Reveal>
              <div>
                <SectionBadge tone="light">FAQ</SectionBadge>
                <h2 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[#111111] sm:text-4xl">
                  Common Questions
                </h2>
                <p className="mt-4 max-w-lg text-base leading-8 text-[#555962]">
                  Short answers for owners deciding whether a custom business control layer is the right next move.
                </p>
              </div>
            </Reveal>
            <Reveal delayMs={60}>
              <FaqAccordion items={homeFaq} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="final-cta-section relative overflow-hidden border-t border-[#111111]/10 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.16),transparent_25%),linear-gradient(180deg,#ECEAE4_0%,#F7F7F2_100%)] py-16 sm:py-20 lg:py-24">
        <div className="radial-glow radial-glow-top" aria-hidden="true" />
        <div className="section-shell relative z-10">
          <div className="rounded-[8px] border border-white/10 bg-[linear-gradient(135deg,#0B0C10_0%,#111820_100%)] p-8 shadow-[0_30px_80px_rgba(17,17,17,0.2)] sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
              <div>
                <SectionBadge>Final CTA</SectionBadge>
                <h2 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-[1.02] text-[#f7f7f2] sm:text-5xl lg:text-[3.75rem]">
                  Stop Running Your Business Blind
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-8 text-[#d8d8d2] sm:text-lg">
                  If your business depends on scattered messages, spreadsheets, memory, and manual follow-ups, you are losing money quietly. Pine X Systems builds the control layer that helps you see, manage, and improve everything.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link href="/contact#lead-form" className="cta-button premium-glow animate-glow-pulse">
                  Book My Free Demo
                </Link>
                <a
                  href="https://wa.me/27638035628"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-secondary premium-glow"
                >
                  WhatsApp Pine X Systems
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
