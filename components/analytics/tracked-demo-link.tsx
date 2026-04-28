"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, PropsWithChildren } from "react";

import { trackDemoRequest } from "@/lib/gtag";

type TrackedDemoLinkProps = PropsWithChildren<
  LinkProps &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
      location: string;
      system?: string;
      "data-event"?: string;
    }
>;

export function TrackedDemoLink({
  children,
  location,
  onClick,
  system,
  ...props
}: TrackedDemoLinkProps) {
  const { ["data-event"]: dataEvent, ...rest } = props;

  return (
    <Link
      {...rest}
      data-event={dataEvent ?? "cta_book_system_review"}
      onClick={(event) => {
        trackDemoRequest({ location, system });
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
