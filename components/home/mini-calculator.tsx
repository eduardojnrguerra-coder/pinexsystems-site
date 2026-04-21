"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

type MiniCalculatorValues = {
  leadsPerMonth: number;
  missedLeads: number;
  averageDealValue: number;
  adminHoursWasted: number;
};

type FieldKey = keyof MiniCalculatorValues;

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}

function cleanValues(values: MiniCalculatorValues): MiniCalculatorValues {
  return {
    leadsPerMonth: clamp(Math.round(values.leadsPerMonth), 1, 500),
    missedLeads: clamp(Math.round(values.missedLeads), 0, Math.min(200, values.leadsPerMonth)),
    averageDealValue: clamp(Math.round(values.averageDealValue), 500, 75000),
    adminHoursWasted: clamp(Math.round(values.adminHoursWasted), 0, 40),
  };
}

const currencyFormatter = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
  maximumFractionDigits: 0,
});

function formatCurrency(value: number) {
  return currencyFormatter
    .format(Math.max(0, Math.round(value)))
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ");
}

function parseControlValue(value: string) {
  if (value.trim() === "") return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

const defaultValues: MiniCalculatorValues = {
  leadsPerMonth: 80,
  missedLeads: 12,
  averageDealValue: 6500,
  adminHoursWasted: 8,
};

const presets: { label: string; values: MiniCalculatorValues }[] = [
  {
    label: "Small Business",
    values: { leadsPerMonth: 40, missedLeads: 6, averageDealValue: 4000, adminHoursWasted: 5 },
  },
  {
    label: "Medium Business",
    values: { leadsPerMonth: 120, missedLeads: 18, averageDealValue: 8500, adminHoursWasted: 12 },
  },
  {
    label: "High Volume",
    values: { leadsPerMonth: 250, missedLeads: 35, averageDealValue: 5000, adminHoursWasted: 20 },
  },
];

interface FieldConfig {
  key: FieldKey;
  label: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}

function formatLeadValue(v: number) {
  return String(Math.round(v));
}

function formatDealValue(v: number) {
  return formatCurrency(v);
}

function formatHourValue(v: number) {
  return String(Math.round(v));
}

const fieldConfigs: FieldConfig[] = [
  { 
    key: "leadsPerMonth", 
    label: "Leads per month", 
    min: 1, 
    max: 500, 
    step: 1,
    format: formatLeadValue,
  },
  { 
    key: "missedLeads", 
    label: "Missed leads", 
    min: 0, 
    max: 200, 
    step: 1,
    format: formatLeadValue,
  },
  { 
    key: "averageDealValue", 
    label: "Avg deal value (ZAR)", 
    min: 500, 
    max: 75000, 
    step: 500,
    format: formatDealValue,
  },
  { 
    key: "adminHoursWasted", 
    label: "Admin hours/week", 
    min: 0, 
    max: 40, 
    step: 1,
    format: formatHourValue,
  },
];

export function MiniCalculator() {
  const [values, setValues] = useState<MiniCalculatorValues>(defaultValues);
  const [activePreset, setActivePreset] = useState("Medium Business");

  const updateField = useCallback((key: FieldKey, rawValue: number) => {
    setActivePreset("Custom");
    setValues((current) => {
      const config = fieldConfigs.find(f => f.key === key);
      const max = key === "missedLeads" 
        ? Math.min(200, current.leadsPerMonth) 
        : (config?.max ?? 500);
      const min = config?.min ?? 0;
      const step = config?.step ?? 1;
      const nextValue = Math.round(clamp(rawValue, min, max) / step) * step;
      return cleanValues({ ...current, [key]: nextValue });
    });
  }, []);

  const handleSliderChange = useCallback(
    (key: FieldKey, value: number) => {
      updateField(key, value);
    },
    [updateField],
  );

  const handleNumberInput = useCallback(
    (key: FieldKey, value: string) => {
      const parsed = parseControlValue(value);
      updateField(key, parsed);
    },
    [updateField],
  );

  const applyPreset = (label: string, presetValues: MiniCalculatorValues) => {
    setActivePreset(label);
    setValues(cleanValues(presetValues));
  };

  const result = useMemo(() => {
    const estimatedCloseRate = 0.25;
    const hourlyCost = 180;
    const grossMargin = 0.35;

    const monthlyRevenueAtRisk = values.missedLeads * values.averageDealValue * estimatedCloseRate;
    const monthlyProfitAtRisk = monthlyRevenueAtRisk * grossMargin;
    const monthlyAdminWaste = values.adminHoursWasted * hourlyCost * 4.33;
    const monthlyLeakage = monthlyProfitAtRisk + monthlyAdminWaste;
    const yearlyLeakage = monthlyLeakage * 12;

    return {
      monthlyLeakage,
      yearlyLeakage,
    };
  }, [values]);

  return (
    <div className="relative overflow-hidden rounded-[12px] border border-white/12 bg-[linear-gradient(180deg,#0f141b_0%,#0b0c10_100%)] p-5 shadow-[0_32px_80px_rgba(0,0,0,0.4),0_0_60px_rgba(103,232,249,0.05)] sm:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(103,232,249,0.08),transparent_50%)]" />
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#67E8F9]/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-500/5 blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-[#67E8F9]" />
              <p className="text-[11px] uppercase tracking-[0.16em] text-[#67E8F9]">
                Instant Estimate
              </p>
            </div>
            <h3 className="mt-2 font-heading text-xl font-semibold text-white sm:text-2xl">
              How Much Are You Losing?
            </h3>
          </div>
          <span className="live-indicator animate-pulse-slow rounded-full border border-[#67E8F9]/30 bg-[#67E8F9]/10 px-3 py-1.5 text-xs font-medium text-[#67E8F9]">
            <span className="live-dot" /> Live
          </span>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset.label, preset.values)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
                  activePreset === preset.label
                    ? "border-[#67E8F9]/60 bg-[#67E8F9]/15 text-[#67E8F9] shadow-[0_0_20px_rgba(103,232,249,0.15)]"
                    : "border-white/10 bg-white/[0.04] text-[#a8a8a2] hover:border-[#67E8F9]/40 hover:text-[#d8d8d2]"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {fieldConfigs.map((field) => {
            const value = values[field.key];
            const sliderMax = field.key === "missedLeads" 
              ? Math.min(200, values.leadsPerMonth) 
              : field.max;
            
            return (
              <div key={field.key} className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-[#a8a8a2]">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    min={field.min}
                    max={sliderMax}
                    step={field.step}
                    value={value}
                    onInput={(e) => handleNumberInput(field.key, e.currentTarget.value)}
                    onChange={(e) => handleNumberInput(field.key, e.currentTarget.value)}
                    inputMode="numeric"
                    className="w-24 rounded-[6px] border border-white/10 bg-[#05070b] px-2.5 py-1.5 text-right text-sm font-semibold text-white outline-none transition-all focus:border-[#67E8F9]/60 focus:ring-1 focus:ring-[#67E8F9]/30"
                    aria-label={field.label}
                  />
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min={field.min}
                    max={sliderMax}
                    step={field.step}
                    value={value}
                    onInput={(e) => handleSliderChange(field.key, Number(e.currentTarget.value))}
                    onChange={(e) => handleSliderChange(field.key, Number(e.currentTarget.value))}
                    className="calculator-slider pointer-events-auto h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 outline-none"
                    style={{
                      background: `linear-gradient(to right, #67E8F9 0%, #67E8F9 ${((value - field.min) / (sliderMax - field.min)) * 100}%, rgba(255,255,255,0.1) ${((value - field.min) / (sliderMax - field.min)) * 100}%, rgba(255,255,255,0.1) 100%)`,
                    }}
                    aria-valuetext={field.format(value)}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-[#6b6c70]">
                  <span>{field.format(field.min)}</span>
                  <span>{field.format(sliderMax)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 overflow-hidden rounded-[10px] border border-[#67E8F9]/20 bg-[linear-gradient(135deg,rgba(103,232,249,0.08)_0%,rgba(96,165,250,0.04)_100%)] p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#a8a8a2]">Monthly leakage</p>
              <p className="mt-1 font-heading text-2xl font-semibold text-white">
                {formatCurrency(result.monthlyLeakage)}
              </p>
              <div className="absolute -left-1 top-1/2 -translate-y-1/2">
                <TrendingUp className="h-4 w-4 text-[#67E8F9] opacity-50" />
              </div>
            </div>
            <div className="relative border-l border-white/10 pl-4 sm:border-l-0 sm:pl-0">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#a8a8a2]">Yearly leakage</p>
              <p className="mt-1 font-heading text-2xl font-semibold text-[#67E8F9]">
                {formatCurrency(result.yearlyLeakage)}
              </p>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-[#6b6c70]">
          Adjust sliders to see live impact
        </p>

        <Link
          href="/business-loss-calculator"
          className="group mt-4 flex w-full items-center justify-center gap-2 rounded-[8px] border border-[#67E8F9]/40 bg-[#67E8F9]/12 px-4 py-3 text-sm font-semibold text-[#67E8F9] transition-all hover:border-[#67E8F9]/70 hover:bg-[#67E8F9]/20 hover:shadow-[0_0_25px_rgba(103,232,249,0.2)]"
        >
          Open Full Calculator <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}