import type { ReactNode } from "react";

export function HuttonPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`overflow-hidden rounded-[14px] border border-[#111111]/10 bg-white/95 shadow-[0_22px_60px_rgba(17,17,17,0.08)] ${className}`}
    >
      {children}
    </section>
  );
}

export function HuttonPanelHeader({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#111111]/8 px-4 py-4 sm:px-5">
      <div className="min-w-0 flex-1">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7b7e86]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 font-heading text-xl font-semibold text-[#111111]">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 max-w-3xl text-sm leading-6 text-[#555962]">
            {description}
          </p>
        ) : null}
      </div>
      {aside ? <div className="min-w-0 shrink-0">{aside}</div> : null}
    </div>
  );
}

export function HuttonStatCard({
  label,
  value,
  detail,
  tone = "cyan",
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "cyan" | "blue" | "amber" | "green" | "red";
}) {
  const toneMap = {
    cyan: "bg-[linear-gradient(180deg,rgba(103,232,249,0.16),rgba(255,255,255,0.95))]",
    blue: "bg-[linear-gradient(180deg,rgba(96,165,250,0.14),rgba(255,255,255,0.95))]",
    amber: "bg-[linear-gradient(180deg,rgba(245,211,108,0.18),rgba(255,255,255,0.95))]",
    green: "bg-[linear-gradient(180deg,rgba(16,185,129,0.16),rgba(255,255,255,0.95))]",
    red: "bg-[linear-gradient(180deg,rgba(248,113,113,0.14),rgba(255,255,255,0.95))]",
  };

  return (
    <div
      className={`rounded-[12px] border border-[#111111]/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] ${toneMap[tone]}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6b7280]">
        {label}
      </p>
      <p className="mt-3 font-heading text-3xl font-semibold text-[#111111]">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-[#555962]">{detail}</p>
    </div>
  );
}

export function HuttonStatusBadge({ value }: { value: string }) {
  let classes = "border-[#67E8F9]/30 bg-[#67E8F9]/12 text-[#0f766e]";

  if (/complaint|overdue|urgent issue|human attention required|urgent|cancelled|no show/i.test(value)) {
    classes = "border-rose-300/35 bg-rose-200/20 text-rose-700";
  } else if (/review needed|approval|parts|waiting|high|priority|backordered|attention|draft|awaiting client confirmation|rescheduled|pending/i.test(value)) {
    classes = "border-[#F5D36C]/35 bg-[#F5D36C]/18 text-[#8a5b00]";
  } else if (/confirmed booking|quality|closed|arrived|complete|ready|approved|handled|confirmed/i.test(value)) {
    classes = "border-emerald-400/30 bg-emerald-400/12 text-emerald-700";
  } else if (/ai booking intent|calendar linked|draft record created|collected|service|progress|checked|assigned|active|new|reception|manager|coordinator|admin|normal|low|synced|client replied|pickup|drop-off|return|scheduled|en route|requested|invoice|booking query|reschedule|transport request|quote approval|quote rejection|booking|follow-up|today/i.test(value)) {
    classes = "border-[#60A5FA]/30 bg-[#60A5FA]/12 text-[#1d4ed8]";
  }

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${classes}`}
    >
      {value}
    </span>
  );
}

export function HuttonEmptyState({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-[12px] border border-dashed border-[#111111]/14 bg-[#FAFAF7] px-4 py-8 text-center">
      <p className="text-sm font-semibold text-[#111111]">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#555962]">{detail}</p>
    </div>
  );
}

export function HuttonProgress({ value }: { value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-[#6b7280]">
        <span>Progress</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded-full bg-[#ECEAE4]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#111111,#60A5FA)]"
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

export function HuttonDataLabel({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="rounded-[8px] border border-[#111111]/8 bg-[#FAFAF7] px-3 py-3">
      <p className="text-[11px] uppercase tracking-[0.14em] text-[#7b7e86]">
        {label}
      </p>
      <div className="mt-1 text-sm font-medium text-[#111111]">{value}</div>
    </div>
  );
}
