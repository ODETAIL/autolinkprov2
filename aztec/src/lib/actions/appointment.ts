"use server";

import { ServiceTypeDisplayMap } from "../formEnums";
import { revalidatePath } from "next/cache";

import { AppointmentSchema } from "../formValidationSchemas";
import prisma from "../prisma";
import { updateRevenue } from "./revenue";

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
								serviceType:
									ServiceTypeDisplayMap[service.serviceType],
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
						description: data.description,
						customer: {
							connect: { id: customer.id },
						},
						services: {
							connect: serviceRecords.map((service) => ({
								id: service.id,
							})),
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
							connect: serviceRecords.map((service) => ({
								id: service.id,
							})),
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

			await prisma.appointment.update({
				where: {
					id: data.id,
				},
				data: {
					description: data.description,
					title: data.title,
					startTime: new Date(data.startTime),
					endTime: new Date(data.endTime),
				},
			});
		});

		const existingServices = await prisma.appointment.findUnique({
			where: { id: data.id },
			select: { services: { select: { id: true } } },
		});

		const existingServiceIds =
			existingServices?.services.map((s) => s.id) || [];

		if (data.services) {
			const newServiceRecords = await Promise.all(
				data.services.map(async (service) => {
					if (service.id && existingServiceIds.includes(service.id)) {
						// Update existing service
						return await prisma.service.update({
							where: { id: service.id },
							data: {
								code: service.code,
								serviceType:
									ServiceTypeDisplayMap[service.serviceType],
								vehicleType: service.vehicleType,
								distributor: service.invoiceType,
								quantity: service.quantity,
								price: parseFloat(service.price),
								notes: service.notes,
							},
						});
					} else {
						// Create new service
						return await prisma.service.create({
							data: {
								code: service.code,
								serviceType:
									ServiceTypeDisplayMap[service.serviceType],
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

			// Disconnect Removed Services
			const newServiceIds = newServiceRecords.map((s) => s.id);
			const servicesToRemove = existingServiceIds.filter(
				(id) => !newServiceIds.includes(id)
			);

			if (servicesToRemove.length > 0) {
				await prisma.appointment.update({
					where: { id: data.id },
					data: {
						services: {
							disconnect: servicesToRemove.map((id) => ({ id })),
						},
					},
				});
			}

			await prisma.appointment.update({
				where: { id: data.id },
				data: {
					services: {
						connect: newServiceRecords.map((service) => ({
							id: service.id,
						})),
					},
				},
			});

			// Update the services in invoice
			const invoice = await prisma.invoice.findFirst({
				where: { appointmentId: data.id },
			});

			if (invoice) {
				await prisma.invoice.update({
					where: { id: invoice.id },
					data: {
						services: {
							connect: newServiceRecords.map((service) => ({
								id: service.id,
							})),
							disconnect: servicesToRemove.map((id) => ({ id })),
						},
					},
				});

				// Update Revenue
				await updateRevenue(invoice.id);
			}
		}

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
