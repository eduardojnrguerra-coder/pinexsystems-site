import Link from "next/link";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SchemaScript } from "@/components/ui/schema-script";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/schema";

export const metadata = createPageMetadata({
  title: "Case Studies & Demo Systems | Pine X Systems",
  description:
    "Explore Pine X Systems industry demos, concept case studies, and demo systems for dealerships, workshops, logistics, accounting, construction, and marine businesses.",
  path: "/case-studies",
  keywords: [
    "business systems case studies South Africa",
    "demo business systems",
    "dealership management demo",
    "workshop management demo",
    "logistics dashboard demo",
  ],
});

const caseStudies = [
  {
    label: "Industry Demo",
    title: "Dealership Management Demo",
    problem:
      "Leads, stock, finance progress, and delivery readiness are usually split across several people and tools.",
    system:
      "A dealership command system connecting lead allocation, vehicle stock, finance stages, documents, and owner dashboards.",
    workflows:
      "Lead capture, salesperson follow-up, test drives, finance tracking, stock publishing, and delivery handover.",
    ownerBenefit:
      "Owners can see pipeline pressure, aged stock, and blocked deals before month-end reporting.",
    href: "/demos/dealership",
    cta: "Open dealer demo",
    event: "click_dealer_demo",
  },
  {
    label: "Industry Demo",
    title: "Workshop Management Demo",
    problem:
      "Paper job cards and chat-based status updates create delays, weak handovers, and poor queue visibility.",
    system:
      "A workshop control system with bookings, job cards, technician views, parts status, and invoice-ready job flow.",
    workflows:
      "Booking intake, diagnosis, parts waiting, technician execution, customer updates, and invoicing.",
    ownerBenefit:
      "Managers and owners can spot blocked jobs, parts delays, and invoice-ready work much earlier.",
    href: "/demos/workshop",
    cta: "Open workshop demo",
    event: "click_workshop_demo",
  },
  {
    label: "Concept Case Study",
    title: "Logistics Command Centre Demo",
    problem:
      "Dispatch, delivery status, fleet visibility, and POD flow often live in separate channels with delayed reporting.",
    system:
      "A logistics management platform combining jobs, fleet dashboards, driver views, POD records, and owner reporting.",
    workflows:
      "Job assignment, delivery progress, vehicle records, POD capture, customer updates, and profitability reporting.",
    ownerBenefit:
      "Owners can see which deliveries, vehicles, or reporting delays are putting service quality at risk.",
    href: "/logistics-management-system-south-africa",
    cta: "View logistics page",
    event: "click_logistics_demo",
  },
  {
    label: "Concept Case Study",
    title: "Accounting OS Demo",
    problem:
      "Client work, document requests, approvals, recurring deadlines, and owner visibility become messy as a practice grows.",
    system:
      "An internal accounting operating system with recurring workflow control, approvals, task views, and client communication points.",
    workflows:
      "Client onboarding, document chasing, review stages, recurring deadlines, and reporting visibility.",
    ownerBenefit:
      "Practice owners get cleaner control over overdue work, team load, and client-facing deadlines.",
    href: "/custom-business-apps-south-africa",
    cta: "View business apps page",
    event: "click_accounting_demo",
  },
  {
    label: "Industry Demo",
    title: "Construction OS Demo",
    problem:
      "Site activity, material pressure, milestone delays, and subcontractor coordination are often discovered too late.",
    system:
      "A construction project control system with site dashboards, materials visibility, risk alerts, and client reporting layers.",
    workflows:
      "Project milestones, site tasks, procurement visibility, change requests, and owner-level reporting.",
    ownerBenefit:
      "Construction owners can respond earlier to delays, cost pressure, and reporting gaps across active sites.",
    href: "/demos/construction",
    cta: "Open construction demo",
    event: "click_construction_demo",
  },
  {
    label: "Concept Case Study",
    title: "Marine Business System Concept",
    problem:
      "Marine dealerships and service businesses often need one system for sales, service bookings, parts, and client updates.",
    system:
      "A marine business platform combining dealership-style lead and stock visibility with workshop-style service flow and parts control.",
    workflows:
      "Sales enquiries, unit availability, service bookings, parts requests, technician flow, and owner reporting.",
    ownerBenefit:
      "Leadership gains one view of sales, service, and after-sales pressure instead of juggling several disconnected tools.",
    href: "/custom-business-systems-south-africa",
    cta: "View systems page",
    event: "click_marine_demo",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.14),transparent_26rem),linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)]">
      <SchemaScript
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Case Studies", path: "/case-studies" },
          ]),
          ...caseStudies.slice(0, 3).map((item) =>
            softwareApplicationSchema({
              name: item.title,
              description: item.system,
              path: "/case-studies",
              category: "BusinessApplication",
            }),
          ),
        ]}
      />

      <div className="section-shell py-12 sm:py-16 lg:py-20">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Case Studies" },
          ]}
        />

        <SectionHeading
          badge="Case Studies / Demos"
          title={
            <>
              Demo Systems And{" "}
              <span className="heading-gradient">Concept Case Studies</span>
            </>
          }
          description="These are demo systems and concept case studies that show what Pine X Systems can build for different South African industries. They are not presented as paid-client claims."
        />

        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          {caseStudies.map((item) => (
            <article key={item.title} className="glass-card p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
                {item.label}
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-[#111111]">
                {item.title}
              </h2>
              <div className="mt-5 rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-4">
                <h3 className="font-heading text-sm font-semibold text-[#111111]">
                  Problem
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#555962]">
                  {item.problem}
                </p>
              </div>
              <div className="mt-4 rounded-[8px] border border-[#111111]/10 bg-white p-4">
                <h3 className="font-heading text-sm font-semibold text-[#111111]">
                  System built / concept
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#555962]">
                  {item.system}
                </p>
              </div>
              <div className="mt-4 rounded-[8px] border border-[#111111]/10 bg-white p-4">
                <h3 className="font-heading text-sm font-semibold text-[#111111]">
                  Key workflows
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#555962]">
                  {item.workflows}
                </p>
              </div>
              <div className="mt-4 rounded-[8px] border border-[#111111]/10 bg-white p-4">
                <h3 className="font-heading text-sm font-semibold text-[#111111]">
                  Owner benefit
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#555962]">
                  {item.ownerBenefit}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={item.href} className="cta-button" data-event={item.event}>
                  {item.cta}
                </Link>
                <Link href="/contact#lead-form" className="cta-secondary" data-event="free_audit_click">
                  Get My Free System Audit
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
