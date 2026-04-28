import { ArrowRight, MessageCircleMore, Route, UserRound, Wrench } from "lucide-react";

import {
  HuttonProgress,
  HuttonStatusBadge,
} from "@/components/demos/hutton/HuttonUi";
import type {
  HuttonClient,
  HuttonJob,
  HuttonTechnician,
  HuttonVehicle,
} from "@/lib/hutton-service-types";

function priorityTone(priority: HuttonJob["priority"]) {
  if (priority === "Urgent") return "Urgent";
  if (priority === "High") return "High";
  if (priority === "Low") return "Low";
  return "Normal";
}

export function HuttonJobCard({
  job,
  client,
  vehicle,
  technician,
  onAdvance,
  onOpen,
  compact = false,
}: {
  job: HuttonJob;
  client: HuttonClient;
  vehicle: HuttonVehicle;
  technician?: HuttonTechnician;
  onAdvance: (jobId: string) => void;
  onOpen: (jobId: string) => void;
  compact?: boolean;
}) {
  return (
    <div className="rounded-[12px] border border-[#111111]/10 bg-white p-4 shadow-[0_10px_24px_rgba(17,17,17,0.06)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <button
            type="button"
            onClick={() => onOpen(job.id)}
            className="text-left font-heading text-lg font-semibold text-[#111111] hover:text-[#1d4ed8]"
          >
            {job.id}
          </button>
          <p className="mt-1 text-sm font-medium text-[#111111]">{client.name}</p>
          <p className="mt-1 text-xs text-[#7b7e86]">
            {vehicle.registration} - {vehicle.make} {vehicle.model}
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          <HuttonStatusBadge value={job.status} />
          <HuttonStatusBadge value={priorityTone(job.priority)} />
        </div>
      </div>

      <div className="mt-4">
        <HuttonProgress value={job.progressPercent} />
      </div>

      <div className={`mt-4 grid gap-3 ${compact ? "grid-cols-1" : "sm:grid-cols-2"}`}>
        <div className="flex items-center gap-2 text-sm text-[#555962]">
          <UserRound className="h-4 w-4 text-[#60A5FA]" />
          {technician?.name ?? job.technicianId}
        </div>
        <div className="flex items-center gap-2 text-sm text-[#555962]">
          <Wrench className="h-4 w-4 text-[#60A5FA]" />
          {job.etaLabel}
        </div>
        <div className="flex items-center gap-2 text-sm text-[#555962]">
          <Route className="h-4 w-4 text-[#60A5FA]" />
          {job.transportRequired ? "Transport required" : "No transport"}
        </div>
        <div className="flex items-center gap-2 text-sm text-[#555962]">
          <MessageCircleMore className="h-4 w-4 text-[#60A5FA]" />
          {job.whatsappStatus}
        </div>
      </div>

      <div className="mt-4 rounded-[10px] border border-[#111111]/8 bg-[#FAFAF7] px-3 py-3">
        <p className="text-[11px] uppercase tracking-[0.14em] text-[#7b7e86]">Next action</p>
        <p className="mt-2 text-sm leading-6 text-[#555962]">{job.nextStep}</p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onAdvance(job.id)}
          className="cta-button flex-1 justify-center"
        >
          Advance stage <ArrowRight className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onOpen(job.id)}
          className="cta-secondary flex-1 justify-center"
        >
          Open job
        </button>
      </div>
    </div>
  );
}

