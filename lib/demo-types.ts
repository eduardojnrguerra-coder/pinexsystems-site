export type DemoRecord = {
  id: string;
  name: string;
  category: string;
  status: string;
  owner: string;
  value: string;
  detail: string;
  stage?: string;
  created?: string;
  priority?: string;
  contact?: string;
  phone?: string;
};

export type DemoMetric = {
  label: string;
  value: string;
  detail: string;
  accent: string;
};

export type DemoAction = {
  id: string;
  label: string;
  primary: boolean;
};

export type DemoAlert = {
  type: "info" | "warning" | "success" | "error";
  message: string;
};

export type DemoSection = {
  id: string;
  label: string;
  subtitle: string;
  metrics: DemoMetric[];
  actions: DemoAction[];
  alerts?: DemoAlert[];
  records?: DemoRecord[];
  activity: string[];
};

export type DemoSystem = {
  slug: string;
  title: string;
  shortTitle: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  icon: string;
  accent: string;
  modules: string[];
  roles: string[];
  tabs: string[];
  metricLabels: string[];
  metrics: { label: string; value: string; detail: string; filter?: string }[];
  records: DemoRecord[];
  pipeline: string[];
  activity: string[];
  primaryAction: string;
  secondaryAction: string;
};

export type DemoIconName =
  | "dealership"
  | "workshop"
  | "agency"
  | "construction"
  | "warehouse"
  | "farm"
  | "security"
  | "custom-business";
