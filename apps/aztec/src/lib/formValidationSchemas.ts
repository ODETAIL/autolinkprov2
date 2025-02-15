import { z } from "zod";

export const customerSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  email: z.string().min(1, { message: "Email is required!" }),
  streetAddress1: z
    .string()
    .min(1, { message: "Street Address 1 is required!" }),
  streetAddress2: z.string(),
  postalCode: z.string(),
  city: z.string(),
  notes: z.string(),
  returnCounter: z.number().default(1),
  subscriptionWarranty: z.boolean().default(false),
  companyName: z.string(),
});

export type CustomerSchema = z.infer<typeof customerSchema>;

export const serviceSchema = z.object({
  id: z.number().optional(),
  vehicleType: z.enum([
    "Suv",
    "Truck",
    "Sedan",
    "Minivan",
    "Convertible",
    "Hatchback",
    "Coupe",
  ]),
  serviceType: z.enum([
    "Windshield",
    "Door Glass",
    "Back Glass",
    "Sunroof",
    "Mirror",
    "Quarter Glass",
    "Chip Subscription",
    "Warranty",
  ]),
  invoiceType: z.enum(["A", "M", "O"]),
  code: z.string().min(1, { message: "Code is required!" }),
  quantity: z.preprocess((val) => Number(val) || 1, z.number().min(1)),
  price: z.string().min(1, { message: "price is required!" }),
  notes: z.string(),
});

export type ServiceSchema = z.infer<typeof serviceSchema>;

export const employeeSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" }),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  role: z.string().min(1, { message: "role is required!" }),
});

export type EmployeeSchema = z.infer<typeof employeeSchema>;

export const appointmentSchema = z.object({
  id: z.number().optional(),
  customerId: z.string().optional(),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  title: z.string().min(3, { message: "Appointment title is required!" }),
  startTime: z.string({ message: "Start time is required!" }),
  endTime: z.string({ message: "End time is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  streetAddress1: z.string().min(1, { message: "Street Address is required!" }),
  notes: z.string(),
  services: z.array(serviceSchema).optional(),
});

export type AppointmentSchema = z.infer<typeof appointmentSchema>;

export const invoiceSchema = z.object({
  id: z.number().optional(),
  customerId: z.string().optional(),
  appointmentId: z.number().optional(),
  firstName: z.string().min(1, { message: "First name is required!" }),
  lastName: z.string().min(1, { message: "Last name is required!" }),
  email: z.string().email({ message: "Invalid email address!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  streetAddress1: z.string().min(1, { message: "Street Address is required!" }),
  status: z.enum(["Draft", "Pending", "Paid", "Overdue"]).default("Draft"),
  paymentType: z
    .enum([
      "Debit",
      "Mastercard",
      "Cash",
      "Amex",
      "Visa",
      "Cheque",
      "ETransfer",
      "Other",
    ])
    .default("Debit"),
  services: z.array(serviceSchema).optional(),
});

export type InvoiceSchema = z.infer<typeof invoiceSchema>;
