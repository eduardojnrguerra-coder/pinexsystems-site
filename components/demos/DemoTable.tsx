import type { DemoRecord } from "@/lib/demo-systems";

interface DemoTableProps {
  records: DemoRecord[];
  selectedRecordId: string | null;
  onSelectRecord: (id: string) => void;
}

export function DemoTable({
  records,
  selectedRecordId,
  onSelectRecord,
}: DemoTableProps) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.035]">
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full border-collapse text-left text-sm">
          <thead className="border-b border-white/10 text-xs uppercase text-[#a8a8a2]">
            <tr>
              <th className="px-4 py-3">Record</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Owner</th>
              <th className="px-4 py-3">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {records.map((record) => (
              <tr
                key={record.id}
                onClick={() => onSelectRecord(record.id)}
                className={`cursor-pointer transition hover:bg-white/[0.05] ${
                  selectedRecordId === record.id ? "bg-white/[0.08]" : ""
                }`}
              >
                <td className="px-4 py-4">
                  <p className="font-semibold text-white">{record.name}</p>
                  <p className="mt-1 text-xs text-[#a8a8a2]">{record.id} - {record.detail}</p>
                </td>
                <td className="px-4 py-4 text-[#d8d8d2]">{record.category}</td>
                <td className="px-4 py-4">
                  <span className="rounded-full border border-[#67E8F9]/25 bg-[#67E8F9]/10 px-3 py-1 text-xs font-semibold text-[#67E8F9]">
                    {record.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-[#d8d8d2]">{record.owner}</td>
                <td className="px-4 py-4 font-semibold text-white">{record.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {records.length === 0 ? (
        <div className="p-6 text-center text-sm text-[#d8d8d2]">
          No records match this filter. Clear search or choose another metric.
        </div>
      ) : null}
    </div>
  );
}
