import { useMemo, useState } from "react";

import type {
  HuttonBookingForm,
  HuttonCalendarEvent,
  HuttonClient,
  HuttonInboxMessage,
  HuttonJob,
  HuttonVehicle,
  HuttonWhatsAppUpdate,
} from "@/lib/hutton-service-types";
import {
  HuttonDataLabel,
  HuttonEmptyState,
  HuttonPanel,
  HuttonPanelHeader,
  HuttonStatusBadge,
} from "@/components/demos/hutton/HuttonUi";

export function WhatsAppCommunicationCentre({
  inbox,
  clients,
  jobs,
  vehicles,
  calendarEvents,
  selectedJob,
  timeline,
  onUpdateInboxMessage,
  onApplyBookingAutomation,
  onOpenReception,
  onOpenJob,
}: {
  inbox: HuttonInboxMessage[];
  clients: HuttonClient[];
  jobs: HuttonJob[];
  vehicles: HuttonVehicle[];
  calendarEvents: HuttonCalendarEvent[];
  selectedJob: HuttonJob;
  timeline: HuttonWhatsAppUpdate[];
  onUpdateInboxMessage: (
    messageId: string,
    patch: Partial<HuttonInboxMessage>,
  ) => void;
  onApplyBookingAutomation: (messageId: string) => void;
  onOpenReception: (prefill?: Partial<HuttonBookingForm>) => void;
  onOpenJob: (jobId: string) => void;
}) {
  const [selectedInboxId, setSelectedInboxId] = useState(inbox[0]?.id ?? "");

  const selectedMessage = useMemo(
    () => inbox.find((message) => message.id === selectedInboxId) ?? inbox[0],
    [inbox, selectedInboxId],
  );

  const linkedJob = jobs.find((job) => job.id === selectedMessage?.jobId);
  const linkedVehicle = vehicles.find((vehicle) => vehicle.id === linkedJob?.vehicleId);
  const linkedCalendarEvent = calendarEvents.find(
    (event) =>
      event.id === selectedMessage?.aiBookingAnalysis?.linkedCalendarEventId ||
      event.jobId === selectedMessage?.aiBookingAnalysis?.linkedJobId,
  );
  const extracted = selectedMessage?.aiBookingAnalysis?.extractedFields;

  return (
    <div className="grid gap-5 xl:grid-cols-[0.86fr_1.14fr]">
      <HuttonPanel>
        <HuttonPanelHeader
          eyebrow="AI Inbox Analysis"
          title="Incoming WhatsApp routing"
          description="Use this screen to explain how Hutton can turn scattered WhatsApp traffic into a managed service queue."
        />
        <div className="space-y-3 p-4 sm:p-5">
          {inbox.length ? inbox.map((message) => {
            const client = clients.find((item) => item.id === message.clientId);
            const active = message.id === selectedMessage?.id;
            const job = jobs.find((item) => item.id === message.jobId);
            const vehicle = vehicles.find((item) => item.id === job?.vehicleId);

            return (
              <button
                key={message.id}
                type="button"
                onClick={() => setSelectedInboxId(message.id)}
                className={`w-full rounded-[10px] border p-4 text-left transition ${
                  active
                    ? "border-[#111111]/18 bg-[#111111] text-white"
                    : "border-[#111111]/10 bg-white"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{client?.name}</p>
                  <span className={`text-xs ${active ? "text-[#d8d8d2]" : "text-[#7b7e86]"}`}>
                    {message.receivedAt}
                  </span>
                </div>
                <p className={`mt-1 text-xs ${active ? "text-[#d8d8d2]" : "text-[#7b7e86]"}`}>
                  {job?.id ?? "Unlinked"} {vehicle ? `- ${vehicle.make} ${vehicle.model}` : ""}
                </p>
                <p className="mt-2 text-sm font-medium">{message.subject}</p>
                <p className={`mt-2 text-sm leading-6 ${active ? "text-[#d8d8d2]" : "text-[#555962]"}`}>
                  {message.preview}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <HuttonStatusBadge value={message.classification} />
                  {message.aiBookingAnalysis?.detectedIntent ? (
                    <HuttonStatusBadge value="AI booking intent" />
                  ) : null}
                  <HuttonStatusBadge value={message.priority} />
                  <HuttonStatusBadge value={message.routedTo} />
                  <HuttonStatusBadge value={message.status} />
                  {message.aiBookingAnalysis?.outcome ? (
                    <HuttonStatusBadge value={message.aiBookingAnalysis.outcome} />
                  ) : null}
                  {message.humanAttentionRequired ? (
                    <HuttonStatusBadge value="Human attention required" />
                  ) : null}
                </div>
              </button>
            );
          }) : (
            <HuttonEmptyState
              title="No inbound WhatsApp items"
              detail="When messages arrive, they will be classified, prioritised, and routed here."
            />
          )}
        </div>
      </HuttonPanel>

      <div className="space-y-5">
        <HuttonPanel>
          <HuttonPanelHeader
            eyebrow="Selected Message"
            title={selectedMessage?.subject ?? "No message selected"}
            description="AI-style analysis is shown beside job context so reception, workshop, and management can respond consistently."
          />
          {selectedMessage ? (
            <div className="space-y-4 p-4 sm:p-5">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <HuttonDataLabel
                  label="Client"
                  value={clients.find((client) => client.id === selectedMessage.clientId)?.name}
                />
                <HuttonDataLabel label="Assigned team" value={selectedMessage.routedTo} />
                <HuttonDataLabel label="Intent" value={selectedMessage.classification} />
                <HuttonDataLabel label="Priority" value={selectedMessage.priority} />
                <HuttonDataLabel label="Linked job" value={linkedJob?.id ?? "Unlinked"} />
                <HuttonDataLabel
                  label="Vehicle"
                  value={linkedVehicle ? `${linkedVehicle.make} ${linkedVehicle.model}` : "Not linked"}
                />
                <HuttonDataLabel label="Timestamp" value={selectedMessage.receivedAt} />
                <HuttonDataLabel label="Status" value={selectedMessage.status} />
              </div>

              {selectedMessage.aiBookingAnalysis ? (
                <div className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
                  <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
                        AI booking analysis
                      </p>
                      <HuttonStatusBadge
                        value={`${Math.round(selectedMessage.aiBookingAnalysis.confidence * 100)}% confidence`}
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <HuttonStatusBadge value="AI booking intent" />
                      {selectedMessage.aiBookingAnalysis.outcome ? (
                        <HuttonStatusBadge value={selectedMessage.aiBookingAnalysis.outcome} />
                      ) : null}
                      {linkedCalendarEvent ? <HuttonStatusBadge value="Calendar linked" /> : null}
                      {selectedMessage.aiBookingAnalysis.linkedDraftRecordId ? (
                        <HuttonStatusBadge value="Draft record created" />
                      ) : null}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-[#555962]">
                      {selectedMessage.aiBookingAnalysis.reasoning}
                    </p>
                    {selectedMessage.aiBookingAnalysis.missingCoreFields.length ? (
                      <div className="mt-4 rounded-[10px] border border-[#F5D36C]/40 bg-[#fff9ea] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
                          Missing core fields
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {selectedMessage.aiBookingAnalysis.missingCoreFields.map((field) => (
                            <HuttonStatusBadge key={field} value={field} />
                          ))}
                        </div>
                      </div>
                    ) : null}
                    {selectedMessage.aiBookingAnalysis.alternativeSlots?.length ? (
                      <div className="mt-4 rounded-[10px] border border-[#60A5FA]/25 bg-[#eff6ff] p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
                          Alternative times
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {selectedMessage.aiBookingAnalysis.alternativeSlots.map((slot) => (
                            <HuttonStatusBadge key={slot} value={slot} />
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="rounded-[10px] border border-[#111111]/10 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
                      Extracted fields
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <HuttonDataLabel label="Customer" value={extracted?.customerName ?? "To confirm"} />
                      <HuttonDataLabel label="Phone" value={extracted?.phoneNumber ?? "To confirm"} />
                      <HuttonDataLabel
                        label="Vehicle"
                        value={[extracted?.vehicleMake, extracted?.vehicleModel].filter(Boolean).join(" ") || "To confirm"}
                      />
                      <HuttonDataLabel label="Registration" value={extracted?.registration ?? "Not supplied"} />
                      <HuttonDataLabel label="Service request" value={extracted?.serviceRequest ?? "To confirm"} />
                      <HuttonDataLabel label="Preferred date" value={extracted?.preferredDate ?? "To confirm"} />
                      <HuttonDataLabel
                        label="Preferred time"
                        value={extracted?.preferredTime ?? extracted?.timeWindow ?? "To confirm"}
                      />
                      <HuttonDataLabel
                        label="Transport"
                        value={
                          extracted?.transportRequired
                            ? "Requested"
                            : extracted?.transportRequired === false
                              ? "Not requested"
                              : "Not stated"
                        }
                      />
                      <HuttonDataLabel label="Pickup address" value={extracted?.pickupAddress ?? "Not supplied"} />
                      <HuttonDataLabel label="Drop-off address" value={extracted?.dropoffAddress ?? "Not supplied"} />
                      <HuttonDataLabel label="Urgency" value={extracted?.urgency ?? "Normal"} />
                      <HuttonDataLabel
                        label="Linked record"
                        value={
                          selectedMessage.aiBookingAnalysis.linkedJobId ??
                          selectedMessage.aiBookingAnalysis.linkedDraftRecordId ??
                          linkedCalendarEvent?.id ??
                          "Not created yet"
                        }
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
                  Suggested reply
                </p>
                <p className="mt-3 text-sm leading-6 text-[#555962]">
                  {selectedMessage.suggestedReply}
                </p>
                {linkedCalendarEvent ? (
                  <p className="mt-3 text-xs uppercase tracking-[0.12em] text-[#7b7e86]">
                    Linked calendar item {linkedCalendarEvent.id} - {linkedCalendarEvent.title}
                  </p>
                ) : null}
              </div>

              {selectedMessage.humanAttentionRequired ? (
                <div className="rounded-[10px] border border-rose-300/45 bg-rose-50 p-4 text-sm leading-6 text-rose-800">
                  Human attention required: this message should stay visible to {selectedMessage.routedTo.toLowerCase()} until a person responds.
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3">
                {selectedMessage.aiBookingAnalysis?.detectedIntent &&
                !selectedMessage.aiBookingAnalysis.automationApplied ? (
                  <button
                    type="button"
                    className="cta-button"
                    onClick={() => onApplyBookingAutomation(selectedMessage.id)}
                  >
                    Apply AI booking outcome
                  </button>
                ) : null}
                {selectedMessage.aiBookingAnalysis?.outcome === "Draft Booking" ||
                selectedMessage.aiBookingAnalysis?.outcome === "Review Needed" ? (
                  <button
                    type="button"
                    className="cta-secondary"
                    onClick={() =>
                      onOpenReception({
                        clientName: extracted?.customerName,
                        phone: extracted?.phoneNumber,
                        vehicleMake: extracted?.vehicleMake,
                        vehicleModel: extracted?.vehicleModel,
                        registration: extracted?.registration,
                        serviceRequest: extracted?.serviceRequest,
                        bookingDateTime: [extracted?.preferredDate, extracted?.preferredTime ?? extracted?.timeWindow]
                          .filter(Boolean)
                          .join(" "),
                        notes: selectedMessage.preview,
                        transportRequired: Boolean(extracted?.transportRequired),
                        pickupAddress: extracted?.pickupAddress,
                        dropoffAddress: extracted?.dropoffAddress,
                      })
                    }
                  >
                    Open reception draft
                  </button>
                ) : null}
                {selectedMessage.aiBookingAnalysis?.linkedJobId ? (
                  <button
                    type="button"
                    className="cta-secondary"
                    onClick={() => onOpenJob(selectedMessage.aiBookingAnalysis!.linkedJobId!)}
                  >
                    Open created booking
                  </button>
                ) : null}
                <button
                  type="button"
                  className="cta-secondary"
                  onClick={() =>
                    onUpdateInboxMessage(selectedMessage.id, { status: "Assigned" })
                  }
                >
                  Mark assigned
                </button>
                <button
                  type="button"
                  className="cta-button"
                  onClick={() =>
                    onUpdateInboxMessage(selectedMessage.id, { status: "Handled" })
                  }
                >
                  Mark handled
                </button>
              </div>
            </div>
          ) : null}
        </HuttonPanel>

        <HuttonPanel>
          <HuttonPanelHeader
            eyebrow="Outgoing Timeline"
            title={`WhatsApp updates for ${selectedJob.id}`}
            description="Automatic stage updates and incoming replies stay attached to the active job record."
          />
          <div className="space-y-3 p-4 sm:p-5">
            {timeline.length ? timeline.map((item) => (
              <div key={item.id} className="rounded-[10px] border border-[#111111]/10 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <HuttonStatusBadge value={item.direction} />
                    {item.classification ? <HuttonStatusBadge value={item.classification} /> : null}
                    {item.routedTo ? <HuttonStatusBadge value={item.routedTo} /> : null}
                  </div>
                  <span className="text-xs text-[#7b7e86]">{item.at}</span>
                </div>
                <p className="mt-3 text-sm font-semibold text-[#111111]">{item.sender}</p>
                <p className="mt-2 text-sm leading-6 text-[#555962]">{item.message}</p>
              </div>
            )) : (
              <HuttonEmptyState
                title="No timeline activity yet"
                detail="As the job moves through the workshop, outgoing updates and client replies appear here automatically."
              />
            )}
          </div>
        </HuttonPanel>
      </div>
    </div>
  );
}
