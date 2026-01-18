/*
  Warnings:

  - Added the required column `invoiceDate` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "invoiceDate" TIMESTAMP(3),
ADD COLUMN     "pdfUrl" TEXT;

UPDATE "Invoice" SET "invoiceDate" = NOW();
ALTER TABLE "Invoice" ALTER COLUMN "invoiceDate" SET NOT NULL;
