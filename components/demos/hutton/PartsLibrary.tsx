import { useState } from "react";

import type { HuttonPart, HuttonSupplier } from "@/lib/hutton-service-types";
import {
  HuttonDataLabel,
  HuttonEmptyState,
  HuttonPanel,
  HuttonPanelHeader,
  HuttonStatusBadge,
} from "@/components/demos/hutton/HuttonUi";

function createBlankPart(supplierId: string): HuttonPart {
  return {
    id: `PART-${Date.now()}`,
    name: "Special fitment item",
    category: "Special item",
    sourceType: "Aftermarket",
    partNumber: "NEW-PART-NUM",
    alternatePartNumber: "ALT-PART-NUM",
    supplierId,
    supplierSku: "SKU-PENDING",
    unitPrice: 0,
    retailPrice: 0,
    stockOnHand: 0,
    reorderLevel: 1,
    vehicleCompatibility: ["Vehicle compatibility to capture"],
    notes: "Capture fitment notes, known issues, and best-use context here.",
    tags: ["New item", "Workshop memory"],
    lastUsedDate: "Not used yet",
  };
}

function PartEditor({
  selectedPart,
  suppliers,
  onSavePart,
}: {
  selectedPart: HuttonPart;
  suppliers: HuttonSupplier[];
  onSavePart: (part: HuttonPart) => void;
}) {
  const [draft, setDraft] = useState<HuttonPart>(selectedPart);
  const selectedSupplier =
    suppliers.find((supplier) => supplier.id === draft.supplierId) ?? suppliers[0];

  return (
    <div className="space-y-5 xl:sticky xl:top-24 xl:self-start">
      <HuttonPanel>
        <HuttonPanelHeader
          eyebrow="Selected Item"
          title={draft.name}
          description="Edit the selected item to show how Hutton builds a reusable workshop memory instead of relying on paper notes and staff recall."
        />
        <div className="space-y-4 p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              className="form-input-light"
              value={draft.name}
              onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
              placeholder="Part name"
            />
            <input
              className="form-input-light"
              value={draft.category}
              onChange={(event) =>
                setDraft((current) => ({ ...current, category: event.target.value }))
              }
              placeholder="Category"
            />
            <select
              className="form-input-light"
              value={draft.sourceType}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  sourceType: event.target.value as HuttonPart["sourceType"],
                }))
              }
            >
              <option value="OEM">OEM</option>
              <option value="Aftermarket">Aftermarket</option>
            </select>
            <select
              className="form-input-light"
              value={draft.supplierId}
              onChange={(event) =>
                setDraft((current) => ({ ...current, supplierId: event.target.value }))
              }
            >
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
            <input
              className="form-input-light"
              value={draft.partNumber}
              onChange={(event) =>
                setDraft((current) => ({ ...current, partNumber: event.target.value }))
              }
              placeholder="Part number"
            />
            <input
              className="form-input-light"
              value={draft.alternatePartNumber}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  alternatePartNumber: event.target.value,
                }))
              }
              placeholder="Alternate part number"
            />
            <input
              className="form-input-light"
              value={draft.unitPrice}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  unitPrice: Number.parseFloat(event.target.value) || 0,
                }))
              }
              placeholder="Cost"
            />
            <input
              className="form-input-light"
              value={draft.retailPrice}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  retailPrice: Number.parseFloat(event.target.value) || 0,
                }))
              }
              placeholder="Sell price"
            />
          </div>

          <textarea
            className="form-input-light min-h-24"
            value={draft.vehicleCompatibility.join(", ")}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                vehicleCompatibility: event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
            placeholder="Compatible vehicles"
          />
          <textarea
            className="form-input-light min-h-24"
            value={draft.notes}
            onChange={(event) => setDraft((current) => ({ ...current, notes: event.target.value }))}
            placeholder="Workshop notes"
          />
          <input
            className="form-input-light"
            value={draft.tags.join(", ")}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                tags: event.target.value
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean),
              }))
            }
            placeholder="Tags"
          />
          <div className="flex flex-wrap gap-3">
            <button type="button" className="cta-button" onClick={() => onSavePart(draft)}>
              Save item
            </button>
            <HuttonStatusBadge value="Library item active" />
          </div>
        </div>
      </HuttonPanel>

      <HuttonPanel>
        <HuttonPanelHeader
          eyebrow="Supplier Intelligence"
          title="Active supplier profile"
          description="The parts library doubles as a buying memory for advisors, technicians, and parts staff."
        />
        <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
          <HuttonDataLabel label="Supplier" value={selectedSupplier?.name} />
          <HuttonDataLabel label="Contact" value={selectedSupplier?.contact} />
          <HuttonDataLabel label="Phone" value={selectedSupplier?.phone} />
          <HuttonDataLabel label="Email" value={selectedSupplier?.email} />
          <HuttonDataLabel label="SLA" value={selectedSupplier?.sla} />
          <HuttonDataLabel label="Last used" value={draft.lastUsedDate} />
        </div>
      </HuttonPanel>
    </div>
  );
}

export function PartsLibrary({
  parts,
  suppliers,
  selectedPart,
  onSelectPart,
  onSavePart,
  search,
  onSearchChange,
}: {
  parts: HuttonPart[];
  suppliers: HuttonSupplier[];
  selectedPart: HuttonPart;
  onSelectPart: (partId: string) => void;
  onSavePart: (part: HuttonPart) => void;
  search: string;
  onSearchChange: (value: string) => void;
}) {

  return (
    <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
      <HuttonPanel>
        <HuttonPanelHeader
          eyebrow="Parts & Extras Library"
          title="Parts and fitment memory"
          description="Search supplier knowledge, alternates, pricing, compatibility, and repeat-fitment notes from one place."
          aside={
            <div className="flex flex-wrap gap-2">
              <input
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                className="form-input-light min-w-0 sm:w-72"
                placeholder="Search name, part number, supplier, vehicle, tag..."
              />
              <button
                type="button"
                className="cta-secondary"
                onClick={() => {
                  const nextPart = createBlankPart(suppliers[0]?.id ?? "");
                  onSavePart(nextPart);
                }}
              >
                Add memory item
              </button>
            </div>
          }
        />
        <div className="overflow-x-auto p-4 sm:p-5">
          <table className="w-full min-w-[1080px] border-collapse text-left text-sm">
            <thead className="border-b border-[#111111]/10 text-xs uppercase tracking-[0.12em] text-[#7b7e86]">
              <tr>
                <th className="px-3 py-3">Part</th>
                <th className="px-3 py-3">Supplier</th>
                <th className="px-3 py-3">Vehicles</th>
                <th className="px-3 py-3">Pricing</th>
                <th className="px-3 py-3">Knowledge tags</th>
                <th className="px-3 py-3">Last used</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#111111]/8">
              {parts.length ? parts.map((part) => {
                const supplier = suppliers.find((item) => item.id === part.supplierId);
                const active = part.id === selectedPart.id;
                return (
                  <tr
                    key={part.id}
                    className={`cursor-pointer align-top transition ${
                      active ? "bg-[#f4fbff]" : "hover:bg-[#FAFAF7]"
                    }`}
                    onClick={() => onSelectPart(part.id)}
                  >
                    <td className="px-3 py-4">
                      <p className="font-semibold text-[#111111]">{part.name}</p>
                      <p className="mt-1 text-xs text-[#7b7e86]">
                        {part.partNumber} / {part.alternatePartNumber}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <HuttonStatusBadge value={part.category} />
                        <HuttonStatusBadge value={part.sourceType} />
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <p className="font-medium text-[#111111]">{supplier?.name}</p>
                      <p className="mt-1 text-xs text-[#7b7e86]">{supplier?.contact}</p>
                      <p className="mt-1 text-xs text-[#7b7e86]">{supplier?.phone}</p>
                    </td>
                    <td className="px-3 py-4 text-[#555962]">
                      {part.vehicleCompatibility.join(", ")}
                    </td>
                    <td className="px-3 py-4 text-[#555962]">
                      Cost R {part.unitPrice.toLocaleString("en-ZA")}
                      <br />
                      Sell R {part.retailPrice.toLocaleString("en-ZA")}
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex flex-wrap gap-2">
                        {part.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[#111111]/10 bg-[#FAFAF7] px-2.5 py-1 text-xs text-[#555962]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-[#555962]">{part.lastUsedDate}</td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={6} className="px-3 py-6">
                    <HuttonEmptyState
                      title="No library matches this search"
                      detail="Try a supplier name, vehicle line, alternate number, or workshop tag."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </HuttonPanel>

      <PartEditor
        key={selectedPart.id}
        selectedPart={selectedPart}
        suppliers={suppliers}
        onSavePart={onSavePart}
      />
    </div>
  );
}
