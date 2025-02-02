import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  varchar,
  boolean,
  date,
  time,
  text,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

export const companiesTable = pgTable("companies", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
});

export const employeesTable = pgTable("employees", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  email: varchar("email").unique(),
  phone: varchar("phone").unique(),
  role: varchar("role").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const customersTable = pgTable("customers", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  city: varchar("city"),
  email: varchar("email").unique().notNull(),
  phone: varchar("phone").unique().notNull(),
  postalCode: varchar("postal_code", { length: 6 }),
  streetAddress1: varchar("street_address_1").notNull(),
  streetAddress2: varchar("street_address_1"),
  subscriptionWarranty: boolean("warranty").default(false),
  returnCounter: integer().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  companyId: integer("company_id")
    .notNull()
    .references(() => companiesTable.id, { onDelete: "cascade" }),
});

export const servicesTable = pgTable("services", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  vehicleType: varchar("vehicle_type").notNull(),
  code: varchar("code").notNull(),
  distributorCode: varchar("distributor_code").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const appointmentsTable = pgTable("appointments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  startTime: time("start_time", { withTimezone: true }).notNull(),
  endTime: time("end_time", { withTimezone: true }).notNull(),
  date: date("date"),
  title: varchar("title").notNull(),
  description: text("description"),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customersTable.id, { onDelete: "cascade" }),
});

// ✅ Many-to-Many: Appointment <-> Service
export const appointmentServicesTable = pgTable("appointment_services", {
  appointmentId: integer("appointment_id")
    .notNull()
    .references(() => appointmentsTable.id, { onDelete: "cascade" }),
  serviceId: integer("service_id")
    .notNull()
    .references(() => servicesTable.id, { onDelete: "cascade" }),
  quantity: integer("quantity").default(1),
});

export const invoicesTable = pgTable("invoices", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  appointmentId: integer("appointment_id")
    .notNull()
    .references(() => appointmentsTable.id, { onDelete: "cascade" }),
  paymentType: varchar("payment_type"),
  status: varchar("status").notNull().default("draft"),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customersTable.id, { onDelete: "cascade" }),
});

// ✅ Many-to-Many: Invoice <-> Service (Historical Pricing)
export const invoiceServicesTable = pgTable("invoice_services", {
  invoiceId: integer("invoice_id")
    .notNull()
    .references(() => invoicesTable.id, { onDelete: "cascade" }),
  serviceId: integer("service_id")
    .notNull()
    .references(() => servicesTable.id, { onDelete: "cascade" }),
  quantity: integer("quantity").default(1),
});

// Relations

export const customersRelations = relations(customersTable, ({ many }) => ({
  invoices: many(invoicesTable),
  appointments: many(appointmentsTable),
  companies: many(companiesTable),
}));

// 🔹 Services Relations
export const servicesRelations = relations(servicesTable, ({ many }) => ({
  appointments: many(appointmentServicesTable),
  invoices: many(invoiceServicesTable),
}));

// 🔹 Appointments Relations
export const appointmentsRelations = relations(
  appointmentsTable,
  ({ one, many }) => ({
    customer: one(customersTable, {
      fields: [appointmentsTable.customerId],
      references: [customersTable.id],
    }),
    services: many(appointmentServicesTable),
    invoice: one(invoicesTable, {
      fields: [appointmentsTable.id],
      references: [invoicesTable.appointmentId],
    }),
  })
);

// 🔹 Appointment Services Join Table Relations
export const appointmentServicesRelations = relations(
  appointmentServicesTable,
  ({ one }) => ({
    appointment: one(appointmentsTable, {
      fields: [appointmentServicesTable.appointmentId],
      references: [appointmentsTable.id],
    }),
    service: one(servicesTable, {
      fields: [appointmentServicesTable.serviceId],
      references: [servicesTable.id],
    }),
  })
);

// 🔹 Invoices Relations
export const invoicesRelations = relations(invoicesTable, ({ one, many }) => ({
  customer: one(customersTable, {
    fields: [invoicesTable.customerId],
    references: [customersTable.id],
  }),
  appointment: one(appointmentsTable, {
    fields: [invoicesTable.appointmentId],
    references: [appointmentsTable.id],
  }),
  services: many(invoiceServicesTable),
}));

// 🔹 Invoice Services Join Table Relations
export const invoiceServicesRelations = relations(
  invoiceServicesTable,
  ({ one }) => ({
    invoice: one(invoicesTable, {
      fields: [invoiceServicesTable.invoiceId],
      references: [invoicesTable.id],
    }),
    service: one(servicesTable, {
      fields: [invoiceServicesTable.serviceId],
      references: [servicesTable.id],
    }),
  })
);
