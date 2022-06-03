-- CreateEnum
CREATE TYPE "HeadTags" AS ENUM ('mob', 'block', 'decor', 'eat', 'other');

-- CreateEnum
CREATE TYPE "LocationWorld" AS ENUM ('overworld', 'nether', 'end');

-- CreateTable
CREATE TABLE "Player" (
    "nickname" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("nickname")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "ip_address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nickname" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Head" (
    "nickname" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tag" "HeadTags" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Head_pkey" PRIMARY KEY ("nickname")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "z" INTEGER NOT NULL,
    "world" "LocationWorld" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nickname" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_nickname_key" ON "Player"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Head_nickname_key" ON "Head"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Location_url_key" ON "Location"("url");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_nickname_fkey" FOREIGN KEY ("nickname") REFERENCES "Player"("nickname") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_nickname_fkey" FOREIGN KEY ("nickname") REFERENCES "Player"("nickname") ON DELETE RESTRICT ON UPDATE CASCADE;
