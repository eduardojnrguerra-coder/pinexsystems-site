import Link from "next/link";
import Image from "next/image";

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
      <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-[8px] border border-[#111111]/10 bg-[#071126] shadow-[0_10px_24px_rgba(17,17,17,0.12)]">
        <Image
          src="/logo.svg"
          alt=""
          width={36}
          height={36}
          unoptimized
          className="h-full w-full"
        />
      </span>
      <span className="leading-tight">
        <span className="block font-heading text-base font-semibold text-[#111111] sm:text-[1.05rem]">
          Pine <span className="text-[#4f647f]">X</span> Systems
        </span>
        <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-[#7b7e86]">
          South African business systems
        </span>
      </span>
    </Link>
  );
}
