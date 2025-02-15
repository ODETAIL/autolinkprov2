"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { customerSchema, CustomerSchema } from "@/lib/formValidationSchemas";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { createCustomer, updateCustomer } from "@/lib/actions/customer";
import { toast } from "react-toastify";

const CustomerForm = ({
  type,
  data,
  id,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id?: number | string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerSchema>({
    resolver: zodResolver(customerSchema),
  });
  const router = useRouter();
  const [state, formAction] = useFormState(
    type === "create" ? createCustomer : updateCustomer,
    {
      success: false,
      error: false,
    }
  );

  // console.log(data);
  useEffect(() => {
    if (state.success) {
      toast(`Customer has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type]);

  const onSubmit = handleSubmit((formData) => {
    formAction({ ...formData, id: id as string });
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold text-white">
        {type === "create" ? "Create New Customer" : "Update Customer"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>
      <div className="flex justify-between flex-wrap gap-4 text-white">
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
          type="checkbox"
        />
      </div>
      <button className="bg-aztecBlue text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default CustomerForm;
