import Link from "next/link";

interface SiteLogoProps {
  href?: string;
}

export function SiteLogo({ href = "/" }: SiteLogoProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-3"
      aria-label="Pine X Systems"
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#111111]/10 bg-[#111111] text-sm font-bold text-white shadow-[0_10px_24px_rgba(17,17,17,0.12)]">
        X
      </span>
      <span className="font-heading text-base font-semibold text-[#111111] sm:text-lg">
        Pine <span className="text-[#6b6f76]">X</span> Systems
      </span>
    </Link>
  );
}
