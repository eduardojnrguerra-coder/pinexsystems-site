"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  LineChart,
  Sparkles,
} from "lucide-react";

const demos = [
  {
    id: "dealership",
    href: "/demos/dealership",
    label: "Dealership",
    title: "Dealership Command System",
    summary:
      "Built for lead flow, vehicle visibility, finance stages, and owner-level sales control.",
    metrics: ["184 leads", "42 vehicles", "12 finance apps"],
    modules: [
      "Lead tracking",
      "Vehicle stock",
      "Salesperson views",
      "Finance pipeline",
      "Owner dashboard",
    ],
    activity: [
      "Cars.co.za lead routed to sales",
      "Finance file moved to approval",
      "Follow-up reminder triggered automatically",
    ],
    bars: [42, 54, 49, 66, 72, 61, 84, 78],
  },
  {
    id: "workshop",
    href: "/demos/workshop",
    label: "Workshop",
    title: "Workshop Control System",
    summary:
      "Designed to manage bookings, technicians, parts, customer updates, and invoice-ready job history.",
    metrics: ["38 open jobs", "91% on time", "7 parts alerts"],
    modules: [
      "Job cards",
      "Bookings",
      "Technician tasks",
      "Parts tracking",
      "Customer updates",
    ],
    activity: [
      "Job JC-48 waiting on brake pads",
      "Customer update sent from workflow",
      "Ready-to-bill queue refreshed",
    ],
    bars: [32, 46, 39, 58, 62, 69, 76, 71],
  },
  {
    id: "hutton-motors-service-centre",
    href: "/demos/hutton-motors-service-centre",
    label: "Hutton Motors",
    title: "Service Centre Operating System",
    summary:
      "Premium service-centre demo for reception intake, digital job cards, workshop stages, parts, shuttle coordination, and WhatsApp updates.",
    metrics: ["6 active jobs", "3 transport tasks", "5 inbox items"],
    modules: [
      "Reception intake",
      "Job cards",
      "Workshop board",
      "Parts memory",
      "WhatsApp centre",
    ],
    activity: [
      "Vito job waiting on NOx sensor ETA",
      "Shuttle pickup assigned for diagnostics booking",
      "Approval message routed to workshop manager",
    ],
    bars: [30, 40, 52, 61, 70, 74, 82, 88],
  },
  {
    id: "agency",
    href: "/demos/agency",
    label: "Agency",
    title: "Agency Operations System",
    summary:
      "A clean control layer for campaign delivery, client reporting, task assignment, and approvals.",
    metrics: ["26 campaigns", "14 reports due", "8 approvals"],
    modules: [
      "Client dashboards",
      "Campaign tracking",
      "Task control",
      "Content pipeline",
      "Monthly reporting",
    ],
    activity: [
      "Monthly report generated for manager",
      "Approval request sent to client",
      "Campaign milestone moved to delivery",
    ],
    bars: [28, 40, 48, 61, 58, 70, 74, 80],
  },
  {
    id: "construction",
    href: "/demos/construction",
    label: "Construction",
    title: "Construction Delivery System",
    summary:
      "Track site progress, material movement, subcontractor accountability, and client updates in one place.",
    metrics: ["16 sites", "63 tasks", "4 delays"],
    modules: [
      "Site progress",
      "Material visibility",
      "Snag tracking",
      "Client reporting",
      "Owner summaries",
    ],
    activity: [
      "Site 04 delay flagged for manager",
      "Material reorder submitted",
      "Client progress pack generated",
    ],
    bars: [34, 45, 52, 56, 64, 71, 75, 82],
  },
  {
    id: "warehouse",
    href: "/demos/warehouse",
    label: "Warehouse",
    title: "Warehouse Visibility System",
    summary:
      "A live operational view for stock movement, dispatch workflow, shortage alerts, and supplier ordering.",
    metrics: ["1 284 items", "27 dispatches", "5 stock risks"],
    modules: [
      "Stock movement",
      "Dispatch workflow",
      "Supplier orders",
      "Picker accountability",
      "Low stock alerts",
    ],
    activity: [
      "Dispatch queue updated",
      "Low stock item escalated",
      "Supplier order request created",
    ],
    bars: [36, 44, 47, 60, 63, 67, 73, 79],
  },
  {
    id: "farm",
    href: "/demos/farm",
    label: "Farm",
    title: "Farm Operations System",
    summary:
      "Control recurring work, field performance, equipment visibility, and owner reporting from one layer.",
    metrics: ["12 fields", "19 tasks", "3 supply alerts"],
    modules: [
      "Operational tasks",
      "Input stock",
      "Equipment visibility",
      "Field reporting",
      "Owner dashboard",
    ],
    activity: [
      "Input stock below threshold",
      "Field task moved to in progress",
      "Daily owner summary generated",
    ],
    bars: [29, 38, 42, 50, 58, 64, 69, 74],
  },
  {
    id: "security",
    href: "/demos/security",
    label: "Security",
    title: "Security & Operations System",
    summary:
      "A command layer for active sites, guard patrols, incident reports, shift rosters, equipment logs, and owner reporting.",
    metrics: ["11 sites", "38 guards", "5 incidents"],
    modules: [
      "Shift roster",
      "Patrol tracking",
      "Incident reports",
      "Equipment logs",
      "Management reports",
    ],
    activity: [
      "Missed check-in escalated",
      "Incident report generated",
      "Guard patrol marked complete",
    ],
    bars: [35, 44, 51, 57, 62, 70, 77, 82],
  },
  {
    id: "custom-business",
    href: "/demos/custom-business",
    label: "Custom",
    title: "Custom Business Portal",
    summary:
      "A flexible internal system for owner dashboards, staff workflows, client portals, approvals, documents, automation, and reports.",
    metrics: ["18 flows", "9 approvals", "87 runs"],
    modules: [
      "Owner dashboard",
      "Staff workflows",
      "Client portal",
      "Approvals",
      "Automation",
    ],
    activity: [
      "Custom summary generated",
      "Client portal module selected",
      "Role permissions preview updated",
    ],
    bars: [31, 43, 49, 55, 64, 73, 78, 86],
  },
];

export function DemoSelector() {
  const [selectedId, setSelectedId] = useState(demos[0]?.id ?? "dealership");

  const activeDemo = demos.find((demo) => demo.id === selectedId) ?? demos[0];

  return (
    <div className="light-panel rounded-[8px] p-3 sm:p-4 lg:p-5">
      <div className="flex flex-wrap gap-2">
        {demos.map((demo) => {
          const isActive = demo.id === activeDemo.id;

          return (
            <button
              key={demo.id}
              type="button"
              onClick={() => setSelectedId(demo.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-[#0b0c10] text-[#f7f7f2] shadow-[0_12px_28px_rgba(11,12,16,0.16)]"
                  : "border border-[#d9d9d1] bg-white text-[#55565a] hover:border-[#67E8F9]/60 hover:text-[#0b0c10]"
              }`}
            >
              {demo.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="overflow-hidden rounded-[8px] border border-[#171a22] bg-[linear-gradient(180deg,#11141b_0%,#0b0c10_100%)] p-5 text-[#f7f7f2] shadow-[0_24px_70px_rgba(11,12,16,0.28)]">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#a8a8a2]">
                Live system example
              </p>
              <h3 className="mt-2 font-heading text-2xl font-semibold text-white">
                {activeDemo.title}
              </h3>
            </div>
            <div className="live-indicator rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-[#d8d8d2]">
              <span className="live-dot" /> Live preview
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {activeDemo.metrics.map((metric) => (
              <div key={metric} className="rounded-[8px] border border-white/10 bg-white/[0.04] px-3 py-3">
                <p className="text-base font-semibold text-white">{metric.split(" ")[0]}</p>
                <p className="mt-1 text-[11px] text-[#a8a8a2]">
                  {metric.split(" ").slice(1).join(" ")}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[0.88fr_1.12fr]">
            <div className="rounded-[8px] border border-white/10 bg-black/25 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">Performance trend</p>
                <LineChart className="h-4 w-4 text-[#67E8F9]" />
              </div>
              <div className="mt-4 flex h-28 items-end gap-2">
                {activeDemo.bars.map((height, index) => (
                  <span
                    key={`${activeDemo.id}-${height}-${index}`}
                    className="flex-1 rounded-full bg-[linear-gradient(180deg,rgba(247,247,242,0.95),rgba(96,165,250,0.45))]"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-[8px] border border-white/10 bg-black/25 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-white">Activity feed</p>
                <BellRing className="h-4 w-4 text-[#67E8F9]" />
              </div>
              <div className="mt-4 space-y-2">
                {activeDemo.activity.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 rounded-[8px] border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-[#d8d8d2]"
                  >
                    <span className="live-dot mt-1 h-2 w-2" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col justify-between gap-4 rounded-[8px] border border-[#d9d9d1] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(247,247,242,0.96))] p-5 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#6b6c70]">
              Built for this workflow
            </p>
            <p className="mt-3 text-base leading-7 text-[#3d4147]">{activeDemo.summary}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {activeDemo.modules.map((module) => (
                <span
                  key={module}
                  className="rounded-full border border-[#d9d9d1] bg-white px-3 py-1.5 text-xs text-[#3d4147]"
                >
                  {module}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] border border-[#d9d9d1] bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0b0c10]">
              <Sparkles className="h-4 w-4 text-[#60A5FA]" />
              What this preview shows
            </div>
            <div className="mt-4 space-y-3 text-sm text-[#4b4e55]">
              <div className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#67E8F9]" />
                <span>A realistic command dashboard for the operation.</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#67E8F9]" />
                <span>Role-based modules shaped around real business flow.</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#67E8F9]" />
                <span>Owner visibility, live risk flags, and clear workflow control.</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href={activeDemo.href} className="cta-button premium-glow w-full sm:w-fit" data-event="demo_click">
              View Live Demo Systems <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact#lead-form" className="cta-secondary w-full justify-center sm:w-fit" data-event="demo_cta_click">
              Map This Demo Around My Business
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
