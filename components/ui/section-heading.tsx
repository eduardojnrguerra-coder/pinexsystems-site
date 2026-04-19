import type { ReactNode } from "react";

interface SectionHeadingProps {
  badge: string;
  title: ReactNode;
  description?: string;
  centered?: boolean;
}

export function SectionHeading({
  badge,
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "mx-auto max-w-4xl text-center" : ""}>
      <p className="inline-flex rounded-[6px] border border-[#111111]/10 bg-white px-2.5 py-1 text-xs font-medium text-[#555962]">
        {badge}
      </p>
      <h2 className="mt-2.5 font-heading text-2xl font-semibold leading-tight text-[#111111] sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-[#555962]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
