import {
  appointmentsTable,
  customersTable,
  employeesTable,
  invoicesTable,
} from "@/db/schema";
import { db } from "@/lib/drizzle";
import { Appointment, Customer, Employee, Invoice } from "@/types/schemaTypes";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type CurrentState = { success: boolean; error: boolean };

/** ✅ Update Employee */
export const updateEmployee = async (
  currentState: CurrentState,
  data: Employee
) => {
  if (!data.id) return { success: false, error: true };

  try {
    await db
      .update(employeesTable)
      .set(data)
      .where(eq(employeesTable.id, data.id));
    revalidatePath("/list/employees"); // ✅ Revalidate UI
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Update Customer */
export const updateCustomer = async (
  currentState: CurrentState,
  data: Customer
) => {
  if (!data.id) return { success: false, error: true };

  try {
    await db
      .update(customersTable)
      .set(data)
      .where(eq(customersTable.id, data.id));
    revalidatePath("/list/customers"); // ✅ Revalidate UI
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Update Appointment */
export const updateAppointment = async (
  currentState: CurrentState,
  data: Appointment
) => {
  if (!data.id) return { success: false, error: true };

  try {
    await db
      .update(appointmentsTable)
      .set(data)
      .where(eq(appointmentsTable.id, data.id));
    revalidatePath("/list/appointments"); // ✅ Revalidate UI
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Update Invoice */
export const updateInvoice = async (
  currentState: CurrentState,
  data: Invoice
) => {
  if (!data.id) return { success: false, error: true };

  try {
    await db
      .update(invoicesTable)
      .set(data)
      .where(eq(invoicesTable.id, data.id));
    revalidatePath("/list/invoices"); // ✅ Revalidate UI
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};
