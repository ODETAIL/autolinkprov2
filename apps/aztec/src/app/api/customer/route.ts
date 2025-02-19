import prisma from "@/lib/prisma";
import { Customer } from "@prisma/client";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET() {
  const customers: Customer[] = await prisma.customer.findMany();

  if (!customers) {
    return notFound();
  }
  return NextResponse.json(customers);
}
