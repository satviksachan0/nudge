/*
  Warnings:

  - Added the required column `maxReminders` to the `ReminderRule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReminderRule" ADD COLUMN     "maxReminders" INTEGER NOT NULL;
