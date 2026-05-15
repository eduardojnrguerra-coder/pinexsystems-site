"use client";

import Link from "next/link";
import {
  Building2,
  CalendarDays,
  CarFront,
  ClipboardList,
  LayoutDashboard,
  MessageCircleMore,
  PackageSearch,
  Route,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { TrackedDemoLink } from "@/components/analytics/tracked-demo-link";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-whatsapp-link";
import { HuttonDashboard } from "@/components/demos/hutton/HuttonDashboard";
import { HuttonCalendar } from "@/components/demos/hutton/HuttonCalendar";
import { JobCardDetail } from "@/components/demos/hutton/JobCardDetail";
import { ManagementInsights } from "@/components/demos/hutton/ManagementInsights";
import { PartsLibrary } from "@/components/demos/hutton/PartsLibrary";
import { PartsOrdersPanel } from "@/components/demos/hutton/PartsOrdersPanel";
import { ReceptionIntakeForm } from "@/components/demos/hutton/ReceptionIntakeForm";
import { TransportPanel } from "@/components/demos/hutton/TransportPanel";
import {
  HuttonPanel,
  HuttonPanelHeader,
  HuttonStatusBadge,
} from "@/components/demos/hutton/HuttonUi";
import { ShortAuditForm } from "@/components/ui/short-audit-form";
import { WhatsAppCommunicationCentre } from "@/components/demos/hutton/WhatsAppCommunicationCentre";
import { WorkshopBoard } from "@/components/demos/hutton/WorkshopBoard";
import { trackCustomEvent } from "@/lib/gtag";
import { huttonServiceData } from "@/lib/hutton-service-data";
import { waUrl } from "@/lib/site";
import type {
  HuttonBookingForm,
  HuttonCalendarEvent,
  HuttonClient,
  HuttonJob,
  HuttonPart,
  HuttonPartRequest,
  HuttonTransportTask,
  HuttonVehicle,
  HuttonWhatsAppUpdate,
  JobStatus,
} from "@/lib/hutton-service-types";

type SectionId =
  | "dashboard"
  | "reception"
  | "calendar"
  | "job-card"
  | "workshop"
  | "parts-library"
  | "parts-orders"
  | "transport"
  | "whatsapp"
  | "management";

const sections = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, description: "Service desk overview" },
  { id: "reception", label: "Reception", icon: ClipboardList, description: "Booking and intake" },
  { id: "calendar", label: "Calendar", icon: CalendarDays, description: "Bookings and follow-up" },
  { id: "job-card", label: "Job card", icon: Building2, description: "Active workshop record" },
  { id: "workshop", label: "Workshop board", icon: CarFront, description: "Stage and bay flow" },
  { id: "parts-library", label: "Parts library", icon: PackageSearch, description: "Fitment memory" },
  { id: "parts-orders", label: "Parts ordering", icon: ShoppingCart, description: "Supplier progress" },
  { id: "transport", label: "Transport", icon: Route, description: "Client movement" },
  { id: "whatsapp", label: "WhatsApp centre", icon: MessageCircleMore, description: "Communication queue" },
  { id: "management", label: "Management", icon: Sparkles, description: "Operational summary" },
] as const satisfies ReadonlyArray<{
  id: SectionId;
  label: string;
  icon: typeof LayoutDashboard;
  description: string;
}>;

const huttonDemoSlug = "hutton-service-centre";
const contactHref = `/contact?demo_slug=${huttonDemoSlug}&lead_intent=demo_page#lead-form`;
const whatsappHref = waUrl(
  "Hi Eddy, I saw the Hutton Motors Service Centre demo and want to map my service-centre workflow.",
);

const heroBullets = [
  "See today's bookings, blocked jobs, and pressure in one operating view",
  "Keep parts, transport, approvals, and WhatsApp tied to live job cards",
  "Give owners and advisors the same source of truth",
];

const proofCards = [
  "Designed around real service-centre pressure",
  "Bookings, approvals, parts, shuttle, and communication connected",
  "Manager-friendly and meeting-friendly",
  "Built for phased rollout and refinement",
];

const controlItems = [
  "Reception pressure, booking intake and client arrival flow",
  "Live job cards, workshop movement and work waiting for approval",
  "Parts requests, supplier ETA and jobs stuck waiting for stock",
  "Transport, shuttle tasks and WhatsApp client updates",
  "Owner visibility across today's blocked jobs and service-centre pressure",
];

const previewFrames = [
  {
    title: "Service desk overview",
    detail: "Morning pressure, arrivals, blocked work, and advisor visibility in one view.",
  },
  {
    title: "Job-card detail",
    detail: "A live record tying approvals, notes, parts, and next steps to one service job.",
  },
  {
    title: "Transport board",
    detail: "Pickup, shuttle, and return-trip movement without losing the workshop context.",
  },
  {
    title: "WhatsApp centre",
    detail: "Client communication linked to bookings, approvals, and live operating state.",
  },
];

const stageFlow: JobStatus[] = [
  "Booking Confirmed",
  "Vehicle Collected",
  "Checked In",
  "Inspection In Progress",
  "Waiting for Approval",
  "Approved",
  "Waiting for Parts",
  "Parts Ordered",
  "Parts Arrived",
  "In Service",
  "Repair Complete",
  "Quality Check",
  "Ready for Collection",
  "Delivered / Collected",
  "Closed",
];

const stageMeta: Record<
  JobStatus,
  { progress: number; nextStep: string; etaPrefix: string; whatsappStatus: HuttonJob["whatsappStatus"] }
> = {
  "Booking Confirmed": {
    progress: 10,
    nextStep: "Confirm arrival time and vehicle handover.",
    etaPrefix: "Booking set",
    whatsappStatus: "Synced",
  },
  "Vehicle Collected": {
    progress: 16,
    nextStep: "Vehicle is on the way to reception.",
    etaPrefix: "Collected",
    whatsappStatus: "Synced",
  },
  "Checked In": {
    progress: 24,
    nextStep: "Queue vehicle for inspection and intake photos.",
    etaPrefix: "Checked in",
    whatsappStatus: "Synced",
  },
  "Inspection In Progress": {
    progress: 34,
    nextStep: "Complete diagnostics and prep estimate.",
    etaPrefix: "Inspection live",
    whatsappStatus: "Synced",
  },
  "Waiting for Approval": {
    progress: 44,
    nextStep: "Client approval required before work can continue.",
    etaPrefix: "Awaiting approval",
    whatsappStatus: "Awaiting Reply",
  },
  Approved: {
    progress: 52,
    nextStep: "Book technician time and release required parts.",
    etaPrefix: "Approved",
    whatsappStatus: "Client Replied",
  },
  "Waiting for Parts": {
    progress: 58,
    nextStep: "Track supplier ETA and protect promised time.",
    etaPrefix: "Parts pending",
    whatsappStatus: "Attention Needed",
  },
  "Parts Ordered": {
    progress: 64,
    nextStep: "Supplier order placed and ETA shared with client.",
    etaPrefix: "Ordered",
    whatsappStatus: "Attention Needed",
  },
  "Parts Arrived": {
    progress: 72,
    nextStep: "Parts received. Move job back into service.",
    etaPrefix: "Parts arrived",
    whatsappStatus: "Synced",
  },
  "In Service": {
    progress: 78,
    nextStep: "Complete fitment, checks, and road test prep.",
    etaPrefix: "In service",
    whatsappStatus: "Synced",
  },
  "Repair Complete": {
    progress: 86,
    nextStep: "Move into quality check and washdown.",
    etaPrefix: "Repair complete",
    whatsappStatus: "Synced",
  },
  "Quality Check": {
    progress: 92,
    nextStep: "Final QC and handover pack preparation.",
    etaPrefix: "Final QC",
    whatsappStatus: "Synced",
  },
  "Ready for Collection": {
    progress: 100,
    nextStep: "Notify client and prepare invoice handover.",
    etaPrefix: "Ready now",
    whatsappStatus: "Synced",
  },
  "Delivered / Collected": {
    progress: 100,
    nextStep: "Complete handover notes and close transport loop.",
    etaPrefix: "Collected",
    whatsappStatus: "Synced",
  },
  Closed: {
    progress: 100,
    nextStep: "Job archived in service history.",
    etaPrefix: "Closed",
    whatsappStatus: "Synced",
  },
};

function findClient(job: HuttonJob, clients: HuttonClient[]) {
  return clients.find((item) => item.id === job.clientId) ?? clients[0];
}

function findVehicle(job: HuttonJob, vehicles: HuttonVehicle[]) {
  return vehicles.find((item) => item.id === job.vehicleId) ?? vehicles[0];
}

function nextStage(status: JobStatus, job: HuttonJob, partRequests: HuttonPartRequest[]) {
  if (status === "Approved" && job.partRequestIds.length) {
    return "Waiting for Parts";
  }

  if (status === "Waiting for Parts" || status === "Parts Ordered") {
    const hasReceivedPart = partRequests.some(
      (request) => job.partRequestIds.includes(request.id) && request.status === "Arrived",
    );

    if (hasReceivedPart) return "Parts Arrived";
  }

  if (status === "Parts Arrived") return "In Service";

  const index = stageFlow.indexOf(status);
  return stageFlow[Math.min(index + 1, stageFlow.length - 1)] ?? status;
}

function transportStatusForStage(status: JobStatus) {
  if (status === "Booking Confirmed") return "Scheduled";
  if (status === "Vehicle Collected") return "Client Picked Up";
  if (status === "Checked In") return "Client Dropped Off";
  if (status === "Ready for Collection") return "Return Trip Pending";
  if (status === "Delivered / Collected" || status === "Closed") return "Completed";
  return null;
}

function pushTimelineUpdate(
  timeline: Record<string, HuttonWhatsAppUpdate[]>,
  job: HuttonJob,
  status: JobStatus,
) {
  const stageMessageMap: Record<JobStatus, string> = {
    "Booking Confirmed": `Your booking for ${job.bookingTime} has been confirmed. We will keep you updated through each stage of the job.`,
    "Vehicle Collected": "Your vehicle has been collected and is on the way to Hutton Motors.",
    "Checked In": "Your vehicle has been checked in and our intake inspection is underway.",
    "Inspection In Progress": "Inspection has started and our workshop is preparing findings for your advisor.",
    "Waiting for Approval": "Inspection is complete. We are waiting for your go-ahead before proceeding with the quoted work.",
    Approved: "Thank you for the approval. We have released the job to the workshop.",
    "Waiting for Parts": "Your vehicle is waiting on parts availability. We are tracking the supplier ETA and will update you as soon as it is confirmed.",
    "Parts Ordered": "Required parts have been ordered and we will let you know the moment they are on site.",
    "Parts Arrived": "Your parts have arrived and the vehicle is moving back into the workshop.",
    "In Service": "Service work is now actively in progress in the workshop.",
    "Repair Complete": "The repair work has been completed and the vehicle is moving to final checks.",
    "Quality Check": "Your vehicle is in final quality check before handover.",
    "Ready for Collection": "Your vehicle is ready for collection. Reception is preparing the handover pack now.",
    "Delivered / Collected": "Handover is complete. Thank you for choosing Hutton Motors.",
    Closed: "Your job has been closed and filed in your digital service history.",
  };

  const update: HuttonWhatsAppUpdate = {
    id: `WA-${Date.now()}`,
    at: "Just now",
    direction: "Outgoing",
    sender: "Hutton Service Updates",
    message: stageMessageMap[status],
    tone: status === "Waiting for Approval" || status === "Waiting for Parts" ? "Concerned" : "Positive",
  };

  return {
    ...timeline,
    [job.id]: [update, ...(timeline[job.id] ?? [])].slice(0, 8),
  };
}

const demoReferenceDate = new Date("2026-04-23T08:00:00+02:00");

function parseLabelToDateTime(label: string, fallbackHour = 9, fallbackMinute = 0) {
  const value = label.trim();
  const match = value.match(/(Today|Tomorrow|Yesterday)\s+(\d{1,2}):(\d{2})/i);
  const date = new Date(demoReferenceDate);

  if (/Tomorrow/i.test(value)) date.setDate(date.getDate() + 1);
  if (/Yesterday/i.test(value)) date.setDate(date.getDate() - 1);

  if (match) {
    date.setHours(Number.parseInt(match[2], 10), Number.parseInt(match[3], 10), 0, 0);
    return date;
  }

  date.setHours(fallbackHour, fallbackMinute, 0, 0);
  return date;
}

function addMinutes(date: Date, minutes: number) {
  const next = new Date(date);
  next.setMinutes(next.getMinutes() + minutes);
  return next;
}

function toIsoDateTime(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:00+02:00`;
}

function parseRequestedBookingSlot(preferredDate?: string, preferredTime?: string) {
  const date = new Date(demoReferenceDate);
  const normalizedDate = preferredDate?.toLowerCase() ?? "";
  const normalizedTime = preferredTime?.toLowerCase() ?? "";

  if (/tomorrow|friday/.test(normalizedDate)) {
    date.setDate(24);
  } else if (/monday/.test(normalizedDate)) {
    date.setDate(27);
  } else if (/next tuesday/.test(normalizedDate)) {
    date.setDate(28);
  } else if (/next week/.test(normalizedDate)) {
    date.setDate(30);
  }

  if (/morning/.test(normalizedTime)) {
    date.setHours(8, 0, 0, 0);
  } else {
    const match = normalizedTime.match(/(\d{1,2}):(\d{2})/);
    if (match) {
      date.setHours(Number.parseInt(match[1], 10), Number.parseInt(match[2], 10), 0, 0);
    } else {
      date.setHours(10, 30, 0, 0);
    }
  }

  return date;
}

const initialBookingForm: HuttonBookingForm = {
  clientName: "Tumi Nkosi",
  phone: "082 771 4410",
  email: "tumi.nkosi@email.co.za",
  vehicleMake: "Kia",
  vehicleModel: "Sportage 1.6T GT Line",
  registration: "CAA 991-44",
  vin: "KNAPU81BPR7159021",
  mileage: "45210",
  serviceRequest: "Intermittent steering warning light and due for service.",
  bookingDateTime: "Tomorrow 08:00",
  notes: "Client prefers WhatsApp updates and needs early confirmation if transport is available.",
  transportRequired: true,
  pickupAddress: "45 Main Road, Claremont",
  dropoffAddress: "18 Loop Street, Cape Town CBD",
};

const sampleBookingForm: HuttonBookingForm = {
  clientName: "Keshia Arendse",
  phone: "082 481 6620",
  email: "keshia.arendse@email.co.za",
  vehicleMake: "Toyota",
  vehicleModel: "Hilux 2.8 GD-6 Raider",
  registration: "CY 551-82",
  vin: "AHTHA3CD705512882",
  mileage: "89320",
  serviceRequest: "Major service due, front brakes squeal, and client needs a shuttle pickup.",
  bookingDateTime: "Tomorrow 08:00",
  notes: "Client prefers WhatsApp updates and wants collection before school traffic.",
  transportRequired: true,
  pickupAddress: "74 Imam Haron Road, Claremont",
  dropoffAddress: "Hutton Motors Reception",
};

export function HuttonServiceDemo() {
  const heroRef = useRef<HTMLElement | null>(null);
  const moduleNavRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const meetingRef = useRef<HTMLDivElement | null>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("dashboard");
  const [selectedJobId, setSelectedJobId] = useState(huttonServiceData.jobs[0]?.id ?? "");
  const [partsSearch, setPartsSearch] = useState("");
  const [parts, setParts] = useState(huttonServiceData.parts);
  const [clients, setClients] = useState(huttonServiceData.clients);
  const [vehicles, setVehicles] = useState(huttonServiceData.vehicles);
  const [jobs, setJobs] = useState(huttonServiceData.jobs);
  const [partRequests, setPartRequests] = useState(huttonServiceData.partRequests);
  const [transportTasks, setTransportTasks] = useState(huttonServiceData.transportTasks);
  const [inbox, setInbox] = useState(huttonServiceData.inbox);
  const [whatsappByJob, setWhatsappByJob] = useState(huttonServiceData.whatsappByJob);
  const [calendarEvents, setCalendarEvents] = useState(huttonServiceData.calendarEvents);
  const [bookingForm, setBookingForm] = useState<HuttonBookingForm>(initialBookingForm);
  const [selectedPartId, setSelectedPartId] = useState(huttonServiceData.parts[0]?.id ?? "");

  const trackHuttonEvent = (
    eventName: string,
    extra?: Record<string, string | number | boolean | undefined>,
  ) => {
    trackCustomEvent(eventName, {
      demo_slug: huttonDemoSlug,
      ...extra,
    });
  };

  useEffect(() => {
    trackHuttonEvent("demo_view");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = heroRef.current?.offsetHeight ?? 280;
      setShowStickyBar(window.scrollY > threshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const selectedJob = useMemo(
    () => jobs.find((job) => job.id === selectedJobId) ?? jobs[0],
    [jobs, selectedJobId],
  );
  const selectedClient = findClient(selectedJob, clients);
  const selectedVehicle = findVehicle(selectedJob, vehicles);
  const selectedRequests = partRequests.filter((item) => item.jobId === selectedJob.id);
  const selectedTransportTasks = transportTasks.filter(
    (task) => task.jobId === selectedJob.id || task.id === selectedJob.transportTaskId,
  );
  const selectedPart = useMemo(
    () => parts.find((part) => part.id === selectedPartId) ?? parts[0],
    [parts, selectedPartId],
  );

  const liveCalendarEvents = useMemo(() => {
    const jobEvents = jobs.flatMap((job) => {
      const client = findClient(job, clients);
      const vehicle = findVehicle(job, vehicles);
      const bookingStart = parseLabelToDateTime(job.bookingTime, 8, 0);
      const bookingEnd = addMinutes(bookingStart, 30);
      const items: HuttonCalendarEvent[] = [
        {
          id: `CAL-JOB-${job.id}`,
          title: `${vehicle.make} ${vehicle.model} booking`,
          clientName: client.name,
          phoneNumber: client.phone,
          vehicleLabel: `${vehicle.make} ${vehicle.model}`,
          registration: vehicle.registration,
          linkedRecordId: job.id,
          jobId: job.id,
          clientId: client.id,
          eventType: "Booking",
          startAt: toIsoDateTime(bookingStart),
          endAt: toIsoDateTime(bookingEnd),
          status: job.bookingStatus,
          assignedStaff: job.advisor,
          notes: job.bookingNotes,
          address: job.pickupAddress,
          source: "Derived",
        },
      ];

      if (job.status === "Waiting for Approval") {
        const followUpStart = addMinutes(bookingStart, 70);
        items.push({
          id: `CAL-APPROVAL-${job.id}`,
          title: `Approval follow-up for ${client.name}`,
          clientName: client.name,
          phoneNumber: client.phone,
          vehicleLabel: `${vehicle.make} ${vehicle.model}`,
          registration: vehicle.registration,
          linkedRecordId: job.id,
          jobId: job.id,
          clientId: client.id,
          eventType: "Approval Follow-up",
          startAt: toIsoDateTime(followUpStart),
          endAt: toIsoDateTime(addMinutes(followUpStart, 15)),
          status: job.whatsappStatus === "Awaiting Reply" ? "Awaiting Response" : "Scheduled",
          assignedStaff: job.advisor,
          notes: job.approvalNotes,
          source: "Derived",
        });
      }

      if (job.status === "Ready for Collection") {
        const collectionStart = parseLabelToDateTime(job.promisedTime, 15, 0);
        items.push({
          id: `CAL-COLLECTION-${job.id}`,
          title: `${client.name} collection reminder`,
          clientName: client.name,
          phoneNumber: client.phone,
          vehicleLabel: `${vehicle.make} ${vehicle.model}`,
          registration: vehicle.registration,
          linkedRecordId: job.id,
          jobId: job.id,
          clientId: client.id,
          eventType: "Vehicle Collection",
          startAt: toIsoDateTime(collectionStart),
          endAt: toIsoDateTime(addMinutes(collectionStart, 15)),
          status: "Scheduled",
          assignedStaff: job.advisor,
          notes: "Vehicle is ready. Reception should confirm collection and handover timing.",
          source: "Derived",
        });
      }

      if (job.status === "Closed") {
        const followUpStart = addMinutes(parseLabelToDateTime(job.promisedTime, 10, 0), 7 * 24 * 60);
        items.push({
          id: `CAL-POST-${job.id}`,
          title: `Post-service follow-up for ${client.name}`,
          clientName: client.name,
          phoneNumber: client.phone,
          vehicleLabel: `${vehicle.make} ${vehicle.model}`,
          registration: vehicle.registration,
          linkedRecordId: job.id,
          jobId: job.id,
          clientId: client.id,
          eventType: "Follow-up",
          startAt: toIsoDateTime(followUpStart),
          endAt: toIsoDateTime(addMinutes(followUpStart, 15)),
          status: "Scheduled",
          assignedStaff: job.advisor,
          notes: "Courtesy follow-up and next-service reminder after handover.",
          source: "Derived",
        });
      }

      return items;
    });

    const transportEvents: HuttonCalendarEvent[] = transportTasks.map((task) => {
      const job = jobs.find((item) => item.id === task.jobId);
      const client = clients.find((item) => item.id === task.clientId) ?? clients[0];
      const vehicle = vehicles.find((item) => item.id === job?.vehicleId) ?? vehicles[0];
      const start = parseLabelToDateTime(task.requestedTime, 8, 15);
      return {
        id: `CAL-TR-${task.id}`,
        title:
          task.tripType === "Pickup"
            ? `Vehicle pickup for ${client.name}`
            : task.tripType === "Drop-off"
              ? `Vehicle drop-off for ${client.name}`
              : `Vehicle collection for ${client.name}`,
        clientName: client.name,
        phoneNumber: client.phone,
        vehicleLabel: `${vehicle.make} ${vehicle.model}`,
        registration: vehicle.registration,
        linkedRecordId: task.id,
        jobId: task.jobId,
        clientId: client.id,
        eventType:
          task.tripType === "Pickup"
            ? "Vehicle Pickup"
            : task.tripType === "Drop-off"
              ? "Vehicle Drop-off"
              : "Vehicle Collection",
        startAt: toIsoDateTime(start),
        endAt: toIsoDateTime(addMinutes(start, 30)),
        status:
          task.status === "Completed" || task.status === "Client Dropped Off"
            ? "Completed"
            : task.status === "Requested"
              ? "Pending"
              : "Scheduled",
        assignedStaff: task.driver === "Unassigned" ? "Shuttle Coordinator" : task.driver,
        notes: task.notes,
        address:
          task.tripType === "Pickup" ? task.pickupFrom : task.dropoffTo,
        source: "Derived" as const,
      };
    });

    const inboxFollowUps: HuttonCalendarEvent[] = inbox
      .filter((message) => message.status !== "Handled")
      .map((message, index) => {
        const job = jobs.find((item) => item.id === message.jobId) ?? selectedJob;
        const client = clients.find((item) => item.id === message.clientId) ?? selectedClient;
        const vehicle = vehicles.find((item) => item.id === job.vehicleId) ?? selectedVehicle;
        const start = addMinutes(new Date(demoReferenceDate), 150 + index * 25);
        return {
          id: `CAL-INBOX-${message.id}`,
          title: `${message.classification} follow-up`,
          clientName: client.name,
          phoneNumber: client.phone,
          vehicleLabel: `${vehicle.make} ${vehicle.model}`,
          registration: vehicle.registration,
          linkedRecordId: message.jobId ?? message.id,
          jobId: message.jobId,
          clientId: client.id,
          eventType:
            message.classification === "Quote Approval" ||
            message.classification === "Quote Rejection"
              ? "Approval Follow-up"
              : "Follow-up",
          startAt: toIsoDateTime(start),
          endAt: toIsoDateTime(addMinutes(start, 15)),
          status: message.status === "Assigned" ? "Scheduled" : "Awaiting Response",
          assignedStaff: message.routedTo,
          notes: message.preview,
          source: "Derived" as const,
        };
      });

    const dynamicIds = new Set([
      ...jobEvents.map((event) => event.id),
      ...transportEvents.map((event) => event.id),
      ...inboxFollowUps.map((event) => event.id),
    ]);

    const seeded = calendarEvents.filter((event) => !dynamicIds.has(event.id));
    return [...seeded, ...jobEvents, ...transportEvents, ...inboxFollowUps].sort(
      (a, b) => +new Date(a.startAt) - +new Date(b.startAt),
    );
  }, [calendarEvents, clients, inbox, jobs, selectedClient, selectedJob, selectedVehicle, transportTasks, vehicles]);
  const selectedCalendarEvents = liveCalendarEvents.filter(
    (event) => event.jobId === selectedJob.id || event.clientId === selectedJob.clientId,
  );

  const filteredParts = useMemo(() => {
    const query = partsSearch.trim().toLowerCase();
    if (!query) return parts;

    return parts.filter((part) => {
      const supplier = huttonServiceData.suppliers.find((item) => item.id === part.supplierId);
      return [
        part.name,
        part.category,
        part.sourceType,
        part.partNumber,
        part.alternatePartNumber,
        part.vehicleCompatibility.join(" "),
        supplier?.name ?? "",
        supplier?.contact ?? "",
        supplier?.phone ?? "",
        supplier?.email ?? "",
        part.tags.join(" "),
        part.notes,
        part.lastUsedDate,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [parts, partsSearch]);

  const timeline = whatsappByJob[selectedJob.id] ?? [];

  const bookingsToday = jobs.filter((job) =>
    /^Today/.test(job.bookingTime) || job.status === "Booking Confirmed",
  ).length;

  const alerts = useMemo(() => {
    const items = [];
    const overdue = jobs.find(
      (job) =>
        job.promisedTime.startsWith("Today") &&
        !/Ready for Collection|Delivered \/ Collected|Closed/.test(job.status),
    );
    const delayedPart = partRequests.find(
      (request) => /Backordered|Ordered/.test(request.status) && /Tomorrow/.test(request.eta),
    );
    const waitingClient = jobs.find((job) => job.whatsappStatus === "Awaiting Reply");
    const shuttlePending = transportTasks.find((task) =>
      /Requested|Scheduled|Driver Assigned|Return Trip Pending/.test(task.status),
    );
    const urgentInbox = inbox.find((message) => message.urgent);
    const dueFollowUp = liveCalendarEvents.find(
      (event) =>
        /Follow-up|Approval Follow-up/.test(event.eventType) &&
        /Awaiting Response|Pending|Scheduled/.test(event.status),
    );
    const aiConfirmedBooking = inbox.find(
      (message) => message.aiBookingAnalysis?.outcome === "Confirmed Booking",
    );
    const aiDraftBooking = inbox.find(
      (message) => message.aiBookingAnalysis?.outcome === "Draft Booking",
    );
    const aiAwaitingReply = inbox.find(
      (message) =>
        message.aiBookingAnalysis?.outcome === "Draft Booking" &&
        message.status !== "Handled",
    );
    const aiSchedulingConflict = inbox.find(
      (message) => message.aiBookingAnalysis?.outcome === "Review Needed",
    );
    const aiUrgentBooking = inbox.find(
      (message) =>
        message.aiBookingAnalysis?.detectedIntent &&
        message.aiBookingAnalysis.extractedFields.urgency === "Urgent",
    );

    if (overdue) {
      items.push({
        id: "overdue-job",
        title: "Overdue job risk",
        detail: `${overdue.id} is still in ${overdue.status} against a same-day promise.`,
        tone: "red" as const,
      });
    }
    if (delayedPart) {
      items.push({
        id: "parts-delayed",
        title: "Parts delayed",
        detail: `${delayedPart.id} is still ${delayedPart.status.toLowerCase()} with ${delayedPart.eta.toLowerCase()}.`,
        tone: "amber" as const,
      });
    }
    if (waitingClient) {
      items.push({
        id: "client-response",
        title: "Client waiting for response",
        detail: `${waitingClient.id} is still waiting on approval feedback and follow-up.`,
        tone: "blue" as const,
      });
    }
    if (shuttlePending) {
      items.push({
        id: "shuttle-pending",
        title: "Shuttle request pending",
        detail: `${shuttlePending.id} still needs transport completion visibility in the day plan.`,
        tone: "blue" as const,
      });
    }
    if (urgentInbox) {
      items.push({
        id: "urgent-ai",
        title: "AI flagged urgent WhatsApp",
        detail: `${urgentInbox.subject} has been routed to ${urgentInbox.routedTo}.`,
        tone: "red" as const,
      });
    }
    if (dueFollowUp) {
      items.push({
        id: "calendar-follow-up",
        title: "Follow-up due in calendar",
        detail: `${dueFollowUp.title} is scheduled for ${new Intl.DateTimeFormat("en-ZA", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date(dueFollowUp.startAt))}.`,
        tone: "amber" as const,
      });
    }
    if (aiConfirmedBooking) {
      items.push({
        id: "ai-booking-confirmed",
        title: "New AI-created booking",
        detail: `${aiConfirmedBooking.subject} has been converted into a confirmed booking record.`,
        tone: "green" as const,
      });
    }
    if (aiDraftBooking) {
      items.push({
        id: "ai-booking-draft",
        title: "Draft booking needs review",
        detail: `${aiDraftBooking.subject} is saved as a draft booking and still needs reception to confirm missing details.`,
        tone: "amber" as const,
      });
    }
    if (aiAwaitingReply) {
      items.push({
        id: "ai-booking-awaiting-reply",
        title: "Missing booking details awaiting client reply",
        detail: `${aiAwaitingReply.subject} still needs client details before it can be confirmed.`,
        tone: "blue" as const,
      });
    }
    if (aiSchedulingConflict) {
      items.push({
        id: "ai-booking-conflict",
        title: "Scheduling conflict flagged",
        detail: `${aiSchedulingConflict.subject} needs reception to confirm an alternative time.`,
        tone: "amber" as const,
      });
    }
    if (aiUrgentBooking) {
      items.push({
        id: "ai-booking-urgent",
        title: "Urgent booking request",
        detail: `${aiUrgentBooking.subject} includes an urgent service request and should stay visible to reception.`,
        tone: "red" as const,
      });
    }

    return items;
  }, [inbox, jobs, liveCalendarEvents, partRequests, transportTasks]);

  const scrollToContent = () => {
    window.setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      contentRef.current?.focus({ preventScroll: true });
    }, 80);
  };

  const openSection = (
    section: SectionId,
    source?: string,
    options?: { jobId?: string; note?: string },
  ) => {
    if (options?.jobId) {
      setSelectedJobId(options.jobId);
      trackHuttonEvent("demo_job_select", {
        job_id: options.jobId,
        source: source ?? "section_open",
      });
    }

    setActiveSection(section);

    if (source) {
      trackHuttonEvent("demo_route_step_click", {
        section,
        source,
      });
    }

    scrollToContent();
  };

  const openJob = (jobId: string) => {
    openSection("job-card", "job_open", { jobId });
  };

  const openReceptionWithPrefill = (prefill?: Partial<HuttonBookingForm>) => {
    if (prefill) {
      setBookingForm((current) => ({ ...current, ...prefill }));
    }
    openSection("reception", "reception_prefill");
  };

  const openWhatsAppForJob = (jobId: string) => {
    openSection("whatsapp", "whatsapp_open", { jobId });
  };

  const updateBookingForm = <K extends keyof HuttonBookingForm>(
    field: K,
    value: HuttonBookingForm[K],
  ) => {
    setBookingForm((current) => ({ ...current, [field]: value }));
  };

  const createCalendarEvent = (event: HuttonCalendarEvent) => {
    setCalendarEvents((current) => [event, ...current.filter((item) => item.id !== event.id)]);
  };

  const updateCalendarEvent = (eventId: string, patch: Partial<HuttonCalendarEvent>) => {
    setCalendarEvents((current) => {
      const exists = current.some((event) => event.id === eventId);
      if (exists) {
        return current.map((event) => (event.id === eventId ? { ...event, ...patch } : event));
      }
      return [{ ...(patch as HuttonCalendarEvent), id: eventId }, ...current];
    });
  };

  const updateJob = (jobId: string, patch: Partial<HuttonJob>) => {
    setJobs((current) =>
      current.map((job) => (job.id === jobId ? { ...job, ...patch } : job)),
    );
  };

  const updateTransportTask = (
    taskId: string,
    patch: Partial<HuttonTransportTask>,
  ) => {
    setTransportTasks((current) =>
      current.map((task) => (task.id === taskId ? { ...task, ...patch } : task)),
    );
  };

  const updateTransportTaskStatus = (
    taskId: string,
    status: HuttonTransportTask["status"],
  ) => {
    const task = transportTasks.find((item) => item.id === taskId);
    if (!task) return;

    setTransportTasks((current) =>
      current.map((item) => (item.id === taskId ? { ...item, status } : item)),
    );

    if (status === "Completed") {
      setJobs((current) =>
        current.map((job) =>
          job.transportTaskId === taskId
            ? {
                ...job,
                alerts: job.alerts.filter((alert) => !/shuttle|pickup|transport/i.test(alert)),
              }
            : job,
        ),
      );
    }
  };

  const updateInboxMessage = (
    messageId: string,
    patch: Partial<(typeof inbox)[number]>,
  ) => {
    setInbox((current) =>
      current.map((message) => (message.id === messageId ? { ...message, ...patch } : message)),
    );
  };

  const createBookingRecordFromMessage = ({
    clientId,
    extracted,
    bookingId,
    bookingStatus,
    queueStatus,
    internalNotes,
    alerts,
  }: {
    clientId: string;
    extracted: NonNullable<(typeof inbox)[number]["aiBookingAnalysis"]>["extractedFields"];
    bookingId: string;
    bookingStatus: HuttonJob["bookingStatus"];
    queueStatus: string;
    internalNotes: string;
    alerts: string[];
  }) => {
    const vehicleId = `VH-${(vehicles.length + 1).toString().padStart(3, "0")}`;
    const transportTaskId = extracted.transportRequired ? `TR-${340 + transportTasks.length}` : undefined;
    const dateLabel = extracted.preferredDate ?? "Scheduled";
    const timeLabel = extracted.preferredTime ?? extracted.timeWindow ?? "10:30";

    const newVehicle: HuttonVehicle = {
      id: vehicleId,
      clientId,
      registration: extracted.registration || `TBC ${vehicles.length + 1}`,
      make: extracted.vehicleMake || "Vehicle",
      model: extracted.vehicleModel || "To confirm",
      year: 2022,
      color: "To confirm",
      vin: "To confirm",
      mileageKm: 0,
      engine: "To confirm",
      lastServiceDate: "Unknown",
    };

    const newJob: HuttonJob = {
      id: bookingId,
      clientId,
      vehicleId,
      advisor: "AI Reception Queue",
      technicianId: "TECH-003",
      status: "Booking Confirmed",
      bookingStatus,
      priority:
        extracted.urgency === "Urgent"
          ? "Urgent"
          : extracted.transportRequired
            ? "High"
            : "Normal",
      bookingTime: `${dateLabel} ${timeLabel}`.trim(),
      promisedTime: `${dateLabel} 17:00`,
      etaLabel: `Booking set - ${dateLabel} ${timeLabel}`.trim(),
      concern: extracted.serviceRequest || "Service booking from WhatsApp",
      estimate: 2250,
      approvedAmount: null,
      progressPercent: stageMeta["Booking Confirmed"].progress,
      bay: "Awaiting allocation",
      checklist: ["AI booking captured", "Reception workflow linked", "Client message logged"],
      recommendedWork: [extracted.serviceRequest || "Initial inspection"],
      bookingNotes: internalNotes,
      pickupAddress: extracted.transportRequired ? extracted.pickupAddress : undefined,
      dropoffAddress: extracted.transportRequired ? extracted.dropoffAddress : undefined,
      vehicleCondition: "To capture at check-in.",
      clientComplaint: extracted.serviceRequest || "To confirm with client.",
      photoChecklist: ["Front three-quarter photo pending", "Odometer photo pending"],
      queueStatus,
      technicianNotes: "Awaiting arrival from booking workflow.",
      inspectionFindings: "Inspection not started yet.",
      approvalSummary: "No approval notes yet.",
      approvalNotes: "No approval notes yet.",
      transportRequired: Boolean(extracted.transportRequired),
      transportTaskId,
      partRequestIds: [],
      alerts,
      whatsappStatus:
        bookingStatus === "Draft" || bookingStatus === "Awaiting Client Confirmation"
          ? "Awaiting Reply"
          : "Synced",
      internalNotes,
      nextStep: stageMeta["Booking Confirmed"].nextStep,
    };

    return { newVehicle, newJob, transportTaskId };
  };

  const applyInboxBookingAutomation = (messageId: string) => {
    const message = inbox.find((item) => item.id === messageId);
    const analysis = message?.aiBookingAnalysis;
    if (!message || !analysis || !analysis.detectedIntent || analysis.automationApplied) return;

    const extracted = analysis.extractedFields;
    const requestedStart = parseRequestedBookingSlot(
      extracted.preferredDate,
      extracted.preferredTime ?? extracted.timeWindow,
    );
    const requestedIso = toIsoDateTime(requestedStart);
    const slotConflict =
      requestedIso === "2026-04-27T08:00:00+02:00" ||
      liveCalendarEvents.some(
        (event) => event.eventType === "Booking" && event.startAt === requestedIso,
      );

    if (!analysis.missingCoreFields.length && !slotConflict) {
      const client = clients.find((item) => item.id === message.clientId);
      if (!client) return;

      const bookingId = `BK-${24120 + jobs.length}`;
      const { newVehicle, newJob, transportTaskId } = createBookingRecordFromMessage({
        clientId: client.id,
        extracted,
        bookingId,
        bookingStatus: "Confirmed",
        queueStatus: "Confirmed from AI WhatsApp intake",
        internalNotes: `Created from AI booking automation on WhatsApp message ${message.id}. ${analysis.reasoning}`,
        alerts:
          extracted.urgency === "Urgent"
            ? ["Urgent AI booking created"]
            : ["New AI-created booking"],
      });

      setVehicles((current) => [newVehicle, ...current]);
      setJobs((current) => [newJob, ...current]);

      if (transportTaskId) {
        const newTransportTask: HuttonTransportTask = {
          id: transportTaskId,
          jobId: bookingId,
          clientId: client.id,
          tripType: "Pickup",
          driver: "Pending assignment",
          vehicle: "Shuttle pool",
          pickupFrom: extracted.pickupAddress || "Address to confirm",
          dropoffTo: extracted.dropoffAddress || "Hutton Motors Reception",
          requestedTime: `${extracted.preferredDate ?? "Scheduled"} ${extracted.preferredTime ?? extracted.timeWindow ?? "10:30"}`.trim(),
          status: "Requested",
          notes: "Created automatically from AI WhatsApp booking automation.",
        };
        setTransportTasks((current) => [newTransportTask, ...current]);
      }

      setWhatsappByJob((current) => ({
        ...current,
        [bookingId]: [
          {
            id: `WA-AI-${Date.now()}`,
            at: "Just now",
            direction: "Outgoing",
            sender: "Hutton Motors Reception",
            message: message.suggestedReply,
            tone: "Positive",
          },
        ],
      }));

      updateInboxMessage(message.id, {
        status: "Handled",
        aiBookingAnalysis: {
          ...analysis,
          outcome: "Confirmed Booking",
          linkedCalendarEventId: `CAL-JOB-${bookingId}`,
          linkedJobId: bookingId,
          automationApplied: true,
        },
      });
      setSelectedJobId(bookingId);
      setActiveSection("whatsapp");
      return;
    }

    if (slotConflict) {
      const client = clients.find((item) => item.id === message.clientId);
      if (!client) return;
      const bookingId = `BK-${24120 + jobs.length}`;
      const { newVehicle, newJob } = createBookingRecordFromMessage({
        clientId: client.id,
        extracted,
        bookingId,
        bookingStatus: "Awaiting Client Confirmation",
        queueStatus: "Requested slot full - awaiting alternative time",
        internalNotes: `AI found a scheduling conflict on WhatsApp message ${message.id}. ${analysis.reasoning}`,
        alerts: ["Scheduling conflict requires reception follow-up"],
      });
      const reviewEventId = `CAL-AI-REVIEW-${message.id}`;
      const reviewStart = addMinutes(requestedStart, 30);
      const reviewEvent: HuttonCalendarEvent = {
        id: reviewEventId,
        title: `Booking conflict review for ${client.name}`,
        clientName: client.name,
        phoneNumber: client.phone,
        vehicleLabel: [extracted.vehicleMake, extracted.vehicleModel].filter(Boolean).join(" ") || "Vehicle to confirm",
        registration: extracted.registration || "To confirm",
        linkedRecordId: bookingId,
        jobId: bookingId,
        eventType: "Follow-up",
        startAt: toIsoDateTime(reviewStart),
        endAt: toIsoDateTime(addMinutes(reviewStart, 15)),
        status: "Awaiting Response",
        assignedStaff: "Reception",
        notes: "Requested slot is full. Reception should confirm one of the suggested alternatives with the client.",
        clientId: message.clientId,
        source: "Derived",
      };
      setVehicles((current) => [newVehicle, ...current]);
      setJobs((current) => [newJob, ...current]);
      setCalendarEvents((current) => [reviewEvent, ...current.filter((item) => item.id !== reviewEventId)]);
      updateInboxMessage(message.id, {
        status: "Assigned",
        humanAttentionRequired: true,
        aiBookingAnalysis: {
          ...analysis,
          outcome: "Review Needed",
          linkedCalendarEventId: reviewEventId,
          linkedDraftRecordId: bookingId,
          linkedJobId: bookingId,
          automationApplied: true,
        },
      });
      setSelectedJobId(bookingId);
      return;
    }

    const client = clients.find((item) => item.id === message.clientId);
    if (!client) return;
    const draftId = `BK-${24120 + jobs.length}`;
    const { newVehicle, newJob, transportTaskId } = createBookingRecordFromMessage({
      clientId: client.id,
      extracted,
      bookingId: draftId,
      bookingStatus: "Draft",
      queueStatus: "Draft booking awaiting client details",
      internalNotes: `AI created a booking draft from WhatsApp message ${message.id}. Missing details: ${analysis.missingCoreFields.join(", ")}.`,
      alerts: ["Draft booking awaiting client response"],
    });
    const draftEventId = `CAL-AI-DRAFT-${message.id}`;
    const draftEvent: HuttonCalendarEvent = {
      id: draftEventId,
      title: `Booking details follow-up for ${client.name}`,
      clientName: client.name,
      phoneNumber: client.phone,
      vehicleLabel: [extracted.vehicleMake, extracted.vehicleModel].filter(Boolean).join(" ") || "Vehicle to confirm",
      registration: extracted.registration || "To confirm",
      linkedRecordId: draftId,
      jobId: draftId,
      eventType: "Follow-up",
      startAt: toIsoDateTime(addMinutes(requestedStart, 20)),
      endAt: toIsoDateTime(addMinutes(requestedStart, 35)),
      status: "Awaiting Response",
      assignedStaff: "Reception",
      notes: `Draft booking created by AI. Missing details: ${analysis.missingCoreFields.join(", ")}.`,
      address: extracted.pickupAddress,
      clientId: message.clientId,
      source: "Derived",
    };
    setVehicles((current) => [newVehicle, ...current]);
    setJobs((current) => [newJob, ...current]);
    if (transportTaskId) {
      const draftTransport: HuttonTransportTask = {
        id: transportTaskId,
        jobId: draftId,
        clientId: client.id,
        tripType: "Pickup",
        driver: "Pending assignment",
        vehicle: "Shuttle pool",
        pickupFrom: extracted.pickupAddress || "Address to confirm",
        dropoffTo: extracted.dropoffAddress || "Hutton Motors Reception",
        requestedTime: `${extracted.preferredDate ?? "Scheduled"} ${extracted.preferredTime ?? extracted.timeWindow ?? "10:30"}`.trim(),
        status: "Requested",
        notes: "Transport draft linked to AI WhatsApp booking draft.",
      };
      setTransportTasks((current) => [draftTransport, ...current]);
    }
    setCalendarEvents((current) => [draftEvent, ...current.filter((item) => item.id !== draftEventId)]);
    updateInboxMessage(message.id, {
      status: "Assigned",
      aiBookingAnalysis: {
        ...analysis,
        outcome: "Draft Booking",
        linkedCalendarEventId: draftEventId,
        linkedDraftRecordId: draftId,
        linkedJobId: draftId,
        automationApplied: true,
      },
    });
    setSelectedJobId(draftId);
  };

  const savePart = (partDraft: HuttonPart) => {
    setParts((current) => {
      const exists = current.some((part) => part.id === partDraft.id);
      if (exists) {
        return current.map((part) => (part.id === partDraft.id ? partDraft : part));
      }
      return [partDraft, ...current];
    });
    setSelectedPartId(partDraft.id);
  };

  const createPartRequest = ({
    jobId,
    partId,
    quantity,
    urgency,
    notes,
  }: {
    jobId: string;
    partId: string;
    quantity: number;
    urgency: HuttonPartRequest["urgency"];
    notes: string;
  }) => {
    const job = jobs.find((item) => item.id === jobId);
    const part = parts.find((item) => item.id === partId);
    if (!job || !part) return;

    const requestId = `PO-${500 + partRequests.length}`;
    const newRequest: HuttonPartRequest = {
      id: requestId,
      jobId,
      partId,
      quantity,
      status: "Requested",
      requestedBy: job.technicianId,
      urgency,
      eta: urgency === "Urgent" ? "Today 16:30" : "Tomorrow 10:30",
      supplierId: part.supplierId,
      notes,
    };

    setPartRequests((current) => [newRequest, ...current]);
    setJobs((current) =>
      current.map((item) =>
        item.id === jobId
          ? {
              ...item,
              partRequestIds: [requestId, ...item.partRequestIds],
              status:
                item.status === "Approved" || item.status === "Inspection In Progress"
                  ? "Waiting for Parts"
                  : item.status,
              progressPercent:
                item.status === "Approved" || item.status === "Inspection In Progress"
                  ? stageMeta["Waiting for Parts"].progress
                  : item.progressPercent,
              nextStep: `Parts request ${requestId} created for ${part.name}.`,
              alerts: [`Awaiting ${part.name} supplier ETA`],
              whatsappStatus: "Attention Needed",
            }
          : item,
      ),
    );
    setWhatsappByJob((current) => {
      const update: HuttonWhatsAppUpdate = {
        id: `WA-${Date.now()}`,
        at: "Just now",
        direction: "Outgoing",
        sender: "Hutton Parts Desk",
        message: `Part request ${requestId} raised for ${part.name}. Supplier ETA is being confirmed.`,
        tone: urgency === "Urgent" ? "Concerned" : "Neutral",
      };

      return {
        ...current,
        [jobId]: [update, ...(current[jobId] ?? [])].slice(0, 8),
      };
    });
    setInbox((current) => [
      {
        id: `IN-${800 + current.length}`,
        clientId: job.clientId,
        jobId,
        receivedAt: "Just now",
        subject: `Parts request created for ${part.name}`,
        preview: `Please confirm when the ${part.name} will be available and whether the ETA affects the current promise.`,
        classification: urgency === "Urgent" ? "Urgent Issue" : "Progress Request",
        routedTo: "Parts / Admin",
        urgent: urgency === "Urgent",
        priority: urgency === "Urgent" ? "Urgent" : "Priority",
        status: "Assigned",
        suggestedReply: `We have raised the parts request for ${part.name} and will confirm the supplier ETA shortly.`,
        humanAttentionRequired: urgency === "Urgent",
      },
      ...current,
    ]);
    setActiveSection("parts-orders");
  };

  const updatePartRequestStatus = (
    requestId: string,
    status: HuttonPartRequest["status"],
  ) => {
    const request = partRequests.find((item) => item.id === requestId);
    if (!request) return;

    setPartRequests((current) =>
      current.map((item) =>
        item.id === requestId
          ? {
              ...item,
              status,
              eta:
                status === "Arrived"
                  ? "Arrived just now"
                  : status === "Installed"
                    ? "Installed in job"
                    : status === "Ordered"
                      ? "Supplier confirmed"
                      : item.eta,
            }
          : item,
      ),
    );

    if (status === "Arrived" || status === "Installed") {
      setJobs((current) =>
        current.map((job) =>
          job.id === request.jobId
            ? {
                ...job,
                status: status === "Arrived" ? "Parts Arrived" : "In Service",
                progressPercent:
                  status === "Arrived"
                    ? stageMeta["Parts Arrived"].progress
                    : stageMeta["In Service"].progress,
                nextStep:
                  status === "Arrived"
                    ? "Parts have arrived and the vehicle can move back into service."
                    : "Parts installed. Complete repair and move toward QC.",
                alerts: status === "Arrived" ? ["Parts on site and ready for fitment"] : [],
              }
            : job,
        ),
      );
    }

    if (status === "Backordered") {
      const relatedJob = jobs.find((job) => job.id === request.jobId);
      if (relatedJob) {
        setWhatsappByJob((current) => {
          const update: HuttonWhatsAppUpdate = {
            id: `WA-${Date.now()}`,
            at: "Just now",
            direction: "Outgoing",
            sender: "Hutton Parts Desk",
            message: "A required part has been delayed by the supplier. We are escalating the ETA and will keep you updated.",
            tone: "Concerned",
          };

          return {
            ...current,
            [request.jobId]: [update, ...(current[request.jobId] ?? [])].slice(0, 8),
          };
        });
        setInbox((current) => [
          {
            id: `IN-${800 + current.length}`,
            clientId: relatedJob.clientId,
            jobId: relatedJob.id,
            receivedAt: "Just now",
            subject: "Supplier delay escalated",
            preview: "The part has moved to backorder and the client will expect an updated ETA.",
            classification: "Urgent Issue",
            routedTo: "Parts / Admin",
            urgent: true,
            priority: "Urgent",
            status: "Assigned",
            suggestedReply: "We are following up on the delayed supplier item now and will update you as soon as the revised ETA is confirmed.",
            humanAttentionRequired: true,
          },
          ...current,
        ]);
      }
    }
  };

  const advanceJob = (jobId: string) => {
    const currentJob = jobs.find((job) => job.id === jobId);
    if (!currentJob) return;

    const newStatus = nextStage(currentJob.status, currentJob, partRequests);
    const meta = stageMeta[newStatus];

    setJobs((current) =>
      current.map((job) =>
        job.id === jobId
          ? {
              ...job,
              status: newStatus,
              bookingStatus:
                newStatus === "Checked In" ||
                newStatus === "Inspection In Progress" ||
                newStatus === "Waiting for Approval" ||
                newStatus === "Approved" ||
                newStatus === "Waiting for Parts" ||
                newStatus === "Parts Ordered" ||
                newStatus === "Parts Arrived" ||
                newStatus === "In Service" ||
                newStatus === "Repair Complete" ||
                newStatus === "Quality Check" ||
                newStatus === "Ready for Collection" ||
                newStatus === "Delivered / Collected" ||
                newStatus === "Closed"
                  ? "Completed"
                  : job.bookingStatus,
              progressPercent: meta.progress,
              nextStep: meta.nextStep,
              etaLabel:
                newStatus === "Ready for Collection"
                  ? "Ready now"
                  : `${meta.etaPrefix} - ${job.promisedTime}`,
              whatsappStatus: meta.whatsappStatus,
              alerts:
                newStatus === "Waiting for Approval"
                  ? ["Client approval still outstanding"]
                  : newStatus === "Waiting for Parts" || newStatus === "Parts Ordered"
                    ? ["Parts ETA now driving promised time"]
                    : newStatus === "Ready for Collection"
                      ? ["Collection notification sent"]
                      : [],
            }
          : job,
      ),
    );

    const transportStatus = transportStatusForStage(newStatus);
    if (transportStatus && currentJob.transportTaskId) {
      setTransportTasks((current) =>
        current.map((task) =>
          task.id === currentJob.transportTaskId ? { ...task, status: transportStatus } : task,
        ),
      );
    }

    if (newStatus === "Waiting for Parts") {
      setPartRequests((current) =>
        current.map((request) =>
          currentJob.partRequestIds.includes(request.id) && request.status === "Requested"
            ? { ...request, status: "Ordered", eta: "Today 16:30" }
            : request,
        ),
      );
    }

    if (newStatus === "Ready for Collection") {
      setInbox((current) =>
        current.map((message) =>
          message.jobId === jobId && message.status !== "Handled"
            ? { ...message, status: "Handled" }
            : message,
        ),
      );
    }

    setWhatsappByJob((current) => pushTimelineUpdate(current, currentJob, newStatus));
  };

  const createBooking = (formOverride?: HuttonBookingForm) => {
    const form = formOverride ?? bookingForm;
    const clientId = `CL-${(clients.length + 1).toString().padStart(3, "0")}`;
    const vehicleId = `VH-${(vehicles.length + 1).toString().padStart(3, "0")}`;
    const bookingId = `BK-${24060 + jobs.length}`;
    const transportTaskId = form.transportRequired
      ? `TR-${300 + transportTasks.length}`
      : undefined;
    const newClient: HuttonClient = {
      id: clientId,
      name: form.clientName,
      phone: form.phone,
      email: form.email,
      preferredContact: "WhatsApp",
      tags: form.transportRequired ? ["New booking", "Needs transport"] : ["New booking"],
    };
    const newVehicle: HuttonVehicle = {
      id: vehicleId,
      clientId,
      registration: form.registration,
      make: form.vehicleMake,
      model: form.vehicleModel,
      year: 2024,
      color: "To capture",
      vin: form.vin,
      mileageKm: Number.parseInt(form.mileage, 10) || 0,
      engine: "To capture",
      lastServiceDate: "Unknown",
    };
    const newJob: HuttonJob = {
      id: bookingId,
      clientId,
      vehicleId,
      advisor: "Reception Desk",
      technicianId: "TECH-003",
      status: "Booking Confirmed",
      bookingStatus: "Confirmed",
      priority: form.transportRequired ? "High" : "Normal",
      bookingTime: form.bookingDateTime,
      promisedTime: form.bookingDateTime.includes("Tomorrow")
        ? "Tomorrow 17:00"
        : "Today 17:00",
      etaLabel: `Booking set - ${form.bookingDateTime}`,
      concern: form.serviceRequest,
      estimate: 2450,
      approvedAmount: null,
      progressPercent: stageMeta["Booking Confirmed"].progress,
      bay: "Awaiting allocation",
      checklist: ["Booking created digitally", "Reception details captured"],
      recommendedWork: ["Inspection and estimate"],
      bookingNotes: form.notes,
      pickupAddress: form.transportRequired ? form.pickupAddress : undefined,
      dropoffAddress: form.transportRequired ? form.dropoffAddress : undefined,
      vehicleCondition: "To capture at check-in.",
      clientComplaint: form.serviceRequest,
      photoChecklist: ["Front three-quarter photo pending", "Odometer photo pending"],
      queueStatus: "Booked into reception lane",
      technicianNotes: "Awaiting vehicle arrival and intake.",
      inspectionFindings: "Inspection not started yet.",
      approvalSummary: "Awaiting inspection findings.",
      approvalNotes: "No approval notes yet.",
      transportRequired: form.transportRequired,
      transportTaskId,
      partRequestIds: [],
      alerts: ["New booking awaiting check-in"],
      whatsappStatus: "Synced",
      internalNotes: "Created from reception intake workflow.",
      nextStep: stageMeta["Booking Confirmed"].nextStep,
    };
    const newTimeline: HuttonWhatsAppUpdate = {
      id: `WA-${Date.now()}`,
      at: "Just now",
      direction: "Outgoing",
      sender: "Hutton Motors Reception",
      message: `Booking created for ${form.bookingDateTime}. We will confirm intake and next steps shortly.`,
      tone: "Positive",
    };

    setClients((current) => [newClient, ...current]);
    setVehicles((current) => [newVehicle, ...current]);
    setJobs((current) => [newJob, ...current]);
    if (form.transportRequired && transportTaskId) {
      const newTask: HuttonTransportTask = {
        id: transportTaskId,
        jobId: bookingId,
        clientId,
        tripType: "Pickup",
        driver: "Pending assignment",
        vehicle: "Shuttle pool",
        pickupFrom: form.pickupAddress || "Address to confirm",
        dropoffTo: form.dropoffAddress || "Hutton Motors Reception",
        requestedTime: form.bookingDateTime,
        status: "Requested",
        notes: "Created automatically from reception booking intake.",
      };
      setTransportTasks((current) => [newTask, ...current]);
    }
    setWhatsappByJob((current) => ({ ...current, [bookingId]: [newTimeline] }));
    setSelectedJobId(newJob.id);
    setActiveSection("calendar");
    setBookingForm(initialBookingForm);
  };

  const checkInVehicle = (jobId: string) => {
    const currentJob = jobs.find((job) => job.id === jobId);
    if (!currentJob) return;

    const convertedId = currentJob.id.startsWith("BK-")
      ? `HM-${24080 + jobs.length}`
      : currentJob.id;

    setJobs((current) =>
      current.map((job) =>
        job.id === jobId
          ? {
              ...job,
              id: convertedId,
              status: "Checked In",
              bookingStatus: "Completed",
              progressPercent: stageMeta["Checked In"].progress,
              etaLabel: `Checked in - ${job.promisedTime}`,
              queueStatus: `Queued for ${job.technicianId}`,
              nextStep: stageMeta["Checked In"].nextStep,
              technicianNotes:
                job.technicianNotes === "Awaiting vehicle arrival and intake."
                  ? "Vehicle checked in and queued for inspection."
                  : job.technicianNotes,
              alerts: [],
            }
          : job,
      ),
    );

    if (currentJob.id !== convertedId) {
      setPartRequests((current) =>
        current.map((request) =>
          request.jobId === currentJob.id ? { ...request, jobId: convertedId } : request,
        ),
      );
      setCalendarEvents((current) =>
        current.map((event) =>
          event.jobId === currentJob.id || event.linkedRecordId === currentJob.id
            ? { ...event, jobId: convertedId, linkedRecordId: convertedId }
            : event,
        ),
      );
      setTransportTasks((current) =>
        current.map((task) =>
          task.jobId === currentJob.id
            ? { ...task, jobId: convertedId, status: "Client Dropped Off" }
            : task,
        ),
      );
      setInbox((current) =>
        current.map((message) =>
          message.jobId === currentJob.id ||
          message.aiBookingAnalysis?.linkedJobId === currentJob.id ||
          message.aiBookingAnalysis?.linkedDraftRecordId === currentJob.id
            ? {
                ...message,
                jobId: message.jobId === currentJob.id ? convertedId : message.jobId,
                aiBookingAnalysis: message.aiBookingAnalysis
                  ? {
                      ...message.aiBookingAnalysis,
                      linkedJobId:
                        message.aiBookingAnalysis.linkedJobId === currentJob.id
                          ? convertedId
                          : message.aiBookingAnalysis.linkedJobId,
                      linkedDraftRecordId:
                        message.aiBookingAnalysis.linkedDraftRecordId === currentJob.id
                          ? convertedId
                          : message.aiBookingAnalysis.linkedDraftRecordId,
                    }
                  : undefined,
              }
            : message,
        ),
      );
      setWhatsappByJob((current) => {
        const transferred = current[currentJob.id] ?? [];
        const next = { ...current, [convertedId]: transferred };
        delete next[currentJob.id];
        return pushTimelineUpdate(next, { ...currentJob, id: convertedId }, "Checked In");
      });
      setSelectedJobId(convertedId);
    } else {
      setTransportTasks((current) =>
        current.map((task) =>
          task.id === currentJob.transportTaskId
            ? { ...task, status: "Client Dropped Off" }
            : task,
        ),
      );
      setWhatsappByJob((current) => pushTimelineUpdate(current, currentJob, "Checked In"));
      setSelectedJobId(jobId);
    }

    setActiveSection("job-card");
  };

  const simulateIncomingBookingWhatsApp = () => {
    trackHuttonEvent("demo_simulation_click", {
      action: "simulate_incoming_whatsapp",
    });
    const nextMessage = {
      id: `IN-${900 + inbox.length}`,
      clientId: "CL-008",
      receivedAt: "Just now",
      subject: "Need a service booking this Friday",
      preview:
        "Hi, can you book my VW Polo for Friday morning? I need a service and can drop it off before work.",
      classification: "Booking Query" as const,
      routedTo: "Reception" as const,
      urgent: false,
      priority: "Priority" as const,
      status: "New" as const,
      suggestedReply:
        "Thanks, we can help with that. Please send your preferred time and registration so we can confirm your booking.",
      humanAttentionRequired: false,
      aiBookingAnalysis: {
        detectedIntent: true,
        confidence: 0.86,
        extractedFields: {
          customerName: "Chantel Meyer",
          phoneNumber: "083 332 9914",
          vehicleMake: "Volkswagen",
          vehicleModel: "Polo",
          serviceRequest: "Routine service",
          preferredDate: "Friday",
          timeWindow: "Morning",
          urgency: "Normal" as const,
        },
        missingCoreFields: ["Registration"],
        reasoning:
          "The booking intent is strong and the vehicle is identifiable, but reception still needs the registration before confirming the slot.",
        automationApplied: false,
      },
    };

    setInbox((current) => [nextMessage, ...current]);
    openSection("whatsapp", "simulation_whatsapp");
  };

  const resetDemoData = () => {
    trackHuttonEvent("demo_simulation_click", {
      action: "reset_demo_data",
    });
    setParts(huttonServiceData.parts);
    setClients(huttonServiceData.clients);
    setVehicles(huttonServiceData.vehicles);
    setJobs(huttonServiceData.jobs);
    setPartRequests(huttonServiceData.partRequests);
    setTransportTasks(huttonServiceData.transportTasks);
    setInbox(huttonServiceData.inbox);
    setWhatsappByJob(huttonServiceData.whatsappByJob);
    setCalendarEvents(huttonServiceData.calendarEvents);
    setBookingForm(initialBookingForm);
    setSelectedPartId(huttonServiceData.parts[0]?.id ?? "");
    setSelectedJobId(huttonServiceData.jobs[0]?.id ?? "");
    setActiveSection("dashboard");
  };

  const handleQuickAction = (
    action:
      | "new-booking"
      | "check-in"
      | "request-part"
      | "transport-request"
      | "open-whatsapp",
  ) => {
    if (action === "open-whatsapp") {
      openSection("whatsapp", "quick_action");
      return;
    }

    if (action === "request-part") {
      const selected = jobs.find((job) => job.id === selectedJobId) ?? jobs[0];
      createPartRequest({
        jobId: selected.id,
        partId: selectedPart?.id ?? parts[0]?.id ?? "PART-002",
        quantity: 1,
        urgency: selected.priority === "Urgent" ? "Urgent" : "Priority",
        notes: `Created from dashboard quick action for ${selected.id}.`,
      });
      trackHuttonEvent("demo_simulation_click", {
        action: "request_part",
      });
      return;
    }

    if (action === "transport-request") {
      const selected = jobs.find((job) => job.id === selectedJobId) ?? jobs[0];
      const task: HuttonTransportTask = {
        id: `TR-${300 + transportTasks.length}`,
        jobId: selected.id,
        clientId: selected.clientId,
        tripType: selected.status === "Ready for Collection" ? "Return" : "Pickup",
        driver: "Unassigned",
        vehicle: "Shuttle pool",
        pickupFrom:
          selected.status === "Ready for Collection"
            ? "Hutton Motors Reception"
            : selected.pickupAddress || "Client address on file",
        dropoffTo:
          selected.status === "Ready for Collection"
            ? selected.dropoffAddress || "Client address on file"
            : "Hutton Motors Reception",
        requestedTime: "Today 15:45",
        status: selected.status === "Ready for Collection" ? "Return Trip Pending" : "Requested",
        notes: `Dashboard quick action created a new transport request for ${selected.id}.`,
      };

      setTransportTasks((current) => [task, ...current]);
      setJobs((current) =>
        current.map((job) =>
          job.id === selected.id
            ? { ...job, transportRequired: true, transportTaskId: task.id }
            : job,
        ),
      );
      trackHuttonEvent("demo_simulation_click", {
        action: "transport_request",
      });
      openSection("transport", "quick_action");
      return;
    }

    if (action === "check-in") {
      const pending = jobs.find((job) => job.status === "Booking Confirmed");
      if (pending) {
        trackHuttonEvent("demo_simulation_click", {
          action: "check_in_vehicle",
        });
        checkInVehicle(pending.id);
      }
      return;
    }

    openSection("reception", "quick_action");
  };

  return (
    <div className="bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.14),transparent_26rem),linear-gradient(180deg,#F7F7F2_0%,#ECEAE4_100%)]">
      {showStickyBar ? (
        <div className="fixed inset-x-0 bottom-3 z-40 px-3 sm:bottom-auto sm:top-4 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 rounded-[12px] border border-[#111111]/10 bg-[#111111]/95 px-4 py-3 text-white shadow-[0_20px_40px_rgba(17,17,17,0.28)] backdrop-blur">
            <p className="text-sm font-medium text-[#d8d8d2]">
              Hutton Motors Service Centre OS
            </p>
            <div className="flex flex-1 flex-wrap justify-end gap-2">
              <TrackedDemoLink
                href={contactHref}
                location="hutton_demo_sticky_cta"
                system={huttonDemoSlug}
                className="cta-button"
                data-event="free_audit_click"
                data-demo-slug={huttonDemoSlug}
                onClick={() =>
                  trackHuttonEvent("demo_sticky_cta_click", { location: "sticky_bar" })
                }
              >
                Request This For My Business
              </TrackedDemoLink>
              <TrackedWhatsAppLink
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                location="hutton_demo_sticky_whatsapp"
                className="cta-secondary"
                data-event="whatsapp_click"
                data-demo-slug={huttonDemoSlug}
                aria-label="WhatsApp Eddy about my service centre"
              >
                <MessageCircleMore className="h-4 w-4" />
                WhatsApp Eddy
              </TrackedWhatsAppLink>
            </div>
          </div>
        </div>
      ) : null}

      <div className="section-shell py-8 pb-28 sm:py-10 sm:pb-16 lg:py-12">
        <section
          ref={heroRef}
          className="rounded-[14px] border border-[#111111]/10 bg-[linear-gradient(135deg,rgba(17,17,17,0.98),rgba(34,38,48,0.96))] p-5 text-white shadow-[0_30px_80px_rgba(17,17,17,0.18)] sm:p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d8d8d2]">
                Hutton Motors Demo
              </p>
              <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Run Reception, Workshop, Parts, Shuttle, and Client Updates From One Service-Centre OS
              </h1>
              <ul className="mt-5 grid gap-3 text-sm leading-7 text-[#f7f7f2] sm:text-base">
                {heroBullets.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#67E8F9]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-[#d8d8d2] sm:text-base">
                Interactive service-centre concept demo with live mock state, built to show how a Pine X operating system can coordinate one workshop day.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <TrackedDemoLink
                  href={contactHref}
                  location="hutton_demo_hero_cta"
                  system={huttonDemoSlug}
                  className="cta-button"
                  data-demo-slug={huttonDemoSlug}
                >
                  Request This For My Business
                </TrackedDemoLink>
                <TrackedWhatsAppLink
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  location="hutton_demo_hero_whatsapp"
                  className="cta-secondary"
                  data-event="whatsapp_click"
                  data-demo-slug={huttonDemoSlug}
                  aria-label="WhatsApp Eddy about my service centre"
                >
                  <MessageCircleMore className="h-4 w-4" />
                  WhatsApp Eddy
                </TrackedWhatsAppLink>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <HuttonStatusBadge value={`${jobs.length} live jobs`} />
              <HuttonStatusBadge value={`${alerts.length} active alerts`} />
              <HuttonStatusBadge value={`${transportTasks.length} client moves`} />
              <HuttonStatusBadge value={`${liveCalendarEvents.length} calendar items`} />
            </div>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {previewFrames.map((frame) => (
              <div
                key={frame.title}
                className="rounded-[12px] border border-white/10 bg-white/5 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#67E8F9]">
                  {frame.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-[#d8d8d2]">{frame.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="mt-5 rounded-[14px] border border-[#111111]/10 bg-white/80 p-5 shadow-[0_20px_50px_rgba(17,17,17,0.06)] backdrop-blur"
          aria-labelledby="hutton-guided-tour"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0f766e]">
            Start Here in 90 Seconds
          </p>
          <h2
            id="hutton-guided-tour"
            className="mt-2 font-heading text-2xl font-semibold text-[#111111]"
          >
            Guide the meeting through the service-centre flow
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <button
              type="button"
              onClick={() => openSection("reception", "guided_tour")}
              className="rounded-[12px] border border-[#111111]/10 bg-[#FAFAF7] p-4 text-left text-sm font-semibold text-[#111111] transition hover:border-[#67E8F9]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67E8F9]"
            >
              Reception and booking flow
            </button>
            <button
              type="button"
              onClick={() => openSection("job-card", "guided_tour", { jobId: selectedJob.id })}
              className="rounded-[12px] border border-[#111111]/10 bg-[#FAFAF7] p-4 text-left text-sm font-semibold text-[#111111] transition hover:border-[#67E8F9]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67E8F9]"
            >
              Live job card + workshop board
            </button>
            <button
              type="button"
              onClick={() => openSection("transport", "guided_tour", { jobId: selectedJob.id })}
              className="rounded-[12px] border border-[#111111]/10 bg-[#FAFAF7] p-4 text-left text-sm font-semibold text-[#111111] transition hover:border-[#67E8F9]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67E8F9]"
            >
              Parts, shuttle, and WhatsApp coordination
            </button>
          </div>
        </section>

        <section
          className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Hutton service-centre proof points"
        >
          {proofCards.map((item) => (
            <div
              key={item}
              className="rounded-[12px] border border-[#111111]/10 bg-white/85 p-4 text-sm leading-6 text-[#111111] shadow-[0_18px_35px_rgba(17,17,17,0.05)]"
            >
              {item}
            </div>
          ))}
        </section>

        <section
          className="mt-6 grid gap-4 rounded-[16px] border border-[#111111]/10 bg-white/85 p-5 shadow-[0_20px_50px_rgba(17,17,17,0.06)] lg:grid-cols-[1.2fr_0.8fr]"
          aria-labelledby="hutton-control-points"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0891b2]">
              What this system helps you control
            </p>
            <h2 id="hutton-control-points" className="mt-2 font-heading text-2xl font-semibold text-[#111111]">
              The service-centre pressure points this demo is built around
            </h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {controlItems.map((item) => (
                <div key={item} className="flex gap-3 rounded-[10px] border border-[#111111]/10 bg-[#f7f7f2] p-3 text-sm leading-6 text-[#30343a]">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#0891b2]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[12px] border border-[#67E8F9]/30 bg-[#ECFEFF] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0891b2]">
              Best fit for
            </p>
            <p className="mt-3 text-sm leading-7 text-[#30343a]">
              Best fit for busy service centres that need reception, job cards, workshop movement, parts, transport and client updates connected in one operating flow.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <TrackedDemoLink
                href={contactHref}
                location="hutton_best_fit_audit"
                system={huttonDemoSlug}
                className="cta-button"
                data-event="free_audit_click"
                data-demo-slug={huttonDemoSlug}
              >
                Request This For My Business
              </TrackedDemoLink>
              <Link href="/demos" className="cta-secondary" data-event="demo_open" data-demo-slug={huttonDemoSlug}>
                Back to all demos
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-5 grid gap-5 xl:grid-cols-[18rem_minmax(0,1fr)]">
          <div className="space-y-5 xl:sticky xl:top-24 xl:self-start">
            <HuttonPanel>
              <HuttonPanelHeader
                eyebrow="Module Navigation"
                title="Service centre map"
                description="Move through the demo in a meeting-friendly sequence without leaving the Hutton service centre route."
              />
              <nav
                ref={moduleNavRef}
                className="flex gap-2 overflow-x-auto p-3 xl:flex-col xl:overflow-visible"
                aria-label="Hutton service centre modules"
              >
                {sections.map((section) => {
                  const Icon = section.icon;
                  const active = section.id === activeSection;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => openSection(section.id, "module_navigation")}
                      className={`flex shrink-0 items-start gap-3 rounded-[10px] border px-4 py-3 text-left transition xl:w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67E8F9] ${
                        active
                          ? "border-[#111111]/20 bg-[#111111] text-white"
                          : "border-[#111111]/8 bg-white text-[#111111] hover:border-[#67E8F9]/45"
                      }`}
                    >
                      <Icon className={`mt-0.5 h-4 w-4 ${active ? "text-white" : "text-[#60A5FA]"}`} />
                      <span>
                        <span className="block text-sm font-semibold">{section.label}</span>
                        <span className={`mt-0.5 block text-xs ${active ? "text-[#d8d8d2]" : "text-[#7b7e86]"}`}>
                          {section.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </nav>
            </HuttonPanel>

            <HuttonPanel>
              <HuttonPanelHeader
                eyebrow="Job Navigator"
                title="Bookings and jobs"
                description="Pick any booking or active job once and the detail, calendar, WhatsApp, parts, and transport views follow it."
              />
              <div className="space-y-3 p-4">
                {jobs.map((job) => {
                  const client = findClient(job, clients);
                  return (
                    <button
                      key={job.id}
                      type="button"
                      onClick={() => {
                        setSelectedJobId(job.id);
                        trackHuttonEvent("demo_job_select", {
                          job_id: job.id,
                          source: "job_navigator",
                        });
                      }}
                      className={`w-full rounded-[10px] border px-4 py-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67E8F9] ${
                        selectedJobId === job.id
                          ? "border-[#111111]/18 bg-[#111111] text-white"
                          : "border-[#111111]/8 bg-[#FAFAF7] text-[#111111]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold">{job.id}</p>
                        <div className="flex flex-wrap gap-2">
                          {job.bookingStatus !== "Completed" ? (
                            <HuttonStatusBadge value={job.bookingStatus} />
                          ) : null}
                          <HuttonStatusBadge value={job.status} />
                        </div>
                      </div>
                      <p className={`mt-2 text-sm ${selectedJobId === job.id ? "text-[#d8d8d2]" : "text-[#555962]"}`}>
                        {client.name}
                      </p>
                    </button>
                  );
                })}
              </div>
            </HuttonPanel>
          </div>

          <div
            ref={contentRef}
            tabIndex={-1}
            className="space-y-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#67E8F9]"
          >
            {activeSection === "dashboard" ? (
              <HuttonDashboard
                jobs={jobs}
                clients={clients}
                vehicles={vehicles}
                technicians={huttonServiceData.technicians}
                transportTasks={transportTasks}
                inbox={inbox}
                bookingsToday={bookingsToday}
                alerts={alerts}
                onAdvanceJob={advanceJob}
                onOpenJob={openJob}
                onQuickAction={handleQuickAction}
              />
            ) : null}

            {activeSection === "reception" ? (
              <ReceptionIntakeForm
                bookingForm={bookingForm}
                onBookingFormChange={updateBookingForm}
                onCreateBooking={createBooking}
                client={selectedClient}
                vehicle={selectedVehicle}
                job={selectedJob}
                technicians={huttonServiceData.technicians}
                onJobUpdate={updateJob}
                onCheckIn={checkInVehicle}
              />
            ) : null}

            {activeSection === "calendar" ? (
              <HuttonCalendar
                events={liveCalendarEvents}
                technicians={huttonServiceData.technicians}
                selectedJob={selectedJob}
                selectedClient={selectedClient}
                selectedVehicle={selectedVehicle}
                onCreateEvent={createCalendarEvent}
                onUpdateEvent={updateCalendarEvent}
                onOpenJob={openJob}
                onOpenReception={openReceptionWithPrefill}
                onOpenWhatsApp={openWhatsAppForJob}
              />
            ) : null}

            {activeSection === "job-card" ? (
              <JobCardDetail
                client={selectedClient}
                vehicle={selectedVehicle}
                job={selectedJob}
                calendarEvents={selectedCalendarEvents}
                partRequests={selectedRequests}
                parts={parts}
                suppliers={huttonServiceData.suppliers}
                timeline={timeline}
                transportTasks={selectedTransportTasks}
                onJobUpdate={updateJob}
                onAdvance={advanceJob}
                onRequestPart={createPartRequest}
              />
            ) : null}

            {activeSection === "workshop" ? (
              <WorkshopBoard
                jobs={jobs}
                clients={clients}
                vehicles={vehicles}
                technicians={huttonServiceData.technicians}
                onAdvanceJob={advanceJob}
                onOpenJob={openJob}
              />
            ) : null}

            {activeSection === "parts-library" ? (
              <PartsLibrary
                parts={filteredParts}
                suppliers={huttonServiceData.suppliers}
                selectedPart={selectedPart}
                onSelectPart={setSelectedPartId}
                onSavePart={savePart}
                search={partsSearch}
                onSearchChange={setPartsSearch}
              />
            ) : null}

            {activeSection === "parts-orders" ? (
              <PartsOrdersPanel
                requests={partRequests}
                parts={parts}
                suppliers={huttonServiceData.suppliers}
                jobs={jobs}
                onUpdateRequestStatus={updatePartRequestStatus}
              />
            ) : null}

            {activeSection === "transport" ? (
              <TransportPanel
                tasks={transportTasks}
                clients={clients}
                jobs={jobs}
                vehicles={vehicles}
                onUpdateTask={updateTransportTask}
                onUpdateTaskStatus={updateTransportTaskStatus}
              />
            ) : null}

            {activeSection === "whatsapp" ? (
              <WhatsAppCommunicationCentre
                inbox={inbox}
                clients={clients}
                jobs={jobs}
                vehicles={vehicles}
                calendarEvents={liveCalendarEvents}
                selectedJob={selectedJob}
                timeline={timeline}
                onUpdateInboxMessage={updateInboxMessage}
                onApplyBookingAutomation={applyInboxBookingAutomation}
                onOpenReception={openReceptionWithPrefill}
                onOpenJob={openJob}
              />
            ) : null}

            {activeSection === "management" ? (
              <ManagementInsights
                jobs={jobs}
                requests={partRequests}
                transport={transportTasks}
                inbox={inbox}
              />
            ) : null}

            <div ref={meetingRef}>
              <HuttonPanel className="overflow-hidden">
              <HuttonPanelHeader
                eyebrow="Demo highlights"
                title="What to show in the meeting"
                description="Status movement, supplier delays, client messaging, and transport coordination now update across the demo in one shared operating flow."
              />
              <div className="flex flex-wrap gap-3 p-4 sm:p-5">
                <HuttonStatusBadge value="Live stage movement" />
                <HuttonStatusBadge value="Shared operating data" />
                <HuttonStatusBadge value="Automated client updates" />
                <HuttonStatusBadge value="Cross-module workflow" />
                <HuttonStatusBadge value="Calendar follow-up flow" />
              </div>
              <div className="flex flex-wrap gap-3 border-t border-[#111111]/8 p-4 sm:p-5">
                <button
                  type="button"
                  className="cta-button"
                  onClick={() => {
                    trackHuttonEvent("demo_simulation_click", {
                      action: "create_sample_booking",
                    });
                    createBooking(sampleBookingForm);
                  }}
                >
                  Create sample booking
                </button>
                <button
                  type="button"
                  className="cta-secondary"
                  onClick={simulateIncomingBookingWhatsApp}
                >
                  Simulate incoming WhatsApp
                </button>
                <button
                  type="button"
                  className="cta-secondary"
                  onClick={() => {
                    trackHuttonEvent("demo_simulation_click", {
                      action: "advance_active_job",
                    });
                    advanceJob(selectedJob.id);
                  }}
                >
                  Advance active job
                </button>
                <button
                  type="button"
                  className="cta-secondary"
                  onClick={resetDemoData}
                >
                  Reset demo data
                </button>
              </div>
              </HuttonPanel>
            </div>

            <section className="grid gap-6 rounded-[14px] border border-[#111111]/10 bg-[linear-gradient(180deg,#111111_0%,#1E2430_100%)] p-5 text-white shadow-[0_24px_60px_rgba(17,17,17,0.18)] lg:grid-cols-[1fr_0.9fr] lg:p-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#67E8F9]">
                  Next step
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
                  Map the first service-centre workflow before committing to the full rollout
                </h2>
                <div className="mt-5 grid gap-3">
                  {[
                    "You send the workshop bottleneck, booking pressure, or coordination gap that hurts the day most.",
                    "We map the first operating board, job-card view, and communication loop your team should see.",
                    "You get a practical rollout recommendation before any full build decision.",
                  ].map((step, index) => (
                    <div
                      key={step}
                      className="flex gap-3 rounded-[12px] border border-white/10 bg-white/5 p-4 text-sm leading-6 text-[#f7f7f2]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-white text-sm font-semibold text-[#111111]">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                <TrackedWhatsAppLink
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  location="hutton_demo_close_whatsapp"
                  className="cta-secondary mt-5"
                  data-event="whatsapp_click"
                  data-demo-slug={huttonDemoSlug}
                  aria-label="WhatsApp Eddy about my service centre"
                >
                  <MessageCircleMore className="h-4 w-4" />
                  WhatsApp Eddy
                </TrackedWhatsAppLink>
              </div>

              <ShortAuditForm
                id="hutton-service-centre-audit"
                title="Tell us the service-centre bottleneck you want fixed first"
                subtitle="Send the part of your workshop day that feels messy and Pine X Systems will reply with practical ideas for bookings, job cards, parts, transport, and client updates."
                problemLabel="Biggest service-centre bottleneck"
                problemPlaceholder="Reception pressure, approvals, parts delays, shuttle coordination, WhatsApp follow-up..."
                buttonLabel="Request This For My Business"
                leadOffer="Service Centre Workflow Audit"
                source="hutton_service_centre_demo_close_form"
                demoSlug={huttonDemoSlug}
                leadIntent="demo_page"
                startEvent="demo_form_start"
                submitEvent="demo_form_submit"
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

