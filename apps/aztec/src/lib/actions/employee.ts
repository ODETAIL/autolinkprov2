"use server";

import { revalidatePath } from "next/cache";

import { clerkClient } from "@clerk/nextjs/server";
import { EmployeeSchema } from "../formValidationSchemas";
import prisma from "../prisma";

type CurrentState = { success: boolean; error: boolean };

// EMPLOYEE ACTIONS
export const createEmployee = async (
  currentState: CurrentState,
  data: EmployeeSchema
) => {
  console.log(data);
  try {
    const user = await clerkClient.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: [data.email],
      publicMetadata: { role: data.role },
    });

    await prisma.employee.create({
      data: {
        id: user.id,
        username: data.username,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        role: data.role,
        company: {},
        companyId: "Aztec",
      },
    });

    // revalidatePath("/list/employees");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateEmployee = async (
  currentState: CurrentState,
  data: EmployeeSchema
) => {
  if (!data.id) {
    return { success: false, error: true };
  }

  try {
    // const user = await clerkClient.users.updateUser(data.id, {
    //   username: data.username,
    //   ...(data.password !== "" && { password: data.password }),
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    // });

    await prisma.employee.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        role: data.role,
      },
    });
    // revalidatePath("/list/employees");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteEmployee = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get("id") as string;
  try {
    await clerkClient.users.deleteUser(id);

    await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    // revalidatePath("/list/teachers");
    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
