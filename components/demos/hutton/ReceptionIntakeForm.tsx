import type { ReactNode } from "react";

import type {
  HuttonBookingForm,
  HuttonClient,
  HuttonJob,
  HuttonTechnician,
  HuttonVehicle,
} from "@/lib/hutton-service-types";
import {
  HuttonDataLabel,
  HuttonPanel,
  HuttonPanelHeader,
  HuttonStatusBadge,
} from "@/components/demos/hutton/HuttonUi";

function FieldLabel({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="text-sm text-[#555962]">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}

export function ReceptionIntakeForm({
  bookingForm,
  onBookingFormChange,
  onCreateBooking,
  client,
  vehicle,
  job,
  technicians,
  onJobUpdate,
  onCheckIn,
}: {
  bookingForm: HuttonBookingForm;
  onBookingFormChange: <K extends keyof HuttonBookingForm>(
    field: K,
    value: HuttonBookingForm[K],
  ) => void;
  onCreateBooking: () => void;
  client: HuttonClient;
  vehicle: HuttonVehicle;
  job: HuttonJob;
  technicians: HuttonTechnician[];
  onJobUpdate: (jobId: string, patch: Partial<HuttonJob>) => void;
  onCheckIn: (jobId: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <HuttonPanel>
          <HuttonPanelHeader
            eyebrow="New Booking / Reception"
            title="Digital reception intake"
            description="Capture everything reception would normally write on paper, including transport needs and service context."
          />
          <div className="space-y-4 p-4 sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <FieldLabel label="Client name">
                <input
                  className="form-input-light"
                  value={bookingForm.clientName}
                  onChange={(event) => onBookingFormChange("clientName", event.target.value)}
                />
              </FieldLabel>
              <FieldLabel label="Phone number">
                <input
                  className="form-input-light"
                  value={bookingForm.phone}
                  onChange={(event) => onBookingFormChange("phone", event.target.value)}
                />
              </FieldLabel>
              <FieldLabel label="Email">
                <input
                  className="form-input-light"
                  value={bookingForm.email}
                  onChange={(event) => onBookingFormChange("email", event.target.value)}
                />
              </FieldLabel>
              <FieldLabel label="Booking date / time">
                <input
                  className="form-input-light"
                  value={bookingForm.bookingDateTime}
                  onChange={(event) => onBookingFormChange("bookingDateTime", event.target.value)}
                />
              </FieldLabel>
              <FieldLabel label="Vehicle make">
                <input
                  className="form-input-light"
                  value={bookingForm.vehicleMake}
                  onChange={(event) => onBookingFormChange("vehicleMake", event.target.value)}
                />
              </FieldLabel>
              <FieldLabel label="Vehicle model">
                <input
                  className="form-input-light"
                  value={bookingForm.vehicleModel}
                  onChange={(event) => onBookingFormChange("vehicleModel", event.target.value)}
                />
              </FieldLabel>
              <FieldLabel label="Registration">
                <input
                  className="form-input-light"
                  value={bookingForm.registration}
                  onChange={(event) => onBookingFormChange("registration", event.target.value)}
                />
              </FieldLabel>
              <FieldLabel label="VIN">
                <input
                  className="form-input-light"
                  value={bookingForm.vin}
                  onChange={(event) => onBookingFormChange("vin", event.target.value)}
                />
              </FieldLabel>
              <FieldLabel label="Mileage">
                <input
                  className="form-input-light"
                  value={bookingForm.mileage}
                  onChange={(event) => onBookingFormChange("mileage", event.target.value)}
                />
              </FieldLabel>
            </div>

            <FieldLabel label="Service request">
              <textarea
                className="form-input-light min-h-24"
                value={bookingForm.serviceRequest}
                onChange={(event) => onBookingFormChange("serviceRequest", event.target.value)}
              />
            </FieldLabel>

            <FieldLabel label="Notes">
              <textarea
                className="form-input-light min-h-24"
                value={bookingForm.notes}
                onChange={(event) => onBookingFormChange("notes", event.target.value)}
              />
            </FieldLabel>

            <div className="rounded-[10px] border border-[#111111]/10 bg-[#FAFAF7] p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b7e86]">
                Transport requirement
              </p>
              <label className="mt-3 flex items-center gap-2 text-sm text-[#555962]">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={bookingForm.transportRequired}
                  onChange={(event) =>
                    onBookingFormChange("transportRequired", event.target.checked)
                  }
                />
                Pickup / drop-off required
              </label>

              {bookingForm.transportRequired ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <FieldLabel label="Pickup address">
                    <textarea
                      className="form-input-light min-h-24"
                      value={bookingForm.pickupAddress}
                      onChange={(event) =>
                        onBookingFormChange("pickupAddress", event.target.value)
                      }
                    />
                  </FieldLabel>
                  <FieldLabel label="Drop-off address">
                    <textarea
                      className="form-input-light min-h-24"
                      value={bookingForm.dropoffAddress}
                      onChange={(event) =>
                        onBookingFormChange("dropoffAddress", event.target.value)
                      }
                    />
                  </FieldLabel>
                </div>
              ) : null}

              {bookingForm.transportRequired ? (
                <div className="mt-4 rounded-[10px] border border-[#111111]/10 bg-white px-4 py-3 text-sm leading-6 text-[#555962]">
                  This booking will create a live transport request for the shuttle coordinator as soon as reception confirms it.
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="cta-button" onClick={onCreateBooking}>
                Create booking
              </button>
              <span className="inline-flex items-center rounded-full border border-[#111111]/10 bg-white px-3 py-2 text-xs text-[#555962]">
                Booking is added to the live demo queue
              </span>
            </div>
          </div>
        </HuttonPanel>

        <HuttonPanel>
          <HuttonPanelHeader
            eyebrow="Current Booking"
            title="Reception handover snapshot"
            description="Use this panel to convert the selected booking into a checked-in workshop job."
            aside={<HuttonStatusBadge value={job.status} />}
          />
          <div className="grid gap-3 p-4 sm:grid-cols-2 sm:p-5">
            <HuttonDataLabel label="Client" value={client.name} />
            <HuttonDataLabel label="Vehicle" value={`${vehicle.make} ${vehicle.model}`} />
            <HuttonDataLabel label="Registration" value={vehicle.registration} />
            <HuttonDataLabel label="Job number" value={job.id} />
            <HuttonDataLabel label="Booking status" value={job.bookingStatus} />
            <HuttonDataLabel label="Queue status" value={job.queueStatus} />
            <HuttonDataLabel label="Promised time" value={job.promisedTime} />
          </div>
        </HuttonPanel>
      </div>

      <HuttonPanel>
        <HuttonPanelHeader
          eyebrow="Check-In Workflow"
          title="Convert booking to active job"
          description="Capture vehicle condition, complaint detail, photos, and technician assignment as part of digital check-in."
        />
        <div className="space-y-4 p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <FieldLabel label="Vehicle condition">
              <textarea
                className="form-input-light min-h-24"
                value={job.vehicleCondition}
                onChange={(event) =>
                  onJobUpdate(job.id, { vehicleCondition: event.target.value })
                }
              />
            </FieldLabel>
            <FieldLabel label="Client complaint">
              <textarea
                className="form-input-light min-h-24"
                value={job.clientComplaint}
                onChange={(event) =>
                  onJobUpdate(job.id, { clientComplaint: event.target.value })
                }
              />
            </FieldLabel>
            <FieldLabel label="Assign technician">
              <select
                className="form-input-light"
                value={job.technicianId}
                onChange={(event) =>
                  onJobUpdate(job.id, {
                    technicianId: event.target.value,
                    queueStatus: `Assigned to ${
                      technicians.find((item) => item.id === event.target.value)?.name ??
                      event.target.value
                    }`,
                  })
                }
              >
                {technicians.map((technician) => (
                  <option key={technician.id} value={technician.id}>
                    {technician.name} - {technician.bay}
                  </option>
                ))}
              </select>
            </FieldLabel>
            <FieldLabel label="Queue status">
              <input
                className="form-input-light"
                value={job.queueStatus}
                onChange={(event) =>
                  onJobUpdate(job.id, { queueStatus: event.target.value })
                }
              />
            </FieldLabel>
          </div>

          <FieldLabel label="Internal reception notes">
            <textarea
              className="form-input-light min-h-24"
              value={job.bookingNotes}
              onChange={(event) =>
                onJobUpdate(job.id, { bookingNotes: event.target.value })
              }
            />
          </FieldLabel>

          <div>
            <p className="text-sm font-medium text-[#555962]">Image capture checklist</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {job.photoChecklist.map((item) => (
                <div
                  key={item}
                  className="rounded-[10px] border border-dashed border-[#111111]/18 bg-[#FAFAF7] px-4 py-8 text-center text-sm text-[#555962]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" className="cta-button" onClick={() => onCheckIn(job.id)}>
              Check in vehicle
            </button>
            <button
              type="button"
              className="cta-secondary"
              onClick={() =>
                onJobUpdate(job.id, {
                  photoChecklist: [...job.photoChecklist, "Additional condition image to capture"],
                })
              }
            >
              Add image slot
            </button>
          </div>
        </div>
      </HuttonPanel>
    </div>
  );
}

