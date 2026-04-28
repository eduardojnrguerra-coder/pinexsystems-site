import { ArrowRightLeft } from "lucide-react";

import { HuttonJobCard } from "@/components/demos/hutton/HuttonJobCard";
import {
  HuttonEmptyState,
  HuttonPanel,
  HuttonPanelHeader,
} from "@/components/demos/hutton/HuttonUi";
import type {
  HuttonClient,
  HuttonJob,
  HuttonTechnician,
  HuttonVehicle,
} from "@/lib/hutton-service-types";

type BoardColumn = {
  id: string;
  label: string;
  statuses: HuttonJob["status"][];
};

const boardColumns: BoardColumn[] = [
  { id: "checked-in", label: "Checked In", statuses: ["Booking Confirmed", "Vehicle Collected", "Checked In"] },
  { id: "inspection", label: "Inspection", statuses: ["Inspection In Progress"] },
  { id: "waiting-approval", label: "Waiting Approval", statuses: ["Waiting for Approval"] },
  { id: "waiting-parts", label: "Waiting Parts", statuses: ["Waiting for Parts", "Parts Ordered", "Parts Arrived"] },
  { id: "in-service", label: "In Service", statuses: ["Approved", "In Service"] },
  { id: "quality-check", label: "Quality Check", statuses: ["Repair Complete", "Quality Check"] },
  { id: "ready", label: "Ready", statuses: ["Ready for Collection"] },
  { id: "completed", label: "Completed", statuses: ["Delivered / Collected", "Closed"] },
];

export function WorkshopBoard({
  jobs,
  clients,
  vehicles,
  technicians,
  onAdvanceJob,
  onOpenJob,
}: {
  jobs: HuttonJob[];
  clients: HuttonClient[];
  vehicles: HuttonVehicle[];
  technicians: HuttonTechnician[];
  onAdvanceJob: (jobId: string) => void;
  onOpenJob: (jobId: string) => void;
}) {
  return (
    <HuttonPanel>
      <HuttonPanelHeader
        eyebrow="Workshop Board"
        title="Workshop stage board"
        description="Show bay movement at a glance, then open any card to move into the digital job record."
        aside={<ArrowRightLeft className="h-5 w-5 text-[#60A5FA]" />}
      />
      <div className="overflow-x-auto p-4 sm:p-5">
        <div className="grid min-w-[1480px] gap-4 xl:min-w-0 xl:grid-cols-4 2xl:grid-cols-8">
          {boardColumns.map((column) => {
            const columnJobs = jobs.filter((job) => column.statuses.includes(job.status));

            return (
              <div
                key={column.id}
                className="rounded-[12px] border border-[#111111]/10 bg-[#FAFAF7] p-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-heading text-sm font-semibold text-[#111111]">
                    {column.label}
                  </h3>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#555962]">
                    {columnJobs.length}
                  </span>
                </div>

                <div className="mt-3 space-y-3">
                  {columnJobs.length ? (
                    columnJobs.map((job) => {
                      const client =
                        clients.find((item) => item.id === job.clientId) ?? clients[0];
                      const vehicle =
                        vehicles.find((item) => item.id === job.vehicleId) ?? vehicles[0];
                      const technician = technicians.find(
                        (item) => item.id === job.technicianId,
                      );

                      return (
                        <HuttonJobCard
                          key={job.id}
                          job={job}
                          client={client}
                          vehicle={vehicle}
                          technician={technician}
                          onAdvance={onAdvanceJob}
                          onOpen={onOpenJob}
                          compact
                        />
                      );
                    })
                  ) : (
                    <HuttonEmptyState
                      title={`No jobs in ${column.label.toLowerCase()}`}
                      detail="As work moves through the day, this lane updates automatically."
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </HuttonPanel>
  );
}
