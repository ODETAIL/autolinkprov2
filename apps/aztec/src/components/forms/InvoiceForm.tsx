"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import EnumSelect from "../EnumSelect";
import { PaymentEnum, StatusEnum } from "@/lib/formEnums";
import {
  invoiceSchema,
  InvoiceSchema,
  ServiceSchema,
} from "@/lib/formValidationSchemas";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ServiceForm from "./ServiceForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { createInvoice, updateInvoice } from "@/lib/actions/invoice";
import useIsMobile from "@/lib/useIsMobile";
import { toast } from "react-toastify";

const InvoiceForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceSchema>({
    resolver: zodResolver(invoiceSchema),
  });
  const [services, setServices] = useState<ServiceSchema[]>(
    data?.services || []
  );
  const [showServiceModal, setShowServiceModal] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();
  const [state, formAction] = useFormState(
    type === "create" ? createInvoice : updateInvoice,
    {
      success: false,
      error: false,
    }
  );

  useEffect(() => {
    if (state.success) {
      toast(`Invoice has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type]);

  const onSubmit = handleSubmit((data) => {
    formAction({ ...data, services });
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
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create New Invoice" : "Update Invoice"}
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
            <div className="flex justify-between flex-wrap gap-4">
              <InputField
                label="First Name"
                name="firstName"
                defaultValue={data?.firstName}
                register={register}
                error={errors.firstName}
              />
              <InputField
                label="Last Name"
                name="lastName"
                defaultValue={data?.lastName}
                register={register}
                error={errors.lastName}
              />
              <InputField
                label="Email"
                name="email"
                defaultValue={data?.email}
                register={register}
                error={errors?.email}
              />
              <InputField
                label="Phone"
                name="phone"
                defaultValue={data?.phone}
                register={register}
                error={errors.phone}
              />
              <InputField
                label="Address"
                name="streetAddress1"
                defaultValue={data?.streetAddress1}
                register={register}
                error={errors.streetAddress1}
              />
            </div>
            <span className="text-xs text-gray-300 font-medium">
              Invoice Information
            </span>
            <div className="flex justify-center flex-wrap gap-8">
              <EnumSelect
                label="Invoice Status"
                enumObject={StatusEnum}
                register={register}
                name="status"
                errors={errors}
                defaultValue={data?.status}
              />
              <EnumSelect
                label="Payment Type"
                enumObject={PaymentEnum}
                register={register}
                name="paymentType"
                errors={errors}
                defaultValue={data?.paymentType}
              />
            </div>
          </div>

          <div className="hidden xl:block w-[1px] bg-gray-500"></div>
          {/* ✅ Services Section */}
          <div className="flex flex-col gap-8 md:w-1/2">
            <span className="text-xs text-gray-300 font-medium">Services</span>
            {!isMobile && (
              <ServiceForm
                type={"create"}
                data={{ onSave: handleServiceAdded }}
                setOpen={setOpen}
              />
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

export default InvoiceForm;
