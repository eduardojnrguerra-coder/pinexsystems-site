import { useState } from "react";

import type {
  HuttonCalendarEvent,
  HuttonClient,
  HuttonJob,
  HuttonPart,
  HuttonPartRequest,
  HuttonSupplier,
  HuttonTransportTask,
  HuttonVehicle,
  HuttonWhatsAppUpdate,
} from "@/lib/hutton-service-types";
import { jobStatuses } from "@/lib/hutton-service-types";
import {
  HuttonDataLabel,
  HuttonEmptyState,
  HuttonPanel,
  HuttonPanelHeader,
  HuttonProgress,
  HuttonStatusBadge,
} from "@/components/demos/hutton/HuttonUi";

function EditableNote({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
        {label}
      </p>
      <textarea
        className="form-input-light mt-3 min-h-28"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export function JobCardDetail({
  client,
  vehicle,
  job,
  calendarEvents,
  partRequests,
  parts,
  suppliers,
  timeline,
  transportTasks,
  onJobUpdate,
  onAdvance,
  onRequestPart,
}: {
  client: HuttonClient;
  vehicle: HuttonVehicle;
  job: HuttonJob;
  calendarEvents: HuttonCalendarEvent[];
  partRequests: HuttonPartRequest[];
  parts: HuttonPart[];
  suppliers: HuttonSupplier[];
  timeline: HuttonWhatsAppUpdate[];
  transportTasks: HuttonTransportTask[];
  onJobUpdate: (jobId: string, patch: Partial<HuttonJob>) => void;
  onAdvance: (jobId: string) => void;
  onRequestPart: (payload: {
    jobId: string;
    partId: string;
    quantity: number;
    urgency: HuttonPartRequest["urgency"];
    notes: string;
  }) => void;
}) {
  const activeIndex = jobStatuses.indexOf(job.status);
  const [selectedPartId, setSelectedPartId] = useState(parts[0]?.id ?? "");
  const [quantity, setQuantity] = useState("1");
  const [urgency, setUrgency] = useState<HuttonPartRequest["urgency"]>("Priority");
  const [requestNotes, setRequestNotes] = useState("Requested from digital job card.");

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.14fr_0.86fr]">
        <HuttonPanel>
          <HuttonPanelHeader
            eyebrow="Digital Job Card"
            title={`${job.id} - ${vehicle.make} ${vehicle.model}`}
            description="A single digital record for reception, workshop, parts, transport, and client communication."
            aside={<HuttonStatusBadge value={job.status} />}
          />
          <div className="space-y-5 p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <HuttonDataLabel label="Client" value={client.name} />
              <HuttonDataLabel label="Phone" value={client.phone} />
              <HuttonDataLabel label="Email" value={client.email} />
              <HuttonDataLabel label="Preferred contact" value={client.preferredContact} />
              <HuttonDataLabel label="Vehicle" value={`${vehicle.make} ${vehicle.model}`} />
              <HuttonDataLabel label="Registration" value={vehicle.registration} />
              <HuttonDataLabel label="VIN" value={vehicle.vin} />
              <HuttonDataLabel label="Mileage" value={`${vehicle.mileageKm.toLocaleString("en-ZA")} km`} />
              <HuttonDataLabel label="Advisor" value={job.advisor} />
              <HuttonDataLabel label="Technician" value={job.technicianId} />
              <HuttonDataLabel label="Booking status" value={job.bookingStatus} />
              <HuttonDataLabel label="Priority" value={job.priority} />
              <HuttonDataLabel label="ETA" value={job.etaLabel} />
            </div>

            <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
                    Service request summary
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#555962]">{job.concern}</p>
                </div>
                <button type="button" className="cta-button" onClick={() => onAdvance(job.id)}>
                  Mark stage complete
                </button>
              </div>
              <div className="mt-4">
                <HuttonProgress value={job.progressPercent} />
              </div>
            </div>

            <div className="rounded-[10px] border border-[#111111]/10 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
                Stage tracker
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {jobStatuses.map((status, index) => (
                  <div
                    key={status}
                    className={`rounded-[8px] border px-3 py-3 text-sm ${
                      index < activeIndex
                        ? "border-emerald-300/35 bg-emerald-50 text-emerald-800"
                        : index === activeIndex
                          ? "border-[#111111]/18 bg-[#111111] text-white"
                          : "border-[#111111]/8 bg-[#F7F7F2] text-[#7b7e86]"
                    }`}
                  >
                    {status}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </HuttonPanel>

        <div className="space-y-5">
          <HuttonPanel>
            <HuttonPanelHeader
              eyebrow="Client & Vehicle"
              title="Check-in snapshot"
              description="Condition, complaint, and image references captured at reception."
            />
            <div className="space-y-4 p-4 sm:p-5">
              <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
                  Vehicle condition
                </p>
                <p className="mt-2 text-sm leading-6 text-[#555962]">{job.vehicleCondition}</p>
              </div>
              <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
                  Client complaint
                </p>
                <p className="mt-2 text-sm leading-6 text-[#555962]">{job.clientComplaint}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {job.photoChecklist.map((item) => (
                  <div
                    key={item}
                    className="rounded-[10px] border border-dashed border-[#111111]/18 bg-[#FAFAF7] px-4 py-6 text-sm text-[#555962]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </HuttonPanel>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="space-y-5">
          <EditableNote
            label="Technician notes"
            value={job.technicianNotes}
            onChange={(value) => onJobUpdate(job.id, { technicianNotes: value })}
          />
          <EditableNote
            label="Inspection findings"
            value={job.inspectionFindings}
            onChange={(value) => onJobUpdate(job.id, { inspectionFindings: value })}
          />
          <EditableNote
            label="Approval notes"
            value={job.approvalNotes}
            onChange={(value) => onJobUpdate(job.id, { approvalNotes: value })}
          />
          <EditableNote
            label="Internal notes"
            value={job.internalNotes}
            onChange={(value) => onJobUpdate(job.id, { internalNotes: value })}
          />
        </div>

        <div className="space-y-5">
          <HuttonPanel>
            <HuttonPanelHeader
              eyebrow="Booking and Follow-Up"
              title="Linked booking history"
              description="Booking promises, follow-ups, and collection reminders remain attached to the record after check-in."
            />
            <div className="space-y-3 p-4 sm:p-5">
              {calendarEvents.length ? (
                calendarEvents.map((event) => (
                  <div key={event.id} className="rounded-[10px] border border-[#111111]/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-[#111111]">{event.title}</p>
                      <div className="flex flex-wrap gap-2">
                        <HuttonStatusBadge value={event.eventType} />
                        <HuttonStatusBadge value={event.status} />
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#555962]">{event.notes}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#7b7e86]">
                      {new Intl.DateTimeFormat("en-ZA", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      }).format(new Date(event.startAt))}
                    </p>
                  </div>
                ))
              ) : (
                <HuttonEmptyState
                  title="No booking history linked"
                  detail="Booking and follow-up events will appear here as reception and the calendar workflow evolve."
                />
              )}
            </div>
          </HuttonPanel>

          <HuttonPanel>
            <HuttonPanelHeader
              eyebrow="Parts requested"
              title="Job-linked parts"
              description="Parts and supplier visibility attached directly to the job card."
            />
            <div className="space-y-3 p-4 sm:p-5">
              <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
                  Raise a parts request from this job
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <select
                    className="form-input-light"
                    value={selectedPartId}
                    onChange={(event) => setSelectedPartId(event.target.value)}
                  >
                    {parts.map((part) => (
                      <option key={part.id} value={part.id}>
                        {part.name} - {part.partNumber}
                      </option>
                    ))}
                  </select>
                  <input
                    className="form-input-light"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    placeholder="Qty"
                  />
                  <select
                    className="form-input-light"
                    value={urgency}
                    onChange={(event) =>
                      setUrgency(event.target.value as HuttonPartRequest["urgency"])
                    }
                  >
                    <option value="Routine">Routine</option>
                    <option value="Priority">Priority</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                  <button
                    type="button"
                    className="cta-button"
                    onClick={() =>
                      onRequestPart({
                        jobId: job.id,
                        partId: selectedPartId || parts[0]?.id || "",
                        quantity: Number.parseInt(quantity, 10) || 1,
                        urgency,
                        notes: requestNotes,
                      })
                    }
                  >
                    Request part
                  </button>
                </div>
                <textarea
                  className="form-input-light mt-3 min-h-24"
                  value={requestNotes}
                  onChange={(event) => setRequestNotes(event.target.value)}
                />
              </div>

              {partRequests.length ? (
                partRequests.map((request) => {
                  const linkedPart = parts.find((item) => item.id === request.partId);
                  const supplier = suppliers.find((item) => item.id === request.supplierId);

                  return (
                    <div key={request.id} className="rounded-[10px] border border-[#111111]/10 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-[#111111]">{request.id}</p>
                        <div className="flex flex-wrap gap-2">
                          <HuttonStatusBadge value={request.status} />
                          <HuttonStatusBadge value={request.urgency} />
                        </div>
                      </div>
                      <p className="mt-2 text-sm font-medium text-[#111111]">
                        {linkedPart?.name ?? request.partId}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#555962]">{request.notes}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#7b7e86]">
                        ETA {request.eta}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-[#7b7e86]">
                        Supplier {supplier?.name ?? request.supplierId}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-[10px] border border-dashed border-[#111111]/18 px-4 py-8 text-sm text-[#555962]">
                  <HuttonEmptyState
                    title="No parts requests on this job"
                    detail="Raise the first request here and it will appear in the ordering board automatically."
                  />
                </div>
              )}
            </div>
          </HuttonPanel>

          <HuttonPanel>
            <HuttonPanelHeader
              eyebrow="Transport requests"
              title="Client transport"
              description="Pickup, drop-off, and return movement stays visible inside the active job."
            />
            <div className="space-y-3 p-4 sm:p-5">
              {transportTasks.length ? (
                transportTasks.map((task) => (
                  <div key={task.id} className="rounded-[10px] border border-[#111111]/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-[#111111]">{task.id}</p>
                      <div className="flex flex-wrap gap-2">
                        <HuttonStatusBadge value={task.tripType} />
                        <HuttonStatusBadge value={task.status} />
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[#555962]">
                      {task.pickupFrom}{" -> "}{task.dropoffTo}
                    </p>
                    <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#7b7e86]">
                      {task.requestedTime}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-[10px] border border-dashed border-[#111111]/18 px-4 py-8 text-sm text-[#555962]">
                  <HuttonEmptyState
                    title="No transport linked"
                    detail="If the client needs movement support, add it from booking intake or the transport module."
                  />
                </div>
              )}
            </div>
          </HuttonPanel>

          <HuttonPanel>
            <HuttonPanelHeader
              eyebrow="WhatsApp communication"
              title="Inline job timeline"
              description="Recent client and system communication remains visible inside the active record."
            />
            <div className="space-y-3 p-4 sm:p-5">
              {timeline.map((item) => (
                <div key={item.id} className="rounded-[10px] border border-[#111111]/10 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-2">
                      <HuttonStatusBadge value={item.direction} />
                      {item.classification ? <HuttonStatusBadge value={item.classification} /> : null}
                    </div>
                    <span className="text-xs text-[#7b7e86]">{item.at}</span>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-[#111111]">{item.sender}</p>
                  <p className="mt-2 text-sm leading-6 text-[#555962]">{item.message}</p>
                </div>
              ))}
            </div>
          </HuttonPanel>
        </div>
      </div>
    </div>
  );
}
