/*
  Warnings:

  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "image",
ADD COLUMN     "profile_picture" TEXT,
ALTER COLUMN "user_type" DROP DEFAULT;
