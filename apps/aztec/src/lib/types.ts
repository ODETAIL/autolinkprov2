import { Customer, Service } from "@prisma/client";

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
