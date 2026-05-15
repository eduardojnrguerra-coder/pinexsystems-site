"use client";

import { useState } from "react";

import { DemoCardGrid } from "@/components/demos/DemoCardGrid";

type FilterOption = {
  label: string;
  slug: string;
};

const filterOptions: FilterOption[] = [
  { label: "I run a workshop", slug: "workshop" },
  { label: "I run a dealership", slug: "dealership" },
  { label: "I run a logistics business", slug: "logistics" },
  { label: "I run a construction business", slug: "construction" },
  { label: "I manage stock or warehousing", slug: "warehouse" },
  { label: "I need a custom business system", slug: "custom-business" },
];

export function DemoFilterPanel() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = (slug: string) => {
    setActiveFilter((prev) => (prev === slug ? null : slug));
  };

  return (
    <div>
      <div className="mb-8">
        <p className="font-heading text-lg font-semibold text-[#111111]">
          Find the demo closest to your business
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {filterOptions.map((option) => {
            const isActive = activeFilter === option.slug;
            return (
              <button
                key={option.slug}
                type="button"
                onClick={() => handleFilterClick(option.slug)}
                data-event="demo_selector_click"
                data-filter-slug={option.slug}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-[#67E8F9] bg-[#67E8F9]/10 text-[#0891b2] shadow-[0_0_12px_rgba(103,232,249,0.2)]"
                    : "border-[#d9d9d1] bg-white text-[#3d4147] hover:border-[#111111]/25"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div id="demo-systems">
        <DemoCardGrid tone="light" highlightSlug={activeFilter} />
      </div>
    </div>
  );
}
