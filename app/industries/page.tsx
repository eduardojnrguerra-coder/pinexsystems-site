import Link from "next/link";

import { TrackedDemoLink } from "@/components/analytics/tracked-demo-link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SchemaScript } from "@/components/ui/schema-script";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = createPageMetadata({
  title: "Industries | Pine X Systems",
  description:
    "Industry-focused custom business systems for dealerships, workshops, logistics teams, construction firms, accounting practices, warehouses, and marine businesses in South Africa.",
  path: "/industries",
  keywords: [
    "dealership management system South Africa",
    "workshop management system South Africa",
    "logistics management system South Africa",
    "construction project control system",
    "warehouse stock control system",
    "accounting workflow system",
    "marine dealership software South Africa",
  ],
});

const industryCards = [
  {
    title: "Dealerships",
    subtitle: "Lead allocation, stock, finance, and owner reporting",
    problem:
      "Leads, stock, test drives, and finance progress are often split across several tools and people.",
    solution:
      "A dealership system connects lead capture, salesperson activity, stock visibility, documents, and delivery readiness in one place.",
    pageHref: "/dealership-management-system-south-africa",
    demoHref: "/demos/dealership",
    event: "click_dealer_demo",
  },
  {
    title: "Workshops",
    subtitle: "Digital job cards, bookings, parts, and technician flow",
    problem:
      "Paper job cards and chat-based updates create delays, weak handovers, and poor customer visibility.",
    solution:
      "A workshop control system makes job stages, parts pressure, technician ownership, and invoice-ready work visible.",
    pageHref: "/workshop-management-system-south-africa",
    demoHref: "/demos/workshop",
    event: "click_workshop_demo",
  },
  {
    title: "Logistics",
    subtitle: "Fleet, delivery jobs, POD flow, and owner dashboards",
    problem:
      "Dispatch teams often battle with fragmented delivery tracking, vehicle records, and delayed reporting.",
    solution:
      "A logistics management system can connect jobs, vehicles, drivers, delivery proof, and management reporting.",
    pageHref: "/logistics-management-system-south-africa",
    demoHref: "/demos/logistics",
    event: "click_logistics_demo",
  },
  {
    title: "Construction",
    subtitle: "Site tasks, material visibility, and project control",
    problem:
      "Project updates, procurement pressure, and milestone risk are often discovered too late.",
    solution:
      "A construction control system keeps site activity, materials, subcontractor flow, and owner reporting connected.",
    pageHref: "/construction-business-system",
    demoHref: "/demos/construction",
    event: "click_construction_demo",
  },
  {
    title: "Accounting Practices",
    subtitle: "Client workflow, approvals, reporting, and task control",
    problem:
      "Client work, document chasing, and review flow can become messy as the practice grows.",
    solution:
      "A practice operating system can support recurring workflow, approvals, client communication, and owner visibility.",
    pageHref: "/custom-business-apps-south-africa",
    demoHref: "/demos/accounting-os",
    event: "click_accounting_demo",
  },
  {
    title: "Warehousing",
    subtitle: "Stock movement, dispatch, receiving, and reorder risk",
    problem:
      "Stock levels, movement history, and dispatch pressure are difficult to trust when updates are manual.",
    solution:
      "A warehouse system gives one view of receiving, dispatch, stock risk, supplier delays, and owner summaries.",
    pageHref: "/warehouse-stock-system",
    demoHref: "/demos/warehouse",
    event: "click_warehouse_demo",
  },
  {
    title: "Marine Businesses",
    subtitle: "Sales, service, stock, and after-sales visibility",
    problem:
      "Marine businesses often need one system that can span sales, bookings, parts, job flow, and client communication.",
    solution:
      "A custom marine business system can combine dealership-style visibility with service-centre and parts workflow control.",
    pageHref: "/custom-business-systems-south-africa",
    demoHref: "/demos/marine-business",
    event: "click_marine_demo",
  },
  {
    title: "Schools & Education Businesses",
    subtitle: "Enquiries, admin workflows, documents, and owner reporting",
    problem:
      "Education businesses often rely on forms, spreadsheets, WhatsApp updates, and manual reminders across admin, parents, staff, and owners.",
    solution:
      "A custom education workflow system can connect enquiries, student or client records, documents, reminders, task ownership, and reporting.",
    pageHref: "/custom-business-systems-south-africa",
    demoHref: "/demos/custom-business",
    event: "click_education_demo",
  },
];

export default function IndustriesPage() {
  return (
    <div className="bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.12),transparent_26rem),linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)]">
      <SchemaScript
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
      <div className="section-shell py-12 sm:py-16">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Industries" },
          ]}
        />

        <SectionHeading
          badge="Industries"
          title={
            <>
              Industry Systems Built For{" "}
              <span className="heading-gradient">Real South African Operations</span>
            </>
          }
          description="Pine X Systems builds custom business systems for operations-heavy teams that need clearer workflow control, owner visibility, and practical automation."
        />

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {industryCards.map((industry) => (
            <article key={industry.title} className="glass-card p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
                Industry focus
              </p>
              <h2 className="mt-3 font-heading text-2xl font-semibold text-[#111111]">
                {industry.title}
              </h2>
              <p className="mt-2 text-sm font-medium text-[#3d4147]">
                {industry.subtitle}
              </p>
              <div className="mt-5 rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-4">
                <h3 className="font-heading text-sm font-semibold text-[#111111]">
                  Common problem
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#555962]">
                  {industry.problem}
                </p>
              </div>
              <div className="mt-4 rounded-[8px] border border-[#111111]/10 bg-white p-4">
                <h3 className="font-heading text-sm font-semibold text-[#111111]">
                  System solution
                </h3>
                <p className="mt-2 text-sm leading-7 text-[#555962]">
                  {industry.solution}
                </p>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={industry.pageHref}
                  className="cta-secondary"
                  data-event="click_industry_page"
                >
                  View industry page
                </Link>
                <Link
                  href={industry.demoHref}
                  className="cta-button"
                  data-event={industry.event}
                >
                  View demo example
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[8px] border border-[#111111]/10 bg-white p-8 text-center shadow-[0_18px_50px_rgba(17,17,17,0.06)]">
          <h2 className="font-heading text-3xl font-semibold text-[#111111]">
            Need A System Built Around Your Industry Workflow?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-[#555962] sm:text-base">
            If your industry is not listed above, Pine X Systems can still map
            the workflow and design a custom control layer around how your
            business actually operates.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <TrackedDemoLink
              href="/contact#lead-form"
              location="industries_system_review"
              className="cta-button"
              data-event="free_audit_click"
            >
              Get My Free System Audit
            </TrackedDemoLink>
                <Link href="/demos" className="cta-secondary" data-event="demo_click">
              View Live Demo Systems
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
