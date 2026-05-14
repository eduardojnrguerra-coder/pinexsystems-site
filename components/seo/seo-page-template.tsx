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
              What this page is helping you evaluate
            </p>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[#555962] sm:text-base">
              {page.purpose}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {page.targetKeywords.slice(0, 4).map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-[#111111]/10 bg-[#F7F7F2] px-3 py-2 text-xs font-medium text-[#555962]"
                >
                  {keyword}
                </span>
              ))}
            </div>
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
              {page.ctaHeading}
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
            If this keyword matches the pressure in your business, these pages will
            help you compare options, see examples, and move toward a practical
            first step.
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
