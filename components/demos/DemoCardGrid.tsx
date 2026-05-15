import Link from "next/link";

import { demoIconMap, demoSystems } from "@/lib/demo-systems";

interface DemoCardGridProps {
  tone?: "dark" | "light";
  compact?: boolean;
  slugs?: string[];
  highlightSlug?: string | null;
}

export function DemoCardGrid({ tone = "dark", compact = false, slugs, highlightSlug }: DemoCardGridProps) {
  const isLight = tone === "light";
  const visibleDemos = slugs
    ? slugs
        .map((slug) => demoSystems.find((demo) => demo.slug === slug))
        .filter((demo): demo is (typeof demoSystems)[number] => Boolean(demo))
    : demoSystems;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {visibleDemos.map((demo) => {
        const Icon = demoIconMap[demo.icon];
        const isHighlighted = highlightSlug && (
          demo.slug === highlightSlug ||
          (highlightSlug === "workshop" && ["workshop", "hutton-motors-service-centre"].includes(demo.slug))
        );

        return (
          <article
            key={demo.slug}
            className={`group rounded-[8px] border p-5 transition hover:-translate-y-1 ${
              isLight
                ? "border-[#d9d9d1] bg-white text-[#0b0c10] shadow-[0_20px_55px_rgba(17,24,39,0.08)]"
                : "border-white/10 bg-white/[0.035] text-white shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
            } ${
              isHighlighted
                ? "ring-2 ring-[#67E8F9] shadow-[0_0_24px_rgba(103,232,249,0.25)] border-[#67E8F9]"
                : ""
            }`}
          >
            <Link href={`/demos/${demo.slug}`} data-event="open_demo_click" data-demo-slug={demo.slug} className="block">
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] border ${
                    isLight
                      ? "border-[#d9d9d1] bg-[#0b0c10] text-white"
                      : "border-white/10 bg-white text-[#0b0c10]"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <span className="shrink-0 rounded-full border border-[#67E8F9]/25 bg-[#67E8F9]/10 px-3 py-1 text-xs font-semibold text-[#0891b2]">
                  Interactive Preview
                </span>
              </div>

              <h3
                className={`mt-5 font-heading text-xl font-semibold ${
                  isLight ? "text-[#0b0c10]" : "text-white"
                }`}
              >
                {demo.title}
              </h3>
              <p
                className={`mt-3 text-sm leading-7 ${
                  isLight ? "text-[#50545b]" : "text-[#d8d8d2]"
                }`}
              >
                {compact ? demo.seoDescription : demo.description}
              </p>
            </Link>

            <div className="mt-5 space-y-4">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.08em] ${isLight ? "text-[#50545b]" : "text-[#a8a8a2]"}`}>
                  What problem this solves
                </p>
                <p className={`mt-1 text-sm leading-6 ${isLight ? "text-[#3d4147]" : "text-[#d8d8d2]"}`}>
                  {demo.problemSolved}
                </p>
              </div>

              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.08em] ${isLight ? "text-[#50545b]" : "text-[#a8a8a2]"}`}>
                  What the owner sees
                </p>
                <p className={`mt-1 text-sm leading-6 ${isLight ? "text-[#3d4147]" : "text-[#d8d8d2]"}`}>
                  {demo.ownerSees}
                </p>
              </div>

              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.08em] ${isLight ? "text-[#50545b]" : "text-[#a8a8a2]"}`}>
                  What the team uses daily
                </p>
                <p className={`mt-1 text-sm leading-6 ${isLight ? "text-[#3d4147]" : "text-[#d8d8d2]"}`}>
                  {demo.teamUsesDaily}
                </p>
              </div>

              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.08em] ${isLight ? "text-[#50545b]" : "text-[#a8a8a2]"}`}>
                  Best for
                </p>
                <p className={`mt-1 text-sm leading-6 ${isLight ? "text-[#3d4147]" : "text-[#d8d8d2]"}`}>
                  {demo.bestFor}
                </p>
              </div>

              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.08em] ${isLight ? "text-[#50545b]" : "text-[#a8a8a2]"}`}>
                  Key modules
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {demo.modules.map((module) => (
                    <span
                      key={module}
                      className={`rounded-full border px-2.5 py-1 text-[11px] ${
                        isLight
                          ? "border-[#d9d9d1] bg-white text-[#3d4147]"
                          : "border-white/10 bg-white/[0.04] text-[#d8d8d2]"
                      }`}
                    >
                      {module}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                href={`/contact?demo_slug=${demo.slug}&lead_intent=demo_page#lead-form`}
                data-event="request_demo_version_click"
                data-demo-slug={demo.slug}
                className={`cta-button w-full justify-center text-center text-sm font-semibold leading-none ${
                  isLight ? "" : ""
                }`}
              >
                Request This For My Business
              </Link>
              <Link
                href={`/demos/${demo.slug}`}
                data-event="open_demo_click"
                data-demo-slug={demo.slug}
                className={`cta-secondary w-full justify-center text-center text-sm font-semibold leading-none ${
                  isLight ? "" : "border-white/20 text-white hover:border-white/40"
                }`}
              >
                Open System Demo
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
