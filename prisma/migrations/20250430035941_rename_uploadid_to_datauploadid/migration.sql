/*
  Warnings:

  - You are about to drop the column `uploadId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `uploads` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dataUploadId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `products` DROP FOREIGN KEY `products_uploadId_fkey`;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `uploadId`,
    ADD COLUMN `dataUploadId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `uploads`;

-- CreateTable
CREATE TABLE `data_uploads` (
    `id` VARCHAR(191) NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDING', 'SUCCESS', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_dataUploadId_fkey` FOREIGN KEY (`dataUploadId`) REFERENCES `data_uploads`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
