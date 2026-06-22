/*
  Warnings:

  - You are about to drop the column `role_id` on the `Permission` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `workspace` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `workspace` table. All the data in the column will be lost.
  - You are about to drop the `User_OutBox` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `refreshToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `name` on the `Role` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `owner_id` to the `workspace` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `businessType` on the `workspace` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BUSSINESSTYPE" AS ENUM ('RETAIL_STORE', 'RESTAURANT');

-- CreateEnum
CREATE TYPE "ROLES" AS ENUM ('MANAGER', 'CASHIER');

-- CreateEnum
CREATE TYPE "OUTBOXSTATUS" AS ENUM ('PENDING', 'PROCESSED', 'FAILED');

-- DropForeignKey
ALTER TABLE "User_OutBox" DROP CONSTRAINT "User_OutBox_user_id_fkey";

-- DropForeignKey
ALTER TABLE "refreshToken" DROP CONSTRAINT "refreshToken_user_id_fkey";

-- DropForeignKey
ALTER TABLE "workspace" DROP CONSTRAINT "workspace_user_id_fkey";

-- AlterTable
ALTER TABLE "Permission" DROP COLUMN "role_id";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "createdAt",
DROP COLUMN "name",
ADD COLUMN     "name" "ROLES" NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "is_active",
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "workspace" DROP COLUMN "currency",
DROP COLUMN "user_id",
ADD COLUMN     "owner_id" TEXT NOT NULL,
DROP COLUMN "businessType",
ADD COLUMN     "businessType" "BUSSINESSTYPE" NOT NULL;

-- DropTable
DROP TABLE "User_OutBox";

-- DropTable
DROP TABLE "refreshToken";

-- DropEnum
DROP TYPE "Currency";

-- DropEnum
DROP TYPE "OutBox_Status";

-- DropEnum
DROP TYPE "business_type";

-- DropEnum
DROP TYPE "roles_enum";

-- CreateTable
CREATE TABLE "WorkspaceMember" (
    "id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkspaceMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutboxEvent" (
    "id" TEXT NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "aggregateType" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" "OUTBOXSTATUS" NOT NULL DEFAULT 'PENDING',
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),

    CONSTRAINT "OutboxEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceMember_workspace_id_email_key" ON "WorkspaceMember"("workspace_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_user_id_key" ON "RefreshToken"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- AddForeignKey
ALTER TABLE "workspace" ADD CONSTRAINT "workspace_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
