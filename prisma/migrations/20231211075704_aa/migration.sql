/*
  Warnings:

  - Added the required column `status` to the `License` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `license` ADD COLUMN `status` BOOLEAN NOT NULL;
