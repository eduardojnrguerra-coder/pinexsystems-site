import {
  AlertTriangle,
  CheckCircle2,
  CircleDollarSign,
  Gauge,
  ListChecks,
  RadioTower,
  TrendingUp,
  Users,
} from "lucide-react";

const metrics = [
  {
    label: "Leads this month",
    value: "184",
    detail: "+22 qualified",
    icon: TrendingUp,
  },
  {
    label: "Jobs in progress",
    value: "38",
    detail: "7 due today",
    icon: ListChecks,
  },
  {
    label: "Staff tasks",
    value: "126",
    detail: "91% on time",
    icon: Users,
  },
  {
    label: "Revenue snapshot",
    value: "R428k",
    detail: "month to date",
    icon: CircleDollarSign,
  },
  {
    label: "Missed follow-ups",
    value: "3",
    detail: "needs action",
    icon: AlertTriangle,
  },
  {
    label: "Stock alerts",
    value: "12",
    detail: "low or aging",
    icon: RadioTower,
  },
];

const activity = [
  "New lead assigned to sales: Toyota Hilux enquiry",
  "Workshop job card JC-418 moved to quality check",
  "Stock alert: 3 items below reorder level",
  "Follow-up completed for finance application",
];

export function HeroVisual() {
  return (
    <div className="hero-visual relative overflow-hidden rounded-[8px] border border-white/10 p-4 shadow-2xl shadow-black/40 sm:p-5">
      <div className="hero-lines" aria-hidden="true">
        <svg viewBox="0 0 720 520" role="presentation">
          <path d="M-10 105 C 120 70, 210 130, 360 100 S 580 70, 760 120" />
          <path d="M-30 290 C 140 240, 260 330, 420 285 S 620 240, 760 315" />
        </svg>
      </div>

      <div className="relative z-10 rounded-[8px] border border-white/10 bg-black/72">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-white">Owner Control System</p>
            <p className="text-xs text-neutral-500">Live operations dashboard</p>
          </div>
          <div className="flex items-center gap-2 rounded-[6px] border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-neutral-300">
            <span className="pulse-node" />
            Live
          </div>
        </div>

        <div className="grid gap-px bg-white/10 md:grid-cols-3">
          {metrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <div key={metric.label} className="bg-[#0a0a0a] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs text-neutral-500">{metric.label}</p>
                  <Icon className="h-4 w-4 text-neutral-500" />
                </div>
                <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                <p className="mt-1 text-xs text-neutral-400">{metric.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-px border-t border-white/10 bg-white/10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-[#0a0a0a] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">Revenue snapshot</p>
              <p className="text-xs text-neutral-500">30 days</p>
            </div>
            <div className="mt-5 flex h-24 items-end gap-2">
              {[32, 46, 38, 54, 62, 58, 72, 68, 82, 76, 92, 88].map(
                (height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className="flex-1 rounded-[3px] bg-white/80"
                    style={{ height: `${height}%` }}
                  />
                ),
              )}
            </div>
          </div>

          <div className="bg-[#0a0a0a] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">System health</p>
              <Gauge className="h-4 w-4 text-neutral-500" />
            </div>
            <div className="mt-5 space-y-3">
              {["Lead pipeline", "Job tracking", "Reports"].map((label, index) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-xs text-neutral-500">
                    <span>{label}</span>
                    <span>{[98, 94, 91][index]}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-white"
                      style={{ width: `${[98, 94, 91][index]}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#0a0a0a] p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Recent activity</p>
            <p className="text-xs text-neutral-500">Updated now</p>
          </div>
          <div className="space-y-2">
            {activity.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-[6px] border border-white/10 bg-white/[0.025] px-3 py-2 text-xs text-neutral-300"
              >
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[var(--accent)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
