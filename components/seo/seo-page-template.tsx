import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FaqAccordion } from "@/components/ui/faq-accordion";
import { SchemaScript } from "@/components/ui/schema-script";
import { SectionHeading } from "@/components/ui/section-heading";
import { breadcrumbSchema, faqSchema, servicePageSchema } from "@/lib/schema";
import type { SeoPage } from "@/lib/types";

interface SeoPageTemplateProps {
  page: SeoPage;
}

function getDecisionGuide(slug: string): string {
  const guides: Record<string, string> = {
    "lead-management-system":
      "This page helps you decide whether your business needs a structured lead system, how lead capture and follow-up can be controlled, and what owners should expect from a proper sales pipeline dashboard.",
    "owner-dashboard-system":
      "This page helps you decide what an owner dashboard should show, how to move from manual reporting to live visibility, and which operational signals matter most for daily decisions.",
    "workshop-management-system":
      "This page helps you decide whether your workshop needs a digital job card system, how booking-to-invoice flow can be structured, and what visibility workshop owners and managers gain from one connected system.",
    "dealership-management-system-south-africa":
      "This page helps you decide whether a dealership system can connect stock, leads, sales workflows, and owner reporting in one place, and what the first practical build looks like.",
    "business-systems":
      "This page helps you understand what a custom business system actually is, how it differs from a website or off-the-shelf CRM, and whether your business is ready for one.",
    "construction-business-system":
      "This page helps you decide whether a construction system can connect site work, materials, subcontractors, and owner reporting, and what the first build should focus on.",
    "custom-business-portals":
      "This page helps you decide whether role-based portals for clients, staff, suppliers, and owners would reduce operational friction in your business.",
    "agency-management-system":
      "This page helps you decide whether an agency management system can streamline client work, campaign tracking, task flow, and team delivery.",
    "business-automation-south-africa":
      "This page helps you decide which parts of your business could benefit from practical automation and what a first automation layer might include.",
    "custom-crm-south-africa":
      "This page helps you decide whether a custom CRM is the right fit compared to generic tools, and how it can improve lead management and pipeline visibility.",
    "custom-business-systems-south-africa":
      "This page helps you understand what custom business systems cost, how they are built, and whether your business is ready for one.",
    "business-dashboard-system":
      "This page helps you decide what a business dashboard should track, how it differs from standard reporting, and what signals owners should see daily.",
    "warehouse-stock-system":
      "This page helps you decide whether a warehouse stock system can improve receiving, dispatch, reorder visibility, and supplier tracking.",
    "how-to-get-more-leads":
      "This page helps you understand how improving lead capture, response speed, and follow-up consistency can increase conversion without increasing marketing spend.",
    "how-to-stop-missing-leads":
      "This page helps you identify where leads are slipping through your process and what control layers prevent missed follow-up.",
    "how-to-improve-follow-up":
      "This page helps you decide what follow-up structure works for your team, including reminders, pipeline stages, and owner visibility.",
    "how-to-reduce-manual-admin":
      "This page helps you identify the manual admin tasks that cost most time and which automation layers deliver the fastest return.",
    "how-to-track-staff-work":
      "This page helps you decide what task ownership, workflow stages, and role-based visibility look like in a practical business system.",
    "how-to-build-a-sales-pipeline":
      "This page helps you understand how to build a sales pipeline with lead stages, assignment rules, follow-up triggers, and conversion reporting.",
    "how-owner-dashboards-help-businesses-grow":
      "This page helps you understand how owner dashboards improve response speed, team accountability, and decision-making confidence.",
    "farm-operations-dashboard":
      "This page helps you decide whether a farm operations dashboard can connect field activity, labour tracking, stock input, and owner reporting.",
    "service-business-job-tracking-system":
      "This page helps you decide whether a job tracking system can improve task ownership, booking flow, approvals, and owner visibility in a service business.",
    "operations-dashboard-for-business":
      "This page helps you decide what an operations dashboard should track and how it gives managers visibility into workflow bottlenecks and team load.",
    "job-card-system-south-africa":
      "This page helps you decide whether a digital job card system fits your workshop or service operation and what the first build should include.",
    "best-business-systems-south-africa":
      "This page helps you compare custom business systems, dashboards, workflow apps, and operational tools to find the right fit.",
    "custom-business-apps-south-africa":
      "This page helps you decide whether custom apps for dashboards, job tracking, portals, or booking tools make sense for your team.",
    "business-systems-western-cape":
      "This page helps Western Cape business owners understand what custom systems are available and how they improve workflow control and visibility.",
    "logistics-management-system-south-africa":
      "This page helps you decide whether a logistics management system can connect fleet, jobs, PODs, driver records, and profitability reporting.",
    "construction-management-system-south-africa":
      "This page helps you decide what a construction management system should include for project visibility, site control, and cleaner reporting.",
    "workshop-job-card-system-south-africa":
      "This page helps you decide whether a workshop job card system fits your service advisor workflow and what the first build looks like.",
    "business-dashboard-for-owners":
      "This page helps you decide what to track daily across leads, operations, staff workflow, and reporting in one owner dashboard.",
    "whatsapp-to-business-system":
      "This page helps you understand the transition from WhatsApp-based operations to a structured business system and what that shift involves.",
    "custom-software-vs-off-the-shelf-crm":
      "This page helps you compare custom software and off-the-shelf CRM for practical trade-offs on control, speed, and long-term fit.",
    "how-much-does-a-custom-business-system-cost-south-africa":
      "This page helps you understand the cost range for custom business systems in South Africa and what factors affect the investment.",
  };
  return guides[slug] || `This page helps you decide whether a ${slug.replace(/-/g, " ")} system is the right fit for your business and what the first practical build should focus on.`;
}

function getBestFirstBuild(slug: string): string[] {
  const builds: Record<string, string[]> = {
    "lead-management-system": [
      "Capture every enquiry from WhatsApp, calls, website, and walk-ins in one place",
      "Assign each lead to a specific person with clear ownership",
      "Track next action dates and follow-up status",
      "Show overdue follow-ups so nothing goes cold",
      "Owner pipeline dashboard with conversion and lost-reason reporting",
    ],
    "owner-dashboard-system": [
      "Live revenue and lead snapshot updated daily",
      "Staff task completion and overdue visibility",
      "Operational bottleneck alerts for jobs, stock, and follow-ups",
      "Custom reporting views for owners and managers",
      "Drill-down from dashboard signals into detailed records",
    ],
    "workshop-management-system": [
      "Booking intake with customer and vehicle details",
      "Digital job cards replacing paper worksheets",
      "Technician board showing bay assignments and job status",
      "Parts request and stock visibility per job",
      "Invoice-ready history with service records and close-out",
    ],
    "dealership-management-system-south-africa": [
      "Vehicle stock overview with status and location",
      "Lead ownership and follow-up tracking per salesperson",
      "Test drive booking logged against stock and customer",
      "Finance stage tracking from proposal to handover",
      "Owner dashboard with pipeline, aged stock, and conversion",
    ],
    "business-systems": [
      "Map your core workflow from enquiry to delivery",
      "Define who needs to see what at each stage",
      "Build the first dashboard that replaces manual reporting",
      "Connect the data sources your team uses daily",
      "Add role-based access for staff, managers, and owners",
    ],
    "construction-business-system": [
      "Site activity log with daily progress entries",
      "Material tracking from order to delivery to site use",
      "Subcontractor task assignment and status",
      "Change request and approval workflow",
      "Owner reporting across active sites",
    ],
    "custom-business-portals": [
      "Client portal with job status, documents, and communication",
      "Staff portal with task lists, updates, and approvals",
      "Supplier portal for orders, deliveries, and invoices",
      "Owner portal with consolidated reporting across all roles",
    ],
    "warehouse-stock-system": [
      "Receiving log with supplier and item details",
      "Stock movement tracking from receiving to dispatch",
      "Reorder alerts based on minimum stock levels",
      "Supplier performance and delivery tracking",
      "Owner stock summary with risk indicators",
    ],
    "logistics-management-system-south-africa": [
      "Job and delivery scheduling with driver assignment",
      "Fleet dashboard showing vehicle status and location",
      "POD capture and proof of delivery tracking",
      "Driver record and trip history",
      "Profitability reporting per job and route",
    ],
    "custom-business-systems-south-africa": [
      "Identify the single workflow that creates the most operational friction day to day",
      "Build a dashboard that makes that workflow visible from start to finish",
      "Add structured data capture so nothing gets lost in messages or spreadsheets",
      "Create role-based views so each person sees only the information they need",
      "Connect reporting so owners see trends, bottlenecks, and exceptions without chasing updates",
    ],
    "business-automation-south-africa": [
      "Identify the repetitive manual task that consumes most staff time each week",
      "Set up automated triggers for follow-ups, reminders, or status transitions",
      "Build a rules engine for common decisions like lead assignment or approval routing",
      "Connect your data sources so information flows without manual re-entry between tools",
      "Add exception alerts that surface only what needs human attention",
    ],
  };
  return builds[slug] || [
    "Map the core workflow that creates the most operational friction",
    "Define the key data points and who needs access to them",
    "Build the first visibility layer that replaces manual updates",
    "Add role-based views for the team members who need them most",
    "Expand with automation and reporting as the system matures",
  ];
}

function getRealBusinessExample(slug: string): string {
  const examples: Record<string, string> = {
    "lead-management-system":
      "Avehicle dealership in Cape Town was losing track of WhatsApp enquiries because each salesperson managed their own leads. After implementing a lead system, every enquiry was captured centrally, assigned within minutes, and overdue follow-ups were visible to the owner. Within two months, the dealership reduced its average response time from four hours to under fifteen minutes and could report exactly where each deal stood without chasing individual staff members.",
    "owner-dashboard-system":
      "A construction company owner in Stellenbosch was receiving weekly spreadsheets compiled from three different site managers. The reports were often two days old by the time they reached him. After implementing a live owner dashboard, he could see site progress, materials ordered, and labour hours for each project in real time. He stopped waiting for manual updates and could identify which projects needed attention before they became problems.",
    "workshop-management-system":
      "A workshop in Hermanus with seven bays was using paper job cards and WhatsApp to manage workflow. Service advisors spent over an hour each morning figuring out which jobs were in progress, which were waiting for parts, and which were ready for collection. After switching to a digital workshop system, the morning scramble was replaced by a live board showing every job status, bay assignment, and parts wait. The workshop increased its daily job throughput without adding staff.",
    "dealership-management-system-south-africa":
      "A used car dealership in Somerset West was managing stock on a spreadsheet and leads across several salespeople's phones. The owner could not tell which vehicles had been on the lot longest or which leads had gone cold. After implementing a dealership management system, stock aging became visible at a glance, every lead was tracked from enquiry to sale or lost, and the owner had a daily dashboard showing exactly where revenue was moving and where it was stalling.",
    "construction-business-system":
      "A building contractor in the Overberg was managing three active sites with a combination of site notebooks, WhatsApp groups, and weekly meetings. Materials often arrived late because nobody had a clear view of what was needed and when. After a basic construction control system was put in place, each site logged daily progress and material requests in one place. The contractor could see stock levels, order status, and site delays from a single screen and started cutting down on emergency material runs.",
    "warehouse-stock-system":
      "A wholesale distributor in Montague Gardens was relying on a storeman's memory to track stock levels. Reordering was reactive, and stockouts were common during peak weeks. After implementing a basic warehouse stock system, receiving, movement, and dispatch were logged in real time. Reorder alerts replaced guesswork, and the owner could see which items were moving fastest and which were tying up capital.",
    "logistics-management-system-south-africa":
      "A small logistics company in Paarl was managing deliveries with a whiteboard and driver WhatsApp messages. Proof of delivery was often missing, and client queries about delivery status required calling the driver directly. After implementing a logistics management system, each job was assigned digitally, PODs were captured at delivery, and clients received automatic status updates. The owner could see fleet utilisation and job profitability without waiting for end-of-week reports.",
    "custom-business-systems-south-africa":
      "A retail and workshop business in Hermanus was running sales, service, stock, and client communication through four separate WhatsApp groups and two spreadsheets. The owner spent Sunday evenings manually compiling reports from messages sent during the week. After implementing a custom business system built around their actual workflow, the business had a single dashboard showing open sales, service jobs in progress, stock needing reorder, and client communication history. The owner stopped chasing spreadsheets and could see Monday morning exactly where the business stood.",
    "business-automation-south-africa":
      "A service business in Somerset West was sending manual follow-up messages, generating invoices by copying data between systems, and relying on memory to know when service intervals were due. After implementing automation layers, follow-ups were triggered automatically, invoice data was pulled from completed job cards, and service reminders were generated based on vehicle history. The owner estimated the business saved over fifteen hours of admin per week without adding any staff.",
  };
  return examples[slug] || `A South African business in this space was managing key workflows through scattered messages, spreadsheets, and manual updates. After implementing a structured system tailored to their operation, the team gained clear task ownership, live visibility into progress, and the owner could see where things stood without chasing people. The business reduced delays, improved accountability, and built a foundation that scaled as the operation grew.`;
}

function getRelatedPaths(page: SeoPage) {
  const sharedLinks = [
    { label: "View Pine X services", href: "/services" },
    { label: "View industry hub", href: "/industries" },
    { label: "Open interactive demos", href: "/demos" },
    { label: "Review demo case studies", href: "/case-studies" },
    { label: "Use the business loss calculator", href: "/business-loss-calculator" },
    { label: "Read insights for owners", href: "/insights" },
    { label: "Get My Free System Audit", href: "/contact#lead-form" },
  ];

  if (page.slug.includes("workshop")) {
    return [
      { label: "Workshop insight article", href: "/insights/how-workshops-can-use-job-card-systems" },
      { label: "Workshop industry page", href: "/industries" },
      ...sharedLinks,
    ];
  }

  if (page.slug.includes("dealership")) {
    return [
      {
        label: "Dealership insight article",
        href: "/insights/how-car-dealerships-can-track-leads-and-stock-better",
      },
      { label: "Lead management systems", href: "/lead-management-system" },
      ...sharedLinks,
    ];
  }

  if (page.slug.includes("lead") || page.slug.includes("crm")) {
    return [
      {
        label: "Lead follow-up insight article",
        href: "/insights/how-to-get-more-leads-without-losing-follow-up",
      },
      { label: "Owner dashboard systems", href: "/owner-dashboard-system" },
      ...sharedLinks,
    ];
  }

  if (page.slug.includes("construction")) {
    return [
      { label: "Construction industry page", href: "/industries" },
      {
        label: "Operational bottlenecks article",
        href: "/insights/how-operational-bottlenecks-quietly-hurt-profit",
      },
      ...sharedLinks,
    ];
  }

  if (page.slug.includes("warehouse")) {
    return [
      { label: "Industries we support", href: "/industries" },
      {
        label: "Business systems guide",
        href: "/business-systems",
      },
      ...sharedLinks,
    ];
  }

  return [
    { label: "Custom business systems guide", href: "/business-systems" },
    { label: "Owner dashboard systems", href: "/owner-dashboard-system" },
    ...sharedLinks,
  ];
}

export function SeoPageTemplate({ page }: SeoPageTemplateProps) {
  const relatedPaths = getRelatedPaths(page);
  const decisionGuide = getDecisionGuide(page.slug);
  const bestFirstBuild = getBestFirstBuild(page.slug);
  const realBusinessExample = getRealBusinessExample(page.slug);

  return (
    <>
      <SchemaScript data={servicePageSchema(page)} />
      <SchemaScript data={faqSchema(page.faqs)} />
      <SchemaScript
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: page.pageTitle, path: `/${page.slug}` },
        ])}
      />

      <section className="relative overflow-hidden border-b border-[#111111]/10 bg-[#F7F7F2] pb-12 pt-12 sm:pb-16 sm:pt-16">
        <div className="animated-hero-bg opacity-70" aria-hidden="true" />
        <div className="section-shell relative">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: page.pageTitle },
            ]}
          />
          <SectionHeading
            badge="Service Insight"
            title={
              <>
                {page.heroTitle.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="heading-gradient">
                  {page.heroTitle.split(" ").slice(-2).join(" ")}
                </span>
              </>
            }
            description={page.heroSummary}
          />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {page.comparisonPoints.map((point) => (
              <article key={point.heading} className="glass-card p-5">
                <h2 className="font-heading text-lg font-semibold text-[#111111]">
                  {point.heading}
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#555962]">
                  {point.content}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[8px] border border-[#111111]/10 bg-white p-6 shadow-[0_18px_45px_rgba(17,17,17,0.06)] sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
              What this helps you decide
            </p>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[#555962] sm:text-base">
              {decisionGuide}
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
        {page.comparisonTable ? (
          <div className="mb-6 overflow-x-auto rounded-[8px] border border-[#111111]/10 bg-white shadow-[0_18px_45px_rgba(17,17,17,0.06)]">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#F7F7F2] text-[#111111]">
                <tr>
                  {page.comparisonTable.headers.map((header) => (
                    <th key={header} className="border-b border-[#111111]/10 px-4 py-3 font-heading font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {page.comparisonTable.rows.map((row) => (
                  <tr key={row.join("-")} className="align-top">
                    {row.map((cell) => (
                      <td key={cell} className="border-b border-[#111111]/10 px-4 py-3 text-[#555962]">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        <div className="grid gap-5">
          {page.practicalSections.map((section) => (
            <article key={section.heading} className="glass-card p-6 sm:p-8">
              <h2 className="font-heading text-2xl font-semibold text-[#111111]">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[#555962]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-7 sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>
              <ul className="mt-5 grid gap-3 text-sm text-[#3d4147] sm:grid-cols-2">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#d9d9d1] bg-[#F7F7F2] py-12 sm:py-16">
        <div className="section-shell">
          <div className="rounded-[8px] border border-[#111111]/10 bg-white p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
              Best first system build
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
              Start with what creates the most control
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#555962] sm:text-base">
              The smallest useful version of this system focuses on a few core layers
              that replace the most urgent operational friction.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {bestFirstBuild.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3 text-sm text-[#3d4147]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#111111] text-[10px] font-bold text-white">
                    {bestFirstBuild.indexOf(item) + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)] py-12 sm:py-16">
        <div className="section-shell">
          <div className="glass-card p-6 sm:p-8">
            <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
              What this looks like in a real business
            </p>
            <h2 className="mt-3 font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
              A practical South African example
            </h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-[#555962] sm:text-base">
              {realBusinessExample}
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell pb-12 sm:pb-16">
        <div className="glass-card p-6 sm:p-8">
          {page.whoThisIsFor?.length ? (
            <div className="mb-6 rounded-[8px] border border-[#111111]/10 bg-white p-5">
              <h2 className="font-heading text-2xl font-semibold text-[#111111]">Who this is for</h2>
              <ul className="mt-4 grid gap-3 text-sm text-[#3d4147] sm:grid-cols-2">
                {page.whoThisIsFor.map((item) => (
                  <li key={item} className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {page.whoThisIsNotFor?.length ? (
            <div className="mb-6 rounded-[8px] border border-[#111111]/10 bg-white p-5">
              <h2 className="font-heading text-2xl font-semibold text-[#111111]">Who this is not for</h2>
              <ul className="mt-4 grid gap-3 text-sm text-[#3d4147] sm:grid-cols-2">
                {page.whoThisIsNotFor.map((item) => (
                  <li key={item} className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <h2 className="font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
            Owner Benefits
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {page.ownerBenefits.map((benefit) => (
              <li
                key={benefit}
                className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3 text-sm text-[#3d4147]"
              >
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-6">
            <h3 className="font-heading text-xl font-semibold text-[#111111]">
              Want this mapped to your business?
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#555962]">
              {page.ctaBody}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/contact#lead-form" className="cta-button" data-event="free_audit_click">
                Get My Free System Audit <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/demos" className="cta-secondary" data-event="demo_click">
                View Live Demo Systems
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-12 sm:pb-16">
        <div className="rounded-[8px] border border-[#111111]/10 bg-white p-6 shadow-[0_18px_45px_rgba(17,17,17,0.06)] sm:p-8">
          <h2 className="font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
            Related pages that help you evaluate the next move
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#555962] sm:text-base">
            These pages help you compare options, see industry-specific examples, and move toward a practical first step.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPaths.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3 text-sm font-medium text-[#3d4147] transition hover:border-[#111111]/25 hover:text-[#111111]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-16">
        <SectionHeading badge="FAQ" title="Common Questions" />
        <div className="mx-auto mt-8 max-w-4xl">
          <FaqAccordion items={page.faqs} />
        </div>
      </section>
    </>
  );
}
