import {
  appointmentsTable,
  customersTable,
  employeesTable,
  invoicesTable,
} from "@/db/schema";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

type CurrentState = { success: boolean; error: boolean };

/** ✅ Get Employee */
export const getEmployee = async (currentState: CurrentState, id: number) => {
  try {
    const employee = await db
      .select()
      .from(employeesTable)
      .where(eq(employeesTable.id, id));
    return employee[0];
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Get Customer */
export const getCustomer = async (currentState: CurrentState, id: number) => {
  try {
    const customer = await db
      .select()
      .from(customersTable)
      .where(eq(customersTable.id, id));
    return customer[0];
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Get Appointment */
export const getAppointment = async (
  currentState: CurrentState,
  id: number
) => {
  try {
    const appointment = await db
      .select()
      .from(appointmentsTable)
      .where(eq(appointmentsTable.id, id));
    return appointment[0];
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Get All Appointments */
export const getAllAppointments = async () => {
  try {
    const appointments = await db.select().from(appointmentsTable);
    return appointments;
  } catch (err) {
    console.error(err);
  }
};

/** ✅ Get All Appointments for a Customer */
export const getAppointmentsForCustomer = async (
  currentState: CurrentState,
  customerId: number
) => {
  try {
    const appointments = await db
      .select()
      .from(appointmentsTable)
      .where(eq(appointmentsTable.customerId, customerId));

    return appointments;
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Get Invoice */
export const getInvoice = async (currentState: CurrentState, id: number) => {
  try {
    const invoice = await db
      .select()
      .from(invoicesTable)
      .where(eq(invoicesTable.id, id));
    return invoice[0];
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Get All Customer Invoice */
export const getInvoicesForCustomer = async (
  currentState: CurrentState,
  customerId: number
) => {
  try {
    const invoices = await db
      .select()
      .from(invoicesTable)
      .where(eq(invoicesTable.customerId, customerId));

    return invoices;
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};
