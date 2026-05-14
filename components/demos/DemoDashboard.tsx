import { ArrowRight, MessageCircle } from "lucide-react";

import { TrackedDemoLink } from "@/components/analytics/tracked-demo-link";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-whatsapp-link";
import type { DemoRecord, DemoSystem } from "@/lib/demo-systems";
import { DemoActivityFeed } from "@/components/demos/DemoActivityFeed";
import { DemoMetricCard } from "@/components/demos/DemoMetricCard";
import { DemoPipeline } from "@/components/demos/DemoPipeline";
import { DemoTable } from "@/components/demos/DemoTable";
import { whatsappCta } from "@/lib/site";

interface DemoDashboardProps {
  system: DemoSystem;
  records: DemoRecord[];
  filteredRecords: DemoRecord[];
  activity: string[];
  activeMetric: string | null;
  accessMode: "full" | "limited";
  roleSummary: string;
  selectedRecordId: string | null;
  selectedRecord: DemoRecord | null;
  search: string;
  onSearchChange: (value: string) => void;
  onMetricClick: (filter: string | null) => void;
  onSelectRecord: (id: string) => void;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  onAddRecord: () => void;
  onDetailAction: (kind: "advance" | "toggle-access") => void;
}

export function DemoDashboard({
  system,
  records,
  filteredRecords,
  activity,
  activeMetric,
  accessMode,
  roleSummary,
  selectedRecordId,
  selectedRecord,
  search,
  onSearchChange,
  onMetricClick,
  onSelectRecord,
  onPrimaryAction,
  onSecondaryAction,
  onAddRecord,
  onDetailAction,
}: DemoDashboardProps) {
  const isWorkshopDemo = system.slug === "workshop";
  const contactHref = isWorkshopDemo
    ? "/contact?demo_slug=workshop&industry_slug=workshops&lead_intent=demo_page#lead-form"
    : "/contact#lead-form";
  const whatsappHref = isWorkshopDemo
    ? `${whatsappCta.href}?text=${encodeURIComponent(
        "Hi Eddy, I saw the Workshop Control System demo and want to talk about my workshop flow.",
      )}`
    : whatsappCta.href;

  return (
    <div className="min-w-0 space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {system.metrics.map((metric) => (
          <DemoMetricCard
            key={metric.label}
            metric={metric}
            accent={system.accent}
            active={activeMetric === metric.filter}
            onClick={() => onMetricClick(metric.filter ?? null)}
          />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.12fr)_minmax(19rem,0.88fr)] 2xl:grid-cols-[minmax(0,1.18fr)_minmax(21rem,0.82fr)] xl:items-start">
        <div className="min-w-0 space-y-5">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-heading text-xl font-semibold text-white">System Records</h2>
                <p className="mt-1 text-sm text-[#a8a8a2]">
                  Search, filter, select, and move sample records in this interactive concept preview.
                </p>
              </div>
              <input
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                className="form-input min-w-0 sm:w-72"
                placeholder="Search records..."
              />
            </div>
            <div className="mt-4">
              <DemoTable
                records={filteredRecords}
                selectedRecordId={selectedRecordId}
                onSelectRecord={onSelectRecord}
              />
            </div>
          </div>

          <DemoPipeline stages={system.pipeline} records={records} accent={system.accent} />
        </div>

        <div className="min-w-0 space-y-5">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4">
            <h2 className="font-heading text-lg font-semibold text-white">Record Details</h2>
            {selectedRecord ? (
              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs text-[#a8a8a2]">{selectedRecord.id}</span>
                  <span className="rounded-full border border-[#67E8F9]/25 bg-[#67E8F9]/10 px-3 py-1 text-xs font-semibold text-[#67E8F9]">
                    {selectedRecord.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{selectedRecord.name}</p>
                  <p className="mt-1 text-xs text-[#a8a8a2]">
                    {selectedRecord.category} - {selectedRecord.owner}
                  </p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-[6px] border border-white/10 bg-black/20 p-3">
                    <p className="text-[11px] uppercase tracking-[0.08em] text-[#a8a8a2]">Value</p>
                    <p className="mt-1 text-sm font-semibold text-white">{selectedRecord.value}</p>
                  </div>
                  <div className="rounded-[6px] border border-white/10 bg-black/20 p-3">
                    <p className="text-[11px] uppercase tracking-[0.08em] text-[#a8a8a2]">Access</p>
                    <p className="mt-1 text-sm font-semibold text-white">
                      {accessMode === "full" ? "Full detail" : "Limited detail"}
                    </p>
                  </div>
                </div>
                <div className="rounded-[6px] border border-white/10 bg-black/20 p-3">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-[#a8a8a2]">Summary</p>
                  <p className="mt-1 text-sm leading-6 text-[#d8d8d2]">
                    {accessMode === "limited" ? "Execution view only exposes what the team needs right now." : selectedRecord.detail}
                  </p>
                </div>
                <div className="rounded-[6px] border border-white/10 bg-black/20 p-3">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-[#a8a8a2]">Role view</p>
                  <p className="mt-1 text-sm leading-6 text-[#d8d8d2]">{roleSummary}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => onDetailAction("advance")} className="cta-button flex-1 justify-center">
                    Advance
                  </button>
                  <button type="button" onClick={() => onDetailAction("toggle-access")} className="cta-secondary flex-1 justify-center">
                    Toggle Access
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm leading-6 text-[#a8a8a2]">
                Click a record to open the detail panel and visible actions.
              </p>
            )}
          </div>

          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4">
            <h2 className="font-heading text-lg font-semibold text-white">Demo Actions</h2>
            <p className="mt-2 text-sm leading-6 text-[#d8d8d2]">
              These example workflow actions update the sample dashboard and activity feed.
            </p>
            <div className="mt-4 grid gap-2">
              <button type="button" onClick={onPrimaryAction} className="cta-button justify-center">
                {system.primaryAction}
              </button>
              <button type="button" onClick={onSecondaryAction} className="cta-secondary justify-center">
                {system.secondaryAction}
              </button>
              <button type="button" onClick={onAddRecord} className="cta-secondary justify-center">
                Add sample record
              </button>
            </div>
          </div>

          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4">
            <h2 className="font-heading text-lg font-semibold text-white">Modules Included</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {system.modules.map((module) => (
                <span
                  key={module}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-[#d8d8d2]"
                >
                  {module}
                </span>
              ))}
            </div>
          </div>

          <DemoActivityFeed items={activity} />

          <div className="rounded-[8px] border border-[#67E8F9]/20 bg-[linear-gradient(180deg,rgba(103,232,249,0.11),rgba(255,255,255,0.035))] p-4">
            <p className="text-[11px] uppercase text-[#67E8F9]">
              Pine X Systems demo
            </p>
            <h2 className="mt-2 font-heading text-lg font-semibold text-white">
              Want this shaped around your workflow?
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#d8d8d2]">
              Request a free system audit and we will map the first owner dashboard,
              staff workflow, and automation layer for your business.
            </p>
            <div className="mt-4 grid gap-2">
              <TrackedDemoLink
                href={contactHref}
                location="demo_dashboard_request_system"
                system={system.title}
                className="cta-button justify-center"
                data-event="free_audit_click"
                data-demo-slug={system.slug}
                data-industry-slug={isWorkshopDemo ? "workshops" : undefined}
                data-lead-intent={isWorkshopDemo ? "demo_page" : undefined}
              >
                Get My Free System Audit <ArrowRight className="h-4 w-4" />
              </TrackedDemoLink>
              <TrackedWhatsAppLink
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                location="demo_dashboard_whatsapp"
                className="cta-secondary justify-center"
                data-event="whatsapp_click"
                data-demo-slug={system.slug}
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Eddy
              </TrackedWhatsAppLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

