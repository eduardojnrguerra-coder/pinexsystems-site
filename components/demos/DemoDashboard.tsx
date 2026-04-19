import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

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
  selectedRecordId: string | null;
  search: string;
  onSearchChange: (value: string) => void;
  onMetricClick: (filter: string | null) => void;
  onSelectRecord: (id: string) => void;
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
  onAddRecord: () => void;
}

export function DemoDashboard({
  system,
  records,
  filteredRecords,
  activity,
  activeMetric,
  selectedRecordId,
  search,
  onSearchChange,
  onMetricClick,
  onSelectRecord,
  onPrimaryAction,
  onSecondaryAction,
  onAddRecord,
}: DemoDashboardProps) {
  return (
    <div className="space-y-5">
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

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="font-heading text-xl font-semibold text-white">System Records</h2>
                <p className="mt-1 text-sm text-[#a8a8a2]">
                  Search, filter, select, and move sample records in this frontend-only demo.
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

        <div className="space-y-5">
          <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4">
            <h2 className="font-heading text-lg font-semibold text-white">Demo Actions</h2>
            <p className="mt-2 text-sm leading-6 text-[#d8d8d2]">
              These buttons update the sample dashboard and activity feed using local React state.
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
              Request this system demo and we will map the first owner dashboard,
              staff workflow, and automation layer for your business.
            </p>
            <div className="mt-4 grid gap-2">
              <Link href="/contact#lead-form" className="cta-button justify-center">
                Request This System Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-secondary justify-center"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Pine X Systems
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
