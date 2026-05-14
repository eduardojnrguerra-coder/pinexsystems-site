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
      className="fixed bottom-20 right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-[8px] border border-white/15 bg-[#25d366] text-white shadow-xl shadow-black/30 transition hover:scale-[1.03] md:bottom-6 md:right-6 md:h-14 md:w-14"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" />
    </TrackedWhatsAppLink>
  );
}
