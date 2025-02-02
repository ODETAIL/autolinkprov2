"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";

import { useFormState } from "react-dom";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Invoice } from "@/types/schemaTypes";
import { invoiceSchema } from "@/lib/formValidationSchemas";
import { createInvoice } from "@/lib/queries/create/createQueries";
import { updateInvoice } from "@/lib/queries/update/updateQueries";

const InvoiceForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Invoice>({
    resolver: zodResolver(invoiceSchema),
  });

  const [state, formAction] = useFormState(
    type === "create" ? createInvoice : updateInvoice,
    {
      success: false,
      error: false,
    }
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
      toast(`Exam has been ${type === "create" ? "created" : "updated"}!`);
      setOpen(false);
      router.refresh();
    }
  }, [state, router, type, setOpen]);

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new invoice" : "Update the invoice"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        {data && (
          <InputField
            label="Id"
            name="id"
            defaultValue={data?.id}
            register={register}
            error={errors?.id}
            hidden
          />
        )}
      </div>
      {state.error && (
        <span className="text-red-500">Something went wrong!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default InvoiceForm;
