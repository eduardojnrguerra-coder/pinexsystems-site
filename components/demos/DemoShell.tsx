"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { 
  ArrowLeft,
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  FileText, 
  MessageCircle, 
  Package, 
  Plus, 
  RefreshCw, 
  Search, 
  Star, 
  Target, 
  TrendingUp,
  User,
  AlertTriangle,
  CheckCircle,
  Info,
  XCircle
} from "lucide-react";

import { DemoDashboard } from "@/components/demos/DemoDashboard";
import { DemoRoleSwitcher } from "@/components/demos/DemoRoleSwitcher";
import { DemoSidebar } from "@/components/demos/DemoSidebar";
import { demoIconMap, type DemoSystem } from "@/lib/demo-systems";
import { getDemoSections, type DemoSection, type DemoRecord, type DemoMetric } from "@/lib/demo-data";
import { whatsappCta } from "@/lib/site";

interface DemoShellProps {
  system: DemoSystem;
}

function AlertBadge({ type }: { type: "info" | "warning" | "success" | "error" }) {
  const styles = {
    info: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    warning: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    success: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
    error: "text-red-400 bg-red-400/10 border-red-400/30",
  };
  const icons = {
    info: Info,
    warning: AlertTriangle,
    success: CheckCircle,
    error: XCircle,
  };
  const Icon = icons[type];
  
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${styles[type]}`}>
      <Icon className="h-3 w-3" />
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
}

function MetricPill({ metric, active }: { metric: DemoMetric; active: boolean }) {
  return (
    <div 
      className={`group relative overflow-hidden rounded-[8px] border bg-white/[0.035] p-4 transition-all hover:bg-white/[0.06] ${
        active ? "border-white/20" : "border-white/10"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#a8a8a2]">{metric.label}</p>
          <p 
            className="mt-2 font-heading text-2xl font-semibold" 
            style={{ color: active ? metric.accent : "#ffffff" }}
          >
            {metric.value}
          </p>
          <p className="mt-1 text-xs text-[#a8a8a2]">{metric.detail}</p>
        </div>
        <div 
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px]"
          style={{ backgroundColor: `${metric.accent}15` }}
        >
          <TrendingUp className="h-4 w-4" style={{ color: metric.accent }} />
        </div>
      </div>
    </div>
  );
}

function DetailPanel({ 
  record, 
  onClose 
}: { 
  record: DemoRecord; 
  onClose: () => void;
}) {
  const statusColors: Record<string, string> = {
    "New": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Contacted": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "Test Drive": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Finance": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Ready": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Active": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Listed": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Sold": "bg-green-500/20 text-green-400 border-green-500/30",
    "Prep": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "In Progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Diagnosing": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Waiting Parts": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Quality Check": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "Booked": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Approved": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Documents": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Submitted": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Confirmed": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Pending": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Delayed": "bg-red-500/20 text-red-400 border-red-500/30",
    "Material Risk": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Low Stock": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "In Stock": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Dispatch": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Receiving": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Maintenance": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Operational": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Incident": "bg-red-500/20 text-red-400 border-red-500/30",
    "Escalated": "bg-red-500/20 text-red-400 border-red-500/30",
    "Open": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Resolved": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Assigned": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Review": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Client Approval": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Workflow": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Approval": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    "Task": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Report": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "Automation": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "Client Portal": "bg-purple-500/20 text-purple-400 border-purple-500/30",
  };

  const priorityColors: Record<string, string> = {
    High: "text-red-400 bg-red-400/10 border-red-400/30",
    Medium: "text-amber-400 bg-amber-400/10 border-amber-400/30",
    Low: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
  };

  return (
    <div className="rounded-[8px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#a8a8a2]">{record.id}</span>
            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusColors[record.status] || "border-white/20 bg-white/5 text-white"}`}>
              {record.status}
            </span>
            {record.priority && (
              <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${priorityColors[record.priority] || ""}`}>
                {record.priority} Priority
              </span>
            )}
          </div>
          <h3 className="mt-2 font-heading text-lg font-semibold text-white">{record.name}</h3>
          <p className="mt-1 text-sm text-[#a8a8a2]">{record.category}</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-[6px] border border-white/10 bg-white/[0.04] p-2 text-[#a8a8a2] transition hover:bg-white/[0.08] hover:text-white"
        >
          <XCircle className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[6px] border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#a8a8a2]">
            <User className="h-3 w-3" /> Owner
          </div>
          <p className="mt-1.5 text-sm font-medium text-white">{record.owner}</p>
        </div>
        <div className="rounded-[6px] border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#a8a8a2]">
            <Package className="h-3 w-3" /> Value
          </div>
          <p className="mt-1.5 text-sm font-semibold text-white">{record.value}</p>
        </div>
      </div>

      {record.detail && (
        <div className="mt-4 rounded-[6px] border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#a8a8a2]">
            <FileText className="h-3 w-3" /> Details
          </div>
          <p className="mt-1.5 text-sm text-[#d8d8d2]">{record.detail}</p>
        </div>
      )}

      {record.contact && (
        <div className="mt-4 rounded-[6px] border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#a8a8a2]">
            <MessageCircle className="h-3 w-3" /> Contact
          </div>
          <p className="mt-1.5 text-sm text-white">{record.contact}</p>
          {record.phone && <p className="mt-1 text-sm text-[#a8a8a2]">{record.phone}</p>}
        </div>
      )}

      <div className="mt-5 rounded-[6px] border border-white/10 bg-white/[0.03] p-3">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-[#a8a8a2]">
          <Clock className="h-3 w-3" /> Timeline
        </div>
        <div className="mt-3 space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
            <div>
              <p className="text-sm text-white">Record created</p>
              <p className="text-xs text-[#a8a8a2]">{record.created || "Recently"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-blue-400" />
            <div>
              <p className="text-sm text-white">Current status</p>
              <p className="text-xs text-[#a8a8a2]">{record.status}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <button className="flex-1 rounded-[6px] bg-[#67E8F9] px-4 py-2.5 text-sm font-semibold text-[#0b0c10] transition hover:bg-[#5dd5e8]">
          Take Action
        </button>
        <button className="rounded-[6px] border border-white/20 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.08]">
          Edit
        </button>
      </div>
    </div>
  );
}

export function DemoShell({ system }: DemoShellProps) {
  const sections = getDemoSections(system.slug);
  
  const [activeRole, setActiveRole] = useState(system.roles[0]);
  const [activeSectionId, setActiveSectionId] = useState(sections[0].id);
  const [search, setSearch] = useState("");
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);
  const [activity, setActivity] = useState<string[]>(sections[0].activity);
  const [metrics, setMetrics] = useState<DemoMetric[]>(sections[0].metrics);
  const [alerts, setAlerts] = useState<DemoSection["alerts"]>(sections[0].alerts);
  const [actionCount, setActionCount] = useState(0);

  const activeSection = sections.find(s => s.id === activeSectionId) || sections[0];

  const handleSectionChange = useCallback((sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;
    
    setActiveSectionId(sectionId);
    setActivity([`Viewed ${section.label}`, ...activity].slice(0, 10));
    setMetrics(section.metrics);
    setAlerts(section.alerts);
    setSelectedRecordId(null);
  }, [sections, activity]);

  const handleRoleChange = useCallback((role: string) => {
    setActiveRole(role);
    setActivity([`Switched to ${role} view`, ...activity].slice(0, 10));
  }, [activity]);

  const filteredRecords = useMemo(() => {
    if (!activeSection.records) return [];
    const query = search.trim().toLowerCase();
    if (!query) return activeSection.records;
    
    return activeSection.records.filter(record =>
      record.name.toLowerCase().includes(query) ||
      record.id.toLowerCase().includes(query) ||
      record.category.toLowerCase().includes(query) ||
      record.status.toLowerCase().includes(query)
    );
  }, [activeSection.records, search]);

  const selectedRecord = useMemo(() => {
    if (!activeSection.records || !selectedRecordId) return null;
    return activeSection.records.find(r => r.id === selectedRecordId) || null;
  }, [activeSection.records, selectedRecordId]);

  const handlePrimaryAction = useCallback(() => {
    const action = activeSection.actions.find(a => a.primary);
    if (!action) return;
    
    setActionCount(prev => prev + 1);
    setActivity([`${action.label} executed`, ...activity].slice(0, 10));
    
    // Simulate metric changes
    const newMetrics = metrics.map(m => {
      if (m.detail.includes("This") || m.detail.includes("today") || m.detail.includes("week") || m.detail.includes("month")) {
        const num = parseInt(m.value.replace(/[^0-9]/g, "")) || 0;
        const increment = Math.floor(Math.random() * 3) + 1;
        const newValue = num + increment;
        return {
          ...m,
          value: m.value.includes("R") 
            ? `R${(newValue * 1000).toLocaleString()}`
            : newValue.toLocaleString()
        };
      }
      return m;
    });
    setMetrics(newMetrics);
  }, [activeSection.actions, activity, metrics]);

  const handleSecondaryAction = useCallback(() => {
    const action = activeSection.actions.find(a => !a.primary);
    if (!action) return;
    
    setActivity([`${action.label} executed`, ...activity].slice(0, 10));
  }, [activeSection.actions, activity]);

  const handleAddRecord = useCallback(() => {
    if (!activeSection.records || activeSection.records.length === 0) return;
    
    const template = activeSection.records[0];
    const newRecord: DemoRecord = {
      ...template,
      id: `${template.id.split("-")[0]}-${Math.floor(Math.random() * 900) + 100}`,
      name: `New ${activeSection.label.slice(0, -1)} Record`,
      status: activeSection.records[0]?.status || "New",
    };
    
    setActivity([`Added new record: ${newRecord.id}`, ...activity].slice(0, 10));
  }, [activeSection, activity]);

  const handleRecordClick = useCallback((recordId: string) => {
    setSelectedRecordId(recordId);
    const record = activeSection.records?.find(r => r.id === recordId);
    if (record) {
      setActivity([`Selected ${record.name}`, ...activity].slice(0, 10));
    }
  }, [activeSection.records, activity]);

  const Icon = demoIconMap[system.slug as keyof typeof demoIconMap] || demoIconMap.dealership;

  return (
    <div className="bg-[linear-gradient(180deg,#050505_0%,#0B0C10_46%,#111820_100%)] text-[#f7f7f2]">
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

        <div className="rounded-[12px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] shadow-[0_30px_90px_rgba(0,0,0,0.34)] overflow-hidden">
          <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,0.04),transparent)] p-5 sm:p-6">
            <div className="flex gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-white/15 bg-white shadow-lg">
                <Icon className="h-6 w-6 text-[#0b0c10]" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-[6px] bg-white text-sm font-bold text-[#0b0c10] shadow">
                    X
                  </span>
                  <p className="font-heading text-base font-semibold text-white">Pine X Systems</p>
                  <span className="rounded-full border border-[#67E8F9]/30 bg-[#67E8F9]/10 px-3 py-1 text-xs font-semibold text-[#67E8F9]">
                    Demo Mode
                  </span>
                </div>
                <h1 className="mt-3 font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl">
                  {system.title}
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[#a8a8a2]">
                  {activeSection.subtitle}
                </p>
              </div>
            </div>
            <DemoRoleSwitcher
              roles={system.roles}
              activeRole={activeRole}
              onRoleChange={handleRoleChange}
            />
          </div>

          <div className="grid gap-0 lg:grid-cols-[14rem_1fr]">
            <DemoSidebar
              tabs={sections.map(s => s.label)}
              activeTab={activeSection.label}
              onTabChange={handleSectionChange}
            />
            
            <main className="p-4 sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[8px] border border-white/10 bg-black/20 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">{activeSection.label}</p>
                  <p className="text-xs text-[#a8a8a2]">
                    {filteredRecords.length > 0 
                      ? `Viewing ${filteredRecords.length} records as ${activeRole}`
                      : activeSection.subtitle
                    }
                  </p>
                </div>
                {activeSection.records && activeSection.records.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-[#a8a8a2]" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-40 rounded-[6px] border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-white placeholder-[#6b6c70] outline-none focus:border-[#67E8F9]/50 sm:w-56"
                      placeholder="Search records..."
                    />
                  </div>
                )}
              </div>

              {alerts && alerts.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {alerts.map((alert, idx) => (
                    <AlertBadge key={idx} type={alert.type} />
                  ))}
                </div>
              )}

              <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
                {metrics.map((metric, idx) => (
                  <MetricPill key={idx} metric={metric} active={idx === 0} />
                ))}
              </div>

              <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
                <div className="space-y-5">
                  {activeSection.records && activeSection.records.length > 0 ? (
                    <div className="rounded-[8px] border border-white/10 bg-white/[0.035] overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-[700px] w-full border-collapse text-left text-sm">
                          <thead className="border-b border-white/10 bg-white/[0.02] text-xs uppercase text-[#a8a8a2]">
                            <tr>
                              <th className="px-4 py-3 font-medium">Record</th>
                              <th className="px-4 py-3 font-medium">Category</th>
                              <th className="px-4 py-3 font-medium">Status</th>
                              <th className="px-4 py-3 font-medium">Owner</th>
                              <th className="px-4 py-3 font-medium">Value</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/10">
                            {filteredRecords.slice(0, 5).map((record) => (
                              <tr
                                key={record.id}
                                onClick={() => handleRecordClick(record.id)}
                                className={`cursor-pointer transition hover:bg-white/[0.05] ${
                                  selectedRecordId === record.id ? "bg-white/[0.08]" : ""
                                }`}
                              >
                                <td className="px-4 py-4">
                                  <p className="font-semibold text-white">{record.name}</p>
                                  <p className="mt-1 text-xs text-[#a8a8a2]">{record.id} - {record.detail}</p>
                                </td>
                                <td className="px-4 py-4 text-[#d8d8d2]">{record.category}</td>
                                <td className="px-4 py-4">
                                  <span className="rounded-full border border-[#67E8F9]/25 bg-[#67E8F9]/10 px-3 py-1 text-xs font-semibold text-[#67E8F9]">
                                    {record.status}
                                  </span>
                                </td>
                                <td className="px-4 py-4 text-[#d8d8d2]">{record.owner}</td>
                                <td className="px-4 py-4 font-semibold text-white">{record.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {filteredRecords.length === 0 && (
                        <div className="p-6 text-center text-sm text-[#a8a8a2]">
                          No records match your search.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-8 text-center">
                      <Package className="mx-auto h-10 w-10 text-[#a8a8a2]" />
                      <p className="mt-3 text-sm text-[#a8a8a2]">No records to display in this view</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {selectedRecord ? (
                    <DetailPanel 
                      record={selectedRecord} 
                      onClose={() => setSelectedRecordId(null)} 
                    />
                  ) : (
                    <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
                      <h3 className="font-heading text-base font-semibold text-white">Record Details</h3>
                      <p className="mt-2 text-sm text-[#a8a8a2]">
                        Click on a record in the table to view its details, timeline, and available actions.
                      </p>
                    </div>
                  )}

                  {activeSection.actions.length > 0 && (
                    <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
                      <h3 className="font-heading text-base font-semibold text-white">Quick Actions</h3>
                      <div className="mt-3 grid gap-2">
                        {activeSection.actions.map((action) => (
                          <button
                            key={action.id}
                            type="button"
                            onClick={action.primary ? handlePrimaryAction : handleSecondaryAction}
                            className={`flex items-center justify-center gap-2 rounded-[6px] px-4 py-2.5 text-sm font-medium transition ${
                              action.primary
                                ? "bg-[#67E8F9] text-[#0b0c10] hover:bg-[#5dd5e8]"
                                : "border border-white/20 bg-white/[0.04] text-white hover:bg-white/[0.08]"
                            }`}
                          >
                            {action.primary ? <Plus className="h-4 w-4" /> : <RefreshCw className="h-4 w-4" />}
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-5">
                    <h3 className="font-heading text-base font-semibold text-white">Recent Activity</h3>
                    <div className="mt-3 space-y-2">
                      {activity.slice(0, 5).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#67E8F9]" />
                          <span className="text-[#a8a8a2]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[8px] border border-[#67E8F9]/20 bg-[linear-gradient(180deg,rgba(103,232,249,0.11),rgba(255,255,255,0.035))] p-5">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-[#67E8F9]" />
                      <p className="text-[11px] uppercase tracking-[0.12em] text-[#67E8F9]">
                        Pine X Systems demo
                      </p>
                    </div>
                    <h3 className="mt-2 font-heading text-base font-semibold text-white">
                      Want this for your business?
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#a8a8a2]">
                      This is a tailored preview. We will build the exact system your operation needs.
                    </p>
                    <div className="mt-4 grid gap-2">
                      <Link href="/contact#lead-form" className="cta-button justify-center">
                        Request Custom Demo <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href={whatsappCta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cta-secondary justify-center"
                      >
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}