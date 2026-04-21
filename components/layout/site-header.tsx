"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { TrackedDemoLink } from "@/components/analytics/tracked-demo-link";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-whatsapp-link";
import { navLinks, primaryCta, whatsappCta } from "@/lib/site";
import { SiteLogo } from "@/components/layout/site-logo";

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#111111]/10 bg-[#F7F7F2]/88 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <SiteLogo />

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition ${
                isActivePath(pathname, link.href)
                  ? "text-[#111111]"
                  : "text-[#6b6f76] hover:text-[#111111]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <TrackedWhatsAppLink
            href={whatsappCta.href}
            target="_blank"
            rel="noopener noreferrer"
            location="header_desktop"
            className="cta-secondary"
          >
            WhatsApp
          </TrackedWhatsAppLink>
          <TrackedDemoLink
            href={primaryCta.href}
            location="header_desktop"
            className="cta-primary"
          >
            Book Demo
          </TrackedDemoLink>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-[#111111]/15 text-[#111111] lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[#111111]/10 bg-[#F7F7F2]/97 px-4 pb-5 pt-3 lg:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-[8px] border px-4 py-3 text-sm font-medium ${
                  isActivePath(pathname, link.href)
                    ? "border-[#111111]/25 bg-white text-[#111111]"
                    : "border-[#111111]/10 text-[#50545b]"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex gap-3">
            <TrackedWhatsAppLink
              href={whatsappCta.href}
              target="_blank"
              rel="noopener noreferrer"
              location="header_mobile"
              className="cta-secondary flex-1 text-center"
            >
              WhatsApp
            </TrackedWhatsAppLink>
            <TrackedDemoLink
              href={primaryCta.href}
              location="header_mobile"
              className="cta-primary flex-1 text-center"
            >
              Book Demo
            </TrackedDemoLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
