"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";

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
    leadsPerMonth: clamp(Math.round(values.leadsPerMonth), 1, 1000),
    missedLeads: clamp(Math.round(values.missedLeads), 0, Math.min(500, values.leadsPerMonth)),
    averageDealValue: clamp(Math.round(values.averageDealValue), 500, 100000),
    adminHoursWasted: clamp(Math.round(values.adminHoursWasted), 0, 80),
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

export function MiniCalculator() {
  const [values, setValues] = useState<MiniCalculatorValues>(defaultValues);
  const [activePreset, setActivePreset] = useState("Medium Business");

  const updateField = useCallback((key: FieldKey, rawValue: number) => {
    setActivePreset("Custom");
    setValues((current) => {
      const max = key === "missedLeads" ? Math.min(500, current.leadsPerMonth) : 1000;
      const nextValue = clamp(Math.round(rawValue), 0, max);
      return cleanValues({ ...current, [key]: nextValue });
    });
  }, []);

  const handleControlValue = useCallback(
    (key: FieldKey, value: string) => {
      updateField(key, parseControlValue(value));
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

  const fieldConfigs: { key: FieldKey; label: string; min: number; max: number }[] = [
    { key: "leadsPerMonth", label: "Leads per month", min: 1, max: 500 },
    { key: "missedLeads", label: "Missed leads", min: 0, max: Math.min(200, values.leadsPerMonth) },
    { key: "averageDealValue", label: "Avg deal value", min: 500, max: 50000 },
    { key: "adminHoursWasted", label: "Admin hours/week", min: 0, max: 40 },
  ];

  return (
    <div className="rounded-[8px] border border-[#111111]/10 bg-[linear-gradient(180deg,#0f141b_0%,#0b0c10_100%)] p-5 text-[#f7f7f2] shadow-[0_24px_60px_rgba(11,12,16,0.25)] sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#a8a8a2]">
            Quick Leakage Estimate
          </p>
          <h3 className="mt-2 font-heading text-xl font-semibold text-white sm:text-2xl">
            How Much Are You Losing?
          </h3>
        </div>
        <span className="live-indicator rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-[#d8d8d2]">
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

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {fieldConfigs.map((field) => {
          const value = values[field.key];
          return (
            <div key={field.key}>
              <label htmlFor={`mini-${field.key}`} className="text-xs font-medium text-[#a8a8a2]">
                {field.label}
              </label>
              <input
                id={`mini-${field.key}`}
                type="number"
                min={field.min}
                max={field.max}
                value={value}
                onInput={(event) => handleControlValue(field.key, event.currentTarget.value)}
                onChange={(event) => handleControlValue(field.key, event.currentTarget.value)}
                inputMode="numeric"
                className="mt-1.5 w-full rounded-[8px] border border-white/10 bg-[#05070b] px-3 py-2 text-sm font-semibold text-white outline-none transition focus:border-[#67E8F9]/60"
                aria-label={field.label}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs text-[#a8a8a2]">Monthly leakage</p>
            <p className="mt-1 font-heading text-2xl font-semibold text-white">
              {formatCurrency(result.monthlyLeakage)}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#a8a8a2]">Yearly leakage</p>
            <p className="mt-1 font-heading text-2xl font-semibold text-[#67E8F9]">
              {formatCurrency(result.yearlyLeakage)}
            </p>
          </div>
        </div>
      </div>

      <Link
        href="/business-loss-calculator"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-[8px] border border-[#67E8F9]/40 bg-[#67E8F9]/12 px-4 py-3 text-sm font-semibold text-[#67E8F9] transition hover:border-[#67E8F9]/60"
      >
        Open Full Calculator <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}