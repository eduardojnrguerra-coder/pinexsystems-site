import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { SiteLogo } from "@/components/layout/site-logo";
import { navLinks, siteConfig } from "@/lib/site";

const systemLinks = [
  { label: "Custom Business Systems", href: "/custom-business-systems-south-africa" },
  { label: "Owner Dashboards", href: "/owner-dashboard-system" },
  { label: "Business Dashboards", href: "/business-dashboard-system" },
  { label: "Lead Management", href: "/lead-management-system" },
  { label: "Stop Missing Leads", href: "/how-to-stop-missing-leads" },
  { label: "Sales Pipelines", href: "/custom-crm-south-africa" },
  { label: "Staff Workflows", href: "/how-to-track-staff-work" },
  { label: "Job Card Systems", href: "/workshop-management-system" },
  { label: "Warehouse Stock", href: "/warehouse-stock-system" },
  { label: "Automation & AI", href: "/business-automation-south-africa" },
  { label: "Reduce Manual Admin", href: "/how-to-reduce-manual-admin" },
];

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-[#111111]/10 bg-[#F3F2EE]">
      <div className="mx-auto grid w-full max-w-7xl gap-9 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <SiteLogo />
          <div className="mt-5 max-w-xs space-y-3">
            <p className="text-sm leading-7 text-[#555962]">
              Custom business systems built to give owners full control over
              operations, teams, and growth.
            </p>
            <div className="inline-flex rounded-full border border-[#111111]/10 bg-white px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#6b6f76]">
              Premium SaaS style for South African businesses
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-base font-semibold text-[#111111]">
            Navigation
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-[#555962]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-[#111111]" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-base font-semibold text-[#111111]">
            Systems
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-[#555962]">
            {systemLinks.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-[#111111]" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-base font-semibold text-[#111111]">
            Contact
          </h3>
          <ul className="mt-4 space-y-4 text-sm text-[#555962]">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[#6b6f76]" />
              <a href={`tel:${siteConfig.phonePlain}`} className="hover:text-[#111111]" data-event="phone_click">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[#6b6f76]" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-[#111111]" data-event="email_click">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-[#6b6f76]" />
              <span>{siteConfig.country}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#111111]/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-[#6b6f76] sm:flex-row sm:px-6 lg:px-8">
          <p>&copy; 2026 Pine X Systems. All rights reserved.</p>
          <p>Built for South African businesses</p>
        </div>
      </div>
    </footer>
  );
}
