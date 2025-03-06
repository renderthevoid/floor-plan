-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "floor" (
    "id" SERIAL NOT NULL,
    "rooms" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "discount" BOOLEAN,
    "project" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "old_price" INTEGER NOT NULL DEFAULT 0,
    "floor" INTEGER NOT NULL,
    "total_floors" INTEGER NOT NULL,
    "completionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageSrc" TEXT NOT NULL,

    CONSTRAINT "floor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite" (
    "id" SERIAL NOT NULL,
    "floorId" INTEGER NOT NULL,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorite_floorId_key" ON "favorite"("floorId");

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_floorId_fkey" FOREIGN KEY ("floorId") REFERENCES "floor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
