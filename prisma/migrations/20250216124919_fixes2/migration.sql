/*
  Warnings:

  - A unique constraint covering the columns `[userId,floorId]` on the table `favorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "favorite_userId_floorId_key" ON "favorite"("userId", "floorId");
