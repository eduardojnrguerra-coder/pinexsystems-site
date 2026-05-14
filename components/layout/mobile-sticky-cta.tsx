import { TrackedDemoLink } from "@/components/analytics/tracked-demo-link";
import { primaryCta } from "@/lib/site";

export function MobileStickyCta() {
  return (
    <div className="fixed bottom-4 left-4 right-24 z-40 md:hidden">
      <TrackedDemoLink
        href={primaryCta.href}
        location="mobile_sticky_cta"
        className="cta-button w-full justify-center py-3 text-sm"
      >
        {primaryCta.label}
      </TrackedDemoLink>
    </div>
  );
}
