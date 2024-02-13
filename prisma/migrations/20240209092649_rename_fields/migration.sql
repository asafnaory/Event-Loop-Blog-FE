/*
  Warnings:

  - You are about to drop the column `comment` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `commenterName` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `content` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "comment",
DROP COLUMN "commenterName",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "userName" TEXT NOT NULL;
