import type { DemoSystem } from "@/lib/demo-systems";

interface DemoMetricCardProps {
  metric: DemoSystem["metrics"][number];
  active: boolean;
  accent: string;
  onClick: () => void;
}

export function DemoMetricCard({ metric, active, accent, onClick }: DemoMetricCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`demo-metric-card rounded-[8px] border p-4 text-left transition ${
        active
          ? "border-[#67E8F9]/60 bg-white/[0.08]"
          : "border-white/10 bg-white/[0.035] hover:border-white/20"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs uppercase text-[#a8a8a2]">{metric.label}</p>
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: accent }} />
      </div>
      <p className="mt-3 font-heading text-2xl font-semibold text-white">{metric.value}</p>
      <p className="mt-2 text-xs leading-5 text-[#d8d8d2]">{metric.detail}</p>
    </button>
  );
}
