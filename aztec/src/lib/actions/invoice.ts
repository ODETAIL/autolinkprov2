"use server";

import { revalidatePath } from "next/cache";

import { InvoiceSchema } from "../formValidationSchemas";
import prisma from "../prisma";
import { ServiceTypeDisplayMap } from "../formEnums";
import { updateRevenue } from "./revenue";

type CurrentState = { success: boolean; error: boolean };

// INVOICE ACTIONS
export const createInvoice = async (
  currentState: CurrentState,
  data: InvoiceSchema
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
                notes: service.notes,
              },
            });
          })
        );

        await prisma.invoice.create({
          data: {
            paymentType: data.paymentType,
            customer: {
              connect: {
                id: customer.id,
              },
            },
            services: {
              connect: serviceRecords.map((service) => ({ id: service.id })),
            },
            status: data.status,
          },
        });
      }
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
    await prisma.$transaction(async (prisma) => {
      await prisma.customer.update({
        where: {
          id: data.customerId,
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          streetAddress1: data.streetAddress1,
          email: data.email,
        },
      });

      await prisma.invoice.update({
        where: {
          id: data.id,
        },
        data: {
          paymentType: data.paymentType,
          status: data.status,
        },
      });

      const existingServices = await prisma.invoice.findUnique({
        where: { id: data.id },
        select: { services: { select: { id: true } } },
      });

      const existingServiceIds =
        existingServices?.services.map((s) => s.id) || [];

      if (data.services) {
        const newServiceRecords = await Promise.all(
          data.services.map(async (service) => {
            if (service.id && existingServiceIds.includes(service.id)) {
              // 🟢 Update existing service
              return await prisma.service.update({
                where: { id: service.id },
                data: {
                  code: service.code,
                  serviceType: ServiceTypeDisplayMap[service.serviceType],
                  vehicleType: service.vehicleType,
                  distributor: service.invoiceType,
                  quantity: service.quantity,
                  price: parseFloat(service.price),
                  notes: service.notes,
                },
              });
            } else {
              // 🆕 Create new service
              return await prisma.service.create({
                data: {
                  code: service.code,
                  serviceType: ServiceTypeDisplayMap[service.serviceType],
                  vehicleType: service.vehicleType,
                  distributor: service.invoiceType,
                  quantity: service.quantity,
                  price: parseFloat(service.price),
                  notes: service.notes,
                },
              });
            }
          })
        );

        // 5️⃣ Disconnect Removed Services
        const newServiceIds = newServiceRecords.map((s) => s.id);
        const servicesToRemove = existingServiceIds.filter(
          (id) => !newServiceIds.includes(id)
        );

        if (servicesToRemove.length > 0) {
          await prisma.invoice.update({
            where: { id: data.id },
            data: {
              services: {
                disconnect: servicesToRemove.map((id) => ({ id })),
              },
            },
          });
        }
        await prisma.invoice.update({
          where: { id: data.id },
          data: {
            services: {
              connect: newServiceRecords.map((service) => ({ id: service.id })),
            },
          },
        });
        await updateRevenue(data.id as number);
      }
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
