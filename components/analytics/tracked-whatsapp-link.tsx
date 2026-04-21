"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { trackWhatsAppClick } from "@/lib/gtag";

type TrackedWhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  location: string;
};

export function TrackedWhatsAppLink({
  children,
  location,
  onClick,
  ...props
}: TrackedWhatsAppLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackWhatsAppClick({
          location,
          label:
            typeof children === "string" ? children : props["aria-label"] ?? "WhatsApp",
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
