import Link from "next/link";

import { FaqAccordion } from "@/components/ui/faq-accordion";
import { SchemaScript } from "@/components/ui/schema-script";
import { blogPostingSchema, faqSchema } from "@/lib/schema";
import type { InsightArticle } from "@/lib/types";

interface InsightArticleProps {
  article: InsightArticle;
}

function getSupportLinks(article: InsightArticle) {
  const shared = [
    { label: "Use the business loss calculator", href: "/business-loss-calculator" },
    { label: "View Pine X services", href: "/services" },
    { label: "Open interactive demos", href: "/demos" },
    { label: "Book a discovery call", href: "/contact#lead-form" },
  ];

  if (article.category.includes("Dealership")) {
    return [
      { label: "Dealership system page", href: "/dealership-management-system-south-africa" },
      { label: "Owner dashboard systems", href: "/owner-dashboard-system" },
      ...shared,
    ];
  }

  if (article.category.includes("Workshop")) {
    return [
      { label: "Workshop system page", href: "/workshop-management-system" },
      { label: "Lead management systems", href: "/lead-management-system" },
      ...shared,
    ];
  }

  if (article.category.includes("Lead")) {
    return [
      { label: "Lead management systems", href: "/lead-management-system" },
      { label: "Custom CRM systems", href: "/custom-crm-south-africa" },
      ...shared,
    ];
  }

  return [
    { label: "Custom business systems guide", href: "/business-systems" },
    { label: "Owner dashboard systems", href: "/owner-dashboard-system" },
    ...shared,
  ];
}

export function InsightArticleView({ article }: InsightArticleProps) {
  const midPointIndex = Math.max(1, Math.floor(article.blocks.length / 2));
  const supportLinks = getSupportLinks(article);

  return (
    <>
      <SchemaScript data={blogPostingSchema(article)} />
      <SchemaScript data={faqSchema(article.faq)} />

      <article className="bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.12),transparent_26rem),linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)] py-12 sm:py-16">
        <div className="section-shell">
        <header className="mx-auto max-w-4xl">
          <p className="inline-flex rounded-[6px] border border-[#111111]/10 bg-white px-3 py-1 text-xs font-medium text-[#555962]">
            Insights / {article.category}
          </p>
          <h1 className="mt-4 font-heading text-3xl font-semibold leading-tight text-[#111111] sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-5 text-base leading-8 text-[#555962] sm:text-lg">
            {article.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-xs text-[#6b6c70]">
            <span>{article.readingTime}</span>
            <span>Published {article.publishedAt}</span>
            <span>Updated {article.updatedAt}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {article.keywords.slice(0, 5).map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-[#111111]/10 bg-white px-3 py-1.5 text-xs font-medium text-[#555962]"
              >
                {keyword}
              </span>
            ))}
          </div>
        </header>

        <section className="mx-auto mt-8 max-w-4xl rounded-[8px] border border-[#111111]/10 bg-white p-6 shadow-[0_18px_45px_rgba(17,17,17,0.06)] sm:p-8">
          <h2 className="font-heading text-2xl font-semibold text-[#111111]">
            Next useful pages if this problem sounds familiar
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {supportLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3 text-sm font-medium text-[#3d4147] transition hover:border-[#111111]/25 hover:text-[#111111]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <div className="mx-auto mt-8 max-w-4xl space-y-6">
          {article.blocks.map((block, index) => (
            <section key={block.heading} className="glass-card p-6 sm:p-8">
              <h2 className="font-heading text-2xl font-semibold text-[#111111]">
                {block.heading}
              </h2>
              <div className="mt-4 space-y-4 text-[#555962]">
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-sm leading-8 sm:text-base">
                    {paragraph}
                  </p>
                ))}
              </div>

              {block.bullets?.length ? (
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {block.bullets.map((bullet) => (
                    <li
                      key={bullet}
                    className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] px-4 py-3 text-sm text-[#3d4147]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}

              {block.subSections?.length ? (
                <div className="mt-7 space-y-6">
                  {block.subSections.map((subSection) => (
                    <div key={subSection.heading} className="rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-4 sm:p-5">
                      <h3 className="font-heading text-lg font-semibold text-[#111111]">
                        {subSection.heading}
                      </h3>
                      <div className="mt-3 space-y-3 text-sm leading-7 text-[#555962]">
                        {subSection.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      {subSection.bullets?.length ? (
                        <ul className="mt-4 grid gap-2 text-sm text-[#3d4147]">
                          {subSection.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="rounded-[6px] border border-[#111111]/10 bg-white px-3 py-2"
                            >
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              {index === midPointIndex ? (
                <div className="mt-8 rounded-[8px] border border-[#111111]/10 bg-[#F7F7F2] p-5 sm:p-7">
                  <h3 className="font-heading text-xl font-semibold text-[#111111]">
                    {article.middleCta.heading}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#555962] sm:text-base">
                    {article.middleCta.body}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link href={article.middleCta.primaryHref} className="cta-button">
                      {article.middleCta.primaryLabel}
                    </Link>
                    <Link href={article.middleCta.secondaryHref} className="cta-secondary">
                      {article.middleCta.secondaryLabel}
                    </Link>
                  </div>
                </div>
              ) : null}
            </section>
          ))}
        </div>

        <section className="mx-auto mt-8 max-w-4xl rounded-[8px] border border-[#111111]/10 bg-white p-6 shadow-[0_18px_45px_rgba(17,17,17,0.06)] sm:p-8">
          <h2 className="font-heading text-2xl font-semibold text-[#111111]">
            {article.endCta.heading}
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#555962] sm:text-base">
            {article.endCta.body}
          </p>
          <div className="mt-5">
            <Link href={article.endCta.primaryHref} className="cta-button">
              {article.endCta.primaryLabel}
            </Link>
          </div>
        </section>

        <section className="mx-auto mt-10 max-w-4xl">
          <h2 className="font-heading text-2xl font-semibold text-[#111111]">
            Related Pages
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {article.relatedLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="rounded-[8px] border border-[#111111]/10 bg-white px-4 py-3 text-sm text-[#3d4147] transition hover:border-[#111111]/25 hover:text-[#111111]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-4xl">
          <h2 className="font-heading text-2xl font-semibold text-[#111111]">FAQ</h2>
          <div className="mt-5">
            <FaqAccordion items={article.faq} />
          </div>
        </section>
        </div>
      </article>
    </>
  );
}
