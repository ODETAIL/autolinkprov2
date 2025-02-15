"use client";

import { deleteAppointment } from "@/lib/actions/appointment";
import { deleteCustomer } from "@/lib/actions/customer";
import { deleteEmployee } from "@/lib/actions/employee";
import { deleteInvoice } from "@/lib/actions/invoice";
import { deleteService } from "@/lib/actions/service";
import { faClose, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

type ActionType = {
  label: "create" | "update" | "delete";
  icon: IconDefinition | null;
};

const deleteActionMap = {
  employee: deleteEmployee,
  customer: deleteCustomer,
  appointment: deleteAppointment,
  invoice: deleteInvoice,
  service: deleteService,
};

const EmployeeForm = dynamic(() => import("./forms/EmployeeForm"), {
  loading: () => <h1>Loading...</h1>,
});
const CustomerForm = dynamic(() => import("./forms/CustomerForm"), {
  loading: () => <h1>Loading...</h1>,
});
const AppointmentForm = dynamic(() => import("./forms/AppointmentForm"), {
  loading: () => <h1>Loading...</h1>,
});
const InvoiceForm = dynamic(() => import("./forms/InvoiceForm"), {
  loading: () => <h1>Loading...</h1>,
});
const ServiceForm = dynamic(() => import("./forms/ServiceForm"), {
  loading: () => <h1>Loading...</h1>,
});

const forms: {
  [key: string]: (
    type: "create" | "update",
    setOpen: Dispatch<SetStateAction<boolean>>,
    data?: any,
    id?: number | string,
    setOpenEventModal?: Dispatch<SetStateAction<boolean>>
  ) => JSX.Element;
} = {
  employee: (type, data, setOpen) => (
    <EmployeeForm type={type} data={data} setOpen={setOpen} />
  ),
  customer: (type, data, setOpen, id) => (
    <CustomerForm type={type} data={data} id={id} setOpen={setOpen} />
  ),
  appointment: (type, data, setOpen, id, openEventModal) => (
    <AppointmentForm
      type={type}
      data={data}
      id={id}
      setOpen={setOpen}
      setOpenEventModal={openEventModal}
    />
  ),
  invoice: (type, data, setOpen, id) => (
    <InvoiceForm type={type} data={data} id={id} setOpen={setOpen} />
  ),
  service: (type, data, setOpen) => (
    <ServiceForm type={type} data={data} setOpen={setOpen} />
  ),
};

const FormModal = ({
  table,
  type,
  data,
  id,
  openEventModal,
  setOpenEventModal,
}: {
  table: "employee" | "customer" | "appointment" | "invoice" | "service";
  type: ActionType;
  data?: any;
  id?: number | string;
  openEventModal?: boolean;
  setOpenEventModal?: Dispatch<SetStateAction<boolean>>;
}) => {
  const size = type.label === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type.label === "create"
      ? "bg-aztecBlue"
      : type.label === "update"
        ? "bg-aztecBlue"
        : "bg-red-700";

  const [open, setOpen] = useState(openEventModal || false);

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
    return type.label === "delete" && id ? (
      <form
        action={formAction}
        className="p-4 flex flex-col gap-4 bg-aztecBlack-dark text-white"
      >
        <input type="text | number" name="id" defaultValue={id} hidden />
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type.label === "create" || type.label === "update" ? (
      forms[table](type.label, data, setOpen, id, setOpenEventModal)
    ) : (
      "Form not found!"
    );
  };

  return (
    <>
      {type.icon && (
        <button
          className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
          onClick={() => setOpen(true)}
        >
          <FontAwesomeIcon icon={type.icon} className="text-white w-5" />
        </button>
      )}

      {(open || openEventModal) && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div
            className={`bg-aztecBlack-dark p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%]  ${table === "invoice" || table === "appointment" ? "xl:w-[70%]" : "xl:w-[50%] 2xl:w-[40%]"}`}
          >
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() =>
                setOpenEventModal ? setOpenEventModal(false) : setOpen(false)
              }
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
