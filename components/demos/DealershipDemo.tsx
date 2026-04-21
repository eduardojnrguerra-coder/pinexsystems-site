"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Car,
  FileCheck2,
  Gauge,
  MessageCircle,
  Phone,
  Plus,
  Search,
  Send,
  UserCheck,
} from "lucide-react";

import { TrackedDemoLink } from "@/components/analytics/tracked-demo-link";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-whatsapp-link";
import { whatsappCta } from "@/lib/site";

type Role = "Owner view" | "Salesperson view" | "Finance/admin view";
type Section = "Overview" | "Leads" | "Vehicle stock" | "Finance" | "Activity";
type LeadStage = "New" | "Contacted" | "Test Drive" | "Finance" | "Sold";
type FinanceStage = "Docs outstanding" | "Submitted" | "Approved" | "Payout pending" | "Delivery ready";

type LeadRecord = {
  id: string;
  customer: string;
  source: string;
  vehicle: string;
  assigned: string;
  stage: LeadStage;
  nextAction: string;
  due: string;
  overdue: boolean;
  hot: boolean;
  value: number;
  financeRequired: boolean;
  phone: string;
};

type VehicleRecord = {
  id: string;
  stockCode: string;
  year: number;
  model: string;
  price: number;
  ageDays: number;
  status: string;
  reconState: string;
  photosReady: boolean;
  autoTraderReady: boolean;
  carsReady: boolean;
  websiteReady: boolean;
  flags: string[];
};

type FinanceRecord = {
  id: string;
  customer: string;
  vehicle: string;
  lender: string;
  stage: FinanceStage;
  docsStatus: string;
  dealOwner: string;
  blocker: string;
  progress: number;
  value: number;
};

type ActivityRecord = {
  id: string;
  time: string;
  actor: string;
  text: string;
  type: "lead" | "stock" | "finance" | "owner";
};

type Metric = {
  label: string;
  value: string;
  detail: string;
  tone: "cyan" | "blue" | "amber" | "green";
  section: Section;
};

const roles: Role[] = ["Owner view", "Salesperson view", "Finance/admin view"];
const sections: Section[] = ["Overview", "Leads", "Vehicle stock", "Finance", "Activity"];
const leadStages: LeadStage[] = ["New", "Contacted", "Test Drive", "Finance", "Sold"];
const financeStages: FinanceStage[] = ["Docs outstanding", "Submitted", "Approved", "Payout pending", "Delivery ready"];
const salespeople = ["Andre", "Lerato", "Mpho"];
const salespersonFocus = "Andre";

const roleDefaults: Record<Role, Section> = {
  "Owner view": "Overview",
  "Salesperson view": "Leads",
  "Finance/admin view": "Finance",
};

const roleProfiles: Record<Role, { eyebrow: string; title: string; summary: string; priority: string }> = {
  "Owner view": {
    eyebrow: "Dealer principal control room",
    title: "Owner view: dealership-wide risk and pipeline visibility",
    summary:
      "See lead leakage, aged stock, finance blockers, delivery readiness, and open revenue pipeline from one operating dashboard.",
    priority: "Watch missed follow-ups, aged stock, and finance blockers before they cost the dealership a deal.",
  },
  "Salesperson view": {
    eyebrow: "Sales executive workspace",
    title: "Salesperson view: assigned leads, hot prospects, and next actions",
    summary:
      "Focus on Andre's active enquiries, booked test drives, overdue contacts, and deals that need movement today.",
    priority: "Work the next best lead first, keep test drives moving, and stop follow-ups from going cold.",
  },
  "Finance/admin view": {
    eyebrow: "F&I and admin workflow",
    title: "Finance/admin view: applications, documents, payouts, and delivery readiness",
    summary:
      "Track missing F&I documents, bank stages, approval progress, payout blockers, and handover tasks before delivery day.",
    priority: "Clear document gaps and payout blockers so approved deals can move cleanly to delivery.",
  },
};

const initialLeads: LeadRecord[] = [
  { id: "LD-184", customer: "Johan van der Merwe", source: "Cars.co.za", vehicle: "2021 Toyota Hilux 2.8 GD-6", assigned: "Andre", stage: "New", nextAction: "Call within 30 minutes", due: "Today 09:30", overdue: true, hot: true, value: 479900, financeRequired: true, phone: "082 441 7782" },
  { id: "LD-183", customer: "Maria Jacobs", source: "Website form", vehicle: "2020 VW Polo 1.0 TSI", assigned: "Lerato", stage: "Contacted", nextAction: "Send trade-in valuation request", due: "Today 11:00", overdue: false, hot: false, value: 229900, financeRequired: false, phone: "073 225 6104" },
  { id: "LD-182", customer: "Thabo Mokoena", source: "AutoTrader", vehicle: "2019 Ford Ranger 2.0 Bi-Turbo", assigned: "Andre", stage: "Test Drive", nextAction: "Confirm Saturday test drive", due: "Today 14:00", overdue: false, hot: true, value: 399900, financeRequired: true, phone: "079 818 3341" },
  { id: "LD-181", customer: "Pieter Botha", source: "Walk-in", vehicle: "2022 Hyundai Tucson", assigned: "Mpho", stage: "Finance", nextAction: "Collect proof of income", due: "Yesterday 16:00", overdue: true, hot: true, value: 489900, financeRequired: true, phone: "084 550 9328" },
  { id: "LD-180", customer: "Candice Naidoo", source: "Facebook lead", vehicle: "2018 BMW 320i", assigned: "Andre", stage: "Contacted", nextAction: "WhatsApp finance estimate", due: "Yesterday 12:20", overdue: true, hot: false, value: 319900, financeRequired: true, phone: "071 604 2219" },
];

const initialVehicles: VehicleRecord[] = [
  { id: "VH-042", stockCode: "PX-214", year: 2021, model: "Toyota Hilux 2.8 GD-6", price: 479900, ageDays: 12, status: "Ready to publish", reconState: "Roadworthy booked", photosReady: true, autoTraderReady: false, carsReady: true, websiteReady: false, flags: ["Website listing not published"] },
  { id: "VH-041", stockCode: "PX-198", year: 2020, model: "VW Polo 1.0 TSI", price: 229900, ageDays: 28, status: "Published", reconState: "Retail ready", photosReady: true, autoTraderReady: true, carsReady: true, websiteReady: true, flags: [] },
  { id: "VH-040", stockCode: "PX-176", year: 2019, model: "Ford Ranger 2.0 Bi-Turbo", price: 399900, ageDays: 41, status: "Published", reconState: "Retail ready", photosReady: true, autoTraderReady: true, carsReady: true, websiteReady: true, flags: ["High enquiry volume"] },
  { id: "VH-039", stockCode: "PX-171", year: 2022, model: "Hyundai Tucson", price: 489900, ageDays: 9, status: "Finance hold", reconState: "Retail ready", photosReady: true, autoTraderReady: true, carsReady: true, websiteReady: true, flags: ["Delivery blocked by F&I docs"] },
  { id: "VH-038", stockCode: "PX-144", year: 2018, model: "BMW 320i", price: 319900, ageDays: 67, status: "Aged stock", reconState: "Minor recon required", photosReady: false, autoTraderReady: false, carsReady: false, websiteReady: false, flags: ["Aged stock", "Missing photos", "Recon quote pending"] },
];

const initialFinance: FinanceRecord[] = [
  { id: "FI-118", customer: "Pieter Botha", vehicle: "2022 Hyundai Tucson", lender: "WesBank", stage: "Docs outstanding", docsStatus: "Proof of income missing", dealOwner: "Mpho", blocker: "Customer documents", progress: 28, value: 489900 },
  { id: "FI-117", customer: "Thabo Mokoena", vehicle: "2019 Ford Ranger 2.0 Bi-Turbo", lender: "MFC", stage: "Submitted", docsStatus: "Complete", dealOwner: "Andre", blocker: "Bank response", progress: 58, value: 399900 },
  { id: "FI-116", customer: "Candice Naidoo", vehicle: "2018 BMW 320i", lender: "ABSA Vehicle Finance", stage: "Approved", docsStatus: "Contract pack ready", dealOwner: "Andre", blocker: "Insurance confirmation", progress: 76, value: 319900 },
  { id: "FI-115", customer: "Johan van der Merwe", vehicle: "2021 Toyota Hilux 2.8 GD-6", lender: "Standard Bank", stage: "Payout pending", docsStatus: "Complete", dealOwner: "Andre", blocker: "Settlement letter", progress: 84, value: 479900 },
];

const initialActivity: ActivityRecord[] = [
  { id: "A-01", time: "08:52", actor: "Andre", text: "Cars.co.za Hilux lead captured and assigned for first call.", type: "lead" },
  { id: "A-02", time: "08:41", actor: "Finance", text: "Pieter Botha finance application flagged for missing proof of income.", type: "finance" },
  { id: "A-03", time: "08:24", actor: "Stock admin", text: "BMW 320i marked as aged stock with missing photo pack.", type: "stock" },
  { id: "A-04", time: "Yesterday", actor: "Owner dashboard", text: "Three overdue lead follow-ups escalated to the dealer principal view.", type: "owner" },
];

function formatRand(value: number) {
  return `R ${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}`;
}

function nextLeadStage(stage: LeadStage): LeadStage {
  const index = leadStages.indexOf(stage);
  return leadStages[Math.min(index + 1, leadStages.length - 1)] ?? stage;
}

function nextFinanceStage(stage: FinanceStage): FinanceStage {
  const index = financeStages.indexOf(stage);
  return financeStages[Math.min(index + 1, financeStages.length - 1)] ?? stage;
}

function StatusBadge({ children, tone = "cyan" }: { children: React.ReactNode; tone?: "cyan" | "blue" | "amber" | "green" }) {
  const tones = {
    cyan: "border-[#67E8F9]/25 bg-[#67E8F9]/10 text-[#67E8F9]",
    blue: "border-[#60A5FA]/25 bg-[#60A5FA]/10 text-[#93C5FD]",
    amber: "border-[#F5D36C]/30 bg-[#F5D36C]/12 text-[#F5D36C]",
    green: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
  };

  return <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-[8px] border border-white/10 bg-white/[0.045] shadow-[0_18px_70px_rgba(0,0,0,0.18)] ${className}`}>{children}</div>;
}

function MetricCard({ metric, onClick }: { metric: Metric; onClick: () => void }) {
  const dot = metric.tone === "amber" ? "bg-[#F5D36C]" : metric.tone === "blue" ? "bg-[#60A5FA]" : metric.tone === "green" ? "bg-emerald-300" : "bg-[#67E8F9]";

  return (
    <button type="button" onClick={onClick} className="rounded-[8px] border border-white/10 bg-white/[0.045] p-4 text-left transition hover:-translate-y-0.5 hover:border-[#67E8F9]/35 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.08em] text-[#a8a8a2]">{metric.label}</p>
        <span className={`mt-1 h-2.5 w-2.5 rounded-full ${dot}`} />
      </div>
      <p className="mt-3 font-heading text-2xl font-semibold text-white">{metric.value}</p>
      <p className="mt-2 text-sm leading-5 text-[#d8d8d2]">{metric.detail}</p>
    </button>
  );
}

export function DealershipDemo() {
  const [activeRole, setActiveRole] = useState<Role>("Owner view");
  const [activeSection, setActiveSection] = useState<Section>("Overview");
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(initialVehicles);
  const [financeApps, setFinanceApps] = useState<FinanceRecord[]>(initialFinance);
  const [activity, setActivity] = useState<ActivityRecord[]>(initialActivity);
  const [search, setSearch] = useState("");
  const [leadStageFilter, setLeadStageFilter] = useState<LeadStage | "All">("All");

  const addActivity = (text: string, type: ActivityRecord["type"], actor = activeRole.replace(" view", "")) => {
    setActivity((current) => [
      { id: `A-${Date.now()}`, time: "Just now", actor, text, type },
      ...current,
    ].slice(0, 12));
  };

  const roleLeads = useMemo(() => {
    if (activeRole === "Salesperson view") return leads.filter((lead) => lead.assigned === salespersonFocus);
    if (activeRole === "Finance/admin view") return leads.filter((lead) => lead.financeRequired || lead.stage === "Finance");
    return leads;
  }, [activeRole, leads]);

  const roleVehicles = useMemo(() => {
    if (activeRole === "Salesperson view") return vehicles.filter((vehicle) => vehicle.status !== "Finance hold");
    if (activeRole === "Finance/admin view") {
      return vehicles.filter((vehicle) => vehicle.status === "Finance hold" || vehicle.flags.some((flag) => flag.toLowerCase().includes("delivery")));
    }
    return vehicles;
  }, [activeRole, vehicles]);

  const roleFinanceApps = useMemo(() => {
    if (activeRole === "Salesperson view") return financeApps.filter((app) => app.dealOwner === salespersonFocus);
    return financeApps;
  }, [activeRole, financeApps]);

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();
    return roleLeads.filter((lead) => {
      const matchesStage = leadStageFilter === "All" || lead.stage === leadStageFilter;
      const matchesSearch = query
        ? [lead.id, lead.customer, lead.source, lead.vehicle, lead.assigned, lead.stage, lead.nextAction]
            .join(" ")
            .toLowerCase()
            .includes(query)
        : true;
      return matchesStage && matchesSearch;
    });
  }, [leadStageFilter, roleLeads, search]);

  const overdueLeads = leads.filter((lead) => lead.overdue);
  const agedStock = vehicles.filter((vehicle) => vehicle.ageDays >= 60 || vehicle.flags.includes("Aged stock"));
  const financeBlockers = financeApps.filter((app) => app.stage === "Docs outstanding" || app.stage === "Payout pending");
  const pipelineValue = leads.filter((lead) => lead.stage !== "Sold").reduce((total, lead) => total + lead.value, 450000);
  const profile = roleProfiles[activeRole];

  const metrics = useMemo<Metric[]>(() => {
    if (activeRole === "Salesperson view") {
      return [
        { label: "Assigned leads", value: `${roleLeads.length}`, detail: `${roleLeads.filter((lead) => lead.hot).length} hot prospects in Andre's queue`, tone: "cyan", section: "Leads" },
        { label: "Overdue contacts", value: `${roleLeads.filter((lead) => lead.overdue).length}`, detail: "Follow-ups that need action before they go cold", tone: "amber", section: "Leads" },
        { label: "Booked test drives", value: `${roleLeads.filter((lead) => lead.stage === "Test Drive").length}`, detail: "Confirmations and customer reminders", tone: "blue", section: "Leads" },
        { label: "Personal pipeline", value: formatRand(roleLeads.reduce((total, lead) => total + lead.value, 0)), detail: "Open deal value assigned to this salesperson", tone: "green", section: "Overview" },
      ];
    }

    if (activeRole === "Finance/admin view") {
      return [
        { label: "Finance queue", value: `${roleFinanceApps.length}`, detail: "Applications requiring F&I/admin attention", tone: "cyan", section: "Finance" },
        { label: "Docs outstanding", value: `${roleFinanceApps.filter((app) => app.stage === "Docs outstanding").length}`, detail: "Missing documents blocking submission", tone: "amber", section: "Finance" },
        { label: "Approvals waiting", value: `${roleFinanceApps.filter((app) => app.stage === "Submitted").length}`, detail: "Bank responses still pending", tone: "blue", section: "Finance" },
        { label: "Delivery ready", value: `${roleFinanceApps.filter((app) => app.stage === "Delivery ready").length}`, detail: "Deals ready for handover process", tone: "green", section: "Finance" },
      ];
    }

    return [
      { label: "Leads captured", value: `${179 + leads.length}`, detail: `${overdueLeads.length} missed follow-ups need review`, tone: "cyan", section: "Leads" },
      { label: "Vehicles in stock", value: `${37 + vehicles.length}`, detail: `${agedStock.length} aged or listing-risk units`, tone: "blue", section: "Vehicle stock" },
      { label: "Finance applications", value: `${8 + financeApps.length}`, detail: `${financeBlockers.length} applications have blockers`, tone: "amber", section: "Finance" },
      { label: "Revenue pipeline", value: formatRand(pipelineValue), detail: "Open enquiry and finance-stage value", tone: "green", section: "Overview" },
    ];
  }, [activeRole, agedStock.length, financeApps.length, financeBlockers.length, leads.length, overdueLeads.length, pipelineValue, roleFinanceApps, roleLeads, vehicles.length]);

  const moveLeadStage = (id: string) => {
    const lead = leads.find((item) => item.id === id);
    if (!lead) return;
    const next = nextLeadStage(lead.stage);
    setLeads((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, stage: next, overdue: false, nextAction: next === "Sold" ? "Prepare delivery handover" : `Move ${next.toLowerCase()} task forward` }
          : item,
      ),
    );
    addActivity(`${lead.customer} moved from ${lead.stage} to ${next} for ${lead.vehicle}.`, "lead", lead.assigned);
  };

  const markFollowUpComplete = (id: string) => {
    const lead = leads.find((item) => item.id === id);
    if (!lead) return;
    setLeads((current) =>
      current.map((item) =>
        item.id === id ? { ...item, overdue: false, nextAction: "Follow-up completed - next step scheduled", due: "Tomorrow 09:00" } : item,
      ),
    );
    addActivity(`${lead.assigned} completed follow-up for ${lead.customer}.`, "lead", lead.assigned);
  };

  const assignLead = (id: string) => {
    const lead = leads.find((item) => item.id === id);
    if (!lead) return;
    const nextOwner = salespeople[(salespeople.indexOf(lead.assigned) + 1) % salespeople.length] ?? salespeople[0];
    setLeads((current) => current.map((item) => (item.id === id ? { ...item, assigned: nextOwner } : item)));
    addActivity(`${lead.customer} reassigned from ${lead.assigned} to ${nextOwner}.`, "lead", "Sales manager");
  };

  const bookTestDrive = (id: string) => {
    const lead = leads.find((item) => item.id === id);
    if (!lead) return;
    setLeads((current) =>
      current.map((item) =>
        item.id === id ? { ...item, stage: "Test Drive", overdue: false, nextAction: "Test drive booked - send confirmation", due: "Saturday 10:00" } : item,
      ),
    );
    addActivity(`Test drive booked for ${lead.customer} on ${lead.vehicle}.`, "lead", lead.assigned);
  };

  const publishVehicle = (id: string) => {
    const vehicle = vehicles.find((item) => item.id === id);
    if (!vehicle) return;
    setVehicles((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status: "Published", photosReady: true, autoTraderReady: true, carsReady: true, websiteReady: true, flags: item.flags.filter((flag) => !["Missing photos", "Website listing not published"].includes(flag)) }
          : item,
      ),
    );
    addActivity(`${vehicle.model} published to AutoTrader, Cars.co.za, and website stock feed.`, "stock", "Stock admin");
  };

  const flagStockItem = (id: string) => {
    const vehicle = vehicles.find((item) => item.id === id);
    if (!vehicle) return;
    setVehicles((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: item.ageDays >= 60 ? "Aged stock" : item.status, flags: item.flags.includes("Manager review") ? item.flags : ["Manager review", ...item.flags] } : item,
      ),
    );
    addActivity(`${vehicle.model} flagged for manager stock review.`, "stock", "Owner dashboard");
  };

  const markDocsReceived = (id: string) => {
    const app = financeApps.find((item) => item.id === id);
    if (!app) return;
    setFinanceApps((current) =>
      current.map((item) =>
        item.id === id ? { ...item, docsStatus: "Complete", stage: "Submitted", blocker: "Bank response", progress: Math.max(item.progress, 55) } : item,
      ),
    );
    addActivity(`Documents received for ${app.customer}; application submitted to ${app.lender}.`, "finance", "F&I admin");
  };

  const advanceFinance = (id: string) => {
    const app = financeApps.find((item) => item.id === id);
    if (!app) return;
    const next = nextFinanceStage(app.stage);
    setFinanceApps((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, stage: next, docsStatus: next === "Submitted" || next === "Approved" ? "Complete" : item.docsStatus, blocker: next === "Delivery ready" ? "None" : next === "Approved" ? "Contract signature" : "Bank response", progress: Math.min(100, item.progress + 22) }
          : item,
      ),
    );
    addActivity(`${app.customer} finance moved from ${app.stage} to ${next}.`, "finance", "F&I admin");
  };

  const addSampleLead = () => {
    const newLead: LeadRecord = { id: `LD-${185 + leads.length}`, customer: "New WhatsApp Enquiry", source: "WhatsApp", vehicle: "2020 Toyota Fortuner 2.8 GD-6", assigned: "Andre", stage: "New", nextAction: "Call and qualify finance need", due: "Just now", overdue: false, hot: true, value: 459900, financeRequired: true, phone: "082 000 0199" };
    setLeads((current) => [newLead, ...current]);
    setActiveSection("Leads");
    addActivity("New WhatsApp enquiry captured, assigned to Andre, and added to lead queue.", "lead", "Lead router");
  };

  const generateOwnerReport = () => {
    setActiveSection("Activity");
    addActivity(`Owner report generated: ${overdueLeads.length} follow-up risks, ${agedStock.length} stock risks, ${financeBlockers.length} finance blockers.`, "owner", "Owner dashboard");
  };

  const priorityAlerts = [
    { title: "Follow-up leakage", detail: `${overdueLeads.length} leads are overdue and should be recovered today.`, icon: Phone, section: "Leads" as Section, show: activeRole !== "Finance/admin view" },
    { title: "Aged stock pressure", detail: `${agedStock.length} unit needs listing or manager review before margin weakens.`, icon: Car, section: "Vehicle stock" as Section, show: activeRole === "Owner view" },
    { title: "F&I blocker queue", detail: `${financeBlockers.length} finance applications are blocked by docs or payout tasks.`, icon: FileCheck2, section: "Finance" as Section, show: activeRole !== "Salesperson view" },
    { title: "Personal action queue", detail: `${roleLeads.length} assigned leads need clear next actions.`, icon: UserCheck, section: "Leads" as Section, show: activeRole === "Salesperson view" },
  ].filter((alert) => alert.show);

  const renderOverview = () => (
    <div className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
      <Panel className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#67E8F9]">Priority control queue</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold text-white">{profile.priority}</h2>
          </div>
          <Gauge className="h-7 w-7 text-[#67E8F9]" />
        </div>
        <div className="mt-5 grid gap-3">
          {priorityAlerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <button key={alert.title} type="button" onClick={() => setActiveSection(alert.section)} className="rounded-[8px] border border-white/10 bg-black/20 p-4 text-left transition hover:border-[#67E8F9]/30 hover:bg-white/[0.06]">
                <div className="flex gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-[#67E8F9]/20 bg-[#67E8F9]/10 text-[#67E8F9]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{alert.title}</p>
                    <p className="mt-1 text-sm leading-6 text-[#d8d8d2]">{alert.detail}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#67E8F9]">Deal flow snapshot</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {leadStages.map((stage) => {
            const count = leads.filter((lead) => lead.stage === stage).length;
            return (
              <button key={stage} type="button" onClick={() => { setLeadStageFilter(stage); setActiveSection("Leads"); }} className="rounded-[8px] border border-white/10 bg-black/20 p-4 text-left transition hover:border-[#67E8F9]/30">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-white">{stage}</p>
                  <span className="rounded-full bg-[#67E8F9] px-2.5 py-1 text-xs font-bold text-[#0b0c10]">{count}</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full rounded-full bg-[#67E8F9]" style={{ width: `${Math.min(100, count * 28)}%` }} />
                </div>
              </button>
            );
          })}
        </div>
      </Panel>
    </div>
  );

  const renderLeads = () => (
    <Panel className="p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-white">Lead response and sales pipeline</h2>
          <p className="mt-1 text-sm leading-6 text-[#d8d8d2]">
            Track source, assigned salesperson, next action, stage, and overdue risk for every dealership enquiry.
          </p>
        </div>
        <button type="button" onClick={addSampleLead} className="cta-button">
          <Plus className="h-4 w-4" /> Add sample lead
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {(["All", ...leadStages] as const).map((stage) => (
          <button
            key={stage}
            type="button"
            onClick={() => setLeadStageFilter(stage)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              leadStageFilter === stage
                ? "border-[#67E8F9]/50 bg-[#67E8F9]/15 text-[#67E8F9]"
                : "border-white/10 bg-white/[0.04] text-[#d8d8d2] hover:border-white/25"
            }`}
          >
            {stage}
          </button>
        ))}
        <label className="ml-auto flex min-w-full items-center gap-2 rounded-[8px] border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#d8d8d2] sm:min-w-[18rem]">
          <Search className="h-4 w-4 text-[#67E8F9]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search customer, source, vehicle..."
            className="w-full bg-transparent text-white outline-none placeholder:text-[#a8a8a2]"
          />
        </label>
      </div>

      <div className="mt-5 grid gap-3">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="rounded-[8px] border border-white/10 bg-black/20 p-4">
            <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr_auto] xl:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-heading text-xl font-semibold text-white">{lead.customer}</p>
                  <StatusBadge tone={lead.hot ? "amber" : "cyan"}>{lead.stage}</StatusBadge>
                  {lead.overdue ? <StatusBadge tone="amber">Overdue</StatusBadge> : null}
                </div>
                <p className="mt-2 text-sm text-[#d8d8d2]">
                  {lead.id} - {lead.source} - {lead.phone}
                </p>
                <p className="mt-1 text-sm text-[#a8a8a2]">{lead.vehicle} - {formatRand(lead.value)}</p>
              </div>
              <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-3">
                <p className="text-xs uppercase tracking-[0.08em] text-[#a8a8a2]">Next action</p>
                <p className="mt-2 text-sm font-semibold text-white">{lead.nextAction}</p>
                <p className="mt-1 text-xs text-[#a8a8a2]">Owner: {lead.assigned} - Due: {lead.due}</p>
              </div>
              <div className="flex flex-wrap gap-2 xl:justify-end">
                <button type="button" onClick={() => moveLeadStage(lead.id)} className="demo-action-button">Move stage</button>
                <button type="button" onClick={() => markFollowUpComplete(lead.id)} className="demo-action-button">Follow-up done</button>
                <button type="button" onClick={() => bookTestDrive(lead.id)} className="demo-action-button">Book test drive</button>
                <button type="button" onClick={() => assignLead(lead.id)} className="demo-action-button">Assign</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );

  const renderVehicleStock = () => (
    <Panel className="p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-white">Vehicle stock control</h2>
          <p className="mt-1 text-sm leading-6 text-[#d8d8d2]">
            Stock age, recon state, photo readiness, and publishing status across AutoTrader, Cars.co.za, and the dealership website.
          </p>
        </div>
        <StatusBadge tone="blue">{roleVehicles.length} visible units</StatusBadge>
      </div>
      <div className="mt-5 grid gap-3">
        {roleVehicles.map((vehicle) => (
          <div key={vehicle.id} className="rounded-[8px] border border-white/10 bg-black/20 p-4">
            <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-heading text-xl font-semibold text-white">{vehicle.year} {vehicle.model}</p>
                  <StatusBadge tone={vehicle.status === "Aged stock" ? "amber" : vehicle.status === "Published" ? "green" : "cyan"}>{vehicle.status}</StatusBadge>
                </div>
                <p className="mt-2 text-sm text-[#d8d8d2]">
                  {vehicle.stockCode} - {formatRand(vehicle.price)} - {vehicle.ageDays} days in stock - {vehicle.reconState}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {vehicle.flags.length ? vehicle.flags.map((flag) => <StatusBadge key={flag} tone="amber">{flag}</StatusBadge>) : <StatusBadge tone="green">No stock risk flags</StatusBadge>}
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-4">
                {[
                  ["Photos", vehicle.photosReady],
                  ["AutoTrader", vehicle.autoTraderReady],
                  ["Cars.co.za", vehicle.carsReady],
                  ["Website", vehicle.websiteReady],
                ].map(([label, ready]) => (
                  <div key={String(label)} className="rounded-[8px] border border-white/10 bg-white/[0.035] p-3">
                    <p className="text-xs text-[#a8a8a2]">{label}</p>
                    <p className={`mt-1 text-sm font-semibold ${ready ? "text-emerald-200" : "text-[#F5D36C]"}`}>{ready ? "Ready" : "Blocked"}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <button type="button" onClick={() => publishVehicle(vehicle.id)} className="demo-action-button">Publish</button>
                <button type="button" onClick={() => flagStockItem(vehicle.id)} className="demo-action-button">Flag stock</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );

  const renderFinance = () => (
    <Panel className="p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-white">Finance and delivery readiness</h2>
          <p className="mt-1 text-sm leading-6 text-[#d8d8d2]">
            F&I workflow for bank stages, missing documents, payout blockers, contract packs, and delivery readiness.
          </p>
        </div>
        <StatusBadge tone="amber">{financeBlockers.length} blockers</StatusBadge>
      </div>
      <div className="mt-5 grid gap-3">
        {roleFinanceApps.map((app) => (
          <div key={app.id} className="rounded-[8px] border border-white/10 bg-black/20 p-4">
            <div className="grid gap-4 xl:grid-cols-[1fr_0.75fr_auto] xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-heading text-xl font-semibold text-white">{app.customer}</p>
                  <StatusBadge tone={app.stage === "Docs outstanding" ? "amber" : app.stage === "Delivery ready" ? "green" : "blue"}>{app.stage}</StatusBadge>
                </div>
                <p className="mt-2 text-sm text-[#d8d8d2]">{app.vehicle} - {app.lender} - Deal owner: {app.dealOwner}</p>
                <p className="mt-1 text-sm text-[#a8a8a2]">Docs: {app.docsStatus} - Blocker: {app.blocker}</p>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs text-[#a8a8a2]">
                  <span>Approval progress</span>
                  <span>{app.progress}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <span className="block h-full rounded-full bg-[#67E8F9]" style={{ width: `${app.progress}%` }} />
                </div>
                <p className="mt-2 text-sm font-semibold text-white">{formatRand(app.value)}</p>
              </div>
              <div className="flex flex-wrap gap-2 xl:justify-end">
                <button type="button" onClick={() => markDocsReceived(app.id)} className="demo-action-button">Docs received</button>
                <button type="button" onClick={() => advanceFinance(app.id)} className="demo-action-button">Advance stage</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );

  const renderActivity = () => (
    <div className="grid gap-5 xl:grid-cols-[1fr_0.72fr]">
      <Panel className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-white">Live dealership activity</h2>
            <p className="mt-1 text-sm leading-6 text-[#d8d8d2]">
              Every demo action writes to this local activity stream so the system behaves like a working control room.
            </p>
          </div>
          <span className="live-indicator rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-[#d8d8d2]">
            <span className="live-dot" /> Updating
          </span>
        </div>
        <div className="mt-5 space-y-3">
          {activity.map((item) => (
            <div key={item.id} className="flex gap-3 rounded-[8px] border border-white/10 bg-black/20 p-4">
              <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.type === "finance" ? "bg-[#60A5FA]" : item.type === "stock" ? "bg-[#F5D36C]" : item.type === "owner" ? "bg-emerald-300" : "bg-[#67E8F9]"}`} />
              <div>
                <p className="text-sm font-semibold text-white">{item.actor}</p>
                <p className="mt-1 text-sm leading-6 text-[#d8d8d2]">{item.text}</p>
                <p className="mt-1 text-xs text-[#a8a8a2]">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#67E8F9]">Demo actions</p>
        <h2 className="mt-2 font-heading text-xl font-semibold text-white">Generate visible system movement</h2>
        <p className="mt-2 text-sm leading-6 text-[#d8d8d2]">
          These actions update KPIs, records, and the live feed. No backend is required for the sales demo.
        </p>
        <div className="mt-5 grid gap-2">
          <button type="button" onClick={addSampleLead} className="cta-button justify-center"><Plus className="h-4 w-4" /> Capture WhatsApp lead</button>
          <button type="button" onClick={generateOwnerReport} className="cta-secondary justify-center"><BarChart3 className="h-4 w-4" /> Generate owner report</button>
          <button type="button" onClick={() => addActivity("Customer update batch sent for open test drives and finance applications.", "lead", "Automation")} className="cta-secondary justify-center"><Send className="h-4 w-4" /> Send customer updates</button>
        </div>
      </Panel>
    </div>
  );

  const renderSection = () => {
    if (activeSection === "Leads") return renderLeads();
    if (activeSection === "Vehicle stock") return renderVehicleStock();
    if (activeSection === "Finance") return renderFinance();
    if (activeSection === "Activity") return renderActivity();
    return renderOverview();
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#050505_0%,#0B0C10_44%,#111820_100%)] text-[#f7f7f2]">
      <div className="section-shell py-8 sm:py-10 lg:py-12">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link href="/demos" className="inline-flex items-center gap-2 text-sm font-semibold text-[#d8d8d2] hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to demos
          </Link>
          <div className="flex flex-wrap gap-2">
            <TrackedWhatsAppLink
              href={whatsappCta.href}
              target="_blank"
              rel="noopener noreferrer"
              location="dealership_demo_header"
              className="cta-secondary"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </TrackedWhatsAppLink>
            <TrackedDemoLink
              href="/contact#lead-form"
              location="dealership_demo_request_system"
              system="dealership"
              className="cta-button"
            >
              Request This System
            </TrackedDemoLink>
          </div>
        </div>

        <div className="overflow-hidden rounded-[8px] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(103,232,249,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] shadow-[0_30px_90px_rgba(0,0,0,0.34)]">
          <div className="border-b border-white/10 p-4 sm:p-5 lg:p-6">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div className="flex gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] border border-white/15 bg-white text-[#0b0c10]">
                  <Car className="h-6 w-6" />
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-white text-sm font-bold text-[#0b0c10]">X</span>
                    <p className="font-heading text-lg font-semibold text-white">Pine X Systems</p>
                    <StatusBadge>Demo Mode</StatusBadge>
                    <StatusBadge tone="blue">Custom Dealership Control System</StatusBadge>
                  </div>
                  <h1 className="mt-4 max-w-4xl font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl">Dealership Command System</h1>
                  <p className="mt-3 max-w-4xl text-base leading-8 text-[#d8d8d2]">
                    A professional dealership management system demo for used vehicle stock, lead response, finance applications, salesperson accountability, delivery readiness, and owner visibility.
                  </p>
                </div>
              </div>

              <div className="rounded-[8px] border border-white/10 bg-black/20 p-2">
                <div className="flex flex-wrap gap-2">
                  {roles.map((role) => (
                    <button key={role} type="button" onClick={() => { setActiveRole(role); setActiveSection(roleDefaults[role]); addActivity(`Switched system into ${role}.`, "owner", "Pine X Systems demo"); }} className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeRole === role ? "bg-white text-[#0b0c10]" : "border border-white/10 bg-white/[0.04] text-[#d8d8d2] hover:border-white/25 hover:text-white"}`}>
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[15.5rem_1fr] lg:p-6">
            <aside className="rounded-[8px] border border-white/10 bg-black/20 p-3">
              <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
                {sections.map((section) => (
                  <button key={section} type="button" onClick={() => { setActiveSection(section); if (section !== "Leads") setLeadStageFilter("All"); }} className={`shrink-0 rounded-[8px] px-4 py-3 text-left text-sm font-semibold transition ${activeSection === section ? "bg-white text-[#0b0c10]" : "text-[#d8d8d2] hover:bg-white/[0.06] hover:text-white"}`}>
                    {section}
                  </button>
                ))}
              </nav>
              <div className="mt-4 hidden rounded-[8px] border border-white/10 bg-white/[0.04] p-4 lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#67E8F9]">{profile.eyebrow}</p>
                <p className="mt-2 text-sm leading-6 text-[#d8d8d2]">{profile.summary}</p>
              </div>
            </aside>

            <main className="min-w-0 space-y-5">
              <div className="rounded-[8px] border border-white/10 bg-black/20 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#67E8F9]">{activeSection} - {activeRole}</p>
                    <h2 className="mt-2 font-heading text-2xl font-semibold text-white">{profile.title}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-[#d8d8d2]">{profile.summary}</p>
                  </div>
                  <TrackedDemoLink
                    href="/contact#lead-form"
                    location="dealership_demo_main_cta"
                    system="dealership"
                    className="cta-button"
                  >
                    Request This Demo <ArrowRight className="h-4 w-4" />
                  </TrackedDemoLink>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} onClick={() => setActiveSection(metric.section)} />)}
              </div>

              {renderSection()}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
