"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useEffect } from "react";
import { employeeSchema } from "@/lib/formValidationSchemas";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Employee } from "@/types/schemaTypes";
import { createEmployee } from "@/lib/queries/create/createQueries";
import { updateEmployee } from "@/lib/queries/update/updateQueries";

const EmployeeForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  // ✅ Form Handling with Zod Validation
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Employee>({
    resolver: zodResolver(employeeSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createEmployee : updateEmployee,
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
        `Employee has been ${type === "create" ? "created" : "updated"}!`
      );
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new employee" : "Update employee"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Name"
          name="name"
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Role"
          name="role"
          register={register}
          error={errors?.role}
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
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}

      <button type="submit" className="bg-aztecBlue text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default EmployeeForm;
