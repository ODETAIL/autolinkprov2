"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { customerSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createCustomer } from "@/lib/queries/create/createQueries";
import { updateCustomer } from "@/lib/queries/update/updateQueries";
import { Customer } from "@/types/schemaTypes";

const CustomerForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: { companies: { id: number; name: string }[] };
}) => {
  const router = useRouter();

  // ✅ Initialize Form with Zod Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Customer>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      phone: data?.phone || "",
      city: data?.city || "",
      postalCode: data?.postalCode || "",
      streetAddress1: data?.streetAddress1 || "",
      streetAddress2: data?.streetAddress2 || "",
      subscriptionWarranty: data?.subscriptionWarranty || false,
      returnCounter: data?.returnCounter || 0,
      companyId: 2,
    },
  });

  const [state, formAction] = useFormState(
    type === "create" ? createCustomer : updateCustomer,
    { success: false, error: false }
  );

  const onSubmit = handleSubmit((formData) => {
    try {
      const submissionData = formData;
      formAction(submissionData);
    } catch (err) {
      console.error("❌ Form Submission Error:", err);
      toast.error("Something went wrong!");
    }
  });

  useEffect(() => {
    if (state.success) {
      toast.success(
        `Customer has been ${type === "create" ? "created" : "updated"}!`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new customer" : "Update customer"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">
        Customer Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Name"
          name="name"
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Email"
          name="email"
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Phone"
          name="phone"
          register={register}
          error={errors?.phone}
        />
        <InputField
          label="City"
          name="city"
          register={register}
          error={errors?.city}
        />
        <InputField
          label="Postal Code"
          name="postalCode"
          register={register}
          error={errors?.postalCode}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">Address Details</span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Street Address 1"
          name="streetAddress1"
          register={register}
          error={errors?.streetAddress1}
        />
        <InputField
          label="Street Address 2"
          name="streetAddress2"
          register={register}
          error={errors?.streetAddress2}
        />
      </div>

      {/* ✅ Subscription Warranty */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-xs text-gray-500">Subscription Warranty</label>
        <input
          type="checkbox"
          {...register("subscriptionWarranty")}
          className="w-5 h-5 cursor-pointer"
        />
      </div>

      {/* ✅ Return Counter */}
      <InputField
        label="Return Counter"
        name="returnCounter"
        register={register}
        error={errors?.returnCounter}
        type="number"
      />

      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}

      <button type="submit" className="bg-aztecBlue text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default CustomerForm;
