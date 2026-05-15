import { MessageCircle } from "lucide-react";

import { TrackedDemoLink } from "@/components/analytics/tracked-demo-link";
import { TrackedWhatsAppLink } from "@/components/analytics/tracked-whatsapp-link";
import { primaryCta, siteConfig, waUrl } from "@/lib/site";

export function MobileStickyCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 border-t border-[#111111]/10 bg-[#F7F7F2]/95 p-3 backdrop-blur-lg md:hidden">
      <TrackedWhatsAppLink
        href={waUrl()}
        target="_blank"
        rel="noopener noreferrer"
        location="mobile_sticky_whatsapp"
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-[8px] bg-[#25D366] px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#128C7E]"
        data-event="whatsapp_click"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp Eddy
      </TrackedWhatsAppLink>
      <TrackedDemoLink
        href={primaryCta.href}
        location="mobile_sticky_cta"
        className="cta-button flex-1 justify-center py-3 text-sm"
        data-event="free_audit_click"
      >
        {primaryCta.label}
      </TrackedDemoLink>
    </div>
  );
}
