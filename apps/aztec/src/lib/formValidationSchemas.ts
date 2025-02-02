import { z } from "zod";

/** ✅ Companies Schema */
export const companySchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Company name is required!" }),
});

/** ✅ Employees Schema */
export const employeeSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Employee name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(1, { message: "Phone number is required!" }),
  role: z
    .string()
    .min(2, { message: "Role must be at least 2 characters long!" }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

/** ✅ Customers Schema */
export const customerSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Customer name is required!" }),
  city: z.string().optional(),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(1, { message: "Phone number is required!" }),
  postalCode: z.string().optional(),
  streetAddress1: z.string().min(1, { message: "Street Address is required!" }),
  streetAddress2: z.string().optional(),
  subscriptionWarranty: z.boolean().default(false),
  returnCounter: z.coerce.number().default(0),
  companyId: z.coerce.number().min(1, { message: "Company is required!" }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

/** ✅ Services Schema */
export const serviceSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Service name is required!" }),
  price: z.coerce
    .number()
    .min(0, { message: "Price must be a positive number!" }),
  vehicleType: z.string().min(1, { message: "Vehicle type is required!" }),
  code: z.string().min(1, { message: "Service code is required!" }),
  distributorCode: z
    .string()
    .min(1, { message: "Distributor code is required!" }),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

/** ✅ Appointments Schema */
export const appointmentSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  date: z.coerce.date({ message: "Date is required!" }),
  startTime: z.string().min(1, { message: "Start time is required!" }),
  endTime: z.string().min(1, { message: "End time is required!" }),
  customerId: z.coerce.number().min(1, { message: "Customer is required!" }),
  description: z.string().optional(),
});

/** ✅ Appointment Services Schema (Many-to-Many) */
export const appointmentServiceSchema = z.object({
  appointmentId: z.coerce
    .number()
    .min(1, { message: "Appointment ID is required!" }),
  serviceId: z.coerce.number().min(1, { message: "Service ID is required!" }),
  quantity: z.coerce
    .number()
    .min(1, { message: "Quantity must be at least 1!" }),
});

/** ✅ Invoices Schema */
export const invoiceSchema = z.object({
  id: z.coerce.number().optional(),
  appointmentId: z.coerce
    .number()
    .min(1, { message: "Appointment is required!" }),
  paymentType: z
    .string()
    .min(1, { message: "Payment type is required!" })
    .default("draft"),
  status: z.string().min(1, { message: "Status is required!" }),
  customerId: z.coerce.number().min(1, { message: "Customer is required!" }),
  createdAt: z.coerce.date().optional(),
});

/** ✅ Invoice Services Schema (Many-to-Many) */
export const invoiceServiceSchema = z.object({
  invoiceId: z.coerce.number().min(1, { message: "Invoice ID is required!" }),
  serviceId: z.coerce.number().min(1, { message: "Service ID is required!" }),
  quantity: z.coerce
    .number()
    .min(1, { message: "Quantity must be at least 1!" }),
});
