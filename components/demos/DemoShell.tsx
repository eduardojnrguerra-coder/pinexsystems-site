"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, MessageCircle } from "lucide-react";

import { DemoDashboard } from "@/components/demos/DemoDashboard";
import { DemoRoleSwitcher } from "@/components/demos/DemoRoleSwitcher";
import { DemoSidebar } from "@/components/demos/DemoSidebar";
import { demoIconMap, type DemoRecord, type DemoSystem } from "@/lib/demo-systems";
import { whatsappCta } from "@/lib/site";

interface DemoShellProps {
  system: DemoSystem;
}

function nextStage(current: string, stages: string[]) {
  const index = stages.indexOf(current);
  if (index < 0) return stages[0] ?? current;
  return stages[(index + 1) % stages.length] ?? current;
}

export function DemoShell({ system }: DemoShellProps) {
  const [activeRole, setActiveRole] = useState(system.roles[0]);
  const [activeTab, setActiveTab] = useState(system.tabs[0]);
  const [records, setRecords] = useState<DemoRecord[]>(system.records);
  const [activity, setActivity] = useState<string[]>(system.activity);
  const [search, setSearch] = useState("");
  const [activeMetric, setActiveMetric] = useState<string | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(
    system.records[0]?.id ?? null,
  );

  const roleFilteredRecords = useMemo(() => {
    if (activeRole.toLowerCase().includes("owner")) return records;
    if (activeRole.toLowerCase().includes("client")) return records.slice(0, 3);
    return records.filter((record, index) => index % 2 === 0 || record.owner.toLowerCase().includes("manager"));
  }, [activeRole, records]);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();

    return roleFilteredRecords.filter((record) => {
      const matchesMetric = activeMetric ? record.status === activeMetric : true;
      const matchesSearch = query
        ? [record.id, record.name, record.category, record.status, record.owner, record.detail]
            .join(" ")
            .toLowerCase()
            .includes(query)
        : true;

      return matchesMetric && matchesSearch;
    });
  }, [activeMetric, roleFilteredRecords, search]);

  const pushActivity = (message: string) => {
    setActivity((current) => [`${message} - ${activeRole}`, ...current].slice(0, 8));
  };

  const selectedRecord =
    records.find((record) => record.id === selectedRecordId) ?? records[0];

  const handlePrimaryAction = () => {
    if (!selectedRecord) return;
    const next = nextStage(selectedRecord.status, system.pipeline);

    setRecords((current) =>
      current.map((record) =>
        record.id === selectedRecord.id ? { ...record, status: next } : record,
      ),
    );
    setActiveMetric(null);
    setActiveTab(system.tabs[1] ?? system.tabs[0]);
    pushActivity(`${selectedRecord.name} moved to ${next}`);
  };

  const handleSecondaryAction = () => {
    if (!selectedRecord) return;
    pushActivity(`${system.secondaryAction} for ${selectedRecord.name}`);
  };

  const handleAddRecord = () => {
    const template = system.records[0];
    if (!template) return;

    const newRecord = {
      ...template,
      id: `${system.slug.slice(0, 2).toUpperCase()}-${records.length + 701}`,
      name: `New sample ${system.shortTitle.toLowerCase()} record`,
      status: system.pipeline[0] ?? template.status,
      detail: "Added inside the live frontend demo",
    };

    setRecords((current) => [newRecord, ...current]);
    setSelectedRecordId(newRecord.id);
    setActiveMetric(null);
    pushActivity(`Added ${newRecord.name}`);
  };

  const Icon = demoIconMap[system.icon];

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

        <div className="rounded-[8px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-4 shadow-[0_30px_90px_rgba(0,0,0,0.34)] sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-5 border-b border-white/10 pb-5">
            <div className="flex gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] border border-white/15 bg-white text-[#0b0c10]">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] bg-white text-sm font-bold text-[#0b0c10]">
                    X
                  </span>
                  <p className="font-heading text-lg font-semibold text-white">Pine X Systems</p>
                  <span className="rounded-full border border-[#67E8F9]/30 bg-[#67E8F9]/10 px-3 py-1 text-xs font-semibold text-[#67E8F9]">
                    Demo Mode
                  </span>
                </div>
                <h1 className="mt-4 font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl">
                  {system.title}
                </h1>
                <p className="mt-3 max-w-3xl text-base leading-8 text-[#d8d8d2]">
                  {system.description}
                </p>
                <p className="mt-2 text-sm font-semibold text-[#67E8F9]">
                  Custom Business Control System
                </p>
              </div>
            </div>
            <DemoRoleSwitcher
              roles={system.roles}
              activeRole={activeRole}
              onRoleChange={(role) => {
                setActiveRole(role);
                pushActivity(`Switched to ${role}`);
              }}
            />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[15rem_1fr]">
            <DemoSidebar
              tabs={system.tabs}
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab);
                pushActivity(`Opened ${tab} view`);
              }}
            />
            <main>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-[8px] border border-white/10 bg-black/20 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">{activeTab}</p>
                  <p className="text-xs text-[#a8a8a2]">
                    Viewing {filteredRecords.length} records as {activeRole}
                  </p>
                </div>
                {activeMetric ? (
                  <button
                    type="button"
                    onClick={() => setActiveMetric(null)}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-[#d8d8d2]"
                  >
                    Clear metric filter: {activeMetric}
                  </button>
                ) : null}
              </div>

              <DemoDashboard
                system={system}
                records={records}
                filteredRecords={filteredRecords}
                activity={activity}
                activeMetric={activeMetric}
                selectedRecordId={selectedRecordId}
                search={search}
                onSearchChange={setSearch}
                onMetricClick={(filter) => {
                  setActiveMetric((current) => (current === filter ? null : filter));
                  if (filter) setActiveTab(system.tabs[1] ?? system.tabs[0]);
                }}
                onSelectRecord={setSelectedRecordId}
                onPrimaryAction={handlePrimaryAction}
                onSecondaryAction={handleSecondaryAction}
                onAddRecord={handleAddRecord}
              />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
