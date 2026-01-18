/*
  Warnings:

  - You are about to drop the column `email` on the `Client` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EmailOwner" AS ENUM ('USER', 'CLIENT');

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "email";

-- CreateTable
CREATE TABLE "EmailAddress" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ownerType" "EmailOwner" NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmailAddress_ownerId_ownerType_idx" ON "EmailAddress"("ownerId", "ownerType");
