/*
  Warnings:

  - You are about to drop the column `daysAfterDue` on the `ReminderRule` table. All the data in the column will be lost.
  - Added the required column `repeatEveryDays` to the `ReminderRule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startAfterDays` to the `ReminderRule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReminderRule" DROP COLUMN "daysAfterDue",
ADD COLUMN     "repeatEveryDays" INTEGER NOT NULL,
ADD COLUMN     "startAfterDays" INTEGER NOT NULL;
