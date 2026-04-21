"use client";

import { SendHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { siteConfig } from "@/lib/site";

interface LeadFormProps {
  id?: string;
  title?: string;
  subtitle?: string;
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
  title = "Get A Free System Demo For Your Business",
  subtitle = "Tell us what is slowing your business down. We'll show you what a custom system could look like.",
  compact = false,
  tone = "dark",
}: LeadFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<string>("");
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

  const message = useMemo(() => {
    return [
      "Pine X Systems Demo Request",
      "",
      `Name: ${form.name}`,
      `Business name: ${form.businessName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Industry: ${form.industry}`,
      `Biggest problem: ${form.biggestProblem}`,
      `System needed: ${form.systemNeeded}`,
      `Preferred contact method: ${form.preferredContact}`,
    ].join("\n");
  }, [form]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      setStatus("Please complete all required fields before submitting.");
      return;
    }

    const whatsappUrl = `https://wa.me/${siteConfig.phonePlain.replace(
      "+",
      "",
    )}?text=${encodeURIComponent(message)}`;
    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      "Pine X Systems Demo Request",
    )}&body=${encodeURIComponent(message)}`;

    const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    if (!popup) {
      window.location.href = mailtoUrl;
    }

    setStatus(
      "Thanks. We opened WhatsApp with your details. If WhatsApp does not open, your email app will be used as fallback. We aim to respond within one business day.",
    );
    setForm(initialState);
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
            className="cta-button mt-2 sm:col-span-2"
            aria-label="Submit demo request"
          >
            Send My Demo Request <SendHorizontal className="h-4 w-4" />
          </button>
        </form>

        <p className={`mt-3 text-sm ${isLight ? "text-[#6b6f77]" : "text-neutral-500"}`}>
          No spam. No hard sell. We only contact you about your demo request and the workflow problem you described.
        </p>
        {status ? (
          <p className="mt-2 text-sm text-[var(--accent)]" role="status">
            {status}
          </p>
        ) : null}
      </div>
    </section>
  );
}
