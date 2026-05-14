export const siteConfig = {
  name: "Pine X Systems",
  shortName: "Pine X",
  domain: "https://pinexsystems.co.za",
  email: "eddy@pinexsystems.co.za",
  phoneDisplay: "063 803 5628",
  phonePlain: "+27638035628",
  country: "South Africa",
  description:
    "Pine X Systems builds custom business dashboards, automation platforms, lead systems, staff workflows, and operational tools for South African businesses.",
  ogImage: "/og-pinexsystems.svg",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Calculator", href: "/business-loss-calculator" },
  { label: "Demos", href: "/demos" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const primaryCta = {
  label: "Get My Free System Audit",
  href: "/contact#lead-form",
};

export const whatsappCta = {
  label: "WhatsApp",
  href: `https://wa.me/${siteConfig.phonePlain.replace("+", "")}`,
};
