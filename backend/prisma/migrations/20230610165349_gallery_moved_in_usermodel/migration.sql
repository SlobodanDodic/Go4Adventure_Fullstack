/*
  Warnings:

  - You are about to drop the column `postId` on the `Gallery` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Gallery" DROP CONSTRAINT "Gallery_postId_fkey";

-- AlterTable
ALTER TABLE "Gallery" DROP COLUMN "postId",
ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Gallery" ADD CONSTRAINT "Gallery_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
