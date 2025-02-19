"use server";

import prisma from "../prisma";
import { calculateInvoiceTotals } from "../util";

export const updateRevenue = async (invoiceId: number) => {
  try {
    if (!invoiceId) {
      return { success: false, error: true };
    }

    await prisma.$transaction(async (prisma) => {
      const invoice = await prisma.invoice.findUnique({
        where: { id: invoiceId },
        select: { status: true, paymentType: true, services: true },
      });
      if (!invoice) return;

      const { status, paymentType, services } = invoice;
      const today = new Date();

      // Find existing earnings for today & company
      const existingEarnings = await prisma.revenue.findFirst({
        where: {
          createdAt: today,
        },
      });

      const { subtotal, gst, total } = calculateInvoiceTotals(services);

      if (existingEarnings) {
        // Update existing earnings record
        await prisma.revenue.update({
          where: { id: existingEarnings.id },
          data: {
            total: existingEarnings.total + parseFloat(total),
            transactionCount: (existingEarnings.transactionCount ?? 1) + 1,
            updatedAt: new Date(),
          },
        });
      } else {
        await prisma.revenue.create({
          data: {
            createdAt: today,
            total: parseFloat(total),
            transactionCount: 1,
            paymentType: paymentType,
            status: status,
            updatedAt: new Date(),
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
