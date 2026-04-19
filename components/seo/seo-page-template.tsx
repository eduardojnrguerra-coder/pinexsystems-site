import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { FaqAccordion } from "@/components/ui/faq-accordion";
import { SchemaScript } from "@/components/ui/schema-script";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqSchema, servicePageSchema } from "@/lib/schema";
import type { SeoPage } from "@/lib/types";

interface SeoPageTemplateProps {
  page: SeoPage;
}

export function SeoPageTemplate({ page }: SeoPageTemplateProps) {
  return (
    <>
      <SchemaScript data={servicePageSchema(page)} />
      <SchemaScript data={faqSchema(page.faqs)} />

      <section className="relative overflow-hidden border-b border-[#111111]/10 bg-[#F7F7F2] pb-12 pt-12 sm:pb-16 sm:pt-16">
        <div className="animated-hero-bg opacity-70" aria-hidden="true" />
        <div className="section-shell relative">
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
        </div>
      </section>

      <section className="section-shell py-12 sm:py-16">
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
              <Link href="/contact" className="cta-button">
                Book a Free Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/demos" className="cta-secondary">
                See Demo Systems
              </Link>
            </div>
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
