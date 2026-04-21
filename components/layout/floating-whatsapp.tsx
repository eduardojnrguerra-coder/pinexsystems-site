import { MessageCircle } from "lucide-react";

import { TrackedWhatsAppLink } from "@/components/analytics/tracked-whatsapp-link";
import { whatsappCta } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <TrackedWhatsAppLink
      href={whatsappCta.href}
      target="_blank"
      rel="noopener noreferrer"
      location="floating_whatsapp"
      className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-[8px] border border-white/15 bg-[#25d366] text-white shadow-xl shadow-black/30 transition hover:scale-[1.03] md:bottom-6 md:right-6"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-8 w-8" />
    </TrackedWhatsAppLink>
  );
}
