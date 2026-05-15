"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle, SendHorizontal } from "lucide-react";

import { siteConfig } from "@/lib/site";
import {
  ArrowRight,
  CircleDollarSign,
  Gauge,
  LineChart,
  Percent,
  TimerReset,
  TrendingUp,
} from "lucide-react";

type CalculatorValues = {
  leadsReceived: number;
  missedLeads: number;
  averageJobValue: number;
  adminHoursPerWeek: number;
  hourlyCost: number;
  closeRate: number;
  grossMargin: number;
};

type FieldKey = keyof CalculatorValues;

type FieldConfig = {
  key: FieldKey;
  label: string;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  currency?: boolean;
  helper: string;
};

const defaultValues: CalculatorValues = {
  leadsReceived: 120,
  missedLeads: 18,
  averageJobValue: 8500,
  adminHoursPerWeek: 10,
  hourlyCost: 180,
  closeRate: 25,
  grossMargin: 35,
};

const presets: { label: string; values: CalculatorValues }[] = [
  {
    label: "Dealership",
    values: {
      leadsReceived: 120,
      missedLeads: 18,
      averageJobValue: 8500,
      adminHoursPerWeek: 10,
      hourlyCost: 180,
      closeRate: 25,
      grossMargin: 18,
    },
  },
  {
    label: "Workshop",
    values: {
      leadsReceived: 80,
      missedLeads: 10,
      averageJobValue: 4200,
      adminHoursPerWeek: 12,
      hourlyCost: 160,
      closeRate: 55,
      grossMargin: 45,
    },
  },
  {
    label: "Agency",
    values: {
      leadsReceived: 40,
      missedLeads: 8,
      averageJobValue: 15000,
      adminHoursPerWeek: 9,
      hourlyCost: 220,
      closeRate: 30,
      grossMargin: 60,
    },
  },
  {
    label: "Construction",
    values: {
      leadsReceived: 25,
      missedLeads: 5,
      averageJobValue: 60000,
      adminHoursPerWeek: 14,
      hourlyCost: 250,
      closeRate: 20,
      grossMargin: 28,
    },
  },
  {
    label: "Warehouse",
    values: {
      leadsReceived: 50,
      missedLeads: 6,
      averageJobValue: 12000,
      adminHoursPerWeek: 16,
      hourlyCost: 170,
      closeRate: 35,
      grossMargin: 32,
    },
  },
];

const fieldConfigs: FieldConfig[] = [
  {
    key: "leadsReceived",
    label: "Leads received per month",
    min: 0,
    max: 1000,
    step: 1,
    helper: "Total enquiries from WhatsApp, calls, web forms, walk-ins, and social channels.",
  },
  {
    key: "missedLeads",
    label: "Leads missed or not followed up",
    min: 0,
    max: 500,
    step: 1,
    helper: "The number of leads that go cold because follow-up is late or unclear.",
  },
  {
    key: "averageJobValue",
    label: "Average sale/job value",
    min: 500,
    max: 100000,
    step: 100,
    currency: true,
    helper: "The typical revenue value of one closed job, sale, or client opportunity.",
  },
  {
    key: "adminHoursPerWeek",
    label: "Admin hours wasted per week",
    min: 0,
    max: 80,
    step: 1,
    helper: "Hours lost to manual updates, repeated messages, spreadsheets, and rework.",
  },
  {
    key: "hourlyCost",
    label: "Hourly staff/admin cost",
    min: 50,
    max: 1000,
    step: 10,
    currency: true,
    helper: "Loaded hourly cost for the person or team doing the admin work.",
  },
  {
    key: "closeRate",
    label: "Estimated close rate",
    min: 1,
    max: 100,
    step: 1,
    suffix: "%",
    helper: "The percentage of properly followed-up opportunities that usually convert.",
  },
  {
    key: "grossMargin",
    label: "Estimated gross margin",
    min: 1,
    max: 100,
    step: 1,
    suffix: "%",
    helper: "The gross profit percentage you keep after direct job or product costs.",
  },
];

const currencyFormatter = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

const FLOATING_BREAKPOINT = 768;
const FLOATING_TOP_OFFSET = 96;

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function getFieldMax(key: FieldKey, values: CalculatorValues) {
  if (key === "missedLeads") return Math.min(500, values.leadsReceived);
  return fieldConfigs.find((field) => field.key === key)?.max ?? 100;
}

function getFieldMin(key: FieldKey) {
  return fieldConfigs.find((field) => field.key === key)?.min ?? 0;
}

function getStaticFieldMax(key: FieldKey) {
  return fieldConfigs.find((field) => field.key === key)?.max ?? 100;
}

function cleanValues(values: CalculatorValues): CalculatorValues {
  const leadsReceived = clamp(Math.round(values.leadsReceived), 0, 1000);

  return {
    leadsReceived,
    missedLeads: clamp(Math.round(values.missedLeads), 0, Math.min(500, leadsReceived)),
    averageJobValue: clamp(Math.round(values.averageJobValue), 500, 100000),
    adminHoursPerWeek: clamp(Math.round(values.adminHoursPerWeek), 0, 80),
    hourlyCost: clamp(Math.round(values.hourlyCost), 50, 1000),
    closeRate: clamp(Math.round(values.closeRate), 1, 100),
    grossMargin: clamp(Math.round(values.grossMargin), 1, 100),
  };
}

function formatCurrency(value: number) {
  return currencyFormatter
    .format(Math.max(0, Math.round(value)))
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ");
}

function formatValue(field: FieldConfig, value: number) {
  if (field.currency) return formatCurrency(value);
  return `${Math.round(value)}${field.suffix ?? ""}`;
}

function parseControlValue(value: string) {
  if (value.trim() === "") return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getRiskBand(monthlyLeakage: number) {
  if (monthlyLeakage < 20000) {
    return {
      label: "Moderate leakage",
      tone: "text-[#2563eb]",
      badge: "border-[#60A5FA]/30 bg-[#60A5FA]/10",
      message:
        "Your operation may still be losing useful revenue and time through follow-up and admin gaps.",
    };
  }

  if (monthlyLeakage < 100000) {
    return {
      label: "Serious leakage",
      tone: "text-[#b45309]",
      badge: "border-[#F5D36C]/45 bg-[#F5D36C]/14",
      message:
        "This level of leakage can quietly reduce growth, cash flow, and owner control.",
    };
  }

  return {
    label: "Critical leakage",
    tone: "text-[#b91c1c]",
    badge: "border-[#f97316]/40 bg-[#f97316]/10",
    message:
      "Your business may be losing enough each month to justify a proper control system quickly.",
  };
}

function getDiagnosis({
  monthlyRevenueRisk,
  monthlyGrossProfitRisk,
  monthlyAdminWaste,
}: {
  monthlyRevenueRisk: number;
  monthlyGrossProfitRisk: number;
  monthlyAdminWaste: number;
}) {
  const bothHigh = monthlyGrossProfitRisk >= 20000 && monthlyAdminWaste >= 20000;

  if (bothHigh) {
    return {
      headline: "A connected control system should be prioritised.",
      message:
        "Your numbers show meaningful lost sales opportunity and admin waste. A connected business control system with lead management, workflow automation, and an owner dashboard would likely have the strongest payoff.",
    };
  }

  if (monthlyRevenueRisk > monthlyAdminWaste) {
    return {
      headline: "Your biggest leakage is missed follow-up revenue.",
      message:
        "A lead management system, pipeline visibility, and owner dashboard should be prioritised before deeper workflow automation.",
    };
  }

  if (monthlyAdminWaste > monthlyRevenueRisk) {
    return {
      headline: "Your biggest leakage is workflow and admin waste.",
      message:
        "Business process automation, staff workflow control, and cleaner handovers would likely reduce wasted time fastest.",
    };
  }

  return {
    headline: "Your leakage is balanced across sales and admin.",
    message:
      "Start with follow-up control and a simple operations dashboard, then add workflow automation around the most repeated admin steps.",
  };
}

export function LeakEstimator() {
  const [values, setValues] = useState<CalculatorValues>(defaultValues);
  const [activePreset, setActivePreset] = useState("Custom");
  const [leadForm, setLeadForm] = useState({ name: "", businessName: "", phone: "", email: "" });
  const [leadStatus, setLeadStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const sectionRef = useRef<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const currentOffsetRef = useRef(0);
  const targetOffsetRef = useRef(0);
  const lastScrollYRef = useRef(0);

  const updateField = useCallback((key: FieldKey, rawValue: number) => {
    setActivePreset("Custom");
    setValues((current) => {
      const min = getFieldMin(key);
      const max = key === "missedLeads" ? Math.min(500, current.leadsReceived) : getStaticFieldMax(key);
      const nextValue = clamp(Math.round(rawValue), min, max);
      const next = cleanValues({ ...current, [key]: nextValue });

      if (key === "leadsReceived") {
        const currentMissRate =
          current.leadsReceived > 0 ? current.missedLeads / current.leadsReceived : 0;
        next.missedLeads = clamp(
          Math.round(next.leadsReceived * currentMissRate),
          0,
          Math.min(500, next.leadsReceived),
        );
      }

      return next;
    });
  }, []);

  const handleControlValue = useCallback(
    (key: FieldKey, value: string) => {
      updateField(key, parseControlValue(value));
    },
    [updateField],
  );

  const applyPreset = (label: string, presetValues: CalculatorValues) => {
    setActivePreset(label);
    setValues(cleanValues(presetValues));
  };

  const result = useMemo(() => {
    const monthlyRevenueRisk =
      values.missedLeads * values.averageJobValue * (values.closeRate / 100);
    const monthlyGrossProfitRisk = monthlyRevenueRisk * (values.grossMargin / 100);
    const monthlyAdminWaste =
      values.adminHoursPerWeek * values.hourlyCost * 4.33;
    const monthlyLeakage = monthlyGrossProfitRisk + monthlyAdminWaste;
    const yearlyLeakage = monthlyLeakage * 12;
    const yearlyRevenueRisk = monthlyRevenueRisk * 12;
    const yearlyGrossProfitRisk = monthlyGrossProfitRisk * 12;
    const risk = getRiskBand(monthlyLeakage);
    const diagnosis = getDiagnosis({
      monthlyRevenueRisk,
      monthlyGrossProfitRisk,
      monthlyAdminWaste,
    });
    const riskMeter = clamp(Math.round((monthlyLeakage / 120000) * 100), 8, 100);

    return {
      monthlyRevenueRisk,
      monthlyGrossProfitRisk,
      monthlyAdminWaste,
      monthlyLeakage,
      yearlyLeakage,
      yearlyRevenueRisk,
      yearlyGrossProfitRisk,
      risk,
      diagnosis,
      riskMeter,
    };
  }, [values]);

  const resultCards = [
    {
      label: "Monthly revenue at risk",
      value: formatCurrency(result.monthlyRevenueRisk),
      icon: CircleDollarSign,
      detail: "Potential sales value before margin.",
    },
    {
      label: "Monthly gross profit at risk",
      value: formatCurrency(result.monthlyGrossProfitRisk),
      icon: TrendingUp,
      detail: "More realistic margin-adjusted opportunity.",
    },
    {
      label: "Monthly admin waste",
      value: formatCurrency(result.monthlyAdminWaste),
      icon: TimerReset,
      detail: "Manual process cost per month.",
    },
    {
      label: "Yearly revenue at risk",
      value: formatCurrency(result.yearlyRevenueRisk),
      icon: LineChart,
      detail: "Annualised revenue exposure.",
    },
    {
      label: "Yearly gross profit at risk",
      value: formatCurrency(result.yearlyGrossProfitRisk),
      icon: Percent,
      detail: "Annualised margin-adjusted risk.",
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const panel = panelRef.current;

    if (!section || !panel || typeof window === "undefined") return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const applyFloatingState = (offset: number, depth: number, active: boolean) => {
      panel.style.transform = `translate3d(0, ${offset}px, 0)`;
      panel.style.setProperty("--floating-depth", depth.toFixed(3));
      panel.dataset.floatingActive = active ? "true" : "false";
    };

    const resetFloatingState = () => {
      currentOffsetRef.current = 0;
      targetOffsetRef.current = 0;
      applyFloatingState(0, 0, false);
    };

    const readTargetOffset = () => {
      if (window.innerWidth < FLOATING_BREAKPOINT) {
        resetFloatingState();
        return null;
      }

      const sectionRect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + sectionRect.top;
      const sectionHeight = sectionRect.height;
      const panelHeight = panel.offsetHeight;
      const maxOffset = Math.max(0, sectionHeight - panelHeight);
      const desiredOffset = clamp(
        window.scrollY + FLOATING_TOP_OFFSET - sectionTop,
        0,
        maxOffset,
      );

      return { desiredOffset, maxOffset };
    };

    const requestFrame = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;

        const layout = readTargetOffset();

        if (!layout) return;

        targetOffsetRef.current = layout.desiredOffset;
        const scrollVelocity = window.scrollY - lastScrollYRef.current;
        lastScrollYRef.current = window.scrollY;

        if (reducedMotionQuery.matches) {
          currentOffsetRef.current = targetOffsetRef.current;
        } else {
          const delta = targetOffsetRef.current - currentOffsetRef.current;
          const easing = Math.abs(delta) > 20 ? 0.18 : 0.12;
          currentOffsetRef.current += delta * easing;

          if (Math.abs(delta) < 0.25) {
            currentOffsetRef.current = targetOffsetRef.current;
          }
        }

        const isWithinBounds =
          layout.desiredOffset > 0 && layout.desiredOffset < layout.maxOffset;
        const active = isWithinBounds && Math.abs(scrollVelocity) > 0.3;
        const depth = reducedMotionQuery.matches
          ? 0
          : Math.min(
              1,
              Math.abs(scrollVelocity) / 42 + currentOffsetRef.current / 1600,
            );

        applyFloatingState(currentOffsetRef.current, depth, active);

        if (
          !reducedMotionQuery.matches &&
          Math.abs(targetOffsetRef.current - currentOffsetRef.current) > 0.25
        ) {
          requestFrame();
        }
      });
    };

    const handleViewportChange = () => requestFrame();
    const resizeObserver = new ResizeObserver(() => requestFrame());

    resizeObserver.observe(section);
    resizeObserver.observe(panel);
    lastScrollYRef.current = window.scrollY;
    requestFrame();

    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange);
    reducedMotionQuery.addEventListener("change", handleViewportChange);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }

      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      reducedMotionQuery.removeEventListener("change", handleViewportChange);
      panel.style.transform = "";
      panel.style.removeProperty("--floating-depth");
      delete panel.dataset.floatingActive;
    };
  }, []);

  const isFormValid = leadForm.name.trim() && leadForm.businessName.trim() && leadForm.phone.trim() && leadForm.email.trim();

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setLeadStatus("submitting");

    try {
      const biggestCategory =
        result.monthlyGrossProfitRisk >= result.monthlyAdminWaste
          ? "Missed follow-up revenue"
          : "Admin waste";

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          businessName: leadForm.businessName,
          phone: leadForm.phone,
          email: leadForm.email,
          source: "business_loss_calculator",
          lead_offer: "Free Business System Audit",
          preferredContact: "WhatsApp",
          industry: activePreset !== "Custom" ? activePreset : "Not specified",
          biggestProblem: [
            "Calculator results from Business Loss Calculator:",
            `- Monthly leakage: R${Math.round(result.monthlyLeakage).toLocaleString("en-ZA")}`,
            `- Yearly leakage: R${Math.round(result.yearlyLeakage).toLocaleString("en-ZA")}`,
            `- Revenue at risk (monthly): R${Math.round(result.monthlyRevenueRisk).toLocaleString("en-ZA")}`,
            `- Admin waste (monthly): R${Math.round(result.monthlyAdminWaste).toLocaleString("en-ZA")}`,
            `- Industry preset: ${activePreset}`,
            `- Biggest leakage category: ${biggestCategory}`,
            `- Risk band: ${result.risk.label}`,
          ].join("\n"),
          systemNeeded: "Free system audit from calculator",
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      if (!data.success) throw new Error("API failed");

      setLeadStatus("success");
      setLeadForm({ name: "", businessName: "", phone: "", email: "" });
    } catch {
      setLeadStatus("error");
    }
  };

  return (
    <section ref={sectionRef} className="relative overflow-visible">
      <div className="grid gap-5 md:grid-cols-[minmax(0,1.02fr)_minmax(22rem,0.98fr)] md:items-start">
        <div className="min-w-0">
          <div className="rounded-[8px] border border-[#1d2430] bg-[linear-gradient(180deg,#0f141b_0%,#0b0c10_100%)] p-5 text-[#f7f7f2] shadow-[0_32px_90px_rgba(11,12,16,0.3)] sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase text-[#a8a8a2]">
                Business leakage diagnostic
              </p>
              <h3 className="mt-3 font-heading text-2xl font-semibold text-white sm:text-3xl">
                How Much Is Operational Chaos Costing You?
              </h3>
            </div>
            <span className="live-indicator rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-[#d8d8d2]">
              <span className="live-dot" /> Live calculator
            </span>
          </div>

          <p className="mt-4 max-w-xl text-base leading-8 text-[#d8d8d2]">
            Use the sliders or type exact numbers. The leakage estimate, risk
            level, and recommendation update instantly.
          </p>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase text-[#a8a8a2]">
              Quick industry presets
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset.label, preset.values)}
                  data-event="calculator_start"
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    activePreset === preset.label
                      ? "border-[#67E8F9]/50 bg-[#67E8F9]/12 text-[#67E8F9]"
                      : "border-white/10 bg-white/[0.04] text-[#d8d8d2] hover:border-[#67E8F9]/40"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

            <div className="mt-7 grid gap-5">
              {fieldConfigs.map((field) => {
                const max = getFieldMax(field.key, values);
                const value = values[field.key];

                return (
                  <div
                    key={field.key}
                    className="block rounded-[8px] border border-white/10 bg-white/[0.035] p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="min-w-0">
                        <label
                          htmlFor={`leak-${field.key}`}
                          className="text-sm font-semibold text-white"
                        >
                          {field.label}
                        </label>
                        <p className="mt-1 max-w-xl text-xs leading-5 text-[#a8a8a2]">
                          {field.helper}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="hidden rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-sm font-medium text-white sm:inline-flex">
                          {formatValue(field, value)}
                        </span>
                        <input
                          id={`leak-${field.key}-number`}
                          type="number"
                          min={field.min}
                          max={max}
                          step={field.step}
                          value={value}
                          onInput={(event) =>
                            handleControlValue(field.key, event.currentTarget.value)
                          }
                          onChange={(event) =>
                            handleControlValue(field.key, event.currentTarget.value)
                          }
                          inputMode="numeric"
                          className="h-10 w-24 rounded-[8px] border border-white/10 bg-[#05070b] px-3 text-right text-sm font-semibold text-white outline-none transition focus:border-[#67E8F9]/60 sm:w-28"
                          aria-label={field.label}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <input
                        id={`leak-${field.key}`}
                        type="range"
                        min={field.min}
                        max={max}
                        step={field.step}
                        value={value}
                        onInput={(event) =>
                          handleControlValue(field.key, event.currentTarget.value)
                        }
                        onChange={(event) =>
                          handleControlValue(field.key, event.currentTarget.value)
                        }
                        className="w-full cursor-pointer accent-[#67E8F9]"
                        aria-valuetext={formatValue(field, value)}
                      />
                      <div className="mt-2 flex justify-between text-[11px] text-[#7f858f]">
                        <span>
                          {field.currency
                            ? formatCurrency(field.min)
                            : `${field.min}${field.suffix ?? ""}`}
                        </span>
                        <span>
                          {field.currency
                            ? formatCurrency(max)
                            : `${max}${field.suffix ?? ""}`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="min-w-0 self-start">
          <div
            ref={panelRef}
            className="floating-results-panel light-panel flex flex-col rounded-[8px] p-5 sm:p-7"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[11px] uppercase text-[#6b6c70]">
                  Estimated impact
                </p>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${result.risk.badge} ${result.risk.tone}`}
                >
                  {result.risk.label}
                </span>
              </div>

              <div className="rounded-[8px] border border-[#d9d9d1] bg-[linear-gradient(180deg,#ffffff_0%,#f7f7f2_100%)] p-5 shadow-[0_20px_60px_rgba(17,24,39,0.08)]">
                <p className="text-sm text-[#5b5f66]">
                  Estimated monthly leakage
                </p>
                <p
                  key={Math.round(result.monthlyLeakage)}
                  className="number-pop mt-3 font-heading text-4xl font-semibold text-[#0b0c10] sm:text-5xl"
                >
                  {formatCurrency(result.monthlyLeakage)}
                </p>
                <div className="mt-5 h-2.5 rounded-full bg-[#e3e3dc]">
                  <div
                    className="risk-meter-fill h-full rounded-full bg-[linear-gradient(90deg,#67E8F9,#60A5FA,#F5D36C)]"
                    style={{ width: `${result.riskMeter}%` }}
                  />
                </div>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[#53565d]">
                  This combines gross profit at risk from missed follow-up with
                  admin waste from disconnected workflows.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[8px] border border-[#d9d9d1] bg-white p-4 sm:col-span-2">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#0b0c10]">
                    <TrendingUp className="h-4 w-4 text-[#60A5FA]" />
                    Estimated yearly leakage
                  </div>
                  <p
                    key={Math.round(result.yearlyLeakage)}
                    className="number-pop mt-3 text-3xl font-semibold text-[#0b0c10]"
                  >
                    {formatCurrency(result.yearlyLeakage)}
                  </p>
                </div>

                {resultCards.map((card) => {
                  const Icon = card.icon;

                  return (
                    <div
                      key={card.label}
                      className="rounded-[8px] border border-[#d9d9d1] bg-white p-4"
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#0b0c10]">
                        <Icon className="h-4 w-4 text-[#60A5FA]" />
                        {card.label}
                      </div>
                      <p className="mt-3 text-2xl font-semibold text-[#0b0c10]">
                        {card.value}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-[#63666d]">
                        {card.detail}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="diagnosis-panel rounded-[8px] border border-[#d9d9d1] bg-[#0b0c10] p-5 text-[#f7f7f2]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <Gauge className="h-4 w-4 text-[#67E8F9]" />
                    Business diagnosis
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs text-[#d8d8d2]">
                    {result.risk.label}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#d8d8d2]">
                  {result.risk.message}
                </p>
                <div className="mt-4 rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-sm font-semibold text-white">
                    {result.diagnosis.headline}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#d8d8d2]">
                    {result.diagnosis.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm leading-7 text-[#63666d]">
                This is an estimate only. Actual results depend on margins, close
                rates, lead quality, and internal process.
              </p>
              <Link
                href="/contact#lead-form"
                data-event="calculator_submit"
                className="cta-button premium-glow mt-5 w-full sm:w-fit"
              >
                Find The Gaps In My Business <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-10">
        <div className="light-panel rounded-[8px] border border-[#d9d9d1] p-6 sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#7b7e86]">
            Next Step
          </p>
          <h2 className="mt-3 font-heading text-2xl font-semibold text-[#111111] sm:text-3xl">
            Want us to review these numbers?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#555962] sm:text-base">
            Send your calculator result to Pine X Systems and we&rsquo;ll suggest 3 practical system improvements based on where your business appears to be leaking time, leads, or control.
          </p>

          {leadStatus === "success" ? (
            <div className="mt-6 rounded-[8px] border border-[#67E8F9]/40 bg-[#ECFDF5] p-5 text-[#065f46]">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 shrink-0 text-[#10b981]" />
                <div>
                  <p className="font-semibold">Thanks for sharing your results.</p>
                  <p className="mt-1 text-sm leading-6">
                    We will review your numbers and send back practical system improvement ideas within one business day.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <form
              className="mt-6 grid gap-4 sm:grid-cols-2"
              onSubmit={handleLeadSubmit}
              data-event="calculator_lead_start"
              noValidate
            >
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#3d4147]">Name *</span>
                <input
                  required
                  value={leadForm.name}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="form-input form-input-light"
                  placeholder="Your name"
                  data-event="calculator_lead_start"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#3d4147]">Business name *</span>
                <input
                  required
                  value={leadForm.businessName}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, businessName: e.target.value }))}
                  className="form-input form-input-light"
                  placeholder="Business name"
                  data-event="calculator_lead_start"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#3d4147]">WhatsApp number *</span>
                <input
                  required
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className="form-input form-input-light"
                  placeholder="Your WhatsApp number"
                  data-event="calculator_lead_start"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#3d4147]">Email address *</span>
                <input
                  type="email"
                  required
                  value={leadForm.email}
                  onChange={(e) => setLeadForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="form-input form-input-light"
                  placeholder="you@company.com"
                  data-event="calculator_lead_start"
                />
              </label>

              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={leadStatus === "submitting"}
                  className="cta-button w-full justify-center disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  data-event="calculator_lead_submit"
                >
                  {leadStatus === "submitting" ? "Sending..." : "Send My Results For Review"}
                  <SendHorizontal className={`h-4 w-4 ${leadStatus === "submitting" ? "animate-pulse" : ""}`} />
                </button>
              </div>
            </form>
          )}

          {leadStatus === "error" && (
            <div className="mt-4 rounded-[8px] border border-[#f97316]/40 bg-[#FFF7ED] p-4 text-sm text-[#9a3412]" role="status" data-event="calculator_lead_error">
              <p>Sorry, we could not send your results right now. Please try again or reach us directly:</p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
                <a
                  href={`https://wa.me/${siteConfig.phonePlain.replace("+", "")}?text=${encodeURIComponent("Hi Eddy, I calculated my business leakage on your site but the submission failed. Please contact me.")}`}
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
                  data-event="calculator_lead_error"
                >
                  Email Pine X Systems
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
