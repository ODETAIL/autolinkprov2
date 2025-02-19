-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "postalCode" DROP NOT NULL,
ALTER COLUMN "subscription" DROP NOT NULL,
ALTER COLUMN "returnCounter" DROP NOT NULL;
