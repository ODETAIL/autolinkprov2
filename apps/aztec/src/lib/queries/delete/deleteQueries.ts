import {
  appointmentsTable,
  customersTable,
  employeesTable,
  invoicesTable,
} from "@/db/schema";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type CurrentState = { success: boolean; error: boolean };

/** ✅ Delete Employee */
export const deleteEmployee = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = parseInt(data.get("id") as string);
  try {
    await db.delete(employeesTable).where(eq(employeesTable.id, id));
    revalidatePath("/list/employees"); // ✅ Revalidate UI
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Delete Customer */
export const deleteCustomer = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = parseInt(data.get("id") as string);
  try {
    await db.delete(customersTable).where(eq(customersTable.id, id));
    revalidatePath("/list/customers"); // ✅ Revalidate UI
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Delete Appointment */
export const deleteAppointment = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = parseInt(data.get("id") as string);
  try {
    await db.delete(appointmentsTable).where(eq(appointmentsTable.id, id));
    revalidatePath("/list/appointments"); // ✅ Revalidate UI
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};

/** ✅ Delete Invoice */
export const deleteInvoice = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = parseInt(data.get("id") as string);
  try {
    await db.delete(invoicesTable).where(eq(invoicesTable.id, id));
    revalidatePath("/list/invoices"); // ✅ Revalidate UI
    return { success: true, error: false };
  } catch (err) {
    console.error(err);
    return { success: false, error: true };
  }
};
