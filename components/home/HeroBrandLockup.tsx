import Image from "next/image";

export function HeroBrandLockup() {
  return (
    <div className="inline-flex max-w-full items-center gap-3 rounded-[8px] border border-[#111111]/10 bg-white/85 px-4 py-3 shadow-[0_14px_32px_rgba(17,17,17,0.08)] backdrop-blur-sm">
      <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-[#111111]/10 bg-[#071126] shadow-[0_10px_24px_rgba(17,17,17,0.12)]">
        <Image
          src="/logo.svg"
          alt=""
          width={48}
          height={48}
          unoptimized
          className="h-full w-full"
        />
      </span>
      <span className="min-w-0">
        <span className="block font-heading text-sm font-semibold tracking-[0.16em] text-[#111111] uppercase sm:text-[0.82rem]">
          Pine X Systems
        </span>
        <span className="mt-0.5 block text-sm leading-6 text-[#555962] sm:text-[0.95rem]">
          Premium control systems for South African owners, managers, and teams.
        </span>
      </span>
    </div>
  );
}
