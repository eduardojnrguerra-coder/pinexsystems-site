"use client";

import { SendHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { trackDemoRequest, trackLeadConversion } from "@/lib/gtag";
import { siteConfig } from "@/lib/site";

interface LeadFormProps {
  id?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  leadOffer?: string;
  submitEvent?: string;
  compact?: boolean;
  tone?: "dark" | "light";
}

const contactMethods = ["WhatsApp", "Phone Call", "Email"] as const;

type FormState = {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  industry: string;
  biggestProblem: string;
  systemNeeded: string;
  preferredContact: string;
};

const initialState: FormState = {
  name: "",
  businessName: "",
  phone: "",
  email: "",
  industry: "",
  biggestProblem: "",
  systemNeeded: "",
  preferredContact: "WhatsApp",
};

export function LeadForm({
  id = "lead-form",
  title = "Get a Free System Audit for Your Business",
  subtitle = "Tell us where your business is losing time, leads, control or visibility. We'll review it and send back practical system ideas.",
  buttonLabel = "Get My Free System Audit",
  leadOffer = "Free Business System Audit",
  submitEvent = "free_audit_click",
  compact = false,
  tone = "dark",
}: LeadFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const isLight = tone === "light";

  const isValid = useMemo(() => {
    return (
      form.name.trim() &&
      form.businessName.trim() &&
      form.phone.trim() &&
      form.email.trim() &&
      form.industry.trim() &&
      form.biggestProblem.trim() &&
      form.systemNeeded.trim()
    );
  }, [form]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      setStatus("Please complete all required fields before submitting.");
      return;
    }

    setSubmitting(true);
    setStatus("");

    try {
      const payload = {
        ...form,
        lead_offer: leadOffer,
        submittedAt: new Date().toISOString(),
        source: "contact_form",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`API responded with ${res.status}`);
      }

      const { success } = await res.json();

      if (!success) {
        throw new Error("API returned failure");
      }

      trackDemoRequest({
        location: id,
        system: form.systemNeeded,
      });
      trackLeadConversion({
        location: id,
        method: "form",
        preferredContact: form.preferredContact,
      });

      setStatus(
        "Thanks for reaching out. We will review your request and get back to you within one business day. No spam, no hard sell.",
      );
      setForm(initialState);
    } catch (error) {
      console.error("Pine X Systems - Lead submission error:", error);
      setStatus(
        "Sorry, we could not send your message right now. Please try again, or reach us directly via WhatsApp or email.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id={id}
      className={`relative overflow-hidden rounded-[8px] border ${
        isLight
          ? "border-[#d9d9d1] bg-white text-[#0b0c10] shadow-[0_24px_70px_rgba(17,24,39,0.1)]"
          : "border-white/10 bg-[#0a0a0a] text-white"
      } ${
        compact ? "p-5 sm:p-6" : "p-6 sm:p-8"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${
          isLight ? "via-[#67E8F9]/60" : "via-white/35"
        } to-transparent`}
      />
      <div className="relative">
        <p
          className={`inline-flex rounded-[6px] border px-3 py-1 text-xs font-medium ${
            isLight
              ? "border-[#d9d9d1] bg-[#f7f7f2] text-[#50545b]"
              : "border-white/10 bg-white/[0.03] text-neutral-300"
          }`}
        >
          Free consultation
        </p>
        <h2
          className={`mt-4 font-heading text-2xl font-semibold leading-tight sm:text-4xl ${
            isLight ? "text-[#0b0c10]" : "text-white"
          }`}
        >
          {title}
        </h2>
        <p
          className={`mt-3 max-w-3xl text-sm leading-7 sm:text-base ${
            isLight ? "text-[#555962]" : "text-neutral-400"
          }`}
        >
          {subtitle}
        </p>

        <form
          className="mt-6 grid gap-4 sm:grid-cols-2"
          onSubmit={handleSubmit}
          noValidate
        >
          <input type="hidden" name="lead_offer" value={leadOffer} />
          <label className="flex flex-col gap-2">
            <span className={`text-sm font-medium ${isLight ? "text-[#3d4147]" : "text-neutral-300"}`}>
              Name *
            </span>
            <input
              required
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              className={`form-input ${isLight ? "form-input-light" : ""}`}
              placeholder="Your name"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className={`text-sm font-medium ${isLight ? "text-[#3d4147]" : "text-neutral-300"}`}>
              Business Name *
            </span>
            <input
              required
              value={form.businessName}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  businessName: event.target.value,
                }))
              }
              className={`form-input ${isLight ? "form-input-light" : ""}`}
              placeholder="Business name"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className={`text-sm font-medium ${isLight ? "text-[#3d4147]" : "text-neutral-300"}`}>
              Phone / WhatsApp *
            </span>
            <input
              required
              value={form.phone}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, phone: event.target.value }))
              }
              className={`form-input ${isLight ? "form-input-light" : ""}`}
              placeholder="WhatsApp / phone"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className={`text-sm font-medium ${isLight ? "text-[#3d4147]" : "text-neutral-300"}`}>
              Email Address *
            </span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              className={`form-input ${isLight ? "form-input-light" : ""}`}
              placeholder="you@company.com"
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className={`text-sm font-medium ${isLight ? "text-[#3d4147]" : "text-neutral-300"}`}>
              Industry *
            </span>
            <input
              required
              value={form.industry}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, industry: event.target.value }))
              }
              className={`form-input ${isLight ? "form-input-light" : ""}`}
              placeholder="Dealership, workshop, agency, construction, etc."
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className={`text-sm font-medium ${isLight ? "text-[#3d4147]" : "text-neutral-300"}`}>
              Biggest Operational Problem *
            </span>
            <textarea
              required
              value={form.biggestProblem}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  biggestProblem: event.target.value,
                }))
              }
              className={`form-input min-h-24 resize-y ${isLight ? "form-input-light" : ""}`}
              placeholder="What is slowing the business down?"
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className={`text-sm font-medium ${isLight ? "text-[#3d4147]" : "text-neutral-300"}`}>
              What System Do You Need? *
            </span>
            <textarea
              required
              value={form.systemNeeded}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, systemNeeded: event.target.value }))
              }
              className={`form-input min-h-24 resize-y ${isLight ? "form-input-light" : ""}`}
              placeholder="Owner dashboard, lead system, job cards, portal, etc."
            />
          </label>

          <label className="flex flex-col gap-2 sm:col-span-2">
            <span className={`text-sm font-medium ${isLight ? "text-[#3d4147]" : "text-neutral-300"}`}>
              Preferred Contact Method
            </span>
            <select
              value={form.preferredContact}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  preferredContact: event.target.value,
                }))
              }
              className={`form-input ${isLight ? "form-input-light" : ""}`}
            >
              {contactMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="cta-button mt-2 sm:col-span-2 disabled:opacity-60 disabled:cursor-not-allowed"
            aria-label="Submit demo request"
            data-event={submitEvent}
          >
            {submitting ? "Sending..." : buttonLabel}{" "}
            <SendHorizontal className={`h-4 w-4 ${submitting ? "animate-pulse" : ""}`} />
          </button>
        </form>

        <p className={`mt-3 text-sm ${isLight ? "text-[#6b6f77]" : "text-neutral-500"}`}>
          No spam. No hard sell. We only contact you about your demo request and the workflow problem you described.
        </p>
        {status ? (
          <div
            className={`mt-3 rounded-[8px] p-3 text-sm leading-6 ${
              submitting
                ? ""
                : status.includes("Sorry") || status.includes("Please complete")
                ? "border border-[#f97316]/40 bg-[#FFF7ED] text-[#9a3412]"
                : "border border-[#67E8F9]/40 bg-[#ECFDF5] text-[#065f46]"
            }`}
            role="status"
          >
            <p>{status}</p>
            {!submitting && (status.includes("Sorry") || status.includes("could not")) && (
              <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
                <a
                  href={`https://wa.me/${siteConfig.phonePlain.replace("+", "")}`}
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
                >
                  Email Pine X Systems
                </a>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
