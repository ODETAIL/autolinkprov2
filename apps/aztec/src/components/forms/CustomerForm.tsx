"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  email: z.string().min(1, { message: "Email is required!" }),
  streetAddress1: z
    .string()
    .min(1, { message: "Street Address 1 is required!" }),
  streetAddress2: z.string(),
  postalCode: z.string(),
  subscriptionWarranty: z.boolean().default(false),
  companyName: z.string(),
});

type Inputs = z.infer<typeof schema>;

const CustomerForm = ({
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
      <h1 className="text-xl font-semibold">Create a new customer</h1>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
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
          label="Street Address 1"
          name="streetAddress1"
          defaultValue={data?.streetAddress1}
          register={register}
          error={errors.streetAddress1}
        />
        <InputField
          label="Street Address 2"
          name="streetAddress2"
          defaultValue={data?.streetAddress2}
          register={register}
          error={errors.streetAddress2}
        />
        <InputField
          label="Postal Code"
          name="postalCode"
          defaultValue={data?.postalCode}
          register={register}
          error={errors.postalCode}
        />
        <InputField
          label="Company Name"
          name="companyName"
          defaultValue={data?.companyName}
          register={register}
          error={errors.companyName}
        />
        <InputField
          label="Warranty"
          name="subscriptionWarranty"
          defaultValue={data?.subscriptionWarranty}
          register={register}
          error={errors.subscriptionWarranty}
          type="radio"
        />
      </div>
      <button className="bg-blueAztec text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default CustomerForm;
