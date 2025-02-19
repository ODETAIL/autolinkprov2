-- DropForeignKey
ALTER TABLE "Revenue" DROP CONSTRAINT "Revenue_companyId_fkey";

-- AlterTable
ALTER TABLE "Revenue" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Revenue" ADD CONSTRAINT "Revenue_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
