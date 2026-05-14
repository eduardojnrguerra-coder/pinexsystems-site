import {
  BriefcaseBusiness,
  Car,
  Factory,
  Hammer,
  Leaf,
  Calculator,
  Megaphone,
  Shield,
  Ship,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type DemoRecord = {
  id: string;
  name: string;
  category: string;
  status: string;
  owner: string;
  value: string;
  detail: string;
};

export type DemoIconName =
  | "dealership"
  | "workshop"
  | "agency"
  | "construction"
  | "warehouse"
  | "logistics"
  | "farm"
  | "security"
  | "custom-business"
  | "accounting"
  | "marine";

export const demoIconMap: Record<DemoIconName, LucideIcon> = {
  dealership: Car,
  workshop: Wrench,
  agency: Megaphone,
  construction: Hammer,
  warehouse: Factory,
  logistics: Truck,
  farm: Leaf,
  security: Shield,
  "custom-business": BriefcaseBusiness,
  accounting: Calculator,
  marine: Ship,
};

export type DemoSystem = {
  slug: string;
  title: string;
  shortTitle: string;
  seoTitle: string;
  seoDescription: string;
  description: string;
  icon: DemoIconName;
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

export const demoSystems: DemoSystem[] = [
  {
    slug: "dealership",
    title: "Dealership Command System",
    shortTitle: "Dealership",
    seoTitle: "Dealership Management System Demo South Africa | Pine X Systems",
    seoDescription:
      "Explore a custom dealership management system demo for vehicle stock, lead tracking, finance applications, test drives, salesperson views, and owner dashboards.",
    description:
      "A custom dealership management system South Africa can use to connect vehicle stock, lead management, finance stages, test drives, and owner dashboards.",
    icon: "dealership",
    accent: "#67E8F9",
    modules: ["Owner dashboard", "Vehicle stock", "Lead tracking", "Finance pipeline", "Test drive logs"],
    roles: ["Owner view", "Salesperson view", "Finance/admin view"],
    tabs: ["Overview", "Leads", "Vehicle stock", "Finance", "Activity"],
    metricLabels: ["Leads captured", "Vehicles in stock", "Finance applications", "Test drives booked", "Missed follow-ups", "Revenue pipeline"],
    metrics: [
      { label: "Leads captured", value: "184", detail: "+22 qualified this month", filter: "New" },
      { label: "Vehicles in stock", value: "42", detail: "11 ready to publish", filter: "Ready" },
      { label: "Finance applications", value: "12", detail: "4 waiting docs", filter: "Finance" },
      { label: "Test drives booked", value: "7", detail: "Today and tomorrow", filter: "Test Drive" },
      { label: "Missed follow-ups", value: "3", detail: "Needs owner attention", filter: "Follow-up" },
      { label: "Revenue pipeline", value: "R2.4m", detail: "Open deal value", filter: "Sold" },
    ],
    records: [
      { id: "D-101", name: "Johan van der Merwe", category: "2021 Toyota Hilux 2.8 GD-6", status: "New", owner: "Andre", value: "R479 900", detail: "Cars.co.za lead, finance required" },
      { id: "D-102", name: "Maria Jacobs", category: "2020 VW Polo 1.0 TSI", status: "Contacted", owner: "Lerato", value: "R229 900", detail: "Wants trade-in valuation" },
      { id: "D-103", name: "Thabo Mokoena", category: "2019 Ford Ranger 2.0 Bi-Turbo", status: "Test Drive", owner: "Andre", value: "R399 900", detail: "Saturday test drive booked" },
      { id: "D-104", name: "Pieter Botha", category: "2022 Hyundai Tucson", status: "Finance", owner: "Finance", value: "R489 900", detail: "Docs requested" },
      { id: "D-105", name: "Candice Naidoo", category: "2018 BMW 320i", status: "Ready", owner: "Lerato", value: "R319 900", detail: "Ready to publish to AutoTrader / Website" },
    ],
    pipeline: ["New", "Contacted", "Test Drive", "Finance", "Sold"],
    activity: ["Cars.co.za lead routed to Andre", "Hyundai Tucson moved to finance", "BMW 320i marked ready to publish"],
    primaryAction: "Move lead to next stage",
    secondaryAction: "Mark follow-up complete",
  },
  {
    slug: "workshop",
    title: "Workshop Control System",
    shortTitle: "Workshop",
    seoTitle: "Workshop Management System Demo | Pine X Systems",
    seoDescription:
      "Explore a workshop management system demo for job cards, mechanic tasks, bookings, parts tracking, customer updates, and invoice-ready job history.",
    description:
      "A workshop management system for job cards, bay schedules, parts tracking, technician views, customer updates, and invoice-ready reporting.",
    icon: "workshop",
    accent: "#60A5FA",
    modules: ["Job cards", "Bookings", "Mechanic tasks", "Parts tracking", "Invoice-ready history"],
    roles: ["Owner view", "Manager view", "Technician view"],
    tabs: ["Overview", "Job cards", "Parts", "Reports", "Activity"],
    metricLabels: ["Open jobs", "Jobs waiting for parts", "Technicians active", "Bookings this week", "Jobs overdue", "Invoice-ready jobs"],
    metrics: [
      { label: "Open jobs", value: "38", detail: "7 due today", filter: "In Progress" },
      { label: "Jobs waiting for parts", value: "7", detail: "Brake pads, filters, sensors", filter: "Waiting Parts" },
      { label: "Technicians active", value: "6", detail: "Live bay work", filter: "In Progress" },
      { label: "Bookings this week", value: "14", detail: "3 open slots", filter: "Booked" },
      { label: "Jobs overdue", value: "4", detail: "Needs manager action", filter: "Overdue" },
      { label: "Invoice-ready jobs", value: "9", detail: "Ready for admin", filter: "Ready" },
    ],
    records: [
      { id: "JC-048", name: "Toyota Hilux service", category: "Service", status: "In Progress", owner: "Sipho", value: "R4 800", detail: "Customer update sent" },
      { id: "JC-049", name: "VW Polo clutch inspection", category: "Diagnostics", status: "Diagnosing", owner: "Mia", value: "R1 650", detail: "Inspection underway" },
      { id: "JC-050", name: "Ford Ranger brake pads", category: "Parts", status: "Waiting Parts", owner: "Jaco", value: "R3 900", detail: "Brake pads below reorder level" },
      { id: "JC-051", name: "Hyundai Tucson diagnostics", category: "Diagnostics", status: "Quality Check", owner: "Sipho", value: "R2 100", detail: "Report pending" },
      { id: "JC-052", name: "BMW oil leak check", category: "Repair", status: "Booked", owner: "Mia", value: "R2 850", detail: "Booked for tomorrow" },
    ],
    pipeline: ["Booked", "Diagnosing", "Waiting Parts", "In Progress", "Quality Check", "Ready"],
    activity: ["JC-048 customer updated", "JC-050 flagged waiting on brake pads", "Invoice-ready summary generated"],
    primaryAction: "Move job status",
    secondaryAction: "Generate invoice summary",
  },
  {
    slug: "hutton-motors-service-centre",
    title: "Hutton Motors Service Centre OS",
    shortTitle: "Hutton Motors",
    seoTitle: "Hutton Motors Service Centre Demo | Pine X Systems",
    seoDescription:
      "Explore a premium service-centre operating system demo for Hutton Motors covering reception intake, digital job cards, workshop tracking, parts control, shuttle coordination, and WhatsApp updates.",
    description:
      "A polished dealership workshop demo built around the real service-centre flow: bookings, check-in, approvals, parts, transport, WhatsApp communication, and management oversight.",
    icon: "workshop",
    accent: "#60A5FA",
    modules: [
      "Reception intake",
      "Digital job cards",
      "Workshop board",
      "Parts memory library",
      "Shuttle tracking",
    ],
    roles: [
      "Reception view",
      "Workshop manager view",
      "Parts/admin view",
      "Shuttle coordinator view",
    ],
    tabs: [
      "Dashboard",
      "Reception",
      "Job Cards",
      "Workshop",
      "WhatsApp",
    ],
    metricLabels: [
      "Open service jobs",
      "Waiting for approval",
      "Waiting for parts",
      "Ready for collection",
      "Inbound WhatsApp",
      "Transport tasks",
    ],
    metrics: [
      { label: "Open service jobs", value: "6", detail: "Across active bays", filter: "Dashboard" },
      { label: "Waiting for approval", value: "1", detail: "Client decision pending", filter: "Reception" },
      { label: "Waiting for parts", value: "1", detail: "Supplier ETA tracked", filter: "Parts ordering" },
      { label: "Ready for collection", value: "1", detail: "Invoice pack prepared", filter: "Job Cards" },
      { label: "Inbound WhatsApp", value: "5", detail: "AI-classified queue", filter: "WhatsApp" },
      { label: "Transport tasks", value: "3", detail: "Pickup and shuttle live", filter: "Transport" },
    ],
    records: [
      { id: "HM-24018", name: "Mercedes-Benz Vito diagnostic repair", category: "Service Job", status: "Waiting for Parts", owner: "Mia", value: "R8 950", detail: "Sensor ETA impacts tomorrow shuttle run" },
      { id: "HM-24020", name: "Toyota Fortuner service", category: "Same-day service", status: "In Service", owner: "Sipho", value: "R6 240", detail: "Client needs collection before school run" },
      { id: "HM-24021", name: "BMW suspension quote", category: "Approval", status: "Waiting for Approval", owner: "Lerato", value: "R11 800", detail: "Client requested a call before work proceeds" },
    ],
    pipeline: [
      "Booking Confirmed",
      "Checked In",
      "Waiting for Approval",
      "Waiting for Parts",
      "In Service",
      "Quality Check",
      "Ready for Collection",
    ],
    activity: [
      "WhatsApp approval routed to workshop manager",
      "Shuttle pickup assigned for afternoon booking",
      "Parts ETA linked to Vito job card",
    ],
    primaryAction: "Advance service stage",
    secondaryAction: "Send customer update",
  },
  {
    slug: "agency",
    title: "Agency Operations System",
    shortTitle: "Agency",
    seoTitle: "Agency Management System Demo | Pine X Systems",
    seoDescription:
      "Explore an agency management system demo for client dashboards, campaign tracking, content workflow, approvals, tasks, and monthly reports.",
    description:
      "A custom business system for agencies that connects campaign delivery, content workflow, client reporting, tasks, approvals, and owner visibility.",
    icon: "agency",
    accent: "#67E8F9",
    modules: ["Client dashboards", "Campaign tracking", "Content workflow", "Approval pipeline", "Monthly reports"],
    roles: ["Owner view", "Account manager view", "Content team view"],
    tabs: ["Overview", "Clients", "Content", "Reports", "Activity"],
    metricLabels: ["Active clients", "Active campaigns", "Reports due", "Content approvals pending", "Leads tracked", "Overdue tasks"],
    metrics: [
      { label: "Active clients", value: "12", detail: "5 high-touch accounts", filter: "Active" },
      { label: "Active campaigns", value: "26", detail: "Across paid and organic", filter: "Scheduled" },
      { label: "Reports due", value: "14", detail: "Month-end cycle", filter: "Report Due" },
      { label: "Content approvals pending", value: "8", detail: "Waiting client sign-off", filter: "Client Approval" },
      { label: "Leads tracked", value: "312", detail: "Client campaign leads", filter: "Lead Report" },
      { label: "Overdue tasks", value: "5", detail: "Needs account manager", filter: "Overdue" },
    ],
    records: [
      { id: "A-201", name: "CapeStone Hermanus", category: "Local SEO", status: "Active", owner: "Account manager", value: "R18 000", detail: "Client dashboard preview ready" },
      { id: "A-202", name: "Build It Hermanus", category: "Campaign", status: "Client Approval", owner: "Content team", value: "R24 000", detail: "Content awaiting approval" },
      { id: "A-203", name: "Silverton Radiators", category: "Lead reporting", status: "Report Due", owner: "Account manager", value: "R12 500", detail: "Monthly report due" },
      { id: "A-204", name: "Dynamic Diesel", category: "Content workflow", status: "Scheduled", owner: "Content team", value: "R9 800", detail: "Posts scheduled" },
      { id: "A-205", name: "Local Dealership Group", category: "Paid leads", status: "Lead Report", owner: "Owner", value: "R31 000", detail: "312 leads tracked" },
    ],
    pipeline: ["Draft", "Review", "Client Approval", "Scheduled", "Posted"],
    activity: ["Monthly report generated for Silverton", "Build It approval request sent", "Campaign milestone moved to scheduled"],
    primaryAction: "Move content stage",
    secondaryAction: "Mark report generated",
  },
  {
    slug: "construction",
    title: "Construction Project Control System",
    shortTitle: "Construction",
    seoTitle: "Construction Business System Demo | Pine X Systems",
    seoDescription:
      "Explore a construction business system demo for project dashboards, site tasks, subcontractors, materials, deadline risks, and client reports.",
    description:
      "A construction business system for project dashboards, site tasks, materials tracking, subcontractor activity, change orders, and client reporting.",
    icon: "construction",
    accent: "#F5D36C",
    modules: ["Project dashboard", "Site tasks", "Materials tracking", "Change orders", "Client reporting"],
    roles: ["Owner view", "Site manager view", "Client view"],
    tabs: ["Overview", "Projects", "Materials", "Reports", "Activity"],
    metricLabels: ["Active projects", "Site tasks open", "Materials alerts", "Subcontractors active", "Delayed milestones", "Approved change orders"],
    metrics: [
      { label: "Active projects", value: "9", detail: "Across Overberg and Cape", filter: "Active" },
      { label: "Site tasks open", value: "47", detail: "12 due this week", filter: "Open" },
      { label: "Materials alerts", value: "6", detail: "Reorder and delivery risks", filter: "Material Risk" },
      { label: "Subcontractors active", value: "14", detail: "Across current sites", filter: "Subcontractor" },
      { label: "Delayed milestones", value: "3", detail: "Needs owner review", filter: "Delayed" },
      { label: "Approved change orders", value: "8", detail: "This month", filter: "Approved" },
    ],
    records: [
      { id: "C-301", name: "Hermanus Office Renovation", category: "Renovation", status: "Active", owner: "Site manager", value: "R420 000", detail: "Electrical milestone due" },
      { id: "C-302", name: "Kleinmond Retail Fitout", category: "Fitout", status: "Material Risk", owner: "Procurement", value: "R280 000", detail: "Ceiling boards delayed" },
      { id: "C-303", name: "Somerset West Boundary Wall", category: "Site work", status: "Delayed", owner: "Site manager", value: "R180 000", detail: "Weather delay flagged" },
      { id: "C-304", name: "Paarl Warehouse Upgrade", category: "Industrial", status: "Approved", owner: "Owner", value: "R760 000", detail: "Change order approved" },
      { id: "C-305", name: "Overstrand Housing Phase 1", category: "Housing", status: "Open", owner: "Site manager", value: "R1.2m", detail: "47 tasks open" },
    ],
    pipeline: ["Quoted", "Approved", "Active", "Delayed", "Client Report", "Complete"],
    activity: ["Material delivery risk flagged", "Client progress report generated", "Boundary wall milestone escalated"],
    primaryAction: "Move project stage",
    secondaryAction: "Generate progress report",
  },
  {
    slug: "warehouse",
    title: "Warehouse Stock System",
    shortTitle: "Warehouse",
    seoTitle: "Warehouse Stock System Demo | Pine X Systems",
    seoDescription:
      "Explore a warehouse stock system demo for receiving, dispatch, inventory visibility, reorder alerts, supplier tracking, and owner reporting.",
    description:
      "A warehouse stock system for stock movement, receiving, dispatch, reorder alerts, supplier orders, zone mapping, and owner reporting.",
    icon: "warehouse",
    accent: "#60A5FA",
    modules: ["Inventory dashboard", "Receiving", "Dispatch", "Reorder alerts", "Supplier tracking"],
    roles: ["Owner view", "Warehouse manager view", "Staff view"],
    tabs: ["Overview", "Inventory", "Dispatch", "Reports", "Activity"],
    metricLabels: ["Stock items", "Low stock alerts", "Dispatches today", "Pending receiving", "Supplier orders", "Stock value"],
    metrics: [
      { label: "Stock items", value: "1 284", detail: "Across zones", filter: "In Stock" },
      { label: "Low stock alerts", value: "18", detail: "Reorder required", filter: "Low Stock" },
      { label: "Dispatches today", value: "22", detail: "6 awaiting pick", filter: "Dispatch" },
      { label: "Pending receiving", value: "11", detail: "Supplier deliveries", filter: "Receiving" },
      { label: "Supplier orders", value: "7", detail: "Open orders", filter: "Supplier Order" },
      { label: "Stock value", value: "R1.8m", detail: "Owner view", filter: "High Value" },
    ],
    records: [
      { id: "W-401", name: "Brake pads", category: "Zone A", status: "Low Stock", owner: "Warehouse manager", value: "R18 400", detail: "Trigger reorder" },
      { id: "W-402", name: "Oil filters", category: "Zone B", status: "In Stock", owner: "Staff", value: "R9 800", detail: "Movement history available" },
      { id: "W-403", name: "LED work lights", category: "Zone C", status: "Dispatch", owner: "Picker", value: "R22 000", detail: "Dispatch queue today" },
      { id: "W-404", name: "Solar bulbs", category: "Zone D", status: "Receiving", owner: "Receiving", value: "R14 200", detail: "Pending supplier delivery" },
      { id: "W-405", name: "4x4 recovery straps", category: "Zone A", status: "Supplier Order", owner: "Procurement", value: "R32 000", detail: "Supplier order open" },
      { id: "W-406", name: "Packaging boxes", category: "Zone E", status: "High Value", owner: "Owner", value: "R7 900", detail: "Owner reporting item" },
    ],
    pipeline: ["Receiving", "In Stock", "Pick", "Dispatch", "Delivered", "Reorder"],
    activity: ["Brake pads reorder triggered", "Dispatch queue updated", "Solar bulbs marked pending receiving"],
    primaryAction: "Trigger reorder",
    secondaryAction: "Create dispatch",
  },
  {
    slug: "logistics",
    title: "Logistics Command Centre",
    shortTitle: "Logistics",
    seoTitle: "Logistics Command Centre Demo South Africa | Pine X Systems",
    seoDescription:
      "Explore a logistics command centre demo for dispatch, fleet status, POD capture, driver views, delivery exceptions, customer updates, and owner reporting.",
    description:
      "A logistics command centre for South African operators that connects dispatch, vehicles, drivers, POD records, delivery updates, exceptions, and owner reporting.",
    icon: "logistics",
    accent: "#67E8F9",
    modules: ["Dispatch board", "Driver views", "Fleet status", "POD capture", "Exceptions", "Owner reporting"],
    roles: ["Owner view", "Dispatcher view", "Driver view"],
    tabs: ["Overview", "Dispatch", "Deliveries", "Vehicles", "POD", "Drivers", "Reporting", "Activity"],
    metricLabels: ["Active jobs", "Delayed deliveries", "POD pending", "Vehicles active", "Customer updates", "Margin at risk"],
    metrics: [
      { label: "Active jobs", value: "38", detail: "Across Cape routes", filter: "Assigned" },
      { label: "Delayed deliveries", value: "5", detail: "Need dispatcher action", filter: "Delayed" },
      { label: "POD pending", value: "7", detail: "Waiting upload or review", filter: "POD Pending" },
      { label: "Vehicles active", value: "14", detail: "3 with alerts", filter: "Active" },
      { label: "Customer updates", value: "9", detail: "Due before close", filter: "Update Required" },
      { label: "Margin at risk", value: "R42k", detail: "Delay and fuel pressure", filter: "Risk" },
    ],
    records: [
      { id: "LG-501", name: "Cape Town to George retail drop", category: "Linehaul", status: "Assigned", owner: "Nandi", value: "R18 900", detail: "Assigned delivery with driver app checklist ready" },
      { id: "LG-502", name: "Somerset West pharmacy route", category: "Local delivery", status: "Delayed", owner: "Marius", value: "R7 400", detail: "Delayed route due to loading bay queue; customer update required" },
      { id: "LG-503", name: "Paarl warehouse POD chase", category: "POD", status: "POD Pending", owner: "Driver Sipho", value: "R5 800", detail: "Proof of delivery photo still pending after completed stop" },
      { id: "LG-504", name: "Truck CT-18 maintenance alert", category: "Fleet", status: "Maintenance Alert", owner: "Fleet admin", value: "Service due", detail: "Vehicle maintenance alert after 500km threshold" },
      { id: "LG-505", name: "Stellenbosch client ETA update", category: "Customer update", status: "Update Required", owner: "Dispatch", value: "Today 15:30", detail: "Client needs revised ETA after delayed route" },
    ],
    pipeline: ["Unassigned", "Assigned", "Loaded", "In Transit", "Delivered", "POD Captured", "Closed"],
    activity: ["Route LG-502 flagged delayed", "POD reminder sent to Sipho", "Truck CT-18 maintenance alert raised"],
    primaryAction: "Assign job",
    secondaryAction: "Capture POD",
  },
  {
    slug: "farm",
    title: "Farm Operations System",
    shortTitle: "Farm",
    seoTitle: "Farm Operations System Demo | Pine X Systems",
    seoDescription:
      "Explore a farm operations system demo for field task schedules, labour tracking, equipment logs, stock inputs, harvest workflows, and reports.",
    description:
      "A farm operations system for field tasks, labour tracking, equipment logs, input stock, harvest batches, dispatch workflows, and daily owner summaries.",
    icon: "farm",
    accent: "#67E8F9",
    modules: ["Field task schedule", "Labour tracking", "Equipment logs", "Input stock", "Harvest reports"],
    roles: ["Owner view", "Farm manager view", "Worker view"],
    tabs: ["Overview", "Tasks", "Equipment", "Reports", "Activity"],
    metricLabels: ["Active field tasks", "Labour teams active", "Equipment alerts", "Stock/input alerts", "Dispatches scheduled", "Harvest batches"],
    metrics: [
      { label: "Active field tasks", value: "31", detail: "Across blocks", filter: "Assigned" },
      { label: "Labour teams active", value: "5", detail: "Today", filter: "Labour" },
      { label: "Equipment alerts", value: "4", detail: "Maintenance due", filter: "Maintenance" },
      { label: "Stock/input alerts", value: "9", detail: "Low inputs", filter: "Low Input" },
      { label: "Dispatches scheduled", value: "6", detail: "Buyer deliveries", filter: "Dispatch" },
      { label: "Harvest batches", value: "12", detail: "Quality tracked", filter: "Harvest" },
    ],
    records: [
      { id: "F-501", name: "Irrigation check block A", category: "Field task", status: "Assigned", owner: "Worker team 1", value: "Today", detail: "Morning inspection" },
      { id: "F-502", name: "Tractor service reminder", category: "Equipment", status: "Maintenance", owner: "Farm manager", value: "Due", detail: "Service at 500 hours" },
      { id: "F-503", name: "Harvest batch sorting", category: "Harvest", status: "Harvest", owner: "Worker team 2", value: "12 crates", detail: "Quality check" },
      { id: "F-504", name: "Fertiliser stock check", category: "Inputs", status: "Low Input", owner: "Farm manager", value: "R8 200", detail: "Reorder required" },
      { id: "F-505", name: "Dispatch pallets to buyer", category: "Dispatch", status: "Dispatch", owner: "Logistics", value: "6 pallets", detail: "Scheduled 14:00" },
    ],
    pipeline: ["Assigned", "In Progress", "Blocked", "Complete", "Reported"],
    activity: ["Fertiliser stock flagged low", "Harvest batch quality recorded", "Daily farm summary generated"],
    primaryAction: "Mark task complete",
    secondaryAction: "Generate daily summary",
  },
  {
    slug: "security",
    title: "Security & Operations System",
    shortTitle: "Security",
    seoTitle: "Security Operations System Demo | Pine X Systems",
    seoDescription:
      "Explore a security operations system demo for shift rosters, guard patrol tracking, incident reports, equipment logs, checklists, and management reporting.",
    description:
      "A security operations system for active sites, shift rosters, guard patrols, incident control, equipment logs, checklists, and compliance reporting.",
    icon: "security",
    accent: "#60A5FA",
    modules: ["Operations dashboard", "Shift roster", "Guard patrol tracking", "Incident reports", "Management reporting"],
    roles: ["Owner view", "Ops manager view", "Guard view"],
    tabs: ["Overview", "Sites", "Incidents", "Reports", "Activity"],
    metricLabels: ["Active sites", "Guards on duty", "Patrols completed", "Incidents open", "Equipment alerts", "Missed check-ins"],
    metrics: [
      { label: "Active sites", value: "11", detail: "Live contracts", filter: "Active" },
      { label: "Guards on duty", value: "38", detail: "Current shift", filter: "On Duty" },
      { label: "Patrols completed", value: "126", detail: "Today", filter: "Patrol" },
      { label: "Incidents open", value: "5", detail: "Needs ops review", filter: "Incident" },
      { label: "Equipment alerts", value: "3", detail: "Radios and torches", filter: "Equipment" },
      { label: "Missed check-ins", value: "2", detail: "Escalated", filter: "Missed" },
    ],
    records: [
      { id: "S-601", name: "Industrial Park Gate", category: "Access control", status: "Active", owner: "Guard team A", value: "24h", detail: "Shift roster active" },
      { id: "S-602", name: "Warehouse Patrol", category: "Patrol", status: "Patrol", owner: "Guard team B", value: "126", detail: "Patrols completed" },
      { id: "S-603", name: "Retail Centre Night Shift", category: "Incident", status: "Incident", owner: "Ops manager", value: "5 open", detail: "Incident reports open" },
      { id: "S-604", name: "Construction Site", category: "Equipment", status: "Equipment", owner: "Guard team C", value: "3 alerts", detail: "Equipment issue flagged" },
      { id: "S-605", name: "Office Park Access Control", category: "Check-in", status: "Missed", owner: "Ops manager", value: "2 missed", detail: "Missed check-ins escalated" },
    ],
    pipeline: ["Assigned", "Patrol", "Incident", "Escalated", "Resolved"],
    activity: ["Missed check-in escalated", "Incident report generated", "Guard assigned to warehouse patrol"],
    primaryAction: "Mark patrol complete",
    secondaryAction: "Add sample incident",
  },
  {
    slug: "custom-business",
    title: "Custom Business Portal",
    shortTitle: "Custom Business",
    seoTitle: "Custom Business System Demo South Africa | Pine X Systems",
    seoDescription:
      "Explore a flexible custom business system demo for owner dashboards, staff workflows, client portals, approvals, documents, automation, and reports.",
    description:
      "A flexible custom business system for owner dashboards, staff workflows, client portals, approvals, documents, business automation South Africa, and reports.",
    icon: "custom-business",
    accent: "#67E8F9",
    modules: ["Owner dashboard", "Staff workflows", "Client portal", "Automated reminders", "Role-based access"],
    roles: ["Owner view", "Staff view", "Client view"],
    tabs: ["Overview", "Workflows", "Approvals", "Reports", "Activity"],
    metricLabels: ["Active workflows", "Pending approvals", "Client portal updates", "Staff tasks", "Reports generated", "Automation runs"],
    metrics: [
      { label: "Active workflows", value: "18", detail: "Across departments", filter: "Workflow" },
      { label: "Pending approvals", value: "9", detail: "Needs manager review", filter: "Approval" },
      { label: "Client portal updates", value: "24", detail: "This week", filter: "Client Portal" },
      { label: "Staff tasks", value: "63", detail: "11 due today", filter: "Task" },
      { label: "Reports generated", value: "12", detail: "Automated", filter: "Report" },
      { label: "Automation runs", value: "87", detail: "This week", filter: "Automation" },
    ],
    records: [
      { id: "B-701", name: "Owner dashboard build", category: "Workflow", status: "Workflow", owner: "Owner", value: "Priority", detail: "Live visibility across departments" },
      { id: "B-702", name: "Quote approval", category: "Approval", status: "Approval", owner: "Manager", value: "R42 000", detail: "Pending approval" },
      { id: "B-703", name: "Client portal update", category: "Client Portal", status: "Client Portal", owner: "Staff", value: "24 updates", detail: "Client can view progress" },
      { id: "B-704", name: "Staff onboarding task", category: "Task", status: "Task", owner: "Staff", value: "Due today", detail: "Task assigned" },
      { id: "B-705", name: "Management report", category: "Report", status: "Report", owner: "Owner", value: "Generated", detail: "Monthly report ready" },
      { id: "B-706", name: "Reminder workflow", category: "Automation", status: "Automation", owner: "System", value: "87 runs", detail: "Automated reminders active" },
    ],
    pipeline: ["Select modules", "Map workflow", "Build demo", "Launch", "Improve"],
    activity: ["Custom system summary generated", "Client portal module selected", "Role permissions preview updated"],
    primaryAction: "Generate system summary",
    secondaryAction: "Toggle role permission",
  },
  {
    slug: "accounting-os",
    title: "Accounting Practice OS",
    shortTitle: "Accounting OS",
    seoTitle: "Accounting Practice OS Concept | Pine X Systems",
    seoDescription:
      "Explore an Accounting OS concept for recurring client work, document chasing, reviews, deadlines, onboarding, and owner dashboards.",
    description:
      "A practice operating system concept for accounting firms and compliance-heavy service businesses that need recurring work, review flow, document chasing, and deadline risk in one dashboard.",
    icon: "accounting",
    accent: "#67E8F9",
    modules: ["Client onboarding", "Document chasing", "Review workflow", "Deadline risk", "Partner dashboard"],
    roles: ["Partner view", "Manager view", "Staff view"],
    tabs: ["Overview", "Clients", "Documents", "Reviews", "Deadlines", "Reports", "Activity"],
    metricLabels: ["Recurring jobs", "Overdue documents", "Reviews waiting", "Deadline risk", "Reports due", "Partner exceptions"],
    metrics: [
      { label: "Recurring jobs", value: "126", detail: "Monthly and annual work", filter: "Recurring" },
      { label: "Overdue documents", value: "18", detail: "Client follow-up required", filter: "Documents" },
      { label: "Reviews waiting", value: "9", detail: "Manager or partner queue", filter: "Review" },
      { label: "Deadline risk", value: "6", detail: "Needs escalation", filter: "Risk" },
    ],
    records: [
      { id: "AO-101", name: "VAT return pack - Cape Retail", category: "Recurring work", status: "Documents Due", owner: "Staff", value: "25th", detail: "Bank statements and sales report outstanding" },
      { id: "AO-102", name: "Annual financials - BuildCo", category: "Review", status: "Partner Review", owner: "Partner", value: "R18 500", detail: "Draft financials ready for final review" },
      { id: "AO-103", name: "Payroll compliance - Security Group", category: "Deadline", status: "Deadline Risk", owner: "Manager", value: "Friday", detail: "EMP201 deadline approaching with one missing schedule" },
    ],
    pipeline: ["Onboarding", "Documents Requested", "In Progress", "Review", "Client Query", "Filed", "Reported"],
    activity: ["Document chase sent to Cape Retail", "BuildCo review moved to partner", "Deadline risk surfaced for Security Group"],
    primaryAction: "Move review forward",
    secondaryAction: "Chase documents",
  },
  {
    slug: "marine-business",
    title: "Marine Business System",
    shortTitle: "Marine",
    seoTitle: "Marine Business System Concept | Pine X Systems",
    seoDescription:
      "Explore a marine business system concept for sales enquiries, unit availability, service bookings, parts requests, after-sales visibility, and owner dashboards.",
    description:
      "A hybrid sales, service, parts, and after-sales operating system concept for marine businesses that need one shared owner view across enquiries and service pressure.",
    icon: "marine",
    accent: "#60A5FA",
    modules: ["Sales enquiries", "Unit availability", "Service bookings", "Parts requests", "After-sales dashboard"],
    roles: ["Owner view", "Sales view", "Service view"],
    tabs: ["Overview", "Sales", "Service", "Parts", "After-sales", "Reports", "Activity"],
    metricLabels: ["Open enquiries", "Units available", "Service bookings", "Parts requests", "After-sales risks", "Owner exceptions"],
    metrics: [
      { label: "Open enquiries", value: "22", detail: "Across boats and accessories", filter: "Enquiry" },
      { label: "Units available", value: "14", detail: "Ready or incoming", filter: "Available" },
      { label: "Service bookings", value: "9", detail: "This week", filter: "Service" },
      { label: "Parts requests", value: "7", detail: "Awaiting supplier", filter: "Parts" },
    ],
    records: [
      { id: "MB-201", name: "Yamaha outboard enquiry", category: "Sales", status: "Enquiry", owner: "Sales", value: "R162 000", detail: "Customer comparing unit availability and fitment timing" },
      { id: "MB-202", name: "SeaCat service booking", category: "Service", status: "Booked", owner: "Service advisor", value: "Friday", detail: "Annual service and trailer inspection requested" },
      { id: "MB-203", name: "Impeller kit supplier chase", category: "Parts", status: "Supplier Pending", owner: "Parts", value: "R3 800", detail: "After-sales job waiting on supplier ETA" },
    ],
    pipeline: ["Enquiry", "Quoted", "Booked", "Parts Pending", "In Service", "Ready", "After-sales"],
    activity: ["Sales enquiry linked to available unit", "Service booking created", "Parts supplier chase opened"],
    primaryAction: "Move workflow forward",
    secondaryAction: "Surface owner risk",
  },
];

export function getDemoSystem(slug: string) {
  return demoSystems.find((system) => system.slug === slug);
}

export const demoSystemSlugs = demoSystems.map((system) => system.slug);
