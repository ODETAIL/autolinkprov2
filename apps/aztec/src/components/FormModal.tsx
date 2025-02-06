"use client";

import { faClose, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dynamic from "next/dynamic";
import { useState } from "react";

type ActionType = {
  label: "create" | "update" | "delete";
  icon: IconDefinition;
};

// USE LAZY LOADING

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
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  employee: (type, data) => <EmployeeForm type={type} data={data} />,
  customer: (type, data) => <CustomerForm type={type} data={data} />,
  appointment: (type, data) => <AppointmentForm type={type} data={data} />,
  invoice: (type, data) => <InvoiceForm type={type} data={data} />,
  service: (type, data) => <ServiceForm type={type} data={data} />,
};

const FormModal = ({
  table,
  type,
  data,
  id,
}: {
  table: "employee" | "customer" | "appointment" | "invoice" | "service";
  type: ActionType;
  data?: any;
  id?: number | string;
}) => {
  const size = type.label === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    type.label === "create"
      ? "bg-aztecBlue"
      : type.label === "update"
        ? "bg-aztecBlue"
        : "bg-red-700";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return type.label === "delete" && id ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          All data will be lost. Are you sure you want to delete this {table}?
        </span>
        <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
          Delete
        </button>
      </form>
    ) : type.label === "create" || type.label === "update" ? (
      forms[table](type.label, data)
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
        <FontAwesomeIcon icon={type.icon} className="text-white w-5" />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="bg-aztecBlack-dark p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
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
