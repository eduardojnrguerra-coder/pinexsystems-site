import Link from "next/link";

import { primaryCta } from "@/lib/site";

export function MobileStickyCta() {
  return (
    <div className="fixed bottom-4 left-4 right-24 z-40 md:hidden">
      <Link
        href={primaryCta.href}
        className="cta-button w-full justify-center py-3 text-sm"
      >
        Book a Free Demo
      </Link>
    </div>
  );
}
