import { Customer } from "@prisma/client";

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
    resource: Customer | null;
  }[]
): {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource: Customer | null;
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
