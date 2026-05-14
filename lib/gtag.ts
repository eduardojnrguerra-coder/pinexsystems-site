export const GA_MEASUREMENT_ID = "G-7VGHZ42416";
export const GOOGLE_ADS_ID = "AW-17867914926";
export const GOOGLE_ADS_LEAD_CONVERSION = "AW-17867914926/7YHTCKem--AbEK79ishC";

type GtagValue = string | number | boolean | undefined;
type GtagParams = Record<string, GtagValue>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function dispatch(command: string, action: string, params?: GtagParams) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  if (params) {
    window.gtag(command, action, params);
    return;
  }

  window.gtag(command, action);
}

export function trackPageView(url: string) {
  if (typeof window === "undefined") {
    return;
  }

  const parsed = new URL(url, window.location.origin);

  dispatch("event", "page_view", {
    send_to: GA_MEASUREMENT_ID,
    page_location: parsed.toString(),
    page_path: `${parsed.pathname}${parsed.search}`,
    page_title: document.title,
    page_referrer: document.referrer || undefined,
  });
}

export function trackLeadConversion(details?: {
  location?: string;
  method?: string;
  preferredContact?: string;
}) {
  dispatch("event", "generate_lead", {
    send_to: GA_MEASUREMENT_ID,
    event_category: "lead",
    event_label: details?.location ?? "lead_form_submit",
    method: details?.method,
    preferred_contact: details?.preferredContact,
  });

  dispatch("event", "conversion", {
    send_to: GOOGLE_ADS_LEAD_CONVERSION,
  });
}

export function trackWhatsAppClick(details?: {
  location?: string;
  label?: string;
}) {
  dispatch("event", "whatsapp_click", {
    send_to: GA_MEASUREMENT_ID,
    event_category: "contact",
    event_label: details?.location ?? "whatsapp_click",
    link_text: details?.label,
  });
}

export function trackDemoRequest(details?: {
  location?: string;
  system?: string;
}) {
  dispatch("event", "demo_request", {
    send_to: GA_MEASUREMENT_ID,
    event_category: "engagement",
    event_label: details?.location ?? "demo_request",
    system: details?.system,
  });
}

export function trackCustomEvent(
  eventName: string,
  params?: GtagParams,
) {
  dispatch("event", eventName, {
    send_to: GA_MEASUREMENT_ID,
    ...params,
  });
}
