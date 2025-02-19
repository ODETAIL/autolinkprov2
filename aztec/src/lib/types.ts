import { Customer, Invoice, Service } from "@prisma/client";

export type EventType = {
  id: number;
  title: string;
  start: Date | string;
  end: Date | string;
  description: string | null;
  resource: {
    customer: Customer | null;
    services: Service[] | null;
  };
};

export type CustomerOption = {
  value: string;
  label: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phone: string;
  streetAddress1: string;
};

export type SingleInvoice =
  | (Invoice & { customer: Customer } & { services: Service[] })
  | null;
