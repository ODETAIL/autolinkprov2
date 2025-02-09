"use server";

import { revalidatePath } from "next/cache";

import { InvoiceSchema } from "../formValidationSchemas";
import prisma from "../prisma";

type CurrentState = { success: boolean; error: boolean };

// INVOICE ACTIONS
export const createInvoice = async (
  currentState: CurrentState,
  data: InvoiceSchema
) => {
  try {
    let customer = await prisma.customer.findUnique({
      where: { email: data.email },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          streetAddress1: data.streetAddress1,
          email: data.email,
        },
      });

      // revalidatePath("/list/customers");
    }

    await prisma.invoice.create({
      data: {
        paymentType: data.paymentType,
        customerId: customer.id,
        status: data.status,
      },
    });

    // revalidatePath("/list/invoices");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateInvoice = async (
  currentState: CurrentState,
  data: InvoiceSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }

  try {
    let customer = await prisma.customer.findUnique({
      where: { email: data.email },
    });

    if (customer) {
      await prisma.customer.update({
        where: {
          id: customer.id,
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          streetAddress1: data.streetAddress1,
          email: data.email,
        },
      });

      // revalidatePath("/list/customers");
    }

    await prisma.invoice.update({
      where: {
        id: data.id,
      },
      data: {
        paymentType: data.paymentType,
        status: data.status,
      },
    });
    // revalidatePath("/list/invoices");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteInvoice = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.invoice.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/list/invoices");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
