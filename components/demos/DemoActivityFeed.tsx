interface DemoActivityFeedProps {
  items: string[];
}

export function DemoActivityFeed({ items }: DemoActivityFeedProps) {
  return (
    <div className="rounded-[8px] border border-white/10 bg-white/[0.035] p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold text-white">Live Activity Feed</h2>
        <span className="live-indicator rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-[#d8d8d2]">
          <span className="live-dot" /> Updating
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {items.slice(0, 7).map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="flex gap-3 rounded-[8px] border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#d8d8d2]"
          >
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#67E8F9]" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
