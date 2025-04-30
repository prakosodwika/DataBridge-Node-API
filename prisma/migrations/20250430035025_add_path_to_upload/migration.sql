/*
  Warnings:

  - Added the required column `path` to the `uploads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `uploads` ADD COLUMN `path` VARCHAR(191) NOT NULL;
