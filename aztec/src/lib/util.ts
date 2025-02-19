import { Customer, Service } from "@prisma/client";
import { EventType } from "./types";
import moment from "moment";

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const createDateAsUTC = (date: Date) => {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
};

export const convertDateToUTC = (date: Date) => {
  return new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
};

export const calculateTotalPrice = (services: { price: number }[]): number => {
  return Number(
    services.reduce((acc, service) => acc + service.price, 0).toFixed(2)
  );
};

const getLatestMonday = (): Date => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const latestMonday = today;
  latestMonday.setDate(today.getDate() - daysSinceMonday);
  return latestMonday;
};

export const adjustScheduleToCurrentWeek = (
  appointments: {
    id: number;
    title: string;
    start: Date;
    end: Date;
    description: string | null;
    resource: {
      customer: Customer | null;
      services: Service[] | null;
    };
  }[]
): {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string | null;
  resource: {
    customer: Customer | null;
    services: Service[] | null;
  };
}[] => {
  const latestMonday = getLatestMonday();

  return appointments.map((appointment) => {
    const appointmentDayOfWeek = appointment.start.getDay();

    const daysFromMonday =
      appointmentDayOfWeek === 0 ? 6 : appointmentDayOfWeek - 1;

    const adjustedStartDate = new Date(latestMonday);

    adjustedStartDate.setDate(latestMonday.getDate() + daysFromMonday);
    adjustedStartDate.setHours(
      appointment.start.getHours(),
      appointment.start.getMinutes(),
      appointment.start.getSeconds()
    );
    const adjustedEndDate = new Date(adjustedStartDate);
    adjustedEndDate.setHours(
      appointment.end.getHours(),
      appointment.end.getMinutes(),
      appointment.end.getSeconds()
    );

    return {
      id: appointment.id,
      title: appointment.title,
      start: adjustedStartDate,
      end: adjustedEndDate,
      description: appointment.description,
      resource: appointment.resource,
    };
  });
};

export const calculateInvoiceTotals = (services: { price: number }[]) => {
  const subtotal = services.reduce((acc, service) => acc + service.price, 0);
  const taxRate = 0.05; // 5% GST
  const gst = subtotal * taxRate;
  const total = subtotal + gst;

  return {
    subtotal: subtotal.toFixed(2),
    gst: gst.toFixed(2),
    total: total.toFixed(2),
  };
};

export const convertDatesToISO = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(convertDatesToISO);
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        value instanceof Date ? value.toISOString() : convertDatesToISO(value),
      ])
    );
  }
  return obj;
};

export const convertRawToDates = (rawEvents: EventType[]) => {
  return rawEvents.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
};

export const formatPhoneNumber = (phone: string) => {
  // Remove any non-digit characters (optional, in case input has dashes or spaces)
  const cleaned = ("" + phone).replace(/\D/g, "");

  // Check if the input is of correct length
  if (cleaned.length === 10) {
    const areaCode = cleaned.slice(0, 3);
    const centralOfficeCode = cleaned.slice(3, 6);
    const lineNumber = cleaned.slice(6);
    return `(${areaCode}) ${centralOfficeCode}-${lineNumber}`;
  }

  // Return the original phone if it's not 10 digits
  return phone;
};

export const getCurrentMonthRange = () => {
  const startDate = moment().startOf("month").toISOString(); // First day of the month (e.g., "2025-02-01T00:00:00.000Z")
  const endDate = moment().endOf("month").toISOString(); // Last day of the month (e.g., "2025-02-28T23:59:59.999Z")

  return { startDate, endDate };
};
