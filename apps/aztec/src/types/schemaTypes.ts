import {
  appointmentServicesTable,
  appointmentsTable,
  companiesTable,
  customersTable,
  employeesTable,
  invoiceServicesTable,
  invoicesTable,
  servicesTable,
} from "@/db/schema";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// ✅ Types for Companies
export type Company = InferSelectModel<typeof companiesTable>;
export type NewCompany = InferInsertModel<typeof companiesTable>;

// ✅ Types for Employees
export type Employee = InferSelectModel<typeof employeesTable>;
export type NewEmployee = InferInsertModel<typeof employeesTable>;

// ✅ Types for Customers
export type Customer = InferSelectModel<typeof customersTable>;
export type NewCustomer = InferInsertModel<typeof customersTable>;

// ✅ Types for Services
export type Service = InferSelectModel<typeof servicesTable>;
export type NewService = InferInsertModel<typeof servicesTable>;

// ✅ Types for Appointments
export type Appointment = InferSelectModel<typeof appointmentsTable>;
export type NewAppointment = InferInsertModel<typeof appointmentsTable>;

// ✅ Types for Appointment Services (Many-to-Many)
export type AppointmentService = InferSelectModel<
  typeof appointmentServicesTable
>;
export type NewAppointmentService = InferInsertModel<
  typeof appointmentServicesTable
>;

// ✅ Types for Invoices
export type Invoice = InferSelectModel<typeof invoicesTable>;
export type NewInvoice = InferInsertModel<typeof invoicesTable>;

// ✅ Types for Invoice Services (Many-to-Many)
export type InvoiceService = InferSelectModel<typeof invoiceServicesTable>;
export type NewInvoiceService = InferInsertModel<typeof invoiceServicesTable>;
