/*
  Warnings:

  - You are about to drop the `CustomersOnCompanies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomersOnCompanies" DROP CONSTRAINT "CustomersOnCompanies_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CustomersOnCompanies" DROP CONSTRAINT "CustomersOnCompanies_customerId_fkey";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "companyId" TEXT;

-- DropTable
DROP TABLE "CustomersOnCompanies";

-- CreateTable
CREATE TABLE "Revenue" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "total" INTEGER NOT NULL,
    "expenses" INTEGER,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Revenue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
