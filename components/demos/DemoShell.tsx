"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, BarChart3, MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { DemoDashboard } from "@/components/demos/DemoDashboard";
import { DemoRoleSwitcher } from "@/components/demos/DemoRoleSwitcher";
import { DemoSidebar } from "@/components/demos/DemoSidebar";
import type { DemoRecord, DemoSection } from "@/lib/demo-data";
import { getDemoSections } from "@/lib/demo-data";
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
  farm: { singular: "task", plural: "tasks", queue: "field queue", detail: "equipment", ownerSection: "Overview", managerSection: "Tasks", staffSection: "Tasks" },
  security: { singular: "incident", plural: "incidents", queue: "shift queue", detail: "check-ins", ownerSection: "Overview", managerSection: "Incidents", staffSection: "Sites" },
  "custom-business": { singular: "workflow", plural: "workflows", queue: "approval queue", detail: "documents", ownerSection: "Overview", managerSection: "Approvals", staffSection: "Workflows" },
};

function roleKindFromLabel(label: string): RoleKind {
  const lower = label.toLowerCase();
  if (lower.includes("manager") || lower.includes("admin") || lower.includes("finance")) return "manager";
  if (lower.includes("technician") || lower.includes("staff") || lower.includes("sales") || lower.includes("worker") || lower.includes("guard") || lower.includes("client")) return "staff";
  return "owner";
}

const moneyFormatter = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 });
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
function statusTone(status: string) {
  if (/ready|approved|resolved|complete|delivered|sold|published/i.test(status)) return "green";
  if (/waiting|pending|docs outstanding|blocked|overdue|low stock|hold|risk|delayed/i.test(status)) return "amber";
  if (/assigned|booked|in progress|contacted|submitted|active|diagnos|receiv|review/i.test(status)) return "blue";
  return "cyan";
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
  const active = records.filter(isActive).length;
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
  if (roleKind === "owner") return `Strategic control view for ${system.shortTitle}: keep margin, risk, and delivery pressure visible.`;
  if (roleKind === "manager") return `Operational queue view for ${system.shortTitle}: keep the ${nouns.queue} flowing and blockers moving.`;
  return `Execution view for ${system.shortTitle}: show assigned work, the next step, and what is blocked.`;
}

function actionLabels(roleKind: RoleKind, nouns: Nouns) {
  if (roleKind === "owner") return [`Generate summary`, `Review ${nouns.detail}`, `Add sample record`] as const;
  if (roleKind === "manager") return [`Move next ${nouns.singular}`, `View ${nouns.queue}`, `Add sample record`] as const;
  return [`Complete ${nouns.singular}`, `Request help`, `Add sample record`] as const;
}

export function DemoShell({ system }: { system: DemoSystem }) {
  const [sections, setSections] = useState<DemoSection[]>(() => getDemoSections(system.slug));
  const [activeRole, setActiveRole] = useState(system.roles[0]);
  const [activeSectionId, setActiveSectionId] = useState<string>(getDemoSections(system.slug)[0]?.id ?? "overview");
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [feed, setFeed] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [accessMode, setAccessMode] = useState<"full" | "limited">("full");
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  useEffect(() => {
    const fresh = getDemoSections(system.slug);
    setSections(fresh);
    setActiveRole(system.roles[0]);
    setActiveSectionId(fresh[0]?.id ?? "overview");
    setSelectedRecordId(null);
    setSearch("");
    setNotice(null);
    setAccessMode("full");
    setActiveMetric(null);
    setFeed([`Loaded ${system.shortTitle} demo.`, "Role-based state is ready."]);
  }, [system.roles, system.shortTitle, system.slug]);

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
  const handleAction = (label: string) => {
    const lower = label.toLowerCase();
    if (lower.includes("summary")) return handleSummary();
    if (lower.includes("access") || lower.includes("permission") || lower.includes("help") || lower.includes("view")) return handleToggleAccess();
    if (lower.includes("add sample")) return handleAddRecord();
    return handleAdvance();
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
  };
  const handleSectionChange = (label: string) => {
    const next = orderedSections.find((item) => item.label === label);
    if (!next) return;
    setActiveSectionId(next.id);
    setSelectedRecordId(null);
    setNotice(`Switched to ${next.label}.`);
    updateFeed(`Viewed ${next.label} in the ${activeRole} mode.`);
  };

  const Icon = demoIconMap[system.icon];
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
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link href="/demos" className="inline-flex items-center gap-2 text-sm font-semibold text-[#d8d8d2] hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Back to demos
          </Link>
          <div className="flex flex-wrap gap-2">
            <a href={whatsappCta.href} target="_blank" rel="noopener noreferrer" className="cta-secondary">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <Link href="/contact#lead-form" className="cta-button">
              Request This System
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-[12px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] shadow-[0_30px_90px_rgba(0,0,0,0.34)]">
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
                      Demo Mode
                    </span>
                  </div>
                  <h1 className="mt-3 font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl">
                    {system.title}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[#a8a8a2]">{roleSummary}</p>
                </div>
              </div>
              <DemoRoleSwitcher roles={system.roles} activeRole={activeRole} onRoleChange={handleRoleChange} />
            </div>
            {notice ? <div className="mt-4 rounded-[8px] border border-[#67E8F9]/20 bg-[#67E8F9]/10 px-4 py-3 text-sm text-[#d8f8ff]">{notice}</div> : null}
          </div>

          <div className="grid gap-0 lg:grid-cols-[14rem_1fr]">
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
                      {section?.subtitle ?? "Role-specific view with live state changes."}
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
        </div>
      </div>
    </div>
  );
}

