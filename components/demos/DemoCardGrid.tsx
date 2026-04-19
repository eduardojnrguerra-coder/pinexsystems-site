import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { demoIconMap, demoSystems } from "@/lib/demo-systems";

interface DemoCardGridProps {
  tone?: "dark" | "light";
  compact?: boolean;
}

export function DemoCardGrid({ tone = "dark", compact = false }: DemoCardGridProps) {
  const isLight = tone === "light";

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {demoSystems.map((demo) => {
        const Icon = demoIconMap[demo.icon];

        return (
          <Link
            key={demo.slug}
            href={`/demos/${demo.slug}`}
            className={`group rounded-[8px] border p-5 transition hover:-translate-y-1 ${
              isLight
                ? "border-[#d9d9d1] bg-white text-[#0b0c10] shadow-[0_20px_55px_rgba(17,24,39,0.08)] hover:border-[#67E8F9]/55"
                : "border-white/10 bg-white/[0.035] text-white shadow-[0_20px_60px_rgba(0,0,0,0.22)] hover:border-[#67E8F9]/45"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-[8px] border ${
                  isLight
                    ? "border-[#d9d9d1] bg-[#0b0c10] text-white"
                    : "border-white/10 bg-white text-[#0b0c10]"
                }`}
              >
                <Icon className="h-6 w-6" />
              </span>
              <span className="rounded-full border border-[#67E8F9]/25 bg-[#67E8F9]/10 px-3 py-1 text-xs font-semibold text-[#0891b2]">
                Demo Mode
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

            <div
              className={`mt-5 rounded-[8px] border p-4 ${
                isLight
                  ? "border-[#d9d9d1] bg-[#f7f7f2]"
                  : "border-white/10 bg-black/25"
              }`}
            >
              <div className="grid grid-cols-3 gap-2">
                {demo.metrics.slice(0, 3).map((metric) => (
                  <div
                    key={metric.label}
                    className={`rounded-[8px] border p-2 ${
                      isLight ? "border-[#d9d9d1] bg-white" : "border-white/10 bg-white/[0.04]"
                    }`}
                  >
                    <p className={`text-sm font-semibold ${isLight ? "text-[#0b0c10]" : "text-white"}`}>
                      {metric.value}
                    </p>
                    <p className={`mt-1 text-[11px] ${isLight ? "text-[#5b5f66]" : "text-[#a8a8a2]"}`}>
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {demo.modules.slice(0, 5).map((module) => (
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

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0891b2]">
              Open System Demo <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
