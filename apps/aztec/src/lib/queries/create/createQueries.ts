import {
  appointmentsTable,
  customersTable,
  employeesTable,
  invoicesTable,
} from "@/db/schema";
import { db } from "@/lib/drizzle";
import { Appointment, Customer, Employee, Invoice } from "@/types/schemaTypes";
import { revalidatePath } from "next/cache";

type CurrentState = { success: boolean; error: boolean };

/** ✅ Create Employee */
export const createEmployee = async (
  currentState: CurrentState,
  data: Employee
) => {
  try {
    await db.insert(employeesTable).values(data);
    revalidatePath("/list/employees"); // ✅ Revalidate UI
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Create Customer */
export const createCustomer = async (
  currentState: CurrentState,
  data: Customer
) => {
  try {
    await db.insert(customersTable).values(data);
    revalidatePath("/list/customers"); // ✅ Revalidate UI
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Create Appointment */
export const createAppointment = async (
  currentState: CurrentState,
  data: Appointment
) => {
  try {
    await db.insert(appointmentsTable).values(data);
    revalidatePath("/list/appointments"); // ✅ Revalidate UI
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Create Invoice */
export const createInvoice = async (
  currentState: CurrentState,
  data: Invoice
) => {
  try {
    await db.insert(invoicesTable).values(data);
    revalidatePath("/list/invoices"); // ✅ Revalidate UI
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};
