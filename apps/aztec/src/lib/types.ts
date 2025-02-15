import { Customer, Service } from "@prisma/client";

export type EventType = {
  id: number;
  title: string;
  start: Date | string;
  end: Date | string;
  description: string;
  resource: {
    customer: Customer | null;
    services: Service[] | null;
  };
};
