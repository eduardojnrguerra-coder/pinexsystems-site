import {
  BellRing,
  ClipboardPlus,
  MessageCircleMore,
  PackagePlus,
  TimerReset,
  Truck,
} from "lucide-react";

import { HuttonJobCard } from "@/components/demos/hutton/HuttonJobCard";
import {
  HuttonPanel,
  HuttonEmptyState,
  HuttonPanelHeader,
  HuttonStatCard,
  HuttonStatusBadge,
} from "@/components/demos/hutton/HuttonUi";
import type {
  HuttonClient,
  HuttonInboxMessage,
  HuttonJob,
  HuttonTechnician,
  HuttonTransportTask,
  HuttonVehicle,
} from "@/lib/hutton-service-types";

type DashboardAlert = {
  id: string;
  title: string;
  detail: string;
  tone: "amber" | "blue" | "red" | "green";
};

export function HuttonDashboard({
  jobs,
  clients,
  vehicles,
  technicians,
  transportTasks,
  inbox,
  bookingsToday,
  alerts,
  onAdvanceJob,
  onOpenJob,
  onQuickAction,
}: {
  jobs: HuttonJob[];
  clients: HuttonClient[];
  vehicles: HuttonVehicle[];
  technicians: HuttonTechnician[];
  transportTasks: HuttonTransportTask[];
  inbox: HuttonInboxMessage[];
  bookingsToday: number;
  alerts: DashboardAlert[];
  onAdvanceJob: (jobId: string) => void;
  onOpenJob: (jobId: string) => void;
  onQuickAction: (
    action:
      | "new-booking"
      | "check-in"
      | "request-part"
      | "transport-request"
      | "open-whatsapp",
  ) => void;
}) {
  const jobsInProgress = jobs.filter((job) =>
    /Inspection In Progress|Approved|In Service|Quality Check/.test(job.status),
  ).length;
  const waitingApproval = jobs.filter((job) => job.status === "Waiting for Approval").length;
  const waitingParts = jobs.filter((job) =>
    /Waiting for Parts|Parts Ordered/.test(job.status),
  ).length;
  const readyForCollection = jobs.filter(
    (job) => job.status === "Ready for Collection",
  ).length;
  const shuttleTasksPending = transportTasks.filter(
    (task) => task.status !== "Completed" && task.status !== "Client Dropped Off",
  ).length;

  const quickActions = [
    {
      id: "new-booking" as const,
      label: "New booking",
      icon: ClipboardPlus,
    },
    {
      id: "check-in" as const,
      label: "Check in vehicle",
      icon: TimerReset,
    },
    {
      id: "request-part" as const,
      label: "Request part",
      icon: PackagePlus,
    },
    {
      id: "transport-request" as const,
      label: "Add transport request",
      icon: Truck,
    },
    {
      id: "open-whatsapp" as const,
      label: "Open WhatsApp centre",
      icon: MessageCircleMore,
    },
  ];

  const spotlightJobs = jobs
    .slice()
    .sort((a, b) => {
      const priorityWeight = { Urgent: 4, High: 3, Normal: 2, Low: 1 };
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    })
    .slice(0, 4);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <HuttonStatCard label="Bookings today" value={`${bookingsToday}`} detail="Reception demand for the current service day." tone="cyan" />
        <HuttonStatCard label="Jobs in progress" value={`${jobsInProgress}`} detail="Vehicles currently in active inspection, repair, or QC." tone="blue" />
        <HuttonStatCard label="Waiting approval" value={`${waitingApproval}`} detail="Jobs paused until the client signs off." tone="amber" />
        <HuttonStatCard label="Waiting for parts" value={`${waitingParts}`} detail="Supplier-linked delays currently affecting throughput." tone="blue" />
        <HuttonStatCard label="Ready for collection" value={`${readyForCollection}`} detail="Completed work ready for handover and payment." tone="green" />
        <HuttonStatCard label="Shuttle tasks pending" value={`${shuttleTasksPending}`} detail="Pickup and drop-off tasks still in motion." tone="red" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.16fr_0.84fr]">
        <HuttonPanel>
          <HuttonPanelHeader
            eyebrow="Control Centre"
            title="Today's operating picture"
            description="Use this as the opening view in a client meeting: bookings, workshop movement, transport load, and communication pressure in one place."
          />
          <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5 xl:grid-cols-5">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => onQuickAction(action.id)}
                  className="rounded-[10px] border border-[#111111]/10 bg-[linear-gradient(180deg,#ffffff,#f7f7f2)] px-4 py-4 text-left transition hover:-translate-y-0.5 hover:border-[#67E8F9]/45"
                >
                  <Icon className="h-5 w-5 text-[#60A5FA]" />
                  <p className="mt-3 text-sm font-semibold text-[#111111]">{action.label}</p>
                  <p className="mt-1 text-xs text-[#7b7e86]">
                    {action.id === "new-booking"
                      ? "Start intake and client details"
                      : action.id === "check-in"
                        ? "Move the next arrival into workshop flow"
                        : action.id === "request-part"
                          ? "Raise a supplier request from the active job"
                          : action.id === "transport-request"
                            ? "Add pickup, drop-off, or return transport"
                            : "Review inbound and outbound client updates"}
                  </p>
                </button>
              );
            })}
          </div>
        </HuttonPanel>

        <HuttonPanel>
          <HuttonPanelHeader
            eyebrow="Alerts Panel"
            title="Operational pressure"
            description="Overdue jobs, delayed parts, pending responses, shuttle tasks, and urgent AI inbox items."
            aside={<BellRing className="h-5 w-5 text-[#60A5FA]" />}
          />
          <div className="space-y-3 p-4 sm:p-5">
            {alerts.length ? (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`rounded-[10px] border p-4 ${
                    alert.tone === "red"
                      ? "border-rose-300/45 bg-rose-50"
                      : alert.tone === "amber"
                        ? "border-[#F5D36C]/40 bg-[#fff9ea]"
                        : alert.tone === "green"
                          ? "border-emerald-300/40 bg-emerald-50"
                          : "border-[#60A5FA]/25 bg-[#eff6ff]"
                  }`}
                >
                  <p className="text-sm font-semibold text-[#111111]">{alert.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#555962]">{alert.detail}</p>
                </div>
              ))
            ) : (
              <HuttonEmptyState
                title="No active escalations"
                detail="The workshop is on plan right now. Use this space to call out the risks that matter during a live client demo."
              />
            )}
          </div>
        </HuttonPanel>
      </div>

      <HuttonPanel>
        <HuttonPanelHeader
          eyebrow="Live Job Cards"
          title="Priority jobs to demo"
          description={`${inbox.length} inbound messages and ${transportTasks.length} transport tasks are tied back to live jobs.`}
          aside={<HuttonStatusBadge value="Live operations view" />}
        />
        <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-2">
          {spotlightJobs.map((job) => {
            const client = clients.find((item) => item.id === job.clientId) ?? clients[0];
            const vehicle = vehicles.find((item) => item.id === job.vehicleId) ?? vehicles[0];
            const technician = technicians.find((item) => item.id === job.technicianId);

            return (
              <HuttonJobCard
                key={job.id}
                job={job}
                client={client}
                vehicle={vehicle}
                technician={technician}
                onAdvance={onAdvanceJob}
                onOpen={onOpenJob}
              />
            );
          })}
        </div>
      </HuttonPanel>

      <HuttonPanel>
        <HuttonPanelHeader
          eyebrow="Dependency Snapshot"
          title="What could slow today down"
          description="A simple management layer showing which dependencies are most likely to block throughput."
        />
        <div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
          <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#7b7e86]">Approvals</p>
            <p className="mt-3 text-sm leading-6 text-[#555962]">
              {jobs.filter((job) => job.status === "Waiting for Approval").length} jobs are waiting on client sign-off before work can continue.
            </p>
          </div>
          <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#7b7e86]">Parts</p>
            <p className="mt-3 text-sm leading-6 text-[#555962]">
              {jobs.filter((job) => /Waiting for Parts|Parts Ordered/.test(job.status)).length} jobs are linked to supply dependencies and ETA promises.
            </p>
          </div>
          <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#7b7e86]">Transport</p>
            <p className="mt-3 text-sm leading-6 text-[#555962]">
              {transportTasks.filter((task) => task.status !== "Completed").length} active shuttle tasks are still affecting reception planning.
            </p>
          </div>
        </div>
      </HuttonPanel>
    </div>
  );
}
