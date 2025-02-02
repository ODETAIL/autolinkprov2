CREATE TABLE "appointments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "appointments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date" date NOT NULL,
	"time" time NOT NULL,
	"serviceId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"customerId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "companies_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "customers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"city" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"postalCode" varchar(255) NOT NULL,
	"streetAddress1" varchar(255) NOT NULL,
	"streetAddress2" varchar(255) NOT NULL,
	"subscriptionWarranty" boolean DEFAULT false,
	"returnCounter" integer DEFAULT 0,
	"companyId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "employees_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"role" varchar(10) NOT NULL,
	"companyId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invoices" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "invoices_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"appointmentId" integer NOT NULL,
	"paymentType" varchar(255) NOT NULL,
	"status" varchar(255) NOT NULL,
	"customerId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "services_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"quantity" integer NOT NULL,
	"vehicleType" varchar(255) NOT NULL,
	"code" varchar(255) NOT NULL,
	"distributorCode" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_serviceId_services_id_fk" FOREIGN KEY ("serviceId") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "customers" ADD CONSTRAINT "customers_companyId_companies_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employees" ADD CONSTRAINT "employees_companyId_companies_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_appointmentId_appointments_id_fk" FOREIGN KEY ("appointmentId") REFERENCES "public"."appointments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;