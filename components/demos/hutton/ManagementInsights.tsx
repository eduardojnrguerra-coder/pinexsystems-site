import type {
  HuttonInboxMessage,
  HuttonJob,
  HuttonPartRequest,
  HuttonTransportTask,
} from "@/lib/hutton-service-types";
import {
  HuttonPanel,
  HuttonPanelHeader,
  HuttonStatCard,
} from "@/components/demos/hutton/HuttonUi";

export function ManagementInsights({
  jobs,
  requests,
  transport,
  inbox,
}: {
  jobs: HuttonJob[];
  requests: HuttonPartRequest[];
  transport: HuttonTransportTask[];
  inbox: HuttonInboxMessage[];
}) {
  const completed = jobs.filter((job) => /Ready|Delivered|Closed/.test(job.status)).length;
  const delayed = jobs.filter((job) => /Waiting/.test(job.status)).length;
  const urgentInbox = inbox.filter((item) => item.urgent).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <HuttonStatCard label="Cycle flow" value={`${completed}/${jobs.length}`} detail="Jobs at handover-ready or beyond." tone="green" />
        <HuttonStatCard label="Delay pressure" value={`${delayed}`} detail="Jobs paused on approval or supply constraints." tone="amber" />
        <HuttonStatCard label="Parts requests" value={`${requests.length}`} detail="Tracked across requested, ordered, arrived, installed, and backordered." tone="blue" />
        <HuttonStatCard label="Urgent inbox" value={`${urgentInbox}`} detail="Messages needing same-day management attention." tone="red" />
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <HuttonPanel className="p-5">
          <HuttonPanelHeader eyebrow="Management view" title="Operational highlights" description="High-signal notes for a demo-ready manager dashboard." />
          <div className="space-y-3 text-sm leading-6 text-[#555962]">
            <p>Workshop throughput is strongest when approvals happen before 11:00 and parts are sourced from same-day suppliers.</p>
            <p>Transport-linked jobs are now visible as operational dependencies instead of separate admin work.</p>
            <p>WhatsApp updates are positioned as a workflow output, not a separate manual task list.</p>
          </div>
        </HuttonPanel>

        <HuttonPanel className="p-5">
          <HuttonPanelHeader eyebrow="Risk focus" title="Current pressure points" description="These cards are intentionally management-facing and demo-friendly." />
          <div className="space-y-3">
            <div className="rounded-[10px] border border-[#F5D36C]/40 bg-[#fff9ea] p-4 text-sm leading-6 text-[#6b5c2a]">
              Approval delay on HM-24021 is the clearest candidate for advisor escalation.
            </div>
            <div className="rounded-[10px] border border-[#60A5FA]/25 bg-[#eff6ff] p-4 text-sm leading-6 text-[#405266]">
              Supplier ETA on HM-24018 determines whether the shuttle van misses its morning run.
            </div>
          </div>
        </HuttonPanel>

        <HuttonPanel className="p-5">
          <HuttonPanelHeader eyebrow="Transport & comms" title="Customer experience signals" description="A concise management view of response pressure, transport promises, and communication risk." />
          <div className="space-y-3 text-sm leading-6 text-[#555962]">
            <p>{transport.length} live transport tasks are visible to reception and shuttle coordination.</p>
            <p>{inbox.length} inbox items were analysed, with routing suggestions attached for fast triage.</p>
            <p>Same-day readiness messages are already prepared as workflow outputs for completed jobs.</p>
          </div>
        </HuttonPanel>
      </div>
    </div>
  );
}
