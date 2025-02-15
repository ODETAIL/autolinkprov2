"use server";

import { ServiceTypeDisplayMap } from "./../formEnums";
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
    await prisma.$transaction(async (prisma) => {
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

      if (data.services) {
        // ✅ 3. Handle Services (Find or Create)
        const serviceRecords = await Promise.all(
          data.services.map(async (service) => {
            return await prisma.service.create({
              data: {
                code: service.code,
                serviceType: ServiceTypeDisplayMap[service.serviceType],
                vehicleType: service.vehicleType,
                distributor: service.invoiceType,
                quantity: service.quantity,
                price: parseFloat(service.price),
              },
            });
          })
        );

        // ✅ 2. Create appointment & link to customer
        const appointment = await prisma.appointment.create({
          data: {
            title: data.title,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
            description: data.notes,
            customer: {
              connect: { id: customer.id },
            },
            services: {
              connect: serviceRecords.map((service) => ({ id: service.id })),
            },
          },
        });

        await prisma.invoice.create({
          data: {
            customer: { connect: { id: customer.id } },
            appointment: { connect: { id: appointment.id } },
            status: "Draft",
            paymentType: "Debit",
            services: {
              connect: serviceRecords.map((service) => ({ id: service.id })),
            },
          },
        });
      }
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
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
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
