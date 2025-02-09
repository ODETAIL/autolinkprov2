"use server";

import { revalidatePath } from "next/cache";

import { AppointmentSchema } from "../formValidationSchemas";
import prisma from "../prisma";

type CurrentState = { success: boolean; error: boolean };

// APPOINTMENT ACTIONS
export const createAppointment = async (
  currentState: CurrentState,
  data: AppointmentSchema
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
    await prisma.appointment.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        description: data.notes,
      },
    });

    // revalidatePath("/appointments");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateAppointment = async (
  currentState: CurrentState,
  data: AppointmentSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }

  try {
    await prisma.appointment.update({
      where: {
        id: data.id,
      },
      data: {
        description: data.notes,
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
      },
    });
    // revalidatePath("/appointments");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAppointment = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await prisma.appointment.delete({
      where: {
        id: parseInt(id),
      },
    });

    // revalidatePath("/appointments");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
