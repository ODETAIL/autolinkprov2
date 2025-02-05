"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import EnumSelect from "../EnumSelect";
import { InvoiceEnum, ServiceEnum, VehicleEnum } from "@/lib/formEnums";

const schema = z.object({
  vehicleType: z.enum([
    "Suv",
    "Truck",
    "Sedan",
    "Minivan",
    "Convertible",
    "Hatchback",
    "Coupe",
  ]),
  serviceType: z.enum([
    "Windshield",
    "Door Glass",
    "Back Glass",
    "Sunroof",
    "Mirror",
    "Quarter Glass",
    "Chip Subscription",
    "Warranty",
  ]),
  invoiceType: z.enum(["A", "M", "O"]),
  code: z.string().min(1, { message: "Code is required!" }),
  quantity: z.number().default(1),
  price: z.string().min(1, { message: "price is required!" }),
  notes: z.string(),
});

type Inputs = z.infer<typeof schema>;

const ServiceForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Add new service</h1>
      <span className="text-xs text-gray-400 font-medium">
        Service Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
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
          defaultValue={data?.quantity}
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
      <div className="flex justify-center flex-wrap ">
        <InputField
          label="Notes"
          name="notes"
          defaultValue={data?.notes}
          register={register}
          error={errors.notes}
        />
      </div>
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default ServiceForm;
