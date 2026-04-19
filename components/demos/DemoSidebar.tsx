interface DemoSidebarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function DemoSidebar({ tabs, activeTab, onTabChange }: DemoSidebarProps) {
  return (
    <aside className="demo-sidebar rounded-[8px] border border-white/10 bg-white/[0.035] p-3">
      <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`shrink-0 rounded-[8px] px-4 py-3 text-left text-sm font-semibold transition ${
              activeTab === tab
                ? "bg-white text-[#0b0c10]"
                : "text-[#d8d8d2] hover:bg-white/[0.06] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </aside>
  );
}
