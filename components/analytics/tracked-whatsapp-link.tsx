"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { trackWhatsAppClick } from "@/lib/gtag";

type TrackedWhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  location: string;
  "data-event"?: string;
};

export function TrackedWhatsAppLink({
  children,
  location,
  onClick,
  ...props
}: TrackedWhatsAppLinkProps) {
  const { ["data-event"]: dataEvent, ...rest } = props;

  return (
    <a
      {...rest}
      data-event={dataEvent ?? "click_whatsapp"}
      onClick={(event) => {
        trackWhatsAppClick({
          location,
          label:
            typeof children === "string" ? children : rest["aria-label"] ?? "WhatsApp",
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
