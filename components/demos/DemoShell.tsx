"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  PackageSearch,
  ReceiptText,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { TrackedDemoLink } from "@/components/analytics/tracked-demo-link";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-whatsapp-link";
import { DemoDashboard } from "@/components/demos/DemoDashboard";
import { DemoRoleSwitcher } from "@/components/demos/DemoRoleSwitcher";
import { DemoSidebar } from "@/components/demos/DemoSidebar";
import { ShortAuditForm } from "@/components/ui/short-audit-form";
import type { DemoRecord, DemoSection } from "@/lib/demo-data";
import { getDemoSections } from "@/lib/demo-data";
import { trackCustomEvent } from "@/lib/gtag";
import type { DemoSystem } from "@/lib/demo-systems";
import { demoIconMap } from "@/lib/demo-systems";
import { whatsappCta } from "@/lib/site";

type RoleKind = "owner" | "manager" | "staff";
type Nouns = { singular: string; plural: string; queue: string; detail: string; ownerSection: string; managerSection: string; staffSection: string };

const nounsBySystem: Record<string, Nouns> = {
  dealership: { singular: "lead", plural: "leads", queue: "sales queue", detail: "stock", ownerSection: "Overview", managerSection: "Leads", staffSection: "Leads" },
  workshop: { singular: "job", plural: "jobs", queue: "bay queue", detail: "parts", ownerSection: "Overview", managerSection: "Job Cards", staffSection: "Job Cards" },
  agency: { singular: "campaign", plural: "campaigns", queue: "client queue", detail: "approvals", ownerSection: "Overview", managerSection: "Clients", staffSection: "Content" },
  construction: { singular: "project", plural: "projects", queue: "site queue", detail: "materials", ownerSection: "Overview", managerSection: "Projects", staffSection: "Projects" },
  warehouse: { singular: "stock item", plural: "stock items", queue: "pick queue", detail: "receiving", ownerSection: "Overview", managerSection: "Inventory", staffSection: "Dispatch" },
  logistics: { singular: "delivery", plural: "deliveries", queue: "dispatch board", detail: "POD", ownerSection: "Overview", managerSection: "Dispatch", staffSection: "Deliveries" },
  farm: { singular: "task", plural: "tasks", queue: "field queue", detail: "equipment", ownerSection: "Overview", managerSection: "Tasks", staffSection: "Tasks" },
  security: { singular: "incident", plural: "incidents", queue: "shift queue", detail: "check-ins", ownerSection: "Overview", managerSection: "Incidents", staffSection: "Sites" },
  "custom-business": { singular: "workflow", plural: "workflows", queue: "approval queue", detail: "documents", ownerSection: "Overview", managerSection: "Approvals", staffSection: "Workflows" },
  "accounting-os": { singular: "client workflow", plural: "client workflows", queue: "review queue", detail: "documents", ownerSection: "Overview", managerSection: "Reviews", staffSection: "Documents" },
  "marine-business": { singular: "work item", plural: "work items", queue: "sales and service queue", detail: "parts", ownerSection: "Overview", managerSection: "Service", staffSection: "Parts" },
};

function roleKindFromLabel(label: string): RoleKind {
  const lower = label.toLowerCase();
  if (lower.includes("manager") || lower.includes("admin") || lower.includes("finance")) return "manager";
  if (lower.includes("technician") || lower.includes("staff") || lower.includes("sales") || lower.includes("worker") || lower.includes("guard") || lower.includes("client")) return "staff";
  return "owner";
}

const moneyFormatter = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 });
const workshopProofCards = [
  "Replaces paper job cards and scattered WhatsApp updates",
  "Built around your actual workshop flow",
  "Easy for advisors, technicians, and owners to use",
  "Support continues after launch",
];

const workshopHeroBullets = [
  "See blocked jobs before customers start chasing",
  "Track waiting parts, technician flow, and invoice-ready work",
  "Give owners one board instead of paper, chats, and spreadsheets",
];

const workshopGuidedTasks = [
  {
    label: "Show blocked jobs",
    targetSection: "Job Cards",
    search: "waiting",
    icon: ClipboardList,
  },
  {
    label: "Show waiting parts",
    targetSection: "Parts",
    search: "low",
    icon: PackageSearch,
  },
  {
    label: "Show invoice-ready work",
    targetSection: "Job Cards",
    search: "quality",
    icon: ReceiptText,
  },
];

const demoOwnerSummaries: Record<string, string> = {
  dealership:
    "Control every lead, vehicle, finance stage, test drive and sales handover from one owner dashboard.",
  workshop:
    "Track bookings, job cards, technicians, parts delays, approvals and invoice-ready work from one live workshop board.",
  "hutton-motors-service-centre":
    "Keep reception, job cards, workshop movement, parts, transport and WhatsApp updates connected in one service centre flow.",
  agency:
    "Track clients, campaigns, approvals, reports, tasks and delivery pressure from one agency operations dashboard.",
  construction:
    "Control projects, site tasks, subcontractors, materials, variations, deadlines and client reporting from one project command centre.",
  warehouse:
    "Track stock movement, receiving, dispatch, low-stock alerts, supplier orders and warehouse zones from one live stock control system.",
  logistics:
    "Control dispatch, fleet status, driver updates, POD capture, delivery exceptions and owner reporting from one logistics command centre.",
  farm:
    "Manage field tasks, labour teams, equipment, inputs, harvest workflows and dispatch visibility from one farm operations dashboard.",
  security:
    "Track sites, shifts, guards, patrols, missed check-ins, incidents, equipment and reporting from one operations command centre.",
  "custom-business":
    "Show how an owner dashboard, staff workflow, approvals, client portal, documents and automation can be shaped around any business.",
  "accounting-os":
    "Control recurring client work, document chasing, reviews, deadlines and partner reporting from one practice operating system.",
  "marine-business":
    "Unify enquiries, unit availability, service bookings, parts requests and after-sales visibility from one marine business system.",
};

const demoControlItems: Record<string, string[]> = {
  workshop: [
    "Paper job cards, advisor notes and technician movement",
    "Waiting parts, supplier ETA and work stuck in the bay",
    "Approval follow-ups before customers start chasing",
    "Invoice-ready work and ready-for-collection jobs",
    "Owner visibility across bookings, pressure and daily output",
  ],
  logistics: [
    "Assigned deliveries, dispatch pressure and delayed routes",
    "Vehicle status, driver updates and maintenance alerts",
    "POD pending items and customer update requirements",
    "Route exceptions before reporting becomes stale",
    "Owner-level delivery profit and performance reporting",
  ],
  warehouse: [
    "Receiving queues, stock movement and warehouse zone pressure",
    "Dispatch exceptions before customers or branches chase",
    "Low-stock alerts and reorder decisions",
    "Supplier orders, ETA follow-up and stock confidence",
    "Owner and warehouse-manager visibility from one live dashboard",
  ],
  construction: [
    "Site tasks, milestone risk and delayed project stages",
    "Material pressure, procurement delays and supplier ETA",
    "Subcontractor accountability and overdue work",
    "Variation, weather and client-reporting pressure",
    "Owner visibility without waiting for end-of-day updates",
  ],
  agency: [
    "Campaign delivery, content status and open approvals",
    "Client response pending items and overdue reports",
    "Account-manager workload and blocked production tasks",
    "Monthly reporting progress and owner visibility",
    "Delivery pressure before clients start chasing",
  ],
  security: [
    "Sites, shifts, guards and roster coverage",
    "Missed patrols, missed check-ins and urgent exceptions",
    "Open incidents, escalation status and client reporting",
    "Equipment issues and operational accountability",
    "Management visibility before clients notice gaps",
  ],
  farm: [
    "Field tasks, labour teams and blocked seasonal work",
    "Low-input alerts, supplier pressure and spray/fertiliser readiness",
    "Equipment maintenance, downtime and operator visibility",
    "Harvest progress, dispatch movement and owner reporting",
    "Daily operational pressure across fields and teams",
  ],
  "custom-business": [
    "Owner dashboards shaped around the numbers that matter",
    "Staff workflows, approvals and recurring operational tasks",
    "Client portal activity, documents and request status",
    "Automation steps that reduce repeated admin",
    "Permissions, role views and reporting in one custom system",
  ],
  "accounting-os": [
    "Recurring client work, document chasing and review queues",
    "Deadline risk, overdue tasks and partner visibility",
    "Onboarding, reporting and compliance-heavy workflows",
    "Staff workload and handoff accountability",
    "Practice-level control without scattered reminders",
  ],
  "marine-business": [
    "Sales enquiries, unit availability and after-sales pressure",
    "Service bookings, parts requests and supplier follow-up",
    "Owner dashboards across sales and service",
    "Client updates, handover status and disconnected task risk",
    "A phased operating system for hybrid marine workflows",
  ],
};

const demoBestFit: Record<string, string> = {
  workshop:
    "Best fit for workshops still using paper job cards, WhatsApp updates, manual bookings, and disconnected parts tracking.",
  logistics:
    "Best fit for logistics teams that need dispatch, vehicles, drivers, POD, customer updates and owner reporting in one place.",
  warehouse:
    "Best fit for warehouses that need cleaner receiving, stock movement, dispatch, supplier ordering and low-stock control before adding fleet and POD.",
  construction:
    "Best fit for construction teams that need earlier visibility across site tasks, materials, subcontractors, deadlines and client reporting.",
  agency:
    "Best fit for agencies where campaign delivery, approvals, reports and client updates are still split across chat, spreadsheets and memory.",
  security:
    "Best fit for security operations that need site accountability, patrol visibility, incident handling, roster control and exception reporting.",
  farm:
    "Best fit for farms that need field tasks, labour, equipment, inputs, harvest and dispatch reporting in a season-aware operating layer.",
  "custom-business":
    "Best fit for non-standard businesses that need a practical mix of dashboards, approvals, portals, documents, automation and staff workflow.",
  "accounting-os":
    "Best fit for accounting practices and compliance-heavy service teams managing recurring work, document requests, reviews and deadlines.",
  "marine-business":
    "Best fit for marine businesses that need sales, service bookings, parts and after-sales pressure connected in one operating view.",
};

type DemoConversionConfig = {
  headline: string;
  bullets: string[];
  primaryCta: string;
  secondaryCta: string;
  industrySlug?: string;
  proof: string[];
  frames: string[];
  guidedTasks: { label: string; targetSection: string; search: string }[];
  closeTitle: string;
  closeSubtitle: string;
  problemLabel: string;
  problemPlaceholder: string;
  nextSteps: string[];
  modulePicker?: string[];
  secondaryHref?: string;
  secondaryEvent?: string;
};

const demoConversion: Record<string, DemoConversionConfig> = {
  logistics: {
    headline: "Track Dispatch, Fleet Status, POD, and Delivery Profit From One Logistics Command Centre",
    bullets: [
      "Assign jobs and see delayed deliveries in one board",
      "Track vehicles, drivers, POD records, and customer updates",
      "Give owners a live exceptions dashboard instead of delayed reporting",
    ],
    primaryCta: "Show Me My Logistics Command Centre",
    secondaryCta: "WhatsApp Eddy",
    industrySlug: "logistics",
    proof: [
      "Jobs, fleet, POD, and reporting in one system",
      "Built for South African logistics operations",
      "Owner, dispatcher, and driver views",
      "Supports phased rollout",
    ],
    frames: ["Dispatch board", "Fleet status", "POD capture", "Owner exceptions"],
    guidedTasks: [
      { label: "Assign a job", targetSection: "Dispatch", search: "assigned" },
      { label: "Capture POD", targetSection: "POD", search: "pending" },
      { label: "Surface delayed deliveries", targetSection: "Deliveries", search: "delayed" },
    ],
    closeTitle: "Map the logistics command centre your team should see first",
    closeSubtitle: "Send the messy part of your dispatch, POD, driver, or reporting flow and Eddy will reply with practical system ideas.",
    problemLabel: "Biggest logistics bottleneck",
    problemPlaceholder: "Delayed routes, missing POD, driver updates, fleet visibility...",
    nextSteps: [
      "You send the delivery, fleet, or POD bottleneck.",
      "We map the first command board and driver workflow.",
      "You get practical next steps before committing to a full build.",
    ],
  },
  warehouse: {
    headline: "See Receiving, Dispatch, Reorder Risk, and Stock Exceptions in One Warehouse Dashboard",
    bullets: [
      "Trust stock movement and receiving again",
      "Surface dispatch pressure and low-stock risk early",
      "Give owners and warehouse managers one live control layer",
    ],
    primaryCta: "Show Me My Warehouse Control System",
    secondaryCta: "Need Fleet and POD Too? Ask for the Logistics Version",
    industrySlug: "warehouses",
    proof: [
      "Receiving, dispatch, reorder, and supplier pressure in one view",
      "Built for warehouse teams using paper, spreadsheets, or disconnected tools",
      "Owner and warehouse manager views",
      "Clean bridge into fleet and POD workflows",
    ],
    frames: ["Receiving queue", "Dispatch pressure", "Low-stock risk", "Supplier follow-up"],
    guidedTasks: [
      { label: "Review receiving queue", targetSection: "Inventory", search: "receiving" },
      { label: "Surface a dispatch exception", targetSection: "Dispatch", search: "dispatch" },
      { label: "Trigger a reorder", targetSection: "Inventory", search: "low" },
    ],
    closeTitle: "Map your warehouse control system before adding logistics layers",
    closeSubtitle: "Start with stock movement, receiving, dispatch, and reorder risk. If fleet and POD matter too, we can extend the same control layer.",
    problemLabel: "Biggest warehouse bottleneck",
    problemPlaceholder: "Receiving delays, dispatch pressure, stock accuracy, reorder risk...",
    nextSteps: [
      "You send the warehouse bottleneck.",
      "We map the first receiving, dispatch, or reorder dashboard.",
      "If needed, we show how it connects into the Logistics Command Centre.",
    ],
    secondaryHref: "/demos/logistics",
    secondaryEvent: "warehouse_to_logistics_click",
  },
  construction: {
    headline: "Track Site Tasks, Materials, and Delay Risk Without Waiting for End-of-Day Updates",
    bullets: [
      "See milestone, procurement, and weather risk early",
      "Keep site managers, owners, and clients aligned",
      "Replace scattered updates with one live project control layer",
    ],
    primaryCta: "Map My Construction Control Layer",
    secondaryCta: "WhatsApp Eddy",
    industrySlug: "construction",
    proof: ["Milestone risk visible early", "Materials and procurement pressure surfaced", "Owner, site manager, and client views", "Reporting built around live project status"],
    frames: ["Milestone board", "Material risk", "Weather delay", "Client report"],
    guidedTasks: [
      { label: "Show material risk", targetSection: "Materials", search: "risk" },
      { label: "Show delayed milestone", targetSection: "Projects", search: "delayed" },
      { label: "Show client report preview", targetSection: "Reports", search: "report" },
    ],
    closeTitle: "Map the control layer your project team needs first",
    closeSubtitle: "Send the site, procurement, or reporting pressure that slows you down and Eddy will suggest a practical starting system.",
    problemLabel: "Biggest construction bottleneck",
    problemPlaceholder: "Material delays, site updates, milestone risk, client reporting...",
    nextSteps: ["You send the project pressure point.", "We map the first live control board.", "You get a phased rollout idea before a full build."],
  },
  agency: {
    headline: "Keep Campaign Delivery, Approvals, and Client Reporting Under One Ops Layer",
    bullets: [
      "Stop approvals and content status from getting lost in chat",
      "See who is blocked, what is due, and which reports are still open",
      "Give owners and account managers cleaner visibility",
    ],
    primaryCta: "Map My Agency Delivery System",
    secondaryCta: "WhatsApp Eddy",
    industrySlug: "agencies",
    proof: ["Approvals, delivery, and reports in one workflow", "Built for owner and account-manager visibility", "Clear status for blocked work", "Useful before clients start chasing"],
    frames: ["Client approvals", "Campaign delivery", "Monthly reports", "Owner queue"],
    guidedTasks: [
      { label: "Show client approval flow", targetSection: "Content", search: "approval" },
      { label: "Show monthly report view", targetSection: "Reports", search: "report" },
      { label: "Show campaign delivery status", targetSection: "Clients", search: "campaign" },
    ],
    closeTitle: "Map your agency delivery system around the work that gets stuck",
    closeSubtitle: "Send the approvals, reporting, or delivery bottleneck and Eddy will map a focused ops layer.",
    problemLabel: "Biggest agency delivery bottleneck",
    problemPlaceholder: "Approvals, reporting, campaign delivery, account-manager visibility...",
    nextSteps: ["You send the delivery bottleneck.", "We map the approval and reporting flow.", "You get the first demo direction before a full build."],
  },
  security: {
    headline: "See Missed Check-Ins, Patrols, Incidents, and Rosters Before Clients Do",
    bullets: [
      "Escalate missed activity early",
      "Track patrols and incidents across sites",
      "Give management one live exception view",
    ],
    primaryCta: "Map My Security Operations System",
    secondaryCta: "WhatsApp Eddy",
    industrySlug: "security",
    proof: ["Incidents, patrols, rosters, and reports in one view", "Built for security owners and ops managers", "Exception visibility before clients chase", "Supports phased site rollout"],
    frames: ["Missed check-ins", "Incident queue", "Roster gaps", "Client reporting"],
    guidedTasks: [
      { label: "Show missed check-ins", targetSection: "Patrols", search: "missed" },
      { label: "Show open incident", targetSection: "Incidents", search: "open" },
      { label: "Show roster/site reporting", targetSection: "Reporting", search: "report" },
    ],
    closeTitle: "Map the security operations view your managers need first",
    closeSubtitle: "Send the missed check-in, incident, patrol, or roster problem and Eddy will suggest a practical control layer.",
    problemLabel: "Biggest security operations bottleneck",
    problemPlaceholder: "Missed check-ins, incidents, patrol reporting, roster gaps...",
    nextSteps: ["You send the risk area.", "We map the first exception dashboard.", "You get a rollout path for sites and teams."],
  },
  farm: {
    headline: "Run Field Tasks, Inputs, Equipment, and Harvest Dispatch From One Farm Ops Layer",
    bullets: [
      "Surface blocked field work and low inputs early",
      "Track equipment and labour visibility from one dashboard",
      "Give owners clearer harvest and dispatch reporting",
    ],
    primaryCta: "Map My Farm Operations System",
    secondaryCta: "WhatsApp Eddy",
    industrySlug: "farms",
    proof: ["Field tasks, inputs, equipment, and dispatch in one system", "Season-aware owner visibility", "Farm manager and worker views", "Phased rollout around the season"],
    frames: ["Field tasks", "Low inputs", "Equipment maintenance", "Harvest dispatch"],
    guidedTasks: [
      { label: "Show low-input alert", targetSection: "Inputs", search: "low" },
      { label: "Show equipment maintenance", targetSection: "Equipment", search: "maintenance" },
      { label: "Show harvest/dispatch view", targetSection: "Harvest", search: "harvest" },
    ],
    closeTitle: "Map the farm ops layer that fits your season",
    closeSubtitle: "Send the field, input, equipment, or dispatch pressure and Eddy will map the practical first system.",
    problemLabel: "Biggest farm operations bottleneck",
    problemPlaceholder: "Low inputs, equipment maintenance, labour visibility, harvest dispatch...",
    nextSteps: ["You send the seasonal pressure point.", "We map the first operations view.", "You get a practical rollout idea for your team."],
  },
  "custom-business": {
    headline: "Choose the Modules Your Business Actually Needs and See How They Work Together",
    bullets: [
      "Start with approvals, dashboards, client portals, documents, automation, or recurring workflows",
      "See how a custom Pine X system can be structured around your business",
    ],
    primaryCta: "Request My Custom Workflow Demo",
    secondaryCta: "Tell Eddy What Feels Messy",
    industrySlug: "custom-business",
    proof: ["Built around your workflow", "Choose only the modules you need", "Owner, staff, and client views", "Designed for phased rollout"],
    frames: ["Approvals", "Client portal", "Documents", "Owner dashboard"],
    guidedTasks: [
      { label: "Show approval flow", targetSection: "Approvals", search: "approval" },
      { label: "Show owner dashboard", targetSection: "Overview", search: "" },
      { label: "Show client portal", targetSection: "Client Portal", search: "client" },
    ],
    closeTitle: "Tell Eddy what feels messy and get a focused workflow demo direction",
    closeSubtitle: "Choose modules first, then map how they should connect for your team.",
    problemLabel: "Biggest workflow bottleneck",
    problemPlaceholder: "Approvals, documents, client portal, reporting, automation...",
    nextSteps: ["You choose the modules that matter.", "We map how the workflows connect.", "You get a custom demo direction before a full build."],
    modulePicker: ["Approvals", "Client portal", "Documents", "Owner dashboard", "Automation", "Staff workflow"],
  },
  "accounting-os": {
    headline: "Control Recurring Client Work, Document Chasing, Reviews, and Deadlines in One Practice OS",
    bullets: ["Track onboarding, document requests, review flow, and reporting", "Surface overdue work and deadline risk early", "Give partners one owner dashboard instead of scattered reminders"],
    primaryCta: "Map My Practice Operating System",
    secondaryCta: "WhatsApp Eddy",
    industrySlug: "accounting",
    proof: ["Recurring work and deadlines in one view", "Built for partners, managers, and staff", "Document chasing and reviews connected", "Useful for compliance-heavy service teams"],
    frames: ["Problem summary", "System modules", "Review queue", "Deadline dashboard"],
    guidedTasks: [
      { label: "Show document chasing", targetSection: "Documents", search: "document" },
      { label: "Show review flow", targetSection: "Reviews", search: "review" },
      { label: "Show deadline risk", targetSection: "Deadlines", search: "risk" },
    ],
    closeTitle: "Map the practice OS your client work needs first",
    closeSubtitle: "Send the recurring work, document, review, or deadline bottleneck and Eddy will map a practical operating flow.",
    problemLabel: "Biggest practice workflow bottleneck",
    problemPlaceholder: "Document chasing, reviews, deadlines, onboarding...",
    nextSteps: ["You send the practice bottleneck.", "We map the first operating workflow.", "You get practical next steps before a full build."],
  },
  "marine-business": {
    headline: "Unify Sales, Service Bookings, Parts, and After-Sales Visibility in One Marine System",
    bullets: ["Track enquiries, unit availability, service bookings, and parts requests", "Give sales and service one shared owner view", "Stop after-sales pressure from living in disconnected tools"],
    primaryCta: "Show Me My Marine Business System",
    secondaryCta: "WhatsApp Eddy",
    industrySlug: "marine",
    proof: ["Sales, service, parts, and after-sales in one view", "Built for hybrid marine operations", "Owner, sales, and service views", "Supports phased rollout"],
    frames: ["Sales enquiries", "Service bookings", "Parts requests", "Owner dashboard"],
    guidedTasks: [
      { label: "Show sales workflow", targetSection: "Sales", search: "enquiry" },
      { label: "Show service booking", targetSection: "Service", search: "booking" },
      { label: "Show parts pressure", targetSection: "Parts", search: "supplier" },
    ],
    closeTitle: "Map the marine system that connects sales and service",
    closeSubtitle: "Send the sales, service, parts, or after-sales bottleneck and Eddy will suggest the first operating layer.",
    problemLabel: "Biggest marine workflow bottleneck",
    problemPlaceholder: "Sales enquiries, unit availability, service bookings, parts requests...",
    nextSteps: ["You send the marine workflow issue.", "We map the shared sales and service view.", "You get a practical rollout path."],
  },
};

function formatMoney(value: number) {
  return moneyFormatter.format(Math.max(0, Math.round(value))).replace(/\u00a0/g, " ");
}
function parseMoney(value: string) {
  const normalized = value.toLowerCase().replace(/[^0-9mk.]/g, "");
  if (!normalized) return 0;
  if (normalized.includes("m")) return Number.parseFloat(normalized.replace("m", "")) * 1_000_000;
  if (normalized.includes("k")) return Number.parseFloat(normalized.replace("k", "")) * 1_000;
  return Number.parseFloat(normalized.replace(/,/g, "")) || 0;
}
function isBlocked(record: DemoRecord) {
  return /overdue|blocked|waiting|pending|hold|maintenance|incident|low stock|docs outstanding|delayed|risk|approval/i.test(`${record.status} ${record.detail} ${record.owner}`);
}
function isActive(record: DemoRecord) {
  return /assigned|in progress|booked|contacted|submitted|active|diagnos|receiv|review|task/i.test(`${record.status} ${record.detail} ${record.owner}`);
}
function isComplete(record: DemoRecord) {
  return /ready|approved|resolved|complete|delivered|sold|published/i.test(`${record.status} ${record.detail} ${record.owner}`);
}
function nextStatus(record: DemoRecord, roleKind: RoleKind) {
  const status = record.status.toLowerCase();
  if (status.includes("new")) return roleKind === "staff" ? "Assigned" : "Contacted";
  if (status.includes("contact")) return "Booked";
  if (status.includes("book")) return "In Progress";
  if (status.includes("assign")) return "In Progress";
  if (status.includes("in progress")) return "Quality Check";
  if (status.includes("diagnos")) return "Waiting Parts";
  if (status.includes("waiting parts")) return "In Progress";
  if (status.includes("docs outstanding")) return "Submitted";
  if (status.includes("submitted")) return "Approved";
  if (status.includes("approved")) return "Ready";
  if (status.includes("open")) return "Resolved";
  if (status.includes("low stock")) return "Reordered";
  if (status.includes("receiv")) return "In Stock";
  if (status.includes("pending")) return "Confirmed";
  if (status.includes("delayed")) return "Active";
  return roleKind === "staff" ? "Complete" : "Ready";
}
function filtered(records: DemoRecord[], roleKind: RoleKind, search: string) {
  const base = roleKind === "owner" ? records : roleKind === "manager" ? records.filter((r) => isBlocked(r) || isActive(r) || r.priority === "High") : records.filter((r) => isBlocked(r) || isActive(r) || r.priority === "High");
  const q = search.trim().toLowerCase();
  const matched = base.filter((r) => !q || [r.id, r.name, r.category, r.status, r.owner, r.detail, r.value].join(" ").toLowerCase().includes(q));
  return (matched.length ? matched : base).sort((a, b) => {
    const p = (v?: string) => (v === "High" ? 3 : v === "Medium" ? 2 : v === "Low" ? 1 : 0);
    const byP = p(b.priority) - p(a.priority);
    if (byP) return byP;
    const byV = parseMoney(b.value) - parseMoney(a.value);
    if (byV) return byV;
    return a.id.localeCompare(b.id);
  });
}

function makeMetrics(records: DemoRecord[], section: DemoSection, roleKind: RoleKind, nouns: Nouns) {
  const totalValue = records.reduce((sum, record) => sum + parseMoney(record.value), 0);
  const blocked = records.filter(isBlocked).length;
  const complete = records.filter(isComplete).length;
  const dueToday = records.filter((record) => /today|tomorrow|mon|tue|wed|thu|fri|sat|sun/i.test(`${record.value} ${record.detail}`)).length;
  if (roleKind === "owner") {
    return [
      { label: `Active ${nouns.plural}`, value: `${records.length}`, detail: `${section.label} items visible now`, accent: "#67E8F9", filter: section.label },
      { label: `Blocked ${nouns.singular}s`, value: `${blocked}`, detail: "Items needing intervention", accent: "#F5D36C", filter: "blocked" },
      { label: `High priority`, value: `${records.filter((record) => record.priority === "High").length}`, detail: "Escalation candidates", accent: "#60A5FA", filter: "high" },
      { label: `Value in play`, value: formatMoney(totalValue), detail: "Current queue value", accent: "#67E8F9", filter: "value" },
    ];
  }
  if (roleKind === "manager") {
    return [
      { label: nouns.queue, value: `${records.length}`, detail: `${section.label} items in the queue`, accent: "#67E8F9", filter: section.label },
      { label: "Due today", value: `${dueToday}`, detail: "Items with same-day pressure", accent: "#F5D36C", filter: "due" },
      { label: "Blocked", value: `${blocked}`, detail: "Items waiting on something", accent: "#60A5FA", filter: "blocked" },
      { label: "Ready to move", value: `${complete}`, detail: "Items that can advance now", accent: "#67E8F9", filter: "ready" },
    ];
  }
  return [
    { label: `Assigned ${nouns.plural}`, value: `${records.length}`, detail: `Execution view for ${section.label}`, accent: "#67E8F9", filter: section.label },
    { label: "Due today", value: `${dueToday}`, detail: "Tasks due in the current shift", accent: "#F5D36C", filter: "due" },
    { label: `Waiting on ${nouns.detail}`, value: `${blocked}`, detail: "Items blocked on a dependency", accent: "#60A5FA", filter: "blocked" },
    { label: "Completed", value: `${complete}`, detail: "Work already handed over", accent: "#67E8F9", filter: "complete" },
  ];
}

function summaryText(system: DemoSystem, roleKind: RoleKind, nouns: Nouns) {
  if (roleKind === "owner") return demoOwnerSummaries[system.slug] ?? `Owner control view for ${system.shortTitle}: keep active work, risk, follow-up and reporting visible.`;
  if (roleKind === "manager") return `Operational queue view for ${system.shortTitle}: keep the ${nouns.queue} flowing and blockers moving.`;
  return `Execution view for ${system.shortTitle}: show assigned work, the next step, and what is blocked.`;
}

function actionLabels(roleKind: RoleKind, nouns: Nouns) {
  if (roleKind === "owner") return [`Generate summary`, `Review ${nouns.detail}`, `Add sample record`] as const;
  if (roleKind === "manager") return [`Move next ${nouns.singular}`, `View ${nouns.queue}`, `Add sample record`] as const;
  return [`Complete ${nouns.singular}`, `Request help`, `Add sample record`] as const;
}

export function DemoShell({ system }: { system: DemoSystem }) {
  const isWorkshopDemo = system.slug === "workshop";
  const conversion = demoConversion[system.slug];
  const canvasRef = useRef<HTMLElement | null>(null);
  const [sections, setSections] = useState<DemoSection[]>(() => getDemoSections(system.slug));
  const [activeRole, setActiveRole] = useState(system.roles[0]);
  const [activeSectionId, setActiveSectionId] = useState<string>(getDemoSections(system.slug)[0]?.id ?? "overview");
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [feed, setFeed] = useState<string[]>([
    `Loaded ${system.shortTitle} interactive concept preview.`,
    "Example owner and team views are ready.",
  ]);
  const [notice, setNotice] = useState<string | null>(null);
  const [accessMode, setAccessMode] = useState<"full" | "limited">("full");
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  useEffect(() => {
    trackCustomEvent("demo_view", {
      demo_slug: system.slug,
      industry_slug: conversion?.industrySlug,
      lead_intent: "demo_page",
    });
  }, [conversion?.industrySlug, system.slug]);

  const roleKind = roleKindFromLabel(activeRole);
  const nouns = nounsBySystem[system.slug] ?? nounsBySystem.dealership;
  const activeSection = sections.find((section) => section.id === activeSectionId) ?? sections[0];
  const orderedSections = useMemo(() => {
    const defaultLabel = roleKind === "owner" ? nouns.ownerSection : roleKind === "manager" ? nouns.managerSection : nouns.staffSection;
    return [...sections].sort((a, b) => {
      if (a.label === defaultLabel) return -1;
      if (b.label === defaultLabel) return 1;
      if (a.label === "Overview") return -1;
      if (b.label === "Overview") return 1;
      if (a.label === "Activity") return 1;
      if (b.label === "Activity") return -1;
      return a.label.localeCompare(b.label);
    });
  }, [nouns.managerSection, nouns.ownerSection, nouns.staffSection, roleKind, sections]);
  const section = orderedSections.find((item) => item.id === activeSection?.id) ?? orderedSections[0];
  const records = useMemo(() => filtered(section?.records ?? system.records, roleKind, search), [roleKind, search, section?.records, system.records]);
  const selectedRecord = useMemo(
    () => (selectedRecordId ? records.find((record) => record.id === selectedRecordId) ?? null : records[0] ?? null),
    [records, selectedRecordId],
  );
  const metrics = useMemo(() => makeMetrics(records, section ?? orderedSections[0], roleKind, nouns), [nouns, orderedSections, records, roleKind, section]);
  const actions = actionLabels(roleKind, nouns);
  const roleSummary = summaryText(system, roleKind, nouns);
  const controlItems = demoControlItems[system.slug] ?? system.modules.slice(0, 5).map((module) => `${module} visibility and workflow control`);
  const bestFit = demoBestFit[system.slug] ?? `Best fit for ${system.shortTitle.toLowerCase()} teams still using paper, spreadsheets, WhatsApp updates, and disconnected tools.`;

  const activity = useMemo(
    () => [notice ?? `${activeRole} view opened.`, ...(section?.activity ?? []), ...feed].slice(0, 8),
    [activeRole, feed, notice, section?.activity],
  );

  const updateFeed = (entry: string) => setFeed((current) => [entry, ...current].slice(0, 10));
  const updateSectionRecords = (mutator: (items: DemoRecord[]) => DemoRecord[]) => {
    setSections((current) => current.map((item) => (item.id === section?.id ? { ...item, records: mutator(item.records ?? []) } : item)));
  };

  const handleAdvance = () => {
    const target = selectedRecord ?? records[0];
    if (!target || !section) return;
    const status = nextStatus(target, roleKind);
    updateSectionRecords((items) =>
      items.map((record) => (record.id === target.id ? { ...record, status, detail: `${record.detail} - moved to ${status.toLowerCase()}` } : record)),
    );
    setSelectedRecordId(target.id);
    setNotice(`${target.name} moved to ${status}.`);
    updateFeed(`${target.id} advanced from ${target.status} to ${status}.`);
  };
  const handleAddRecord = () => {
    const template = (section?.records ?? system.records)[0];
    if (!template || !section) return;
    const nextId = `${section.id.slice(0, 2).toUpperCase()}-${100 + (section.records?.length ?? 0)}`;
    const newRecord: DemoRecord = {
      ...template,
      id: nextId,
      name: `New ${section.label} item`,
      status: roleKind === "owner" ? "Pending review" : roleKind === "manager" ? "Assigned" : "In Progress",
      owner: roleKind === "staff" ? "You" : "Unassigned",
      detail: `Demo record added for the ${activeRole.toLowerCase()} view.`,
      priority: "Medium",
      created: "Just now",
    };
    updateSectionRecords((items) => [newRecord, ...items]);
    setSelectedRecordId(newRecord.id);
    setNotice(`Added ${newRecord.name} to ${section.label}.`);
    updateFeed(`${newRecord.id} added to ${section.label}.`);
  };
  const handleSummary = () => {
    const blocked = records.filter(isBlocked).length;
    const complete = records.filter(isComplete).length;
    setNotice(`${system.shortTitle}: ${records.length} visible, ${blocked} blocked, ${complete} ready or complete.`);
    updateFeed(`Summary generated for the ${activeRole} view.`);
  };
  const handleToggleAccess = () => {
    setAccessMode((current) => (current === "full" ? "limited" : "full"));
    setNotice((current) => (current?.includes("Limited") ? "Full detail visibility restored." : "Limited team visibility enabled."));
    updateFeed("Access mode toggled for the current record.");
  };
  const handleMetricClick = (filter: string | null) => {
    if (!filter) return;
    setActiveMetric(filter);
    const targetSection = orderedSections.find((item) => item.label === filter);
    if (targetSection) {
      setActiveSectionId(targetSection.id);
      setNotice(`Switched to ${targetSection.label}.`);
      updateFeed(`Viewed ${targetSection.label} in the ${activeRole} mode.`);
      return;
    }
    setNotice(`${filter} metric opened.`);
    updateFeed(`${filter} metric opened in the ${activeRole} view.`);
  };
  const handleRoleChange = (role: string) => {
    const kind = roleKindFromLabel(role);
    const defaultLabel = kind === "owner" ? nouns.ownerSection : kind === "manager" ? nouns.managerSection : nouns.staffSection;
    const nextSection = orderedSections.find((item) => item.label === defaultLabel) ?? orderedSections[0];
    setActiveRole(role);
    setActiveSectionId(nextSection?.id ?? orderedSections[0]?.id ?? "overview");
    setSelectedRecordId(null);
    setSearch("");
    setAccessMode(kind === "staff" ? "limited" : "full");
    setActiveMetric(null);
    setNotice(`${role} activated. ${summaryText(system, kind, nouns)}`);
    updateFeed(`${role} activated for ${system.shortTitle}.`);
    trackCustomEvent("demo_role_switch", {
      demo_slug: system.slug,
      industry_slug: conversion?.industrySlug,
      role,
    });
  };
  const handleSectionChange = (label: string) => {
    const next = orderedSections.find((item) => item.label === label);
    if (!next) return;
    setActiveSectionId(next.id);
    setSelectedRecordId(null);
    setNotice(`Switched to ${next.label}.`);
    updateFeed(`Viewed ${next.label} in the ${activeRole} mode.`);
    trackCustomEvent("demo_tab_click", {
      demo_slug: system.slug,
      industry_slug: conversion?.industrySlug,
      tab: label,
    });
  };

  const handleGuidedTask = (task: NonNullable<DemoConversionConfig["guidedTasks"]>[number]) => {
    const next = orderedSections.find((item) => item.label === task.targetSection);
    trackCustomEvent("demo_guided_task_start", {
      demo_slug: system.slug,
      industry_slug: conversion?.industrySlug,
      task: task.label,
    });
    if (next) {
      setActiveSectionId(next.id);
    }
    setSearch(task.search);
    setSelectedRecordId(null);
    setNotice(`${task.label} opened in the ${system.shortTitle} demo.`);
    updateFeed(`${task.label} guided task opened.`);
    window.setTimeout(() => {
      canvasRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      canvasRef.current?.focus({ preventScroll: true });
      trackCustomEvent("demo_guided_task_complete", {
        demo_slug: system.slug,
        industry_slug: conversion?.industrySlug,
        task: task.label,
      });
    }, 80);
  };

  const handleWorkshopGuidedTask = (task: (typeof workshopGuidedTasks)[number]) => {
    const next = orderedSections.find((item) => item.label === task.targetSection);
    trackCustomEvent("demo_guided_task_start", {
      demo_slug: "workshop",
      task: task.label,
    });
    if (next) {
      setActiveSectionId(next.id);
    }
    setSearch(task.search);
    setSelectedRecordId(null);
    setNotice(`${task.label} opened in the workshop demo.`);
    updateFeed(`${task.label} guided task opened.`);
    window.setTimeout(() => {
      canvasRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      canvasRef.current?.focus({ preventScroll: true });
      trackCustomEvent("demo_guided_task_complete", {
        demo_slug: "workshop",
        task: task.label,
      });
    }, 80);
  };

  const Icon = demoIconMap[system.icon];
  const contactHref = `/contact?demo_slug=${system.slug}${conversion?.industrySlug ? `&industry_slug=${conversion.industrySlug}` : ""}&lead_intent=demo_page#lead-form`;
  const workshopWhatsAppHref = `${whatsappCta.href}?text=${encodeURIComponent(
    "Hi Eddy, I saw the Workshop Control System demo and want to talk about my workshop flow.",
  )}`;
  const whatsAppHref = isWorkshopDemo
    ? workshopWhatsAppHref
    : `${whatsappCta.href}?text=${encodeURIComponent(
        `Hi Eddy, I saw the ${system.title} demo and want to talk about my workflow.`,
      )}`;
  const viewSystem = useMemo(
    () => ({
      ...system,
      modules:
        roleKind === "owner"
          ? [`${nouns.queue}`, `${nouns.detail}`, "Reports", "Risk"]
          : roleKind === "manager"
            ? [`${nouns.queue}`, "Assignments", nouns.detail, "Approvals"]
            : [`Assigned ${nouns.plural}`, "Checklist", nouns.detail, "Handover"],
      metrics,
      primaryAction: actions[0],
      secondaryAction: actions[1],
    }),
    [actions, metrics, nouns.detail, nouns.plural, nouns.queue, roleKind, system],
  );

  return (
    <div className="bg-[linear-gradient(180deg,#050505_0%,#0B0C10_44%,#111820_100%)] text-[#f7f7f2]">
      <div className="section-shell py-8 sm:py-10 lg:py-12">
        {isWorkshopDemo ? (
          <>
            <section className="grid gap-6 rounded-[8px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.025))] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] lg:grid-cols-[1.02fr_0.98fr] lg:p-7">
              <div>
                <Link href="/demos" className="inline-flex items-center gap-2 text-sm font-semibold text-[#d8d8d2] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67E8F9]">
                  <ArrowLeft className="h-4 w-4" /> Back to demos
                </Link>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#67E8F9]">
                  Interactive concept preview for workshops
                </p>
                <h1 className="mt-3 font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                  Digital Job Cards, Live Workshop Board, and Parts Control for Busy South African Service Centres
                </h1>
                <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#f7f7f2] sm:text-base">
                  {workshopHeroBullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#67E8F9]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <TrackedDemoLink
                    href={contactHref}
                    location="workshop_demo_hero_audit"
                    system="workshop"
                    className="cta-button"
                    data-event="free_audit_click"
                    data-demo-slug="workshop"
                    data-industry-slug="workshops"
                    data-lead-intent="demo_page"
                  >
                    Get My Free System Audit
                  </TrackedDemoLink>
                  <TrackedWhatsAppLink
                    href={workshopWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    location="workshop_demo_hero_whatsapp"
                    className="cta-secondary"
                    data-event="whatsapp_click"
                    data-demo-slug="workshop"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Eddy
                  </TrackedWhatsAppLink>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  ["Live workshop board", "38 open jobs with blocked work visible"],
                  ["Parts control", "7 jobs waiting on parts surfaced early"],
                  ["Invoice-ready queue", "9 jobs ready for admin follow-up"],
                ].map(([title, detail]) => (
                  <div key={title} className="rounded-[8px] border border-white/10 bg-black/25 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#67E8F9]">
                      {title}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-white">{detail.split(" ")[0]}</p>
                    <p className="mt-2 text-sm leading-6 text-[#d8d8d2]">
                      {detail.split(" ").slice(1).join(" ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-label="Workshop system proof points" className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {workshopProofCards.map((item) => (
                <div key={item} className="rounded-[8px] border border-white/10 bg-white/[0.045] p-4 text-sm leading-6 text-[#f7f7f2]">
                  {item}
                </div>
              ))}
            </section>
          </>
        ) : null}

        {conversion && !isWorkshopDemo ? (
          <>
            <section className="grid gap-6 rounded-[8px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.025))] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] lg:grid-cols-[1.02fr_0.98fr] lg:p-7">
              <div>
                <Link href="/demos" className="inline-flex items-center gap-2 text-sm font-semibold text-[#d8d8d2] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67E8F9]">
                  <ArrowLeft className="h-4 w-4" /> Back to demos
                </Link>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-[#67E8F9]">
                  Interactive concept preview
                </p>
                <h1 className="mt-3 font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                  {conversion.headline}
                </h1>
                <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#f7f7f2] sm:text-base">
                  {conversion.bullets.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#67E8F9]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <TrackedDemoLink
                    href={contactHref}
                    location={`${system.slug}_demo_hero_cta`}
                    system={system.slug}
                    className="cta-button"
                    data-event="free_audit_click"
                    data-demo-slug={system.slug}
                    data-industry-slug={conversion.industrySlug}
                    data-lead-intent="demo_page"
                    onClick={() =>
                      trackCustomEvent("demo_cta_click", {
                        demo_slug: system.slug,
                        industry_slug: conversion.industrySlug,
                        cta_type: "primary",
                      })
                    }
                  >
                    Get My Free System Audit
                  </TrackedDemoLink>
                  {conversion.secondaryHref ? (
                    <Link
                      href={conversion.secondaryHref}
                      className="cta-secondary"
                      data-event={conversion.secondaryEvent}
                      data-demo-slug={system.slug}
                      onClick={() =>
                        trackCustomEvent(conversion.secondaryEvent ?? "demo_cta_click", {
                          demo_slug: system.slug,
                          industry_slug: conversion.industrySlug,
                          cta_type: "secondary",
                        })
                      }
                    >
                      View Live Demo Systems
                    </Link>
                  ) : (
                    <TrackedWhatsAppLink
                      href={whatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      location={`${system.slug}_demo_hero_whatsapp`}
                      className="cta-secondary"
                      data-event="whatsapp_click"
                      data-demo-slug={system.slug}
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp Eddy
                    </TrackedWhatsAppLink>
                  )}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {conversion.frames.map((frame, index) => (
                  <div key={frame} className="rounded-[8px] border border-white/10 bg-black/25 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#67E8F9]">
                      {frame}
                    </p>
                    <p className="mt-3 text-2xl font-semibold text-white">
                      {system.metrics[index]?.value ?? "Live"}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#d8d8d2]">
                      {system.metrics[index]?.detail ?? "Placeholder frame for a real system screenshot."}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-label={`${system.shortTitle} proof points`} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {conversion.proof.map((item) => (
                <div key={item} className="rounded-[8px] border border-white/10 bg-white/[0.045] p-4 text-sm leading-6 text-[#f7f7f2]">
                  {item}
                </div>
              ))}
            </section>
          </>
        ) : null}

        <section
          className="my-6 grid gap-4 rounded-[8px] border border-white/10 bg-white/[0.04] p-5 lg:grid-cols-[1.2fr_0.8fr]"
          aria-labelledby={`${system.slug}-control-section`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#67E8F9]">
              What this system helps you control
            </p>
            <h2 id={`${system.slug}-control-section`} className="mt-2 font-heading text-2xl font-semibold text-white">
              The operational pressure points this demo is built around
            </h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {controlItems.slice(0, 5).map((item) => (
                <div key={item} className="flex gap-3 rounded-[8px] border border-white/10 bg-black/20 p-3 text-sm leading-6 text-[#f7f7f2]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#67E8F9]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[8px] border border-[#67E8F9]/20 bg-[#67E8F9]/10 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#67E8F9]">
              Best fit for
            </p>
            <p className="mt-3 text-sm leading-7 text-[#f7f7f2]">{bestFit}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <TrackedDemoLink
                href={contactHref}
                location={`${system.slug}_best_fit_audit`}
                system={system.slug}
                className="cta-button"
                data-event="free_audit_click"
                data-demo-slug={system.slug}
                data-industry-slug={conversion?.industrySlug}
                data-lead-intent="demo_page"
              >
                Get My Free System Audit
              </TrackedDemoLink>
              <Link
                href="/demos"
                className="cta-secondary"
                data-event="demo_open"
                data-demo-slug={system.slug}
              >
                Back to all demos
              </Link>
            </div>
          </div>
        </section>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link href="/demos" className={`inline-flex items-center gap-2 text-sm font-semibold text-[#d8d8d2] hover:text-white ${isWorkshopDemo || conversion ? "sr-only" : ""}`}>
            <ArrowLeft className="h-4 w-4" /> Back to demos
          </Link>
          <div className="flex flex-wrap gap-2">
            <TrackedWhatsAppLink
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              location={`demo_shell_${system.slug}`}
              className="cta-secondary"
              data-event="whatsapp_click"
              data-demo-slug={system.slug}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Eddy
            </TrackedWhatsAppLink>
            <TrackedDemoLink
              href={contactHref}
              location="demo_shell_request_system"
              system={system.slug}
              className="cta-button"
              data-event="free_audit_click"
              data-demo-slug={system.slug}
              data-industry-slug={conversion?.industrySlug}
              data-lead-intent="demo_page"
            >
              Get My Free System Audit
            </TrackedDemoLink>
          </div>
        </div>

        {isWorkshopDemo ? (
          <section className="mb-5 mt-6 rounded-[8px] border border-white/10 bg-white/[0.04] p-5" aria-labelledby="guided-workshop-tasks">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#67E8F9]">
                  Guided demo tasks
                </p>
                <h2 id="guided-workshop-tasks" className="mt-2 font-heading text-2xl font-semibold text-white">
                  Start with the pressure point your workshop feels most
                </h2>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {workshopGuidedTasks.map((task) => {
                const TaskIcon = task.icon;

                return (
                  <button
                    key={task.label}
                    type="button"
                    onClick={() => handleWorkshopGuidedTask(task)}
                    className="rounded-[8px] border border-white/10 bg-black/20 p-4 text-left text-sm font-semibold text-white transition hover:border-[#67E8F9]/50 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67E8F9]"
                    data-event="demo_guided_task_start"
                    data-demo-slug="workshop"
                  >
                    <TaskIcon className="mb-3 h-5 w-5 text-[#67E8F9]" />
                    {task.label}
                  </button>
                );
              })}
            </div>
          </section>
        ) : null}

        {conversion && !isWorkshopDemo ? (
          <section className="mb-5 mt-6 rounded-[8px] border border-white/10 bg-white/[0.04] p-5" aria-labelledby={`${system.slug}-guided-tasks`}>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#67E8F9]">
                  Guided demo tasks
                </p>
                <h2 id={`${system.slug}-guided-tasks`} className="mt-2 font-heading text-2xl font-semibold text-white">
                  Start with the workflow pressure point you want to inspect
                </h2>
              </div>
            </div>
            {conversion.modulePicker ? (
              <div className="mt-4 flex flex-wrap gap-2" aria-label="Custom workflow module picker">
                {conversion.modulePicker.map((module) => (
                  <button
                    key={module}
                    type="button"
                    onClick={() => {
                      setSearch(module);
                      setNotice(`${module} selected for the custom workflow preview.`);
                      trackCustomEvent("module_select", {
                        demo_slug: system.slug,
                        industry_slug: conversion.industrySlug,
                        task: module,
                      });
                    }}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs font-semibold text-[#f7f7f2] transition hover:border-[#67E8F9]/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67E8F9]"
                  >
                    {module}
                  </button>
                ))}
              </div>
            ) : null}
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {conversion.guidedTasks.map((task) => (
                <button
                  key={task.label}
                  type="button"
                  onClick={() => handleGuidedTask(task)}
                  className="rounded-[8px] border border-white/10 bg-black/20 p-4 text-left text-sm font-semibold text-white transition hover:border-[#67E8F9]/50 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67E8F9]"
                  data-event="demo_guided_task_start"
                  data-demo-slug={system.slug}
                >
                  {task.label}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <section
          ref={canvasRef}
          tabIndex={-1}
          aria-label={isWorkshopDemo ? "Interactive workshop control demo" : `${system.title} interactive demo`}
          className="overflow-hidden rounded-[12px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] shadow-[0_30px_90px_rgba(0,0,0,0.34)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#67E8F9]"
        >
          <div className="border-b border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),transparent)] p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="flex gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-white/15 bg-white shadow-lg">
                  <Icon className="h-6 w-6 text-[#0b0c10]" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-[6px] bg-[#071126] shadow">
                      <Image src="/icon.png" alt="" width={28} height={28} unoptimized className="h-full w-full" />
                    </span>
                    <p className="font-heading text-base font-semibold text-white">Pine X Systems</p>
                    <span className="rounded-full border border-[#67E8F9]/30 bg-[#67E8F9]/10 px-3 py-1 text-xs font-semibold text-[#67E8F9]">
                      Interactive concept preview
                    </span>
                  </div>
                  <h1 className="mt-3 font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    {system.title}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[#a8a8a2]">{roleSummary}</p>
                </div>
              </div>
              <DemoRoleSwitcher
                roles={system.roles}
                activeRole={activeRole}
                onRoleChange={handleRoleChange}
                demoSlug={isWorkshopDemo ? "workshop" : system.slug}
              />
            </div>
            {notice ? <div className="mt-4 rounded-[8px] border border-[#67E8F9]/20 bg-[#67E8F9]/10 px-4 py-3 text-sm text-[#d8f8ff]">{notice}</div> : null}
          </div>

          <div className="grid gap-0 lg:grid-cols-[13rem_minmax(0,1fr)] xl:grid-cols-[14rem_minmax(0,1fr)]">
            <DemoSidebar tabs={orderedSections.map((item) => item.label)} activeTab={section?.label ?? "Overview"} onTabChange={handleSectionChange} />

            <main className="min-w-0 p-4 sm:p-5">
              <div className="mb-4 rounded-[8px] border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#67E8F9]">
                      {section?.label ?? "Overview"} - {activeRole}
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-semibold text-white">{roleSummary}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-[#d8d8d2]">
                      {section?.subtitle ?? "Example owner and team views with visible workflow actions."}
                    </p>
                  </div>
                  <button type="button" onClick={handleSummary} className="cta-button">
                    <BarChart3 className="h-4 w-4" />
                    Generate summary
                  </button>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[nouns.queue, nouns.detail, activeRole, section?.label ?? "Overview"].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-[#d8d8d2]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <DemoDashboard
                system={viewSystem}
                records={section?.records ?? system.records}
                filteredRecords={records}
                activity={activity}
                activeMetric={activeMetric}
                accessMode={accessMode}
                roleSummary={roleSummary}
                selectedRecordId={selectedRecordId}
                selectedRecord={selectedRecord}
                search={search}
                onSearchChange={setSearch}
                onMetricClick={handleMetricClick}
                onSelectRecord={setSelectedRecordId}
                onPrimaryAction={handleAdvance}
                onSecondaryAction={handleToggleAccess}
                onAddRecord={handleAddRecord}
                onDetailAction={(kind) => (kind === "advance" ? handleAdvance() : handleToggleAccess())}
              />
            </main>
          </div>
        </section>

        {isWorkshopDemo ? (
          <section
            className="mt-8 grid gap-6 rounded-[8px] border border-white/10 bg-white/[0.04] p-5 lg:grid-cols-[1fr_0.9fr] lg:p-7"
            aria-labelledby="workshop-next-step"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#67E8F9]">
                Next step
              </p>
              <h2 id="workshop-next-step" className="mt-2 font-heading text-2xl font-semibold text-white sm:text-3xl">
                Get a workshop control audit before committing to a full build
              </h2>
              <div className="mt-5 grid gap-3">
                {[
                  "You send the bottleneck: job cards, waiting parts, technician flow, or reporting.",
                  "We map the first control board your workshop should see.",
                  "You get practical next steps before any full system commitment.",
                ].map((step, index) => (
                  <div key={step} className="flex gap-3 rounded-[8px] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-[#f7f7f2]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-white text-sm font-semibold text-[#0b0c10]">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <TrackedWhatsAppLink
                href={workshopWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                location="workshop_demo_close_whatsapp"
                className="cta-secondary mt-5"
                data-event="whatsapp_click"
                data-demo-slug="workshop"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Eddy
              </TrackedWhatsAppLink>
            </div>

            <ShortAuditForm
              id="workshop-demo-audit"
              title="Tell us your biggest workshop bottleneck"
              subtitle="Send the messy part of your workshop flow and Eddy will reply with practical system ideas for job cards, parts, technicians, or owner visibility."
              problemLabel="Biggest workshop bottleneck"
              problemPlaceholder="Waiting parts, paper job cards, customer updates, invoice-ready work..."
              buttonLabel="Get My Free System Audit"
              leadOffer="Workshop Control Audit"
              source="workshop_demo_close_form"
              demoSlug="workshop"
              industrySlug="workshops"
              leadIntent="demo_page"
              startEvent="demo_form_start"
              submitEvent="demo_form_submit"
            />
          </section>
        ) : null}

        {conversion && !isWorkshopDemo ? (
          <section
            className="mt-8 grid gap-6 rounded-[8px] border border-white/10 bg-white/[0.04] p-5 lg:grid-cols-[1fr_0.9fr] lg:p-7"
            aria-labelledby={`${system.slug}-next-step`}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#67E8F9]">
                Next step
              </p>
              <h2 id={`${system.slug}-next-step`} className="mt-2 font-heading text-2xl font-semibold text-white sm:text-3xl">
                {conversion.closeTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[#d8d8d2]">
                {conversion.closeSubtitle}
              </p>
              <div className="mt-5 grid gap-3">
                {conversion.nextSteps.map((step, index) => (
                  <div key={step} className="flex gap-3 rounded-[8px] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-[#f7f7f2]">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-white text-sm font-semibold text-[#0b0c10]">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[8px] border border-white/10 bg-black/20 p-4">
                <h3 className="font-heading text-lg font-semibold text-white">
                  Built by Eddy from Pine X Systems
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#d8d8d2]">
                  I work with South African business owners to turn paper, spreadsheets, WhatsApp chaos and manual admin into systems their teams can actually use.
                </p>
                <div className="mt-4 flex h-24 items-center justify-center rounded-[8px] border border-dashed border-white/20 bg-white/[0.03] text-xs font-semibold uppercase tracking-[0.12em] text-[#a8a8a2]">
                  Founder photo slot
                </div>
              </div>
              <TrackedWhatsAppLink
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                location={`${system.slug}_demo_close_whatsapp`}
                className="cta-secondary mt-5"
              data-event="whatsapp_click"
                data-demo-slug={system.slug}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Eddy
              </TrackedWhatsAppLink>
            </div>

            <ShortAuditForm
              id={`${system.slug}-demo-audit`}
              title={`Tell us your biggest ${system.shortTitle.toLowerCase()} bottleneck`}
              subtitle="Send the messy part of your operation and Eddy will reply with practical system ideas for the first control layer."
              problemLabel={conversion.problemLabel}
              problemPlaceholder={conversion.problemPlaceholder}
              buttonLabel="Get My Free System Audit"
              leadOffer={`${system.shortTitle} Demo Audit`}
              source={`${system.slug}_demo_close_form`}
              demoSlug={system.slug}
              industrySlug={conversion.industrySlug}
              leadIntent="demo_page"
              startEvent="demo_form_start"
              submitEvent="demo_form_submit"
            />
          </section>
        ) : null}

        <div className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-[1fr_auto] gap-2 rounded-[10px] border border-white/15 bg-[#071126]/95 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur lg:hidden">
          <TrackedDemoLink
            href={contactHref}
            location={`${system.slug}_mobile_sticky_audit`}
            system={system.slug}
            className="cta-button justify-center px-3 py-3 text-sm"
            data-event="free_audit_click"
            data-demo-slug={system.slug}
            data-industry-slug={conversion?.industrySlug}
            data-lead-intent="demo_page"
          >
            Get My Free System Audit
          </TrackedDemoLink>
          <TrackedWhatsAppLink
            href={isWorkshopDemo ? workshopWhatsAppHref : whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            location={`${system.slug}_mobile_sticky_whatsapp`}
            className="cta-secondary justify-center px-3 py-3 text-sm"
            data-event="whatsapp_click"
            data-demo-slug={system.slug}
          >
            WhatsApp
          </TrackedWhatsAppLink>
        </div>
      </div>
    </div>
  );
}

