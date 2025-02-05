"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import EnumSelect from "../EnumSelect";
import { PaymentEnum, StatusEnum } from "@/lib/formEnums";

const schema = z.object({
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  streetAddress1: z.string().min(1, { message: "Street Address is required!" }),
  status: z.enum(["Draft", "Pending", "Paid", "Overdue"]).default("Draft"),
  paymentType: z.enum([
    "Debit",
    "Mastercard",
    "Cash",
    "Amex",
    "Visa",
    "Cheque",
    "E-transfer",
    "Other",
  ]),
});

type Inputs = z.infer<typeof schema>;

const InvoiceForm = ({
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
    <form className="flex flex-col gap-8 text-white" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new invoice</h1>
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
          name="address"
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
      <button className="bg-aztecBlue text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default InvoiceForm;
