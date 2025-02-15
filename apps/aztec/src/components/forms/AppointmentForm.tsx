"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import {
  appointmentSchema,
  AppointmentSchema,
  ServiceSchema,
} from "@/lib/formValidationSchemas";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import ServiceForm from "./ServiceForm";
import { useFormState } from "react-dom";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import useIsMobile from "@/lib/useIsMobile";
import moment from "moment";
import { useAppDispatch } from "@/lib/hooks";
import { updateEvent } from "@/lib/features/calendar/calendarSlice";
import { convertDatesToISO } from "@/lib/util";

const AppointmentForm = ({
  type,
  data,
  setOpen,
  setOpenEventModal,
  id,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setOpenEventModal?: Dispatch<SetStateAction<boolean>>;
  id?: number | string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
  });

  const [services, setServices] = useState<ServiceSchema[]>(
    data?.services || data?.resource?.services || []
  );
  const [showServiceModal, setShowServiceModal] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [state, formAction] = useFormState(
    type === "create" ? createAppointment : updateAppointment,
    {
      success: false,
      error: false,
    }
  );

  useEffect(() => {
    if (state.success) {
      toast(
        `Appointment has been ${type === "create" ? "created" : "updated"}!`
      );

      setOpen(false);
      setOpenEventModal?.(false);
      router.refresh();

      if (type === "update") {
        const convertedDatesToISO = convertDatesToISO(data);
        dispatch(updateEvent(convertedDatesToISO));
      }
    }
  }, [state, type, data, dispatch, router]);

  const onSubmit = handleSubmit((formData) => {
    formAction({
      ...formData,
      id: id as number,
      services,
    });
  });

  const handleServiceAdded = (newService: ServiceSchema) => {
    setServices((prev: any) => [...prev, newService]);
    setShowServiceModal(false);
  };

  return (
    <form
      className="flex flex-col gap-4 md:gap-8 text-white"
      onSubmit={onSubmit}
    >
      <h1 className="text-lg md:text-xl font-semibold">
        {type === "create" ? "Create New Appointment" : "Update Appointment"}
      </h1>
      {isMobile && showServiceModal ? (
        <ServiceForm
          type={"create"}
          data={{ onSave: handleServiceAdded }}
          setOpen={setOpen}
        />
      ) : (
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <div className="flex flex-col md:w-1/2 gap-4 md:gap-8">
            <span className="text-xs text-gray-300 font-medium">
              Customer Information
            </span>
            <div className="flex justify-between flex-wrap gap-2 md:gap-4">
              <InputField
                label="First Name"
                name="firstName"
                defaultValue={
                  data?.resource?.customer
                    ? data?.resource?.customer.firstName
                    : data?.firstName
                }
                register={register}
                error={errors.firstName}
              />
              <InputField
                label="Last Name"
                name="lastName"
                defaultValue={
                  data?.resource?.customer
                    ? data?.resource?.customer.lastName
                    : data?.lastName
                }
                register={register}
                error={errors.lastName}
              />
              <InputField
                label="Email"
                name="email"
                defaultValue={
                  data?.resource?.customer
                    ? data?.resource?.customer.email
                    : data?.email
                }
                register={register}
                error={errors?.email}
              />
              <InputField
                label="Phone"
                name="phone"
                defaultValue={
                  data?.resource?.customer
                    ? data?.resource?.customer.phone
                    : data?.phone
                }
                register={register}
                error={errors.phone}
              />
              <InputField
                label="Address"
                name="streetAddress1"
                defaultValue={
                  data?.resource?.customer
                    ? data?.resource?.customer.streetAddress1
                    : data?.streetAddress1
                }
                register={register}
                error={errors.streetAddress1}
              />
            </div>
            <span className="text-xs text-gray-300 font-medium">
              Appointment Information
            </span>
            <div className="flex justify-between flex-wrap gap-2 md:gap-4">
              <InputField
                label="Title"
                name="title"
                defaultValue={data?.title}
                register={register}
                error={errors.title}
              />

              <InputField
                label="Start Time"
                name="startTime"
                defaultValue={
                  data?.start
                    ? moment(data.start).format("YYYY-MM-DDTHH:mm")
                    : data?.startTime
                }
                register={register}
                error={errors.startTime}
                type="datetime-local"
              />
              <InputField
                label="End Time"
                name="endTime"
                defaultValue={
                  data?.end
                    ? moment(data.end).format("YYYY-MM-DDTHH:mm")
                    : data?.endTime
                }
                register={register}
                error={errors.endTime}
                type="datetime-local"
              />
              <InputField
                label="Notes"
                name="notes"
                type="textarea"
                defaultValue={
                  data?.description ? data?.description : data?.notes
                }
                register={register}
                error={errors.notes}
              />

              {errors.startTime?.message && errors.endTime?.message && (
                <p className="text-xs text-red-400">
                  {errors.startTime.message.toString()}
                  {errors.endTime.message.toString()}
                </p>
              )}
            </div>
          </div>
          <div className="hidden xl:block w-[1px] bg-gray-500"></div>
          {/* ✅ Services Section */}
          <div className="flex flex-col gap-8 md:w-1/2">
            {!isMobile && (
              <>
                <span className="text-xs text-gray-300 font-medium">
                  Services
                </span>
                <ServiceForm
                  type={"create"}
                  data={{ onSave: handleServiceAdded }}
                  setOpen={setOpen}
                />
              </>
            )}
            {/* ✅ Display Selected Services */}
            <div className="flex flex-wrap gap-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-aztecBlue text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs flex-wrap"
                >
                  {service.serviceType} - {service.code}
                  <button
                    type="button"
                    onClick={() =>
                      setServices((prev) =>
                        prev.filter((s) => s.id !== service.id)
                      )
                    }
                  >
                    <FontAwesomeIcon
                      icon={faClose}
                      className="text-white w-5"
                    />
                  </button>
                </div>
              ))}
            </div>
            {/* ✅ Add Service Button (Shows ServiceForm on Mobile) */}
            {isMobile && (
              <button
                type="button"
                className="bg-green-500 text-white p-3 rounded-md flex items-center justify-center w-full self-start"
                onClick={() => setShowServiceModal(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="text-white w-5" />
                Add Service
              </button>
            )}
          </div>
        </div>
      )}

      {!isMobile || !showServiceModal ? (
        <button className="bg-aztecBlue text-white p-2 rounded-md">
          {type === "create" ? "Create" : "Update"}
        </button>
      ) : null}
    </form>
  );
};

export default AppointmentForm;
