"use client";

import { SendHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { trackCustomEvent, trackLeadConversion } from "@/lib/gtag";
import { siteConfig } from "@/lib/site";

type ShortAuditFormState = {
  name: string;
  businessName: string;
  phone: string;
  biggestProblem: string;
};

const initialState: ShortAuditFormState = {
  name: "",
  businessName: "",
  phone: "",
  biggestProblem: "",
};

type ShortAuditFormProps = {
  id?: string;
  title?: string;
  subtitle?: string;
  problemLabel?: string;
  problemPlaceholder?: string;
  buttonLabel?: string;
  leadOffer?: string;
  source?: string;
  demoSlug?: string;
  industrySlug?: string;
  leadIntent?: string;
  startEvent?: string;
  submitEvent?: string;
  errorEvent?: string;
};

export function ShortAuditForm({
  id = "free-system-audit",
  title = "Not sure what system you need yet?",
  subtitle = "Send us your business type and the part of your operation that feels messy. We'll send back 3 practical system ideas showing what could be improved first.",
  problemLabel = "What part of your business feels messy?",
  problemPlaceholder = "Leads, job cards, staff updates, stock, reporting...",
  buttonLabel = "Send Me My Free System Ideas",
  leadOffer = "Free Business System Audit",
  source,
  demoSlug,
  industrySlug,
  leadIntent,
  startEvent = "short_form_start",
  submitEvent = "short_form_submit",
  errorEvent = "contact_form_error",
}: ShortAuditFormProps) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isValid = useMemo(
    () =>
      form.name.trim() &&
      form.businessName.trim() &&
      form.phone.trim() &&
      form.biggestProblem.trim(),
    [form],
  );
  const getQueryContext = () => {
    if (typeof window === "undefined") {
      return {
        demoSlug: undefined,
        industrySlug: undefined,
        leadIntent: undefined,
      };
    }
    const params = new URLSearchParams(window.location.search);
    return {
      demoSlug: params.get("demo_slug") ?? undefined,
      industrySlug: params.get("industry_slug") ?? undefined,
      leadIntent: params.get("lead_intent") ?? undefined,
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      setStatus("Please complete the short form so we know where to start.");
      trackCustomEvent(errorEvent, {
        location: id,
        reason: "validation",
        demo_slug: demoSlug,
        industry_slug: industrySlug,
        lead_intent: leadIntent,
      });
      return;
    }

    setSubmitting(true);
    setStatus("");

    try {
      const queryContext = getQueryContext();
      const effectiveDemoSlug = demoSlug ?? queryContext.demoSlug;
      const effectiveIndustrySlug = industrySlug ?? queryContext.industrySlug;
      const effectiveLeadIntent = leadIntent ?? queryContext.leadIntent;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          industry: "Not supplied in short audit form",
          systemNeeded: "Free system ideas and audit",
          preferredContact: "WhatsApp",
          lead_offer: leadOffer,
          source: source ?? id,
          demo_slug: effectiveDemoSlug,
          industry_slug: effectiveIndustrySlug,
          lead_intent: effectiveLeadIntent,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`API responded with ${response.status}`);
      }

      const { success } = await response.json();

      if (!success) {
        throw new Error("API returned failure");
      }

      trackLeadConversion({
        location: id,
        method: submitEvent,
        preferredContact: "WhatsApp",
      });
      trackCustomEvent(submitEvent, {
        demo_slug: effectiveDemoSlug,
        industry_slug: effectiveIndustrySlug,
        lead_intent: effectiveLeadIntent,
      });

      setStatus(
        "Thanks. We will review your workflow and send back practical system ideas.",
      );
      setForm(initialState);
    } catch (error) {
      console.error("Pine X Systems - Short audit form error:", error);
      trackCustomEvent(errorEvent, {
        location: id,
        reason: "api",
        demo_slug: demoSlug,
        industry_slug: industrySlug,
        lead_intent: leadIntent,
      });
      setStatus(
        "Sorry, we could not send your request right now. Please try again in a moment.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id={id}
      className="rounded-[8px] border border-[#111111]/10 bg-white p-5 shadow-[0_18px_45px_rgba(17,17,17,0.06)] sm:p-6"
    >
      <h2 className="font-heading text-2xl font-semibold text-[#111111]">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-[#555962] sm:text-base">
        {subtitle}
      </p>

      <form
        className="mt-5 grid gap-4 sm:grid-cols-2"
        onSubmit={handleSubmit}
        data-event={startEvent}
        noValidate
      >
        <input type="hidden" name="lead_offer" value={leadOffer} />
        {demoSlug ? <input type="hidden" name="demo_slug" value={demoSlug} /> : null}
        {industrySlug ? <input type="hidden" name="industry_slug" value={industrySlug} /> : null}
        {leadIntent ? <input type="hidden" name="lead_intent" value={leadIntent} /> : null}
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-[#3d4147]">Name *</span>
          <input
            required
            value={form.name}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, name: event.target.value }))
            }
            className="form-input form-input-light"
            placeholder="Your name"
            data-event={startEvent}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-[#3d4147]">Business name *</span>
          <input
            required
            value={form.businessName}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, businessName: event.target.value }))
            }
            className="form-input form-input-light"
            placeholder="Business name"
            data-event={startEvent}
          />
        </label>
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-sm font-medium text-[#3d4147]">WhatsApp number *</span>
          <input
            required
            value={form.phone}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, phone: event.target.value }))
            }
            className="form-input form-input-light"
            placeholder="Your WhatsApp number"
            data-event={startEvent}
          />
        </label>
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-sm font-medium text-[#3d4147]">
            {problemLabel} *
          </span>
          <textarea
            required
            value={form.biggestProblem}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, biggestProblem: event.target.value }))
            }
            className="form-input form-input-light min-h-24 resize-y"
            placeholder={problemPlaceholder}
            data-event={startEvent}
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="cta-button mt-1 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
          data-event={submitEvent}
          data-demo-slug={demoSlug}
          data-industry-slug={industrySlug}
          data-lead-intent={leadIntent}
        >
          {submitting ? "Sending..." : buttonLabel}
          <SendHorizontal className={`h-4 w-4 ${submitting ? "animate-pulse" : ""}`} />
        </button>
      </form>

      {status ? (
        status.startsWith("Sorry") || status.startsWith("Please") ? (
          <div
            className="mt-3 rounded-[8px] border border-[#f97316]/40 bg-[#FFF7ED] p-3 text-sm leading-6 text-[#9a3412]"
            role="status"
            data-event={errorEvent}
          >
            <p>{status}</p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
              <a
                href={`https://wa.me/${siteConfig.phonePlain.replace("+", "")}?text=${encodeURIComponent("Hi Eddy, I tried to submit a form on your website but it failed. Please contact me.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#25D366] px-3 py-1.5 text-white hover:bg-[#128C7E]"
                data-event="whatsapp_click"
              >
                WhatsApp Eddy
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1.5 rounded-[6px] border border-[#111111]/20 bg-[#F7F7F2] px-3 py-1.5 text-[#111111] hover:bg-[#ECEAE4]"
                data-event="email_click"
              >
                Email Pine X Systems
              </a>
            </div>
          </div>
        ) : (
          <p
            className="mt-3 rounded-[8px] border border-[#67E8F9]/40 bg-[#ECFDF5] p-3 text-sm leading-6 text-[#065f46]"
            role="status"
          >
            {status}
          </p>
        )
      ) : null}
    </section>
  );
}
