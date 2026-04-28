import { CarFront, Clock3, Route } from "lucide-react";

import type {
  HuttonClient,
  HuttonJob,
  HuttonTransportTask,
  HuttonVehicle,
} from "@/lib/hutton-service-types";
import {
  HuttonEmptyState,
  HuttonPanel,
  HuttonPanelHeader,
  HuttonStatusBadge,
} from "@/components/demos/hutton/HuttonUi";

const transportStages: HuttonTransportTask["status"][] = [
  "Requested",
  "Scheduled",
  "Driver Assigned",
  "En Route",
  "Client Picked Up",
  "Client Dropped Off",
  "Return Trip Pending",
  "Completed",
];

const drivers = [
  "Unassigned",
  "Pending assignment",
  "Wayne Petersen",
  "Lebo Maseko",
  "Nico Adams",
  "Ayanda Goliath",
] as const;

export function TransportPanel({
  tasks,
  clients,
  jobs,
  vehicles,
  onUpdateTask,
  onUpdateTaskStatus,
}: {
  tasks: HuttonTransportTask[];
  clients: HuttonClient[];
  jobs: HuttonJob[];
  vehicles: HuttonVehicle[];
  onUpdateTask: (taskId: string, patch: Partial<HuttonTransportTask>) => void;
  onUpdateTaskStatus: (taskId: string, status: HuttonTransportTask["status"]) => void;
}) {
  const todayQueue = tasks.filter((task) => /Today/.test(task.requestedTime));

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-[10px] border border-[#111111]/10 bg-[linear-gradient(180deg,#ffffff,#f7f7f2)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
            Today queue
          </p>
          <p className="mt-3 font-heading text-3xl font-semibold text-[#111111]">
            {todayQueue.length}
          </p>
        </div>
        <div className="rounded-[10px] border border-[#111111]/10 bg-[linear-gradient(180deg,#ffffff,#f7f7f2)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
            Awaiting driver
          </p>
          <p className="mt-3 font-heading text-3xl font-semibold text-[#111111]">
            {tasks.filter((task) => /Requested|Scheduled/.test(task.status)).length}
          </p>
        </div>
        <div className="rounded-[10px] border border-[#111111]/10 bg-[linear-gradient(180deg,#ffffff,#f7f7f2)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
            In motion
          </p>
          <p className="mt-3 font-heading text-3xl font-semibold text-[#111111]">
            {tasks.filter((task) => /Driver Assigned|En Route|Client Picked Up/.test(task.status)).length}
          </p>
        </div>
        <div className="rounded-[10px] border border-[#111111]/10 bg-[linear-gradient(180deg,#ffffff,#f7f7f2)] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
            Return trips pending
          </p>
          <p className="mt-3 font-heading text-3xl font-semibold text-[#111111]">
            {tasks.filter((task) => task.status === "Return Trip Pending").length}
          </p>
        </div>
      </div>

      <HuttonPanel>
        <HuttonPanelHeader
          eyebrow="Pickup / Drop-off / Shuttle"
          title="Transport coordination board"
          description="A dispatch view for reception and shuttle coordination, with clear trip ownership and status movement."
          aside={<Route className="h-5 w-5 text-[#60A5FA]" />}
        />
        <div className="overflow-x-auto p-4 sm:p-5">
          <div className="grid min-w-[1480px] gap-4 xl:min-w-0 xl:grid-cols-4 2xl:grid-cols-8">
            {transportStages.map((status) => {
              const stageTasks = tasks.filter((task) => task.status === status);

              return (
                <div
                  key={status}
                  className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-[#111111]">{status}</h3>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[#555962]">
                      {stageTasks.length}
                    </span>
                  </div>

                  <div className="mt-3 space-y-3">
                    {stageTasks.length ? (
                      stageTasks.map((task) => {
                        const client = clients.find((item) => item.id === task.clientId);
                        const job = jobs.find((item) => item.id === task.jobId);
                        const vehicle = vehicles.find((item) => item.id === job?.vehicleId);

                        return (
                          <div
                            key={task.id}
                            className="rounded-[10px] border border-[#111111]/10 bg-white p-4"
                          >
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <p className="font-semibold text-[#111111]">{client?.name}</p>
                                <p className="mt-1 text-xs text-[#7b7e86]">{task.id}</p>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                <HuttonStatusBadge value={task.tripType} />
                                <HuttonStatusBadge value={task.status} />
                              </div>
                            </div>

                            <div className="mt-3 space-y-2 text-sm text-[#555962]">
                              <p>{client?.phone}</p>
                              <p>{task.pickupFrom}</p>
                              <p>{task.dropoffTo}</p>
                              <p>{job?.id} - {vehicle ? `${vehicle.make} ${vehicle.model}` : "Vehicle to confirm"}</p>
                              <p>{task.requestedTime}</p>
                            </div>

                            <div className="mt-3 grid gap-3">
                              <select
                                className="form-input-light"
                                value={task.driver}
                                onChange={(event) =>
                                  onUpdateTask(task.id, {
                                    driver: event.target.value,
                                    status:
                                      event.target.value !== "Unassigned" &&
                                      task.status === "Requested"
                                        ? "Driver Assigned"
                                        : task.status,
                                  })
                                }
                              >
                                {drivers.map((driver) => (
                                  <option key={driver} value={driver}>
                                    {driver}
                                  </option>
                                ))}
                              </select>

                              <select
                                className="form-input-light"
                                value={task.status}
                                onChange={(event) =>
                                  onUpdateTaskStatus(
                                    task.id,
                                    event.target.value as HuttonTransportTask["status"],
                                  )
                                }
                              >
                                {transportStages.map((stage) => (
                                  <option key={stage} value={stage}>
                                    {stage}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <p className="mt-3 text-sm leading-6 text-[#555962]">{task.notes}</p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="rounded-[8px] border border-dashed border-[#111111]/12 px-3 py-6 text-center text-sm text-[#7b7e86]">
                        <HuttonEmptyState
                          title={`No ${status.toLowerCase()} trips`}
                          detail="Trips move through the queue as staff assign drivers and complete each leg."
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </HuttonPanel>

      <div className="grid gap-5 xl:grid-cols-[0.96fr_1.04fr]">
        <HuttonPanel>
          <HuttonPanelHeader
            eyebrow="Today's Queue"
            title="Dispatch order"
            description="Use this strip on mobile or in a live demo to scan today's active transport work first."
            aside={<Clock3 className="h-5 w-5 text-[#60A5FA]" />}
          />
          <div className="space-y-3 p-4 sm:p-5">
            {todayQueue.length ? todayQueue.map((task) => {
              const client = clients.find((item) => item.id === task.clientId);
              return (
                <div key={task.id} className="rounded-[10px] border border-[#111111]/10 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-[#111111]">{client?.name}</p>
                    <HuttonStatusBadge value={task.status} />
                  </div>
                  <p className="mt-2 text-sm text-[#555962]">
                    {task.tripType} at {task.requestedTime}
                  </p>
                  <p className="mt-1 text-sm text-[#555962]">
                    Driver {task.driver}
                  </p>
                </div>
              );
            }) : (
              <HuttonEmptyState
                title="No transport due today"
                detail="New pickup, drop-off, and return trips will appear here as soon as they are scheduled."
              />
            )}
          </div>
        </HuttonPanel>

        <HuttonPanel>
          <HuttonPanelHeader
            eyebrow="Coordinator Snapshot"
            title="Transport health"
            description="A compact view of active drivers, completed trips, and reception pressure."
            aside={<CarFront className="h-5 w-5 text-[#60A5FA]" />}
          />
          <div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
            <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[#7b7e86]">Assigned</p>
              <p className="mt-3 font-heading text-3xl font-semibold text-[#111111]">
                {tasks.filter((task) => task.driver !== "Unassigned" && task.driver !== "Pending assignment").length}
              </p>
            </div>
            <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[#7b7e86]">Completed</p>
              <p className="mt-3 font-heading text-3xl font-semibold text-[#111111]">
                {tasks.filter((task) => task.status === "Completed").length}
              </p>
            </div>
            <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[#7b7e86]">Need action</p>
              <p className="mt-3 font-heading text-3xl font-semibold text-[#111111]">
                {tasks.filter((task) => /Requested|Scheduled|Return Trip Pending/.test(task.status)).length}
              </p>
            </div>
          </div>
        </HuttonPanel>
      </div>
    </div>
  );
}

