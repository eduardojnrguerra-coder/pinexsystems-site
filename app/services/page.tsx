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
  { label: "Best business systems South Africa", href: "/best-business-systems-south-africa" },
  { label: "Custom CRM South Africa", href: "/custom-crm-south-africa" },
  { label: "Business dashboard for owners", href: "/business-dashboard-for-owners" },
  { label: "Workshop job card system", href: "/workshop-job-card-system-south-africa" },
  { label: "Construction management system", href: "/construction-management-system-south-africa" },
  { label: "Business loss calculator", href: "/business-loss-calculator" },
  { label: "Interactive demos", href: "/demos" },
];

const serviceProfiles: Record<
  string,
  {
    bestFor: string[];
    includes: string[];
    after: string;
    example: string;
    links: { label: string; href: string }[];
  }
> = {
  "Custom Business Systems": {
    bestFor: [
      "Businesses running critical workflows across several disconnected tools",
      "Owners who need one operational control layer instead of scattered updates",
    ],
    includes: [
      "Role-based dashboards",
      "Workflow stages and approvals",
      "Alerts, reminders, and reporting",
    ],
    after:
      "The business moves from fragmented coordination to one clearer operating environment with visible ownership and cleaner reporting.",
    example:
      "A growing service business can connect leads, job flow, staff actions, and owner reporting instead of managing each stage in separate chats and spreadsheets.",
    links: [
      { label: "Business systems guide", href: "/business-systems" },
      { label: "View demos", href: "/demos" },
    ],
  },
  "Owner Dashboards": {
    bestFor: [
      "Owners who rely on delayed weekly or month-end updates",
      "Managers who need one summary of pipeline, workload, and exceptions",
    ],
    includes: [
      "KPI summary cards",
      "Operational alerts and exceptions",
      "Role-based reporting views",
    ],
    after:
      "Owners can see the pressure points earlier and spend less time chasing reports before making decisions.",
    example:
      "A dealership owner dashboard can combine lead response speed, stock age, finance-stage pressure, and overdue follow-up into one daily view.",
    links: [
      { label: "Owner dashboard page", href: "/owner-dashboard-system" },
      { label: "Dealership systems", href: "/dealership-management-system-south-africa" },
    ],
  },
  "Lead Management Systems": {
    bestFor: [
      "Teams missing leads because follow-up depends on memory",
      "Businesses that get enquiries from WhatsApp, calls, forms, and referrals",
    ],
    includes: [
      "Lead capture and assignment",
      "Follow-up reminders and escalation",
      "Pipeline reporting for owners and managers",
    ],
    after:
      "Follow-up becomes visible, stale enquiries are easier to catch, and management can finally trust the pipeline report.",
    example:
      "A sales team can route every new enquiry to an owner, track next action dates, and flag overdue follow-up before revenue goes cold.",
    links: [
      { label: "Lead management page", href: "/lead-management-system" },
      { label: "Use the calculator", href: "/business-loss-calculator" },
    ],
  },
  "CRM & Sales Pipelines": {
    bestFor: [
      "Businesses whose sales flow does not fit a generic off-the-shelf CRM cleanly",
      "Teams that need handover from sales into delivery or job execution",
    ],
    includes: [
      "Custom deal stages",
      "Assignment and stage controls",
      "Pipeline-to-operations handover logic",
    ],
    after:
      "Sales reporting becomes more trustworthy and handovers stop depending on manual interpretation.",
    example:
      "A contractor can move from quote to awarded job to active project workflow without re-entering the same information three times.",
    links: [
      { label: "Custom CRM page", href: "/custom-crm-south-africa" },
      { label: "Construction systems", href: "/construction-business-system" },
    ],
  },
  "Staff Workflow Systems": {
    bestFor: [
      "Teams managing work through verbal updates and chat threads",
      "Managers who need clearer ownership and overdue visibility",
    ],
    includes: [
      "Task queues and deadlines",
      "Approvals and handovers",
      "Team accountability views",
    ],
    after:
      "The team spends less time asking what happens next because responsibilities and blocked work are already visible.",
    example:
      "An agency manager can track account handovers, pending approvals, and overdue deliverables without building a new spreadsheet every week.",
    links: [
      { label: "Agency systems", href: "/agency-management-system" },
      { label: "Interactive demos", href: "/demos" },
    ],
  },
  "Job Card Systems": {
    bestFor: [
      "Workshops and service businesses with bookings, active jobs, and handovers",
      "Operations where paper or chat-based tracking slows throughput",
    ],
    includes: [
      "Booking and check-in flow",
      "Job stages and technician ownership",
      "Parts, notes, and invoice-ready history",
    ],
    after:
      "Job flow becomes cleaner, customer updates become easier, and managers can see blocked work before it creates a queue problem.",
    example:
      "A workshop can move each vehicle from booking to diagnosis, approval, repair, quality check, and invoicing inside one visible timeline.",
    links: [
      { label: "Workshop systems", href: "/workshop-management-system" },
      { label: "Job card system page", href: "/job-card-system-south-africa" },
    ],
  },
  "Inventory / Stock Systems": {
    bestFor: [
      "Warehouses, workshops, and operations with stock movement risk",
      "Owners who cannot see shortages, delays, or reorder exposure quickly enough",
    ],
    includes: [
      "Movement logs and stock status",
      "Supplier and reorder visibility",
      "Owner risk summaries",
    ],
    after:
      "Stock pressure becomes visible earlier, and the business can act before shortages or manual errors create delays.",
    example:
      "A warehouse team can see what arrived, what moved, what is low, and what supplier orders are delayed in one flow.",
    links: [
      { label: "Warehouse stock page", href: "/warehouse-stock-system" },
      { label: "Industries page", href: "/industries" },
    ],
  },
  "Client Portals": {
    bestFor: [
      "Businesses that spend too much time sending manual status updates",
      "Teams that need clients to access files, progress, or approvals cleanly",
    ],
    includes: [
      "Role-based client visibility",
      "Update feeds and document access",
      "Approval or sign-off flows",
    ],
    after:
      "Clients get a more professional experience and the internal team spends less time answering repetitive questions.",
    example:
      "An agency can give clients live campaign status and reporting access without exposing internal delivery detail.",
    links: [
      { label: "Agency systems", href: "/agency-management-system" },
      { label: "Contact Pine X", href: "/contact#lead-form" },
    ],
  },
  "AI-Powered Business Tools": {
    bestFor: [
      "Teams losing time on repeated admin or repetitive interpretation work",
      "Businesses that want AI inside a controlled workflow instead of as a gimmick",
    ],
    includes: [
      "Prompted summaries and recommendations",
      "Workflow support automations",
      "Decision-support views for owners and managers",
    ],
    after:
      "AI supports execution and visibility where it is useful, without replacing the core operating discipline of the business.",
    example:
      "A manager can generate a quick operations summary from live workflow data instead of manually consolidating updates from several people.",
    links: [
      { label: "Business automation page", href: "/business-automation-south-africa" },
      { label: "Owner dashboard page", href: "/owner-dashboard-system" },
    ],
  },
  "Automation & Reporting": {
    bestFor: [
      "Businesses drowning in repeated reminders, status chasing, and manual reports",
      "Owners who want consistent reporting without depending on last-minute admin effort",
    ],
    includes: [
      "Automated reminders and escalations",
      "Scheduled reporting views",
      "Workflow triggers tied to real business stages",
    ],
    after:
      "Critical steps stop being optional memory tasks, and management reporting becomes cleaner and more regular.",
    example:
      "A workshop can trigger customer updates at key stages while the owner receives a daily summary of delayed jobs and invoice-ready work.",
    links: [
      { label: "Business automation page", href: "/business-automation-south-africa" },
      { label: "Loss calculator", href: "/business-loss-calculator" },
    ],
  },
};

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
        {fullServiceDetails.map((service) => {
          const profile = serviceProfiles[service.title];

          return (
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
            {profile ? (
              <>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-4">
                    <h3 className="font-heading text-sm font-semibold text-[#111111]">
                      Best For
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-[#555962]">
                      {profile.bestFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-4">
                    <h3 className="font-heading text-sm font-semibold text-[#111111]">
                      Typically Includes
                    </h3>
                    <ul className="mt-3 space-y-2 text-sm text-[#555962]">
                      {profile.includes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-4 rounded-[8px] border border-[#111111]/10 bg-white p-4">
                  <h3 className="font-heading text-sm font-semibold text-[#111111]">
                    What Changes After Implementation
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#555962]">
                    {profile.after}
                  </p>
                </div>
                <div className="mt-4 rounded-[8px] border border-[#111111]/10 bg-white p-4">
                  <h3 className="font-heading text-sm font-semibold text-[#111111]">
                    Example Use Case
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#555962]">
                    {profile.example}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.links.map((link) => (
                    <Link
                      key={link.href + link.label}
                      href={link.href}
                      className="rounded-full border border-[#111111]/10 bg-white px-3 py-2 text-xs font-medium text-[#3d4147] transition hover:border-[#67E8F9]/40 hover:text-[#111111]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </>
            ) : null}
            <div className="mt-6">
              <Link className="inline-link inline-flex items-center gap-2" href="/contact#lead-form" data-event="free_audit_click">
                Get My Free System Audit <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        )})}
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
