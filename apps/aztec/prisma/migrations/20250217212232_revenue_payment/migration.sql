/*
  Warnings:

  - Added the required column `paymentType` to the `Revenue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Revenue" ADD COLUMN     "paymentType" "PaymentType" NOT NULL;
