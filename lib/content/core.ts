import type {
  DemoCard,
  FeatureCard,
  FaqItem,
  IndustryCard,
  ProcessStep,
  ServiceDetail,
  StatItem,
} from "@/lib/types";

export const heroMetrics = [
  "Lead Tracking",
  "Staff Control",
  "Job Management",
  "Owner Dashboards",
  "Automation",
  "Reports",
  "Stock Visibility",
];

export const chaosPainPoints = [
  "Leads get lost",
  "Staff updates happen over WhatsApp",
  "Owners have no live overview",
  "Customers are not followed up properly",
  "Admin is manual",
  "Stock is tracked badly",
  "Reports are late or inaccurate",
  "Departments use disconnected tools",
];

export const solutionModules: FeatureCard[] = [
  {
    title: "Owner Command Dashboard",
    description:
      "See revenue, leads, jobs, staff and risks in one live command screen.",
    icon: "layout-dashboard",
  },
  {
    title: "Lead Management",
    description:
      "Capture every lead, assign owners, trigger reminders and prevent missed opportunities.",
    icon: "target",
  },
  {
    title: "Sales Pipeline",
    description:
      "Track each deal from first contact to payment with clear stage visibility.",
    icon: "trending-up",
  },
  {
    title: "Staff Task Tracking",
    description:
      "Know who is responsible, what is overdue, and where performance is slipping.",
    icon: "users",
  },
  {
    title: "Job Cards",
    description:
      "Create structured job cards with status, timelines, customer notes and handovers.",
    icon: "clipboard-list",
  },
  {
    title: "Stock / Inventory Control",
    description:
      "Track stock movement, reorder alerts and inventory value without spreadsheet chaos.",
    icon: "boxes",
  },
  {
    title: "Client Follow-Up",
    description:
      "Automate follow-up sequences so no customer goes silent after first contact.",
    icon: "message-square",
  },
  {
    title: "Automated Reports",
    description:
      "Generate daily or weekly operational and performance reports automatically.",
    icon: "bar-chart-3",
  },
  {
    title: "Finance Visibility",
    description:
      "Watch margins, cash movement and debt indicators from one owner-facing view.",
    icon: "banknote",
  },
  {
    title: "Customer Portal",
    description:
      "Give clients a modern portal for updates, documents, approvals and job progress.",
    icon: "globe",
  },
  {
    title: "Internal Admin Tools",
    description:
      "Digitise approvals, handovers and repeat admin tasks into clear workflows.",
    icon: "settings",
  },
  {
    title: "AI Assistance and Smart Recommendations",
    description:
      "Use AI prompts and guidance to speed up repetitive work and improve decisions.",
    icon: "sparkles",
  },
];

export const industriesPreview: IndustryCard[] = [
  {
    title: "Car Dealership Systems",
    subtitle: "Vehicle Sales",
    highlights: [
      "Vehicle stock control",
      "Lead assignment",
      "Finance tracking",
      "Owner sales dashboard",
    ],
  },
  {
    title: "Workshop Management Systems",
    subtitle: "Auto Repairs",
    highlights: [
      "Job cards",
      "Mechanic task allocation",
      "Parts tracking",
      "Booking workflows",
    ],
  },
  {
    title: "Construction & Contractor Systems",
    subtitle: "Project Delivery",
    highlights: [
      "Site progress tracking",
      "Material visibility",
      "Subcontractor accountability",
      "Client reporting",
    ],
  },
  {
    title: "Agency Management Systems",
    subtitle: "Client Services",
    highlights: [
      "Campaign pipeline",
      "Team tasks",
      "Client dashboards",
      "Monthly reporting",
    ],
  },
  {
    title: "Farm & Warehouse Systems",
    subtitle: "Stock & Dispatch",
    highlights: [
      "Inventory movement",
      "Supplier order workflow",
      "Dispatch tracking",
      "Live owner metrics",
    ],
  },
  {
    title: "Security & Operations Systems",
    subtitle: "Field Control",
    highlights: [
      "Rosters and shifts",
      "Incident logging",
      "Guard tracking",
      "Operations visibility",
    ],
  },
  {
    title: "Custom Business Portals",
    subtitle: "Owner + Team + Client",
    highlights: [
      "Role-based views",
      "Approval routes",
      "Document hubs",
      "Unified communication",
    ],
  },
];

export const homeDemoCards: DemoCard[] = [
  {
    title: "Dealership Command System",
    summary:
      "Built for sales teams, stock managers and owners who need one control layer.",
    features: [
      "Vehicle stock + photos + status",
      "Lead pipeline per salesperson",
      "Finance application tracking",
      "Owner dashboard with conversion metrics",
    ],
  },
  {
    title: "Agency Operations System",
    summary:
      "A custom operating platform for campaign delivery, client reporting and team control.",
    features: [
      "Campaign timeline and delivery milestones",
      "Client portal and report automation",
      "Lead-to-client lifecycle tracking",
      "Account manager and task visibility",
    ],
  },
  {
    title: "Workshop Control System",
    summary:
      "Designed for workshops that need smooth job flow from booking to invoice.",
    features: [
      "Digital job cards with statuses",
      "Mechanic queue and accountability",
      "Parts and labour cost tracking",
      "Customer updates and ready-to-bill history",
    ],
  },
  {
    title: "Custom Owner Dashboard",
    summary:
      "A command dashboard that gives owners live clarity across departments.",
    features: [
      "Leads, sales, jobs and stock in one view",
      "Daily risk and performance flags",
      "Automated management reports",
      "Mobile-friendly executive visibility",
    ],
  },
];

export const whyStats: StatItem[] = [
  {
    label: "Custom Built",
    value: 100,
    suffix: "%",
    description: "Designed around your workflow, not generic templates.",
  },
  {
    label: "Industries Served",
    value: 8,
    suffix: "+",
    description: "From dealerships to security and logistics operations.",
  },
  {
    label: "System Modules",
    value: 50,
    suffix: "+",
    description: "Build only what your business needs.",
  },
  {
    label: "Free Demo Call",
    value: 30,
    suffix: " min",
    description: "Practical and focused on your operation.",
  },
];

export const whyBenefits = [
  "Built around your business, not forced templates",
  "Designed to save time and increase control",
  "Helps prevent missed leads and weak follow-up",
  "Gives owners live visibility",
  "Makes staff accountability easier",
  "Can grow as the business grows",
  "Looks professional enough for investors, partners, and clients",
  "Replaces scattered tools with one central system",
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discovery Call",
    description:
      "We map your current operation, pain points, and the numbers you need to control.",
  },
  {
    step: "02",
    title: "System Blueprint",
    description:
      "You get a practical blueprint for dashboards, workflows, automations, and user roles.",
  },
  {
    step: "03",
    title: "Demo Build",
    description:
      "You review a working demo first, so you can validate flow before full rollout.",
  },
  {
    step: "04",
    title: "Build & Integrate",
    description:
      "We implement the complete system, including integrations and operational logic.",
  },
  {
    step: "05",
    title: "Launch & Improve",
    description:
      "We launch the platform, train your team, and evolve it as your business grows.",
  },
];

export const homeFaq: FaqItem[] = [
  {
    question: "Is this just a website?",
    answer:
      "No. Pine X Systems builds custom business systems that handle live workflows, accountability, operational tracking, and owner visibility. It is an operating platform, not only a marketing website.",
  },
  {
    question: "Can the system be customized?",
    answer:
      "Yes. Every module is built around how your team works. You choose what is needed now and expand as your business grows.",
  },
  {
    question: "Do I need to know technology?",
    answer:
      "No technical background is required. We structure the system around practical business steps and train your team on how to use it.",
  },
  {
    question:
      "Can you build dashboards for owners and separate views for staff?",
    answer:
      "Yes. We build role-based views so owners, managers, sales teams, and operations staff each get the information they need.",
  },
  {
    question: "Can this help me get more leads?",
    answer:
      "The system can help you capture and follow up leads consistently, reduce leakage, and improve conversion process visibility.",
  },
  {
    question: "Can you build demos for my industry?",
    answer:
      "Yes. We prepare practical demo flows for industries such as dealerships, workshops, agencies, construction, warehouses, and security operations.",
  },
];

export const fullServiceDetails: ServiceDetail[] = [
  {
    title: "Custom Business Systems",
    description:
      "A complete custom operations layer built around your exact business model.",
    problem:
      "Most businesses use disconnected apps that do not reflect real workflows.",
    benefit:
      "You get one central system for visibility, control, and process consistency.",
  },
  {
    title: "Owner Dashboards",
    description:
      "Executive command dashboards for live business performance tracking.",
    problem:
      "Owners often make decisions with delayed reports or incomplete data.",
    benefit:
      "You see key numbers, risks, and priorities in real time from one screen.",
  },
  {
    title: "Lead Management Systems",
    description:
      "Structured lead capture, assignment, follow-up, and conversion tracking.",
    problem:
      "Leads are lost in chats, manual notes, and delayed follow-up habits.",
    benefit: "Better response speed, less lead leakage, and clearer pipeline flow.",
  },
  {
    title: "CRM & Sales Pipelines",
    description:
      "Sales pipeline logic tailored to your team structure and deal stages.",
    problem:
      "Generic CRMs force your sales process into templates that do not fit.",
    benefit:
      "Track deals your way and improve sales visibility for reps and managers.",
  },
  {
    title: "Staff Workflow Systems",
    description:
      "Task assignment, approvals, and accountability workflows for teams.",
    problem:
      "Work is often managed through voice notes and unclear role ownership.",
    benefit:
      "Your team runs from clear tasks, deadlines, and measurable accountability.",
  },
  {
    title: "Job Card Systems",
    description:
      "Digital job cards with progress states, timelines, and customer updates.",
    problem:
      "Paper or chat-based job tracking creates delays and billing confusion.",
    benefit:
      "Faster throughput, cleaner history, and improved service communication.",
  },
  {
    title: "Inventory / Stock Systems",
    description:
      "Inventory visibility for stock movement, reorder points, and value tracking.",
    problem:
      "Manual stock control causes shortages, over-ordering, and costly mistakes.",
    benefit:
      "Know stock levels, movement, and reorder needs before issues become expensive.",
  },
  {
    title: "Client Portals",
    description:
      "Secure role-based portals for clients to view updates, files, and activity.",
    problem:
      "Clients rely on repetitive update requests and scattered communication.",
    benefit:
      "A professional self-service experience that saves admin time and builds trust.",
  },
  {
    title: "AI-Powered Business Tools",
    description:
      "AI-assisted features to speed up repetitive tasks and operational decisions.",
    problem:
      "Teams lose time on repetitive admin and manual data interpretation.",
    benefit:
      "Faster execution, better prioritisation, and more consistent decision support.",
  },
  {
    title: "Automation & Reporting",
    description:
      "Automated workflows, reminders, and management reports across departments.",
    problem:
      "Critical steps are skipped because manual follow-up is inconsistent.",
    benefit:
      "Consistent execution and regular reporting without daily manual chasing.",
  },
];

export const fullIndustryDetails: IndustryCard[] = [
  {
    title: "Dealerships",
    subtitle: "Vehicle Sales Operations",
    highlights: [
      "Vehicle stock upload and specs",
      "Salesperson role-based views",
      "Owner dashboard and conversion visibility",
      "Lead tracking and follow-up reminders",
      "Test drive and finance application logs",
      "AutoTrader / Cars.co.za posting workflow concepts",
    ],
  },
  {
    title: "Workshops",
    subtitle: "Service & Repair Operations",
    highlights: [
      "Job card system with status control",
      "Mechanic task tracking",
      "Parts tracking and reorder alerts",
      "Booking calendar and bay planning",
      "Customer updates via workflow triggers",
      "Invoice-ready job histories",
    ],
  },
  {
    title: "Agencies",
    subtitle: "Client Delivery Operations",
    highlights: [
      "Client dashboards and reporting portals",
      "Campaign pipeline tracking",
      "Content production workflow",
      "Task assignment and team accountability",
      "Lead reporting and conversion visibility",
      "Monthly performance report automation",
    ],
  },
  {
    title: "Construction",
    subtitle: "Project & Site Management",
    highlights: [
      "Project milestone tracking",
      "Site and subcontractor activity logs",
      "Material and cost tracking",
      "Progress photo and sign-off flows",
      "Client update dashboard",
      "Deadline risk alerts",
    ],
  },
  {
    title: "Warehouses",
    subtitle: "Inventory & Dispatch",
    highlights: [
      "Real-time stock visibility",
      "Dispatch workflow tracking",
      "Zone and shelf mapping references",
      "Supplier and purchase order visibility",
      "Movement audit history",
      "Owner inventory risk reporting",
    ],
  },
  {
    title: "Farms",
    subtitle: "Operations & Resource Control",
    highlights: [
      "Field task and schedule tracking",
      "Input stock management",
      "Labour and activity visibility",
      "Equipment and maintenance logs",
      "Harvest and dispatch workflows",
      "Owner summary dashboards",
    ],
  },
  {
    title: "Security & Operations",
    subtitle: "Field Execution Control",
    highlights: [
      "Shift and roster systems",
      "Guard location and patrol tracking",
      "Incident report workflow",
      "Site assignment control",
      "Compliance and training status tracking",
      "Live operations command dashboard",
    ],
  },
  {
    title: "Custom Industries",
    subtitle: "Built for How You Operate",
    highlights: [
      "Custom workflow mapping",
      "Role-based user access",
      "Operational dashboards",
      "Automation and reminders",
      "Reporting and accountability layers",
      "Modular growth with your business",
    ],
  },
];

export const demoPageCards: DemoCard[] = [
  {
    title: "Dealership System",
    summary:
      "Track leads, stock, test drives, and finance applications in one environment.",
    features: [
      "Vehicle stock and listing workflow",
      "Salesperson pipeline tracking",
      "Owner conversion dashboard",
      "Follow-up reminders and escalation",
    ],
  },
  {
    title: "Workshop System",
    summary:
      "Manage bookings, job cards, mechanics, parts, and customer communication.",
    features: [
      "Live job card statuses",
      "Technician queue management",
      "Parts usage and reorder alerts",
      "Invoice-ready job record history",
    ],
  },
  {
    title: "Agency System",
    summary:
      "Control campaign delivery, client reporting, and team execution in one place.",
    features: [
      "Campaign and milestone tracking",
      "Client portal updates",
      "Task ownership visibility",
      "Monthly report automation",
    ],
  },
  {
    title: "Operations Dashboard",
    summary:
      "A high-level owner command center that unifies live operational indicators.",
    features: [
      "Lead, sales, and revenue summaries",
      "Staff execution tracking",
      "Alert and risk feed",
      "Mobile-ready owner reporting",
    ],
  },
  {
    title: "Lead Management Portal",
    summary:
      "Capture, assign, and convert leads with structured follow-up workflows.",
    features: [
      "Source tracking and qualification",
      "Automated reminder rules",
      "Sales pipeline stage controls",
      "Lost lead prevention metrics",
    ],
  },
  {
    title: "Stock Control Dashboard",
    summary:
      "A clean inventory command layer for movement, reorder, and stock risk visibility.",
    features: [
      "Real-time stock status",
      "Movement and adjustment logs",
      "Low stock alert automation",
      "Supplier and order visibility",
    ],
  },
];

export const exampleOutcomeSnapshots = [
  {
    title: "Lead control outcome",
    summary:
      "A typical first win is clearer lead ownership, faster follow-up, and less silent revenue loss across WhatsApp, calls, and web enquiries.",
  },
  {
    title: "Operations visibility outcome",
    summary:
      "Many teams gain control by surfacing blocked work, overdue actions, and status changes in one role-based workflow instead of scattered updates.",
  },
  {
    title: "Owner reporting outcome",
    summary:
      "Owners usually feel the gain when reporting becomes visible daily, not only after manual consolidation at week-end or month-end.",
  },
];
