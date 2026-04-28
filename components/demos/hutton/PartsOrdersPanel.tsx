import type {
  HuttonJob,
  HuttonPart,
  HuttonPartRequest,
  HuttonSupplier,
} from "@/lib/hutton-service-types";
import {
  HuttonEmptyState,
  HuttonPanel,
  HuttonPanelHeader,
  HuttonStatusBadge,
} from "@/components/demos/hutton/HuttonUi";

const pipeline = ["Requested", "Ordered", "Arrived", "Installed", "Backordered"] as const;

function isOverdue(request: HuttonPartRequest) {
  return /Tomorrow|Awaiting/i.test(request.eta) && !/Arrived|Installed/i.test(request.status);
}

export function PartsOrdersPanel({
  requests,
  parts,
  suppliers,
  jobs,
  onUpdateRequestStatus,
}: {
  requests: HuttonPartRequest[];
  parts: HuttonPart[];
  suppliers: HuttonSupplier[];
  jobs: HuttonJob[];
  onUpdateRequestStatus: (
    requestId: string,
    status: HuttonPartRequest["status"],
  ) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {pipeline.map((status) => (
          <div
            key={status}
            className="rounded-[10px] border border-[#111111]/10 bg-[linear-gradient(180deg,#ffffff,#f7f7f2)] p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
              {status}
            </p>
            <p className="mt-3 font-heading text-3xl font-semibold text-[#111111]">
              {requests.filter((request) => request.status === status).length}
            </p>
          </div>
        ))}
      </div>

      <HuttonPanel>
        <HuttonPanelHeader
          eyebrow="Parts Ordering"
          title="Requests and supplier tracking"
          description="Track supplier progress, job impact, and whether the request came from an existing library item."
        />
        <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-2 2xl:grid-cols-3">
          {requests.length ? requests.map((request) => {
            const part = parts.find((item) => item.id === request.partId);
            const supplier = suppliers.find((item) => item.id === request.supplierId);
            const job = jobs.find((item) => item.id === request.jobId);
            const overdue = isOverdue(request);

            return (
              <div
                key={request.id}
                className={`rounded-[10px] border p-4 ${
                  overdue
                    ? "border-rose-300/40 bg-rose-50"
                    : "border-[#111111]/10 bg-[linear-gradient(180deg,#ffffff,#f7f7f2)]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-heading text-lg font-semibold text-[#111111]">{request.id}</p>
                  <div className="flex flex-wrap gap-2">
                    <HuttonStatusBadge value={request.status} />
                    <HuttonStatusBadge value={request.urgency} />
                    {overdue ? <HuttonStatusBadge value="Overdue" /> : null}
                  </div>
                </div>

                <p className="mt-3 text-sm font-medium text-[#111111]">
                  {part?.name ?? request.partId}
                </p>
                <p className="mt-1 text-sm text-[#555962]">Linked job {request.jobId}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#7b7e86]">
                  {job?.status ?? "Job in queue"}
                </p>

                <div className="mt-4 grid gap-3 text-sm text-[#555962] sm:grid-cols-2">
                  <p>Supplier: {supplier?.name}</p>
                  <p>Qty: {request.quantity}</p>
                  <p>ETA: {request.eta}</p>
                  <p>Library item: {part ? "Known and reusable" : "One-off request"}</p>
                </div>

                <div className="mt-4 rounded-[8px] border border-[#111111]/8 bg-white px-3 py-3 text-sm leading-6 text-[#555962]">
                  {request.notes}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {pipeline.map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        status === request.status
                          ? "border-[#111111]/18 bg-[#111111] text-white"
                          : "border-[#111111]/10 bg-white text-[#555962]"
                      }`}
                      onClick={() => onUpdateRequestStatus(request.id, status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            );
          }) : (
            <HuttonEmptyState
              title="No parts requests on the board"
              detail="Use the job card or dashboard quick actions to raise the first supplier request."
            />
          )}
        </div>
      </HuttonPanel>
    </div>
  );
}
