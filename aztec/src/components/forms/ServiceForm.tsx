"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import EnumSelect from "../EnumSelect";
import { InvoiceEnum, ServiceEnum, VehicleEnum } from "@/lib/formEnums";
import { serviceSchema, ServiceSchema } from "@/lib/formValidationSchemas";
import { Dispatch, SetStateAction } from "react";

const ServiceForm = ({
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
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceSchema>({
    resolver: zodResolver(serviceSchema),
  });

  const onSubmit = handleSubmit((serviceData) => {
    const newService = { id: Date.now().toString(), ...serviceData };
    data.onSave(newService);
    reset({
      code: "",
      quantity: 1,
      price: "",
      notes: "",
    });
  });

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="">
        <div className="flex justify-center flex-wrap gap-4 md:gap-8 relative">
          <EnumSelect
            label="Vehicle Type"
            enumObject={VehicleEnum}
            register={register}
            name="vehicleType"
            errors={errors}
            defaultValue={data?.vehicleType}
          />
          <EnumSelect
            label="Service Type"
            enumObject={ServiceEnum}
            register={register}
            name="serviceType"
            errors={errors}
            defaultValue={data?.serviceType}
          />
          <InputField
            label="Code"
            name="code"
            defaultValue={data?.code}
            register={register}
            error={errors.code}
          />
          <EnumSelect
            label="Distributor"
            enumObject={InvoiceEnum}
            register={register}
            name="invoiceType"
            errors={errors}
            defaultValue={data?.invoiceType}
          />
          <InputField
            label="Quantity"
            name="quantity"
            defaultValue={data?.quantity ?? 1}
            type="number"
            register={register}
            error={errors.quantity}
          />
          <InputField
            label="Price"
            name="price"
            defaultValue={data?.price}
            register={register}
            error={errors.price}
          />
          <InputField
            label="Notes"
            name="notes"
            defaultValue={data?.notes}
            register={register}
            error={errors.notes}
          />
        </div>
      </div>
      <button
        className="bg-aztecGreen text-white py-2 px-2 rounded-full w-10"
        onClick={onSubmit}
      >
        +
      </button>
    </div>
  );
};

export default ServiceForm;
