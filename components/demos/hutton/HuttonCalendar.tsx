"use client";

import { CalendarDays, Clock3, Filter, Plus, UserRound } from "lucide-react";
import { useMemo, useState } from "react";

import {
  HuttonDataLabel,
  HuttonEmptyState,
  HuttonPanel,
  HuttonPanelHeader,
  HuttonStatCard,
  HuttonStatusBadge,
} from "@/components/demos/hutton/HuttonUi";
import type {
  CalendarEventStatus,
  CalendarEventType,
  HuttonBookingForm,
  HuttonCalendarEvent,
  HuttonClient,
  HuttonJob,
  HuttonTechnician,
  HuttonVehicle,
} from "@/lib/hutton-service-types";

type CalendarView = "day" | "week" | "month";

const eventTypes: CalendarEventType[] = [
  "Booking",
  "Follow-up",
  "Vehicle Pickup",
  "Vehicle Drop-off",
  "Vehicle Collection",
  "Internal Workshop Reminder",
  "Approval Follow-up",
];

const eventStatuses: CalendarEventStatus[] = [
  "Draft",
  "Confirmed",
  "Awaiting Client Confirmation",
  "Rescheduled",
  "Completed",
  "Cancelled",
  "No Show",
  "Scheduled",
  "Awaiting Response",
  "In Progress",
  "Pending",
];

const demoToday = new Date("2026-04-23T08:00:00+02:00");

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function startOfWeek(date: Date) {
  const next = startOfDay(date);
  const day = next.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  next.setDate(next.getDate() + diff);
  return next;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function eventDate(event: HuttonCalendarEvent) {
  return new Date(event.startAt);
}

function formatTimeRange(event: HuttonCalendarEvent) {
  const formatter = new Intl.DateTimeFormat("en-ZA", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${formatter.format(new Date(event.startAt))} - ${formatter.format(new Date(event.endAt))}`;
}

function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat("en-ZA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}

function statusForType(type: CalendarEventType): CalendarEventStatus {
  if (type === "Booking") return "Draft";
  if (type === "Approval Follow-up" || type === "Follow-up") return "Awaiting Response";
  return "Scheduled";
}

function endTimeFromStart(startTime: string) {
  const [hours, minutes] = startTime.split(":").map((value) => Number.parseInt(value, 10));
  const date = new Date("2026-04-23T00:00:00+02:00");
  date.setHours(hours, minutes + 30, 0, 0);
  return `${date.getHours().toString().padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

export function HuttonCalendar({
  events,
  technicians,
  selectedJob,
  selectedClient,
  selectedVehicle,
  onCreateEvent,
  onUpdateEvent,
  onOpenJob,
  onOpenReception,
  onOpenWhatsApp,
}: {
  events: HuttonCalendarEvent[];
  technicians: HuttonTechnician[];
  selectedJob: HuttonJob;
  selectedClient: HuttonClient;
  selectedVehicle: HuttonVehicle;
  onCreateEvent: (event: HuttonCalendarEvent) => void;
  onUpdateEvent: (eventId: string, patch: Partial<HuttonCalendarEvent>) => void;
  onOpenJob: (jobId: string) => void;
  onOpenReception: (prefill?: Partial<HuttonBookingForm>) => void;
  onOpenWhatsApp: (jobId: string) => void;
}) {
  const [view, setView] = useState<CalendarView>("week");
  const [focusDate, setFocusDate] = useState(demoToday);
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id ?? "");
  const [typeFilter, setTypeFilter] = useState<CalendarEventType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<CalendarEventStatus | "All">("All");
  const [staffFilter, setStaffFilter] = useState<string | "All">("All");
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickAddType, setQuickAddType] = useState<CalendarEventType>("Follow-up");
  const [quickAddTitle, setQuickAddTitle] = useState("Client follow-up reminder");
  const [quickAddDate, setQuickAddDate] = useState("2026-04-23");
  const [quickAddStartTime, setQuickAddStartTime] = useState("14:30");
  const [quickAddEndTime, setQuickAddEndTime] = useState("15:00");
  const [quickAddAssignedStaff, setQuickAddAssignedStaff] = useState("Reception");
  const [quickAddNotes, setQuickAddNotes] = useState(
    "Created during the live demo to show how reception and workshop can schedule follow-up work.",
  );

  const staffOptions = useMemo(() => {
    const fromEvents = events.map((event) => event.assignedStaff);
    return [
      "Reception",
      "Workshop Manager",
      "Shuttle Coordinator",
      ...technicians.map((tech) => tech.name),
      ...fromEvents,
    ]
      .filter((value, index, array) => value && array.indexOf(value) === index)
      .sort();
  }, [events, technicians]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => (typeFilter === "All" ? true : event.eventType === typeFilter))
      .filter((event) => (statusFilter === "All" ? true : event.status === statusFilter))
      .filter((event) => (staffFilter === "All" ? true : event.assignedStaff === staffFilter))
      .sort((a, b) => +new Date(a.startAt) - +new Date(b.startAt));
  }, [events, staffFilter, statusFilter, typeFilter]);

  const weekStart = startOfWeek(focusDate);
  const weekDays = Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
  const monthStart = startOfMonth(focusDate);
  const monthGridStart = startOfWeek(monthStart);
  const monthDays = Array.from({ length: 35 }, (_, index) => addDays(monthGridStart, index));

  const selectedEvent =
    filteredEvents.find((event) => event.id === selectedEventId) ?? filteredEvents[0];

  const dayEvents = filteredEvents.filter((event) => sameDay(eventDate(event), focusDate));
  const weekEvents = filteredEvents.filter((event) => {
    const date = eventDate(event);
    return date >= weekStart && date < addDays(weekStart, 7);
  });
  const monthEvents = filteredEvents.filter((event) => {
    const date = eventDate(event);
    return date.getMonth() === focusDate.getMonth() && date.getFullYear() === focusDate.getFullYear();
  });

  const todayBookings = filteredEvents.filter(
    (event) => sameDay(eventDate(event), demoToday) && event.eventType === "Booking",
  ).length;
  const followUpsDue = filteredEvents.filter(
    (event) =>
      sameDay(eventDate(event), demoToday) &&
      (event.eventType === "Follow-up" || event.eventType === "Approval Follow-up") &&
      event.status !== "Completed",
  ).length;
  const shuttleMoves = filteredEvents.filter(
    (event) =>
      sameDay(eventDate(event), demoToday) &&
      /Vehicle Pickup|Vehicle Drop-off|Vehicle Collection/.test(event.eventType),
  ).length;
  const collectionsDue = filteredEvents.filter(
    (event) =>
      sameDay(eventDate(event), demoToday) &&
      event.eventType === "Vehicle Collection" &&
      event.status !== "Completed",
  ).length;

  const createQuickAddEvent = () => {
    const startAt = `${quickAddDate}T${quickAddStartTime}:00+02:00`;
    const endAt = `${quickAddDate}T${quickAddEndTime}:00+02:00`;
    const nextEvent: HuttonCalendarEvent = {
      id: `CAL-${900 + events.length}`,
      title: quickAddTitle,
      clientName: selectedClient.name,
      phoneNumber: selectedClient.phone,
      vehicleLabel: `${selectedVehicle.make} ${selectedVehicle.model}`,
      registration: selectedVehicle.registration,
      linkedRecordId: selectedJob.id,
      jobId: selectedJob.id,
      clientId: selectedClient.id,
      eventType: quickAddType,
      startAt,
      endAt,
      status: statusForType(quickAddType),
      assignedStaff: quickAddAssignedStaff,
      notes: quickAddNotes,
      address:
        quickAddType === "Vehicle Pickup" || quickAddType === "Vehicle Drop-off"
          ? selectedJob.pickupAddress || selectedJob.dropoffAddress || "Address to confirm"
          : undefined,
      source: "Quick Add",
    };

    onCreateEvent(nextEvent);
    setSelectedEventId(nextEvent.id);
    setShowQuickAdd(false);

    if (quickAddType === "Booking") {
      onOpenReception({
        clientName: selectedClient.name,
        phone: selectedClient.phone,
        email: selectedClient.email,
        vehicleMake: selectedVehicle.make,
        vehicleModel: selectedVehicle.model,
        registration: selectedVehicle.registration,
        vin: selectedVehicle.vin,
        mileage: String(selectedVehicle.mileageKm),
        serviceRequest: selectedJob.concern,
        bookingDateTime: `${formatLongDate(new Date(startAt))} ${quickAddStartTime}`,
        notes: quickAddNotes,
        transportRequired: false,
      });
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HuttonStatCard label="Bookings in plan" value={`${todayBookings}`} detail="Confirmed arrival slots in today's service schedule." tone="cyan" />
        <HuttonStatCard label="Follow-ups due" value={`${followUpsDue}`} detail="Approvals, reminders, and client callbacks still due today." tone="amber" />
        <HuttonStatCard label="Shuttle movements" value={`${shuttleMoves}`} detail="Pickup, drop-off, and collection movements in the day plan." tone="blue" />
        <HuttonStatCard label="Collections due" value={`${collectionsDue}`} detail="Vehicles expected to hand over before close of business." tone="green" />
      </div>

      <HuttonPanel>
        <HuttonPanelHeader
          eyebrow="Calendar & Follow-Up"
          title="Workshop planning calendar"
          description="Coordinate bookings, follow-ups, shuttle movements, and collection promises from one visual plan."
          aside={<CalendarDays className="h-5 w-5 text-[#60A5FA]" />}
        />
        <div className="space-y-4 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {(["day", "week", "month"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                    view === option
                      ? "border-[#111111]/20 bg-[#111111] text-white"
                      : "border-[#111111]/10 bg-white text-[#555962]"
                  }`}
                  onClick={() => setView(option)}
                >
                  {option[0].toUpperCase() + option.slice(1)} view
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="cta-secondary" onClick={() => setFocusDate(demoToday)}>
                Today
              </button>
              <button
                type="button"
                className="cta-secondary"
                onClick={() =>
                  setFocusDate(
                    addDays(focusDate, view === "month" ? -28 : view === "week" ? -7 : -1),
                  )
                }
              >
                Previous
              </button>
              <button
                type="button"
                className="cta-secondary"
                onClick={() =>
                  setFocusDate(
                    addDays(focusDate, view === "month" ? 28 : view === "week" ? 7 : 1),
                  )
                }
              >
                Next
              </button>
              <button
                type="button"
                className="cta-button"
                onClick={() => setShowQuickAdd((current) => !current)}
              >
                <Plus className="h-4 w-4" />
                Quick add
              </button>
            </div>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            <label className="text-sm text-[#555962]">
              Event type
              <select
                className="form-input-light mt-2"
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value as CalendarEventType | "All")}
              >
                <option value="All">All event types</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-[#555962]">
              Status
              <select
                className="form-input-light mt-2"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value as CalendarEventStatus | "All")
                }
              >
                <option value="All">All statuses</option>
                {eventStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-sm text-[#555962]">
              Assigned staff
              <select
                className="form-input-light mt-2"
                value={staffFilter}
                onChange={(event) => setStaffFilter(event.target.value)}
              >
                <option value="All">All staff</option>
                {staffOptions.map((staffMember) => (
                  <option key={staffMember} value={staffMember}>
                    {staffMember}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {showQuickAdd ? (
            <div className="rounded-[12px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#111111]">Quick add booking or follow-up</p>
                  <p className="mt-1 text-sm text-[#555962]">
                    Add a calendar item instantly, then use the linked Hutton modules to continue
                    the workflow.
                  </p>
                </div>
                <HuttonStatusBadge value="Live planner update" />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <label className="text-sm text-[#555962]">
                  Event type
                  <select
                    className="form-input-light mt-2"
                    value={quickAddType}
                    onChange={(event) => {
                      const nextType = event.target.value as CalendarEventType;
                      setQuickAddType(nextType);
                      setQuickAddTitle(
                        nextType === "Booking" ? "New workshop booking" : `${nextType} reminder`,
                      );
                      setQuickAddStartTime(nextType === "Vehicle Pickup" ? "08:15" : "14:30");
                      setQuickAddEndTime(
                        nextType === "Vehicle Pickup" ? "08:45" : endTimeFromStart("14:30"),
                      );
                    }}
                  >
                    {eventTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-sm text-[#555962]">
                  Date
                  <input
                    className="form-input-light mt-2"
                    type="date"
                    value={quickAddDate}
                    onChange={(event) => setQuickAddDate(event.target.value)}
                  />
                </label>
                <label className="text-sm text-[#555962]">
                  Start time
                  <input
                    className="form-input-light mt-2"
                    type="time"
                    value={quickAddStartTime}
                    onChange={(event) => {
                      setQuickAddStartTime(event.target.value);
                      setQuickAddEndTime(endTimeFromStart(event.target.value));
                    }}
                  />
                </label>
                <label className="text-sm text-[#555962]">
                  Assigned staff
                  <select
                    className="form-input-light mt-2"
                    value={quickAddAssignedStaff}
                    onChange={(event) => setQuickAddAssignedStaff(event.target.value)}
                  >
                    {staffOptions.map((staffMember) => (
                      <option key={staffMember} value={staffMember}>
                        {staffMember}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
                <label className="text-sm text-[#555962]">
                  Title
                  <input
                    className="form-input-light mt-2"
                    value={quickAddTitle}
                    onChange={(event) => setQuickAddTitle(event.target.value)}
                  />
                </label>
                <label className="text-sm text-[#555962]">
                  End time
                  <input
                    className="form-input-light mt-2"
                    type="time"
                    value={quickAddEndTime}
                    onChange={(event) => setQuickAddEndTime(event.target.value)}
                  />
                </label>
              </div>
              <label className="mt-3 block text-sm text-[#555962]">
                Notes
                <textarea
                  className="form-input-light mt-2 min-h-24"
                  value={quickAddNotes}
                  onChange={(event) => setQuickAddNotes(event.target.value)}
                />
              </label>
              <div className="mt-4 flex flex-wrap gap-3">
                <button type="button" className="cta-button" onClick={createQuickAddEvent}>
                  Save calendar item
                </button>
                <button
                  type="button"
                  className="cta-secondary"
                  onClick={() => setShowQuickAdd(false)}
                >
                  Close
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </HuttonPanel>

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <HuttonPanel className="overflow-hidden">
          <HuttonPanelHeader
            eyebrow="Planner View"
            title={
              view === "day"
                ? formatLongDate(focusDate)
                : view === "week"
                  ? `Week of ${formatLongDate(weekStart)}`
                  : focusDate.toLocaleString("en-ZA", { month: "long", year: "numeric" })
            }
            description="Click any event to open the operational detail panel and jump into the linked job, WhatsApp, or booking flow."
            aside={<Filter className="h-5 w-5 text-[#60A5FA]" />}
          />
          <div className="p-4 sm:p-5">
            {view === "day" ? (
              dayEvents.length ? (
                <div className="space-y-3">
                  {dayEvents.map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      onClick={() => setSelectedEventId(event.id)}
                      className={`w-full rounded-[12px] border p-4 text-left transition ${
                        selectedEvent?.id === event.id
                          ? "border-[#111111]/18 bg-[#111111] text-white"
                          : "border-[#111111]/10 bg-white"
                      }`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{event.title}</p>
                          <p
                            className={`mt-1 text-sm ${
                              selectedEvent?.id === event.id ? "text-[#d8d8d2]" : "text-[#555962]"
                            }`}
                          >
                            {event.clientName} - {event.vehicleLabel}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <HuttonStatusBadge value={event.eventType} />
                          <HuttonStatusBadge value={event.status} />
                        </div>
                      </div>
                      <p
                        className={`mt-3 text-sm ${
                          selectedEvent?.id === event.id ? "text-[#d8d8d2]" : "text-[#555962]"
                        }`}
                      >
                        {formatTimeRange(event)} - {event.assignedStaff}
                      </p>
                    </button>
                  ))}
                </div>
              ) : (
                <HuttonEmptyState
                  title="No events in this day view"
                  detail="Use quick add or change filters to see the workload for this date."
                />
              )
            ) : null}

            {view === "week" ? (
              <div className="overflow-x-auto">
                <div className="grid min-w-[980px] grid-cols-7 gap-3 xl:min-w-0">
                  {weekDays.map((day) => {
                    const items = weekEvents.filter((event) => sameDay(eventDate(event), day));
                    return (
                      <div
                        key={day.toISOString()}
                        className="rounded-[12px] border border-[#111111]/10 bg-[#FAFAF7] p-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <p className="text-xs uppercase tracking-[0.14em] text-[#7b7e86]">
                              {day.toLocaleString("en-ZA", { weekday: "short" })}
                            </p>
                            <p className="mt-1 font-semibold text-[#111111]">
                              {day.toLocaleString("en-ZA", { day: "numeric", month: "short" })}
                            </p>
                          </div>
                          {sameDay(day, demoToday) ? <HuttonStatusBadge value="Today" /> : null}
                        </div>
                        <div className="mt-3 space-y-2">
                          {items.length ? (
                            items.map((event) => (
                              <button
                                key={event.id}
                                type="button"
                                onClick={() => setSelectedEventId(event.id)}
                                className="w-full rounded-[10px] border border-[#111111]/10 bg-white px-3 py-3 text-left"
                              >
                                <p className="text-sm font-semibold text-[#111111]">{event.title}</p>
                                <p className="mt-1 text-xs text-[#7b7e86]">{formatTimeRange(event)}</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  <HuttonStatusBadge value={event.eventType} />
                                  <HuttonStatusBadge value={event.status} />
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="rounded-[10px] border border-dashed border-[#111111]/14 px-3 py-6">
                              <HuttonEmptyState
                                title="No scheduled work"
                                detail="This day has no matching bookings or follow-ups."
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}

            {view === "month" ? (
              <div className="grid gap-3 sm:grid-cols-7">
                {monthDays.map((day) => {
                  const items = monthEvents
                    .filter((event) => sameDay(eventDate(event), day))
                    .slice(0, 3);
                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      onClick={() => {
                        setFocusDate(day);
                        if (items[0]) setSelectedEventId(items[0].id);
                      }}
                      className={`min-h-40 rounded-[12px] border p-3 text-left ${
                        day.getMonth() === focusDate.getMonth()
                          ? "border-[#111111]/10 bg-white"
                          : "border-[#111111]/6 bg-[#F7F7F2]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-[#111111]">{day.getDate()}</p>
                        {sameDay(day, demoToday) ? <HuttonStatusBadge value="Today" /> : null}
                      </div>
                      <div className="mt-3 space-y-2">
                        {items.length ? (
                          items.map((event) => (
                            <div key={event.id} className="rounded-[10px] bg-[#FAFAF7] px-2.5 py-2">
                              <p className="text-xs font-semibold text-[#111111]">{event.title}</p>
                              <p className="mt-1 text-[11px] text-[#7b7e86]">
                                {new Intl.DateTimeFormat("en-ZA", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }).format(eventDate(event))}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-xs text-[#a1a3aa]">No events</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </HuttonPanel>
        <HuttonPanel>
          <HuttonPanelHeader
            eyebrow="Event Detail"
            title={selectedEvent?.title ?? "No event selected"}
            description="Open the linked workflow directly from the calendar so staff never have to re-enter context."
            aside={<Clock3 className="h-5 w-5 text-[#60A5FA]" />}
          />
          {selectedEvent ? (
            <div className="space-y-4 p-4 sm:p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <HuttonDataLabel label="Client" value={selectedEvent.clientName} />
                <HuttonDataLabel label="Phone" value={selectedEvent.phoneNumber} />
                <HuttonDataLabel label="Vehicle" value={selectedEvent.vehicleLabel} />
                <HuttonDataLabel label="Registration" value={selectedEvent.registration} />
                <HuttonDataLabel label="Linked record" value={selectedEvent.linkedRecordId} />
                <HuttonDataLabel label="Assigned staff" value={selectedEvent.assignedStaff} />
              </div>

              <div className="flex flex-wrap gap-2">
                <HuttonStatusBadge value={selectedEvent.eventType} />
                <HuttonStatusBadge value={selectedEvent.status} />
                <HuttonStatusBadge value={selectedEvent.source} />
              </div>

              <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
                  Timing and notes
                </p>
                <p className="mt-3 text-sm text-[#555962]">{formatTimeRange(selectedEvent)}</p>
                {selectedEvent.address ? (
                  <p className="mt-2 text-sm text-[#555962]">{selectedEvent.address}</p>
                ) : null}
                <p className="mt-3 text-sm leading-6 text-[#555962]">{selectedEvent.notes}</p>
              </div>

              <label className="text-sm text-[#555962]">
                Update status
                <select
                  className="form-input-light mt-2"
                  value={selectedEvent.status}
                  onChange={(event) =>
                    onUpdateEvent(selectedEvent.id, {
                      ...selectedEvent,
                      status: event.target.value as CalendarEventStatus,
                    })
                  }
                >
                  {eventStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <div className="flex flex-wrap gap-3">
                {selectedEvent.jobId ? (
                  <button
                    type="button"
                    className="cta-button"
                    onClick={() => onOpenJob(selectedEvent.jobId!)}
                  >
                    Open linked job
                  </button>
                ) : null}
                {selectedEvent.jobId ? (
                  <button
                    type="button"
                    className="cta-secondary"
                    onClick={() => onOpenWhatsApp(selectedEvent.jobId!)}
                  >
                    Open WhatsApp
                  </button>
                ) : null}
                {selectedEvent.eventType === "Booking" ? (
                  <button
                    type="button"
                    className="cta-secondary"
                    onClick={() =>
                      onOpenReception({
                        clientName: selectedEvent.clientName,
                        phone: selectedEvent.phoneNumber,
                        vehicleMake: selectedVehicle.make,
                        vehicleModel: selectedVehicle.model,
                        registration: selectedEvent.registration,
                        bookingDateTime: `${formatLongDate(new Date(selectedEvent.startAt))} ${new Intl.DateTimeFormat(
                          "en-ZA",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        ).format(new Date(selectedEvent.startAt))}`,
                        notes: selectedEvent.notes,
                      })
                    }
                  >
                    Open reception
                  </button>
                ) : null}
                {selectedEvent.status !== "Completed" ? (
                  <button
                    type="button"
                    className="cta-secondary"
                    onClick={() =>
                      onUpdateEvent(selectedEvent.id, {
                        ...selectedEvent,
                        status: "Completed",
                      })
                    }
                  >
                    Mark completed
                  </button>
                ) : null}
              </div>

              {selectedEvent.eventType === "Approval Follow-up" ||
              selectedEvent.eventType === "Follow-up" ? (
                <div className="rounded-[10px] border border-[#F5D36C]/40 bg-[#fff9ea] p-4 text-sm leading-6 text-[#555962]">
                  This follow-up is part of the live client communication story. Use it with the
                  WhatsApp centre to show reminders, approvals, and collection promises being
                  tracked instead of forgotten.
                </div>
              ) : null}
            </div>
          ) : (
            <div className="p-4 sm:p-5">
              <HuttonEmptyState
                title="No event selected"
                detail="Choose a booking, follow-up, or shuttle event from the planner to view the operational detail."
              />
            </div>
          )}
        </HuttonPanel>
      </div>

      <HuttonPanel>
        <HuttonPanelHeader
          eyebrow="Operational Value"
          title="Why this calendar matters"
          description="This is not a generic diary. It is the shared schedule for reception, workshop, transport, and client follow-up."
          aside={<UserRound className="h-5 w-5 text-[#60A5FA]" />}
        />
        <div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
          <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#7b7e86]">Approvals</p>
            <p className="mt-3 text-sm leading-6 text-[#555962]">
              Approval and quote follow-ups stay visible with times, owners, and linked jobs.
            </p>
          </div>
          <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#7b7e86]">Transport</p>
            <p className="mt-3 text-sm leading-6 text-[#555962]">
              Shuttle pickups, drop-offs, and collection promises sit in the same daily plan as
              workshop work.
            </p>
          </div>
          <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#7b7e86]">Follow-up</p>
            <p className="mt-3 text-sm leading-6 text-[#555962]">
              Reception can schedule reminders for approvals, ready notifications, and
              post-service callbacks.
            </p>
          </div>
        </div>
      </HuttonPanel>
    </div>
  );
}
