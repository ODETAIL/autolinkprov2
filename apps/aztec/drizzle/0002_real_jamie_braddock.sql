ALTER TABLE "customers" ALTER COLUMN "city" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "postalCode" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "customers" ALTER COLUMN "streetAddress2" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "paymentType" SET DEFAULT 'draft';--> statement-breakpoint
ALTER TABLE "invoices" ALTER COLUMN "paymentType" DROP NOT NULL;