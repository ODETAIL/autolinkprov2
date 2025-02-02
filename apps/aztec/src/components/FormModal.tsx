"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";
import {
  deleteAppointment,
  deleteCustomer,
  deleteEmployee,
  deleteInvoice,
} from "@/lib/queries/delete/deleteQueries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

// ✅ Delete action mapping for Drizzle ORM
const deleteActionMap: Record<string, any> = {
  employee: deleteEmployee,
  customer: deleteCustomer,
  invoice: deleteInvoice,
  appointment: deleteAppointment,
};

// ✅ Lazy Loading Forms (Dynamically Imported)
const EmployeeForm = dynamic(() => import("./forms/EmployeeForm"), {
  loading: () => <h1>Loading...</h1>,
});
const CustomerForm = dynamic(() => import("./forms/CustomerForm"), {
  loading: () => <h1>Loading...</h1>,
});
const InvoiceForm = dynamic(() => import("./forms/InvoiceForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AppointmentForm = dynamic(() => import("./forms/AppointmentForm"), {
  loading: () => <h1>Loading...</h1>,
});

// ✅ Form Mapping
const forms: Record<
  string,
  (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element
> = {
  employee: (setOpen, type, data, relatedData) => (
    <EmployeeForm type={type} data={data} setOpen={setOpen} />
  ),
  customer: (setOpen, type, data, relatedData) => (
    <CustomerForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  invoice: (setOpen, type, data, relatedData) => (
    <InvoiceForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
  appointment: (setOpen, type, data, relatedData) => (
    <AppointmentForm
      type={type}
      data={data}
      setOpen={setOpen}
      relatedData={relatedData}
    />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  relatedData,
}: FormContainerProps & { relatedData?: any }) => {
  const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type === "create"
      ? "bg-lamaYellow"
      : type === "update"
        ? "bg-lamaSky"
        : "bg-lamaPurple";

  const [open, setOpen] = useState(false);

  // ✅ Handle Delete Action & State
  const Form = () => {
    const [state, formAction] = useFormState(deleteActionMap[table], {
      success: false,
      error: false,
    });

    const router = useRouter();

    useEffect(() => {
      if (state.success) {
        toast(`${table} has been deleted!`);
        setOpen(false);
        router.refresh();
      }
    }, [state, router]);

    return type === "delete" && id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="hidden" name="id" value={id} />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type === "create" || type === "update" ? (
      forms[table](setOpen, type, data, relatedData)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <FontAwesomeIcon icon={faClose} className="text-white w-5" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
