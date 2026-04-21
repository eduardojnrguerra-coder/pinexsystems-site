import type { DemoRecord } from "@/lib/demo-systems";

interface DemoPipelineProps {
  stages: string[];
  records: DemoRecord[];
  accent: string;
}

export function DemoPipeline({ stages, records, accent }: DemoPipelineProps) {
  return (
    <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4">
      <h2 className="font-heading text-lg font-semibold text-white">Pipeline / Workflow</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {stages.map((stage) => {
          const stageRecords = records.filter((record) => record.status === stage);

          return (
            <div key={stage} className="rounded-[8px] border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">{stage}</p>
                <span
                  className="rounded-full px-2.5 py-1 text-xs font-semibold text-[#0b0c10]"
                  style={{ backgroundColor: accent }}
                >
                  {stageRecords.length}
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {(stageRecords.length ? stageRecords : records.slice(0, 1)).map((record) => (
                  <div
                    key={`${stage}-${record.id}`}
                    className="rounded-[8px] border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-[#d8d8d2]"
                  >
                    {stageRecords.length ? record.name : "No current records"}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
