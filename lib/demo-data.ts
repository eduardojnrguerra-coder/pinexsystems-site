export type { DemoRecord, DemoSystem, DemoSection, DemoMetric, DemoAction, DemoAlert } from "./demo-types";

import type { DemoSection } from "./demo-types";

export const dealershipSections: DemoSection[] = [
  {
    id: "overview",
    label: "Overview",
    subtitle: "Command view for dealership leadership",
    metrics: [
      { label: "Leads this month", value: "184", detail: "+22 qualified", accent: "#67E8F9" },
      { label: "Vehicles in stock", value: "42", detail: "11 ready to publish", accent: "#67E8F9" },
      { label: "Finance applications", value: "12", detail: "4 waiting documents", accent: "#F5D36C" },
      { label: "Test drives", value: "7", detail: "Today and tomorrow", accent: "#60A5FA" },
      { label: "Missed follow-ups", value: "3", detail: "Needs attention", accent: "#f97316" },
      { label: "Pipeline value", value: "R2.4m", detail: "Open deals", accent: "#67E8F9" },
    ],
    actions: [
      { id: "add-lead", label: "Add new lead", primary: true },
      { id: "refresh-stock", label: "Refresh stock view", primary: false },
      { id: "export-report", label: "Export daily report", primary: false },
    ],
    alerts: [
      { type: "warning", message: "3 leads overdue for follow-up" },
      { type: "info", message: "11 vehicles ready to publish to AutoTrader" },
    ],
    activity: [
      "Cars.co.za lead routed to Andre",
      "Hyundai Tucson moved to finance stage",
      "BMW 320i marked ready to publish",
      "New enquiry from website",
    ],
  },
  {
    id: "leads",
    label: "Leads",
    subtitle: "Track and manage all enquiries",
    metrics: [
      { label: "Total leads", value: "184", detail: "This month", accent: "#67E8F9" },
      { label: "Qualified", value: "89", detail: "Follow-up assigned", accent: "#67E8F9" },
      { label: "Converted", value: "23", detail: "This month", accent: "#60A5FA" },
      { label: "Conversion rate", value: "26%", detail: "Industry avg 18%", accent: "#67E8F9" },
    ],
    actions: [
      { id: "add-lead", label: "Add new lead", primary: true },
      { id: "assign-lead", label: "Assign to salesperson", primary: false },
      { id: "bulk-import", label: "Import from CSV", primary: false },
    ],
    alerts: [
      { type: "warning", message: "3 leads not contacted within 24h" },
      { type: "success", message: "This week's follow-up rate improved to 89%" },
    ],
    records: [
      { id: "DL-101", name: "Johan van der Merwe", category: "2021 Toyota Hilux 2.8 GD-6", status: "New", owner: "Andre P.", value: "R479,900", detail: "Cars.co.za enquiry, finance required", stage: "New", created: "2024-01-15", priority: "High", contact: "johan.vdm@email.com", phone: "0821234567" },
      { id: "DL-102", name: "Maria Jacobs", category: "2020 VW Polo 1.0 TSI", status: "Contacted", owner: "Lerato M.", value: "R229,900", detail: "Wants trade-in valuation", stage: "Contacted", created: "2024-01-14", priority: "Medium", contact: "maria.j@email.com", phone: "0822345678" },
      { id: "DL-103", name: "Thabo Mokoena", category: "2019 Ford Ranger 2.0 Bi-Turbo", status: "Test Drive", owner: "Andre P.", value: "R399,900", detail: "Saturday test drive booked", stage: "Test Drive", created: "2024-01-12", priority: "High", contact: "thabo.m@email.com", phone: "0823456789" },
      { id: "DL-104", name: "Pieter Botha", category: "2022 Hyundai Tucson", status: "Finance", owner: "Finance Dept", value: "R489,900", detail: "Documents requested", stage: "Finance", created: "2024-01-10", priority: "Medium", contact: "pieter.b@email.com", phone: "0824567890" },
      { id: "DL-105", name: "Candice Naidoo", category: "2018 BMW 320i", status: "Ready", owner: "Lerato M.", value: "R319,900", detail: "Ready to publish", stage: "Ready", created: "2024-01-08", priority: "Low", contact: "candice.n@email.com", phone: "0825678901" },
    ],
    activity: [
      "Lead DL-101 assigned to Andre P.",
      "Follow-up reminder sent for Maria Jacobs",
      "Test drive confirmed for Thabo Mokoena",
      "Finance docs requested for Pieter Botha",
    ],
  },
  {
    id: "vehicle-stock",
    label: "Vehicle Stock",
    subtitle: "Manage inventory and listings",
    metrics: [
      { label: "Total vehicles", value: "42", detail: "In stock", accent: "#67E8F9" },
      { label: "Ready to publish", value: "11", detail: "Awaiting listing", accent: "#F5D36C" },
      { label: "Sold this month", value: "8", detail: "Deliveries scheduled", accent: "#60A5FA" },
      { label: "Average days in stock", value: "34", detail: "Days", accent: "#67E8F9" },
    ],
    actions: [
      { id: "add-vehicle", label: "Add vehicle", primary: true },
      { id: "publish-all", label: "Publish to AutoTrader", primary: false },
      { id: "stock-report", label: "Stock value report", primary: false },
    ],
    alerts: [
      { type: "info", message: "11 vehicles ready for online listing" },
      { type: "warning", message: "3 vehicles in stock over 60 days" },
    ],
    records: [
      { id: "VS-201", name: "2021 Toyota Hilux 2.8 GD-6", category: "Double Cab", status: "Ready", owner: "Stock Team", value: "R479,900", detail: "White, 45,000km, Service history", stage: "Ready", created: "2024-01-10", priority: "High", contact: "", phone: "" },
      { id: "VS-202", name: "2020 VW Polo 1.0 TSI", category: "Hatchback", status: "Listed", owner: "Marketing", value: "R229,900", detail: "Silver, 32,000km, FSH", stage: "Listed", created: "2024-01-08", priority: "Medium", contact: "", phone: "" },
      { id: "VS-203", name: "2019 Ford Ranger 2.0 Bi-Turbo", category: "Double Cab", status: "Sold", owner: "Sales", value: "R399,900", detail: "Black, 62,000km, SOLD", stage: "Sold", created: "2024-01-05", priority: "Medium", contact: "", phone: "" },
      { id: "VS-204", name: "2022 Hyundai Tucson", category: "SUV", status: "Prep", owner: "Workshop", value: "R489,900", detail: "Blue, 12,000km, Pre-delivery prep", stage: "Prep", created: "2024-01-12", priority: "High", contact: "", phone: "" },
    ],
    activity: [
      "Vehicle VS-201 marked ready to list",
      "Ford Ranger sold - delivery scheduled",
      "Hyundai Tucson moved to prep",
      "Stock report generated",
    ],
  },
  {
    id: "finance",
    label: "Finance",
    subtitle: "Track applications and approvals",
    metrics: [
      { label: "Active applications", value: "12", detail: "In progress", accent: "#67E8F9" },
      { label: "Approved", value: "8", detail: "This week", accent: "#60A5FA" },
      { label: "Pending docs", value: "4", detail: "Awaiting customer", accent: "#F5D36C" },
      { label: "Total approved", value: "R1.8m", detail: "This month", accent: "#67E8F9" },
    ],
    actions: [
      { id: "new-application", label: "New application", primary: true },
      { id: "request-docs", label: "Request documents", primary: false },
      { id: "finance-report", label: "Finance report", primary: false },
    ],
    alerts: [
      { type: "warning", message: "4 applications awaiting documents" },
      { type: "success", message: "8 applications approved this week" },
    ],
    records: [
      { id: "FA-301", name: "Thabo Mokoena", category: "Ford Ranger", status: "Approved", owner: "FNB", value: "R359,910", detail: "7 year term, approved", stage: "Approved", created: "2024-01-10", priority: "High", contact: "thabo.m@email.com", phone: "0823456789" },
      { id: "FA-302", name: "Maria Jacobs", category: "VW Polo", status: "Documents", owner: "Nedbank", value: "R206,910", detail: "Awaiting payslips", stage: "Documents", created: "2024-01-12", priority: "Medium", contact: "maria.j@email.com", phone: "0822345678" },
      { id: "FA-303", name: "Pieter Botha", category: "Hyundai Tucson", status: "Submitted", owner: "Standard Bank", value: "R440,910", detail: "Under review", stage: "Submitted", created: "2024-01-14", priority: "High", contact: "pieter.b@email.com", phone: "0824567890" },
    ],
    activity: [
      "Finance application FA-301 approved",
      "Documents requested from Maria Jacobs",
      "New application submitted to Standard Bank",
    ],
  },
  {
    id: "test-drives",
    label: "Test Drives",
    subtitle: "Schedule and manage test drives",
    metrics: [
      { label: "Booked today", value: "7", detail: "3 confirmed", accent: "#67E8F9" },
      { label: "Completed", value: "23", detail: "This week", accent: "#60A5FA" },
      { label: "Conversion rate", value: "65%", detail: "Test drive to sale", accent: "#67E8F9" },
      { label: "No-shows", value: "2", detail: "This month", accent: "#f97316" },
    ],
    actions: [
      { id: "book-td", label: "Book test drive", primary: true },
      { id: "confirm-td", label: "Confirm bookings", primary: false },
    ],
    alerts: [
      { type: "info", message: "3 test drives confirmed for today" },
    ],
    records: [
      { id: "TD-401", name: "Thabo Mokoena", category: "Ford Ranger", status: "Confirmed", owner: "Andre P.", value: "Saturday 10:00", detail: "Test drive confirmed", stage: "Confirmed", created: "2024-01-12", priority: "High", contact: "thabo.m@email.com", phone: "0823456789" },
      { id: "TD-402", name: "New Customer", category: "Toyota Hilux", status: "Pending", owner: "Unassigned", value: "Saturday 14:00", detail: "Awaiting confirmation", stage: "Pending", created: "2024-01-14", priority: "Medium", contact: "new.cust@email.com", phone: "0829999999" },
    ],
    activity: [
      "Test drive TD-401 confirmed for Saturday",
      "New test drive request from website",
    ],
  },
  {
    id: "activity",
    label: "Activity",
    subtitle: "Recent actions and updates",
    metrics: [
      { label: "Total activities", value: "247", detail: "This week", accent: "#67E8F9" },
      { label: "Leads captured", value: "42", detail: "This week", accent: "#67E8F9" },
      { label: "Follow-ups made", value: "156", detail: "This week", accent: "#60A5FA" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Cars.co.za lead routed to Andre",
      "Hyundai Tucson moved to finance",
      "BMW 320i marked ready to publish",
      "New enquiry from website",
      "Test drive booked for Thabo Mokoena",
      "Finance application submitted for Pieter Botha",
    ],
  },
];

export const workshopSections: DemoSection[] = [
  {
    id: "overview",
    label: "Overview",
    subtitle: "Workshop command centre",
    metrics: [
      { label: "Open jobs", value: "38", detail: "7 due today", accent: "#60A5FA" },
      { label: "Waiting parts", value: "7", detail: "Brake pads, filters", accent: "#F5D36C" },
      { label: "Technicians", value: "6", detail: "Currently working", accent: "#60A5FA" },
      { label: "Bookings this week", value: "14", detail: "3 open slots", accent: "#67E8F9" },
      { label: "Jobs overdue", value: "4", detail: "Needs action", accent: "#f97316" },
      { label: "Invoice-ready", value: "9", detail: "Ready for admin", accent: "#67E8F9" },
    ],
    actions: [
      { id: "create-job", label: "Create job card", primary: true },
      { id: "view-bays", label: "View bay status", primary: false },
    ],
    alerts: [
      { type: "warning", message: "4 jobs overdue - requires manager review" },
      { type: "info", message: "7 jobs waiting on parts" },
    ],
    activity: [
      "JC-048 customer update sent",
      "JC-050 flagged waiting on brake pads",
      "Invoice-ready summary generated",
      "New booking created",
    ],
  },
  {
    id: "job-cards",
    label: "Job Cards",
    subtitle: "Active jobs and status tracking",
    metrics: [
      { label: "Open jobs", value: "38", detail: "Total", accent: "#60A5FA" },
      { label: "In progress", value: "14", detail: "Currently being worked on", accent: "#67E8F9" },
      { label: "Quality check", value: "6", detail: "Awaiting sign-off", accent: "#F5D36C" },
      { label: "Completed today", value: "9", detail: "Ready for invoice", accent: "#60A5FA" },
    ],
    actions: [
      { id: "create-job", label: "New job card", primary: true },
      { id: "parts-order", label: "Order parts", primary: false },
    ],
    alerts: [
      { type: "warning", message: "JC-050 waiting on brake pads - 3 days" },
      { type: "info", message: "6 jobs in quality check" },
    ],
    records: [
      { id: "JC-048", name: "Toyota Hilux service", category: "Service", status: "In Progress", owner: "Sipho M.", value: "R4,800", detail: "Customer update sent", stage: "In Progress", created: "2024-01-14", priority: "Medium", contact: "client@email.com", phone: "0821234567" },
      { id: "JC-049", name: "VW Polo clutch inspection", category: "Diagnostics", status: "Diagnosing", owner: "Mia K.", value: "R1,650", detail: "Inspection underway", stage: "Diagnosing", created: "2024-01-15", priority: "High", contact: "client2@email.com", phone: "0822345678" },
      { id: "JC-050", name: "Ford Ranger brake pads", category: "Parts", status: "Waiting Parts", owner: "Jaco L.", value: "R3,900", detail: "Brake pads below reorder", stage: "Waiting Parts", created: "2024-01-12", priority: "High", contact: "client3@email.com", phone: "0823456789" },
      { id: "JC-051", name: "Hyundai Tucson diagnostics", category: "Diagnostics", status: "Quality Check", owner: "Sipho M.", value: "R2,100", detail: "Report pending", stage: "Quality Check", created: "2024-01-11", priority: "Medium", contact: "client4@email.com", phone: "0824567890" },
      { id: "JC-052", name: "BMW oil leak check", category: "Repair", status: "Booked", owner: "Mia K.", value: "R2,850", detail: "Booked for tomorrow", stage: "Booked", created: "2024-01-15", priority: "Low", contact: "client5@email.com", phone: "0825678901" },
    ],
    activity: [
      "JC-048 moved to In Progress",
      "JC-049 diagnostic started",
      "JC-050 parts ordered",
      "JC-051 quality check pending",
    ],
  },
  {
    id: "bookings",
    label: "Bookings",
    subtitle: "Customer appointments",
    metrics: [
      { label: "This week", value: "14", detail: "Total bookings", accent: "#67E8F9" },
      { label: "Confirmed", value: "11", detail: "Confirmed", accent: "#60A5FA" },
      { label: "Open slots", value: "3", detail: "Available", accent: "#F5D36C" },
      { label: "This month", value: "52", detail: "Projected", accent: "#67E8F9" },
    ],
    actions: [
      { id: "create-booking", label: "New booking", primary: true },
      { id: "confirm-all", label: "Confirm pending", primary: false },
    ],
    alerts: [
      { type: "info", message: "3 open slots available this week" },
    ],
    records: [
      { id: "BK-101", name: "Toyota Corolla", category: "Service", status: "Confirmed", owner: "Sipho M.", value: "Mon 09:00", detail: "Full service", stage: "Confirmed", created: "2024-01-10", priority: "Medium", contact: "book1@email.com", phone: "0821111111" },
      { id: "BK-102", name: "Honda Civic", category: "Repair", status: "Pending", owner: "Unassigned", value: "Mon 11:00", detail: "Awaiting confirmation", stage: "Pending", created: "2024-01-14", priority: "High", contact: "book2@email.com", phone: "0822222222" },
    ],
    activity: [
      "Booking BK-101 confirmed",
      "New booking request received",
    ],
  },
  {
    id: "parts",
    label: "Parts",
    subtitle: "Inventory and ordering",
    metrics: [
      { label: "In stock", value: "847", detail: "Unique parts", accent: "#67E8F9" },
      { label: "Low stock", value: "18", detail: "Reorder needed", accent: "#F5D36C" },
      { label: "On order", value: "12", detail: "Pending delivery", accent: "#60A5FA" },
      { label: "Value", value: "R245k", detail: "Stock value", accent: "#67E8F9" },
    ],
    actions: [
      { id: "order-parts", label: "Order parts", primary: true },
      { id: "stock-check", label: "Stock audit", primary: false },
    ],
    alerts: [
      { type: "warning", message: "18 parts below reorder level" },
    ],
    records: [
      { id: "PT-201", name: "Brake pads (front)", category: "Brakes", status: "Low Stock", owner: "Procurement", value: "R2,400", detail: "4 units left", stage: "Low Stock", created: "2024-01-01", priority: "High", contact: "", phone: "" },
      { id: "PT-202", name: "Oil filter", category: "Filters", status: "In Stock", owner: "Warehouse", value: "R450", detail: "48 units", stage: "In Stock", created: "2024-01-01", priority: "Medium", contact: "", phone: "" },
    ],
    activity: [
      "Brake pads reorder triggered",
      "Parts delivery received",
    ],
  },
  {
    id: "technicians",
    label: "Technicians",
    subtitle: "Team workload and status",
    metrics: [
      { label: "Active", value: "6", detail: "Currently working", accent: "#67E9F9" },
      { label: "Available", value: "2", detail: "Can take jobs", accent: "#60A5FA" },
      { label: "On break", value: "1", detail: "On pause", accent: "#F5D36C" },
      { label: "Jobs this week", value: "28", detail: "Per technician avg", accent: "#67E8F9" },
    ],
    actions: [],
    alerts: [],
    records: [
      { id: "TECH-01", name: "Sipho Mthembu", category: "Senior Tech", status: "Working", owner: "Bay 2", value: "4 jobs", detail: "Currently on JC-048", stage: "Working", created: "2024-01-01", priority: "High", contact: "sipho@workshop.co.za", phone: "0821111111" },
      { id: "TECH-02", name: "Mia Kleyn", category: "Technician", status: "Available", owner: "Bay 3", value: "0 jobs", detail: "Available for assignment", stage: "Available", created: "2024-01-01", priority: "Medium", contact: "mia@workshop.co.za", phone: "0822222222" },
    ],
    activity: [
      "Sipho assigned to JC-048",
      "Mia marked available",
    ],
  },
  {
    id: "invoices",
    label: "Invoices",
    subtitle: "Billing and payments",
    metrics: [
      { label: "Ready to invoice", value: "9", detail: "Jobs completed", accent: "#67E8F9" },
      { label: "Sent", value: "23", detail: "This month", accent: "#60A5FA" },
      { label: "Paid", value: "R89k", detail: "This month", accent: "#67E8F9" },
      { label: "Outstanding", value: "R12k", detail: "Awaiting payment", accent: "#F5D36C" },
    ],
    actions: [
      { id: "generate-inv", label: "Generate invoice", primary: true },
    ],
    alerts: [
      { type: "warning", message: "R12k outstanding - follow up required" },
    ],
    activity: [
      "Invoice INV-2024-089 generated",
      "Payment received for INV-2024-075",
    ],
  },
  {
    id: "activity",
    label: "Activity",
    subtitle: "Recent workshop actions",
    metrics: [
      { label: "Jobs completed", value: "47", detail: "This week", accent: "#67E8F9" },
      { label: "Updates sent", value: "34", detail: "To customers", accent: "#60A5FA" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "JC-048 customer updated",
      "JC-050 flagged waiting on brake pads",
      "Invoice-ready summary generated",
      "New booking created",
    ],
  },
];

export const agencySections: DemoSection[] = [
  {
    id: "overview",
    label: "Overview",
    subtitle: "Agency command centre",
    metrics: [
      { label: "Active clients", value: "12", detail: "5 high-touch", accent: "#67E8F9" },
      { label: "Campaigns", value: "26", detail: "Active", accent: "#67E8F9" },
      { label: "Reports due", value: "14", detail: "Month-end", accent: "#F5D36C" },
      { label: "Approvals pending", value: "8", detail: "Waiting client", accent: "#F5D36C" },
      { label: "Leads tracked", value: "312", detail: "This month", accent: "#60A5FA" },
      { label: "Overdue tasks", value: "5", detail: "Needs action", accent: "#f97316" },
    ],
    actions: [
      { id: "new-client", label: "Add client", primary: true },
      { id: "generate-report", label: "Monthly reports", primary: false },
    ],
    alerts: [
      { type: "warning", message: "5 tasks overdue - needs account manager" },
      { type: "info", message: "8 content items pending client approval" },
    ],
    activity: [
      "Monthly report generated for Silverton Radiators",
      "Build It approval request sent",
      "Campaign milestone moved to scheduled",
    ],
  },
  {
    id: "clients",
    label: "Clients",
    subtitle: "Client accounts and dashboards",
    metrics: [
      { label: "Total clients", value: "12", detail: "Active accounts", accent: "#67E8F9" },
      { label: "High-touch", value: "5", detail: "Premium accounts", accent: "#F5D36C" },
      { label: "New this month", value: "2", detail: "Onboarding", accent: "#60A5FA" },
      { label: "Churned", value: "0", detail: "This month", accent: "#67E8F9" },
    ],
    actions: [
      { id: "add-client", label: "Add client", primary: true },
      { id: "client-report", label: "Client report", primary: false },
    ],
    alerts: [],
    records: [
      { id: "CL-101", name: "CapeStone Hermanus", category: "Local SEO", status: "Active", owner: "Account Manager", value: "R18,000", detail: "Monthly retainer", stage: "Active", created: "2024-01-01", priority: "High", contact: "hello@capestone.co.za", phone: "0283121234" },
      { id: "CL-102", name: "Build It Hermanus", category: "Campaign", status: "Active", owner: "Content Team", value: "R24,000", detail: "Campaign management", stage: "Active", created: "2024-01-05", priority: "Medium", contact: "info@buildit.co.za", phone: "0283125678" },
    ],
    activity: [
      "New client onboarding started",
      "Client dashboard updated",
    ],
  },
  {
    id: "campaigns",
    label: "Campaigns",
    subtitle: "Marketing campaigns and tracking",
    metrics: [
      { label: "Active", value: "26", detail: "Running campaigns", accent: "#67E8F9" },
      { label: "Scheduled", value: "8", detail: "Upcoming", accent: "#60A5FA" },
      { label: "Completed", value: "15", detail: "This month", accent: "#67E8F9" },
      { label: "Leads generated", value: "312", detail: "Total", accent: "#F5D36C" },
    ],
    actions: [
      { id: "create-campaign", label: "New campaign", primary: true },
    ],
    alerts: [],
    records: [
      { id: "CP-201", name: "CapeStone SEO", category: "SEO", status: "Active", owner: "SEO Team", value: "R12,000", detail: "Local SEO campaign", stage: "Active", created: "2024-01-01", priority: "High", contact: "", phone: "" },
      { id: "CP-202", name: "Build It Social", category: "Social", status: "Scheduled", owner: "Social Team", value: "R8,000", detail: "Starts Monday", stage: "Scheduled", created: "2024-01-10", priority: "Medium", contact: "", phone: "" },
    ],
    activity: [
      "Campaign CP-201 milestone completed",
      "New campaign CP-202 scheduled",
    ],
  },
  {
    id: "content",
    label: "Content",
    subtitle: "Content workflow and approvals",
    metrics: [
      { label: "In production", value: "12", detail: "Being created", accent: "#67E8F9" },
      { label: "Pending approval", value: "8", detail: "Awaiting client", accent: "#F5D36C" },
      { label: "Published", value: "34", detail: "This month", accent: "#60A5FA" },
    ],
    actions: [
      { id: "add-content", label: "Add content", primary: true },
      { id: "request-approval", label: "Request approval", primary: false },
    ],
    alerts: [
      { type: "warning", message: "8 items awaiting client approval" },
    ],
    records: [
      { id: "CT-301", name: "Blog: 5 Tips for Homeowners", category: "Blog", status: "Review", owner: "Content Team", value: "1 post", detail: "Internal review", stage: "Review", created: "2024-01-12", priority: "Medium", contact: "", phone: "" },
      { id: "CT-302", name: "Social: Product Launch", category: "Social", status: "Client Approval", owner: "Social Team", value: "3 posts", detail: "Awaiting client", stage: "Client Approval", created: "2024-01-14", priority: "High", contact: "", phone: "" },
    ],
    activity: [
      "Content CT-301 moved to review",
      "Approval request sent for CT-302",
    ],
  },
  {
    id: "approvals",
    label: "Approvals",
    subtitle: "Client sign-offs and feedback",
    metrics: [
      { label: "Pending", value: "8", detail: "Awaiting client", accent: "#F5D36C" },
      { label: "Approved today", value: "3", detail: "Signed off", accent: "#60A5FA" },
      { label: "Rejected", value: "1", detail: "Needs revision", accent: "#f97316" },
    ],
    actions: [
      { id: "send-approval", label: "Send for approval", primary: true },
    ],
    alerts: [],
    activity: [
      "Approval request sent to Build It",
      "3 items approved today",
    ],
  },
  {
    id: "reports",
    label: "Reports",
    subtitle: "Monthly reporting dashboards",
    metrics: [
      { label: "Due this week", value: "6", detail: "Client reports", accent: "#F5D36C" },
      { label: "Generated", value: "4", detail: "This week", accent: "#67E8F9" },
      { label: "Scheduled", value: "8", detail: "Auto-reports", accent: "#60A5FA" },
    ],
    actions: [
      { id: "generate-report", label: "Generate report", primary: true },
    ],
    alerts: [
      { type: "warning", message: "6 reports due this week" },
    ],
    activity: [
      "Monthly report generated for Silverton",
      "Report scheduled for automated sending",
    ],
  },
  {
    id: "tasks",
    label: "Tasks",
    subtitle: "Team task management",
    metrics: [
      { label: "Active tasks", value: "47", detail: "Team tasks", accent: "#67E8F9" },
      { label: "Due today", value: "11", detail: "Need completion", accent: "#F5D36C" },
      { label: "Overdue", value: "5", detail: "Needs attention", accent: "#f97316" },
    ],
    actions: [
      { id: "add-task", label: "Add task", primary: true },
    ],
    alerts: [
      { type: "warning", message: "5 tasks overdue" },
    ],
    activity: [
      "Task completed: Social post scheduled",
      "New task assigned to content team",
    ],
  },
  {
    id: "activity",
    label: "Activity",
    subtitle: "Recent agency actions",
    metrics: [
      { label: "Total actions", value: "89", detail: "This week", accent: "#67E8F9" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Monthly report generated for Silverton",
      "Build It approval request sent",
      "Campaign milestone moved to scheduled",
    ],
  },
];

export const constructionSections: DemoSection[] = [
  {
    id: "overview",
    label: "Overview",
    subtitle: "Project command centre",
    metrics: [
      { label: "Active projects", value: "9", detail: "Across Overberg", accent: "#F5D36C" },
      { label: "Site tasks", value: "47", detail: "12 due this week", accent: "#67E8F9" },
      { label: "Materials alerts", value: "6", detail: "Reorder risks", accent: "#f97316" },
      { label: "Subcontractors", value: "14", detail: "Active", accent: "#60A5FA" },
      { label: "Delayed milestones", value: "3", detail: "Needs review", accent: "#f97316" },
      { label: "Change orders", value: "8", detail: "Approved this month", accent: "#67E8F9" },
    ],
    actions: [
      { id: "new-project", label: "New project", primary: true },
      { id: "progress-report", label: "Client report", primary: false },
    ],
    alerts: [
      { type: "warning", message: "3 milestones delayed - needs owner review" },
      { type: "warning", message: "6 materials alerts - reorder risks" },
    ],
    activity: [
      "Material delivery risk flagged",
      "Client progress report generated",
      "Boundary wall milestone escalated",
    ],
  },
  {
    id: "projects",
    label: "Projects",
    subtitle: "All construction projects",
    metrics: [
      { label: "Active", value: "9", detail: "In progress", accent: "#F5D36C" },
      { label: "Quoted", value: "4", detail: "Awaiting start", accent: "#60A5FA" },
      { label: "Completed", value: "2", detail: "This month", accent: "#67E8F9" },
    ],
    actions: [
      { id: "create-project", label: "New project", primary: true },
    ],
    alerts: [],
    records: [
      { id: "PRJ-101", name: "Hermanus Office Renovation", category: "Renovation", status: "Active", owner: "Site Manager", value: "R420,000", detail: "Electrical milestone due", stage: "Active", created: "2024-01-05", priority: "High", contact: "client@office.co.za", phone: "0283121111" },
      { id: "PRJ-102", name: "Kleinmond Retail Fitout", category: "Fitout", status: "Material Risk", owner: "Procurement", value: "R280,000", detail: "Ceiling boards delayed", stage: "Material Risk", created: "2024-01-08", priority: "High", contact: "client@retail.co.za", phone: "0283122222" },
      { id: "PRJ-103", name: "Somerset West Boundary Wall", category: "Site work", status: "Delayed", owner: "Site Manager", value: "R180,000", detail: "Weather delay", stage: "Delayed", created: "2024-01-02", priority: "Medium", contact: "client@sw.co.za", phone: "0283123333" },
    ],
    activity: [
      "Project PRJ-101 milestone completed",
      "Material risk flagged for PRJ-102",
    ],
  },
  {
    id: "site-tasks",
    label: "Site Tasks",
    subtitle: "Task management per site",
    metrics: [
      { label: "Open tasks", value: "47", detail: "Total", accent: "#67E8F9" },
      { label: "Due this week", value: "12", detail: "This week", accent: "#F5D36C" },
      { label: "Completed", value: "23", detail: "This week", accent: "#60A5FA" },
    ],
    actions: [
      { id: "add-task", label: "Add task", primary: true },
    ],
    alerts: [],
    activity: [
      "Task completed at Hermanus site",
      "New task assigned to subcontractor",
    ],
  },
  {
    id: "materials",
    label: "Materials",
    subtitle: "Material tracking and orders",
    metrics: [
      { label: "In stock", value: "156", detail: "Items", accent: "#67E8F9" },
      { label: "On order", value: "12", detail: "Pending delivery", accent: "#60A5FA" },
      { label: "Low stock", value: "8", detail: "Reorder needed", accent: "#f97316" },
    ],
    actions: [
      { id: "order-material", label: "Order material", primary: true },
    ],
    alerts: [
      { type: "warning", message: "8 items below reorder level" },
    ],
    activity: [
      "Material delivery confirmed",
      "New order placed with supplier",
    ],
  },
  {
    id: "variations",
    label: "Variations",
    subtitle: "Change orders and variations",
    metrics: [
      { label: "Pending", value: "4", detail: "Awaiting approval", accent: "#F5D36C" },
      { label: "Approved", value: "8", detail: "This month", accent: "#67E8F9" },
      { label: "Value", value: "R245k", detail: "Approved value", accent: "#67E8F9" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Variation approved for Hermanus project",
      "New variation submitted for review",
    ],
  },
  {
    id: "subcontractors",
    label: "Subcontractors",
    subtitle: "External team management",
    metrics: [
      { label: "Active", value: "14", detail: "On sites", accent: "#67E8F9" },
      { label: "Pending invoice", value: "6", detail: "Awaiting processing", accent: "#F5D36C" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Subcontractor invoice received",
      "New subcontractor added to system",
    ],
  },
  {
    id: "deadlines",
    label: "Deadlines",
    subtitle: "Milestone tracking",
    metrics: [
      { label: "Upcoming", value: "8", detail: "This month", accent: "#F5D36C" },
      { label: "Delayed", value: "3", detail: "Needs action", accent: "#f97316" },
      { label: "Completed", value: "15", detail: "This month", accent: "#60A5FA" },
    ],
    actions: [],
    alerts: [
      { type: "warning", message: "3 milestones delayed" },
    ],
    activity: [
      "Milestone completed at Hermanus",
      "Deadline reminder sent",
    ],
  },
  {
    id: "reports",
    label: "Reports",
    subtitle: "Financial and progress reports",
    metrics: [
      { label: "Generated", value: "12", detail: "This month", accent: "#67E8F9" },
      { label: "Scheduled", value: "4", detail: "Auto-reports", accent: "#60A5FA" },
    ],
    actions: [
      { id: "generate-report", label: "Generate report", primary: true },
    ],
    activity: [
      "Progress report generated for client",
      "Financial report exported",
    ],
  },
  {
    id: "activity",
    label: "Activity",
    subtitle: "Recent project actions",
    metrics: [],
    actions: [],
    alerts: [],
    activity: [
      "Material delivery risk flagged",
      "Client progress report generated",
      "Boundary wall milestone escalated",
    ],
  },
];

export const warehouseSections: DemoSection[] = [
  {
    id: "overview",
    label: "Overview",
    subtitle: "Warehouse command centre",
    metrics: [
      { label: "Stock items", value: "1,284", detail: "In system", accent: "#67E8F9" },
      { label: "Low stock alerts", value: "18", detail: "Reorder needed", accent: "#F5D36C" },
      { label: "Dispatches today", value: "22", detail: "6 awaiting pick", accent: "#60A5FA" },
      { label: "Pending receiving", value: "11", detail: "Supplier deliveries", accent: "#67E8F9" },
      { label: "Supplier orders", value: "7", detail: "Open orders", accent: "#F5D36C" },
      { label: "Stock value", value: "R1.8m", detail: "Total value", accent: "#67E8F9" },
    ],
    actions: [
      { id: "add-stock", label: "Add stock", primary: true },
      { id: "create-receiving", label: "New receiving", primary: false },
    ],
    alerts: [
      { type: "warning", message: "18 items below reorder level" },
      { type: "info", message: "11 deliveries pending receiving" },
    ],
    activity: [
      "Brake pads reorder triggered",
      "Dispatch queue updated",
      "Solar bulbs marked pending receiving",
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    subtitle: "Current stock levels",
    metrics: [
      { label: "Total items", value: "1,284", detail: "Unique SKUs", accent: "#67E8F9" },
      { label: "In stock", value: "1,156", detail: "Available", accent: "#60A5FA" },
      { label: "Low stock", value: "18", detail: "Below reorder", accent: "#F5D36C" },
      { label: "Out of stock", value: "4", detail: "Need urgent", accent: "#f97316" },
    ],
    actions: [
      { id: "add-item", label: "Add item", primary: true },
      { id: "stock-count", label: "Stock count", primary: false },
    ],
    alerts: [
      { type: "warning", message: "18 items below reorder level" },
    ],
    records: [
      { id: "INV-501", name: "Brake pads (front)", category: "Zone A", status: "Low Stock", owner: "Warehouse Mgr", value: "R18,400", detail: "12 units - reorder triggered", stage: "Low Stock", created: "2024-01-01", priority: "High", contact: "", phone: "" },
      { id: "INV-502", name: "Oil filters", category: "Zone B", status: "In Stock", owner: "Staff", value: "R9,800", detail: "84 units available", stage: "In Stock", created: "2024-01-01", priority: "Medium", contact: "", phone: "" },
      { id: "INV-503", name: "LED work lights", category: "Zone C", status: "Dispatch", owner: "Picker", value: "R22,000", detail: "In dispatch queue", stage: "Dispatch", created: "2024-01-10", priority: "High", contact: "", phone: "" },
    ],
    activity: [
      "Stock level updated for INV-501",
      "Inventory audit completed",
    ],
  },
  {
    id: "receiving",
    label: "Receiving",
    subtitle: "Inbound stock management",
    metrics: [
      { label: "Pending", value: "11", detail: "Awaiting delivery", accent: "#F5D36C" },
      { label: "Received today", value: "4", detail: "Processed", accent: "#60A5FA" },
      { label: "Value", value: "R45k", detail: "Today's receiving", accent: "#67E8F9" },
    ],
    actions: [
      { id: "new-receiving", label: "New receiving", primary: true },
      { id: "confirm-delivery", label: "Confirm delivery", primary: false },
    ],
    alerts: [],
    records: [
      { id: "RCV-101", name: "Supplier: AutoParts Co", category: "General", status: "In Transit", owner: "Receiving", value: "R12,400", detail: "Arriving today", stage: "In Transit", created: "2024-01-15", priority: "High", contact: "orders@autoparts.co.za", phone: "0111234567" },
      { id: "RCV-102", name: "Supplier: Tools Direct", category: "Tools", status: "Arrived", owner: "Receiving", value: "R8,900", detail: "Awaiting inspection", stage: "Arrived", created: "2024-01-14", priority: "Medium", contact: "sales@toolsdirect.co.za", phone: "0112345678" },
    ],
    activity: [
      "Delivery RC-101 confirmed arriving",
      "Receiving completed for RC-102",
    ],
  },
  {
    id: "dispatch",
    label: "Dispatch",
    subtitle: "Outbound shipments",
    metrics: [
      { label: "Queued", value: "6", detail: "Awaiting pick", accent: "#F5D36C" },
      { label: "Dispatched today", value: "22", detail: "In transit", accent: "#67E8F9" },
      { label: "Delivered", value: "18", detail: "Today", accent: "#60A5FA" },
    ],
    actions: [
      { id: "create-dispatch", label: "Create dispatch", primary: true },
      { id: "print-label", label: "Print labels", primary: false },
    ],
    alerts: [],
    records: [
      { id: "DSP-201", name: "Order #4521", category: "Courier", status: "Queued", owner: "Picker A", value: "R4,200", detail: "Awaiting pick", stage: "Queued", created: "2024-01-15", priority: "High", contact: "customer1@email.com", phone: "0821111111" },
      { id: "DSP-202", name: "Order #4520", category: "Courier", status: "Dispatched", owner: "Courier", value: "R2,800", detail: "In transit - TNT123", stage: "Dispatched", created: "2024-01-15", priority: "Medium", contact: "customer2@email.com", phone: "0822222222" },
    ],
    activity: [
      "Dispatch DSP-201 moved to queued",
      "DSP-202 dispatched via courier",
    ],
  },
  {
    id: "reorder-alerts",
    label: "Reorder Alerts",
    subtitle: "Low stock warnings",
    metrics: [
      { label: "Critical", value: "4", detail: "Out of stock", accent: "#f97316" },
      { label: "Warning", value: "14", detail: "Low stock", accent: "#F5D36C" },
      { label: "Auto-ordered", value: "6", detail: "System orders", accent: "#60A5FA" },
    ],
    actions: [
      { id: "create-order", label: "Create order", primary: true },
      { id: "dismiss-alert", label: "Dismiss alert", primary: false },
    ],
    alerts: [
      { type: "warning", message: "4 items critically low - out of stock" },
    ],
    activity: [
      "Reorder alert generated for brake pads",
      "Auto-order placed for filters",
    ],
  },
  {
    id: "suppliers",
    label: "Suppliers",
    subtitle: "Supplier management",
    metrics: [
      { label: "Active suppliers", value: "24", detail: "Approved vendors", accent: "#67E8F9" },
      { label: "Open orders", value: "7", detail: "Pending delivery", accent: "#F5D36C" },
      { label: "Pending invoice", value: "3", detail: "Awaiting processing", accent: "#60A5FA" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "New supplier added",
      "Purchase order sent to supplier",
    ],
  },
  {
    id: "zones",
    label: "Zones",
    subtitle: "Warehouse zone mapping",
    metrics: [
      { label: "Zones", value: "5", detail: "A through E", accent: "#67E8F9" },
      { label: "Capacity", value: "78%", detail: "Current usage", accent: "#60A5FA" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Zone utilization report generated",
    ],
  },
  {
    id: "activity",
    label: "Activity",
    subtitle: "Recent warehouse actions",
    metrics: [],
    actions: [],
    alerts: [],
    activity: [
      "Brake pads reorder triggered",
      "Dispatch queue updated",
      "Solar bulbs marked pending receiving",
    ],
  },
];

export const farmSections: DemoSection[] = [
  {
    id: "overview",
    label: "Overview",
    subtitle: "Farm operations centre",
    metrics: [
      { label: "Active tasks", value: "31", detail: "Across blocks", accent: "#67E8F9" },
      { label: "Labour teams", value: "5", detail: "Active today", accent: "#60A5FA" },
      { label: "Equipment alerts", value: "4", detail: "Maintenance due", accent: "#F5D36C" },
      { label: "Low inputs", value: "9", detail: "Reorder needed", accent: "#F5D36C" },
      { label: "Dispatches", value: "6", detail: "Scheduled", accent: "#67E8F9" },
      { label: "Harvest batches", value: "12", detail: "Quality tracked", accent: "#67E8F9" },
    ],
    actions: [
      { id: "create-task", label: "Create task", primary: true },
      { id: "daily-report", label: "Daily summary", primary: false },
    ],
    alerts: [
      { type: "warning", message: "4 equipment items need maintenance" },
      { type: "warning", message: "9 inputs below reorder level" },
    ],
    activity: [
      "Fertiliser stock flagged low",
      "Harvest batch quality recorded",
      "Daily farm summary generated",
    ],
  },
  {
    id: "field-tasks",
    label: "Field Tasks",
    subtitle: "Task scheduling and tracking",
    metrics: [
      { label: "Scheduled", value: "31", detail: "Total tasks", accent: "#67E8F9" },
      { label: "In progress", value: "8", detail: "Currently active", accent: "#60A5FA" },
      { label: "Completed", value: "15", detail: "Today", accent: "#67E8F9" },
    ],
    actions: [
      { id: "create-task", label: "Create task", primary: true },
    ],
    alerts: [],
    records: [
      { id: "FT-101", name: "Irrigation check Block A", category: "Field", status: "Assigned", owner: "Team 1", value: "Today", detail: "Morning inspection", stage: "Assigned", created: "2024-01-15", priority: "Medium", contact: "", phone: "" },
      { id: "FT-102", name: "Fertiliser application", category: "Crop", status: "In Progress", owner: "Team 2", value: "Block C", detail: "Applying to citrus", stage: "In Progress", created: "2024-01-15", priority: "High", contact: "", phone: "" },
    ],
    activity: [
      "Task FT-101 assigned to Team 1",
      "FT-102 in progress - Block C",
    ],
  },
  {
    id: "labour",
    label: "Labour Teams",
    subtitle: "Workforce management",
    metrics: [
      { label: "Teams active", value: "5", detail: "Working today", accent: "#67E8F9" },
      { label: "Total workers", value: "28", detail: "On payroll", accent: "#60A5FA" },
      { label: "Hours logged", value: "224", detail: "Today", accent: "#67E8F9" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Team attendance recorded",
      "Hours logged for payroll",
    ],
  },
  {
    id: "equipment",
    label: "Equipment",
    subtitle: "Machinery and maintenance",
    metrics: [
      { label: "Operational", value: "12", detail: "Available", accent: "#67E8F9" },
      { label: "Maintenance due", value: "4", detail: "Needs service", accent: "#F5D36C" },
      { label: "In repair", value: "1", detail: "In workshop", accent: "#f97316" },
    ],
    actions: [
      { id: "log-maintenance", label: "Log maintenance", primary: true },
    ],
    alerts: [
      { type: "warning", message: "Tractor #3 service due at 500 hours" },
    ],
    records: [
      { id: "EQ-201", name: "Tractor #3", category: "Tractor", status: "Maintenance", owner: "Workshop", value: "500hrs", detail: "Service due", stage: "Maintenance", created: "2024-01-10", priority: "High", contact: "", phone: "" },
      { id: "EQ-202", name: "Harvester #1", category: "Harvester", status: "Operational", owner: "Field", value: "1200hrs", detail: "Working condition", stage: "Operational", created: "2024-01-01", priority: "Medium", contact: "", phone: "" },
    ],
    activity: [
      "Maintenance logged for tractor #3",
      "Equipment inspection completed",
    ],
  },
  {
    id: "inputs",
    label: "Inputs",
    subtitle: "Fertiliser and chemical stock",
    metrics: [
      { label: "In stock", value: "45", detail: "Items", accent: "#67E8F9" },
      { label: "Low stock", value: "9", detail: "Reorder needed", accent: "#F5D36C" },
      { label: "On order", value: "5", detail: "Pending delivery", accent: "#60A5FA" },
    ],
    actions: [],
    alerts: [
      { type: "warning", message: "9 inputs below reorder level" },
    ],
    records: [
      { id: "INP-301", name: "Fertiliser NPK", category: "Fertiliser", status: "Low Stock", owner: "Procurement", value: "R8,200", detail: "15 bags left", stage: "Low Stock", created: "2024-01-01", priority: "High", contact: "", phone: "" },
    ],
    activity: [
      "Input stock flagged - fertiliser low",
    ],
  },
  {
    id: "harvest",
    label: "Harvest",
    subtitle: "Batch tracking and quality",
    metrics: [
      { label: "Active batches", value: "12", detail: "In progress", accent: "#67E8F9" },
      { label: "Completed", value: "8", detail: "This season", accent: "#60A5FA" },
      { label: "Quality grade A", value: "85%", detail: "Overall", accent: "#67E8F9" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Harvest batch quality recorded",
      "New batch logged",
    ],
  },
  {
    id: "dispatch",
    label: "Dispatch",
    subtitle: "Delivery management",
    metrics: [
      { label: "Scheduled", value: "6", detail: "Today", accent: "#F5D36C" },
      { label: "Completed", value: "4", detail: "Delivered", accent: "#60A5FA" },
      { label: "Value", value: "R45k", detail: "Today's dispatch", accent: "#67E8F9" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Dispatch completed to buyer",
    ],
  },
  {
    id: "reports",
    label: "Reports",
    subtitle: "Farm reporting dashboards",
    metrics: [
      { label: "Generated", value: "8", detail: "This month", accent: "#67E8F9" },
      { label: "Scheduled", value: "3", detail: "Weekly reports", accent: "#60A5FA" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Daily farm summary generated",
      "Weekly report exported",
    ],
  },
  {
    id: "activity",
    label: "Activity",
    subtitle: "Recent farm actions",
    metrics: [],
    actions: [],
    alerts: [],
    activity: [
      "Fertiliser stock flagged low",
      "Harvest batch quality recorded",
      "Daily farm summary generated",
    ],
  },
];

export const securitySections: DemoSection[] = [
  {
    id: "overview",
    label: "Overview",
    subtitle: "Security operations centre",
    metrics: [
      { label: "Active sites", value: "11", detail: "Live contracts", accent: "#67E8F9" },
      { label: "Guards on duty", value: "38", detail: "Current shift", accent: "#60A5FA" },
      { label: "Patrols completed", value: "126", detail: "Today", accent: "#67E8F9" },
      { label: "Incidents open", value: "5", detail: "Needs review", accent: "#F5D36C" },
      { label: "Equipment alerts", value: "3", detail: "Needs attention", accent: "#f97316" },
      { label: "Check-ins", value: "142", detail: "Completed", accent: "#67E8F9" },
    ],
    actions: [
      { id: "add-incident", label: "Log incident", primary: true },
      { id: "shift-report", label: "Shift report", primary: false },
    ],
    alerts: [
      { type: "warning", message: "5 incidents require ops review" },
      { type: "warning", message: "3 equipment items need attention" },
    ],
    activity: [
      "Missed check-in escalated",
      "Incident report generated",
      "Guard assigned to warehouse patrol",
    ],
  },
  {
    id: "sites",
    label: "Sites",
    subtitle: "Client site management",
    metrics: [
      { label: "Active contracts", value: "11", detail: "Operational", accent: "#67E8F9" },
      { label: "Pending renewal", value: "2", detail: "This month", accent: "#F5D36C" },
      { label: "New quotes", value: "3", detail: "Awaiting response", accent: "#60A5FA" },
    ],
    actions: [
      { id: "add-site", label: "Add site", primary: true },
    ],
    alerts: [],
    records: [
      { id: "SITE-101", name: "Industrial Park Gate", category: "Access", status: "Active", owner: "Team A", value: "24h", detail: "Contract active", stage: "Active", created: "2024-01-01", priority: "High", contact: "manager@industrial.co.za", phone: "0111234567" },
      { id: "SITE-102", name: "Warehouse Complex", category: "Patrol", status: "Active", owner: "Team B", value: "12h", detail: "Day/night cover", stage: "Active", created: "2024-01-05", priority: "Medium", contact: "ops@warehouse.co.za", phone: "0112345678" },
    ],
    activity: [
      "Site inspection completed - Industrial Park",
      "New quote sent for Office Park",
    ],
  },
  {
    id: "shifts",
    label: "Shifts",
    subtitle: "Roster management",
    metrics: [
      { label: "Guards on duty", value: "38", detail: "Current shift", accent: "#67E8F9" },
      { label: "Next shift", value: "42", detail: "Starting soon", accent: "#60A5FA" },
      { label: "Unassigned", value: "3", detail: "Gaps in roster", accent: "#F5D36C" },
    ],
    actions: [
      { id: "create-shift", label: "Create shift", primary: true },
    ],
    alerts: [
      { type: "warning", message: "3 shift gaps need filling" },
    ],
    activity: [
      "Shift roster updated",
      "Guard assigned to night shift",
    ],
  },
  {
    id: "patrols",
    label: "Patrols",
    subtitle: "Guard patrol tracking",
    metrics: [
      { label: "Completed today", value: "126", detail: "Patrols", accent: "#67E8F9" },
      { label: "In progress", value: "8", detail: "Currently", accent: "#60A5FA" },
      { label: "Missed", value: "2", detail: "Needs review", accent: "#f97316" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Patrol completed at Industrial Park",
      "Patrol started at Warehouse",
    ],
  },
  {
    id: "incidents",
    label: "Incidents",
    subtitle: "Incident reporting",
    metrics: [
      { label: "Open", value: "5", detail: "Needs review", accent: "#F5D36C" },
      { label: "Escalated", value: "2", detail: "Senior ops", accent: "#f97316" },
      { label: "Resolved", value: "12", detail: "This week", accent: "#60A5FA" },
    ],
    actions: [
      { id: "log-incident", label: "Log incident", primary: true },
    ],
    alerts: [
      { type: "warning", message: "2 incidents escalated to senior management" },
    ],
    records: [
      { id: "INC-201", name: "Unauthorized entry attempt", category: "Access", status: "Open", owner: "Ops Manager", value: "Medium", detail: "Industrial Park - Gate 3", stage: "Open", created: "2024-01-15", priority: "High", contact: "", phone: "" },
      { id: "INC-202", name: "Equipment malfunction", category: "Equipment", status: "Resolved", owner: "Team Lead", value: "Low", detail: "Camera #4 - not recording", stage: "Resolved", created: "2024-01-14", priority: "Medium", contact: "", phone: "" },
    ],
    activity: [
      "Incident INC-201 logged and escalated",
      "INC-202 resolved - equipment fixed",
    ],
  },
  {
    id: "equipment",
    label: "Equipment",
    subtitle: "Gear and asset tracking",
    metrics: [
      { label: "Operational", value: "89", detail: "Working", accent: "#67E8F9" },
      { label: "Alerts", value: "3", detail: "Needs attention", accent: "#f97316" },
      { label: "Maintenance due", value: "5", detail: "This month", accent: "#F5D36C" },
    ],
    actions: [],
    alerts: [
      { type: "warning", message: "3 equipment items need attention" },
    ],
    activity: [
      "Radio maintenance logged",
      "Camera inspection completed",
    ],
  },
  {
    id: "checklists",
    label: "Checklists",
    subtitle: "Compliance and procedures",
    metrics: [
      { label: "Completed", value: "142", detail: "Today", accent: "#67E8F9" },
      { label: "Pending", value: "8", detail: "Awaiting", accent: "#F5D36C" },
      { label: "Compliance", value: "94%", detail: "This month", accent: "#60A5FA" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Checklist completed for night shift",
    ],
  },
  {
    id: "reporting",
    label: "Reporting",
    subtitle: "Management reports",
    metrics: [
      { label: "Generated", value: "8", detail: "This week", accent: "#67E8F9" },
      { label: "Scheduled", value: "4", detail: "Auto-reports", accent: "#60A5FA" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Weekly security report generated",
      "Client incident summary sent",
    ],
  },
  {
    id: "activity",
    label: "Activity",
    subtitle: "Recent security actions",
    metrics: [],
    actions: [],
    alerts: [],
    activity: [
      "Missed check-in escalated",
      "Incident report generated",
      "Guard assigned to warehouse patrol",
    ],
  },
];

export const customBusinessSections: DemoSection[] = [
  {
    id: "overview",
    label: "Overview",
    subtitle: "Business command centre",
    metrics: [
      { label: "Active workflows", value: "18", detail: "Running", accent: "#67E8F9" },
      { label: "Pending approvals", value: "9", detail: "Needs review", accent: "#F5D36C" },
      { label: "Portal updates", value: "24", detail: "This week", accent: "#60A5FA" },
      { label: "Staff tasks", value: "63", detail: "11 due today", accent: "#67E8F9" },
      { label: "Reports generated", value: "12", detail: "Automated", accent: "#67E8F9" },
      { label: "Automation runs", value: "87", detail: "This week", accent: "#60A5FA" },
    ],
    actions: [
      { id: "create-workflow", label: "Create workflow", primary: true },
      { id: "generate-report", label: "Generate report", primary: false },
    ],
    alerts: [
      { type: "warning", message: "9 approvals pending - needs manager review" },
    ],
    activity: [
      "Custom system summary generated",
      "Client portal module selected",
      "Role permissions preview updated",
    ],
  },
  {
    id: "workflows",
    label: "Workflows",
    subtitle: "Process automation",
    metrics: [
      { label: "Active", value: "18", detail: "Running", accent: "#67E8F9" },
      { label: "Paused", value: "3", detail: "On hold", accent: "#F5D36C" },
      { label: "Completed today", value: "45", detail: "Automations", accent: "#60A5FA" },
    ],
    actions: [
      { id: "create-workflow", label: "Create workflow", primary: true },
    ],
    alerts: [],
    records: [
      { id: "WF-101", name: "Lead follow-up", category: "Sales", status: "Active", owner: "System", value: "24/7", detail: "Automated follow-ups", stage: "Active", created: "2024-01-01", priority: "High", contact: "", phone: "" },
      { id: "WF-102", name: "Quote approval", category: "Operations", status: "Active", owner: "Manager", value: "Manual", detail: "Requires approval", stage: "Active", created: "2024-01-05", priority: "Medium", contact: "", phone: "" },
    ],
    activity: [
      "Workflow WF-101 triggered - lead notification sent",
      "Quote approval requested",
    ],
  },
  {
    id: "approvals",
    label: "Approvals",
    subtitle: "Pending decisions",
    metrics: [
      { label: "Pending", value: "9", detail: "Awaiting", accent: "#F5D36C" },
      { label: "Approved today", value: "6", detail: "Processed", accent: "#60A5FA" },
      { label: "Rejected", value: "1", detail: "Returned", accent: "#f97316" },
    ],
    actions: [
      { id: "request-approval", label: "Request approval", primary: true },
    ],
    alerts: [
      { type: "warning", message: "9 items awaiting approval" },
    ],
    activity: [
      "Approval request sent to manager",
      "Quote approved by director",
    ],
  },
  {
    id: "reports",
    label: "Reports",
    subtitle: "Business reporting",
    metrics: [
      { label: "Generated", value: "12", detail: "This week", accent: "#67E8F9" },
      { label: "Scheduled", value: "8", detail: "Auto-reports", accent: "#60A5FA" },
      { label: "Custom reports", value: "4", detail: "Built this month", accent: "#F5D36C" },
    ],
    actions: [
      { id: "create-report", label: "Create report", primary: true },
    ],
    alerts: [],
    activity: [
      "Weekly sales report generated",
      "Custom report created for finance",
    ],
  },
  {
    id: "client-portal",
    label: "Client Portal",
    subtitle: "Customer self-service",
    metrics: [
      { label: "Active users", value: "24", detail: "Logged in", accent: "#67E8F9" },
      { label: "Updates this week", value: "24", detail: "New content", accent: "#60A5FA" },
      { label: "Pending views", value: "8", detail: "Not viewed", accent: "#F5D36C" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Client viewed project update",
      "New document shared via portal",
    ],
  },
  {
    id: "automations",
    label: "Automations",
    subtitle: "Workflow triggers",
    metrics: [
      { label: "Runs today", value: "87", detail: "Automations", accent: "#67E8F9" },
      { label: "Successful", value: "84", detail: "Completed", accent: "#60A5FA" },
      { label: "Failed", value: "3", detail: "Needs review", accent: "#f97316" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Automation triggered: Send follow-up email",
      "Automation failed: Retry logic applied",
    ],
  },
  {
    id: "documents",
    label: "Documents",
    subtitle: "Document management",
    metrics: [
      { label: "Uploaded", value: "156", detail: "This month", accent: "#67E8F9" },
      { label: "Pending review", value: "12", detail: "Needs approval", accent: "#F5D36C" },
      { label: "Signed", value: "34", detail: "E-signatures", accent: "#60A5FA" },
    ],
    actions: [],
    alerts: [],
    activity: [
      "Document uploaded - Quote #4521",
      "E-signature completed",
    ],
  },
  {
    id: "activity",
    label: "Activity",
    subtitle: "Recent system activity",
    metrics: [],
    actions: [],
    alerts: [],
    activity: [
      "Custom system summary generated",
      "Client portal module selected",
      "Role permissions preview updated",
    ],
  },
];

export function getDemoSections(slug: string): DemoSection[] {
  switch (slug) {
    case "dealership":
      return dealershipSections;
    case "workshop":
      return workshopSections;
    case "agency":
      return agencySections;
    case "construction":
      return constructionSections;
    case "warehouse":
      return warehouseSections;
    case "farm":
      return farmSections;
    case "security":
      return securitySections;
    case "custom-business":
      return customBusinessSections;
    default:
      return dealershipSections;
  }
}
