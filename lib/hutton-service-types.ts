export const jobStatuses = [
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
] as const;

export const transportStatuses = [
  "Requested",
  "Scheduled",
  "Driver Assigned",
  "En Route",
  "Client Picked Up",
  "Client Dropped Off",
  "Return Trip Pending",
  "Completed",
] as const;

export const inboxClassifications = [
  "Booking Query",
  "Reschedule Request",
  "Quote Approval",
  "Quote Rejection",
  "Progress Request",
  "Transport Request",
  "Complaint",
  "Invoice Question",
  "Urgent Issue",
] as const;

export const inboxRoutes = [
  "Reception",
  "Workshop Manager",
  "Parts / Admin",
  "Shuttle Coordinator",
  "Manager",
] as const;

export const bookingStatuses = [
  "Draft",
  "Confirmed",
  "Awaiting Client Confirmation",
  "Rescheduled",
  "Completed",
  "Cancelled",
  "No Show",
] as const;

export const calendarEventTypes = [
  "Booking",
  "Follow-up",
  "Vehicle Pickup",
  "Vehicle Drop-off",
  "Vehicle Collection",
  "Internal Workshop Reminder",
  "Approval Follow-up",
] as const;

export const calendarEventStatuses = [
  ...bookingStatuses,
  "Scheduled",
  "Awaiting Response",
  "In Progress",
  "Completed",
  "Pending",
] as const;

export type JobStatus = (typeof jobStatuses)[number];
export type TransportStatus = (typeof transportStatuses)[number];
export type InboxClassification = (typeof inboxClassifications)[number];
export type InboxRoute = (typeof inboxRoutes)[number];
export type BookingStatus = (typeof bookingStatuses)[number];
export type CalendarEventType = (typeof calendarEventTypes)[number];
export type CalendarEventStatus = (typeof calendarEventStatuses)[number];
export type AIBookingOutcome = "Confirmed Booking" | "Draft Booking" | "Review Needed";

export type HuttonClient = {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferredContact: "WhatsApp" | "Phone" | "Email";
  tags: string[];
};

export type HuttonVehicle = {
  id: string;
  clientId: string;
  registration: string;
  make: string;
  model: string;
  year: number;
  color: string;
  vin: string;
  mileageKm: number;
  engine: string;
  lastServiceDate: string;
};

export type HuttonTechnician = {
  id: string;
  name: string;
  role: string;
  bay: string;
  workload: number;
  status: "Active" | "Available" | "Break" | "Off Site";
  specialties: string[];
};

export type HuttonSupplier = {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  sla: string;
  rating: number;
  tags: string[];
};

export type HuttonPart = {
  id: string;
  category: string;
  sourceType: "OEM" | "Aftermarket";
  partNumber: string;
  alternatePartNumber: string;
  name: string;
  vehicleCompatibility: string[];
  supplierId: string;
  supplierSku: string;
  unitPrice: number;
  retailPrice: number;
  stockOnHand: number;
  reorderLevel: number;
  tags: string[];
  notes: string;
  lastUsedDate: string;
};

export type HuttonPartRequest = {
  id: string;
  jobId: string;
  partId: string;
  quantity: number;
  status: "Requested" | "Ordered" | "Arrived" | "Installed" | "Backordered";
  requestedBy: string;
  urgency: "Routine" | "Priority" | "Urgent";
  eta: string;
  supplierId: string;
  notes: string;
};

export type HuttonWhatsAppUpdate = {
  id: string;
  at: string;
  direction: "Outgoing" | "Incoming";
  sender: string;
  classification?: InboxClassification;
  routedTo?: InboxRoute;
  tone?: "Neutral" | "Positive" | "Concerned";
  message: string;
};

export type HuttonTransportTask = {
  id: string;
  jobId: string;
  clientId: string;
  tripType: "Pickup" | "Drop-off" | "Return";
  driver: string;
  vehicle: string;
  pickupFrom: string;
  dropoffTo: string;
  requestedTime: string;
  status: TransportStatus;
  notes: string;
};

export type HuttonJob = {
  id: string;
  clientId: string;
  vehicleId: string;
  advisor: string;
  technicianId: string;
  status: JobStatus;
  bookingStatus: BookingStatus;
  priority: "Low" | "Normal" | "High" | "Urgent";
  bookingTime: string;
  promisedTime: string;
  etaLabel: string;
  concern: string;
  estimate: number;
  approvedAmount: number | null;
  progressPercent: number;
  bay: string;
  checklist: string[];
  recommendedWork: string[];
  bookingNotes: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  vehicleCondition: string;
  clientComplaint: string;
  photoChecklist: string[];
  queueStatus: string;
  technicianNotes: string;
  inspectionFindings: string;
  approvalSummary: string;
  approvalNotes: string;
  transportRequired: boolean;
  transportTaskId?: string;
  partRequestIds: string[];
  alerts: string[];
  whatsappStatus: "Synced" | "Awaiting Reply" | "Client Replied" | "Attention Needed";
  internalNotes: string;
  nextStep: string;
};

export type HuttonInboxMessage = {
  id: string;
  clientId: string;
  jobId?: string;
  receivedAt: string;
  subject: string;
  preview: string;
  classification: InboxClassification;
  routedTo: InboxRoute;
  urgent: boolean;
  priority: "Normal" | "Priority" | "Urgent";
  status: "New" | "Assigned" | "Handled";
  suggestedReply: string;
  humanAttentionRequired: boolean;
  aiBookingAnalysis?: {
    detectedIntent: boolean;
    confidence: number;
    extractedFields: {
      customerName?: string;
      phoneNumber?: string;
      vehicleMake?: string;
      vehicleModel?: string;
      registration?: string;
      serviceRequest?: string;
      preferredDate?: string;
      preferredTime?: string;
      timeWindow?: string;
      transportRequired?: boolean;
      pickupAddress?: string;
      dropoffAddress?: string;
      urgency?: "Low" | "Normal" | "High" | "Urgent";
    };
    missingCoreFields: string[];
    outcome?: AIBookingOutcome;
    reasoning: string;
    alternativeSlots?: string[];
    linkedCalendarEventId?: string;
    linkedDraftRecordId?: string;
    linkedJobId?: string;
    automationApplied?: boolean;
  };
};

export type HuttonBookingForm = {
  clientName: string;
  phone: string;
  email: string;
  vehicleMake: string;
  vehicleModel: string;
  registration: string;
  vin: string;
  mileage: string;
  serviceRequest: string;
  bookingDateTime: string;
  notes: string;
  transportRequired: boolean;
  pickupAddress: string;
  dropoffAddress: string;
};

export type HuttonCalendarEvent = {
  id: string;
  title: string;
  clientName: string;
  phoneNumber: string;
  vehicleLabel: string;
  registration: string;
  linkedRecordId: string;
  eventType: CalendarEventType;
  startAt: string;
  endAt: string;
  status: CalendarEventStatus;
  assignedStaff: string;
  notes: string;
  address?: string;
  jobId?: string;
  clientId?: string;
  source: "Seeded" | "Derived" | "Quick Add";
};

export type HuttonServiceDataset = {
  clients: HuttonClient[];
  vehicles: HuttonVehicle[];
  technicians: HuttonTechnician[];
  suppliers: HuttonSupplier[];
  parts: HuttonPart[];
  partRequests: HuttonPartRequest[];
  jobs: HuttonJob[];
  transportTasks: HuttonTransportTask[];
  inbox: HuttonInboxMessage[];
  whatsappByJob: Record<string, HuttonWhatsAppUpdate[]>;
  calendarEvents: HuttonCalendarEvent[];
};
