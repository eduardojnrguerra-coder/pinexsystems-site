"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

import { trackDemoRequest } from "@/lib/gtag";

type TrackedDemoLinkProps = PropsWithChildren<
  LinkProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
      location: string;
      system?: string;
    }
>;

export function TrackedDemoLink({
  children,
  location,
  onClick,
  system,
  ...props
}: TrackedDemoLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackDemoRequest({ location, system });
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
