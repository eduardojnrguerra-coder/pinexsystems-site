import type { LucideProps } from "lucide-react";
import {
  Banknote,
  BarChart3,
  Boxes,
  ClipboardList,
  Globe,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";

const iconRegistry = {
  "layout-dashboard": LayoutDashboard,
  target: Target,
  "trending-up": TrendingUp,
  users: Users,
  "clipboard-list": ClipboardList,
  boxes: Boxes,
  "message-square": MessageSquare,
  "bar-chart-3": BarChart3,
  banknote: Banknote,
  globe: Globe,
  settings: Settings,
  sparkles: Sparkles,
  wrench: Wrench,
} as const;

type IconName = keyof typeof iconRegistry;

interface IconMapProps extends LucideProps {
  name: string;
}

export function IconMap({ name, ...props }: IconMapProps) {
  const Icon = iconRegistry[name as IconName] ?? Sparkles;
  return <Icon {...props} />;
}
